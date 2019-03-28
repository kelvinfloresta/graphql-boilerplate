import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils'
import { IGraphqlContext } from 'src/interface/IGraphqlContext'

export const resolver = {
  Mutation: {
    createToken: async (parent, { email, password }, { db }: IGraphqlContext) => {
      const user = await db.User.findOne({
        where: { email },
        attributes: ['id', 'password']
      })

      if (!user) {
        throw new Error('Wrong email or password')
      }

      const passwordEncrypted = user.get('password')
      if (!user.passwordMatch(passwordEncrypted, password)) {
        throw new Error('Wrong email or password')
      }

      const payload = { id: user.get('id') }

      return {
        token: jwt.sign(payload, JWT_SECRET)
      }
    }
  }
}
