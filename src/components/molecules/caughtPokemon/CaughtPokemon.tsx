type PokemonObject = {
  data: {
    name: string;
    type: string;
    weight: number;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
};

export const CaughtPokemon = ({ data }: PokemonObject) => {
  return (
    <div>
      <span>
        ceci est un {data.name} de type {data.type} et il pèse {data.weight} kg
      </span>
      <img
        src={data.sprites.other.dream_world.front_default}
        alt={`Image du pokemon ${data.name}`}
      />
    </div>
  );
};
