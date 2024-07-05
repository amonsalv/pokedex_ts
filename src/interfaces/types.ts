import { PokeTypes } from "../utils/BackgroundsByType";

//traemos los tipos de pokemon
export type PokeType = {
  name: PokeTypes | "All";
  url?: string;
};

//traemos los pokemones
export type AllPokemonsResult = {
  name: string;
  url: string;
};

export type PokemonsByTypeResult = {
  pokemon: {
    name: string;
    url: string;
  };
};