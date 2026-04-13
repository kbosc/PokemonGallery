// Habitat "Sanctuaire" : décor de fond d'un temple mystique.
//
// C'est le "fourre-tout" thématisé pour les types qui ne collaient à
// aucun autre habitat (psychic, ghost, fighting, dragon, ice). On les
// rassemble sous un thème de temple ancien où s'entraînent les moines
// (fighting), méditent les psychics, hantent les ghosts, sommeillent
// les dragons et veille la glace éternelle.
//
// Couches (du fond vers l'avant) :
//   1. Dégradé radial violet/indigo (centre lumineux, bords sombres).
//   2. Faisceau de lumière divine au centre (vertical, depuis le haut).
//   3. Piliers de pierre sur les côtés (silhouettes sombres).
//   4. Runes flottantes (petits cercles avec symboles).
//   5. Orbes de lumière qui dérivent (animation flottante).

import styles from "./sanctuaire.module.css";

const ORBS = Array.from({ length: 10 }, (_, i) => ({
  left: (i * 9.7) % 100,
  top: 30 + ((i * 13) % 50),
  delay: (i * 0.9) % 6,
  duration: 7 + (i % 4) * 1.3,
  size: 6 + (i % 3) * 2,
}));

// Runes : petits cercles avec un trait à l'intérieur. Position fixe
// (pas d'animation) pour donner une impression de gravure ancienne.
const RUNES = [
  { left: "12%", top: "25%", size: 28, rotation: 15 },
  { left: "85%", top: "30%", size: 24, rotation: -20 },
  { left: "20%", top: "65%", size: 22, rotation: 45 },
  { left: "78%", top: "70%", size: 26, rotation: -10 },
  { left: "48%", top: "18%", size: 30, rotation: 0 },
];

// Piliers de pierre : 2 à gauche et 2 à droite, hauteurs variées.
const PILLARS = [
  { side: "left" as const, height: "85%", width: 50, offset: "0" },
  { side: "left" as const, height: "70%", width: 35, offset: "55px" },
  { side: "right" as const, height: "85%", width: 55, offset: "0" },
  { side: "right" as const, height: "72%", width: 35, offset: "60px" },
];

export default function Sanctuaire() {
  return (
    <div className={styles.sanctuaire} aria-hidden="true">
      <div className={styles.divineBeam} />

      <div className={styles.pillars}>
        {PILLARS.map((p, i) => (
          <div
            key={i}
            className={`${styles.pillar} ${
              p.side === "left" ? styles.left : styles.right
            }`}
            style={{
              height: p.height,
              width: `${p.width}px`,
              [p.side]: p.offset,
            }}
          />
        ))}
      </div>

      <div className={styles.runes}>
        {RUNES.map((r, i) => (
          <svg
            key={i}
            className={styles.rune}
            style={{
              left: r.left,
              top: r.top,
              transform: `rotate(${r.rotation}deg)`,
            }}
            width={r.size}
            height={r.size}
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="14" />
            <line x1="16" y1="4" x2="16" y2="28" />
            <line x1="6" y1="11" x2="26" y2="21" />
          </svg>
        ))}
      </div>

      <div className={styles.orbs}>
        {ORBS.map((o, i) => (
          <span
            key={i}
            className={styles.orb}
            style={{
              left: `${o.left}%`,
              top: `${o.top}%`,
              width: `${o.size}px`,
              height: `${o.size}px`,
              animationDelay: `${o.delay}s`,
              animationDuration: `${o.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
