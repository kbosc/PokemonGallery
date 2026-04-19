import Link from "next/link";
import { HABITATS, type HabitatKey } from "./habitats";
import styles from "./safari.module.css";

const HABITAT_KEYS = Object.keys(HABITATS) as HabitatKey[];

export default function SafariMenuPage() {
  return (
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
  );
}

