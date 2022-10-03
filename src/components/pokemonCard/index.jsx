import React from "react";
import { CardContainer } from "./pokemonCard.style";

export default function PokemonCard({ id, name, image, type }) {
  function addOrRemovePokemonLocalStorage(e) {
    const addPokemon = e.target.innerText;
    let old_data = [];

    localStorage.getItem("storagePokemon") == null &&
      localStorage.setItem("storagePokemon", []);

    try {
      old_data = JSON.parse(localStorage.getItem("storagePokemon"));
    } catch (err) {
      console.log("error", err);
    }
    addPokemon === "Add"
      ? !localStorage.getItem("storagePokemon").includes(id) &&
        old_data.push(id)
      : (old_data = old_data.filter((ids) => ids !== id));

    localStorage.setItem("storagePokemon", JSON.stringify(old_data));
    // console.log(localStorage.getItem("storagePokemon"));
  }

  return (
    <CardContainer>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <button onClick={(e) => addOrRemovePokemonLocalStorage(e)}>Add</button>
      <button onClick={(e) => addOrRemovePokemonLocalStorage(e)}>Remove</button>
    </CardContainer>
  );
}
