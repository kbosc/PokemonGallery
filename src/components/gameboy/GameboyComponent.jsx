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
import { useState } from "react";
import useSound from "use-sound";
import gameBoySong from "../../assets/sounds/gameBoySong.mp3";
import AnimatedTextGameboy from "../animatedTextGameboy/AnimatedTextGameboy";
import { useEffect } from "react";

export default function GameboyComponent() {
  const [on, setOn] = useState(false);
  const [carret, setCarret] = useState(false);
  const [play] = useSound(gameBoySong, { volume: 0.03 });

  const gameBoyOn = () => {
    !on && play();
    setOn((prev) => !prev);
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "s" || event.key === "S") {
        event.preventDefault();
        gameBoyOn();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [play]);

  const mooveNavCaret = () => {
    console.log(carret);
    setCarret((prev) => !prev);
    console.log(carret);
    setCarret((prev) => !prev);
    console.log(carret);
  };

  return (
    <Gameboy>
      <ScreenArea>
        <Power>
          <Indicator>
            <Led $on={on} />
            <Arc style={{ zIndex: "2" }}></Arc>
            <Arc style={{ zIndex: "1" }}></Arc>
            <Arc style={{ zIndex: "0" }}></Arc>
          </Indicator>
          POWER
        </Power>

        <Display $on={on}>{on && <AnimatedTextGameboy />}</Display>

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
            <AiFillCaretUp onClick={() => mooveNavCaret()} />
          </Up>
          <Right>
            <AiFillCaretRight />
          </Right>
          <Down>
            <AiFillCaretDown onClick={() => mooveNavCaret()} />
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
        <Start onClick={() => gameBoyOn()}>START</Start>
      </StartSelect>

      <Speaker>
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
