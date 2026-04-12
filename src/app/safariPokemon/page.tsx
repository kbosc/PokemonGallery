// Pas de "use client" ici → c'est un Server Component.
// Next.js le rend côté serveur : zéro JS envoyé au navigateur,
// chargement instantané. On peut se le permettre parce que ce
// composant n'utilise aucun hook ni interaction navigateur.

export default function SafariPokemonPage() {
  return (
    <div>
      <h2>Safari Zone</h2>
      <p>Coming soon!</p>
    </div>
  );
}
