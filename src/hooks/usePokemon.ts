import axios from "axios";
import { useEffect, useState } from "react";
import { IPokemon } from "../interfaces/interfaces";

// exportamos la funcion usePokemon que recibe un string opcional url y un string opcional id
export const usePokemon = (url?: string, id?: string) => { 
  const [pokemon, setPokemon] = useState<null | undefined | IPokemon>();

    // exportamos la funcion fetchPokemon que es asincrona
  const fetchPokemon = async () => {
    if (url) {
      const { data }: any = await axios.get(url);
      setPokemon(data);
    } else if (id) {
      const { data }: any = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(data);
    }
  };

  // exportamos la funcion useEffect que recibe una funcion anonima y un array vacio, esta funcion se ejecuta cuando el componente se monta
  useEffect(() => {
    fetchPokemon();
  }, []);

  return { pokemon };
};
