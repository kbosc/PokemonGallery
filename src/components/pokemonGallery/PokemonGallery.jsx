import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { fetchPokemons } from '../../api/pokeApi'

export default function PokemonGallery() {
  const {data, isError, error,  isLoading } = useQuery(['pokemon'], fetchPokemons)

  console.log(data)
  console.log(error)
  console.log(isLoading)
  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <ul>
        {data.map((pokemon) => {
          <li key={pokemon.id}>{pokemon.name}</li>
        })}
      </ul>
    </div>
  )
}