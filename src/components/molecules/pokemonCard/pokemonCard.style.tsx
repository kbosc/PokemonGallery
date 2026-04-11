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
  height: 25rem;
  padding: 2rem 2rem;
  border-radius: 5px;
  font-size: 1.5rem;
  background-color: white;
  opacity: 0;
  transform: translateY(-10px);
  animation: ${CardfadeIn} 0.4s ease-out forwards;
` as "div";

export const CardButton = styled.button`
  padding: 1px 0px;
  margin: 1rem;
  background: none;
  color: inherit;
  border: none;
  /* padding: 0; */
  font: inherit;
  cursor: grab;
  outline: inherit;
` as "button";
