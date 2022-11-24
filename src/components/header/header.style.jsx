import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
`;


export const PokemonTitle = styled.h1`
  text-align: center;
  width: 100vw;
  height: 10rem;
  font-size: clamp(40px, 8vw, 80px);
  color: ${(props) => props.theme.colors.secondary};
`;
