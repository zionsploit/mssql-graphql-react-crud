import { GraphQLSchema } from "graphql";
import { RootMutation } from "./RootMutation";
import { RootQuery } from "./RootQuery";

export const Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})