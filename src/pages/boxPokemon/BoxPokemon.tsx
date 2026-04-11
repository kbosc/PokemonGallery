import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../../api/pokeApi";
import { CaughtPokemon } from "../../components/caughtPokemon/CaughtPokemon";

function readStoredPokemonIds(): number[] | null {
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
  const { isLoading, data } = useQuery({
    queryKey: [`boxPokemon-${boxPokemon}`],
    queryFn: () =>
      Promise.all((boxPokemon ?? []).map((pokemon) => getPokemon(pokemon))),
    enabled: boxPokemon !== null,
  });

  // Empty state: no captures yet
  if (!boxPokemon) {
    return <div>Tu n'as pas encore attraper de Pokémon !</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((pokemon, i) => (
        <CaughtPokemon key={i} data={pokemon} />
      ))}
    </div>
  );
}
