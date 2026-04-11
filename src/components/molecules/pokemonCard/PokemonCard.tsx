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
  const { caught, selected, capture, release } = useCapturedPokemon(id);

  return (
    <div className={styles.cardContainer}>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <div className={styles.buttonRow}>
        {!caught ? (
          <button className={styles.cardButton} onClick={capture}>
            <Pokeball selected={selected} />
          </button>
        ) : (
          <Button onClick={release}>Relacher</Button>
        )}
      </div>
    </div>
  );
}
