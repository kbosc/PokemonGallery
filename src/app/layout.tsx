// layout.tsx est un Server Component par défaut.
// Il génère le HTML de base côté serveur — c'est plus rapide que
// d'attendre que le JavaScript charge dans le navigateur.

import "../assets/styles/variables.css";
import "../assets/styles/globals.css";
import styles from "./layout.module.css";
import Providers from "./providers";
import Header from "../components/organisms/header/Header";

export const metadata = {
  title: "Pokedex",
  icons: { icon: "/pokeball.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Fredericka+the+Great&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <div className={styles.app}>
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
