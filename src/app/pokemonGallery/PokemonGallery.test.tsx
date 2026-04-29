import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import PokemonGalleryPage from "./page";
import { renderWithProviders } from "../../test/renderWithProviders";

// use-sound reaches for an audio file at import time
vi.mock("use-sound", () => ({
  default: () => [() => {}],
}));

// Le SVG pokeball est transformé par @svgr/webpack en production
// mais en test il n'y a pas de webpack. On mock le Spinner.
vi.mock("../../components/atoms/spinner/Spinner", () => ({
  default: () => <div data-testid="spinner" />,
}));

vi.mock("../../api/pokeApi", () => ({
  fetchPokemons: vi.fn().mockResolvedValue([
    {
      response: {
        id: 1,
        name: "bulbasaur",
        sprites: { front_default: "bulbasaur.png" },
        types: [{ type: { name: "grass" } }],
      },
      nextPage: null,
    },
  ]),
  getPokemon: vi.fn(),
  getPokemonIdsByType: vi.fn(),
  POKEMON_TYPES: [
    "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy",
  ],
}));

describe("PokemonGallery (smoke)", () => {
  it("mounts and displays a fetched pokemon card", async () => {
    renderWithProviders(<PokemonGalleryPage />);

    await waitFor(() => {
      expect(screen.getAllByText(/bulbasaur/i).length).toBeGreaterThan(0);
    });
  });
});
