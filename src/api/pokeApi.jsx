import axios from 'axios';

export const fetchPokemons = async () => {
    let poke = []
    const result = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=5&offset=0')

    result.data.results.forEach(async (pokemon) => {
        const resultPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        poke.push(resultPoke.data) 
    });
    return poke
}
