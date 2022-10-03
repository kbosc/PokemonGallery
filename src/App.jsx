import { PokemonTitle, MainContent } from "./app.style.jsx";
import PokemonGallery from "./components/pokemonGallery";

function App() {
  return (
    <MainContent>
      <PokemonTitle>Pokemon</PokemonTitle>
      <PokemonGallery />
    </MainContent>
  );
}

export default App;
