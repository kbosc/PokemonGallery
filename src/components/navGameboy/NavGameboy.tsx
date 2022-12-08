import { NavLink, useNavigate } from 'react-router-dom';
import { NavTextUl } from "./navGameboy.style"
import { useEffect, useReducer } from 'react'
import useKeyPress from '../../hooks/useKeyPress';

const initialState = { selectedIndex: 0 };
const list = ['gallery', 'safari', 'box'];
const pages = ['/pokemonGallery', '/safariPokemon', '/boxPokemon']


type Action =
  | { type: 'arrowUp' }
  | { type: 'arrowDown' }
  | { type: 'select'; payload: number };

const reducer = (state: { selectedIndex: number }, action: Action) => {
  switch (action.type) {
    case 'arrowUp':
      return {
        selectedIndex:
          state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1,
      };
    case 'arrowDown':
      return {
        selectedIndex:
          state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0,
      };  
    case 'select':
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};

export default function NavGameBoy() {
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const enterPressed = useKeyPress('Enter');
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigateTo = useNavigate();


  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' });
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' });
      
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (enterPressed) {
      navigateTo(`${pages[state.selectedIndex]}`);
    }
  }, [enterPressed]);

  return (
    <NavTextUl>
      {list.map((item, i) => (
        <li
          key={item}
          onClick={() => {
            dispatch({ type: 'select', payload: i });
          }}
          style={{
            cursor: 'pointer',
            color: i === state.selectedIndex ? "#000" : '#67879a',
            backgroundColor: i === state.selectedIndex ? "#ccc" : "",
          }}
        >
          <NavLink to={pages[i]}>
            {item}
          </NavLink>
        </li>
      ))}
    </NavTextUl>
  )
}

