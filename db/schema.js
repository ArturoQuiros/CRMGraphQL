const { gql } = require("apollo-server");

//Schema
const typeDefs = gql`
  #------------------------Types

  type Token {
    token: String
  }

  type Producto {
    id: ID
    nombre: String
    existencia: Int
    precio: Float
    creado: String
  }

  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  type Cliente {
    id: ID
    nombre: String
    apellido: String
    email: String
    empresa: String
    vendedor: ID
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

  input ClienteInput {
    nombre: String!
    apellido: String!
    email: String!
    empresa: String!
    telefono: String
  }

  #------------------------Mutation

  type Mutation {
    #Usuarios
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token

    #Productos
    nuevoProducto(input: ProductoInput): Producto
    actualizarProducto(id: ID!, input: ProductoInput): Producto
    eliminarProducto(id: ID!): String

    #Clientes
    nuevoCliente(input: ClienteInput): Cliente
  }

  #------------------------Query

  type Query {
    #Usuarios
    obtenerUsuario(token: String!): Usuario

    #Productos
    obtenerProductos: [Producto]
    obtenerProducto(id: ID!): Producto

    #Clientes
    obtenerCliente(id: ID!): Cliente
    obtenerClientes: [Cliente]
    obtenerClientesVendedor: [Cliente]
  }
`;

module.exports = typeDefs;
