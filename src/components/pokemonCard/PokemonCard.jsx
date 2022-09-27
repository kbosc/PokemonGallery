import React from 'react'
import { CardContainer } from './pokemonCard.style'

export default function PokemonCard({id, name, image, type}) {
  return (
    <CardContainer>
     <span>#{id}</span>
     <span>{name}</span>
     <img src={image} alt={name} />
      <span>Type: {type}</span>
    </CardContainer>
  )
}
