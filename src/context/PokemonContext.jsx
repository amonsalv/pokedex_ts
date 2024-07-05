import axios from "axios"; //axios es una libreria que permite hacer peticiones http a una api
//este archivo es el contexto de la aplicacion, aqui se almacenan los datos que se van a compartir entre los componentes de la aplicacion
import { createContext, useEffect, useState } from "react";
import {AllPokemonsResult, PokemonsByTypeResult, PokeType,} from "../interfaces/types";

//se crea una interfaz con los datos que se van a compartir
interface ContextProps{ 
    types: PokeType[];
    filterSelected: PokeType;
    pokemonsFiltered: string[] | null;
    changeTypeSelected: (type: PokeType) => void;
}
//se crea el contexto, se inicializa con un objeto vacio de la interfaz creada
export const PokemonContext = createContext<ContextProps>({} as ContextProps);

//se crea el provider, este componente se encarga de envolver a toda la aplicacion y compartir los datos que se encuentran en el contexto
const PokemonProvider = ({ children }: any) => {
  let allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

  //se crea un objeto con el tipo de pokemon y la url de la api
  const defaultState : PokeType = { 
    name: "All",
    url: allPokemonsUrl,
  };
  //se inicializa el estado de los pokemons con null
  const [allPokemons, setAllPokemons] = useState(null);
  //se inicializa el estado de los pokemons filtrados con null
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null); 

  //se inicializa el estado de los tipos de pokemon con el objeto creado anteriormente
  const [types, setTypes] = useState(defaultState); 
  //se inicializa el estado del tipo de pokemon seleccionado con el objeto creado anteriormente
  const [filterSelected, setFilterSelected] = useState(defaultState);

  //funcion para cambiar el tipo de pokemon seleccionado
  const changeTypeSelected = async (type: PokeType) => { 
    setFilterSelected(type); 

    //se hace una peticion get a la api de pokemon con la url del tipo seleccionado
    const { data } = await axios.get(type?.url!); 
    let pokemons = data?.pokemon?.map(
      ({ pokemon }: PokemonsByTypeResult) => pokemon?.url
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

  const getPokemonsType = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results]);
  };

  //funcion para traer todos los pokemons
  const getAllPokemons = async () => {
    //se hace una peticion get a la api de pokemon
    const { data } = await axios.get(allPokemonsUrl); 
    //se mapea la respuesta de la api para obtener solo los urls de los pokemons
    let pokemons = data?.results?.map( 
      (pokemon: AllPokemonsResult) => pokemon?.url
    );

    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  useEffect(() => {
    getPokemonsType();
    getAllPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        types,
        filterSelected,
        pokemonsFiltered,
        changeTypeSelected,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;