// "use client" car on utilise useState (formulaire) et le client Supabase
// navigateur pour l'authentification.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    // preventDefault empêche le rechargement de la page par défaut
    // d'un formulaire HTML.
    e.preventDefault();
    setError(null);
    setLoading(true);

    // signInWithPassword envoie l'email et le mot de passe à Supabase.
    // Supabase vérifie le mdp (hashé côté serveur), et si c'est bon,
    // renvoie un token JWT stocké automatiquement dans un cookie.
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Connexion réussie → retour à l'accueil.
      // router.refresh() force Next.js à re-vérifier la session
      // dans les Server Components (Header, middleware...).
      router.refresh();
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    // signInWithOAuth ouvre une popup Google (ou redirige).
    // Supabase gère tout l'échange OAuth : code, token, session.
    // redirectTo dit à Google "après la connexion, reviens ici".
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Connexion</h2>

      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className={styles.divider}>— ou —</div>

      <button className={styles.googleButton} onClick={handleGoogleLogin}>
        Continuer avec Google
      </button>

      <p className={styles.link}>
        Pas encore de compte ? <Link href="/signup">Créer un compte</Link>
      </p>
    </div>
  );
}
