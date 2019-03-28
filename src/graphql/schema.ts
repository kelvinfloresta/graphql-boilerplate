import { makeExecutableSchema } from 'graphql-tools'

import schemas from './schemas'
import resolvers from './resolvers'

import { AuthDirective } from './directive/AuthDirective'

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    schemas.query,
    schemas.mutation,
    schemas.type,
    `
        directive @auth(
            requires: Role = ADMIN,
          ) on OBJECT | FIELD_DEFINITION

          enum Role {
            ADMIN
            USER
            GUEST
          }
        `
  ],
  resolvers,
  schemaDirectives: {
    auth: AuthDirective
  }
})
