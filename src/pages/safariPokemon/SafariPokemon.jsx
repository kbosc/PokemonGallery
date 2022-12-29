import React from "react";
import { useStore } from "../../store/useStore.ts";

export default function SafariPokemon() {
  const bears = useStore((state) => state.bears);
  const fishes = useStore((state) => state.fishes);
  const addBear = useStore((state) => state.addBear);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
    </div>
  );
}
