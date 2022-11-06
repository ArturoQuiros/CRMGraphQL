import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
  mutation EliminarCliente($eliminarClienteId: ID!) {
    eliminarCliente(id: $eliminarClienteId)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      empresa
    }
  }
`;

export const Cliente = ({ cliente }) => {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      // Obtener el objeto de cache a actualizar
      const { ObtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
      });

      // Reescribimos el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          ObtenerClientesVendedor: ObtenerClientesVendedor.filter(
            (clienteActual) => clienteActual.id !== id
          ),
        },
      });
    },
  });

  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "¿Esta seguro de que desea eliminar el cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          //Eliminar
          const { data } = await eliminarCliente({
            variables: {
              eliminarClienteId: id,
            },
          });
          Swal.fire("Eliminado!", `${data.eliminarCliente}`, "success");
        } catch (error) {
          console.table(error);
        }
      }
    });
  };

  const editarCliente = (id) => {
    console.log(`Editar Cliente ${id}`);
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {cliente.nombre} {cliente.apellido}
      </td>
      <td className="border px-4 py-2">{cliente.empresa}</td>
      <td className="border px-4 py-2">{cliente.email}</td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-blue-800 py-2 px-4 w-full text-white rounded text-xs uppercase"
          onClick={() => editarCliente(cliente.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </td>

      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase"
          onClick={() => confirmarEliminarCliente(cliente.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};
