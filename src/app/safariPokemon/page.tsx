"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HABITATS, pickRandomHabitat, type HabitatKey } from "./habitats";
import { HABITAT_VISUAL } from "./PixelScene";

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#F8D030",
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
  ground: "#E0C068", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
  steel: "#B8B8D0", fairy: "#EE99AC",
};

const HABITAT_META: Record<HabitatKey, { desc: string; hint: string; types: string[] }> = {
  foret:      { desc: "Sous-bois & champignons",     hint: "Bulbizarre, Chenipan, Aspicot…",  types: ["grass","bug","poison"] },
  ocean:      { desc: "Fonds marins",                hint: "Carapuce, Tentacool, Magicarpe…", types: ["water","ice"] },
  plaine:     { desc: "Herbes hautes & prairies",    hint: "Roucool, Rattata, Pikachu…",      types: ["normal","flying","electric"] },
  caverne:    { desc: "Profondeurs souterraines",    hint: "Geodude, Onyx, Fantominus…",      types: ["rock","ground","ghost"] },
  volcan:     { desc: "Lave & cendres",              hint: "Salamèche, Magmar, Dracaufeu…",   types: ["fire","dragon"] },
  sanctuaire: { desc: "Êtres mystiques",             hint: "Mewtwo, Évoli, Abra…",            types: ["psychic","fairy"] },
};

const HABITAT_KEYS = Object.keys(HABITATS) as HabitatKey[];

function MiniScene({ habitatKey }: { habitatKey: HabitatKey }) {
  const { palette: p, icon } = HABITAT_VISUAL[habitatKey];
  return (
    <div style={{ height: 90, position: "relative", overflow: "hidden", background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 60%,${p.hill1} 100%)` }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 28, background: `linear-gradient(180deg,${p.hill2} 0%,${p.ground} 100%)` }} />
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", fontSize: 28 }}>{icon}</div>
    </div>
  );
}

function HabitatCard({ habitatKey, onClick }: { habitatKey: HabitatKey; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const meta = HABITAT_META[habitatKey];
  const vis = HABITAT_VISUAL[habitatKey];
  const p = vis.palette;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderRadius: 20, overflow: "hidden", cursor: "pointer", position: "relative",
        transform: hov ? "translateY(-5px) scale(1.02)" : "scale(1)",
        transition: "transform .22s ease, box-shadow .22s ease",
        boxShadow: hov ? "0 18px 48px rgba(0,0,0,0.45)" : "0 4px 18px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div style={{ position: "relative" }}>
        <MiniScene habitatKey={habitatKey} />
        {hov && <div style={{ position: "absolute", inset: 0, background: `${vis.accent}22`, transition: "background .2s" }} />}
      </div>
      <div style={{ padding: "16px 18px 18px", background: `linear-gradient(135deg,${p.sky}ee,${p.skyMid}ee)` }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "#fff", marginBottom: 5, letterSpacing: .5 }}>
          {HABITATS[habitatKey].label.toUpperCase()}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>{meta.desc}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginBottom: 10, fontStyle: "italic" }}>{meta.hint}</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {meta.types.map((t) => (
            <span key={t} style={{
              padding: "2px 9px", borderRadius: 20, fontSize: 9, textTransform: "capitalize",
              fontWeight: 600, color: "#fff",
              background: `${TYPE_COLORS[t] ?? "#888"}44`,
              border: `1px solid ${TYPE_COLORS[t] ?? "#888"}66`,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SurpriseCard({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        borderRadius: 20, overflow: "hidden", cursor: "pointer",
        background: "linear-gradient(135deg,#0e0e1e,#1a1a2e)",
        transform: hov ? "translateY(-5px) scale(1.02)" : "scale(1)",
        transition: "transform .22s ease, box-shadow .22s ease",
        boxShadow: hov ? "0 18px 48px rgba(0,0,0,0.55)" : "0 4px 18px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ height: 90, background: "linear-gradient(180deg,#0a0a18 0%,#12122a 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 60%, rgba(180,150,20,0.18) 0%, transparent 70%)", opacity: hov ? 1 : 0.5, transition: "opacity .2s" }} />
        <div style={{ position: "absolute", right: -8, bottom: -14, fontFamily: "'Press Start 2P', monospace", fontSize: 64, color: "rgba(180,150,20,0.07)", lineHeight: 1, userSelect: "none" }}>?</div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 32, color: "#c8a820", textShadow: "0 0 20px rgba(200,168,32,0.5)", lineHeight: 1, position: "relative", zIndex: 1, transition: "transform .2s", transform: hov ? "scale(1.15)" : "scale(1)" }}>?</div>
      </div>
      <div style={{ padding: "16px 18px 18px", background: "linear-gradient(135deg,#0e0e1eee,#1a1a2eee)" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 10, color: "#fff", marginBottom: 5, letterSpacing: .5 }}>SURPRISE !</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Habitat au hasard</div>
        <div style={{ fontSize: 10, color: "rgba(200,168,32,0.6)", fontStyle: "italic" }}>Quelle zone t'attend ?</div>
      </div>
    </div>
  );
}

export default function SafariMenuPage() {
  const router = useRouter();

  const handleSurprise = () => {
    const key = pickRandomHabitat();
    router.push(`/safariPokemon/${key}`);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "1rem 0 4rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 1rem" }}>
        <h1 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 18, color: "var(--color-text)", marginBottom: 8, letterSpacing: 1 }}>
          SAFARI
        </h1>
        <p style={{ color: "var(--color-text-muted)", fontSize: 13, marginBottom: 28 }}>
          Choisis un habitat — un Pokémon sauvage apparaît après quelques secondes
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 14 }}>
          {HABITAT_KEYS.map((key) => (
            <HabitatCard key={key} habitatKey={key} onClick={() => router.push(`/safariPokemon/${key}`)} />
          ))}
          <SurpriseCard onClick={handleSurprise} />
        </div>
      </div>
    </div>
  );
}
