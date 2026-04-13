// Garde-fou : on s'assure que l'union des pools de tous les habitats
// couvre les 151 pokémons Gen 1.
//
// Ce test attrape les régressions du genre :
//   - on ajoute un nouveau type sans le mapper à un habitat
//   - PokéAPI change un typing rétro-actif (gen 6 fairy, etc.) et un
//     pokémon disparaît silencieusement de tous les pools
//   - on supprime un extraId par mégarde
//
// Le test n'appelle pas l'API : il consomme un fixture statique
// (./__fixtures__/gen1ByType.ts) qui reflète l'état de PokéAPI au
// moment de l'écriture du fixture.

import { describe, expect, it } from "vitest";
import { computeHabitatPool, HABITATS } from "./index";
import { GEN1_POKEMON_BY_TYPE } from "./__fixtures__/gen1ByType";

describe("Safari habitat coverage", () => {
  it("covers all 151 Gen 1 pokemon across the union of habitat pools", () => {
    const covered = new Set<number>();

    for (const habitat of Object.values(HABITATS)) {
      const pool = computeHabitatPool(
        habitat.pool,
        (type) => GEN1_POKEMON_BY_TYPE[type]
      );
      pool.forEach((id) => covered.add(id));
    }

    const missing: number[] = [];
    for (let id = 1; id <= 151; id++) {
      if (!covered.has(id)) missing.push(id);
    }

    expect(missing).toEqual([]);
  });
});
