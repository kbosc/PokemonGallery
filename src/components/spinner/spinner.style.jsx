import styled from "styled-components";

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: 40px;
  width: 50px;
  height: 50px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;