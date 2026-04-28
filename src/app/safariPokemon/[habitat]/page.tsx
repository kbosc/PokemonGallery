"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSound from "use-sound";
import { getPokemon } from "../../../api/pokeApi";
import { capturePokemon, type CapturedPokemon } from "../../../lib/supabase/captures";
import { useMyCaptures, MY_CAPTURES_QUERY_KEY } from "../../../hooks/useMyCaptures";
import {
  HABITATS,
  pickRandomHabitat,
  useHabitatPool,
  type HabitatKey,
} from "../habitats";
import PixelScene, { HABITAT_VISUAL } from "../PixelScene";

const RANDOM_SLUG = "random";
const catchSound = "/sounds/catchPokemon.mp3";

type Phase = "poolLoading" | "countdown" | "appearing" | "waiting" | "throwing" | "wobble" | "caught" | "fled";

function parseHabitatSlug(slug: string): HabitatKey | null {
  return slug in HABITATS ? (slug as HabitatKey) : null;
}

function PokeBallSVG({ size = 40, spinning = false }: { size?: number; spinning?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{
      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
      animation: spinning ? "safariPbSpin .35s linear infinite" : "none",
      flexShrink: 0,
    }}>
      <circle cx="20" cy="20" r="19" fill="white" stroke="#222" strokeWidth="1.5" />
      <path d="M1.5 20 Q1.5 1.5 20 1.5 Q38.5 1.5 38.5 20" fill="#e83030" />
      <rect x="1.5" y="18.2" width="37" height="3.6" fill="#222" />
      <circle cx="20" cy="20" r="6.5" fill="white" stroke="#222" strokeWidth="2" />
      <circle cx="20" cy="20" r="3.5" fill="#333" />
      <circle cx="16" cy="13.5" r="2" fill="white" opacity="0.38" />
    </svg>
  );
}

export default function SafariHabitatPage({ params }: { params: Promise<{ habitat: string }> }) {
  const { habitat: slug } = use(params);
  const isRandom = slug === RANDOM_SLUG;
  const fixedHabitat = isRandom ? null : parseHabitatSlug(slug);

  if (!isRandom && fixedHabitat === null) notFound();

  const [habitat, setHabitat] = useState<HabitatKey | null>(fixedHabitat);
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [phase, setPhase] = useState<Phase>("poolLoading");
  const [countdown, setCountdown] = useState(0);
  const [wobbles, setWobbles] = useState(0);
  const [sessionCaught, setSessionCaught] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const poolRef = useRef<number[]>([]);
  const autoSpawnOnPoolRef = useRef(false);

  const { data: pool } = useHabitatPool(habitat);
  const { data: captures = [] } = useMyCaptures();
  const queryClient = useQueryClient();
  const [playSound] = useSound(catchSound, { volume: 0.06 });

  const { data: pokemonData } = useQuery({
    queryKey: ["safari-pokemon", pokemonId],
    queryFn: () => getPokemon(pokemonId!),
    enabled: pokemonId !== null,
  });

  const captureMutation = useMutation({
    mutationFn: (opts: { pokemon_id: number; is_shiny: boolean }) => capturePokemon(opts),
    onSuccess: (newCapture) => {
      queryClient.setQueryData<CapturedPokemon[]>(MY_CAPTURES_QUERY_KEY, (old) =>
        old ? [...old, newCapture] : [newCapture]
      );
    },
  });

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const spawnWithDelay = useCallback((currentPool: number[]) => {
    const delay = Math.floor(Math.random() * 8 + 3);
    setCountdown(delay);
    setPhase("countdown");
    setPokemonId(null);

    let remaining = delay;
    const tick = () => {
      remaining--;
      setCountdown(remaining);
      if (remaining <= 0) {
        const id = currentPool[Math.floor(Math.random() * currentPool.length)];
        const shiny = Math.random() < 1 / 128;
        setPokemonId(id);
        setIsShiny(shiny);
        setPhase("appearing");
        timerRef.current = setTimeout(() => setPhase("waiting"), 700);
      } else {
        timerRef.current = setTimeout(tick, 1000);
      }
    };
    timerRef.current = setTimeout(tick, 1000);
  }, []);

  // Random mode: pick habitat on mount
  useEffect(() => {
    if (isRandom && habitat === null) setHabitat(pickRandomHabitat());
  }, [isRandom, habitat]);

  // When pool loads, store it and start encounter (initial load OR after random habitat switch)
  useEffect(() => {
    if (pool && pool.length > 0) {
      poolRef.current = pool;
      if (phase === "poolLoading" || autoSpawnOnPoolRef.current) {
        autoSpawnOnPoolRef.current = false;
        timerRef.current = setTimeout(() => spawnWithDelay(pool), 400);
      }
    }
  }, [pool]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const throwBall = () => {
    if (phase !== "waiting") return;
    setPhase("throwing");
    timerRef.current = setTimeout(() => {
      setPhase("wobble");
      setWobbles(0);
      let w = 0;
      intervalRef.current = setInterval(() => {
        w++;
        setWobbles(w);
        if (w >= 3) {
          clearInterval(intervalRef.current!);
          const success = Math.random() < 0.55;
          timerRef.current = setTimeout(() => {
            if (success && pokemonId !== null) {
              playSound();
              captureMutation.mutate({ pokemon_id: pokemonId, is_shiny: isShiny });
              setSessionCaught((n) => n + 1);
            }
            setPhase(success ? "caught" : "fled");
          }, 300);
        }
      }, 500);
    }, 900);
  };

  const nextPokemon = () => {
    clearTimers();
    if (isRandom) {
      autoSpawnOnPoolRef.current = true;
      setPhase("poolLoading");
      setHabitat(pickRandomHabitat());
    } else {
      spawnWithDelay(poolRef.current);
    }
  };

  if (habitat === null) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Recherche habitat…</div>
      </div>
    );
  }

  const vis = HABITAT_VISUAL[habitat];
  const instanceCount = captures.filter((c) => c.pokemon_id === pokemonId).length;
  const sprite = pokemonData
    ? isShiny
      ? (pokemonData.sprites.front_shiny ?? pokemonData.sprites.front_default)
      : (pokemonData.sprites.other?.["official-artwork"]?.front_default ?? pokemonData.sprites.front_default)
    : null;
  const monName = pokemonData?.name ?? "";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, fontFamily: "'Press Start 2P', monospace" }}>
      <PixelScene habitatKey={habitat}>
        {/* HUD */}
        <div style={{ position: "absolute", top: 14, left: 0, right: 0, padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 30 }}>
          <Link href="/safariPokemon" style={{ padding: "6px 14px", borderRadius: 16, border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", backdropFilter: "blur(4px)", fontFamily: "'Press Start 2P', monospace", fontSize: 7, cursor: "pointer", textDecoration: "none" }}>
            ← QUITTER
          </Link>
          <div style={{ padding: "6px 16px", borderRadius: 16, background: "rgba(0,0,0,0.55)", color: vis.accent, fontFamily: "'Press Start 2P', monospace", fontSize: 8, backdropFilter: "blur(4px)" }}>
            {vis.icon} {HABITATS[habitat].label.toUpperCase()}
          </div>
          <div style={{ padding: "6px 14px", borderRadius: 16, background: "rgba(0,0,0,0.55)", color: "#fff", fontFamily: "'Press Start 2P', monospace", fontSize: 7, backdropFilter: "blur(4px)" }}>
            ✓ {sessionCaught}
          </div>
        </div>

        {/* POOL LOADING */}
        {phase === "poolLoading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>Chargement…</div>
          </div>
        )}

        {/* COUNTDOWN */}
        {phase === "countdown" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>ZONE SAUVAGE</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Un Pokémon va apparaître dans</div>
            <div key={countdown} style={{ fontSize: 52, color: "white", textShadow: `0 0 30px ${vis.accent}, 0 4px 20px rgba(0,0,0,0.8)`, animation: "safariCountDown .4s ease", lineHeight: 1 }}>
              {countdown}
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>seconde{countdown > 1 ? "s" : ""}</div>
          </div>
        )}

        {/* ENCOUNTER */}
        {pokemonId !== null && phase !== "poolLoading" && phase !== "countdown" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "8vh", position: "relative" }}>
            {(phase === "appearing" || phase === "waiting") && (
              <div style={{ fontSize: 11, color: vis.accent, textShadow: "0 2px 12px rgba(0,0,0,0.9)", marginBottom: 22, animation: "safariFadeUp .4s ease", letterSpacing: .5, textTransform: "capitalize" }}>
                {isShiny && "⭐ "}Un {monName} sauvage apparaît !
              </div>
            )}
            {phase === "throwing" && (
              <div style={{ fontSize: 10, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.9)", marginBottom: 22 }}>Pokéball, go !</div>
            )}
            {phase === "wobble" && (
              <div style={{ fontSize: 11, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.9)", marginBottom: 22, letterSpacing: 8 }}>
                {"● ".repeat(Math.min(wobbles, 3))}
              </div>
            )}

            <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {sprite && (
                <img
                  src={sprite}
                  alt={monName}
                  style={{
                    width: 160, height: 160, imageRendering: "auto",
                    filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.75))",
                    animation:
                      phase === "appearing" ? "safariPokeAppear .6s cubic-bezier(.22,1,.36,1) both" :
                      phase === "waiting" || phase === "throwing" ? "safariPokeBob 3s ease-in-out infinite" :
                      phase === "wobble" ? "safariCatchFlash .45s ease infinite" :
                      "none",
                    opacity: phase === "caught" ? 0 : 1,
                    transition: phase === "caught" ? "opacity .55s ease" : "none",
                  }}
                />
              )}

              {/* Wobble ball */}
              {(phase === "wobble" || phase === "caught") && (
                <div style={{ position: "absolute", left: "50%", top: "18%", animation: phase === "wobble" ? "safariPbWobble .45s ease-in-out infinite" : "none" }}>
                  <PokeBallSVG size={56} />
                </div>
              )}

              {/* Catch stars */}
              {phase === "caught" && [0,52,104,156,208,260,312].map((deg, i) => (
                <div key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  ["--stx" as string]: `${Math.cos(deg * Math.PI / 180) * 65}px`,
                  ["--sty" as string]: `${Math.sin(deg * Math.PI / 180) * 65}px`,
                  animation: `safariStarPop .8s ease ${i * .07}s both`,
                  fontSize: 20, pointerEvents: "none",
                } as React.CSSProperties}>⭐</div>
              ))}
            </div>

            {/* Throw animation ball */}
            {phase === "throwing" && (
              <div style={{ position: "absolute", left: "50%", bottom: 80, animation: "safariPbThrow .85s cubic-bezier(.22,1,.36,1) both" }}>
                <PokeBallSVG size={46} spinning />
              </div>
            )}

            {/* Result banner */}
            {(phase === "caught" || phase === "fled") && (
              <div style={{
                marginTop: 24, padding: "16px 30px", borderRadius: 18,
                background: phase === "caught"
                  ? "linear-gradient(135deg,rgba(20,100,20,0.92),rgba(30,140,30,0.92))"
                  : "linear-gradient(135deg,rgba(100,20,20,0.92),rgba(140,30,30,0.92))",
                color: "#fff", backdropFilter: "blur(8px)",
                fontFamily: "'Press Start 2P', monospace", fontSize: 11,
                textAlign: "center", letterSpacing: .5, lineHeight: 2.2,
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)",
                animation: "safariFadeUp .4s ease",
              }}>
                {phase === "caught" ? "🎉 Attrapé !" : "💨 Il a fui…"}
                <br />
                <button onClick={nextPokemon} style={{
                  marginTop: 6, padding: "7px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)",
                  background: "rgba(255,255,255,0.18)", color: "#fff",
                  fontFamily: "'Press Start 2P', monospace", fontSize: 8, cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}>Continuer →</button>
              </div>
            )}

            {/* Instance count */}
            {instanceCount > 0 && (phase === "waiting" || phase === "appearing") && (
              <div style={{ marginTop: 12, fontSize: 8, color: "rgba(255,255,255,0.5)", animation: "safariFadeUp .5s .5s ease both" }}>
                Tu en possèdes déjà {instanceCount} dans ta box
              </div>
            )}

            {/* Throw button */}
            {phase === "waiting" && (
              <div style={{ marginTop: 30, animation: "safariFadeUp .5s .3s ease both" }}>
                <button onClick={throwBall} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 30px", borderRadius: 40,
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  backdropFilter: "blur(10px)",
                  color: "#fff", cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace", fontSize: 10,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                  letterSpacing: .5,
                }}>
                  <PokeBallSVG size={30} />
                  LANCER LA POKÉBALL
                </button>
              </div>
            )}
          </div>
        )}
      </PixelScene>
    </div>
  );
}
