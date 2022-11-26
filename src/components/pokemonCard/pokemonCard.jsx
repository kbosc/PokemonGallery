import React, { useState, useEffect } from "react";
import { ButtonStyled, ContainerButton } from "../../assets/styles/theme";
import { catchRandomize } from "./utils/catchRandomize";
import Pokeball from "../pokeball/Pokeball";
import { CardContainer, CardButton } from "./pokemonCard.style";

import useSound from 'use-sound';
import pokemonCatched from '../../assets/sounds/catchPokemon.mp3';

export default function PokemonCard({ id, name, image, type }) {
  const [selected, setSelected] = useState(false);
  const [catched, setCatched] = useState(false);
  const [play] = useSound(pokemonCatched, { volume: 0.03 });
  

  useEffect(() => {
    const localStringify = localStorage.getItem("storagePokemon");
    if(catched) {
      play()
    }
    if (!localStringify) return;
    return setCatched(JSON.parse(localStringify).includes(id));
  }, [localStorage, catched]);

  function addOrRemovePokemonLocalStorage(e) {
    const addPokemon = e.target.innerText;
    
    let oldData = [];

    try {
      oldData = JSON.parse(localStorage.getItem("storagePokemon"));
    } catch (err) {
      console.log("error", err);
    }

    if (addPokemon === "") {
      // if (!localStorage.getItem("storagePokemon").includes(id)) {
        catchRandomize(oldData, id, setSelected, setCatched);
      // }
    } else {
      oldData = oldData.filter((ids) => ids !== id);
      setCatched((prev) => !prev);
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
        {!catched ? (
          <CardButton onClick={(e) => addOrRemovePokemonLocalStorage(e)}>
            <Pokeball selected={selected} />
          </CardButton>
        ) : (
          <ButtonStyled onClick={(e) => addOrRemovePokemonLocalStorage(e)}>
            Relacher
          </ButtonStyled>
        )}
      </ContainerButton>
    </CardContainer>
  );
}
