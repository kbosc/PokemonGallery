"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import React from "react";

import styles from "./pokemonGallery.module.css";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { fetchPokemons, getPokemon, POKEMON_TYPES } from "../../api/pokeApi";
import Spinner from "../../components/atoms/spinner/Spinner";
import PokemonCard from "../../components/molecules/pokemonCard/PokemonCard";
import { useMyCaptures } from "../../hooks/useMyCaptures";

type CatchFilter = "all" | "caught" | "uncaught";

export default function PokemonGalleryPage() {
  const [catchFilter, setCatchFilter] = useState<CatchFilter>("all");
  const [typeFilter, setTypeFilter] = useState("");

  const { data: captures } = useMyCaptures();
  const caughtIds = useMemo(
    () => new Set(captures?.map((c) => c.pokemon_id) ?? []),
    [captures]
  );
  const uniqueCaughtIds = useMemo(
    () => Array.from(caughtIds).sort((a, b) => a - b),
    [caughtIds]
  );

  // ── Infinite scroll (mode "all" et "uncaught") ──
  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemons,
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].nextPage,
  });

  // ── Fetch direct par IDs capturés (mode "caught") ──
  const { data: caughtPokemons, isLoading: caughtLoading } = useQuery({
    queryKey: ["caught-pokemon-details", uniqueCaughtIds],
    queryFn: () => Promise.all(uniqueCaughtIds.map((id) => getPokemon(id))),
    enabled: catchFilter === "caught" && uniqueCaughtIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  useIntersectionObserver({
    target: loadMoreRef as React.RefObject<Element>,
    onIntersect: fetchNextPage,
    enabled: hasNextPage && catchFilter === "all",
  });

  const allPokemons = useMemo(
    () => infiniteData?.pages.flatMap((group) => group.map((p) => p.response)) ?? [],
    [infiniteData]
  );

  const visible = useMemo(() => {
    if (catchFilter === "caught") {
      return (caughtPokemons ?? []).filter(
        (p) => !typeFilter || p.types?.some((t: { type: { name: string } }) => t.type.name === typeFilter)
      );
    }
    return allPokemons.filter((p) => {
      if (catchFilter === "uncaught" && caughtIds.has(p.id)) return false;
      if (typeFilter && !p.types?.some((t: { type: { name: string } }) => t.type.name === typeFilter)) return false;
      return true;
    });
  }, [catchFilter, caughtPokemons, allPokemons, caughtIds, typeFilter]);

  const isLoading = catchFilter === "caught" ? caughtLoading && uniqueCaughtIds.length > 0 : infiniteLoading;
  const totalSpecies = caughtIds.size;
  const totalCaptures = captures?.length ?? 0;

  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>POKÉDEX</h1>
        <p className={styles.subtitle}>
          <strong>{totalSpecies}</strong> espèces attrapées
          {totalCaptures > totalSpecies && (
            <span className={styles.subtitleMuted}> ({totalCaptures} captures au total)</span>
          )}
          {" "}· cliquer sur une carte pour les stats
        </p>

        {/* Filters */}
        <div className={styles.filters}>
          {([
            ["all", "Tous"],
            ["caught", "✓ Attrapés"],
            ["uncaught", "○ Manquants"],
          ] as [CatchFilter, string][]).map(([val, label]) => (
            <button
              key={val}
              className={`${styles.filterBtn} ${catchFilter === val ? styles.filterBtnActive : ""}`}
              onClick={() => setCatchFilter(val)}
            >
              {label}
            </button>
          ))}
          <select
            className={styles.typeSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Tous types</option>
            {POKEMON_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.cardContainer}>
        {isLoading
          ? [...Array(20)].map((_, i) => <Spinner key={i} />)
          : visible.map((pokemon) => (
              <PokemonCard
                key={`${pokemon.id}`}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites?.front_default}
                type={pokemon.types?.[0]?.type?.name ?? "normal"}
                artwork={pokemon.sprites?.other?.["official-artwork"]?.front_default}
                types={pokemon.types}
                stats={pokemon.stats}
              />
            ))}
      </div>

      {/* Infinite scroll sentinel — uniquement en mode "all" */}
      {catchFilter === "all" && (
        <div ref={loadMoreRef} className={styles.loadSentinel}>
          {isFetchingNextPage && (
            <span className={styles.loadingText}>Chargement…</span>
          )}
          {!hasNextPage && !infiniteLoading && (
            <span className={styles.loadingText}>— FIN DU POKÉDEX —</span>
          )}
        </div>
      )}
    </main>
  );
}
