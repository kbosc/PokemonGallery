import Pokeball from "../../atoms/pokeball/Pokeball";
import Button from "../../atoms/button/Button";
import { useCapturedPokemon } from "../../../hooks/useCapturedPokemon";
import styles from "./pokemonCard.module.css";

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function PokemonCard({ id, name, image, type }: Props) {
  const { caught, selected, capture, release, instanceCount } =
    useCapturedPokemon(id);

  return (
    <div className={styles.cardContainer}>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <div className={styles.buttonRow}>
        {/* Pokéball toujours présente : tu peux capturer plusieurs
            instances du même pokémon (stackables en base). */}
        <button
          className={styles.cardButton}
          onClick={capture}
          aria-label={`Capturer ${name}`}
        >
          <Pokeball selected={selected} />
        </button>
        {/* Relâcher n'apparaît qu'à partir de 1 instance possédée.
            Libère la plus ancienne (le choix précis arrivera en Box). */}
        {caught && (
          <Button onClick={release}>
            Relâcher{instanceCount > 1 ? ` (${instanceCount})` : ""}
          </Button>
        )}
      </div>
    </div>
  );
}
