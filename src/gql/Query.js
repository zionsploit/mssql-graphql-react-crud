import gql from "graphql-tag";

export const GetAllDataQuery = gql`
    query GetAllDataQuery{
        getAllData{
            id
            author
            movie
        }
    }
`;

export const GetByIdDataQuery = gql`
    query GetByIdDataQuery($id: ID!){
        getByIdData(id: $id)
        {
            id
            author
            movie
        }
    }
`;