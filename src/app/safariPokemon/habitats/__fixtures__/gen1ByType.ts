// Snapshot figé de PokéAPI : pour chaque type, la liste des IDs des
// pokémons Gen 1 (≤ 151) qui possèdent ce type comme slot 1 ou slot 2.
//
// IMPORTANT : reflète l'état CURRENT de PokéAPI, pas le typage Gen 1
// d'origine. Conséquence : Clefairy/Clefable sont en `fairy` (et plus
// en `normal`), Magnemite/Magneton sont en `electric` ET `steel`,
// Jigglypuff/Wigglytuff/Mr. Mime sont aussi en `fairy`.
//
// Sert exclusivement au test de couverture habitats.test.ts. Le code
// applicatif lui ne dépend QUE de PokéAPI live (via getPokemonIdsByType).
//
// Pour régénérer ce fixture si PokéAPI change ses typings rétro-actifs :
//   for type in normal fire ...; do
//     curl -s https://pokeapi.co/api/v2/type/$type \
//       | jq '.pokemon[].pokemon.url' \
//       | grep -oE '/pokemon/([0-9]+)/' \
//       | grep -oE '[0-9]+' \
//       | awk '$1 <= 151'
//   done

import type { PokemonType } from "../../../../api/pokeApi";

export const GEN1_POKEMON_BY_TYPE: Record<PokemonType, number[]> = {
  normal: [
    16, 17, 18, 19, 20, 21, 22, 39, 40, 52, 53, 83, 84, 85, 108, 113, 115, 128,
    132, 133, 137, 143,
  ],
  fire: [4, 5, 6, 37, 38, 58, 59, 77, 78, 126, 136, 146],
  water: [
    7, 8, 9, 54, 55, 60, 61, 62, 72, 73, 79, 80, 86, 87, 90, 91, 98, 99, 116,
    117, 118, 119, 120, 121, 129, 130, 131, 134, 138, 139, 140, 141,
  ],
  electric: [25, 26, 81, 82, 100, 101, 125, 135, 145],
  grass: [1, 2, 3, 43, 44, 45, 46, 47, 69, 70, 71, 102, 103, 114],
  ice: [87, 91, 124, 131, 144],
  fighting: [56, 57, 62, 66, 67, 68, 106, 107],
  poison: [
    1, 2, 3, 13, 14, 15, 23, 24, 29, 30, 31, 32, 33, 34, 41, 42, 43, 44, 45, 48,
    49, 69, 70, 71, 72, 73, 88, 89, 92, 93, 94, 109, 110,
  ],
  ground: [27, 28, 31, 34, 50, 51, 74, 75, 76, 95, 104, 105, 111, 112],
  flying: [
    6, 12, 16, 17, 18, 21, 22, 41, 42, 83, 84, 85, 123, 130, 142, 144, 145, 146,
    149,
  ],
  psychic: [63, 64, 65, 79, 80, 96, 97, 102, 103, 121, 122, 124, 150, 151],
  bug: [10, 11, 12, 13, 14, 15, 46, 47, 48, 49, 123, 127],
  rock: [74, 75, 76, 95, 111, 112, 138, 139, 140, 141, 142],
  ghost: [92, 93, 94],
  dragon: [147, 148, 149],
  // Aucun pokémon Gen 1 n'a le type dark (introduit en Gen 2).
  dark: [],
  // Steel apparu en Gen 2 et appliqué rétro-activement à Magnemite/Magneton.
  steel: [81, 82],
  // Fairy apparu en Gen 6, appliqué rétro-activement à Clefairy, Clefable,
  // Jigglypuff, Wigglytuff (en plus de leur type d'origine) et Mr. Mime.
  fairy: [35, 36, 39, 40, 122],
};
