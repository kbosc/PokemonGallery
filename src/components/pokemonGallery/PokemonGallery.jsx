import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { fetchPokemons } from '../../api/pokeApi'
import  Spinner  from "../spinner/Spinner.jsx"

export default function PokemonGallery() {
  const {data, isError, error,  isLoading } = useQuery(['pokemon'], fetchPokemons)
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  console.log(data)
  
  return (
    <div>
      <ul>
        {data.map((pokemon) => {
          return <li key={pokemon.id}>{pokemon.name}</li>
        })}
      </ul>
    </div>
  )
}