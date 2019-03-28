import { IGraphqlContext } from '../../interface/IGraphqlContext'
import { GraphQLResolveInfo } from 'graphql'
import { getAttributes } from '../../ast'

export const resolver = {

  User: {
  },

  Query: {
    Users: (parent, args, { db }: IGraphqlContext, info: GraphQLResolveInfo) => {
      const attributes = getAttributes(info, db.User)
      return db.User.findAll({ attributes }) // TODO Filter
    }
  },

  Mutation: {
  }
}
