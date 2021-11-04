import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:1337/gql',
    cache: new InMemoryCache()
});