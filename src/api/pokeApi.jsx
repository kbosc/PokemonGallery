import axios from "axios";

// export const fetchPokemons = async ({pageParam = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'}) => {
//   const request = await fetch(pageParam);
//   const { results, next } = await request.json();
//   return { response: results, nextPage: next };
//   // const request = await axios.get(pageParam);
//   // return Promise.all(
//   //   request.data.results.map(async (pokemon) => {
//   //     const resultPoke = await axios.get(
//   //       `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
//   //     );
//   //     return { response: resultPoke.data, nextPage: request.data.next };
//   //   })
//   // );
// };
// data.map((pokemon) => setPokemons((p) => [...p, pokemon]))

export const fetchPokemons = async (url) => {
  const result = await axios.get(url.queryKey[1].url);
  return Promise.all(
    result.data.results.map(async (pokemon) => {
      const resultPoke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      return resultPoke.data;
    })
  );
};
