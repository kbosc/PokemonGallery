import GameboyComponent from "../../components/organisms/gameboy/GameboyComponent";
import styles from "./homePokemon.module.css";

export default function HomePokemon() {
  return (
    <div className={styles.container}>
      <GameboyComponent />
    </div>
  );
}
