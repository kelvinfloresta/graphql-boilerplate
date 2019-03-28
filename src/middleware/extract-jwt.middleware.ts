import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import db from '../model'
import { JWT_SECRET } from '../utils'
import { AuthUser } from '../interface/IAuthUser'

export default function extractJwtMiddleware (req: Request, res: Response, next: NextFunction): void {
  const authorization: string = req.get('authorization')
  const token: string = authorization ? authorization.slice('authorization '.length) : undefined

  req['context'] = req['context'] || {}
  req['context']['authorization'] = authorization

  if (!token) { return next() }

  jwt.verify(token, JWT_SECRET, async (err, decoded: AuthUser) => {
    if (err) { return next() }
    const id = decoded.id
    const user = await db.User.findById(id, { attributes: ['id', 'email'] })

    if (user) {
      const authUser: AuthUser = {
        id: user.get('id')
      }

      req['context']['authUser'] = authUser
    }

    return next()
  })
}
