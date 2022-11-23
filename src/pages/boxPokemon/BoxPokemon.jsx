import React from 'react'

export default function BoxPokemon() {
    var boxPokemon = JSON.parse( localStorage.getItem("storagePokemon"));
    console.log(typeof boxPokemon)
    console.log(boxPokemon)
  return (
    <div>
        {boxPokemon.map((pokemon, i) => (
            <span key={i}>{pokemon}</span>
        ))}
    </div>
  )
}
