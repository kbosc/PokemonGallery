// "use client" car tirage aléatoire, hooks, interaction clavier/souris.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { useCapturedPokemon } from "../../hooks/useCapturedPokemon";
import Pokeball from "../../components/atoms/pokeball/Pokeball";
import Button from "../../components/atoms/button/Button";
import {
  HABITATS,
  pickRandomFromPool,
  pickRandomHabitat,
  useHabitatPool,
  type HabitatKey,
} from "./habitats";
import styles from "./safari.module.css";

// Bouton Quitter : ramène à l'accueil. C'est le SEUL moyen de sortir de
// l'overlay plein écran (pas de bouton retour navigateur intuitif sinon).
function ExitButton() {
  return (
    <Link href="/" className={styles.exitButton} aria-label="Quitter le safari">
      ✕
    </Link>
  );
}

// Wrapper réutilisable pour les états transitoires (chargement,
// recherche). Évite de répéter le balisage scene + ExitButton.
function SafariFrame({
  habitat,
  message,
}: {
  habitat: HabitatKey | null;
  message: string;
}) {
  const Background = habitat ? HABITATS[habitat].Background : null;
  return (
    <div className={styles.scene}>
      {Background && <Background />}
      <ExitButton />
      <div className={styles.container}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default function SafariPokemonPage() {
  // Flow d'une rencontre :
  //   1. habitat null → useEffect tire un habitat au hasard
  //   2. useHabitatPool fetch les pokémons des types de cet habitat
  //   3. dès que pool est chargé → useEffect tire un pokémon
  //   4. tout est prêt → on rend SafariEncounter
  // Rerolls : on remet habitat ET pokemonId à null pour relancer le cycle.
  const [habitat, setHabitat] = useState<HabitatKey | null>(null);
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const { data: pool } = useHabitatPool(habitat);

  // 1. Tire un habitat au mount + à chaque reroll.
  // (côté client uniquement → pas de hydration mismatch)
  useEffect(() => {
    if (habitat === null) setHabitat(pickRandomHabitat());
  }, [habitat]);

  // 2. Quand le pool est prêt, tire le pokémon.
  useEffect(() => {
    if (pool && pokemonId === null) {
      setPokemonId(pickRandomFromPool(pool));
    }
  }, [pool, pokemonId]);

  const reroll = () => {
    setHabitat(null);
    setPokemonId(null);
  };

  if (habitat === null) {
    return <SafariFrame habitat={null} message="Recherche d'un habitat..." />;
  }

  if (pokemonId === null) {
    return (
      <SafariFrame habitat={habitat} message="Recherche d'un pokémon sauvage..." />
    );
  }

  return (
    <SafariEncounter
      key={`${habitat}-${pokemonId}`}
      habitat={habitat}
      pokemonId={pokemonId}
      onReroll={reroll}
    />
  );
}

// Composant enfant keyé sur (habitat, pokemonId) → à chaque changement,
// tout l'état interne (selected, mutations en cours…) est remis à zéro.
function SafariEncounter({
  habitat,
  pokemonId,
  onReroll,
}: {
  habitat: HabitatKey;
  pokemonId: number;
  onReroll: () => void;
}) {
  const { Background, label } = HABITATS[habitat];

  const { data, isLoading } = useQuery({
    queryKey: ["safari-pokemon", pokemonId],
    queryFn: () => getPokemon(pokemonId),
  });
  const { selected, capture, instanceCount } = useCapturedPokemon(pokemonId);

  if (isLoading || !data) {
    return (
      <div className={styles.scene}>
        <Background />
        <ExitButton />
        <div className={styles.container}>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  const sprite =
    data.sprites.other?.dream_world?.front_default ??
    data.sprites.front_default;

  return (
    <div className={styles.scene}>
      <Background />
      <ExitButton />
      <div className={styles.container}>
        <p className={styles.habitatLabel}>{label}</p>
        <h2 className={styles.title}>Un {data.name} sauvage apparaît !</h2>

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
    </div>
  );
}
