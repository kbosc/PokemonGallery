import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/organisms/header/Header";

// Pages Components
import BoxPokemon from "./pages/boxPokemon/BoxPokemon";
import PokemonGallery from "./pages/pokemonGallery/PokemonGallery";
import SafariPokemon from "./pages/safariPokemon/SafariPokemon";
import HomePokemon from "./pages/homePokemon/HomePokemon";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/boxPokemon" element={<BoxPokemon />} />
        <Route path="/safariPokemon" element={<SafariPokemon />} />
        <Route path="/pokemonGallery" element={<PokemonGallery />} />
        <Route path="/" element={<HomePokemon />} />
      </Routes>
    </div>
  );
}

export default App;
