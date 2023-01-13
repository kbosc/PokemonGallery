import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import React from "react";

export default function BoxPokemon() {
  const boxPokemon = JSON.parse(localStorage.getItem("storagePokemon"));

  const queryKey = ["boxPokemon"];
  const { isLoading, data } = useQuery(queryKey, () => {
    boxPokemon?.map((pokemon) => {
      console.log("pokemon:", pokemon);
      return getPokemon(pokemon);
    });
  });
  console.log("data", data);
  const pokemons = data || [];

  console.log(pokemons);

  if (!boxPokemon) {
    return <div>Tu n'as pas encore attraper de Pokémon !</div>;
  }
  return (
    <div>
      {boxPokemon.map((pokemon, i) => (
        <span key={i}>{pokemon}</span>
      ))}
    </div>
  );
}
