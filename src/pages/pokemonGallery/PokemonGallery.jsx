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
import Spinner from "../../components/spinner/Spinner.jsx";
import PokemonCard from "../../components/pokemonCard/pokemonCard";

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

  const nTimesSpinner = 20;

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <GalleryContainer>
      <CardContainer>
        {!isLoading ?
          data.pages.map((group, i) =>
            group.map((pokemon) => (
              <PokemonCard
              draggable="true"
                key={pokemon.response.id}
                id={pokemon.response.id}
                name={pokemon.response.name}
                image={pokemon.response.sprites.front_default}
                type={pokemon.response.types[0].type.name}
              />
            )))
        :
          [...Array(nTimesSpinner)].map((e, i) => <Spinner key={i} />)  
      }
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
