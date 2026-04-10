export const fetchPokemons = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
}) => {
  const response = await fetch(pageParam);
  const list = await response.json();

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

export const getPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  return data;
};
