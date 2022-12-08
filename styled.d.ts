// styled.d.ts 
import 'styled-components' ;
interface IPalette { 
  main: string 
  contrastText: string 
}
declare module 'styled-components' { 
  export interface ThemeDefaultProps {
      colors?: {
        gameboyTxt?: string,
        text?: string,
        primary?: string,
        pLight?: string,
        pDark?: string,
        secondary?: string,
        sLight?: string,
        mDark?: string,
        red?: string,
        black?: string,
      },
      fontSize?: {
        title?: string,
        paragraph?: string,
      },
    }
}

