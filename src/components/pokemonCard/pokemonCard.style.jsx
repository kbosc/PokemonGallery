import styled, { keyframes } from "styled-components";

const CardfadeIn = keyframes`
   to {
      transform: translateY(0);
      opacity: 1;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  padding: 2rem 2rem;
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: white;
  opacity: 0;
  transform: translateY(-10px);
  animation: ${CardfadeIn} 0.4s ease-out forwards;
`;
export const CardButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: grab;
  outline: inherit;
`;
