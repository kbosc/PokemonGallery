// Habitat "Caverne" : décor de fond pour une rencontre dans une grotte.
//
// Composé de 5 couches (du fond vers l'avant) :
//   1. Un dégradé radial brun/noir pour l'ambiance souterraine.
//   2. Des stalactites irréguliers accrochés au plafond.
//   3. Des petits rochers en fond, le long du sol (silhouette claire).
//   4. Des gros rochers au premier plan, dans les angles bas (effet tunnel).
//   5. Des particules de poussière qui tombent en boucle.
//
// Toutes les positions/durées sont pré-calculées (pas de Math.random à
// l'exécution) pour éviter le hydration mismatch : le HTML rendu côté
// serveur doit être identique à celui côté client.

import styles from "./caverne.module.css";

// 12 particules réparties avec un décalage déterministe (i * 7.7 % 100
// donne des positions variées mais stables entre SSR et CSR).
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 7.7) % 100, // position horizontale en %
  delay: (i * 0.8) % 8, // décalage du début d'animation en s
  duration: 10 + (i % 5) * 1.2, // durée de chute variable (10s à 14.8s)
}));

// Stalactites : polygones irréguliers (≥8 points) pour un rendu rocheux
// plutôt que purement triangulaire. Chacun pend du plafond.
const STALACTITES = [
  {
    points:
      "5,0 55,0 50,10 58,22 44,30 52,42 40,55 33,72 26,55 20,40 12,30 18,20 8,12",
    left: "4%",
    width: 60,
    height: 78,
  },
  {
    points:
      "0,0 50,0 46,8 53,18 41,26 49,40 37,54 30,86 22,52 17,40 9,30 13,18 3,10",
    left: "22%",
    width: 53,
    height: 90,
  },
  {
    points: "0,0 42,0 39,9 44,20 32,26 35,40 26,50 19,38 14,28 6,22 11,12",
    left: "40%",
    width: 44,
    height: 55,
  },
  {
    points:
      "0,0 65,0 60,12 68,25 55,33 62,45 50,57 43,78 35,55 28,42 19,35 23,22 9,15 14,5",
    left: "58%",
    width: 68,
    height: 82,
  },
  {
    points:
      "5,0 50,0 48,10 55,22 42,30 50,42 41,55 33,68 23,52 18,40 10,32 15,22 6,12",
    left: "78%",
    width: 55,
    height: 72,
  },
];

// Petits rochers en arrière-plan : silhouettes qui longent le bas du
// décor. Plus clairs et plus petits → effet de profondeur.
const BACKGROUND_ROCKS = [
  { points: "0,30 8,15 20,8 35,12 48,22 55,30", left: "10%", width: 55, height: 30 },
  { points: "0,25 10,10 24,5 38,12 48,20 52,25", left: "30%", width: 52, height: 25 },
  { points: "0,28 6,15 18,8 30,10 42,18 50,28", left: "52%", width: 50, height: 28 },
  { points: "0,30 12,18 28,12 42,15 55,22 60,30", left: "68%", width: 60, height: 30 },
  { points: "0,22 8,10 22,5 35,10 45,18 50,22", left: "85%", width: 50, height: 22 },
];

// Gros rochers au premier plan : ils dépassent depuis les coins
// inférieurs gauche/droit pour suggérer qu'on regarde depuis l'intérieur
// d'un tunnel.
const FOREGROUND_ROCKS = [
  {
    side: "left" as const,
    points:
      "0,90 0,55 8,40 22,28 42,22 65,28 82,40 96,55 105,72 112,90",
    width: 112,
    height: 90,
  },
  {
    side: "right" as const,
    points:
      "0,90 8,72 22,55 42,40 68,30 92,28 115,38 128,55 140,72 140,90",
    width: 140,
    height: 90,
  },
];

export default function Caverne() {
  return (
    <div className={styles.caverne} aria-hidden="true">
      <div className={styles.stalactites}>
        {STALACTITES.map((s, i) => (
          <svg
            key={i}
            className={styles.stalactite}
            style={{ left: s.left }}
            width={s.width}
            height={s.height}
            viewBox={`0 0 ${s.width} ${s.height}`}
          >
            <polygon points={s.points} />
          </svg>
        ))}
      </div>

      <div className={styles.backgroundRocks}>
        {BACKGROUND_ROCKS.map((r, i) => (
          <svg
            key={i}
            className={styles.backgroundRock}
            style={{ left: r.left }}
            width={r.width}
            height={r.height}
            viewBox={`0 0 ${r.width} ${r.height}`}
          >
            <polygon points={r.points} />
          </svg>
        ))}
      </div>

      <div className={styles.foregroundRocks}>
        {FOREGROUND_ROCKS.map((r, i) => (
          <svg
            key={i}
            className={`${styles.foregroundRock} ${
              r.side === "left" ? styles.left : styles.right
            }`}
            width={r.width}
            height={r.height}
            viewBox={`0 0 ${r.width} ${r.height}`}
            preserveAspectRatio="none"
          >
            <polygon points={r.points} />
          </svg>
        ))}
      </div>

      <div className={styles.particles}>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
