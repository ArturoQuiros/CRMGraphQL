import React from "react";
import { Layout } from "../components/Layout";

const nuevoCliente = () => {
  return (
    <>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-800 font-light">Nuevo Cliente</h1>
        </div>

        <div className="flex jusfigy-center mt-5">
          <div className="w-full max-w-lg">
            <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
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
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.email}
                ></input>
              </div>
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
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.email}
                ></input>
              </div>
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
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.email}
                ></input>
              </div>

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
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.email}
                ></input>
              </div>

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
                  //onChange={formik.handleChange}
                  //onBlur={formik.handleBlur}
                  //value={formik.values.email}
                ></input>
              </div>

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
