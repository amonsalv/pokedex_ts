import { PokeTypes } from "../utils/BackgroundsByType";

//este types.ts es un archivo que contiene las interfaces de los tipos de pokemon, los pokemones, y los pokemones por tipo, que son los datos que se van a recibir de la API de pokemons

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

//traemos los pokemones por tipo, en este caso el nombre y la url
export type PokemonsByTypeResult = { 
  pokemon: {
    name: string;
    url: string;
  };
};