// Input mot de passe réutilisable avec un toggle œil pour afficher/masquer.
// Encapsule la logique type="password"/"text" + l'icône œil, de sorte à
// l'utiliser aussi bien sur /login que sur /signup sans dupliquer le code.

"use client";

import { useState } from "react";
import styles from "./passwordInput.module.css";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  // Classe appliquée au <input> lui-même (ex: styles.input du parent)
  // pour que l'apparence reste cohérente avec les autres champs du form.
  inputClassName?: string;
};

export default function PasswordInput({
  inputClassName,
  ...inputProps
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        {...inputProps}
        type={visible ? "text" : "password"}
        className={`${inputClassName ?? ""} ${styles.input}`.trim()}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((v) => !v)}
        aria-label={
          visible ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        aria-pressed={visible}
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

// Icônes inline (évite une dépendance supplémentaire).
// width/height sont contrôlées via CSS sur .toggle svg.
function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.77 19.77 0 0 1 4.06-5.42" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.79 19.79 0 0 1-3.11 4.26" />
      <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
