import React from "react";
import { StyledSpinner } from "./spinner.style";
import Pokeball from "../../assets/images/pokeball.svg?react";

export default function Spinner() {
  return (
    <StyledSpinner>
      <Pokeball />
    </StyledSpinner>
  );
}
