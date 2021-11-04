import { GraphQLObjectType } from "graphql";
import { GetAllDataResolvers, GetByIdDataResolvers } from "./Resolvers/Resolvers";

export const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'RootQuery',
    fields: {
        getAllData: GetAllDataResolvers,
        getByIdData: GetByIdDataResolvers
    }
})