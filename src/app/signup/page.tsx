// "use client" car formulaire interactif + appel Supabase.
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
// On réutilise les mêmes styles que login — même design.
import styles from "../login/login.module.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // signUp crée un nouveau compte dans Supabase :
    // 1. Vérifie que l'email n'existe pas déjà
    // 2. Hash le mot de passe (jamais stocké en clair)
    // 3. Crée l'entrée dans auth.users
    // 4. Envoie un email de confirmation (configurable dans le dashboard)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Compte créé !</h2>
        <p className={styles.link}>
          Vérifie tes emails pour confirmer ton compte, puis{" "}
          <Link href="/login">connecte-toi</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Créer un compte</h2>

      <form className={styles.form} onSubmit={handleSignup}>
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
          placeholder="Mot de passe (6 caractères min.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>

      <p className={styles.link}>
        Déjà un compte ? <Link href="/login">Se connecter</Link>
      </p>
    </div>
  );
}
