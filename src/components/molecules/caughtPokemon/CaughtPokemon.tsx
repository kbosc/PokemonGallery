// Carte d'affichage d'une INSTANCE capturée dans la BoxPokemon.
// Chaque carte représente une ligne de la table captured_pokemons.
//
// Fonctions :
//   - affiche le sprite + surnom (ou nom d'espèce si pas de surnom)
//   - indicateur ⭐ si l'instance est shiny
//   - bouton "Renommer" → formulaire inline avec validation (3-20 caractères)
//   - bouton "Relâcher" → supprime CETTE instance précise (par UUID)
//
// Les deux actions passent par des mutations React Query qui patchent
// le cache MY_CAPTURES_QUERY_KEY en local sur succès — pas de refetch
// réseau, l'UI est instantanée.

"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  releasePokemon,
  renameCapture,
  type CapturedPokemon,
} from "../../../lib/supabase/captures";
import { MY_CAPTURES_QUERY_KEY } from "../../../hooks/useMyCaptures";
import Button from "../../atoms/button/Button";
import styles from "./caughtPokemon.module.css";

// Shape minimale utilisée à l'affichage. getPokemon renvoie beaucoup
// plus ; on ne type que ce qu'on lit ici.
type PokemonDetail = {
  name: string;
  weight: number;
  types?: Array<{ type: { name: string } }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    other?: {
      dream_world?: {
        front_default: string | null;
      };
    };
  };
};

type Props = {
  capture: CapturedPokemon;
  data: PokemonDetail;
};

export const CaughtPokemon = ({ capture, data }: Props) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState(capture.nickname ?? "");

  const releaseMutation = useMutation({
    mutationFn: () => releasePokemon(capture.id),
    onSuccess: () => {
      queryClient.setQueryData<CapturedPokemon[]>(
        MY_CAPTURES_QUERY_KEY,
        (old) => (old ? old.filter((c) => c.id !== capture.id) : [])
      );
    },
  });

  const renameMutation = useMutation({
    mutationFn: (nickname: string | null) =>
      renameCapture(capture.id, nickname),
    onSuccess: (updated) => {
      queryClient.setQueryData<CapturedPokemon[]>(
        MY_CAPTURES_QUERY_KEY,
        (old) =>
          old ? old.map((c) => (c.id === capture.id ? updated : c)) : []
      );
      setEditing(false);
    },
  });

  const displayName = capture.nickname ?? data.name;
  const primaryType = data.types?.[0]?.type.name ?? "—";
  // Shiny → front_shiny de PokéAPI (pas de dream_world shiny disponible).
  // Normal → dream_world HD en priorité, front_default en fallback.
  const sprite = capture.is_shiny
    ? (data.sprites.front_shiny ?? data.sprites.front_default)
    : (data.sprites.other?.dream_world?.front_default ?? data.sprites.front_default);
  // Le renommage est limité à 1 fois par instance (trigger DB qui
  // décrémente nickname_changes_left). Le bouton "Renommer" disparaît
  // quand le crédit est à 0 ; si malgré ça le front envoie une mutation,
  // le trigger côté DB la rejettera.
  const canRename = capture.nickname_changes_left > 0;

  const handleSubmitRename = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nicknameDraft.trim();
    // String vide → on enlève le surnom (retour au nom d'espèce).
    renameMutation.mutate(trimmed.length > 0 ? trimmed : null);
  };

  const handleCancelRename = () => {
    setEditing(false);
    setNicknameDraft(capture.nickname ?? "");
  };

  return (
    <div className={`${styles.card} ${capture.is_shiny ? styles.cardShiny : ""}`}>
      {sprite && (
        <img
          className={styles.sprite}
          src={sprite}
          alt={`Image du pokémon ${data.name}`}
        />
      )}

      <div className={styles.info}>
        {editing ? (
          <form className={styles.editForm} onSubmit={handleSubmitRename}>
            <input
              className={styles.nicknameInput}
              type="text"
              value={nicknameDraft}
              onChange={(e) => setNicknameDraft(e.target.value)}
              placeholder={data.name}
              maxLength={20}
              autoFocus
              aria-label="Nouveau surnom"
            />
            <span className={styles.renameWarning}>
              Ce renommage est définitif.
            </span>
            <div className={styles.editActions}>
              <Button type="submit" disabled={renameMutation.isPending}>
                OK
              </Button>
              <Button type="button" onClick={handleCancelRename}>
                Annuler
              </Button>
            </div>
          </form>
        ) : (
          <span className={styles.name}>
            {displayName}
            {capture.is_shiny && (
              <span
                className={styles.shiny}
                role="img"
                aria-label="Pokémon shiny"
                title="Shiny"
              >
                ⭐
              </span>
            )}
          </span>
        )}

        <span className={styles.meta}>
          Espèce : {data.name} · Type : {primaryType}
        </span>
        <span className={styles.meta}>Poids : {data.weight / 10} kg</span>
      </div>

      {!editing && (
        <div className={styles.actions}>
          {canRename && (
            <Button onClick={() => setEditing(true)}>Renommer</Button>
          )}
          <Button
            onClick={() => releaseMutation.mutate()}
            disabled={releaseMutation.isPending}
          >
            Relâcher
          </Button>
        </div>
      )}
    </div>
  );
};
