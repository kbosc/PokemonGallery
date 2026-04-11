import { useState } from "react";
import NavGameBoy from "../navGameboy/NavGameboy";
import styles from "./animatedTextGameboy.module.css";

export default function AnimatedTextGameboy() {
  const [display, setDisplay] = useState(true);

  setTimeout(() => {
    setDisplay(false);
  }, 4000);

  return (
    <div>
      {display ? (
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
      ) : (
        <NavGameBoy />
      )}
    </div>
  );
}
