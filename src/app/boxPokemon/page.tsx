// "use client" car on utilise React Query côté navigateur.
"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { CaughtPokemon } from "../../components/molecules/caughtPokemon/CaughtPokemon";
import { useMyCaptures } from "../../hooks/useMyCaptures";

// Shape minimale nécessaire pour l'affichage — getPokemon renvoie
// beaucoup plus, on ne type que ce qu'on consomme ici.
type PokemonDetail = {
  id: number;
  [key: string]: unknown;
};

export default function BoxPokemonPage() {
  // Toutes les captures du dresseur connecté (une ligne par INSTANCE).
  // La protection /boxPokemon par le middleware garantit qu'on a bien un user.
  const { data: captures, isLoading: capturesLoading } = useMyCaptures();

  // Déduplication : si j'ai 3 Pikachu, inutile de fetcher PokéAPI 3 fois.
  // On fetch une fois par espèce, puis on indexe par pokemon_id pour réassembler.
  const uniquePokemonIds = captures
    ? Array.from(new Set(captures.map((c) => c.pokemon_id)))
    : [];

  const { data: pokemonMap, isLoading: pokemonsLoading } = useQuery({
    queryKey: ["boxPokemon-data", uniquePokemonIds],
    queryFn: async () => {
      const pokemons = (await Promise.all(
        uniquePokemonIds.map((pid) => getPokemon(pid))
      )) as PokemonDetail[];
      return new Map(pokemons.map((p) => [p.id, p]));
    },
    enabled: uniquePokemonIds.length > 0,
  });

  if (capturesLoading) return <div>Loading...</div>;
  if (!captures || captures.length === 0) {
    return <div>Tu n&apos;as pas encore attrapé de Pokémon !</div>;
  }
  if (pokemonsLoading || !pokemonMap) return <div>Loading...</div>;

  // Une carte par INSTANCE (donc doublons attendus). Le key=capture.id est
  // un UUID unique, pas de warning React.
  return (
    <div>
      {captures.map((capture) => {
        const pokemon = pokemonMap.get(capture.pokemon_id);
        if (!pokemon) return null;
        // @ts-expect-error — getPokemon renvoie un any, CaughtPokemon
        // attend une shape spécifique que le JSON respecte à l'exécution.
        return <CaughtPokemon key={capture.id} data={pokemon} />;
      })}
    </div>
  );
}
