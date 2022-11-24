import React from "react";
import GameboyComponent from "../../components/gameboy/GameboyComponent";
import { HomeContainer } from "./homePokemon.style";

export default function HomePokemon() {
  return (
    <HomeContainer>
      <GameboyComponent />
    </HomeContainer>
  );
}
