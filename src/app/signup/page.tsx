// "use client" car formulaire interactif + appel Supabase.
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import PasswordInput from "../../components/atoms/passwordInput/PasswordInput";
// On réutilise les mêmes styles que login — même design.
import styles from "../login/login.module.css";

export default function SignupPage() {
  const [trainerName, setTrainerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Vérification que les deux mots de passe correspondent, avant
    // de déclencher un quelconque appel réseau.
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    // 1. Pré-check : le pseudo est-il déjà pris ?
    // On fait cette vérif AVANT le signUp pour afficher un message clair.
    // Sans ça, l'erreur viendrait du trigger SQL (unique_violation) et
    // ressemblerait à "Database error saving new user" — peu lisible.
    // Petit risque de race condition (deux users qui s'inscrivent en même
    // temps avec le même pseudo) mais la contrainte SQL UNIQUE garantit
    // qu'il n'y aura jamais deux pseudos identiques en base.
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("trainer_name", trainerName)
      .maybeSingle();

    if (existing) {
      setError("Ce pseudo de dresseur est déjà pris.");
      setLoading(false);
      return;
    }

    // 2. Création du compte auth + transmission du pseudo au trigger SQL.
    // `options.data` remplit `raw_user_meta_data` dans auth.users,
    // que notre fonction handle_new_user() lit pour insérer dans profiles.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          trainer_name: trainerName,
        },
      },
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
          type="text"
          placeholder="Pseudo de dresseur (3-20 caractères)"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          minLength={3}
          maxLength={20}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          inputClassName={styles.input}
          placeholder="Mot de passe (6 caractères min.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <PasswordInput
          inputClassName={styles.input}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={6}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.link}>
          Tu pourras changer ton pseudo 2 fois plus tard.
        </p>
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
