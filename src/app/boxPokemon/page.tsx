// "use client" car on utilise useState, useEffect, useQuery et localStorage.
"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { CaughtPokemon } from "../../components/molecules/caughtPokemon/CaughtPokemon";

function readStoredPokemonIds(): number[] | null {
  const raw = localStorage.getItem("storagePokemon");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export default function BoxPokemonPage() {
  // undefined = "on ne sait pas encore" (le serveur n'a pas accès à localStorage).
  // null = "pas de pokémon capturés".
  // number[] = "voilà les ids".
  // On lit localStorage dans useEffect (côté client uniquement) pour éviter
  // le "hydration mismatch" : le serveur et le client rendent le même état
  // initial (undefined → Loading...) puis le client met à jour.
  const [boxPokemon, setBoxPokemon] = useState<number[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    setBoxPokemon(readStoredPokemonIds());
  }, []);

  const { isLoading, data } = useQuery({
    queryKey: [`boxPokemon-${boxPokemon}`],
    queryFn: () =>
      Promise.all((boxPokemon ?? []).map((pokemon) => getPokemon(pokemon))),
    enabled: boxPokemon !== undefined && boxPokemon !== null,
  });

  // Première frame côté client : on attend la lecture de localStorage
  if (boxPokemon === undefined) {
    return <div>Loading...</div>;
  }

  if (!boxPokemon) {
    return <div>Tu n'as pas encore attrapé de Pokémon !</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((pokemon, i) => (
        <CaughtPokemon key={i} data={pokemon} />
      ))}
    </div>
  );
}
