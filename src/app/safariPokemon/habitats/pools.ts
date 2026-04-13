// Configuration des pools par habitat.
//
// Plutôt que de lister les IDs PokéAPI à la main, on déclare quels
// TYPES de pokémons peuplent chaque habitat. Le hook `useHabitatPool`
// fait ensuite l'union des pokémons de ces types via l'API PokéAPI.
//
// Échappatoires curatoriales (optionnelles) :
//   - extraIds   : pokémons à inclure même si leur type ne correspond pas
//                  (ex: Cubone vit en grotte mais est ground/null sans rock)
//   - excludeIds : pokémons à retirer même si leur type correspond
//                  (ex: pour exclure un pokémon trop fréquent)

import type { PokemonType } from "../../../api/pokeApi";

export type HabitatPoolConfig = {
  types: readonly PokemonType[];
  extraIds?: readonly number[];
  excludeIds?: readonly number[];
};

// Caverne : roche + sol = grottes, mines, tunnels.
// extraIds : Zubat/Golbat (poison/flying mais 100% caverne dans les jeux)
//            + Paras/Parasect (bug/grass mais habitent les grottes humides)
export const CAVERNE_CONFIG: HabitatPoolConfig = {
  types: ["rock", "ground"],
  extraIds: [
    41, // Zubat
    42, // Golbat
    46, // Paras
    47, // Parasect
  ],
};

// Océan : tous les water types Gen 1 (~32 pokémons).
// Pas d'extras nécessaires, le typage water est déjà très large.
export const OCEAN_CONFIG: HabitatPoolConfig = {
  types: ["water"],
};

// Plaine : herbe + normal + électrique = prairies, bosquets, champs.
// excludeIds : on retire les water types qui sont aussi normal (rare) ou
// les pokémons clairement aquatiques. Pour la Gen 1 c'est OK tel quel.
export const PLAINE_CONFIG: HabitatPoolConfig = {
  types: ["grass", "normal", "electric"],
};

// Volcan : feu uniquement. Pool plus restreint (~12 pokémons Gen 1) mais
// très thématique.
export const VOLCAN_CONFIG: HabitatPoolConfig = {
  types: ["fire"],
};
