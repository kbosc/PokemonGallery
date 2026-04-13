// Registre des habitats + hook de récupération du pool de pokémons.
//
// Ajouter un nouvel habitat (Océan, Plaine, Volcan…) = 3 étapes :
//   1. créer <Habitat>.tsx et <habitat>.module.css
//   2. ajouter une config dans ./pools.ts (types + extras/excludes)
//   3. enregistrer une entrée dans HABITATS ci-dessous
// Aucun autre fichier à modifier.

import type { ComponentType } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  getPokemonIdsByType,
  type PokemonType,
} from "../../../api/pokeApi";
import Caverne from "./Caverne";
import Foret from "./Foret";
import Ocean from "./Ocean";
import Plaine from "./Plaine";
import Sanctuaire from "./Sanctuaire";
import Volcan from "./Volcan";
import {
  CAVERNE_CONFIG,
  FORET_CONFIG,
  OCEAN_CONFIG,
  PLAINE_CONFIG,
  SANCTUAIRE_CONFIG,
  VOLCAN_CONFIG,
  type HabitatPoolConfig,
} from "./pools";

// Identifiant court pour chaque habitat. Le type littéral nous évite
// les typos : si on écrit "cavern" au lieu de "caverne", TypeScript râle.
export type HabitatKey =
  | "caverne"
  | "foret"
  | "ocean"
  | "plaine"
  | "sanctuaire"
  | "volcan";

type HabitatEntry = {
  // Nom affiché à l'utilisateur ("Un pokémon apparaît dans la Caverne !")
  label: string;
  // Composant React qui dessine le décor de fond
  Background: ComponentType;
  // Configuration du pool : types + ajustements curatoriaux
  pool: HabitatPoolConfig;
};

export const HABITATS: Record<HabitatKey, HabitatEntry> = {
  caverne: {
    label: "Caverne",
    Background: Caverne,
    pool: CAVERNE_CONFIG,
  },
  foret: {
    label: "Forêt",
    Background: Foret,
    pool: FORET_CONFIG,
  },
  ocean: {
    label: "Océan",
    Background: Ocean,
    pool: OCEAN_CONFIG,
  },
  plaine: {
    label: "Plaine",
    Background: Plaine,
    pool: PLAINE_CONFIG,
  },
  sanctuaire: {
    label: "Sanctuaire",
    Background: Sanctuaire,
    pool: SANCTUAIRE_CONFIG,
  },
  volcan: {
    label: "Volcan",
    Background: Volcan,
    pool: VOLCAN_CONFIG,
  },
};

const HABITAT_KEYS = Object.keys(HABITATS) as HabitatKey[];

/**
 * Pioche un habitat au hasard parmi ceux enregistrés.
 * À n'appeler QUE côté client (dans un useEffect) — Math.random
 * briserait l'hydratation sinon.
 */
export function pickRandomHabitat(): HabitatKey {
  const i = Math.floor(Math.random() * HABITAT_KEYS.length);
  return HABITAT_KEYS[i];
}

/**
 * Pure : compose le pool d'un habitat depuis une fonction qui résout
 * `type → IDs`. Logique partagée entre le hook (qui passe les données
 * de PokéAPI) et le test de couverture (qui passe un fixture statique).
 *
 * Étapes :
 *   1. union des IDs de tous les types listés (Set pour dédupliquer)
 *   2. ajout des extraIds (overrides curatoriaux)
 *   3. retrait des excludeIds (filtres)
 */
export function computeHabitatPool(
  config: HabitatPoolConfig,
  resolveType: (type: PokemonType) => number[]
): number[] {
  const ids = new Set<number>();
  for (const type of config.types) {
    resolveType(type).forEach((id) => ids.add(id));
  }
  config.extraIds?.forEach((id) => ids.add(id));
  config.excludeIds?.forEach((id) => ids.delete(id));
  return Array.from(ids);
}

/**
 * Hook qui charge le pool de pokémons d'un habitat.
 *
 * Implémentation : un fetch parallèle par type via useQueries. Chaque
 * réponse est mise en cache "à vie" (staleTime: Infinity) — donc une
 * fois qu'un type est chargé, tous les rerolls qui retombent dessus
 * sont instantanés, même entre habitats qui partagent un type.
 *
 * Renvoie `data: undefined` tant que tous les types ne sont pas chargés.
 * Passer `null` désactive complètement les requêtes (utile avant le
 * premier tirage d'habitat côté client).
 */
export function useHabitatPool(habitat: HabitatKey | null) {
  const config = habitat ? HABITATS[habitat].pool : null;
  const types = config?.types ?? [];

  const queries = useQueries({
    queries: types.map((type) => ({
      queryKey: ["pokemon-ids-by-type", type],
      queryFn: () => getPokemonIdsByType(type),
      staleTime: Infinity,
      gcTime: Infinity,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const allLoaded =
    types.length > 0 && queries.every((q) => q.data !== undefined);

  if (!config || !allLoaded) {
    return { data: undefined as number[] | undefined, isLoading };
  }

  const data = computeHabitatPool(config, (type) => {
    const i = types.indexOf(type);
    return queries[i]?.data ?? [];
  });
  return { data, isLoading: false };
}

/**
 * Pioche un ID au hasard dans un pool déjà chargé.
 * Sync — le hook doit avoir résolu le pool avant l'appel.
 */
export function pickRandomFromPool(pool: number[]): number {
  const i = Math.floor(Math.random() * pool.length);
  return pool[i];
}
