-- =============================================================
-- Migration 0002 : limiter le renommage d'un pokémon à 1 fois
-- =============================================================
-- À exécuter dans le SQL Editor du dashboard Supabase
-- (Dashboard → SQL Editor → New query → coller → RUN).
--
-- Ajoute un compteur nickname_changes_left (default 1) et un trigger
-- qui décrémente à chaque UPDATE du nickname, et rejette la mutation
-- une fois le compteur à zéro.
--
-- La sécurité est côté DB : même si le client envoyait une mutation
-- directement à Supabase, le trigger bloquerait. Le client se contente
-- de masquer le bouton quand il sait que le crédit est épuisé.
-- =============================================================


-- -------------------------------------------------------------
-- 1. Ajout de la colonne compteur
-- -------------------------------------------------------------
-- Les lignes existantes reçoivent la valeur par défaut (1), donc tous
-- les pokémons déjà en base sont renommables une fois. Si on veut
-- figer les renommages passés, on peut lancer un UPDATE manuel après
-- cette migration :
--   update public.captured_pokemons
--   set nickname_changes_left = 0
--   where nickname is not null;
alter table public.captured_pokemons
  add column nickname_changes_left smallint not null default 1;


-- -------------------------------------------------------------
-- 2. Fonction de trigger : décrémente ou rejette
-- -------------------------------------------------------------
-- Comportement :
--   - si NEW.nickname == OLD.nickname (IS NOT DISTINCT FROM) → no-op
--   - sinon si OLD.nickname_changes_left <= 0 → exception
--   - sinon → décrémente
--
-- IS DISTINCT FROM gère correctement les NULL :
--   NULL IS DISTINCT FROM NULL  → FALSE
--   NULL IS DISTINCT FROM 'X'   → TRUE
create function public.handle_capture_rename()
returns trigger
language plpgsql
as $$
begin
  if NEW.nickname IS DISTINCT FROM OLD.nickname then
    if OLD.nickname_changes_left <= 0 then
      raise exception 'No rename credits left for this capture';
    end if;
    NEW.nickname_changes_left := OLD.nickname_changes_left - 1;
  end if;
  return NEW;
end;
$$;


-- -------------------------------------------------------------
-- 3. Trigger : s'active BEFORE UPDATE sur captured_pokemons
-- -------------------------------------------------------------
create trigger enforce_nickname_rename_limit
  before update on public.captured_pokemons
  for each row execute function public.handle_capture_rename();
