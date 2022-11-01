import React from "react";
import { gql, useQuery } from "@apollo/client";

const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      nombre
      apellido
    }
  }
`;

export const Header = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  if (loading) {
    return null;
  }

  const { nombre, apellido } = data.obtenerUsuario;

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="mr-2">
          Hola, <strong> {`${nombre} ${apellido}`}</strong>{" "}
        </h1>
        <button type="button">Cerrar Sesion </button>
      </div>
    </>
  );
};
