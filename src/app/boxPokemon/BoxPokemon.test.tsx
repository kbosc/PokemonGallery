import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import BoxPokemonPage from "./page";
import { renderWithProviders } from "../../test/renderWithProviders";

// On mocke le service Supabase : le test valide la logique UI,
// pas la connexion réseau.
vi.mock("../../lib/supabase/captures", () => ({
  getMyCaptures: vi.fn(),
  capturePokemon: vi.fn(),
  releasePokemon: vi.fn(),
}));

import { getMyCaptures } from "../../lib/supabase/captures";

describe("BoxPokemon (smoke)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche l'état vide quand le dresseur n'a aucune capture", async () => {
    vi.mocked(getMyCaptures).mockResolvedValue([]);

    renderWithProviders(<BoxPokemonPage />);

    expect(
      await screen.findByText(/tu n'as pas encore attrapé/i)
    ).toBeInTheDocument();
  });
});
