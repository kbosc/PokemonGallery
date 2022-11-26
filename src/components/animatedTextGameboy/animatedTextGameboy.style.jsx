import styled, {css, keyframes} from "styled-components";

export const AnimatedTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6.5rem;
    align-items: center;
    padding-top: 7rem;
    /* position: absolute;
    top: 8rem;
    left: 4.5rem; */
`;

const color = keyframes`
    16%{color:pink;}
    32%{color:red;}
	48%{color:orange;}
	64%{color:yellow;}
	80%{color:green;}
	100%{color:#66FFFF;}
    /* 10%{color:pink;}
    20%{color:red;}
	30%{color:orange;}
	40%{color:yellow;}
	50%{color:green;}
	60%{color:#66FFFF;}
	70%{color:#000066;}
	100%{color:#000066;} */
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
    /* 0%{transform:translate(-50px, 100px) scale(3,3); opacity:0;}
    10%{transform:translate(-40px, -50px) scale(9,9);}
    20%{transform:translate(-30px, -40px) scale(8,8);}
    30%{transform:translate(-20px, -30px) scale(7,7);}
    40%{transform:translate(-10px, -20px) scale(6,6); opacity:1;}
    50%{transform:translate(0px, -10px) scale(5,5);}
    60%{transform:translate(0px, 0px) scale(4,4);}
    70%{transform:translate(0px, 0px) scale(1,1);}
    100%{transform:translate(0px, 0px) scale(1,1);} */
`

const sharedLetter = css`
display: inline-block;
font-size: 2.5rem;
font-weight: bold;
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


// .f{animation:color 5s linear , mover_g 1s linear}
// .r{animation:color 5s .1s linear, mover_g 1s .1s linear}
// .o{animation:color 5s .2s linear,mover_g 1s .2s linear}
// .n{animation:color 5s .3s linear,mover_g 1s .3s linear}
// .t{animation:color 5s .4s linear,mover_g 1s .4s linear}
// .h{animation:color 5s .5s linear,mover_g 1s .5s linear}
// .e{animation:color 5s .6s linear,mover_g 1s .6s linear}
// .nn{animation:color 5s .7s linear,mover_g 1s .7s linear}
// .d{animation:color 5s .8s linear,mover_g 1s .8s linear}

// @keyframes color{
	// 10%{color:pink;}
	// 20%{color:red;}
	// 30%{color:orange;}
	// 40%{color:yellow;}
	// 50%{color:green;}
	// 60%{color:#66FFFF;}
	// 70%{color:#000066;}
	// 100%{color:#000066;}
// }

// /*ANIMAÇOES DAS LETRAS SEPARADAS*/
// @keyframes mover_g{
    // 0%{transform:translate(-50px, 100px) scale(3,3);opacity:0;}
    // 10%{transform:translate(-40px, -50px) scale(9,9);}
    // 20%{transform:translate(-30px, -40px) scale(8,8);}
    // 30%{transform:translate(-20px, -30px) scale(7,7);}
    // 40%{transform:translate(-10px, -20px) scale(6,6);opacity:1;}
    // 50%{transform:translate(0px, -10px) scale(5,5);}
    // 60%{transform:translate(0px, 0px) scale(4,4);}
    // 70%{transform:translate(0px, 0px) scale(1,1);}
    // 100%{transform:translate(0px, 0px) scale(1,1);}
//     }