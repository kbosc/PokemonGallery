import { useState } from "react";
import { useCaptureCount } from "../../../hooks/useCaptureCount";
import styles from "./pokemonCard.module.css";

const STAT_META: Record<string, { label: string; color: string }> = {
  hp:               { label: "HP",  color: "#FF5959" },
  attack:           { label: "ATK", color: "#F5AC78" },
  defense:          { label: "DEF", color: "#FAE078" },
  "special-attack": { label: "SpA", color: "#9DB7F5" },
  "special-defense":{ label: "SpD", color: "#A7DB8D" },
  speed:            { label: "SPD", color: "#FA92B2" },
};

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
  artwork?: string;
  types?: { type: { name: string } }[];
  stats?: { stat: { name: string }; base_stat: number }[];
}

export default function PokemonCard({ id, name, image, type, artwork, types, stats }: Props) {
  const count = useCaptureCount(id);
  const [flipped, setFlipped] = useState(false);

  const displayTypes = types ?? [{ type: { name: type } }];
  const frontImage = artwork ?? image;

  return (
    <div
      className={styles.wrapper}
      onClick={() => setFlipped((f) => !f)}
      aria-label={`Carte de ${name}, cliquer pour voir les stats`}
    >
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>

        {/* ── FACE AVANT ── */}
        <div className={styles.front}>
          <div
            className={styles.typeStripe}
            style={{ "--type-color": `var(--type-${type})` } as React.CSSProperties}
          />
          <div className={styles.cardTop}>
            <span className={styles.number}>#{String(id).padStart(3, "0")}</span>
            {count > 0 && (
              <span className={styles.caughtBadge} aria-label={`${count} possédé(s)`}>
                ✓ Attrapé{count > 1 ? ` ×${count}` : ""}
              </span>
            )}
          </div>
          <div className={styles.artworkWrap}>
            <img
              className={styles.artwork}
              src={frontImage}
              alt={name}
              style={{ filter: count > 0 ? "none" : "grayscale(0.45) brightness(0.7)" }}
            />
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.name}>{name}</span>
            <div className={styles.typesRow}>
              {displayTypes.map((t) => (
                <span
                  key={t.type.name}
                  className={styles.typeBadge}
                  style={{ "--type-color": `var(--type-${t.type.name})` } as React.CSSProperties}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── FACE ARRIÈRE ── */}
        <div className={styles.back}>
          <div className={styles.backHeader}>
            <img src={image} alt="" className={styles.backSprite} />
            <span className={styles.backName}>{name}</span>
          </div>
          {stats ? (
            <div className={styles.statsGrid}>
              {stats.map((s) => {
                const meta = STAT_META[s.stat.name];
                if (!meta) return null;
                const pct = Math.min(100, Math.round((s.base_stat / 255) * 100));
                return (
                  <div key={s.stat.name} className={styles.statRow}>
                    <span className={styles.statLabel}>{meta.label}</span>
                    <span className={styles.statValue}>{s.base_stat}</span>
                    <div className={styles.statBarBg}>
                      <div
                        className={styles.statBarFill}
                        style={{ width: `${pct}%`, "--bar-color": meta.color } as React.CSSProperties}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.noStats}>Stats non disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}
