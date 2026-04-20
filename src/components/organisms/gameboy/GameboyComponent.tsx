"use client";

import {
  AiFillCaretUp,
  AiFillCaretRight,
  AiFillCaretDown,
  AiFillCaretLeft,
} from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";
import clsx from "clsx";
import AnimatedTextGameboy from "../../molecules/animatedTextGameboy/AnimatedTextGameboy";
import NavGameboy from "../../molecules/navGameboy/NavGameboy";
import LoginGameboy from "../../molecules/loginGameboy/LoginGameboy";
import { useStore } from "../../../store/useStore";
import styles from "./gameboy.module.css";

const gameBoySong = "/sounds/gameBoySong.mp3";

type Phase = "off" | "booting" | "menu" | "login";

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
  const [phase, setPhase] = useState<Phase>("off");
  const [play] = useSound(gameBoySong, { volume: 0.03 });

  const gameBoyOn = useCallback(() => {
    if (phase !== "off") {
      setPhase("off");
      return;
    }
    play();
    setPhase("booting");
  }, [phase, play]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        gameBoyOn();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [gameBoyOn]);

  const on = phase !== "off";

  const screenContent = () => {
    switch (phase) {
      case "off":
        return (
          <div className={styles.screensaver}>
            <div className={styles.screensaverText}>
              PRESS START
              <br />
              OR&nbsp;&nbsp;[ S ]
            </div>
          </div>
        );
      case "booting":
        return <AnimatedTextGameboy onComplete={() => setPhase("menu")} />;
      case "menu":
        return <NavGameboy onLoginRequest={() => setPhase("login")} />;
      case "login":
        return <LoginGameboy onBack={() => setPhase("menu")} />;
    }
  };

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
          {screenContent()}
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
          <div className={styles.a} onClick={() => setEnter()}>
            A
          </div>
        </div>
      </div>

      <div className={styles.startSelect}>
        <div className={styles.select}>SELECT</div>
        <div
          className={clsx(styles.start, on && styles.on)}
          onClick={gameBoyOn}
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
