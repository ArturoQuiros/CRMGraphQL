import React from "react";
import { Layout } from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const { data, loading, error, client } = useQuery(OBTENER_CLIENTES);
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data === undefined) {
    client.clearStore();
    router.push("/login");
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-800 font-light"> Clientes</h1>
          <Link href={"/nuevoCliente"}>
            <a className="bg-blue-800 py-2 px-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold">
              Nuevo Cliente
            </a>
          </Link>
        </div>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente) => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.apellido}</td>
                <td className="border px-4 py-2">{cliente.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default clientes;
