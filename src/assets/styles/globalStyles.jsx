import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
    font-weight: bold;
     /* equivalent to 10px; 1rem = 10px; 10px/16px */
  }
  body {
    box-sizing: border-box;
    font-family: 'Muli', sans-serif;
  }
`;