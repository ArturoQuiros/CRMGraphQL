import React from "react";
import { Layout } from "../components/Layout";
import { useMutation, gql, useQuery } from "@apollo/client";

const OBTENER_CLIENTES = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      nombre
      apellido
      email
      empresa
    }
  }
`;

const clientes = () => {
  //QUERY
  const { data, loading, error } = useQuery(OBTENER_CLIENTES);
  console.log(data);

  return (
    <div>
      <Layout>
        {loading ? (
          <div>
            {" "}
            <h1> Cargando</h1>
          </div>
        ) : (
          <>
            <h1 className="text-2xl text-gray-800 font-light"> Clientes</h1>

            <table className="table-auto shadow-md mt-10 w-full w-lg">
              <thead className="bg-gray-800">
                <tr className="text-white">
                  <th className="w-1/5 py-2">Nombre</th>
                  <th className="w-1/5 py-2">Empresa</th>
                  <th className="w-1/5 py-2">Email</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data.obtenerClientesVendedor.map((cliente) => {
                  <tr key={cliente.id}>
                    <td className="border px-4 py-2">{cliente.nombre}</td>
                    <td className="border px-4 py-2">{cliente.apellido}</td>
                    <td className="border px-4 py-2">{cliente.empresa}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </>
        )}
      </Layout>
    </div>
  );
};

export default clientes;
