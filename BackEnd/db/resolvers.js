require("dotenv").config({ path: "variables.env" });

const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const Cliente = require("../models/cliente");
const Pedido = require("../models/pedido");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;
  const token = jwt.sign({ id, email, nombre, apellido }, secreta, {
    expiresIn,
  });
  return token;
};

const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      return ctx.usuario;
    },
    obtenerProductos: async (_, { token }, ct) => {
      try {
        const productos = await Producto.find({});
        return productos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerProducto: async (_, { id }, ct) => {
      try {
        //!existe en bd?
        const productoBD = await Producto.findById(id);
        if (!productoBD) {
          throw new Error("Producto no encontrado");
        }
        return productoBD;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerCliente: async (_, { id }, ct) => {
      try {
        //!existe en bd?
        const clienteBD = await Cliente.findById(id);
        if (!clienteBD) {
          throw new Error("Cliente no encontrado");
        }

        //!puede verlo?
        if (clienteBD.vendedor.toString() !== ct.usuario.id) {
          throw new Error("No Autorizado");
        }

        return clienteBD;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerClientes: async (_, { token }, ct) => {
      try {
        const productos = await Cliente.find({});
        return productos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerClientesVendedor: async (_, { token }, ct) => {
      try {
        const productos = await Cliente.find({
          vendedor: ct.usuario.id.toString(),
        });
        return productos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerPedidos: async (_, { token }, ct) => {
      try {
        const pedidos = await Pedido.find({});
        return pedidos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerPedidosVendedor: async (_, { token }, ct) => {
      try {
        const pedidos = await Pedido.find({
          vendedor: ct.usuario.id.toString(),
        });
        return pedidos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerPedido: async (_, { id }, ct) => {
      try {
        //!existe en bd?
        const PedidoBD = await Pedido.findById(id);
        if (!PedidoBD) {
          throw new Error("Pedido no encontrado");
        }

        //!puede verlo?
        if (PedidoBD.vendedor.toString() !== ct.usuario.id) {
          throw new Error("No Autorizado");
        }

        return PedidoBD;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerPedidosEstado: async (_, { estado }, ct) => {
      try {
        const pedidos = await Pedido.find({
          vendedor: ct.usuario.id.toString(),
          estado: estado,
        });
        return pedidos;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerMejoresClientes: async () => {
      try {
        const clientes = await Pedido.aggregate([
          {
            $match: { estado: "COMPLETADO" },
          },
          {
            $group: {
              _id: "$cliente",
              total: { $sum: "$total" },
            },
          },
          {
            $lookup: {
              from: "clientes",
              localField: "_id",
              foreignField: "_id",
              as: "cliente",
            },
          },
          {
            $sort: { total: -1 },
          },
        ]);

        return clientes;
      } catch (error) {
        throw new Error(error);
      }
    },
    obtenerMejoresVendedores: async () => {
      try {
        const vendedores = await Pedido.aggregate([
          {
            $match: { estado: "COMPLETADO" },
          },
          {
            $group: {
              _id: "$vendedor",
              total: { $sum: "$total" },
            },
          },
          {
            $lookup: {
              from: "usuarios",
              localField: "_id",
              foreignField: "_id",
              as: "vendedor",
            },
          },
          {
            $sort: { total: -1 },
          },
          {
            $limit: 3,
          },
        ]);

        return vendedores;
      } catch (error) {
        throw new Error(error);
      }
    },
    buscarProducto: async (_, { texto }, ct) => {
      try {
        const productos = await Producto.find({
          $text: {
            $search: texto,
          },
        });

        return productos;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }, ctx) => {
      //!Revisar si ya est?? registrado
      const { email, password } = input;
      const estaCreado = await Usuario.findOne({ email });

      if (estaCreado) {
        throw new Error("El email ya est?? en uso");
      }
      //!Hashear el password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      //!Guardar en BD
      try {
        const nuevoUsuario = new Usuario(input);
        nuevoUsuario.save();
        return nuevoUsuario;
      } catch (error) {
        throw new Error(error);
      }
    },
    autenticarUsuario: async (_, { input }, ctx) => {
      //!Revisar si ya est?? registrado
      const { email, password } = input;
      const estaCreado = await Usuario.findOne({ email });

      if (!estaCreado) {
        throw new Error("El usuario no existe");
      }

      //!Autenticar con password
      const passwordCorrecto = await bcryptjs.compare(
        password,
        estaCreado.password
      );

      if (!passwordCorrecto) {
        throw new Error("Email/Contrase??a incorrecto");
      }
      //!generar JWT
      return {
        token: crearToken(estaCreado, process.env.JWT_SEED, "24h"),
      };
    },
    nuevoProducto: async (_, { input }, ctx) => {
      try {
        const nuevoProducto = new Producto(input);
        const resultado = await nuevoProducto.save();
        return resultado;
      } catch (error) {
        throw new Error(error);
      }
    },
    actualizarProducto: async (_, { id, input }, ctx) => {
      //!existe en bd?
      let productoBD = await Producto.findById(id);
      if (!productoBD) {
        throw new Error("Producto no encontrado");
      }

      //!actualiza en bd
      productoBD = await Producto.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return productoBD;
    },
    eliminarProducto: async (_, { id }, ctx) => {
      //!existe en bd?
      let productoBD = await Producto.findById(id);
      if (!productoBD) {
        throw new Error("Producto no encontrado");
      }

      //!actualiza en bd
      productoBD = await Producto.findByIdAndDelete({ _id: id });

      return "Producto eliminado";
    },
    nuevoCliente: async (_, { input }, ctx) => {
      console.log("contexto: " + ctx);
      //*Revisar si ya est?? registrado
      const { nombre, apellido, email, empresa, telefono } = input;
      const estaCreado = await Cliente.findOne({ email });

      if (estaCreado) {
        throw new Error("El email del cliente ya est?? en uso");
      }

      //*asignar vendendor
      let nuevoCliente = new Cliente(input);
      nuevoCliente.vendedor = ctx.usuario.id;

      //*Guardar en BD
      try {
        const resultado = await nuevoCliente.save();
        return resultado;
      } catch (error) {
        throw new Error(error);
      }
    },
    actualizarCliente: async (_, { id, input }, ctx) => {
      //!existe en bd?
      let ClienteBD = await Cliente.findById(id);
      if (!ClienteBD) {
        throw new Error("Cliente no encontrado");
      }

      //!puede verlo?
      if (ClienteBD.vendedor.toString() !== ct.usuario.id) {
        throw new Error("No Autorizado");
      }

      //!actualiza en bd
      ClienteBD = await Cliente.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return ClienteBD;
    },
    eliminarCliente: async (_, { id }, ctx) => {
      //!existe en bd?
      let ClienteBD = await Cliente.findById(id);
      if (!ClienteBD) {
        throw new Error("Cliente no encontrado");
      }

      //!puede verlo?
      if (ClienteBD.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No Autorizado");
      }

      //!actualiza en bd
      ClienteBD = await Cliente.findByIdAndDelete({ _id: id });

      return "Cliente eliminado";
    },
    nuevoPedido: async (_, { input }, ctx) => {
      //! existe el cliente?
      const { cliente } = input;
      let ClienteBD = await Cliente.findById(cliente);

      if (!ClienteBD) {
        throw new Error("Cliente no encontrado");
      }

      //! el cliente es del vendedor?
      if (ClienteBD.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No Autorizado");
      }

      //! revisar stock de products
      for await (const articulo of input.pedido) {
        const { id } = articulo;
        const producto = await Producto.findById(id);

        if (articulo.cantidad > producto.existencia) {
          throw new Error(
            `El art??culo ${producto.nombre} excede la cantidad disponible`
          );
        } else {
          //! Restar la cantidad a lo disponible
          producto.existencia = producto.existencia - articulo.cantidad;
        }
      }

      //! Crear el nuevo pedido
      const nuevoPedido = new Pedido(input);

      //!asignar vendedor
      nuevoPedido.vendedor = ctx.usuario.id;

      //!guardar en BD
      const resultado = await nuevoPedido.save();
      return resultado;
    },
    actualizarPedido: async (_, { id, input }, ctx) => {
      //! Existe en bd?
      let PedidoBD = await Pedido.findById(id);
      if (!PedidoBD) {
        throw new Error("Pedido no encontrado");
      }

      //! Existe el cliente y vendedor?
      const { cliente } = input;
      let ClienteBD = await Cliente.findById(cliente);
      if (!ClienteBD) {
        throw new Error("Cliente no encontrado");
      }

      //! Puede verlo?
      if (PedidoBD.vendedor.toString() !== ct.usuario.id) {
        throw new Error("No Autorizado");
      }

      //! Hay Stock?
      if (input.pedido) {
        for await (const articulo of input.pedido) {
          const { id } = articulo;
          const producto = await Producto.findById(id);

          if (articulo.cantidad > producto.existencia) {
            throw new Error(
              `El art??culo ${producto.nombre} excede la cantidad disponible`
            );
          } else {
            //! Restar la cantidad a lo disponible
            producto.existencia = producto.existencia - articulo.cantidad;
          }
        }
      }

      //!actualiza en bd
      PedidoBD = await Pedido.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return PedidoBD;
    },
    eliminarPedido: async (_, { id }, ctx) => {
      //!existe en bd?
      let PedidoBD = await Pedido.findById(id);
      if (!PedidoBD) {
        throw new Error("Pedido no encontrado");
      }

      //!puede verlo?
      if (PedidoBD.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No Autorizado");
      }

      //!actualiza en bd
      PedidoBD = await Pedido.findByIdAndDelete({ _id: id });

      return "Pedido eliminado";
    },
  },
};

module.exports = resolvers;
