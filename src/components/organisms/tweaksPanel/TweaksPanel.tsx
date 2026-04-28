"use client";

import { useEffect, useState } from "react";
import styles from "./tweaksPanel.module.css";

const GB_COLORS = {
  violet: { main: "#4f50db", dark: "#0d0e51", mid: "#3d38b5", light: "#9998eb", text: "#6b67ed" },
  rouge:  { main: "#c02035", dark: "#5a000e", mid: "#8a1020", light: "#e07080", text: "#e04060" },
  or:     { main: "#c8a030", dark: "#5a4400", mid: "#a07800", light: "#f0d060", text: "#d4b040" },
  argent: { main: "#8898a8", dark: "#303840", mid: "#607080", light: "#c0d0d8", text: "#a0b0b8" },
  vert:   { main: "#2a8a4a", dark: "#0a3015", mid: "#1a6030", light: "#70c080", text: "#40a060" },
  rose:   { main: "#d04488", dark: "#5a1030", mid: "#a02260", light: "#f090b8", text: "#e060a0" },
} as const;

type GbColorKey = keyof typeof GB_COLORS;
type Theme = "dark" | "light";

function applyGbColor(key: GbColorKey) {
  const c = GB_COLORS[key];
  const root = document.documentElement;
  root.style.setProperty("--gb-main",  c.main);
  root.style.setProperty("--gb-dark",  c.dark);
  root.style.setProperty("--gb-mid",   c.mid);
  root.style.setProperty("--gb-light", c.light);
  root.style.setProperty("--gb-text",  c.text);
  localStorage.setItem("pg-gbcolor", key);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  localStorage.setItem("pg-theme", theme);
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [gbColor, setGbColor] = useState<GbColorKey>("violet");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedColor = localStorage.getItem("pg-gbcolor") as GbColorKey | null;
    if (savedColor && GB_COLORS[savedColor]) {
      setGbColor(savedColor);
      applyGbColor(savedColor);
    }
    const savedTheme = localStorage.getItem("pg-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const handleColor = (key: GbColorKey) => {
    setGbColor(key);
    applyGbColor(key);
  };

  const handleTheme = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  return (
    <div className={styles.root}>
      <button
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        aria-label="Tweaks"
        title="Tweaks"
        aria-expanded={open}
      >
        {open ? "✕" : "⚙"}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelTitle}>TWEAKS</div>

          {/* Couleur Gameboy */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Couleur Gameboy</div>
            <div className={styles.colorRow}>
              {(Object.keys(GB_COLORS) as GbColorKey[]).map((key) => (
                <button
                  key={key}
                  className={`${styles.swatch} ${gbColor === key ? styles.swatchActive : ""}`}
                  style={{ background: GB_COLORS[key].main }}
                  onClick={() => handleColor(key)}
                  title={key}
                  aria-label={`Couleur ${key}`}
                  aria-pressed={gbColor === key}
                />
              ))}
            </div>
          </div>

          {/* Thème */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Thème</div>
            <div className={styles.themeRow}>
              <button
                className={`${styles.themeBtn} ${theme === "dark" ? styles.themeBtnActive : ""}`}
                onClick={() => handleTheme("dark")}
              >
                ☽ Sombre
              </button>
              <button
                className={`${styles.themeBtn} ${theme === "light" ? styles.themeBtnActive : ""}`}
                onClick={() => handleTheme("light")}
              >
                ☀ Clair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
