import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import BoxPokemon from './BoxPokemon';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('BoxPokemon (smoke)', () => {
  // These two cases both represent "no captures yet":
  //   - `""` is what App.tsx writes on first mount (buggy init)
  //   - absence is the expected post-fix state
  // Both should render the empty state without crashing.
  it.each([
    ['with an empty string in storage', ''],
    ['with no storage key at all', null],
  ])('shows the empty state %s', async (_label, value) => {
    if (value !== null) {
      localStorage.setItem('storagePokemon', value);
    }

    renderWithProviders(<BoxPokemon />);

    expect(
      await screen.findByText(/tu n'as pas encore attraper/i)
    ).toBeInTheDocument();
  });
});
