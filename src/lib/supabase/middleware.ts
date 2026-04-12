// Helper Supabase pour le MIDDLEWARE Next.js.
//
// Le middleware s'exécute à chaque requête, AVANT le rendu de la page.
// Son rôle principal ici :
//   1. Rafraîchir automatiquement le token JWT s'il a expiré
//      (sinon la session se termine brutalement après ~1h).
//   2. Donner accès à l'utilisateur connecté pour décider
//      si on laisse passer ou si on redirige vers /login.
//
// Différence avec server.ts :
//   - server.ts lit les cookies depuis next/headers (Server Components)
//   - ici on lit les cookies depuis la NextRequest et on écrit
//     dans la NextResponse (c'est le format du middleware).

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // On prépare une réponse "passe-plat" : on laisse continuer la requête
  // avec les mêmes headers. Supabase va potentiellement y ajouter des
  // cookies rafraîchis.
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Quand Supabase veut mettre à jour les cookies (session rafraîchie),
          // on les écrit à la fois sur la requête (pour le reste du middleware)
          // et sur la réponse (pour que le navigateur les reçoive).
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() déclenche la vérification du JWT côté Supabase
  // et, si besoin, appelle setAll() au-dessus pour rafraîchir les cookies.
  // IMPORTANT : ne pas supprimer cet appel, c'est lui qui maintient la session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
