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
  // getUser() vérifie le token JWT dans les cookies.
  // Si valide → renvoie les infos de l'utilisateur.
  // Si pas connecté → user est null.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Pokemon</h1>
      <nav className={styles.nav}>
        <Link href="/">Accueil</Link>
        <Link href="/pokemonGallery">Gallery</Link>
        <Link href="/safariPokemon">Safari</Link>
        <Link href="/boxPokemon">Box Pokemon</Link>
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
