import * as graphqlHTTP from 'express-graphql'
import * as express from 'express'
import * as cors from 'cors'
import schema from './graphql/schema'
import db from './model'
import extractJwtMiddleware from './middleware/extract-jwt.middleware'
import dataLoaderMiddleware from './middleware/dataloader.middleware'

import Environment from './environment'

const { SERVER_PORT, DEV_MODE, ALTER_TABLE: alter, DROP_DATABASE: force } = Environment

db.sequelize.sync({ force, alter }).then(() => {
  express()
    .use(cors())
    .use(extractJwtMiddleware)
    .use(dataLoaderMiddleware)
    .use((req, res, next) => {
      req['context']['db'] = db
      next()
    })
    .use('/graphql', graphqlHTTP(req => ({ schema, context: req['context'], graphiql: DEV_MODE })))
    .listen(SERVER_PORT, () => console.log(`Running a GraphQL API server at http://localhost:${SERVER_PORT}/graphql`))
})
