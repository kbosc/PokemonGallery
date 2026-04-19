// Carte d'affichage d'un pokémon dans la gallery.
// Depuis la Phase 6.2, la gallery est READ-ONLY : on n'attrape plus
// depuis ici, c'est le rôle futur du safari. La carte affiche juste
// un badge "×N" quand le dresseur possède au moins une instance.

import { useCaptureCount } from "../../../hooks/useCaptureCount";
import styles from "./pokemonCard.module.css";

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function PokemonCard({ id, name, image, type }: Props) {
  const count = useCaptureCount(id);

  return (
    <div className={styles.cardContainer}>
      {count > 0 && (
        <span
          className={styles.ownedBadge}
          aria-label={`Tu possèdes ${count} ${name}`}
        >
          ×{count}
        </span>
      )}
      <span className={styles.number}>#{String(id).padStart(3, "0")}</span>
      <img className={styles.sprite} src={image} alt={name} />
      <span className={styles.name}>{name}</span>
      <span
        className={styles.typeBadge}
        style={{ "--type-color": `var(--type-${type})` } as React.CSSProperties}
      >
        {type}
      </span>
    </div>
  );
}
