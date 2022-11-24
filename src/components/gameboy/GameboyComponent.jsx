import React from "react";
import {
  Gameboy,
  Display,
  Indicator,
  Led,
  Power,
  ScreenArea,
  Arc,
  Label,
  Title,
  SubTitle,
  C,
  OI,
  L,
  OZ,
  R,
  Nintendo,
  Controls,
  Dpad,
  Up,
  Right,
  Down,
  Left,
  Middle,
  AB,
  B,
  A,
  StartSelect,
  Select,
  Start,
  Speaker,
  Dot,
} from "./gameboy.style";

import {
  AiFillCaretUp,
  AiFillCaretRight,
  AiFillCaretDown,
  AiFillCaretLeft,
} from "react-icons/ai";

export default function GameboyComponent() {
  return (
    <Gameboy>
      <ScreenArea>
        <Power>
          <Indicator>
            <Led />
            <Arc style={{ zIndex: "2" }}></Arc>
            <Arc style={{ zIndex: "1" }}></Arc>
            <Arc style={{ zIndex: "0" }}></Arc>
          </Indicator>
          POWER
        </Power>

        <Display>List navigation</Display>

        <Label>
          <Title>GAME BOY</Title>
          <SubTitle>
            <C>C</C>
            <OI>O</OI>
            <L>L</L>
            <OZ>O</OZ>
            <R>R</R>
          </SubTitle>
        </Label>
      </ScreenArea>

      <Nintendo>Nintendo</Nintendo>

      <Controls>
        <Dpad>
          <Up>
            <AiFillCaretUp />
          </Up>
          <Right>
            <AiFillCaretRight />
          </Right>
          <Down>
            <AiFillCaretDown />
          </Down>
          <Left>
            <AiFillCaretLeft />
          </Left>
          <Middle></Middle>
        </Dpad>
        <AB>
          <B>B</B>
          <A>A</A>
        </AB>
      </Controls>

      <StartSelect>
        <Select>SELECT</Select>
        <Start>START</Start>
      </StartSelect>

      <Speaker>
        {/* <Dot props={"placeholder"} className={"placeholder"}></Dot>
        <Dot props={"openDot"} className={"openDot"}></Dot>
        <Dot props={"closed"} className={"closed"}></Dot>
        <Dot props={"openDot"} className={"openDot"}></Dot>
        <Dot props={"closed"} className={"closed"}></Dot>
        <Dot props={"openDot"} className={"openDot"}></Dot>
        <Dot props={"closed"} className={"closed"}></Dot>
        <Dot props={"placeholder"} className={"placeholder"}></Dot> */}

        <Dot className={"placeholder"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"placeholder"}></Dot>

        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>

        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>

        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>

        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>

        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>

        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>

        <Dot className={"placeholder"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"closed"}></Dot>
        <Dot className={"openDot"}></Dot>
        <Dot className={"placeholder"}></Dot>
      </Speaker>
    </Gameboy>
  );
}
