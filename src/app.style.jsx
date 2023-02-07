import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  min-height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 400px) {
    gap: 2rem;
    padding: 2rem;
  }
`;
