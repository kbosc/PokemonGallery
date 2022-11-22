import React from 'react'
import { PokemonTitle } from './header.style'
import { Link } from "react-router-dom"

export default function header() {
  return (
    <div>
        <PokemonTitle>Pokemon</PokemonTitle>
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/boxPokemon">Box pokemon</Link>
        </nav>
    </div>
  )
}
