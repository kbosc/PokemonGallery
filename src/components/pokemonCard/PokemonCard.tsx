import Pokeball from "../pokeball/Pokeball";
import { ButtonStyled, ContainerButton } from "../../assets/styles/theme";
import { CardContainer, CardButton } from "./pokemonCard.style";
import { useCapturedPokemon } from "../../hooks/useCapturedPokemon";

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

export default function PokemonCard({ id, name, image, type }: Props) {
  const { caught, selected, capture, release } = useCapturedPokemon(id);

  return (
    <CardContainer>
      <span>#{id}</span>
      <span>{name}</span>
      <img src={image} alt={name} />
      <span>Type: {type}</span>
      <ContainerButton>
        {!caught ? (
          <CardButton onClick={capture}>
            <Pokeball selected={selected} />
          </CardButton>
        ) : (
          <ButtonStyled onClick={release}>Relacher</ButtonStyled>
        )}
      </ContainerButton>
    </CardContainer>
  );
}
