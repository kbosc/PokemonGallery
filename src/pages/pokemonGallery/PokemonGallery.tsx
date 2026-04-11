import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import styles from "./pokemonGallery.module.css";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { fetchPokemons } from "../../api/pokeApi";
import Spinner from "../../components/atoms/spinner/Spinner";
import Button from "../../components/atoms/button/Button";
import PokemonCard from "../../components/molecules/pokemonCard/PokemonCard";

export default function PokemonGallery() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemons,
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].nextPage,
  });

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);

  const nTimesSpinner = 20;

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <main className={styles.gallery}>
      <div className={styles.cardContainer}>
        {isLoading || !data ? (
          [...Array(nTimesSpinner)].map((_, i) => <Spinner key={i} />)
        ) : (
          data.pages.map((group) =>
            group.map((pokemon) => (
              <PokemonCard
                key={pokemon.response.id}
                id={pokemon.response.id}
                name={pokemon.response.name}
                image={pokemon.response.sprites.front_default}
                type={pokemon.response.types[0].type.name}
              />
            ))
          )
        )}
      </div>
      <div className={styles.buttonRow}>
        <Button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </div>
    </main>
  );
}
