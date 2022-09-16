//Resolvers
const resolvers = {
  Query: {
    obtenerCurso: () => "Hola",
  },
  Mutation: {
    nuevoUsuario: (_, { input }, ctx) => {
      console.log(input);
      return "creando usuario";
    },
  },
};

module.exports = resolvers;
