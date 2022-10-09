import React from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const registro = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    onSubmit: (valores) => {
      console.log("Enviando");
      console.log(valores);
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
                ></input>
              </div>

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
                ></input>
              </div>
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
