import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
const pokemonCaughtSound = "/sounds/catchPokemon.mp3";
import { catchRandomize } from "../utils/catchRandomize";

const STORAGE_KEY = "storagePokemon";

function readStoredIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredIds(ids: number[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...ids].sort((a, b) => a - b))
  );
}

export interface UseCapturedPokemonResult {
  caught: boolean;
  selected: boolean;
  capture: () => void;
  release: () => void;
}

/**
 * Owns the capture/release lifecycle for a single pokemon id:
 *   - syncs `caught` from localStorage on mount / id change
 *   - plays the capture sound only for user-initiated catches
 *   - persists the captured list back to localStorage
 *
 * Designed to be consumed by any UI that needs capture behavior
 * (PokemonCard today, SafariPokemon page next).
 */
export function useCapturedPokemon(id: number): UseCapturedPokemonResult {
  const [selected, setSelected] = useState(false);
  const [caught, setCaught] = useState(false);
  const [play] = useSound(pokemonCaughtSound, { volume: 0.03 });
  // Distinguishes a user click (should play sound) from the initial
  // localStorage sync (should stay silent).
  const userInitiatedRef = useRef(false);

  useEffect(() => {
    const ids = readStoredIds();
    setCaught(ids.includes(id));
  }, [id]);

  useEffect(() => {
    if (caught && userInitiatedRef.current) {
      play();
      userInitiatedRef.current = false;
    }
  }, [caught, play]);

  const capture = () => {
    const oldData = readStoredIds();
    userInitiatedRef.current = true;
    // catchRandomize mutates oldData in place (pushes id on success) and
    // schedules `setCaught(true)` 1s later via setTimeout. See
    // src/utils/catchRandomize.tsx.
    catchRandomize(oldData, id, setSelected, setCaught);
    writeStoredIds(oldData);
  };

  const release = () => {
    const next = readStoredIds().filter((storedId) => storedId !== id);
    writeStoredIds(next);
    setCaught(false);
  };

  return { caught, selected, capture, release };
}
