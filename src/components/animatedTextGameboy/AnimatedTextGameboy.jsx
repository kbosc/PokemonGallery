import React from 'react'
import { A, AnimatedTextContainer, B, E, G, M, O, Y } from './animatedTextGameboy.style'

export default function AnimatedTextGameboy() {
  return (
    <AnimatedTextContainer>
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
  )
}
