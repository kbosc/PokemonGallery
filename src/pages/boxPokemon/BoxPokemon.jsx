import React from 'react'

export default function BoxPokemon() {
    const boxPokemon = JSON.parse( localStorage.getItem("storagePokemon"));

  return (
    <div>
        {boxPokemon.map((pokemon, i) => (
            <span key={i}>{pokemon}</span>
        ))}
    </div>
  )
}
