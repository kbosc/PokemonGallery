# PokéGallery

**Projet perso | Feat Raphaël (9 ans)**

![image Pokemon](https://github.com/kbosc/PokemonGallery/blob/main/public/pokemonGithub.png)

> Un Pokédex interactif où chaque dresseur gère sa propre collection — attraper, renommer, relâcher, et bientôt échanger.

## Fonctionnalités

### Gameboy Color — écran d'accueil
- Appuie sur **S** ou clique **START** pour allumer
- Animation de boot + écran splash **POKEMON GALLERY**
- Navigation au menu avec le D-pad, les flèches clavier ou la souris
- Connexion directement dans l'écran de la Gameboy (Supabase)
- **Tweaks** : 6 colorways (violet, rouge, or, argent, vert, rose) + thème clair/sombre

### Galerie — Pokédex
- 151 pokémons Gen 1 chargés via infinite scroll (PokéAPI)
- Cartes **flip** : recto = artwork officiel + types + badge attrapé, verso = barres de stats
- Filtres : Tous / ✓ Attrapés / ○ Manquants + filtre par type

### Safari — captures
- 6 habitats thématiques : Forêt, Océan, Plaine, Caverne, Volcan, Sanctuaire
- Encounter aléatoire dans un décor immersif fullscreen
- Chance 1/128 d'obtenir un Pokémon ✨ Shiny
- Pokéball à lancer, ou passer au Pokémon suivant

### Box Pokémon
- Grille **PC Box** style jeu officiel (6×5 slots)
- Navigation entre boxes, tri par N°/Nom/Type, filtre par type
- Sélection d'un Pokémon → **Renommer** (1 fois) ou **Relâcher** avec modale de confirmation
- Indicateur ⭐ pour les shinies

### Compte utilisateur
- Authentification via **Supabase** (email/mot de passe ou Google OAuth)
- Chaque dresseur a ses propres captures (RLS Postgres)
- Nom de dresseur unique, renommable 2 fois maximum

## Stack technique

| Catégorie | Technologie |
|-----------|-------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, CSS Modules |
| State | Zustand, TanStack Query v5 |
| Auth & DB | Supabase (PostgreSQL + RLS) |
| API | [PokéAPI](https://pokeapi.co/) |
| Tests | Vitest, Testing Library |
| Son | use-sound |

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- [npm](https://docs.npmjs.com/) ou pnpm
- Un projet [Supabase](https://supabase.com/) (pour l'authentification et la base de données)

### Variables d'environnement

Crée un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Lancement

```bash
git clone https://github.com/kbosc/PokemonGallery.git
cd PokemonGallery
npm install
npm run dev
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

### Tests

```bash
npm run test
```

## Roadmap

- [x] Galerie Pokédex avec infinite scroll
- [x] Authentification Supabase
- [x] Safari Zone avec 6 habitats
- [x] Captures individuelles (doublons possibles)
- [x] Pokémon shiny (1/128)
- [x] Renommage d'instance (1 fois)
- [x] Box Pokémon style PC Box
- [ ] Échange de Pokémon entre dresseurs
- [ ] Renommer / personnaliser les boxes
- [ ] Drag & drop dans la box
