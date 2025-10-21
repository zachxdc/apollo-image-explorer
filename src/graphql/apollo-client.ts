import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "./config";

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});
