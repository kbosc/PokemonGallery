// Route dynamique : /safariPokemon/[habitat]
//
// Deux modes de rencontre selon le slug :
//   - slug === "random" → on tire un habitat au hasard ET un pokémon au
//     hasard dans cet habitat. Reroll = on retire les deux.
//   - slug === clé valide (caverne, foret, ocean, plaine, sanctuaire,
//     volcan) → habitat figé, on ne tire que le pokémon. Reroll = on
//     reste dans le même habitat, on retire juste un autre pokémon.
//   - slug inconnu → notFound() (renvoie le 404 standard de Next).
//
// Cette page a remplacé l'ancien `page.tsx` qui faisait le tirage
// d'habitat + encounter en une seule étape. Elle laisse `page.tsx`
// devenir la page "menu" où l'utilisateur choisit un habitat.
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../../api/pokeApi";
import { useCapturedPokemon } from "../../../hooks/useCapturedPokemon";
import Pokeball from "../../../components/atoms/pokeball/Pokeball";
import Button from "../../../components/atoms/button/Button";
import {
  HABITATS,
  pickRandomFromPool,
  pickRandomHabitat,
  useHabitatPool,
  type HabitatKey,
} from "../habitats";
import styles from "../safari.module.css";

// Slug spécial : tire un habitat au hasard à chaque reroll.
const RANDOM_SLUG = "random";

// Garde de validation : renvoie la HabitatKey correspondante ou null si
// le slug n'est pas reconnu. "random" est un cas à part géré en amont.
function parseHabitatSlug(slug: string): HabitatKey | null {
  return slug in HABITATS ? (slug as HabitatKey) : null;
}

function ExitButton() {
  return (
    <Link href="/safariPokemon" className={styles.exitButton} aria-label="Quitter le safari">
      ✕
    </Link>
  );
}

// Wrapper pour les états transitoires (sélection d'habitat, chargement
// du pool). Affiche le décor dès qu'on a un habitat pour éviter le flash
// blanc, et un simple message sinon.
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

export default function SafariHabitatPage({
  params,
}: {
  // Next 15 : params est un Promise, à unwrap côté client via `use()`.
  params: Promise<{ habitat: string }>;
}) {
  const { habitat: slug } = use(params);
  const isRandom = slug === RANDOM_SLUG;
  const fixedHabitat = isRandom ? null : parseHabitatSlug(slug);

  // Slug invalide (ni "random" ni clé connue) → 404.
  if (!isRandom && fixedHabitat === null) {
    notFound();
  }

  // En mode random, `habitat` commence null et est tiré dans useEffect.
  // En mode fixe, `habitat` est déjà défini côté serveur et reste figé.
  const [habitat, setHabitat] = useState<HabitatKey | null>(fixedHabitat);
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  // Tiré une seule fois à la rencontre (comme dans les vrais jeux :
  // le shiny est visible AVANT la capture). 1/128 = taux classique Gen 1-2.
  const [isShiny, setIsShiny] = useState(false);
  const { data: pool } = useHabitatPool(habitat);

  // 1. Mode random uniquement : tire un habitat au mount + à chaque reroll.
  useEffect(() => {
    if (isRandom && habitat === null) setHabitat(pickRandomHabitat());
  }, [isRandom, habitat]);

  // 2. Quand le pool est prêt, tire le pokémon + le statut shiny.
  useEffect(() => {
    if (pool && pokemonId === null) {
      setPokemonId(pickRandomFromPool(pool));
      setIsShiny(Math.random() < 1 / 128);
    }
  }, [pool, pokemonId]);

  // Reroll : en random on remet tout à zéro (nouvel habitat + nouveau
  // pokémon) ; en habitat fixe on ne retire QUE le pokémon pour rester
  // dans le même décor.
  const reroll = () => {
    if (isRandom) setHabitat(null);
    setPokemonId(null);
  };

  if (habitat === null) {
    return <SafariFrame habitat={null} message="Recherche d'un habitat..." />;
  }

  if (pokemonId === null) {
    return (
      <SafariFrame
        habitat={habitat}
        message="Recherche d'un pokémon sauvage..."
      />
    );
  }

  return (
    <SafariEncounter
      key={`${habitat}-${pokemonId}`}
      habitat={habitat}
      pokemonId={pokemonId}
      isShiny={isShiny}
      onReroll={reroll}
    />
  );
}

// Composant enfant keyé sur (habitat, pokemonId) → à chaque changement,
// tout l'état interne (selected, mutations en cours…) est remis à zéro.
function SafariEncounter({
  habitat,
  pokemonId,
  isShiny,
  onReroll,
}: {
  habitat: HabitatKey;
  pokemonId: number;
  isShiny: boolean;
  onReroll: () => void;
}) {
  const { Background, label } = HABITATS[habitat];

  const { data, isLoading } = useQuery({
    queryKey: ["safari-pokemon", pokemonId],
    queryFn: () => getPokemon(pokemonId),
  });
  const { selected, capture, instanceCount } = useCapturedPokemon(pokemonId, isShiny);

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

  // Shiny → sprite front_shiny de PokéAPI.
  // Normal → dream_world (SVG HD) en priorité, front_default en fallback.
  const sprite = isShiny
    ? (data.sprites.front_shiny ?? data.sprites.front_default)
    : (data.sprites.other?.dream_world?.front_default ?? data.sprites.front_default);

  return (
    <div className={styles.scene}>
      <Background />
      <ExitButton />
      <div className={styles.container}>
        <p className={styles.habitatLabel}>{label}</p>
        <h2 className={styles.title}>
          {isShiny && (
            <span role="img" aria-label="Shiny" title="Pokémon shiny !">
              ⭐{" "}
            </span>
          )}
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
    </div>
  );
}
