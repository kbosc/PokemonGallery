import axios from "axios";

export const fetchPokemons = async () => {
  const result = await axios.get(
    "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"
  );
  return Promise.all(
    result.data.results.map(async (pokemon) => {
      const resultPoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      return resultPoke.data;
    })
  );
};
