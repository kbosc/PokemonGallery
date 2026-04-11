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

interface Props {
  selected: boolean;
}

const Pokeball: React.FC<Props> = ({ selected }) => {
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

export default Pokeball;
