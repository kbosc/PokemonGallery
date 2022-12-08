import styled, {css, keyframes} from "styled-components";

// const fadeIn = keyframes`
// 0% { opacity: 0; }
// 100% { opacity: 1; }
// `;
const fadeOut = keyframes`
0% { opacity: 1; }
100% { opacity: 0; }
`;
export const AnimatedTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6.5rem;
    align-items: center;
    padding-top: 7rem;
    /* position: absolute;
    top: 8rem;
    left: 4.5rem; */
    animation: ${fadeOut} 200ms 3800ms linear;
`;


const color = keyframes`
    16%{color:pink;}
    32%{color:red;}
	48%{color:orange;}
	64%{color:yellow;}
	80%{color:green;}
	100%{color:#66FFFF;}
`
const moverG = keyframes`
    0%{transform:translate(-30px, 50px) scale(1.5); opacity:0;}
    10%{transform:translate(-20px, -30px) scale(4);}
    20%{transform:translate(-10px, -20px) scale(3);}
    30%{transform:translate(-5px, -10px) scale(2);}
    40%{transform:translate(-2px, -4px) scale(2); opacity:1;}
    50%{transform:translate(0px, 0px) scale(1.5);}
    60%{transform:translate(0px, 0px) scale(1.5);}
    70%{transform:translate(0px, 0px) scale(1);}
    100%{transform:translate(0px, 0px) scale(1);}
`

const sharedLetter = css`
display: inline-block;
font-size: 2.5rem;
font-weight: bold;
font-style: italic;
`;
export const G = styled.span`
${sharedLetter}
animation:${color} 3s linear , ${moverG} 1s linear;
`;
export const A = styled.span`
${sharedLetter}
animation:${color} 3s .1s linear, ${moverG} 1s .1s linear;
`;
export const M = styled.span`
${sharedLetter}
animation:${color} 3s .2s linear, ${moverG} 1s .2s linear;
`;
export const E = styled.span`
${sharedLetter}
animation:${color} 3s .3s linear, ${moverG} 1s .3s linear;
`;
export const B = styled.span`
${sharedLetter}
animation:${color} 3s .4s linear, ${moverG} 1s .4s linear;
`;
export const O = styled.span`
${sharedLetter}
animation:${color} 3s .5s linear, ${moverG} 1s .5s linear;
`;
export const Y = styled.span`
${sharedLetter}
animation:${color} 3s .6s linear, ${moverG} 1s .6s linear;
`;
