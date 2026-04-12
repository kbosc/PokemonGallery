// src/middleware.ts — s'exécute AVANT chaque requête correspondant au matcher.
//
// Rôles ici :
//   1. Rafraîchir la session Supabase (via updateSession)
//   2. Protéger /boxPokemon et /safariPokemon : si pas connecté → /login
//
// Les autres routes (/, /pokemonGallery, /login, /signup, /auth/callback)
// restent publiques mais bénéficient quand même du refresh de session.

import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

// Routes qui exigent une session active.
const PROTECTED_ROUTES = ["/boxPokemon", "/safariPokemon"];

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Pas connecté + route protégée → redirection vers /login.
  // On ajoute ?redirectedFrom=... pour (plus tard) renvoyer
  // l'utilisateur sur la page demandée après login.
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Route publique OU utilisateur connecté → on continue avec la réponse
  // (qui contient les éventuels cookies Supabase rafraîchis).
  return supabaseResponse;
}

// Le matcher dit à Next.js QUAND exécuter le middleware.
// On exclut les fichiers statiques et images pour éviter d'appeler
// Supabase à chaque chargement d'icône ou de CSS (performance + quota).
export const config = {
  matcher: [
    /*
     * Match toutes les routes SAUF :
     * - _next/static (assets statiques de Next)
     * - _next/image (optimisation d'images)
     * - favicon.ico
     * - fichiers avec extension (images, sons, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|ico)$).*)",
  ],
};
