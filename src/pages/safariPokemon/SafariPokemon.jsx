import React from "react";
import { useStore } from "../../store/useStore.ts";

export default function SafariPokemon() {
  const bears = useStore((state) => state.bears);
  const fishes = useStore((state) => state.fishes);
  const addBear = useStore((state) => state.addBear);
  const addFish = useStore((state) => state.addFish);
  const eatFish = useStore((state) => state.eatFish);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
      <button onClick={() => addFish()}>Add a fish</button>
      <button onClick={() => eatFish()}>Bear eat fish</button>
    </div>
  );
}
