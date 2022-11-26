import styled from "styled-components";

    export const Slider = styled.span`
        box-sizing: border-box;
        border: 2px solid #000;
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #e8e8e8;
        transition: .15s;
        border-radius: 1em;
        &::before {
          box-sizing: border-box;
          position: absolute;
          content: "";
          height: 1em;
          width: 1em;
          border: 2px solid #000;
          border-radius: 100%;
          left: -2px;
          bottom: -2px;
          background-color: #e8e8e8;
          transform: translateY(-0.2em);
          box-shadow: 0 0.2em 0 #000;
          transition: .15s;
        }
    `;
export const CheckBoxWrapper = styled.div`
  input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }
  position: absolute;
  top: 0;
  left: -5rem;
  box-sizing: border-box;
  &::after, &::before {
    box-sizing: border-box;
  }
  input:checked + ${Slider} {
    background-color: #888;
  }
  input:focus-visible + ${Slider} {
    box-shadow: 0 0 0 2px #888;
  }
  input:hover + ${Slider}:before {
    transform: translateY(-0.3em);
    box-shadow: 0 0.3em 0 #000;
  }
  input:checked + ${Slider}:before {
    transform: translateX(calc(2em - 1em)) translateY(-0.2em);
  }
  input:hover:checked + ${Slider}:before {
    transform: translateX(calc(2em - 1em)) translateY(-0.3em);
    box-shadow: 0 0.3em 0 #000;
  }
`;
export const Switch = styled.label`
font-size: 17px;
    position: relative;
    display: inline-block;
    width: 2em;
    height: 1em;
`;
