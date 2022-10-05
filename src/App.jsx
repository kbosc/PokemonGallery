import { PokemonHeader, AppContainer } from "./app.style.jsx";
import PokemonGallery from "./components/pokemonGallery";

function App() {
  return (
    <AppContainer>
      <PokemonHeader>Pokemon</PokemonHeader>
      <PokemonGallery />
    </AppContainer>
  );
}

export default App;
