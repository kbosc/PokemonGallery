// route.ts = une "API route" Next.js. Ce n'est pas une page visible,
// c'est du code qui s'exécute côté serveur quand on appelle cette URL.
//
// Flux OAuth Google :
// 1. L'utilisateur clique "Continuer avec Google" → redirigé vers Google
// 2. Google authentifie → redirige vers /auth/callback?code=abc123
// 3. CE fichier reçoit la requête, échange le code contre une session Supabase
// 4. Redirige vers l'accueil, l'utilisateur est connecté

import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    // exchangeCodeForSession échange le code temporaire de Google
    // contre un vrai token de session Supabase (stocké en cookie).
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirige vers l'accueil, maintenant connecté.
  return NextResponse.redirect(`${origin}/`);
}
