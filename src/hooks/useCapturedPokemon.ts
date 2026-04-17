// Hook par-pokemon qui expose l'état "capturé ou pas" + actions capture/release.
//
// Depuis la Phase 6.1, la source de vérité n'est plus le localStorage
// mais la table Supabase `captured_pokemons` (via useMyCaptures).
// Ce hook est un ADAPTATEUR : il dérive un booléen simple à partir
// de la liste d'instances et encapsule les mutations de capture/release.
//
// Le bouton "capture" sera retiré de la gallery en Phase 6.2 — ce hook
// restera utile pour le safari, qui aura la même sémantique capture().

"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSound from "use-sound";
import {
  capturePokemon,
  releasePokemon,
  type CapturedPokemon,
} from "../lib/supabase/captures";
import { useMyCaptures, MY_CAPTURES_QUERY_KEY } from "./useMyCaptures";

const pokemonCaughtSound = "/sounds/catchPokemon.mp3";
// Durée de l'animation "lancer de pokéball" avant la persistance en DB.
// On attend la fin de l'animation pour que le flip UI (capturé → true)
// coïncide avec la fin du lancer visuel, comme dans la version localStorage.
const CATCH_ANIMATION_MS = 1000;
// Seuil de réussite du lancer : random in [1..10], succès si > 3
// (soit ~70% de réussite).
const CATCH_SUCCESS_MIN = 4;

export interface UseCapturedPokemonResult {
  caught: boolean;
  selected: boolean;
  capture: () => void;
  release: () => void;
  instanceCount: number;
}

export function useCapturedPokemon(
  id: number,
  isShiny = false
): UseCapturedPokemonResult {
  const { data: captures = [] } = useMyCaptures();
  const instances = captures.filter((c) => c.pokemon_id === id);
  const caught = instances.length > 0;

  const [selected, setSelected] = useState(false);
  const [play] = useSound(pokemonCaughtSound, { volume: 0.03 });
  const queryClient = useQueryClient();
  // Distingue un passage caught = true initié par l'utilisateur (joue le son)
  // du refetch initial de useMyCaptures (silence).
  const userInitiatedRef = useRef(false);

  useEffect(() => {
    if (caught && userInitiatedRef.current) {
      play();
      userInitiatedRef.current = false;
    }
  }, [caught, play]);

  const captureMutation = useMutation({
    mutationFn: (opts: { is_shiny: boolean }) =>
      capturePokemon({ pokemon_id: id, is_shiny: opts.is_shiny }),
    onSuccess: (newCapture) => {
      // Patch optimiste : on injecte la nouvelle ligne dans le cache
      // sans refetch réseau, pour une UI instantanée.
      queryClient.setQueryData<CapturedPokemon[]>(
        MY_CAPTURES_QUERY_KEY,
        (old) => (old ? [...old, newCapture] : [newCapture])
      );
    },
  });

  const releaseMutation = useMutation({
    mutationFn: (captureId: string) => releasePokemon(captureId),
    onSuccess: (_, captureId) => {
      queryClient.setQueryData<CapturedPokemon[]>(
        MY_CAPTURES_QUERY_KEY,
        (old) => (old ? old.filter((c) => c.id !== captureId) : [])
      );
    },
  });

  const capture = () => {
    setSelected(true);
    setTimeout(() => setSelected(false), CATCH_ANIMATION_MS);

    const roll = Math.floor(Math.random() * 10 + 1);
    if (roll < CATCH_SUCCESS_MIN) return; // raté — animation seulement

    userInitiatedRef.current = true;
    // On persiste en DB à la fin de l'animation, pas avant : sinon le
    // flip UI "capturé" se produirait pendant le lancer.
    setTimeout(() => {
      captureMutation.mutate({ is_shiny: isShiny });
    }, CATCH_ANIMATION_MS);
  };

  const release = () => {
    // Relâche l'instance la plus ancienne (getMyCaptures trie ascending
    // par caught_at). En Phase 6.3 la Box permettra de choisir quelle
    // instance précise relâcher.
    const oldest = instances[0];
    if (!oldest) return;
    releaseMutation.mutate(oldest.id);
  };

  return {
    caught,
    selected,
    capture,
    release,
    instanceCount: instances.length,
  };
}
