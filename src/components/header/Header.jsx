import React from 'react'
import { PokemonTitle, HeaderContainer } from './header.style'
import { Link } from "react-router-dom"

export default function header() {
  return (
    <HeaderContainer>
        <PokemonTitle>Pokemon</PokemonTitle>
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/pokemonGallery">Gallery</Link>
            <Link to="/safariPokemon">Safari</Link>
            <Link to="/boxPokemon">Box Pokemon</Link>
        </nav>
    </HeaderContainer>
  )
}
