import React from "react";
import {
  Base,
  Indicator,
  IndicatorInner,
  InnerCircle,
  LowerHalf,
  PokeballContainer,
  UpperHalf,
} from "./pokeball.style";

export default function Pokeball({ selected }) {
  return (
    <div>
      <PokeballContainer isSelected={selected}>
        <UpperHalf />
        <LowerHalf />
        <Base />
        <InnerCircle />
        <Indicator isSelected={selected} />
        <IndicatorInner isSelected={selected} />
      </PokeballContainer>
    </div>
  );
}
