// "use client" dit à Next.js : "ce fichier tourne dans le navigateur".
// On en a besoin ici parce que QueryClientProvider utilise React Context,
// qui nécessite du JavaScript côté client.
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  // On crée le QueryClient dans un useState pour que chaque requête HTTP
  // (chaque visiteur) ait son propre cache. Si on le mettait en dehors
  // du composant (au niveau module), tous les visiteurs partageraient
  // le même cache — dangereux en SSR.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
