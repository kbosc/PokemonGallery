import React from 'react'
import { CheckBoxWrapper, Slider, Switch } from './checkBoxRetro.style'

export default function CheckBoxRetro() {
  return (
    <CheckBoxWrapper>
        <Switch>
        <input type="checkbox" />
        <Slider />
        </Switch>
    </CheckBoxWrapper>
  )
}
