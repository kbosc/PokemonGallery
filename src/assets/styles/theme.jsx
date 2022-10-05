import styled from "styled-components";

export const ThemeDefault = {
  colors: {
    text: "#2c3e50",
    primary: "#2970b8",
    secondary: "rgb(242,209,71)",
    backgroundDark: "#12002b",
  },
  fontSize: {
    title: "18px",
    paragraph: "12px",
  },
};

export const ButtonStyled = styled.button`
  transition: box-shadow 0.1s ease;
  display: block;
  /* width: 200px; */
  height: 5rem;
  margin: 20px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-family: arial;
  padding: 4px 10px;
  border-radius: 50px;
  cursor: pointer;
  /* border-color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  font-weight: bold;
  padding: 10px;
  display: inline-block;
  cursor: default;
  border-width: 2px;
  border-style: outset;
  color: -internal-light-dark(black, white);
  background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133)); */
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
