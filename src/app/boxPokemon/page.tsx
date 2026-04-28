"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemon, POKEMON_TYPES } from "../../api/pokeApi";
import { useMyCaptures, MY_CAPTURES_QUERY_KEY } from "../../hooks/useMyCaptures";
import { releasePokemon, renameCapture, type CapturedPokemon } from "../../lib/supabase/captures";
import styles from "./boxPokemon.module.css";

const COLS = 6;
const ROWS = 5;
const SLOTS_PER_BOX = COLS * ROWS;

const TYPE_BG: Record<string, string> = {
  normal: "#c8c8a0", fire: "#f8c890", water: "#a0b8f8", electric: "#f8e870",
  grass: "#a8e890", ice: "#c8f0f0", fighting: "#e07070", poison: "#d090d0",
  ground: "#e8d898", flying: "#c8b8f8", psychic: "#f898b8", bug: "#c8d850",
  rock: "#d8c870", ghost: "#8870c0", dragon: "#9858f8", dark: "#a07870",
  steel: "#c8c8d8", fairy: "#f8c0d8",
};

const BOX_BACKGROUNDS = [
  { key: "default", label: "Défaut",   css: "linear-gradient(160deg,#1a3a6a 0%,#2a5a9a 45%,#1a4a7a 100%)" },
  { key: "forest",  label: "Forêt",    css: "linear-gradient(160deg,#1a4a1a 0%,#3a7a3a 60%,#2a5a2a 100%)" },
  { key: "lava",    label: "Volcan",   css: "linear-gradient(160deg,#5a1008 0%,#b03020 55%,#7a2010 100%)" },
  { key: "night",   label: "Nuit",     css: "linear-gradient(160deg,#0a0a20 0%,#1a1a40 60%,#0a0a2a 100%)" },
  { key: "mystic",  label: "Mystique", css: "linear-gradient(160deg,#3a1a6a 0%,#7040b8 55%,#4a2a7a 100%)" },
  { key: "sunset",  label: "Coucher",  css: "linear-gradient(160deg,#5a2800 0%,#c06830 55%,#7a3810 100%)" },
  { key: "snow",    label: "Neige",    css: "linear-gradient(160deg,#2a3a4a 0%,#6080a0 55%,#3a5060 100%)" },
];

type SortKey = "slot" | "number" | "name" | "type";
type ModalType = { type: "rename"; capture: CapturedPokemon }
              | { type: "release"; capture: CapturedPokemon }
              | { type: "renameBox" }
              | { type: "bgPicker" }
              | null;

// localStorage helpers
function loadLS<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function saveLS(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function BoxPokemonPage() {
  const queryClient = useQueryClient();
  const { data: captures, isLoading: capturesLoading } = useMyCaptures();

  const [curBox, setCurBox] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("slot");
  const [typeFilter, setTypeFilter] = useState("");
  const [shinyFilter, setShinyFilter] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [renameVal, setRenameVal] = useState("");

  // Box metadata (persisted in localStorage)
  const [boxNames, setBoxNames] = useState<Record<number, string>>({});
  const [boxBgKeys, setBoxBgKeys] = useState<Record<number, string>>({});
  const [boxCustomBgs, setBoxCustomBgs] = useState<Record<number, string>>({});

  // Slot assignments: slotMap[boxIdx][slotIdx] = captureId
  const [slotMap, setSlotMap] = useState<Record<number, Record<number, string>>>({});
  const [dragFromSlot, setDragFromSlot] = useState<number | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    setBoxNames(loadLS("pg-box-names-v1", {}));
    setBoxBgKeys(loadLS("pg-box-bgs-v1", {}));
    setSlotMap(loadLS("pg-box-slots-v1", {}));
  }, []);

  // Keep slotMap in sync when captures change: remove stale IDs, add new ones
  useEffect(() => {
    if (!captures) return;
    const captureSet = new Set(captures.map((c) => c.id));
    setSlotMap((prev) => {
      const next: Record<number, Record<number, string>> = {};
      // Copy and clean
      for (const [boxStr, slotObj] of Object.entries(prev)) {
        const b = parseInt(boxStr);
        next[b] = {};
        for (const [slotStr, id] of Object.entries(slotObj)) {
          if (captureSet.has(id)) next[b][parseInt(slotStr)] = id;
        }
      }
      // Find captures without a slot
      const assignedIds = new Set(Object.values(next).flatMap((s) => Object.values(s)));
      const unassigned = captures.filter((c) => !assignedIds.has(c.id));
      if (unassigned.length > 0) {
        // Assign to first empty slots across boxes
        let boxIdx = 0;
        for (const capture of unassigned) {
          if (!next[boxIdx]) next[boxIdx] = {};
          let slot = 0;
          while (next[boxIdx][slot] !== undefined && slot < SLOTS_PER_BOX) slot++;
          if (slot >= SLOTS_PER_BOX) { boxIdx++; if (!next[boxIdx]) next[boxIdx] = {}; slot = 0; }
          next[boxIdx][slot] = capture.id;
        }
      }
      saveLS("pg-box-slots-v1", next);
      return next;
    });
  }, [captures]);

  const uniqueIds = useMemo(
    () => Array.from(new Set(captures?.map((c) => c.pokemon_id) ?? [])),
    [captures]
  );
  const { data: pokemonMap, isLoading: pokemonsLoading } = useQuery({
    queryKey: ["boxPokemon-data", uniqueIds],
    queryFn: async () => {
      const list = await Promise.all(uniqueIds.map((id) => getPokemon(id)));
      return new Map(list.map((p) => [p.id, p]));
    },
    enabled: uniqueIds.length > 0,
  });

  const releaseMutation = useMutation({
    mutationFn: (id: string) => releasePokemon(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<CapturedPokemon[]>(MY_CAPTURES_QUERY_KEY, (old) =>
        old ? old.filter((c) => c.id !== id) : []
      );
      setSelectedId(null);
      setModal(null);
    },
  });

  const renameMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string | null }) => renameCapture(id, name),
    onSuccess: (updated) => {
      queryClient.setQueryData<CapturedPokemon[]>(MY_CAPTURES_QUERY_KEY, (old) =>
        old ? old.map((c) => (c.id === updated.id ? updated : c)) : []
      );
      setModal(null);
    },
  });

  if (capturesLoading) return <p className={styles.status}>Chargement de ta box…</p>;
  if (!captures || captures.length === 0) return (
    <p className={styles.status}>Ta box est vide — attrape des Pokémon dans le <a href="/safariPokemon">Safari</a> !</p>
  );
  if (pokemonsLoading || !pokemonMap) return <p className={styles.status}>Chargement…</p>;

  const capturesById = new Map(captures.map((c) => [c.id, c]));
  const totalBoxes = Math.max(1, Math.ceil(captures.length / SLOTS_PER_BOX));
  const boxName = (b: number) => boxNames[b] ?? `Box ${b + 1}`;

  // Current box background
  const currentBgKey = boxBgKeys[curBox] ?? "default";
  const currentBgCss = boxCustomBgs[curBox]
    ? `url(${boxCustomBgs[curBox]}) center/cover`
    : (BOX_BACKGROUNDS.find((b) => b.key === currentBgKey)?.css ?? BOX_BACKGROUNDS[0].css);

  // Build slot array for display
  const getSlots = (): Array<{ slotIdx: number; capture: CapturedPokemon | null }> => {
    if (sortBy === "slot") {
      return Array.from({ length: SLOTS_PER_BOX }, (_, i) => {
        const id = slotMap[curBox]?.[i];
        return { slotIdx: i, capture: id ? (capturesById.get(id) ?? null) : null };
      });
    }
    // Other sort modes: collect all captures, sort/filter, lay them out
    let sorted = [...captures];
    if (shinyFilter) sorted = sorted.filter((c) => c.is_shiny);
    if (typeFilter) sorted = sorted.filter((c) =>
      pokemonMap.get(c.pokemon_id)?.types?.some((t: { type: { name: string } }) => t.type.name === typeFilter)
    );
    if (sortBy === "number") sorted.sort((a, b) => a.pokemon_id - b.pokemon_id);
    if (sortBy === "name") sorted.sort((a, b) => {
      const na = a.nickname ?? pokemonMap.get(a.pokemon_id)?.name ?? "";
      const nb = b.nickname ?? pokemonMap.get(b.pokemon_id)?.name ?? "";
      return na.localeCompare(nb);
    });
    if (sortBy === "type") sorted.sort((a, b) => {
      const ta = pokemonMap.get(a.pokemon_id)?.types?.[0]?.type?.name ?? "";
      const tb = pokemonMap.get(b.pokemon_id)?.types?.[0]?.type?.name ?? "";
      return ta.localeCompare(tb);
    });
    const boxCaptures = sorted.slice(curBox * SLOTS_PER_BOX, (curBox + 1) * SLOTS_PER_BOX);
    return Array.from({ length: SLOTS_PER_BOX }, (_, i) => ({ slotIdx: i, capture: boxCaptures[i] ?? null }));
  };

  const slots = getSlots();
  const filledCount = slots.filter((s) => s.capture !== null).length;
  const selectedCapture = selectedId ? capturesById.get(selectedId) ?? null : null;
  const selectedPokemon = selectedCapture ? pokemonMap.get(selectedCapture.pokemon_id) : null;
  const selectedName = selectedCapture?.nickname ?? selectedPokemon?.name ?? "";

  // Drag & drop handlers (slot mode only)
  const handleDragStart = (slotIdx: number) => setDragFromSlot(slotIdx);
  const handleDrop = (targetSlot: number) => {
    if (dragFromSlot === null) return;
    setSlotMap((prev) => {
      const box = { ...(prev[curBox] ?? {}) };
      const fromId = box[dragFromSlot];
      const toId = box[targetSlot];
      if (fromId) box[targetSlot] = fromId; else delete box[targetSlot];
      if (toId)   box[dragFromSlot] = toId; else delete box[dragFromSlot];
      const next = { ...prev, [curBox]: box };
      saveLS("pg-box-slots-v1", next);
      return next;
    });
    setDragFromSlot(null);
    setDragOverSlot(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image trop lourde (max 5 Mo)"); return; }
    const url = URL.createObjectURL(file);
    setBoxCustomBgs((prev) => ({ ...prev, [curBox]: url }));
    setModal(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const setBoxBg = (key: string) => {
    setBoxBgKeys((prev) => { const n = { ...prev, [curBox]: key }; saveLS("pg-box-bgs-v1", n); return n; });
    setBoxCustomBgs((prev) => { const n = { ...prev }; delete n[curBox]; return n; });
  };

  const doRenameBox = (name: string) => {
    const n = { ...boxNames, [curBox]: name.trim() || `Box ${curBox + 1}` };
    setBoxNames(n);
    saveLS("pg-box-names-v1", n);
    setModal(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>BOX POKÉMON</h1>
        <p className={styles.pageSubtitle}>{captures.length} pokémon capturés</p>
      </div>

      <div className={styles.boxCard} style={{ background: currentBgCss }}>
        {/* Box navigation */}
        <div className={styles.boxNav}>
          <button className={styles.navArrow} onClick={() => { setCurBox((b) => (b > 0 ? b - 1 : totalBoxes - 1)); setSelectedId(null); }}>◀</button>
          <div
            className={styles.boxLabel}
            onDoubleClick={() => { setRenameVal(boxName(curBox)); setModal({ type: "renameBox" }); }}
            title="Double-cliquer pour renommer"
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            {boxName(curBox)} · {filledCount}/{SLOTS_PER_BOX} <span style={{ fontSize: "0.6em", opacity: .5 }}>✏</span>
          </div>
          <button className={styles.navArrow} onClick={() => { setCurBox((b) => (b < totalBoxes - 1 ? b + 1 : 0)); setSelectedId(null); }}>▶</button>
        </div>

        {/* Toolbar */}
        <div className={styles.controls}>
          {([["slot","Slot"],["number","#"],["name","A→Z"],["type","Type"]] as [SortKey, string][]).map(([val, lbl]) => (
            <button key={val} className={`${styles.sortBtn} ${sortBy === val ? styles.sortBtnActive : ""}`} onClick={() => setSortBy(val)}>{lbl}</button>
          ))}
          <button
            className={styles.sortBtn}
            style={shinyFilter ? { background: "rgba(255,220,60,0.85)", color: "#4a3800", fontWeight: 700 } : {}}
            onClick={() => setShinyFilter((f) => !f)}
          >✨</button>
          <select className={styles.typeSelect} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">Types</option>
            {POKEMON_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className={styles.sortBtn} onClick={() => setModal({ type: "bgPicker" })} title="Fond de box">🎨</button>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {slots.map(({ slotIdx, capture }) => {
            const poke = capture ? pokemonMap.get(capture.pokemon_id) : null;
            const primaryType = poke?.types?.[0]?.type?.name;
            const isSelected = capture?.id === selectedId;
            const isDragTarget = dragOverSlot === slotIdx && sortBy === "slot";
            const sprite = capture?.is_shiny ? poke?.sprites?.front_shiny : poke?.sprites?.front_default;

            return (
              <div
                key={slotIdx}
                className={`${styles.slot} ${isSelected ? styles.slotSelected : ""} ${!poke ? styles.slotEmpty : ""}`}
                style={poke ? {
                  background: TYPE_BG[primaryType ?? "normal"] ?? "rgba(255,255,255,0.15)",
                  border: isDragTarget ? "2.5px dashed #fff" : isSelected ? "2.5px solid #fff" : "2px solid transparent",
                  cursor: sortBy === "slot" && poke ? "grab" : "pointer",
                  transform: isSelected ? "scale(1.1)" : isDragTarget ? "scale(1.06)" : "scale(1)",
                } : undefined}
                draggable={!!poke && sortBy === "slot"}
                onDragStart={() => poke && handleDragStart(slotIdx)}
                onDragOver={(e) => { e.preventDefault(); sortBy === "slot" && setDragOverSlot(slotIdx); }}
                onDragLeave={() => setDragOverSlot(null)}
                onDrop={() => handleDrop(slotIdx)}
                onDragEnd={() => { setDragFromSlot(null); setDragOverSlot(null); }}
                onClick={() => capture && setSelectedId(isSelected ? null : capture.id)}
              >
                {poke ? (
                  <>
                    <img src={sprite ?? poke.sprites?.front_default} alt={capture?.nickname ?? poke.name} className={styles.slotSprite} />
                    {capture?.is_shiny && <span className={styles.shinyDot}>✨</span>}
                  </>
                ) : (
                  <div className={styles.emptyDot} />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected panel */}
        {selectedCapture && selectedPokemon && (
          <div className={styles.infoPanel}>
            <img
              src={selectedCapture.is_shiny
                ? (selectedPokemon.sprites?.front_shiny ?? selectedPokemon.sprites?.front_default)
                : (selectedPokemon.sprites?.other?.["official-artwork"]?.front_default ?? selectedPokemon.sprites?.front_default)}
              alt={selectedName}
              className={styles.infoPanelArt}
            />
            <div className={styles.infoPanelText}>
              <div className={styles.infoPanelName}>
                {selectedName}{selectedCapture.is_shiny && " ✨"}
              </div>
              <div className={styles.infoPanelMeta}>
                #{String(selectedPokemon.id).padStart(3, "0")} · {selectedPokemon.types?.map((t: { type: { name: string } }) => t.type.name).join("/")}
              </div>
              <div className={styles.infoPanelActions}>
                {selectedCapture.nickname_changes_left > 0 && (
                  <button className={styles.renameBtn} onClick={() => { setRenameVal(selectedCapture.nickname ?? selectedPokemon.name); setModal({ type: "rename", capture: selectedCapture }); }}>
                    ✏ Renommer
                  </button>
                )}
                <button className={styles.releaseBtn} onClick={() => setModal({ type: "release", capture: selectedCapture })}>
                  ✗ Relâcher
                </button>
              </div>
            </div>
          </div>
        )}

        {sortBy === "slot" && (
          <div style={{ marginTop: 8, textAlign: "center", fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Press Start 2P', monospace" }}>
            drag & drop pour réorganiser
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {modal && (
        <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && setModal(null)}>
          <div className={styles.modal}>

            {modal.type === "release" && <>
              <div className={styles.modalTitle}>⚠ RELÂCHER ?</div>
              <p className={styles.modalBody}>Tu es sur le point de relâcher <strong>{selectedName}</strong>. Cette action est irréversible.</p>
              <div className={styles.modalActions}>
                <button className={styles.modalCancel} onClick={() => setModal(null)}>Annuler</button>
                <button className={styles.modalConfirmDanger} onClick={() => releaseMutation.mutate(modal.capture.id)} disabled={releaseMutation.isPending}>Relâcher</button>
              </div>
            </>}

            {modal.type === "rename" && <>
              <div className={styles.modalTitle}>✏ RENOMMER</div>
              <input autoFocus className={styles.renameInput} value={renameVal} onChange={(e) => setRenameVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") renameMutation.mutate({ id: modal.capture.id, name: renameVal.trim() || null }); }}
                maxLength={20} />
              <div className={styles.modalActions}>
                <button className={styles.modalCancel} onClick={() => setModal(null)}>Annuler</button>
                <button className={styles.modalConfirm} onClick={() => renameMutation.mutate({ id: modal.capture.id, name: renameVal.trim() || null })} disabled={renameMutation.isPending}>Confirmer</button>
              </div>
            </>}

            {modal.type === "renameBox" && <>
              <div className={styles.modalTitle}>✏ RENOMMER LA BOX</div>
              <input autoFocus className={styles.renameInput} value={renameVal} onChange={(e) => setRenameVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") doRenameBox(renameVal); }}
                maxLength={24} />
              <div className={styles.modalActions}>
                <button className={styles.modalCancel} onClick={() => setModal(null)}>Annuler</button>
                <button className={styles.modalConfirm} onClick={() => doRenameBox(renameVal)}>Confirmer</button>
              </div>
            </>}

            {modal.type === "bgPicker" && <>
              <div className={styles.modalTitle}>🎨 FOND DE BOX</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 4 }}>
                {BOX_BACKGROUNDS.map((bg) => (
                  <div key={bg.key} onClick={() => setBoxBg(bg.key)} style={{
                    aspectRatio: "1", borderRadius: 10, background: bg.css, cursor: "pointer",
                    border: currentBgKey === bg.key && !boxCustomBgs[curBox] ? "3px solid var(--color-secondary)" : "2px solid var(--color-border)",
                    display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 4,
                    transform: currentBgKey === bg.key && !boxCustomBgs[curBox] ? "scale(1.08)" : "scale(1)",
                    transition: "transform .12s",
                  }}>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, background: "rgba(0,0,0,0.4)", padding: "1px 5px", borderRadius: 4 }}>{bg.label}</span>
                  </div>
                ))}
                {/* Custom image */}
                <div onClick={() => fileInputRef.current?.click()} style={{
                  aspectRatio: "1", borderRadius: 10, cursor: "pointer",
                  border: boxCustomBgs[curBox] ? "3px solid var(--color-secondary)" : "2px dashed var(--color-border)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
                  background: boxCustomBgs[curBox] ? `url(${boxCustomBgs[curBox]}) center/cover` : "var(--color-surface-elevated)",
                  transform: boxCustomBgs[curBox] ? "scale(1.08)" : "scale(1)",
                  transition: "transform .12s",
                }}>
                  <span style={{ fontSize: 18 }}>📷</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>Import</span>
                </div>
              </div>
              <p style={{ fontSize: "1.1rem", color: "var(--color-text-muted)", margin: 0 }}>Image : jpg / png / gif / webp · max 5 Mo</p>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleImageUpload} style={{ display: "none" }} />
              <button className={styles.modalCancel} onClick={() => setModal(null)}>Fermer</button>
            </>}

          </div>
        </div>
      )}
    </div>
  );
}
