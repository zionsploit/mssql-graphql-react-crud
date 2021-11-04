import { GraphQLList, GraphQLString, GraphQLID } from "graphql";
import { Connection, sql } from "../../Database/Connection";
import { AddDataType, GetAllDataType } from "../TypeDefs/typeDefs";

export const GetAllDataResolvers = {
    type: new GraphQLList(GetAllDataType),
    async resolve() {
        try {
            const pool = await Connection()
            const result = await pool.request()
                .query(`SELECT * FROM movie_tb`);
            return result.recordset
        } catch (error) {
            console.log(`Error Preceding Query ${error}`)
        }
    }
}

export const AddDataResolvers = {
    type: new GraphQLList(AddDataType),
    args: {
        author: { type: GraphQLString },
        movie: { type: GraphQLString }
    },
    async resolve(parent, args) {
        try {
            const pool = await Connection()
            const result = await pool.request()
                .input('author', sql.VarChar(50), args.author)
                .input('movie', sql.VarChar(50), args.movie)
                .query(`INSERT into movie_tb (author, movie) VALUES (@author, @movie)`)
            if (result.rowsAffected == 1) {
                return [{ author: args.author, movie: args.movie }]
            }
        } catch (error) {
            console.log(`Error Preceding Query ${error}`)
        }
    }
}

export const GetByIdDataResolvers = {
    type: new GraphQLList(GetAllDataType),
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        try {
            const pool = await Connection()
            const result = await pool.request()
                .input('id', sql.Int, args.id)
                .query('SELECT * FROM movie_tb where id = @id');

            return result.recordset
        } catch (error) {
            console.log(`Error Preceding Query ${error}`)
        }
    }
}

export const UpdateDataByIdResolvers = {
    type: new GraphQLList(AddDataType),
    args: {
        id: { type: GraphQLID },
        author: { type: GraphQLString },
        movie: { type: GraphQLString }
    },
    async resolve(parent, args) {
        try {
            const pool = await Connection()
            const result = await pool.request()
                .input('id', sql.Int, args.id)
                .input('author', sql.VarChar(50), args.author)
                .input('movie', sql.VarChar(50), args.movie)
                .query('UPDATE movie_tb SET author = @author, movie = @movie where id = @id');
            if (result.rowsAffected == 1) {
                return [{ author: args.author, movie: args.movie }]
            }
        } catch (error) {
            console.log(`Error Preceding Query ${error}`)
        }
    }
}

export const DeleteDataByIdResolvers = {
    type: new GraphQLList(AddDataType),
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        try {
            const pool = await Connection()
            const result = await pool.request()
                .input('id', sql.Int, args.id)
                .query('DELETE FROM movie_tb where id = @id')
            return [{ author: args.author, movie: args.movie }]
        } catch (error) {
            console.log(`Error Preceding Query ${error}`)
        }
    }
}