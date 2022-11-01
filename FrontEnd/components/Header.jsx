import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query ObtenerUsuario {
    obtenerUsuario {
      nombre
      apellido
    }
  }
`;

export const Header = () => {
  const { data, loading, client } = useQuery(OBTENER_USUARIO);
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="mr-2">
          Hola, <strong> {`${nombre} ${apellido}`}</strong>{" "}
        </h1>
        <button
          type="button"
          className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesion{" "}
        </button>
      </div>
    </>
  );
};
