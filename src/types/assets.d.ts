// Déclarations de types pour les fichiers statiques importés directement.
// Avant, c'était vite-env.d.ts qui fournissait ces types automatiquement.
// Avec Next.js, on les déclare manuellement.

declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.mp3" {
  const src: string;
  export default src;
}
