// layout.tsx est un Server Component par défaut.
// Il génère le HTML de base côté serveur — c'est plus rapide que
// d'attendre que le JavaScript charge dans le navigateur.
//
// next/font télécharge Inter et Cinzel au build et les sert en
// self-hosted — pas de requête externe bloquante au chargement.

import { Inter, Cinzel } from "next/font/google";
import "../assets/styles/variables.css";
import "../assets/styles/globals.css";
import styles from "./layout.module.css";
import Providers from "./providers";
import PokeballNav from "../components/organisms/pokeballNav/PokeballNav";
import TweaksPanel from "../components/organisms/tweaksPanel/TweaksPanel";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
  variable: "--font-cinzel",
});

export const metadata = {
  title: "PokéGallery",
  description: "Attrape, collectionne et échange des Pokémon Gen 1",
  icons: { icon: "/pokeball.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
      {/* suppressHydrationWarning : certaines extensions navigateur
          (ColorZilla, Grammarly…) ajoutent des attributs au <body> côté
          client, ce qui crée un mismatch d'hydratation inoffensif.
          Ce flag n'ignore QUE les attributs directs du body, pas ses
          enfants — donc nos vraies erreurs restent détectées. */}
      <body suppressHydrationWarning>
        <Providers>
          <div className={styles.app}>
            <main className={styles.main}>{children}</main>
            <PokeballNav />
            <TweaksPanel />
          </div>
        </Providers>
      </body>
    </html>
  );
}
