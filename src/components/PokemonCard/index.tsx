import { usePokemon } from "../../hooks/usePokemon";
import { background } from "../../utils/BackgroundsByType";
import { Link } from "react-router-dom";
// import { Loader } from "../Loader";

import styles from "./styles.module.scss";

interface Props {
  url: string;
}

// exportamos la funcion PokemonCard que recibe un objeto con la propiedad url, que es un string
export const PokemonCard = ({ url }: Props) => {
  const { pokemon } = usePokemon(url);

  /* @ts-ignore */ //esto es para que no me marque error en la siguiente linea 
  const backgroundSelected = background[pokemon?.types[0]?.type?.name]; //esto es para que me muestre el color de fondo de acuerdo al tipo de pokemon

  //retornamos un Link que recibe un objeto con la propiedad to que es un string interpolado con el id del pokemon
  return (
    <Link to={`/${pokemon?.id}`} className={styles.pokeCard}>
      <div style={{ borderColor: backgroundSelected }} className={styles.top}>
        <span style={{ color: backgroundSelected }}>#{pokemon?.id}</span>
        {pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.front_default ? (
          <img
            src={
              pokemon?.sprites?.other?.dream_world?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt={pokemon?.name}
          />
        ) : (
          <div className={styles.loadingContainer}>
            {/* <Loader color={backgroundSelected} /> */}
          </div>
        )}
      </div>
      <div style={{ background: backgroundSelected }} className={styles.bottom}>
        {pokemon?.name}
      </div>
    </Link>
  );
};
