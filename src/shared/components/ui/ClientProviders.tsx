"use client";

import { apolloClient } from "@/graphql/apollo-client";
import { UserProfileProvider } from "@/contexts/user-profile";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ChakraProvider value={defaultSystem}>
    <ApolloProvider client={apolloClient}>
      <UserProfileProvider>{children}</UserProfileProvider>
    </ApolloProvider>
  </ChakraProvider>
);
