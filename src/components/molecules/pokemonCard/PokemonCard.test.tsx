import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { renderWithProviders } from "../../../test/renderWithProviders";

vi.mock("use-sound", () => ({
  default: () => [() => {}],
}));

// Mock du service Supabase : on simule un user sans capture initiale,
// et une insertion réussie qui retourne la nouvelle instance.
vi.mock("../../../lib/supabase/captures", () => ({
  getMyCaptures: vi.fn(() => Promise.resolve([])),
  capturePokemon: vi.fn((input: { pokemon_id: number }) =>
    Promise.resolve({
      id: "fake-uuid-" + input.pokemon_id,
      owner_id: "fake-user",
      pokemon_id: input.pokemon_id,
      nickname: null,
      is_shiny: false,
      caught_at: new Date().toISOString(),
    })
  ),
  releasePokemon: vi.fn(() => Promise.resolve()),
}));

import { capturePokemon } from "../../../lib/supabase/captures";

describe("PokemonCard (smoke)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Force la réussite du tir : Math.floor(0.9 * 10 + 1) = 10 > 3.
    vi.spyOn(Math, "random").mockReturnValue(0.9);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("appelle capturePokemon et flippe l'UI vers Relacher", async () => {
    renderWithProviders(
      <PokemonCard id={25} name="pikachu" image="pikachu.png" type="electric" />
    );

    // État initial : bouton pokéball, pas de "Relacher"
    expect(screen.queryByText(/relacher/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    // Le hook déclenche capturePokemon après l'animation (1s) + attend
    // la résolution de la mutation et le rerender. On laisse findByRole
    // poller jusqu'à 3s pour absorber ces délais.
    const releaseButton = await screen.findByRole(
      "button",
      { name: /relacher/i },
      { timeout: 3000 }
    );
    expect(releaseButton).toBeInTheDocument();
    expect(capturePokemon).toHaveBeenCalledWith({ pokemon_id: 25 });
  });
});
