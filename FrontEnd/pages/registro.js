import React from "react";
import { Layout } from "../components/Layout";

const registro = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-white font-light text-center ">
          Registro
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className=" bg-white rounded shadow-md px-8 pt-6 pb-6 mb-4">
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
                  type={"text"}
                  placeholder="nombre"
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
                  placeholder="apellido"
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
                  placeholder="email"
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
                  placeholder="contraseña"
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
