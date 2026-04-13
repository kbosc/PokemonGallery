// "use client" car tirage aléatoire, hooks, interaction clavier/souris.
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { useCapturedPokemon } from "../../hooks/useCapturedPokemon";
import Pokeball from "../../components/atoms/pokeball/Pokeball";
import Button from "../../components/atoms/button/Button";
import styles from "./safari.module.css";

// Pool de départ : Gen 1 (151 premiers). Facile à étendre plus tard
// (ou à filtrer par type pour les décors thématiques).
const POOL_MIN = 1;
const POOL_MAX = 151;

function pickRandomId(): number {
  return Math.floor(Math.random() * (POOL_MAX - POOL_MIN + 1)) + POOL_MIN;
}

export default function SafariPokemonPage() {
  // null au 1er rendu côté serveur ET au 1er rendu côté client → pas
  // de hydration mismatch (le Math.random ne s'exécute que dans useEffect).
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    if (currentId === null) setCurrentId(pickRandomId());
  }, [currentId]);

  const rerollPokemon = () => setCurrentId(pickRandomId());

  if (currentId === null) {
    return (
      <div className={styles.container}>
        <p>Recherche d&apos;un pokémon sauvage...</p>
      </div>
    );
  }

  return (
    <SafariEncounter
      key={currentId}
      pokemonId={currentId}
      onReroll={rerollPokemon}
    />
  );
}

// Composant enfant keyé sur pokemonId → à chaque changement de pokemon,
// tout l'état interne (selected, mutations en cours…) est remis à zéro.
function SafariEncounter({
  pokemonId,
  onReroll,
}: {
  pokemonId: number;
  onReroll: () => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["safari-pokemon", pokemonId],
    queryFn: () => getPokemon(pokemonId),
  });
  const { selected, capture, instanceCount } = useCapturedPokemon(pokemonId);

  if (isLoading || !data) {
    return (
      <div className={styles.container}>
        <p>Chargement...</p>
      </div>
    );
  }

  const sprite =
    data.sprites.other?.dream_world?.front_default ??
    data.sprites.front_default;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Un {data.name} sauvage apparaît !
      </h2>

      {sprite && (
        <img
          className={styles.sprite}
          src={sprite}
          alt={`Pokémon sauvage : ${data.name}`}
        />
      )}

      {instanceCount > 0 && (
        <p className={styles.stackInfo}>
          Tu en possèdes déjà {instanceCount} dans ta box.
        </p>
      )}

      <div className={styles.actions}>
        {/* Pokéball toujours cliquable — on peut retenter jusqu'à
            réussir, ou en capturer plusieurs avant de passer au suivant. */}
        <button
          className={styles.pokeballButton}
          onClick={capture}
          aria-label={`Lancer une pokéball sur ${data.name}`}
        >
          <Pokeball selected={selected} />
        </button>

        <Button onClick={onReroll}>Chercher un autre pokémon</Button>
      </div>
    </div>
  );
}
