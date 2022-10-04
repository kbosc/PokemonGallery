import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import { GalleryContainer } from "./pokemonGallery.style";
import { fetchPokemons } from "../../api/pokeApi";
import Spinner from "../spinner/index.jsx";
import PokemonCard from "../pokemonCard";
import axios from "axios";
import { useEffect } from "react";

export default function PokemonGallery() {
  // const [pokemon, setPokemon] = useState([])
  // Solution B et C
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
  );
  const [counterPokemonUrl, setCounterPokemonUrl] = useState(20);
  // Solution C
  // const [pokemons, setPokemons] = useState([]);

  // const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
  // useInfiniteQuery(["pokemon"], fetchPokemons, {
  //   getNextPageParam: (lastPage) => lastPage.nextPage,
  // });
  // Solution B et C
  const { data, isError, error, isLoading } = useQuery(
    ["pokemon", { url }],
    fetchPokemons
  );
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

    // useEffect(() =>{
    //   data.pages[0].response.map(async (pokemon) => {
    //         const resultPoke = await axios.get(
    //           `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    //         );
    //         return setPokemon((prev) => [...prev, resultPoke.data])
    //   })
    // }, [pokemon])

  // Solution B et C
  const nextOrPrevPage = (e) => {
    e.target.innerText === "Prochains Pokemons"
      ? setCounterPokemonUrl((prev) => prev + 20)
      : counterPokemonUrl !== 0 && setCounterPokemonUrl((prev) => prev - 20);
    setUrl(
      "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + counterPokemonUrl
      );
      // Solution C
      // data.map((pokemon) => setPokemons((p) => [...p, pokemon]));
    };
    console.log(data)
  return (
    <div>
      <GalleryContainer>
      {/* {data.pages[0].map((group, i) =>
            <PokemonCard
            key={ group.response.id}
            id={ group.response.id}
            name={ group.response.name}
            image={group.response.sprites.front_default}
            type={group.response.types[0].type.name}
          />
        )} */}
      {/* {pokemon.map((pokemon) =>
            <PokemonCard
            key={ pokemon.id}
            id={ pokemon.id}
            name={ pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
          />
        )} */}
        {/* Solution B */}
        {/* Débute avec 20 pokémons et écrase les précedents pour afficher les 20 suivants à l'aide du button */}
         {data.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
          />
        ))}

        {/* Solution C */}
        {/* Débute avec 0 pokémon et les fait apparaitre 20 par 20 à l'aide du button */}
        {/* inconvéniant notable, retour au début de page à chaque chargement d'autres pokemons */}
        {/* {pokemons.map((pokemon) => (
        <PokemonCard
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.sprites.front_default}
        type={pokemon.types[0].type.name}
        />
        ))}
      <button onClick={nextPage}>Découvre les Pokemons</button> */}
      </GalleryContainer>
      {/* <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button> */}
        {/* <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div> */}
      <button onClick={(e) => nextOrPrevPage(e)}>Précédents Pokemons</button>
      <button onClick={(e) => nextOrPrevPage(e)}>Prochains Pokemons</button>
    </div>
  );
}
