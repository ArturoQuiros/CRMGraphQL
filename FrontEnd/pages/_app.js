import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import Client from "../config/apollo";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={Client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
