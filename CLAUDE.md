# CLAUDE.md — PokéGallery

Projet perso Next.js 15 — Pokédex interactif avec captures, Safari Zone et gestion de collection. Développé avec Raphaël (6 ans).

## Commandes essentielles

```bash
npm run dev       # dev server → localhost:3000
npm run build     # build production
npm run test      # vitest (unit + component tests)
npx tsc --noEmit  # type-check sans compiler
```

## Stack

| Couche | Outil |
|--------|-------|
| Framework | Next.js 15 (App Router, Server Components) |
| UI | React 19, CSS Modules |
| State | Zustand (gameboy slice) + TanStack Query v5 (server state) |
| Auth & DB | Supabase (PostgreSQL + RLS) |
| API externe | PokéAPI (https://pokeapi.co/) |
| Tests | Vitest + Testing Library |

## Architecture

```
src/
├── app/                        # Pages Next.js (App Router)
│   ├── page.tsx                # Homepage → GameboyComponent
│   ├── layout.tsx              # RootLayout : Header + TweaksPanel + main
│   ├── pokemonGallery/         # Galerie Pokédex (flip cards + filtres)
│   ├── boxPokemon/             # Box PC style (grille 6×5, rename/release)
│   ├── safariPokemon/
│   │   ├── page.tsx            # Menu habitats (dans le layout normal)
│   │   └── [habitat]/page.tsx  # Rencontre fullscreen
│   ├── login/ & signup/        # Auth pages (Supabase)
│   └── auth/callback/          # OAuth callback route
│
├── components/
│   ├── atoms/          button, pokeball, spinner, passwordInput…
│   ├── molecules/
│   │   ├── pokemonCard/        # Flip card (recto artwork+types, verso stats)
│   │   ├── navGameboy/         # Menu LCD dans l'écran Gameboy
│   │   ├── loginGameboy/       # Formulaire Supabase dans l'écran Gameboy
│   │   ├── animatedTextGameboy/ # Animation boot GAME BOY COLOR
│   │   └── caughtPokemon/      # Carte instance capturée (rename/release)
│   └── organisms/
│       ├── gameboy/            # GameboyComponent — machine à états (off/booting/splash/menu/login)
│       ├── header/             # Navbar serveur avec session Supabase
│       └── tweaksPanel/        # Bouton ⚙ flottant — couleur Gameboy + thème
│
├── hooks/
│   ├── useMyCaptures.ts        # Toutes les captures du dresseur (cache React Query)
│   ├── useCaptureCount.ts      # Nb d'instances d'une espèce (consomme useMyCaptures)
│   └── useCapturedPokemon.ts   # Hook mutation capture/release pour le Safari
│
├── lib/supabase/
│   ├── captures.ts             # CRUD capturés (getMyCaptures, capturePokemon, releasePokemon, renameCapture)
│   ├── client.ts               # Supabase browser client
│   └── server.ts               # Supabase server client (Server Components)
│
├── api/pokeApi.ts              # fetchPokemons (infinite), getPokemon, getPokemonIdsByType
├── store/                      # Zustand — gameboySlice (mooveUp/Down/enter)
└── assets/styles/
    ├── variables.css           # CSS variables + [data-theme="light"] overrides
    └── globals.css             # Reset + body styles
```

## DB Schema (Supabase)

**`profiles`** — un par utilisateur
- `id` (FK → auth.users)
- `trainer_name` (unique)
- `trainer_name_changes_left` (max 2)

**`captured_pokemons`** — une ligne par instance capturée (doublons OK)
- `id` UUID (PK)
- `owner_id` (FK → auth.users)
- `pokemon_id` (int, ID PokéAPI ex: 25 = Pikachu)
- `nickname` (nullable)
- `nickname_changes_left` (max 1 — trigger `enforce_nickname_rename_limit`)
- `is_shiny` (bool)
- `caught_at` (timestamp)

RLS : chaque user ne voit et ne modifie que ses propres captures.

## Conventions importantes

### Pas de co-auteur dans les commits
Ne jamais ajouter `Co-Authored-By` ni "Generated with Claude" dans les messages de commit ou descriptions de PR.

### Merger avant nouvelle branche
Toujours fast-forward merger la branche feature courante sur main avant de démarrer une nouvelle phase.

### CSS variables Gameboy
Les couleurs Gameboy sont dynamiques via `--gb-main/dark/mid/light/text` dans `:root`.
`TweaksPanel` les surcharge via `document.documentElement.style.setProperty(...)`.
Ne jamais hardcoder `#4f50db` ou les autres couleurs Gameboy dans de nouveaux composants.

### Éléments intentionnellement non-theming
Ces éléments gardent leurs couleurs fixes même en light mode (design volontaire) :
- Box Pokémon : dégradé bleu `#1a3a6a`
- Cartes habitats Safari : gradients propres à chaque habitat
- Écran LCD Gameboy : `#becbc4` (vert), `#929d97` (gris), `#23252d` (bezel)

### Safari — deux layouts distincts
- `/safariPokemon` (menu) : **dans le layout normal**, navbar visible, pas de fullscreen
- `/safariPokemon/[habitat]` (rencontre) : **fullscreen** `position:fixed`, bouton ✕ → `/safariPokemon`

### Galerie — filtre "Attrapés"
Le filtre "Attrapés" utilise un `useQuery` direct par IDs (`getPokemon(id)` pour chaque espèce capturée) — **pas** l'infinite scroll. Ne pas revenir au filtrage sur les données chargées, ce serait incomplet et lent.

### Zustand (gameboySlice)
Sert uniquement à faire communiquer les boutons D-pad du `GameboyComponent` avec `NavGameboy` (mooveUp / mooveDown / enter). Ne pas y ajouter d'autre état — les états UI locaux restent dans des `useState`.

## État des features

| Feature | Statut |
|---------|--------|
| Galerie infinite scroll + flip cards | ✅ |
| Auth Supabase (email + Google) | ✅ |
| Safari Zone (6 habitats) | ✅ |
| Captures individuelles + doublons | ✅ |
| Shiny 1/128 | ✅ |
| Renommage instance (1 fois) | ✅ |
| Box PC style (rename/release) | ✅ |
| Gameboy splash + menu + tweaks colorways | ✅ |
| Light/dark mode | ✅ |
| Échange entre dresseurs | ❌ |
| Renommer/personnaliser les boxes | ❌ |
| Drag & drop dans la box | ❌ |
