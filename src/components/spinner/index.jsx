import React from "react";
import { StyledSpinner } from "./spinner.style";
import { ReactComponent as Pokeball } from "../../assets/images/pokeball.svg";

export default function Spinner() {
  return (
    <StyledSpinner>
      <span>Loading...</span>
      <Pokeball />
    </StyledSpinner>
  );
}
