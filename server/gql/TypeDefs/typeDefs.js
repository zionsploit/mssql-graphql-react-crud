import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const GetAllDataType = new GraphQLObjectType({
    name: 'GetAllDataType',
    description: 'All Data Type',
    fields: {
        id: { type: GraphQLID },
        author: { type: GraphQLString },
        movie: { type: GraphQLString }
    }
});

export const AddDataType = new GraphQLObjectType({
    name: 'AddDataType',
    description: 'Add Data Type',
    fields: {
        author: {type: GraphQLString},
        movie: {type: GraphQLString}
    }
})