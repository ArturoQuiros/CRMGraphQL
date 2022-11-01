import React from "react";
import { Layout } from "../components/Layout";

const nuevoCliente = () => {
  return (
    <>
      <Layout>
        <div className="flex justify-between">
          <h1 className="text-3xl text-gray-800 font-light">Nuevo Cliente</h1>
        </div>
      </Layout>
    </>
  );
};

export default nuevoCliente;
