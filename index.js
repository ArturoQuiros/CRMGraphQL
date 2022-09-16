const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");

//conectar a la BD
conectarDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const contexto = "hola";
    return {
      contexto,
    };
  },
});

//run
server.listen().then(({ url }) => {
  console.log(`server corriendo en ${url}`);
});
