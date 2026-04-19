// Header est un Server Component async.
// "async" permet d'appeler await directement dans le composant —
// ici pour vérifier la session Supabase côté serveur.
// Avantage : pas de chargement visible, pas de "flash" déconnecté→connecté.

import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";
import LogoutButton from "./LogoutButton";
import styles from "./header.module.css";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        PokéGallery
      </Link>

      <nav className={styles.nav} aria-label="Navigation principale">
        <Link href="/pokemonGallery" className={styles.navLink}>
          Galerie
        </Link>
        <Link href="/safariPokemon" className={styles.navLink}>
          Safari
        </Link>
        <Link href="/boxPokemon" className={styles.navLink}>
          Ma Box
        </Link>
        {user ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className={styles.authLink}>
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}
