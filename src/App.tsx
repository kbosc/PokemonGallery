import { AppContainer } from "./app.style";
import { Routes, Route } from "react-router-dom";
import Header from "./components/organisms/header/Header";

// Pages Components
import BoxPokemon from "./pages/boxPokemon/BoxPokemon";
import PokemonGallery from "./pages/pokemonGallery/PokemonGallery";
import SafariPokemon from "./pages/safariPokemon/SafariPokemon"
import HomePokemon from "./pages/homePokemon/HomePokemon"

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/boxPokemon" element={<BoxPokemon />} />
        <Route path="/safariPokemon" element={<SafariPokemon />} />
        <Route path="/pokemonGallery" element={<PokemonGallery />} />
        <Route path="/" element={<HomePokemon />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
