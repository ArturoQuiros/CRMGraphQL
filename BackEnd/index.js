require("dotenv").config({ path: "variables.env" });
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");

const jwt = require("jsonwebtoken");

//conectar a la BD :)
conectarDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    //console.log(req.headers["authorization"]);
    const token = req.headers["authorization"] || "";

    if (token) {
      try {
        const usuario = await jwt.verify(token, process.env.JWT_SEED);
        //console.log(usuario);
        return { usuario };
      } catch (error) {
        console.log("Error en JWT");
      }
    }
  },
});

//run
server.listen().then(({ url }) => {
  console.log(`server corriendo en ${url}`);
});
