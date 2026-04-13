// Habitat "Océan" : décor de fond pour une rencontre sous-marine.
//
// Couches (du fond vers l'avant) :
//   1. Dégradé vertical bleu clair → bleu profond → presque noir.
//   2. Rayons de lumière obliques tombant de la surface (SVG).
//   3. Silhouettes de coraux/algues le long du sol.
//   4. Bulles qui remontent en boucle (animation CSS).
//
// Toutes les positions/durées sont déterministes pour éviter le
// hydration mismatch côté SSR.

import styles from "./ocean.module.css";

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 7.3) % 100,
  delay: (i * 0.9) % 9,
  duration: 8 + (i % 4) * 1.5, // 8s à 12.5s
  size: 4 + (i % 5), // 4px à 8px
}));

// Rayons de lumière : 4 trapèzes obliques partant du haut.
const SUNRAYS = [
  { left: "10%", width: 40, skew: -8 },
  { left: "30%", width: 60, skew: -5 },
  { left: "55%", width: 50, skew: 4 },
  { left: "78%", width: 45, skew: 8 },
];

// Coraux/algues : silhouettes en bas du décor.
const CORALS = [
  { points: "0,40 5,25 12,10 18,25 22,15 26,30 30,40", left: "8%", width: 30, height: 40 },
  { points: "0,50 4,30 10,15 14,5 20,18 26,8 32,22 38,12 44,28 48,50", left: "22%", width: 48, height: 50 },
  { points: "0,35 6,20 14,8 22,18 28,5 34,20 40,35", left: "42%", width: 40, height: 35 },
  { points: "0,55 5,35 12,20 18,5 24,18 30,30 36,15 42,28 50,40 55,55", left: "62%", width: 55, height: 55 },
  { points: "0,45 8,25 16,10 22,22 28,8 34,25 40,15 45,45", left: "82%", width: 45, height: 45 },
];

export default function Ocean() {
  return (
    <div className={styles.ocean} aria-hidden="true">
      <div className={styles.sunrays}>
        {SUNRAYS.map((r, i) => (
          <div
            key={i}
            className={styles.sunray}
            style={{
              left: r.left,
              width: `${r.width}px`,
              transform: `skewX(${r.skew}deg)`,
            }}
          />
        ))}
      </div>

      <div className={styles.corals}>
        {CORALS.map((c, i) => (
          <svg
            key={i}
            className={styles.coral}
            style={{ left: c.left }}
            width={c.width}
            height={c.height}
            viewBox={`0 0 ${c.width} ${c.height}`}
          >
            <polygon points={c.points} />
          </svg>
        ))}
      </div>

      <div className={styles.bubbles}>
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className={styles.bubble}
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
