import {
  AiFillCaretUp,
  AiFillCaretRight,
  AiFillCaretDown,
  AiFillCaretLeft,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import clsx from "clsx";
import gameBoySong from "../../../assets/sounds/gameBoySong.mp3";
import AnimatedTextGameboy from "../../molecules/animatedTextGameboy/AnimatedTextGameboy";
import { useStore } from "../../../store/useStore";
import styles from "./gameboy.module.css";

// Speaker grid pattern — 8 rows of 8 dots, each dot is one of three variants:
// p = placeholder (transparent), o = openDot (dark), c = closed (gradient).
// Preserved verbatim from the original JSX for visual parity.
const SPEAKER_PATTERN: ReadonlyArray<ReadonlyArray<"p" | "o" | "c">> = [
  ["p", "o", "c", "o", "c", "o", "c", "p"],
  ["o", "c", "o", "c", "o", "c", "o", "c"],
  ["c", "o", "c", "o", "c", "o", "c", "o"],
  ["o", "c", "o", "c", "o", "c", "o", "c"],
  ["c", "o", "c", "o", "c", "o", "c", "o"],
  ["o", "c", "o", "c", "o", "c", "o", "c"],
  ["c", "o", "c", "o", "c", "o", "c", "o"],
  ["p", "c", "o", "c", "o", "c", "o", "p"],
];

const DOT_CLASS: Record<"p" | "o" | "c", string> = {
  p: styles.placeholder,
  o: styles.openDot,
  c: styles.closed,
};

export default function GameboyComponent() {
  const setMooveUp = useStore((state) => state.setMooveUp);
  const setMooveDown = useStore((state) => state.setMooveDown);
  const setEnter = useStore((state) => state.setEnter);
  const [on, setOn] = useState(false);
  const [play] = useSound(gameBoySong, { volume: 0.03 });

  const gameBoyOn = () => {
    !on && play();
    setOn((prev) => !prev);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        gameBoyOn();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [play]);

  return (
    <div className={styles.gameboy}>
      <div className={styles.screenArea}>
        <div className={styles.power}>
          <div className={styles.indicator}>
            <div className={clsx(styles.led, on && styles.on)} />
            <div className={styles.arc} style={{ zIndex: 2 }} />
            <div className={styles.arc} style={{ zIndex: 1 }} />
            <div className={styles.arc} style={{ zIndex: 0 }} />
          </div>
          POWER
        </div>

        <div className={clsx(styles.display, on && styles.on)}>
          {on && <AnimatedTextGameboy />}
        </div>

        <div className={styles.label}>
          <div className={styles.title}>GAME BOY</div>
          <div className={styles.subtitle}>
            <div className={styles.letterC}>C</div>
            <div className={styles.letterOI}>O</div>
            <div className={styles.letterL}>L</div>
            <div className={styles.letterOZ}>O</div>
            <div className={styles.letterR}>R</div>
          </div>
        </div>
      </div>

      <div className={styles.nintendo}>Nintendo</div>

      <div className={styles.controls}>
        <div className={styles.dpad}>
          <div className={styles.up}>
            <AiFillCaretUp onClick={() => setMooveUp()} />
          </div>
          <div className={styles.right}>
            <AiFillCaretRight />
          </div>
          <div className={styles.down}>
            <AiFillCaretDown onClick={() => setMooveDown()} />
          </div>
          <div className={styles.left}>
            <AiFillCaretLeft />
          </div>
          <div className={styles.middle} />
        </div>
        <div className={styles.ab}>
          <div className={styles.b}>B</div>
          <div className={styles.a}>A</div>
          <div className={styles.a} onClick={() => setEnter()}>
            A
          </div>
        </div>
      </div>

      <div className={styles.startSelect}>
        <div className={styles.select}>SELECT</div>
        <div
          className={clsx(styles.start, on && styles.on)}
          onClick={() => gameBoyOn()}
        >
          START
        </div>
      </div>

      <div className={styles.speaker}>
        {SPEAKER_PATTERN.flat().map((variant, i) => (
          <div key={i} className={DOT_CLASS[variant]} />
        ))}
      </div>
    </div>
  );
}
