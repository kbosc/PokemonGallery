import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.primary};
  min-height: 100vh;
`;

export const PokemonHeader = styled.header`
  text-align: center;
  width: 100vw;
  height: 10rem;
  font-size: 4rem;
  color: ${props => props.theme.colors.secondary};
`;
