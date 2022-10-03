import { useQuery } from "@tanstack/react-query";
import React from "react";

import { GalleryContainer } from "./pokemonGallery.style";
import { fetchPokemons } from "../../api/pokeApi";
import Spinner from "../spinner/index.jsx";
import PokemonCard from "../pokemonCard";

export default function PokemonGallery() {
  const { data, isError, error, isLoading } = useQuery(
    ["pokemon"],
    fetchPokemons
  );
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // console.log(data);

  return (
    <GalleryContainer>
      {data.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.front_default}
          type={pokemon.types[0].type.name}
        />
      ))}
    </GalleryContainer>
  );
}
