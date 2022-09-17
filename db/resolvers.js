require("dotenv").config({ path: "variables.env" });
const Usuario = require("../models/usuarios");
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
    obtenerCurso: () => "Hola",
  },
  Mutation: {
    nuevoUsuario: async (_, { input }, ctx) => {
      //!Revisar si ya está registrado
      const { email, password } = input;
      const estaCreado = await Usuario.findOne({ email });

      if (estaCreado) {
        throw new Error("El email ya está en uso");
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
      //!Revisar si ya está registrado
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
        throw new Error("Email/Contraseña incorrecto");
      }
      //!generar JWT
      return {
        token: crearToken(estaCreado, process.env.JWT_SEED, "24h"),
      };
    },
  },
};

module.exports = resolvers;
