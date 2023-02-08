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

export const getPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  return data;
};

// export const getPokemon = async (pokemon, boxPokemon) => {
//   return Promise.all(
//     boxPokemon.map(async (pokemon) => {
//       const result = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon/${pokemon}`
//       );
//       return result.data;
//     })
//   );
// };
