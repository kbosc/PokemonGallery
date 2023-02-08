type PokemonObject = {
  data: {
    name: string;
    type: string;
    weight: number;
    // official art
    // sprites: {
    //   other: {
    //     "official-artwork": {
    //       front_default: string;
    //       front_shiny: string;
    //     };
    //   };
    // };
    // dream world
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    // normal
    // sprites: {
    //   front_default: string;
    // };
  };
};

export const CatchedPokemon = ({ data }: PokemonObject) => {
  return (
    <div>
      <span>
        ceci est un {data.name} de type {data.type} et il pèse {data.weight} kg
      </span>
      <img
        // src={data.sprites.other["official-artwork"].front_default}
        // src={data.sprites.other["official-artwork"].front_shiny}
        src={data.sprites.other.dream_world.front_default}
        // src={data.sprites.front_default}
        alt={`Image du pokemon ${data.name}`}
      />
    </div>
  );
};
