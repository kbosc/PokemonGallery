import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { CatchedPokemon } from "../../components/catchedPokemon/CatchedPokemon";
import React, { useEffect } from "react";

function readStoredPokemonIds() {
  const raw = localStorage.getItem("storagePokemon");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export default function BoxPokemon() {
  const boxPokemon = readStoredPokemonIds();

  // useQuery to get the pokemon data — only when we actually have ids
  const { isLoading, data } = useQuery(
    [`boxPokemon-${boxPokemon}`],
    () =>
      Promise.all(
        boxPokemon.map(async (pokemon) => {
          const result = await getPokemon(pokemon);
          return result;
        })
      ),
    { enabled: boxPokemon !== null }
  );

  // Empty state: no captures yet
  if (!boxPokemon) {
    return <div>Tu n'as pas encore attraper de Pokémon !</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((pokemon, i) => (
        <CatchedPokemon key={i} data={pokemon} />
      ))}
    </div>
  );
}
