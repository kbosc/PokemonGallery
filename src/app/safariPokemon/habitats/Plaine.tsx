// Habitat "Plaine" : décor de fond d'une prairie ensoleillée.
//
// Couches (du fond vers l'avant) :
//   1. Dégradé bleu ciel → vert herbe (transition à 60%).
//   2. Soleil en haut à droite (cercle jaune avec halo).
//   3. Nuages qui dérivent lentement.
//   4. Brins d'herbe au sol.
//
// Toutes les positions/durées sont déterministes pour éviter le
// hydration mismatch côté SSR.

import styles from "./plaine.module.css";

// Brins d'herbe : 22 triangles fins de hauteurs variées au bas de l'écran.
const GRASS_BLADES = Array.from({ length: 22 }, (_, i) => ({
  left: i * 4.6, // espacement régulier
  height: 18 + ((i * 7) % 14), // 18px à 31px
  skew: ((i * 3) % 7) - 3, // -3deg à +3deg
}));

// Nuages : 3 formes ovales qui traversent l'écran à des vitesses différentes.
const CLOUDS = [
  { top: "12%", delay: 0, duration: 60, width: 120 },
  { top: "22%", delay: -25, duration: 75, width: 90 },
  { top: "8%", delay: -45, duration: 90, width: 140 },
];

export default function Plaine() {
  return (
    <div className={styles.plaine} aria-hidden="true">
      <div className={styles.sun} />
      <div className={styles.sunHalo} />

      <div className={styles.clouds}>
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className={styles.cloud}
            style={{
              top: c.top,
              width: `${c.width}px`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.grassRow}>
        {GRASS_BLADES.map((g, i) => (
          <span
            key={i}
            className={styles.grass}
            style={{
              left: `${g.left}%`,
              height: `${g.height}px`,
              transform: `skewX(${g.skew}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
