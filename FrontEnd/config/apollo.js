import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "localhost:4000", fetch }),
});

export default Client;
