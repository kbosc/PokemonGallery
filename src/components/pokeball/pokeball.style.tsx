import styled, { keyframes, css } from "styled-components";

// interface PokeballContainerProps {
//   isSelected: boolean;
// }

export const PokeballContainer = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 2px solid ${(props) => props.theme.colors.black};
  transform-origin: center bottom;
  animation: ${(props) =>
    props.isSelected &&
    css`
      ${Shake} 1.5s ease-in
    `};
`;

export const Base = styled.div`
  background: ${(props) => props.theme.colors.black};
  height: 80%;
  width: 100%;
  padding: 10%;
`;
export const UpperHalf = styled.div`
  position: absolute;
  background: ${(props) => props.theme.colors.red};
  height: 42%;
  width: 100%;
`;
export const LowerHalf = styled.div`
  bottom: 0;
  position: absolute;
  background: white;
  height: 42%;
  width: 100%;
`;
export const InnerCircle = styled.div`
  border-radius: 50%;
  height: 20%;
  width: 20%;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 4px solid ${(props) => props.theme.colors.black};
  transform: translate(-50%, -50%);
`;
export const IndicatorInner = styled.div`
  border-radius: 50%;
  height: 20%;
  width: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) =>
    props.isSelected ? props.theme.colors.red : "white"};
`;
export const Indicator = styled.div`
  border-radius: 50%;
  height: 80%;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f64c4c;
  background: -webkit-radial-gradient(center, #f64c4c, #ff514f00);
  background: -moz-radial-gradient(center, #f64c4c, #ff514f00);
  background: radial-gradient(ellipse at center, #f64c4c, #ff514f00);
  animation: ${(props) =>
    props.isSelected &&
    css`
      ${Blink} 1s ease-in-out
    `};
  /* opacity: ${(props) => (props.isSelected ? 1 : 0)}; */
  opacity: 0;
`;

const Blink = keyframes`
    0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

const Shake = keyframes`
  0% {
     transform: rotate(5deg);
   }
   5% {
     transform: rotate(-5deg);
   }
  10% {
    transform: rotate(5deg);
   }
  15% {
    transform: rotate(-5deg);
   }
  20% {
     transform: rotate(5deg);
  }
  25% {
     transform: rotate(0deg);
  }
   100% {
    transform: rotate(0deg);
   }
 `;

