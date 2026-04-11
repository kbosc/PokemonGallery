import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Pokemon</h1>
      <nav className={styles.nav}>
        <Link to="/">Accueil</Link>
        <Link to="/pokemonGallery">Gallery</Link>
        <Link to="/safariPokemon">Safari</Link>
        <Link to="/boxPokemon">Box Pokemon</Link>
      </nav>
    </header>
  );
}
