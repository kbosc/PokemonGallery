// Menu du Safari : plein écran, l'utilisateur choisit un habitat ou
// tire au hasard avant d'entrer dans la rencontre.
//
// Navigation :
//   - Carte habitat → /safariPokemon/[habitat]  (ex: /safariPokemon/caverne)
//   - Carte "Surprise" → /safariPokemon/random   (habitat tiré côté client)
//   - Bouton ✕ → /  (quitter le safari)
import Link from "next/link";
import { HABITATS, type HabitatKey } from "./habitats";
import styles from "./safari.module.css";

// Ordre d'affichage des habitats dans la grille du menu.
const HABITAT_KEYS = Object.keys(HABITATS) as HabitatKey[];

export default function SafariMenuPage() {
  return (
    <div className={styles.menuScene}>
      <Link href="/" className={styles.exitButton} aria-label="Quitter le safari">
        ✕
      </Link>

      <div className={styles.menuContent}>
        <h1 className={styles.menuTitle}>Choisir un habitat</h1>

        <div className={styles.menuGrid}>
          {HABITAT_KEYS.map((key) => {
            const { label, Background } = HABITATS[key];
            return (
              <Link
                key={key}
                href={`/safariPokemon/${key}`}
                className={styles.habitatCard}
              >
                <div className={styles.habitatPreview} aria-hidden="true">
                  <Background />
                </div>
                <span className={styles.habitatCardLabel}>{label}</span>
              </Link>
            );
          })}

          {/* Carte spéciale "Surprise" : habitat tiré au hasard côté client */}
          <Link
            href="/safariPokemon/random"
            className={`${styles.habitatCard} ${styles.randomCard}`}
          >
            <div className={styles.habitatPreview} aria-hidden="true">
              <div className={styles.randomPreview}>?</div>
            </div>
            <span className={styles.habitatCardLabel}>Surprise !</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
