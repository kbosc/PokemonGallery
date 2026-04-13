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

// -------------------------------------------------------------------
// Pokemon par type (utilisé par les habitats du safari)
// -------------------------------------------------------------------

// Tous les types de la franchise (Gen 1+). On les liste explicitement
// pour avoir l'autocomplétion + erreur de typo dans les configs habitat.
export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
] as const;
export type PokemonType = (typeof POKEMON_TYPES)[number];

// Shape minimaliste de la réponse /type/{name}. On ne garde que ce qu'on
// utilise — l'endpoint renvoie beaucoup plus (moves, damage_relations…).
type TypeApiResponse = {
  pokemon: { pokemon: { name: string; url: string } }[];
};

// Extrait l'ID PokéAPI depuis une URL du genre
//   https://pokeapi.co/api/v2/pokemon/27/
// Renvoie null si l'URL n'est pas parsable (sécurité).
function parsePokemonIdFromUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

/**
 * Renvoie les IDs PokéAPI de tous les pokémons d'un type donné, filtrés
 * à la borne `maxId` (par défaut 151 = Gen 1 uniquement).
 *
 * Note : l'endpoint /type/{name} inclut aussi les formes alternatives
 * (ex: raichu-alola = 10100). Le filtre maxId les exclut automatiquement.
 */
export const getPokemonIdsByType = async (
  type: PokemonType,
  maxId: number = 151
): Promise<number[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data: TypeApiResponse = await response.json();

  return data.pokemon
    .map((entry) => parsePokemonIdFromUrl(entry.pokemon.url))
    .filter((id): id is number => id !== null && id <= maxId);
};
