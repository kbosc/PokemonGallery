import styled from "styled-components";


// interface ThemeDefaultProps {
//   theme: {
//     colors?: {
//       gameboyTxt?: string,
//       text?: string,
//       primary?: string,
//       pLight?: string,
//       pDark?: string,
//       secondary?: string,
//       sLight?: string,
//       mDark?: string,
//       red?: string,
//       black?: string,
//     },
//     fontSize?: {
//       title?: string,
//       paragraph?: string,
//     },
//   }
// }
export const ThemeDefault = {
  colors: {
    gameboyTxt: "#67879a",
    text: "#2c3e50",
    primary: "#2970b8",
    pLight: "#659deb",
    pDark: "#004588",
    secondary: "#f2d147",
    sLight: "#ffff79",
    mDark: "#bca004",
    red: "#f15324",
    black: "#333",
  },
  fontSize: {
    title: "18px",
    paragraph: "12px",
  },
};

export const ButtonStyled = styled.button`
  transition: box-shadow 0.1s ease;
  display: block;
  /* height: 5rem; */
  margin: 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-family: arial;
  padding: 5px 10px;
  border-radius: 50px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  background: ${(props) => props.theme.colors.secondary};
  border: solid 4px ${(props) => props.theme.colors.secondary};
  box-shadow: 0px 0px 0px 3px rgb(255, 255, 255),
    0px 0px 0px 6px ${(props) => props.theme.colors.secondary};
  &:hover {
    color: ${(props) => props.theme.colors.secondary};
    background: rgb(255, 255, 255);
    border: solid 4px rgb(255, 255, 255);
    box-shadow: 0px 0px 0px 0px rgb(255, 255, 255),
      0px 0px 0px 6px ${(props) => props.theme.colors.secondary};
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;
