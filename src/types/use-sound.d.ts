// use-sound n'exporte pas ses types correctement avec moduleResolution: "bundler".
// On redéclare le module avec la signature minimale qu'on utilise.

declare module "use-sound" {
  interface HookOptions {
    volume?: number;
  }
  type PlayFunction = () => void;

  export default function useSound(
    src: string,
    options?: HookOptions
  ): [PlayFunction];
}
