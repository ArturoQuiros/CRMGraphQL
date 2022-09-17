const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs");

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
  },
};

module.exports = resolvers;
