import { IGraphqlContext } from '../../interface/IGraphqlContext'
import { GraphQLResolveInfo } from 'graphql'
import { getAttributes } from '../../ast'

export const resolver = {

  User: {
  },

  Query: {
    User: (parent, args, { db }: IGraphqlContext, info: GraphQLResolveInfo) => {
      return db.User.findByPk(args.id, { attributes: getAttributes(info, db.User) })
    },
    Users: (parent, args, { db }: IGraphqlContext, info: GraphQLResolveInfo) => {
      const attributes = getAttributes(info, db.User)
      return db.User.findAll({ attributes }) // TODO Filter
    }
  },

  Mutation: {
    SaveUser: (parent, args, { db }: IGraphqlContext) => {
      return db.User.create(args.input)
    },

    DeleteUser: (parent, { id }, { db }: IGraphqlContext) => {
      return db.User.destroy({ where: { id } })
    },

    UpdateUser: (parent, args, { db }: IGraphqlContext) => {
      return db.User.update(args.input)
    }
  }
}
