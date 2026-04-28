import { useEffect } from "react";
import styles from "./animatedTextGameboy.module.css";

export default function AnimatedTextGameboy({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.letterG}>G</span>
        <span className={styles.letterA}>A</span>
        <span className={styles.letterM}>M</span>
        <span className={styles.letterE}>E</span>
        <span> </span>
        <span className={styles.letterB}>B</span>
        <span className={styles.letterO}>O</span>
        <span className={styles.letterY}>Y</span>
      </div>
      <span>Nintendo </span>
    </div>
  );
}
