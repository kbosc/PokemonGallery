import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import BoxPokemonPage from "./page";
import { renderWithProviders } from "../../test/renderWithProviders";

describe("BoxPokemon (smoke)", () => {
  it.each([
    ["with an empty string in storage", ""],
    ["with no storage key at all", null],
  ])("shows the empty state %s", async (_label, value) => {
    if (value !== null) {
      localStorage.setItem("storagePokemon", value);
    }

    renderWithProviders(<BoxPokemonPage />);

    expect(
      await screen.findByText(/tu n'as pas encore attrapé/i)
    ).toBeInTheDocument();
  });
});
