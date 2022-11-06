import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, gql } from "@apollo/client";

const NUEVO_CLIENTE = gql`
  mutation NuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
    }
  }
`;

const OBTENER_CLIENTES_VENDEDOR = gql`
  query ObtenerClientesVendedor {
    obtenerClientesVendedor {
      nombre
      apellido
      email
      empresa
    }
  }
`;

const nuevoCliente = () => {
  //router
  const router = useRouter();
  //state para el mensaje
  const [mensaje, setMensaje] = useState(null);
  //Mutation
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el objeto de cache a actualizar
      const { ObtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
      });

      // Reescribimos el cache
      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
        data: {
          ObtenerClientesVendedor: [...ObtenerClientesVendedor, nuevoCliente],
        },
      });
    },
  });

  //Validations
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es obligatorio"),
      apellido: Yup.string().required("El Apellido es obligatorio"),
      empresa: Yup.string().required("La Empresa es obligatorio"),
      email: Yup.string()
        .email("El Email no es valido")
        .required("El Email es obligatorio"),
      telefono: Yup.string().required("El Número de Teléfono es obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.table(valores);
      const { nombre, apellido, empresa, email, telefono } = valores;

      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });

        //* Usuario creado correctamente
        setMensaje(`Cliente ${data.nuevoCliente.id} registrado correctamente!`);

        setTimeout(() => {
          setMensaje(null);
        }, 3000);

        //* Mandar a clientes
        router.push("/clientes");
      } catch (error) {
        setMensaje(error.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto ">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-800 font-light">Nuevo Cliente</h1>
        </div>

        {mensaje && mostrarMensaje()}

        <div className="flex jusfigy-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="nombre"
                >
                  Nombre:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type={"text"}
                  placeholder="Nombre del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                ></input>
              </div>

              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.nombre}</p>
                </div>
              ) : (
                <p></p>
              )}

              {/* ----------------------------------------- */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="apellido"
                >
                  Apellido:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellido"
                  type={"text"}
                  placeholder="Apellido del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.apellido}
                ></input>
              </div>

              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.apellido}</p>
                </div>
              ) : (
                <p></p>
              )}

              {/* ----------------------------------------- */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="empresa"
                >
                  Empresa:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="empresa"
                  type={"text"}
                  placeholder="Empresa del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.empresa}
                ></input>
              </div>

              {formik.touched.empresa && formik.errors.empresa ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.empresa}</p>
                </div>
              ) : (
                <p></p>
              )}

              {/* ----------------------------------------- */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type={"email"}
                  placeholder="Email del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                ></input>
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.email}</p>
                </div>
              ) : (
                <p></p>
              )}

              {/* ----------------------------------------- */}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="telefono"
                >
                  Telefono:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telefono"
                  type={"tel"}
                  placeholder="Telefono del Cliente"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                ></input>
              </div>

              {formik.touched.telefono && formik.errors.telefono ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.telefono}</p>
                </div>
              ) : (
                <p></p>
              )}

              {/* ----------------------------------------- */}

              <input
                type={"submit"}
                className="bg-gray-800 w-full mt-5 p-2 text-white  hover:gb-gray-900"
                value={"Crear Cliente"}
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default nuevoCliente;
