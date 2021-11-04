import { GraphQLObjectType } from "graphql";
import { AddDataResolvers, DeleteDataByIdResolvers, UpdateDataByIdResolvers } from "./Resolvers/Resolvers";

export const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'RootMutation',
    fields: {
        addMovie: AddDataResolvers,
        updateMovie: UpdateDataByIdResolvers,
        deleteMovie: DeleteDataByIdResolvers
    }
})