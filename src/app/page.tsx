// "use client" car GameboyComponent utilise useSound, zustand, addEventListener.
"use client";

import GameboyComponent from "../components/organisms/gameboy/GameboyComponent";
import styles from "./homePokemon.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <GameboyComponent />
    </div>
  );
}
