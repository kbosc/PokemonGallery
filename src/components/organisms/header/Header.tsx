// next/link remplace react-router-dom Link.
// Seule différence : on utilise "href" au lieu de "to".
// Bonus : Next.js précharge automatiquement les pages liées
// quand le lien apparaît dans le viewport (prefetch).
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Pokemon</h1>
      <nav className={styles.nav}>
        <Link href="/">Accueil</Link>
        <Link href="/pokemonGallery">Gallery</Link>
        <Link href="/safariPokemon">Safari</Link>
        <Link href="/boxPokemon">Box Pokemon</Link>
      </nav>
    </header>
  );
}
