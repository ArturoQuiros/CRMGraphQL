//Resolvers
const resolvers = {
  Query: {
    obtenerCurso: () => "Hola",
  },
  Mutation: {
    nuevoUsuario: () => "Creando nuevo usuario",
  },
};

module.exports = resolvers;
