const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");

require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");

//conectar a la BD
conectarDB();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    //console.log(req.headers["authorization"]);
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = jwt.verify(token, process.env.JWT_SEED);
      } catch (error) {
        console.log(error);
      }
    }
  },
});

//run
server.listen().then(({ url }) => {
  console.log(`server corriendo en ${url}`);
});
