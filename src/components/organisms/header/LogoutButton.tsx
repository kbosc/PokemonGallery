// "use client" car on utilise le client Supabase navigateur
// et useRouter pour rafraîchir la page après déconnexion.
"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import styles from "./header.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // refresh() force Next.js à re-rendre les Server Components
    // (le Header va re-vérifier la session et afficher "Connexion").
    router.refresh();
  };

  return (
    <button className={styles.authButton} onClick={handleLogout}>
      Déconnexion
    </button>
  );
}
