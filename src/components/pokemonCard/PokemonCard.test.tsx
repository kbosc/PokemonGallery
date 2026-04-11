import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { renderWithProviders } from '../../test/renderWithProviders';

vi.mock('use-sound', () => ({
  default: () => [() => {}],
}));

describe('PokemonCard (smoke)', () => {
  beforeEach(() => {
    // Pre-seed a valid (empty) captured list so the card logic
    // does not fight the App.tsx init bug — that bug is tested separately.
    localStorage.setItem('storagePokemon', '[]');
    vi.useFakeTimers();
    // Force Math.random so catchRandomize always triggers a successful capture:
    // Math.floor(0.9 * 10 + 1) = 10, and 10 > 3.
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('persists a captured pokemon id to localStorage and flips the UI', () => {
    renderWithProviders(
      <PokemonCard id={25} name="pikachu" image="pikachu.png" type="electric" />
    );

    // Initial state: pokeball capture button, no "Relacher" yet
    expect(screen.queryByText(/relacher/i)).not.toBeInTheDocument();

    const captureButton = screen.getByRole('button');
    fireEvent.click(captureButton);

    // catchRandomize pushes the id into oldData synchronously,
    // so localStorage is updated immediately.
    expect(JSON.parse(localStorage.getItem('storagePokemon') ?? '[]')).toContain(25);

    // catchRandomize schedules the `caught` state flip after 1s via setTimeout
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('button', { name: /relacher/i })).toBeInTheDocument();
  });
});
