const express = require('express')
import './Database/Connection'
import config from './config'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './gql'
import cors from 'cors'

const app = express()

app.use(cors())

app.use('/gql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}))

app.use(express.urlencoded())

app.listen(config.PORT, () => {
    console.log(`Server Running in PORT ${config.PORT}`)
})