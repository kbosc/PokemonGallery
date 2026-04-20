"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import styles from "./loginGameboy.module.css";

export default function LoginGameboy({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    } else {
      router.refresh();
      router.push("/pokemonGallery");
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.back} onClick={onBack}>◀</span>
        <span className={styles.title}>CONNEXION</span>
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "..." : "SE CONNECTER"}
        </button>
      </form>

      <button type="button" className={styles.registerBtn} onClick={() => router.push("/signup")}>
        CRÉER UN COMPTE
      </button>

      <div className={styles.googleLink} onClick={handleGoogle}>
        continuer avec Google
      </div>
    </div>
  );
}
