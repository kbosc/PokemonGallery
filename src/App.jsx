import { PokemonHeader, AppContainer } from "./app.style.jsx";
import PokemonGallery from "./components/pokemonGallery";

function App() {
  localStorage.getItem("storagePokemon") == null &&
    localStorage.setItem("storagePokemon", []);
  return (
    <AppContainer>
      <PokemonHeader>Pokemon</PokemonHeader>
      <PokemonGallery />
    </AppContainer>
  );
}

export default App;
