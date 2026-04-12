// Service CRUD pour la table captured_pokemons.
//
// But : centraliser TOUS les appels Supabase liés aux captures à un seul
// endroit. Les composants et hooks ne parlent jamais directement à Supabase,
// ils passent par ces fonctions. Avantages :
//   - signatures typées et stables (les composants ne voient pas Postgrest)
//   - si on change de backend plus tard, on ne touche qu'à ce fichier
//   - les messages d'erreur sont homogènes
//
// Toutes ces fonctions s'exécutent côté NAVIGATEUR (client Supabase browser).
// Les policies RLS de la migration 0001 garantissent que le user ne peut
// voir/modifier que SES propres captures, même si le code client était
// manipulé (ex: devtools). La sécurité est côté base de données.

import { createClient } from "./client";

// Shape d'une ligne telle qu'elle est stockée en base.
// Les noms snake_case reflètent les colonnes SQL (c'est la convention Postgres).
export type CapturedPokemon = {
  id: string; // UUID de cette capture précise (≠ pokemon_id)
  owner_id: string; // UUID du dresseur (FK vers auth.users)
  pokemon_id: number; // ID PokéAPI de l'espèce (1 = Bulbasaur, 25 = Pikachu…)
  nickname: string | null;
  is_shiny: boolean;
  caught_at: string; // ISO timestamp
};

// Données à fournir pour créer une capture. owner_id est ajouté par le
// service (pas par l'appelant) pour éviter les bugs de sécurité.
export type CaptureInput = {
  pokemon_id: number;
  nickname?: string | null;
  is_shiny?: boolean;
};

// -------------------------------------------------------------------
// Helpers internes
// -------------------------------------------------------------------

async function getCurrentUserId(): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Utilisateur non connecté.");
  }
  return user.id;
}

// -------------------------------------------------------------------
// Lecture
// -------------------------------------------------------------------

/**
 * Renvoie toutes les captures du dresseur connecté, triées par date
 * de capture croissante (les plus anciennes en premier).
 *
 * Grâce à la policy RLS "Users can view own captures", le filtrage
 * owner_id = auth.uid() est automatique côté DB — pas besoin d'un
 * `.eq("owner_id", ...)` côté client.
 */
export async function getMyCaptures(): Promise<CapturedPokemon[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("captured_pokemons")
    .select("*")
    .order("caught_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

// -------------------------------------------------------------------
// Écriture
// -------------------------------------------------------------------

/**
 * Crée une nouvelle capture pour le dresseur connecté.
 * Renvoie la ligne insérée (avec son id UUID généré par Postgres).
 */
export async function capturePokemon(
  input: CaptureInput
): Promise<CapturedPokemon> {
  const ownerId = await getCurrentUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("captured_pokemons")
    .insert({
      owner_id: ownerId,
      pokemon_id: input.pokemon_id,
      nickname: input.nickname ?? null,
      is_shiny: input.is_shiny ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Supprime une capture précise (par son UUID d'instance, pas par pokemon_id
 * — sinon on ne pourrait pas choisir lequel relâcher quand on a 3 Pikachu).
 */
export async function releasePokemon(captureId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("captured_pokemons")
    .delete()
    .eq("id", captureId);

  if (error) throw error;
}

/**
 * Met à jour le surnom d'une capture (null = retirer le surnom).
 * Renvoie la ligne mise à jour.
 */
export async function renameCapture(
  captureId: string,
  nickname: string | null
): Promise<CapturedPokemon> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("captured_pokemons")
    .update({ nickname })
    .eq("id", captureId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
