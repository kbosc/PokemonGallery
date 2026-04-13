// Source de vérité unique pour les pokémons capturés du dresseur connecté.
//
// Rôle : fetcher la liste via Supabase et la mettre en cache via React Query,
// de sorte que plusieurs composants (BoxPokemon, PokemonCard…) partagent
// les mêmes données sans multiplier les appels réseau.
//
// Design :
//   - une seule queryKey stable (MY_CAPTURES_QUERY_KEY)
//   - les mutations (capture/release) mettront à jour ce cache
//     via setQueryData, ce qui re-render tous les consumers.

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMyCaptures,
  type CapturedPokemon,
} from "../lib/supabase/captures";

export const MY_CAPTURES_QUERY_KEY = ["myCaptures"] as const;

export function useMyCaptures() {
  return useQuery<CapturedPokemon[]>({
    queryKey: MY_CAPTURES_QUERY_KEY,
    queryFn: getMyCaptures,
  });
}
