// Habitat "Forêt" : décor de fond d'une forêt dense.
//
// Couches (du fond vers l'avant) :
//   1. Dégradé vertical vert sombre → marron sol.
//   2. Canopée : courbes vertes très foncées en haut.
//   3. Troncs d'arbres sur les côtés (effet de cadre).
//   4. Brouillard léger en bas.
//   5. Lucioles qui flottent en boucle (animation aléatoire).
//
// Toutes les positions/durées sont déterministes pour éviter le
// hydration mismatch côté SSR.

import styles from "./foret.module.css";

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 7.1) % 100,
  top: 20 + ((i * 11) % 50), // 20% à 70%
  delay: (i * 0.6) % 5,
  duration: 4 + (i % 4) * 0.8, // 4s à 6.4s
}));

// Canopée : 4 demi-cercles aplatis qui se chevauchent en haut.
const CANOPY_BLOBS = [
  { left: "-5%", width: 40, height: 50 },
  { left: "20%", width: 45, height: 55 },
  { left: "50%", width: 50, height: 60 },
  { left: "75%", width: 42, height: 50 },
];

// Troncs d'arbres : 2 gros au premier plan (côtés), 3 plus fins en arrière.
const TREE_TRUNKS = [
  // Premier plan (foncés, larges)
  { side: "left" as const, width: 90, depth: "front" as const },
  { side: "right" as const, width: 100, depth: "front" as const },
  // Arrière-plan (plus clairs, fins)
  { side: "left" as const, width: 30, offset: "20%", depth: "back" as const },
  { side: "right" as const, width: 28, offset: "25%", depth: "back" as const },
  { side: "left" as const, width: 22, offset: "35%", depth: "back" as const },
];

export default function Foret() {
  return (
    <div className={styles.foret} aria-hidden="true">
      <div className={styles.canopy}>
        {CANOPY_BLOBS.map((c, i) => (
          <div
            key={i}
            className={styles.canopyBlob}
            style={{
              left: c.left,
              width: `${c.width}%`,
              height: `${c.height}%`,
            }}
          />
        ))}
      </div>

      <div className={styles.trees}>
        {TREE_TRUNKS.map((t, i) => (
          <div
            key={i}
            className={`${styles.tree} ${
              t.side === "left" ? styles.left : styles.right
            } ${t.depth === "front" ? styles.front : styles.back}`}
            style={{
              width: `${t.width}px`,
              ...(t.offset && {
                [t.side]: t.offset,
              }),
            }}
          />
        ))}
      </div>

      <div className={styles.mist} />

      <div className={styles.fireflies}>
        {FIREFLIES.map((f, i) => (
          <span
            key={i}
            className={styles.firefly}
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
