import React from 'react'
import { useState } from 'react'
import NavGameBoy from '../navGameboy/NavGameboy'
import { A, AnimatedTextContainer, B, E, G, M, O, Y } from './animatedTextGameboy.style'


export default function AnimatedTextGameboy() {
  const [display, setDisplay] = useState(true)

  setTimeout(() => {
  setDisplay(false)
  }, 4000)

  
  return (
    <div>
      {display ? 
        <AnimatedTextContainer $propsDisplay={display}>
          <div>
              <G>G</G>
              <A>A</A>
              <M>M</M>
              <E>E</E>
              <span> </span>
              <B>B</B>
              <O>O</O>
              <Y>Y</Y>
          </div>
          <span>Nintendo </span>
        </AnimatedTextContainer>
      :
        <NavGameBoy />
      }
    </div>
  )
}
