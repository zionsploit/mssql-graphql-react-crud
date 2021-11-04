import gql from "graphql-tag";

export const AddDataMutations = gql`
    mutation AddDataMutations($author: String!, $movie: String!){
        addMovie(author: $author, movie: $movie)
        {
            author
            movie
        }
    }
`;

export const UpdateDataByIdMutations = gql`
    mutation UpdateDataByIdMutations($id: ID!, $author: String!, $movie: String!)
    {
        updateMovie(id: $id, author: $author, movie: $movie)
        {
            author
            movie
        }
    }
`;

export const DeleteDataByIdMutations = gql`
    mutation DeleteDataByIdMutations($id: ID!){
        deleteMovie(id: $id)
        {
            author
        }
    }
`;