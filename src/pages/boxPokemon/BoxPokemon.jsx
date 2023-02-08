import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { CatchedPokemon } from "../../components/catchedPokemon/CatchedPokemon";
import React, { useEffect } from "react";

export default function BoxPokemon() {
  let boxPokemon = JSON.parse(localStorage.getItem("storagePokemon"));

  // useQuery to get the pokemon data
  const { isLoading, data } = useQuery([`boxPokemon-${boxPokemon}`], () => {
    return Promise.all(
      boxPokemon.map(async (pokemon) => {
        const result = await getPokemon(pokemon);
        return result;
      })
    );
  });

  // if the pokemon is loading, return a spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if the pokemon is not in the box, return a message
  if (!boxPokemon) {
    return <div>Tu n'as pas encore attraper de Pokémon !</div>;
  } else {
    console.log(data, "data");
    return (
      <div>
        {data.map((pokemon, i) => (
          <CatchedPokemon key={i} data={pokemon} />
        ))}
      </div>
    );
  }
}
