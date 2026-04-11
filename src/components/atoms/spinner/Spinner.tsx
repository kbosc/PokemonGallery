import Pokeball from "../../../assets/images/pokeball.svg?react";
import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <svg className={styles.spinner}>
      <Pokeball />
    </svg>
  );
}
