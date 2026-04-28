"use client";

import type { HabitatKey } from "./habitats";

type Palette = {
  sky: string;
  skyMid: string;
  hill1: string;
  hill2: string;
  ground: string;
  groundDark: string;
};

export type HabitatVisual = {
  accent: string;
  icon: string;
  palette: Palette;
};

export const HABITAT_VISUAL: Record<HabitatKey, HabitatVisual> = {
  plaine: {
    accent: "#f5d020",
    icon: "🌾",
    palette: { sky: "#87CEEB", skyMid: "#B8E8F8", hill1: "#5aae1a", hill2: "#3d7a10", ground: "#2d5e08", groundDark: "#1a3a04" },
  },
  foret: {
    accent: "#78c850",
    icon: "🌿",
    palette: { sky: "#0d2e06", skyMid: "#1a4a0a", hill1: "#0d3008", hill2: "#0a2006", ground: "#071504", groundDark: "#040e02" },
  },
  ocean: {
    accent: "#6890f0",
    icon: "🌊",
    palette: { sky: "#051630", skyMid: "#0a2850", hill1: "#0a3060", hill2: "#062040", ground: "#041020", groundDark: "#020810" },
  },
  caverne: {
    accent: "#b8a038",
    icon: "⛰",
    palette: { sky: "#080810", skyMid: "#10101e", hill1: "#1c1c28", hill2: "#141420", ground: "#0a0a14", groundDark: "#060608" },
  },
  volcan: {
    accent: "#f08030",
    icon: "🌋",
    palette: { sky: "#1a0500", skyMid: "#3a0e00", hill1: "#5a1808", hill2: "#3a0e04", ground: "#280800", groundDark: "#140400" },
  },
  sanctuaire: {
    accent: "#f85888",
    icon: "✨",
    palette: { sky: "#0a0220", skyMid: "#180440", hill1: "#20086a", hill2: "#140450", ground: "#080118", groundDark: "#04000c" },
  },
};

const SAFARI_KEYFRAMES = `
  @keyframes safariPbSpin    { to { transform: rotate(360deg); } }
  @keyframes safariPbThrow   { 0%{transform:translate(0,0) rotate(0deg) scale(.7)} 100%{transform:translate(0,-55vh) rotate(720deg) scale(1)} }
  @keyframes safariPbWobble  { 0%,100%{transform:translateX(-50%) rotate(-20deg)} 50%{transform:translateX(-50%) rotate(20deg)} }
  @keyframes safariPokeAppear{ 0%{opacity:0;transform:scale(.3) translateY(60px)} 65%{transform:scale(1.1) translateY(-10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes safariPokeBob   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes safariCatchFlash{ 0%,100%{opacity:1} 40%{opacity:.1;filter:brightness(4)} }
  @keyframes safariStarPop   { 0%{opacity:0;transform:scale(0) rotate(0deg) translate(var(--stx),var(--sty))} 55%{opacity:1;transform:scale(1.3) rotate(180deg) translate(var(--stx),var(--sty))} 100%{opacity:0;transform:scale(.7) rotate(360deg) translate(var(--stx),var(--sty))} }
  @keyframes safariFadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes safariCountDown { from{transform:scale(1.4);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes safariGlowPulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes safariFloatUp   { 0%{transform:translateY(0) scale(1);opacity:.7} 100%{transform:translateY(-100px) scale(.3);opacity:0} }
  @keyframes safariWaveShift { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes safariTwinkle   { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
  @keyframes safariAurora    { 0%{transform:translateX(-10%) skewX(-5deg);opacity:.4} 50%{transform:translateX(10%) skewX(5deg);opacity:.7} 100%{transform:translateX(-10%) skewX(-5deg);opacity:.4} }
`;

const GH = "42%"; // ground height

function PlaineScene({ p }: { p: Palette }) {
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 100%)` }} />
    <div style={{ position: "absolute", top: 36, right: "10%", width: 64, height: 64, borderRadius: "50%", background: "#ffe066", boxShadow: "0 0 0 8px #ffee9933, 0 0 0 16px #ffe06622, 0 0 40px #f5a02066" }} />
    {([[12,55,130,36],[35,45,90,28],[58,62,110,32],[72,40,80,24]] as [number,number,number,number][]).map(([l,t,w,h],i) => (
      <div key={i} style={{ position: "absolute", top: t, left: `${l}%`, width: w, height: h, background: "white", borderRadius: h/2, boxShadow: "0 0 0 4px white", opacity: .88 }} />
    ))}
    <div style={{ position: "absolute", bottom: GH, left: "-5%", right: "-5%", height: "22%", background: p.hill2, borderRadius: "55% 55% 0 0", opacity: .7 }} />
    <div style={{ position: "absolute", bottom: GH, left: "-15%", right: "-10%", height: "18%", background: p.hill1, borderRadius: "60% 40% 0 0", opacity: .8 }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,${p.hill1} 0%,${p.ground} 20%,${p.groundDark} 100%)` }} />
    <div style={{ position: "absolute", bottom: GH, left: 0, right: 0, height: 12, overflow: "hidden" }}>
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} style={{ position: "absolute", bottom: 0, left: `${i * 1.7}%`, width: 4, height: 8 + i%4*3, background: "#6abe30", borderRadius: "2px 2px 0 0", transform: `rotate(${-8+i%5*4}deg)`, transformOrigin: "bottom" }} />
      ))}
    </div>
    {[8,22,37,51,64,78].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} + 8px)`, left: `${l}%`, fontSize: 14 }}>🌸</div>
    ))}
  </>;
}

function ForetScene({ p }: { p: Palette }) {
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 100%)` }} />
    {[20,40,60].map((l, i) => (
      <div key={i} style={{ position: "absolute", top: 0, left: `${l}%`, width: 40, height: "65%", background: "linear-gradient(180deg,rgba(120,200,80,0.06) 0%,transparent 100%)", transform: `skewX(${-10+i*8}deg)`, pointerEvents: "none" }} />
    ))}
    {[3,12,22,32,42,52,62,72,82,92].map((l, i) => (
      <div key={i}>
        <div style={{ position: "absolute", bottom: GH, left: `${l}%`, width: 0, height: 0, borderLeft: `${22+i%3*10}px solid transparent`, borderRight: `${22+i%3*10}px solid transparent`, borderBottom: `${80+i%4*30}px solid ${i%2?"#0d3208":"#0a2206"}`, zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: GH, left: `calc(${l}% + ${(i%3-1)*4}px)`, width: 0, height: 0, borderLeft: `${16+i%3*8}px solid transparent`, borderRight: `${16+i%3*8}px solid transparent`, borderBottom: `${60+i%3*25}px solid ${i%2?"#174212":"#102e0a"}`, zIndex: 2, marginBottom: 40 }} />
      </div>
    ))}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,${p.hill1} 0%,${p.groundDark} 100%)` }} />
    {[15,35,55,75].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} + 2px)`, left: `${l}%`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 14+i%2*6, height: 10, background: i%2?"#e03030":"#e0a020", borderRadius: "50% 50% 0 0" }} />
        <div style={{ width: 6, height: 14, background: "#c8b898" }} />
      </div>
    ))}
    {[18,33,47,61,75].map((l, i) => (
      <div key={i} style={{ position: "absolute", top: `${25+i*7}%`, left: `${l}%`, width: 4, height: 4, borderRadius: "50%", background: "#aaff66", boxShadow: "0 0 10px 4px #88ff4466", animation: `safariFloatUp ${2.5+i*.4}s ease ${i*.7}s infinite` }} />
    ))}
  </>;
}

function OceanScene({ p }: { p: Palette }) {
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 40%,#0a2050 100%)` }} />
    {[15,30,45,60,75].map((l, i) => (
      <div key={i} style={{ position: "absolute", top: 0, left: `${l}%`, width: 30+i%3*15, height: "80%", background: "linear-gradient(180deg,rgba(100,180,255,0.07) 0%,transparent 100%)", transform: `skewX(${-15+i*7}deg)`, animation: `safariGlowPulse ${2.5+i*.3}s ease ${i*.5}s infinite`, pointerEvents: "none" }} />
    ))}
    {Array.from({ length: 12 }, (_, i) => (
      <div key={i} style={{ position: "absolute", bottom: `${20+i*5}%`, left: `${(i*8.3)%90}%`, width: 4+i%4*2, height: 4+i%4*2, borderRadius: "50%", border: "1.5px solid rgba(150,220,255,0.5)", animation: `safariFloatUp ${3+i*.35}s ease ${i*.4}s infinite` }} />
    ))}
    {[10,25,40,55,70,85].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} - 2px)`, left: `${l}%`, width: 8, height: 40+i%3*20, background: `linear-gradient(180deg,#20a040,#108020)`, borderRadius: "4px 4px 0 0", transform: `skewX(${-10+i%3*10}deg)`, transformOrigin: "bottom" }} />
    ))}
    <div style={{ position: "absolute", bottom: GH, left: "-10%", right: 0, height: 8, background: "linear-gradient(90deg,transparent,rgba(150,220,255,0.35),rgba(100,200,255,0.5),rgba(150,220,255,0.35),transparent)", animation: "safariWaveShift 4s linear infinite", width: "220%" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,${p.hill2} 0%,${p.groundDark} 100%)` }} />
    <div style={{ position: "absolute", bottom: GH, left: 0, right: 0, height: 6, background: "linear-gradient(90deg,#c8a860,#d4b870,#c8a860)", opacity: .4 }} />
  </>;
}

function CaverneScene({ p }: { p: Palette }) {
  const stalColors = ["#2a2a3e","#1e1e2e","#222236"];
  const stalGlows = ["#c060ff44","#6090ff44","#ff60c044"];
  const crystalColors = ["#e0a0ff","#a0c0ff","#ffa0d0","#a0ffd0","#ffe0a0"];
  const crystalGlows = ["#c060ff","#6090ff","#ff60c0","#60ffc0","#ffc060"];
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 100%)` }} />
    {[5,12,19,26,33,40,47,54,61,68,75,82,89].map((l, i) => (
      <div key={i} style={{ position: "absolute", top: 0, left: `${l}%`, width: 0, height: 0, borderLeft: `${7+i%4*5}px solid transparent`, borderRight: `${7+i%4*5}px solid transparent`, borderTop: `${25+i%5*18}px solid ${stalColors[i%3]}`, filter: `drop-shadow(0 4px 8px ${stalGlows[i%3]})` }} />
    ))}
    {[15,30,45,60,75].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} - 2px)`, left: `${l}%`, display: "flex", gap: 2 }}>
        {[0,1,2].map(j => (
          <div key={j} style={{ width: 6+j*2, height: 20+j*10+i*4, background: `linear-gradient(180deg,${crystalColors[i]},transparent)`, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", opacity: .7+j*.1, boxShadow: `0 0 10px ${crystalGlows[i]}55` }} />
        ))}
      </div>
    ))}
    {[15,30,45,60,75].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} + 10px)`, left: `${l+1}%`, width: 20, height: 6, borderRadius: "50%", background: crystalGlows[i], filter: "blur(6px)", opacity: .5, animation: `safariGlowPulse ${1.5+i*.3}s ease ${i*.2}s infinite` }} />
    ))}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,${p.hill1} 0%,${p.groundDark} 100%)` }} />
    {[8,22,36,50,64,78].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: GH, left: `${l}%`, width: 30+i%3*15, height: 16+i%2*10, background: p.hill2, borderRadius: "50% 50% 0 0", opacity: .8 }} />
    ))}
  </>;
}

function VolcanScene({ p }: { p: Palette }) {
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,#6a1800 60%,#3a0800 100%)` }} />
    {([[10,30,120,40],[30,20,90,30],[55,35,110,35],[75,22,80,28]] as [number,number,number,number][]).map(([l,t,w,h], i) => (
      <div key={i} style={{ position: "absolute", top: t, left: `${l}%`, width: w, height: h, background: "rgba(60,30,20,0.7)", borderRadius: h/2, filter: "blur(4px)" }} />
    ))}
    <div style={{ position: "absolute", bottom: GH, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "180px solid transparent", borderRight: "180px solid transparent", borderBottom: "220px solid #2a0800" }} />
    <div style={{ position: "absolute", bottom: `calc(${GH} + 180px)`, left: "50%", transform: "translateX(-50%)", width: 60, height: 20, borderRadius: "50%", background: "#ff4400", filter: "blur(12px)", opacity: .8, animation: "safariGlowPulse 1.5s ease infinite" }} />
    {Array.from({ length: 14 }, (_, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} + ${50+i%5*30}px)`, left: `${30+i*3.2}%`, width: 3+i%3, height: 3+i%3, borderRadius: "50%", background: i%3===0?"#ff6020":i%3===1?"#ffaa20":"#ff3800", boxShadow: `0 0 6px ${i%2?"#ff6020":"#ffaa20"}`, animation: `safariFloatUp ${1.2+i*.2}s ease ${i*.25}s infinite` }} />
    ))}
    {[44,50,56].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: GH, left: `${l}%`, width: 8+i*3, height: 80+i*20, background: "linear-gradient(180deg,#ff4400,#aa2200)", opacity: .7, borderRadius: 4 }} />
    ))}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,#5a1200 0%,${p.groundDark} 100%)` }} />
    <div style={{ position: "absolute", bottom: GH, left: 0, right: 0, height: 10, background: "linear-gradient(90deg,transparent 5%,#ff440066 25%,#ff6600aa 50%,#ff440066 75%,transparent 95%)", animation: "safariGlowPulse 2s ease infinite" }} />
  </>;
}

function SanctuaireScene({ p }: { p: Palette }) {
  const auroraColors = ["#c060ff","#6090ff","#ff60b0","#60d0ff"];
  const orbColors = ["#c060ff","#ff60b0","#6090ff"];
  return <>
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${p.sky} 0%,${p.skyMid} 100%)` }} />
    {auroraColors.map((c, i) => (
      <div key={i} style={{ position: "absolute", top: `${10+i*8}%`, left: "-20%", right: "-20%", height: 40, background: `linear-gradient(90deg,transparent,${c}33,${c}55,${c}33,transparent)`, borderRadius: 20, animation: `safariAurora ${3+i*.5}s ease ${i*.7}s infinite` }} />
    ))}
    {Array.from({ length: 28 }, (_, i) => (
      <div key={i} style={{ position: "absolute", top: `${(i*7.3)%55}%`, left: `${(i*3.7+5)%92}%`, width: 2+i%3, height: 2+i%3, borderRadius: "50%", background: "white", animation: `safariTwinkle ${1.5+i*.2}s ease ${i*.12}s infinite` }} />
    ))}
    {[10,25,65,80].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: GH, left: `${l}%`, width: 18, height: 60+i%2*30, background: "linear-gradient(180deg,#2a1850,#1a0e38)", borderRadius: "3px 3px 0 0", opacity: .8 }}>
        <div style={{ position: "absolute", top: -6, left: -4, right: -4, height: 10, background: "#3a2060", borderRadius: 3 }} />
      </div>
    ))}
    {[20,40,60].map((l, i) => (
      <div key={i} style={{ position: "absolute", bottom: `calc(${GH} + 20px)`, left: `${l}%`, width: 12, height: 12, borderRadius: "50%", background: orbColors[i], boxShadow: `0 0 16px 6px ${orbColors[i]}66`, animation: `safariGlowPulse ${1.8+i*.4}s ease ${i*.5}s infinite` }} />
    ))}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: GH, background: `linear-gradient(180deg,#1a0840 0%,${p.groundDark} 100%)` }} />
    <div style={{ position: "absolute", bottom: GH, left: "20%", right: "20%", height: 4, background: "linear-gradient(90deg,transparent,#c060ff66,#ff60b066,#c060ff66,transparent)", borderRadius: 2, animation: "safariGlowPulse 2.5s ease infinite" }} />
  </>;
}

export default function PixelScene({ habitatKey, children }: { habitatKey: HabitatKey; children?: React.ReactNode }) {
  const vis = HABITAT_VISUAL[habitatKey];
  const p = vis.palette;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: p.sky }}>
      <style suppressHydrationWarning>{SAFARI_KEYFRAMES}</style>
      {habitatKey === "plaine"      && <PlaineScene p={p} />}
      {habitatKey === "foret"       && <ForetScene p={p} />}
      {habitatKey === "ocean"       && <OceanScene p={p} />}
      {habitatKey === "caverne"     && <CaverneScene p={p} />}
      {habitatKey === "volcan"      && <VolcanScene p={p} />}
      {habitatKey === "sanctuaire"  && <SanctuaireScene p={p} />}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}
