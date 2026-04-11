import clsx from "clsx";
import styles from "./pokeball.module.css";

interface Props {
  selected: boolean;
}

export default function Pokeball({ selected }: Props) {
  return (
    <div>
      <div className={clsx(styles.pokeballContainer, selected && styles.selected)}>
        <div className={styles.upperHalf} />
        <div className={styles.lowerHalf} />
        <div className={styles.base} />
        <div className={styles.innerCircle} />
        <div className={clsx(styles.indicator, selected && styles.selected)} />
        <div className={clsx(styles.indicatorInner, selected && styles.selected)} />
      </div>
    </div>
  );
}
