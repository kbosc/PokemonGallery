import React from 'react'
import { Gameboy, Display, Indicator, Led, Power, ScreenArea, Arc, Label, Title, SubTitle, C, OI, L, OZ, R, Nintendo, Controls, Dpad } from './gameboy.style'

export default function GameboyComponent() {
  return (
    <div>
    <Gameboy>
        {/* id gameboy */}

        <ScreenArea>
    
            <Power>
                <Indicator>
                    <Led />
                    <Arc style={{"z-index": "2"}}></Arc>
                    <Arc style={{"z-index": "1"}}></Arc>
                    <Arc style={{"z-index": "0"}}></Arc>
                </Indicator>
                POWER
            </Power>
    
            <Display id="mainCanvas">List navigation</Display>
            {/* id="mainCanvas */}
    
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
                {/* <div class="up"><i class="fa fa-caret-up"></i></div>
                <div class="right"><i class="fa fa-caret-right"></i></div>
                <div class="down"><i class="fa fa-caret-down"></i></div>
                <div class="left"><i class="fa fa-caret-left"></i></div>
                <div class="middle"></div> */}
            </Dpad>
            {/* <div class="a-b">
                <div class="b">B</div>
                <div class="a">A</div>
            </div> */}
        </Controls>
  
        {/* <div class="start-select">
            <div class="select">SELECT</div>
            <div class="start">START</div>
        </div>
  
        <div class="speaker">
            <div class="dot placeholder"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot placeholder"></div>
            
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>

            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>

            <div class="dot placeholder"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
        </div>
            <div class="dot placeholder"></div>
   */}
    </Gameboy>
    {/* <div class="gameboy" id="GameBoy">

        <div class="screen-area">
    
            <div class="power">
                <div class="indicator">
                    <div class="led"></div>
                    <span class="arc" style="z-index:2"></span>
                    <span class="arc" style="z-index:1"></span>
                    <span class="arc" style="z-index:0"></span>
                </div>
            POWER
            </div>
    
            <div class="display" id="mainCanvas">List navigation</div>
    
            <div class="label">
                <div class="title">GAME BOY</div>
                <div class="subtitle">
                    <span class="c">C</span>
                    <span class="o1">O</span>
                    <span class="l">L</span>
                    <span class="o2">O</span>
                    <span class="r">R</span>
                </div>
            </div>
        </div>
  
        <div class="nintendo">Nintendo</div>
  
        <div class="controls">
            <div class="dpad">
                <div class="up"><i class="fa fa-caret-up"></i></div>
                <div class="right"><i class="fa fa-caret-right"></i></div>
                <div class="down"><i class="fa fa-caret-down"></i></div>
                <div class="left"><i class="fa fa-caret-left"></i></div>
                <div class="middle"></div>
            </div>
            <div class="a-b">
                <div class="b">B</div>
                <div class="a">A</div>
            </div>
        </div>
  
        <div class="start-select">
            <div class="select">SELECT</div>
            <div class="start">START</div>
        </div>
  
        <div class="speaker">
            <div class="dot placeholder"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot placeholder"></div>
            
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>

            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>

            <div class="dot placeholder"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot closed"></div>
            <div class="dot open"></div>
            <div class="dot placeholder"></div>
        </div>
  
    </div> */}
    </div>
  )
}
