"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import styles from "./pokeballNav.module.css";

const NAV_ITEMS = [
  { key: "home",    label: "🏠 Accueil",  path: "/" },
  { key: "gallery", label: "📖 Galerie",  path: "/pokemonGallery" },
  { key: "safari",  label: "🌿 Safari",   path: "/safariPokemon" },
  { key: "box",     label: "📦 Box",      path: "/boxPokemon" },
];

function PokeballSVG() {
  return (
    <svg width="46" height="46" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" fill="white" stroke="var(--gb-main)" strokeWidth="2" />
      <path d="M1 20 Q1 1 20 1 Q39 1 39 20" fill="var(--gb-main)" />
      <rect x="1" y="18" width="38" height="4" fill="var(--gb-main)" />
      <rect x="1" y="19" width="38" height="2" fill="white" opacity="0.3" />
      <circle cx="20" cy="20" r="6" fill="white" stroke="var(--gb-main)" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="3" fill="var(--gb-main)" />
      <circle cx="17" cy="15" r="1.5" fill="white" opacity="0.5" />
    </svg>
  );
}

export default function PokeballNav() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (pathname === "/") return null;

  const handleNav = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleAuth = async () => {
    if (isLoggedIn) {
      await supabase.auth.signOut();
      router.refresh();
      router.push("/");
    } else {
      router.push("/login");
    }
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        className={`${styles.ball} ${open ? styles.ballOpen : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Navigation"
        aria-expanded={open}
      >
        <PokeballSVG />
      </button>

      <div
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
        aria-hidden={!open}
      >
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`${styles.item} ${pathname === item.path ? styles.itemActive : ""}`}
            onClick={() => handleNav(item.path)}
            tabIndex={open ? 0 : -1}
          >
            {item.label}
          </button>
        ))}
        <div className={styles.divider} />
        <button
          className={styles.item}
          onClick={handleAuth}
          tabIndex={open ? 0 : -1}
        >
          {isLoggedIn ? "🚪 Se déconnecter" : "🔑 Connexion"}
        </button>
      </div>
    </div>
  );
}
