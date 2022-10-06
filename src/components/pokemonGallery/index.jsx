import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import {
  ContainerButton,
  GalleryContainer,
  CardContainer,
} from "./pokemonGallery.style";
import useIntersectionObserver from "../../hooks/useIntersectionOberserver";
import { ButtonStyled } from "../../assets/styles/theme";
import { fetchPokemons } from "../../api/pokeApi";
import Spinner from "../spinner/index.jsx";
import PokemonCard from "../pokemonCard";

export default function PokemonGallery() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["pokemon"], fetchPokemons, {
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].nextPage,
  });

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <GalleryContainer>
      <CardContainer>
        {data.pages.map((group, i) =>
          group.map((pokemon) => (
            <PokemonCard
              key={pokemon.response.id}
              id={pokemon.response.id}
              name={pokemon.response.name}
              image={pokemon.response.sprites.front_default}
              type={pokemon.response.types[0].type.name}
            />
          ))
        )}
      </CardContainer>
      <ContainerButton>
        <ButtonStyled
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </ButtonStyled>
      </ContainerButton>
    </GalleryContainer>
  );
}
