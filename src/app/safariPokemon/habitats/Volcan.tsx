// Habitat "Volcan" : décor de fond d'un cratère en éruption.
//
// Couches (du fond vers l'avant) :
//   1. Dégradé radial rouge/orange depuis le bas (lueur de lave).
//   2. Silhouettes de roches volcaniques en arrière-plan.
//   3. Lave qui pulse au sol (animation glow).
//   4. Braises qui montent en boucle.
//
// Toutes les positions/durées sont déterministes pour éviter le
// hydration mismatch côté SSR.

import styles from "./volcan.module.css";

const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 6.4) % 100,
  delay: (i * 0.7) % 7,
  duration: 6 + (i % 5) * 0.8, // 6s à 9.2s
  size: 3 + (i % 3), // 3px à 5px
}));

// Roches volcaniques : silhouettes très sombres en bas.
const ROCKS = [
  { points: "0,40 8,18 22,8 38,15 50,25 62,18 75,28 85,40", left: "5%", width: 85, height: 40 },
  { points: "0,35 10,15 24,5 38,12 52,20 65,12 75,22 82,35", left: "30%", width: 82, height: 35 },
  { points: "0,42 12,20 28,8 42,18 55,10 68,22 82,15 92,30 100,42", left: "55%", width: 100, height: 42 },
  { points: "0,38 8,18 20,10 32,15 45,8 58,18 70,12 80,25 88,38", left: "82%", width: 88, height: 38 },
];

export default function Volcan() {
  return (
    <div className={styles.volcan} aria-hidden="true">
      <div className={styles.rocks}>
        {ROCKS.map((r, i) => (
          <svg
            key={i}
            className={styles.rock}
            style={{ left: r.left }}
            width={r.width}
            height={r.height}
            viewBox={`0 0 ${r.width} ${r.height}`}
          >
            <polygon points={r.points} />
          </svg>
        ))}
      </div>

      <div className={styles.lava} />

      <div className={styles.embers}>
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className={styles.ember}
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
