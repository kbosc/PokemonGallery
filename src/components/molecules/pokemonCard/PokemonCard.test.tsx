import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { renderWithProviders } from "../../../test/renderWithProviders";

// On mocke le service Supabase pour contrôler l'état "captures du dresseur".
vi.mock("../../../lib/supabase/captures", () => ({
  getMyCaptures: vi.fn(),
  capturePokemon: vi.fn(),
  releasePokemon: vi.fn(),
}));

import { getMyCaptures } from "../../../lib/supabase/captures";

const makeCapture = (pokemon_id: number, suffix = "a") => ({
  id: `fake-${pokemon_id}-${suffix}`,
  owner_id: "fake-user",
  pokemon_id,
  nickname: null,
  nickname_changes_left: 1,
  is_shiny: false,
  caught_at: new Date().toISOString(),
});

describe("PokemonCard (read-only gallery)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("n'affiche aucun badge quand le dresseur ne possède pas ce pokémon", async () => {
    vi.mocked(getMyCaptures).mockResolvedValue([
      // Possède un Bulbasaur (id 1), mais pas de Pikachu (id 25).
      makeCapture(1),
    ]);

    renderWithProviders(
      <PokemonCard id={25} name="pikachu" image="pikachu.png" type="electric" />
    );

    // Les captures s'hydratent de manière asynchrone ; on attend que
    // le fetch soit résolu avant de valider l'absence de badge.
    await screen.findAllByText(/pikachu/i);
    expect(screen.queryByText(/^×\d+$/)).not.toBeInTheDocument();
  });

  it("affiche le badge ×N quand le dresseur possède plusieurs instances", async () => {
    vi.mocked(getMyCaptures).mockResolvedValue([
      makeCapture(25, "a"),
      makeCapture(25, "b"),
      makeCapture(25, "c"),
    ]);

    renderWithProviders(
      <PokemonCard id={25} name="pikachu" image="pikachu.png" type="electric" />
    );

    expect(await screen.findByText(/×3/)).toBeInTheDocument();
  });
});
