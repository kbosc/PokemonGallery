// Avec Vite on utilisait "?react" pour transformer un SVG en composant.
// Avec Next.js, c'est @svgr/webpack dans next.config.ts qui s'en charge
// automatiquement — on importe le .svg directement.
import Pokeball from "../../../assets/images/pokeball.svg";
import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <svg className={styles.spinner}>
      <Pokeball />
    </svg>
  );
}
