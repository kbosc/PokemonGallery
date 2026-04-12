// "use client" obligatoire : ce composant utilise useReducer, useEffect,
// useRouter (navigation programmatique) et zustand (state global).
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useReducer } from "react";
import useKeyPress from "../../../hooks/useKeyPress";
import { useStore } from "../../../store/useStore";
import styles from "./navGameboy.module.css";

const initialState = { selectedIndex: 0 };
export const list = ["gallery", "safari", "box"];
const pages = ["/pokemonGallery", "/safariPokemon", "/boxPokemon"];

type Action =
  | { type: "arrowUp" }
  | { type: "arrowDown" }
  | { type: "select"; payload: number };

const reducer = (state: { selectedIndex: number }, action: Action) => {
  switch (action.type) {
    case "arrowUp":
      return {
        selectedIndex:
          state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1,
      };
    case "arrowDown":
      return {
        selectedIndex:
          state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0,
      };
    case "select":
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};

export default function NavGameBoy() {
  const mooveUp = useStore((state) => state.mooveUp);
  const mooveDown = useStore((state) => state.mooveDown);
  const enter = useStore((state) => state.enter);
  const setMooveUp = useStore((state) => state.setMooveUp);
  const setMooveDown = useStore((state) => state.setMooveDown);
  const setEnter = useStore((state) => state.setEnter);
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterPressed = useKeyPress("Enter");
  const [state, dispatch] = useReducer(reducer, initialState);
  // useRouter de next/navigation remplace useNavigate de react-router.
  // router.push("/url") = naviguer vers une page.
  const router = useRouter();

  useEffect(() => {
    if (arrowUpPressed || mooveUp) {
      dispatch({ type: "arrowUp" });
      mooveUp && setMooveUp();
    }
  }, [arrowUpPressed, mooveUp]);

  useEffect(() => {
    if (arrowDownPressed || mooveDown) {
      dispatch({ type: "arrowDown" });
      mooveDown && setMooveDown();
    }
  }, [arrowDownPressed, mooveDown]);

  useEffect(() => {
    if (enterPressed || enter) {
      router.push(pages[state.selectedIndex]);
      enter && setEnter();
    }
  }, [enterPressed, enter]);

  return (
    <ul className={styles.navTextUl}>
      {list.map((item, i) => (
        <li
          key={item}
          onClick={() => {
            dispatch({ type: "select", payload: i });
          }}
          style={{
            cursor: "pointer",
            color: i === state.selectedIndex ? "#000" : "#67879a",
            backgroundColor: i === state.selectedIndex ? "#ccc" : "",
          }}
        >
          <Link href={pages[i]}>{item}</Link>
        </li>
      ))}
    </ul>
  );
}
