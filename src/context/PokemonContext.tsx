import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  AllPokemonsResult,
  PokemonsByTypeResult,
  PokeType,
} from "../interfaces/types";

//este es el objeto que se va a exportar, que es un objeto con las propiedades types, filterSelected, pokemonsFiltered y changeTypeSelected
interface PokemonContextProps { 
  types: PokeType[];
  filterSelected: PokeType;
  pokemonsFiltered: string[] | null;
  changeTypeSelected: (type: PokeType) => void;
}

//creamos un contexto de PokemonContextProps, que inicialmente es un objeto vacio
export const PokemonContext = createContext<PokemonContextProps>(
  {} as PokemonContextProps
);

//este es el componente PokemonProvider que recibe un objeto children
const PokemonProvider = ({ children }: any) => {
  let allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

  // Inicializamos el estado de los tipos de pokemon, y el tipo seleccionado por defecto
  const defaultState: PokeType = {
    name: "All",
    url: allPokemonsUrl,
  };

  // Inicializamos los estados de los tipos de pokemon, los pokemons filtrados, y el tipo seleccionado
  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null);

  const [types, setTypes] = useState([defaultState]);
  const [filterSelected, setFilterSelected] = useState(defaultState);

  // Cambiamos el tipo de pokemon seleccionado
  const changeTypeSelected = async (type: PokeType) => { 
    setFilterSelected(type);

    // Si el tipo seleccionado es diferente a "All", entonces hacemos una peticion a la API de Pokemon para traer los pokemons de ese tipo
    const { data } = await axios.get(type?.url!);
    let pokemons = data?.pokemon?.map(
      ({ pokemon }: PokemonsByTypeResult) => pokemon?.url
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

    // Hacemos una peticion a la API de Pokemon
  const getPokemonsType = async () => {
    // De aqui traemos todos los tipos disponibles
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results]);
  };

  // Hacemos una peticion a la API de Pokemon, para traer todos los pokemons, usamos async porque es una peticion a una API externa y puede tardar en responder
  const getAllPokemons = async () => { 
    const { data } = await axios.get(allPokemonsUrl);

    let pokemons = data?.results?.map(
      (pokemon: AllPokemonsResult) => pokemon?.url
    );

    // Inicialmente los pokemon filtrados son todos
    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  // Usamos useEffect para que se ejecute una vez que el componente se haya montado, y no se ejecute en cada renderizado
  useEffect(() => {
    getPokemonsType();
    getAllPokemons();
  }, []);

  //   console.log("These are all the types:", types);
  //   console.log("These are all the Pokemons:", allPokemons);

  return (
    <PokemonContext.Provider
      value={{ types, filterSelected, pokemonsFiltered, changeTypeSelected }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
