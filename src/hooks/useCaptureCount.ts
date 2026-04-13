// Hook trivial : combien d'instances de ce pokémon le dresseur possède-t-il ?
//
// Consomme useMyCaptures (cache partagé via React Query), donc pas de
// nouvel appel réseau — chaque carte de la gallery bénéficie du même cache.
// Séparé de useCapturedPokemon pour ne pas instancier les mutations
// capture/release et le hook useSound dans les composants qui n'en ont
// pas besoin (la gallery est read-only depuis la Phase 6.2).

"use client";

import { useMyCaptures } from "./useMyCaptures";

export function useCaptureCount(pokemonId: number): number {
  const { data: captures = [] } = useMyCaptures();
  return captures.filter((c) => c.pokemon_id === pokemonId).length;
}
