import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import PokemonGallery from './PokemonGallery';
import { renderWithProviders } from '../../test/renderWithProviders';

// use-sound reaches for an audio file at import time
vi.mock('use-sound', () => ({
  default: () => [() => {}],
}));

vi.mock('../../api/pokeApi', () => ({
  fetchPokemons: vi.fn().mockResolvedValue([
    {
      response: {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'bulbasaur.png' },
        types: [{ type: { name: 'grass' } }],
      },
      nextPage: null,
    },
  ]),
}));

describe('PokemonGallery (smoke)', () => {
  it('mounts and displays a fetched pokemon card', async () => {
    renderWithProviders(<PokemonGallery />);

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
  });
});
