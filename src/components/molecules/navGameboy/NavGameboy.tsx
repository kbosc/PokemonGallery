"use client";

import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { useStore } from "../../../store/useStore";
import { createClient } from "../../../lib/supabase/client";
import styles from "./navGameboy.module.css";

const BASE_NAV_ITEMS = [
  { key: "gallery",   label: "GALERIE",      path: "/pokemonGallery" },
  { key: "safari",    label: "SAFARI",       path: "/safariPokemon"  },
  { key: "box",       label: "BOX",          path: "/boxPokemon"     },
  { key: "connexion", label: "CONNEXION",    path: null              },
];

type State = { selectedIndex: number };
type Action =
  | { type: "up" }
  | { type: "down" }
  | { type: "set"; i: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "up":
      return { selectedIndex: state.selectedIndex > 0 ? state.selectedIndex - 1 : BASE_NAV_ITEMS.length - 1 };
    case "down":
      return { selectedIndex: state.selectedIndex < BASE_NAV_ITEMS.length - 1 ? state.selectedIndex + 1 : 0 };
    case "set":
      return { selectedIndex: action.i };
    default:
      return state;
  }
};

export default function NavGameboy({ onLoginRequest }: { onLoginRequest: () => void }) {
  const router = useRouter();
  const mooveUp   = useStore((s) => s.mooveUp);
  const mooveDown = useStore((s) => s.mooveDown);
  const enter     = useStore((s) => s.enter);
  const setMooveUp   = useStore((s) => s.setMooveUp);
  const setMooveDown = useStore((s) => s.setMooveDown);
  const setEnter     = useStore((s) => s.setEnter);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const NAV_ITEMS = BASE_NAV_ITEMS.map((item) =>
    item.key === "connexion"
      ? { ...item, label: isLoggedIn ? "DÉCONNEXION" : "CONNEXION" }
      : item
  );

  const [state, dispatch] = useReducer(reducer, { selectedIndex: 0 });

  const confirmNav = (i: number) => {
    const item = NAV_ITEMS[i];
    if (item.key === "connexion") {
      if (isLoggedIn) {
        supabase.auth.signOut().then(() => router.refresh());
      } else {
        onLoginRequest();
      }
    } else if (item.path) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")   { e.preventDefault(); dispatch({ type: "up" }); }
      if (e.key === "ArrowDown") { e.preventDefault(); dispatch({ type: "down" }); }
      if (e.key === "Enter")     confirmNav(state.selectedIndex);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state.selectedIndex]);

  useEffect(() => {
    if (mooveUp)   { dispatch({ type: "up" });   setMooveUp();   }
  }, [mooveUp]);

  useEffect(() => {
    if (mooveDown) { dispatch({ type: "down" }); setMooveDown(); }
  }, [mooveDown]);

  useEffect(() => {
    if (enter) { confirmNav(state.selectedIndex); setEnter(); }
  }, [enter]);

  return (
    <div className={styles.menu}>
      <div className={styles.menuTitle}>MENU PRINCIPAL</div>
      <div className={styles.menuList}>
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item.key}
            className={`${styles.menuItem} ${i === state.selectedIndex ? styles.selected : ""}`}
            onClick={() => { dispatch({ type: "set", i }); setTimeout(() => confirmNav(i), 80); }}
            onMouseEnter={() => dispatch({ type: "set", i })}
          >
            <span className={styles.arrow}>{i === state.selectedIndex ? "▶" : " "}</span>
            {item.label}
          </div>
        ))}
      </div>
      <div className={styles.hint}>↑↓ naviguer  •  A / Entrée</div>
    </div>
  );
}
