-- =============================================================
-- Migration initiale : profils dresseurs + pokémons capturés
-- =============================================================
-- À exécuter dans le SQL Editor du dashboard Supabase
-- (Dashboard → SQL Editor → New query → coller → RUN).
--
-- Cette migration crée deux tables dans le schéma `public` :
--
-- 1. profiles           — une ligne par utilisateur, contient le
--                         pseudo de dresseur (distinct de l'email).
-- 2. captured_pokemons  — une ligne par POKÉMON INDIVIDUEL capturé.
--                         Permet les doublons (ex: 3 Pikachu),
--                         nicknames, shinies, et plus tard le trading.
--
-- + un trigger pour auto-créer le profil à l'inscription
-- + Row Level Security (chaque user ne voit que ses données).
-- =============================================================


-- -------------------------------------------------------------
-- 1. Table profiles
-- -------------------------------------------------------------
-- Lien 1-à-1 avec auth.users. ON DELETE CASCADE : si on supprime
-- le compte auth, le profil disparaît aussi.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  trainer_name text unique not null,
  trainer_name_changes_left smallint not null default 2,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Contraintes de forme pour éviter pseudo vide / trop long.
  constraint trainer_name_length check (char_length(trainer_name) between 3 and 20)
);

-- Index implicite sur la PK (id) + unique sur trainer_name.
-- Pas besoin d'index supplémentaire pour l'instant.


-- -------------------------------------------------------------
-- 2. Table captured_pokemons
-- -------------------------------------------------------------
-- Chaque ligne = une instance UNIQUE d'un pokémon capturé.
-- Pas de contrainte UNIQUE (owner_id, pokemon_id) : on veut
-- pouvoir avoir 3 Pikachu, un shiny, un autre normal, etc.
create table public.captured_pokemons (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  pokemon_id integer not null,         -- ID PokéAPI de l'espèce (1 = Bulbasaur, 25 = Pikachu…)
  nickname text,                        -- surnom donné par le dresseur (null = nom par défaut)
  is_shiny boolean not null default false,
  caught_at timestamptz not null default now(),
  constraint nickname_length check (nickname is null or char_length(nickname) between 1 and 20)
);

-- Index pour accélérer les requêtes "mes pokémons".
create index captured_pokemons_owner_id_idx on public.captured_pokemons(owner_id);


-- -------------------------------------------------------------
-- 3. Trigger : création auto du profil à l'inscription
-- -------------------------------------------------------------
-- Quand Supabase insère une ligne dans auth.users (signUp),
-- ce trigger insère automatiquement une ligne dans profiles
-- avec le trainer_name passé via options.data lors du signUp.
--
-- security definer : la fonction tourne avec les droits du
-- créateur (postgres), ce qui lui permet d'écrire dans public
-- même si RLS bloquerait un user normal.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, trainer_name)
  values (
    new.id,
    new.raw_user_meta_data->>'trainer_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- -------------------------------------------------------------
-- 4. Row Level Security (RLS)
-- -------------------------------------------------------------
-- Sans RLS, n'importe qui avec la anon key peut lire toutes les
-- lignes. Avec RLS, chaque requête est filtrée selon les policies.
alter table public.profiles enable row level security;
alter table public.captured_pokemons enable row level security;


-- profiles : lecture publique (utile pour afficher les pseudos
-- dans un futur écran d'échange / classement), écriture perso.
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Pas de policy INSERT : l'insertion passe uniquement par le
-- trigger handle_new_user (security definer).
-- Pas de policy DELETE : la suppression se fait en cascade
-- depuis auth.users.


-- captured_pokemons : lecture, insertion, update, suppression
-- réservées à l'owner. (Pour le trading futur, on ajoutera
-- probablement une policy dédiée basée sur une table `trades`.)
create policy "Users can view own captures"
  on public.captured_pokemons for select
  using (auth.uid() = owner_id);

create policy "Users can insert own captures"
  on public.captured_pokemons for insert
  with check (auth.uid() = owner_id);

create policy "Users can update own captures"
  on public.captured_pokemons for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Users can delete own captures"
  on public.captured_pokemons for delete
  using (auth.uid() = owner_id);
