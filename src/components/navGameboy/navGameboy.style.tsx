// @ts-ignore
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const NavTextUl = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    list-style: none;
    font-family: sans-serif;
    font-size: 14px;
    color: #555;
    padding: 10px;
    cursor: pointer;
    animation: ${fadeIn} 0.5s ease-in-out;
    text-decoration: none;

    &:hover {
      color: #000;
      background-color: #ccc;
    }

    &.selected {
      color: #000;
      background-color: #ccc;

      &:after {
        content: '>';
        margin-left: 5px;
      }
    }
    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.gameboyTxt};
    }
  }
`

