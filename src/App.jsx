import { AppContainer } from "./app.style.jsx";
import PokemonGallery from "./pages/pokemonGallery/PokemonGallery";
import Header from "./components/header/header.jsx";
import { Routes, Route } from "react-router-dom";
import BoxPokemon from "./pages/BoxPokemon.jsx";




function App() {
  localStorage.getItem("storagePokemon") == null &&
  localStorage.setItem("storagePokemon", []);

  return (
    <AppContainer>
        <Header />
        <Routes>
          <Route path="/boxPokemon" element={<BoxPokemon />} />
          <Route path="/" element={<PokemonGallery />} />
        </Routes>
    </AppContainer>
  );
}

export default App;
