import React, { useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const pedidos = () => {
  //router
  const router = useRouter();
  //state para el mensaje
  const [mensaje, setMensaje] = useState(null);
  //Mutation
  const [autenticarUsuario] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),

      password: Yup.string().required("La contraseña es obligatoria"),
    }),

    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        console.log(data);
        //* Usuario creado correctamente
        setMensaje("Usuario logeado correctamente!");

        setTimeout(() => {
          setMensaje(null);
        }, 3000);

        //* Mandar al index
        router.push("/");
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
    <div>
      <Layout>
        {mensaje && mostrarMensaje()}

        <h1 className="text-2xl text-white font-light text-center ">Login</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className=" bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                  placeholder="email"
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

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="password"
                >
                  Contraseña:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={"password"}
                  placeholder="contraseña"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                ></input>
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4  border-red-500 text-red-700 p-4">
                  <p className="font-bold"> Error </p>
                  <p> {formik.errors.password}</p>
                </div>
              ) : (
                <p></p>
              )}

              <input
                type={"submit"}
                className="bg-gray-800 w-full mt-5 p-2 text-white  hover:gb-gray-900"
                value={"Iniciar Sesión"}
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default pedidos;
