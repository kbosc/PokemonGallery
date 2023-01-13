import React from "react";
import { HeaderContainer, HeaderTitle, HeaderNav } from "./header.style";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <HeaderContainer>
      <HeaderTitle>Pokemon</HeaderTitle>
      <HeaderNav>
        <Link to="/">Accueil</Link>
        <Link to="/pokemonGallery">Gallery</Link>
        <Link to="/safariPokemon">Safari</Link>
        <Link to="/boxPokemon">Box Pokemon</Link>
      </HeaderNav>
    </HeaderContainer>
  );
}
