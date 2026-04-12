// Client Supabase pour le SERVEUR (Server Components, middleware, API routes).
//
// Le serveur ne peut pas accéder à document.cookie comme le navigateur.
// Il doit lire les cookies depuis la requête HTTP.
// @supabase/ssr s'intègre avec les cookies de Next.js pour ça.
//
// Usage dans un Server Component ou une API route :
//   const supabase = await createClient();
//   const { data: { user } } = await supabase.auth.getUser();

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll peut échouer dans un Server Component (lecture seule).
            // C'est normal — les cookies seront mis à jour par le middleware.
          }
        },
      },
    }
  );
}
