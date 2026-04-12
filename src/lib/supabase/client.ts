// Client Supabase pour le NAVIGATEUR (composants "use client").
//
// createBrowserClient gère automatiquement les cookies de session.
// On l'appelle dans les hooks et composants côté client :
//   const supabase = createClient();
//   const { data } = await supabase.from("captured_pokemons").select();

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
