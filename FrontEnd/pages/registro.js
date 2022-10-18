import React from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation, gql } from "@apollo/client";

const REGISTRO = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      email
      nombre
      apellido
    }
  }
`;

const registro = () => {
  //Mutation
  const [nuevoUsuario] = useMutation(REGISTRO);

  //Validations
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es obligatorio"),
      apellido: Yup.string().required("El Apellido es obligatorio"),
      email: Yup.string()
        .email("El Email no es valido")
        .required("El Email es obligatorio"),
      password: Yup.string()
        .required("La Contraseña es obligatoria")
        .min(6, "La Contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      //console.log("Enviando");
      const { nombre, apellido, email, password } = valores;

      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });

        console.log(data);
        //* Usuario creado correctamente

        //* Mandar al home
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-white font-light text-center ">
          Registro
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              onSubmit={formik.handleSubmit}
              className=" bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4"
            >
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold m-2"
                  htmlFor="nombre"
                >
                  Nombre:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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

              <div className="">
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
                  placeholder="Apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
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

              <div className="">
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
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  formNoValidate
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

              <div className="">
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
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
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
                value={"Registro"}
              ></input>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default registro;
