import styles from "./styles.module.scss";

//este loader es un componente que recibe un objeto con la propiedad color que es un string y la propiedad size que es un numero
interface Props {
  color: string;
  size?: number;
}

//exportamos la funcion Loader que recibe un objeto con las propiedades color y size, para visualizar un loader
export const Loader = ({ size, color }: Props) => {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderColor: color,
      }}
      className={styles.loader}
    />
  );
};
