import React from 'react'
// import Pokeball from "../../../public/pokeball.svg"
// import Pokeballs from "../../assets/pokeball.svg"
import { StyledSpinner } from "./spinner.style" 
import { ReactComponent as Pokeball } from "../../../public/pokeball.svg"

export default function Spinner() {
  return (
    <StyledSpinner>
        <span>Loading...</span>
        <Pokeball />
    </StyledSpinner>
  )
}