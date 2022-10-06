import React, { useState } from "react";
import { ContainerButton } from "../../assets/styles/theme";
import { catchRandomize } from "../../utils/componentsFunction/pokemonCardFunction";
import Pokeball from "../pokeball";
import { CardContainer, CardButton } from "./pokemonCard.style";

export default function PokemonCard({ id, name, image, type }) {
  const [selected, isSelected] = useState(false);

  function addOrRemovePokemonLocalStorage(e) {
    const addPokemon = e.target.innerText;
    let oldData = [];

    localStorage.getItem("storagePokemon") == null &&
      localStorage.setItem("storagePokemon", []);

    try {
      oldData = JSON.parse(localStorage.getItem("storagePokemon"));
    } catch (err) {
      console.log("error", err);
    }
    if (addPokemon === "") {
      if (!localStorage.getItem("storagePokemon").includes(id)) {
        catchRandomize(oldData, id, isSelected);
      }
    } else {
      oldData = oldData.filter((ids) => ids !== id);
    }
    localStorage.setItem(
      "storagePokemon",
      JSON.stringify(oldData.sort((a, b) => a - b))
    );
  }

  return (
    <CardContainer>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <ContainerButton>
        <CardButton onClick={(e) => addOrRemovePokemonLocalStorage(e)}>
          <Pokeball selected={selected} />
        </CardButton>
        <button onClick={(e) => addOrRemovePokemonLocalStorage(e)}>
          Remove
        </button>
      </ContainerButton>
    </CardContainer>
  );
}
