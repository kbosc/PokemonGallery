interface FetchPokemonsParams {
  pageParam?: string;
}

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  next: string | null;
  results: PokemonListItem[];
}

export const fetchPokemons = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
}: FetchPokemonsParams = {}) => {
  const response = await fetch(pageParam);
  const list: PokemonListResponse = await response.json();

  return Promise.all(
    list.results.map(async (pokemon) => {
      const detailResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const detail = await detailResponse.json();
      return { response: detail, nextPage: list.next };
    })
  );
};

export const getPokemon = async (pokemon: string | number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  return data;
};
