import axios from "axios";

export const fetchPokemons = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
}) => {
  const request = await axios.get(pageParam);
  return Promise.all(
    request.data.results.map(async (pokemon) => {
      const resultPoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      return { response: resultPoke.data, nextPage: request.data.next };
    })
  );
};

export const getPokemon = async (id) => {
  const response = await axios.get`https://pokeapi.co/api/v2/pokemon/${id}`;
  return response.data;
};
