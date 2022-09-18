const { gql } = require("apollo-server");

//Schema
const typeDefs = gql`
  #------------------------Types

  type Producto {
    id: ID
    nombre: String
    existencia: Int
    precio: Float
    creado: String
  }

  type Token {
    token: String
  }

  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  #------------------------Inputs

  input UsuarioInput {
    nombre: String!
    apellido: String!
    email: String!
    password: String!
  }

  input ProductoInput {
    nombre: String!
    existencia: Int!
    precio: Float!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  #------------------------Mutation

  type Mutation {
    #Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    #Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
  }

  #------------------------Query

  type Query {
    #Usuarios
    obtenerUsuario(token: String!): Usuario

    #Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto
  }
`;

module.exports = typeDefs;
