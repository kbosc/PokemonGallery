
import React, { useState, useEffect } from "react";

import { catchRandomize } from "../../utils/catchRandomize";
import Pokeball from "../pokeball/Pokeball";

import useSound from "use-sound";
// @ts-ignore
import pokemonCaught from "../../assets/sounds/catchPokemon.mp3";




import { ButtonStyled, ContainerButton } from "../../assets/styles/theme";
import { CardContainer, CardButton } from "./pokemonCard.style";

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function PokemonCard({ id, name, image, type }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [caught, setCaught] = useState(false);
  const [play] = useSound(pokemonCaught, { volume: 0.03 });

  useEffect(() => {
    const localStringify = localStorage.getItem("storagePokemon");
    if (caught) {
      play();
    }
    if (!localStringify) return;
    return setCaught(JSON.parse(localStringify).includes(id));
  }, [localStorage, caught]);

  function addOrRemovePokemonLocalStorage(e: React.MouseEvent<HTMLButtonElement>) {
    const addPokemon = e.currentTarget.innerText;

    let oldData: number[] = [];

    try {
      const raw = localStorage.getItem("storagePokemon");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) oldData = parsed as number[];
      }
    } catch (err) {
      console.log("error", err);
    }
    console.log(oldData);
    if (addPokemon === "") {
      // if (!localStorage.getItem("storagePokemon").includes(id)) {
      catchRandomize(oldData, id, setSelected, setCaught);
      // }
    } else {
      oldData = oldData.filter((ids: number) => ids !== id);
      setCaught((prev: boolean) => !prev);
    }
    localStorage.setItem(
      "storagePokemon",
      JSON.stringify(oldData.sort((a: number, b: number) => a - b))
    );
  }

  return (
    <CardContainer>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <ContainerButton>
        {!caught ? (
          <CardButton onClick={addOrRemovePokemonLocalStorage}>
            <Pokeball selected={selected} />
          </CardButton>
        ) : (
          <ButtonStyled onClick={addOrRemovePokemonLocalStorage}>
           Relacher
          </ButtonStyled>
        )}
      </ContainerButton>
    </CardContainer>
  );
}
