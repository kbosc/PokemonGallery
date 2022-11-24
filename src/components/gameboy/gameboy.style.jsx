import styled, { css } from "styled-components";

export const Gameboy = styled.div`
  margin: 0 auto;
  position: relative;
  width: 350px;
  height: 570px;
  border-radius: 20px;
  padding: 20px;
  background-color: #4f50db;
  box-shadow: 0px -5px 0px #0d0e51, 0px 5px 0px #3d38b5;
  font-family: sans-serif;
  cursor: default;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: calc(100% - 34px);
    left: 5px;
    width: calc(100% - 10px);
    height: 50px;
    border-radius: 50%;
    background-color: #4f50db;
    box-shadow: 0px 5px 0px #3d38b5;
    border-bottom: 2px solid #9998eb;
  }
`;

export const ScreenArea = styled.div`
  position: relative;
  padding: 35px 50px 5px 50px;
  border-radius: 15px 15px 15px 15px;
  background-color: #23252d;
  color: #67879a;
  box-shadow: 0px 2px 0px black, 0px -2px 0px black, -2px 0px 0px black,
    2px 0px 0px black;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: calc(100% - 20px);
    left: 5px;
    width: calc(100% - 10px);
    height: 30px;
    border-radius: 50%;
    background-color: #23252d;
    box-shadow: 0px 2px 0px black;
  }
`;

export const Power = styled.div`
  position: absolute;
  display: block;
  width: 50px;
  left: 0px;
  top: 80px;
  font-size: 10px;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const Indicator = styled.div`
  line-height: 14px;
`;

export const Led = styled.div`
  position: relative;
  display: inline-block;
  background-color: #ca1a21;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #ff552e;
  z-index: 5;
`;

export const Arc = styled.div`
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: -2px;
  &::before {
    position: absolute;
    left: 3px;
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #67879a;
  }
  &::after {
    position: absolute;
    left: 0px;
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #23252d;
  }
`;

export const Display = styled.div`
  background-color: #929d97;
  height: 190px;
  width: 210px;
  border-radius: 3px;
  margin-bottom: 15px;
`;

export const Label = styled.div`
  position: relative;
  text-align: center;
  font-size: 20px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.div`
  display: inline;
  font-weight: bold;
  font-style: italic;
`;

export const SubTitle = styled.div`
  display: inline;
  font-family: "Comic Sans MS";
  font-weight: bold;
  font-size: 22px;
  letter-spacing: -1px;
  #{C} #{O1} #{L} #{O2} #{R} {
    display: flex;
  }
`;

export const C = styled.div`
  color: #aa2058;
`;
export const OI = styled.div`
  color: #605bd9;
  font-size: 20px;
`;
export const L = styled.div`
  color: #78b930;
  transform: rotateZ(-10deg);
`;
export const OZ = styled.div`
  color: #b6b524;
  font-size: 20px;
`;
export const R = styled.div`
  color: #317aaf;
`;

export const Nintendo = styled.div`
  padding: 0px 5px;
  width: 85px;
  color: #3436bf;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  border: 2px solid #3436bf;
  border-radius: 11px;
  margin-top: 30px;
  text-shadow: 0px -2px 1px #6b67ed;
  box-shadow: 0px -2px 1px #6b67ed;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Dpad = styled.div`
  position: relative;
  display: inline-block;
  width: 90px;
  height: 90px;
  z-index: 5;
  > div {
    width: 33%;
    height: 33%;
    position: absolute;
    background-color: #565e6a;
    cursor: pointer;
    > * {
      /* tous les react icons dessous */
      position: relative;
      display: block;
      margin: 0 auto;
      text-align: center;
      height: 100%;
      font-size: 28px;
      color: #333a4a;
      text-shadow: 0px -0.5px 0px #aaa;
    }
  }
`;

export const Up = styled.div`
  top: calc(0% + 4px);
  left: 33%;
  border-top: 4px solid black;
  border-left: 4px solid black;
  border-right: 4px solid black;
  border-radius: 5px 5px 0px 0px;

  &:active {
    background: linear-gradient(to top, #565e6a 0%, #333 100%);
  }

  > * {
    top: -5px;
    left: -3px;
  }
`;

export const Right = styled.div`
  top: 33%;
  left: calc(66% - 4px);
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  border-right: 4px solid black;
  border-radius: 0px 5px 5px 0px;
  box-shadow: 0px -2px 0px #888 inset;

  &:active {
    background: linear-gradient(to right, #565e6a 0%, #333 100%);
  }

  > * {
    top: -1px;
  }
`;

export const Down = styled.div`
  top: calc(66% - 4px);
  left: 33%;
  border-left: 4px solid black;
  border-bottom: 4px solid black;
  border-right: 4px solid black;
  border-radius: 0px 0px 5px 5px;
  box-shadow: 0px -2px 0px #888 inset;

  &:active {
    background: linear-gradient(to bottom, #565e6a 0%, #333 100%);
  }
  > * {
    left: -3px;
  }
`;
export const Left = styled.div`
  top: 33%;
  left: calc(0% + 4px);
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  border-left: 4px solid black;
  border-radius: 5px 0px 0px 5px;
  box-shadow: 0px -2px 0px #888 inset;

  > * {
    top: -1px;
  }

  &:active {
    background: linear-gradient(to left, #565e6a 0%, #333 100%);
  }
`;
export const Middle = styled.div`
  top: 33%;
  left: 33%;
  z-index: -5;

  &::after {
    content: "";
    position: absolute;
    top: 20%;
    left: 20%;
    display: inline-block;
    border: 1px solid #6e737a;
    background: linear-gradient(
      to bottom,
      #6d7075 0%,
      #6d7075 30%,
      #23272f 70%,
      #23272f 100%
    );
    border-radius: 50%;
    height: 60%;
    width: 60%;
  }
`;

export const AB = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 90px;
`;

const sharedButtonAB = css`
  position: absolute;
  display: inline-block;
  font-size: 22px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background-color: #2c313e;
  border-bottom: 2px solid #888;
  box-shadow: -1px 1px 5px black, 0px 0px 5px black inset;
  text-shadow: 0px -1px 1px #888;
  color: #2c313e;
  text-align: center;
  -webkit-user-select: none;
  cursor: pointer;
  transition: box-shadow 0.1s ease-out, border 0.1s ease-out,
    line-height 0.2s ease-out;

  &:active {
    box-shadow: -1px 1px 1px black, 0px 0px 5px black inset;
    border-width: 0px;
    line-height: 45px;
  }
`;

export const A = styled.div`
  ${sharedButtonAB}
  top:15px;
  right: 10px;
`;
export const B = styled.div`
  ${sharedButtonAB}
  top:35px;
  left: 0%;
`;

export const StartSelect = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
`;

const sharedStartSelect = css`
  display: inline-block;
  color: #6b67ed;
  text-shadow: 0px -1px 0px #3436bf;
  letter-spacing: -1px;
  width: 60px;
  font-size: 16px;
  text-align: center;
  margin-top: 60px;

  &::before {
    content: "";
    display: block;
    margin: 0 auto;
    width: 30px;
    height: 10px;
    margin-bottom: 5px;
    border-radius: 40%;
    background: linear-gradient(
      to bottom,
      #0b0a1c 0%,
      #0b0a1c 30%,
      #62636c 70%,
      #62636c 100%
    );
    background-repeat: no-repeat;
    border: 2px solid #0b0a1c;
    box-shadow: 0px -2px 1px #8482e9;
    cursor: pointer;
  }
  &:active::before {
    background: linear-gradient(
      to bottom,
      #0b0a1c 0%,
      #0b0a1c 50%,
      #62636c 100%
    );
  }
`;

export const Start = styled.div`
  ${sharedStartSelect}
`;
export const Select = styled.div`
  ${sharedStartSelect}
`;

export const Speaker = styled.div`
  position: absolute;
  display: flex;
  width: 75px;
  height: 75px;
  right: 15px;
  bottom: 5px;
  justify-content: space-between;
  flex-wrap: wrap;
  z-index: 100;
  transform: skewY(-10deg);
  .placeholder {
    background-color: transparent;
  }
  .openDot {
    background-color: #0a0717;
    box-shadow: 0px 0px 2px #7c7be0 inset;
  }
  .closed {
    background: linear-gradient(to bottom, #6664e5 0%, #2d3590 100%);
    box-shadow: 0px 0px 2px #7c7be0 inset;
  }
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  margin: 1px;
  border-radius: 50%;
  /* background-color: ${(props) =>
    props.placeholder ? "transparent" : `#0a0717`};
  box-shadow: ${(props) =>
    props.placeholder ? "" : `0px 0px 2px #7c7be0 inset`};
  background: ${(props) =>
    props.closed
      ? "linear-gradient(to bottom, #6664e5 0%, #2d3590 100%);"
      : ``}; */
`;

//   * { box-sizing:border-box; }
//   html, body { width:100%; height:100%; margin:0; }
//   body { padding:30px; display:flex; justify-content:center; align-items:center; background: linear-gradient(to top, #aaa 0%, white 100%);}
//   .gameboy {
//     margin:0 auto;
//   }
