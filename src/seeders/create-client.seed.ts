import { IDbConnection } from '../interface/IDbConnection'
import Sequelize = require('sequelize')

export default {
  async up (db: IDbConnection, transaction: Sequelize.Transaction) {
    const input = {
      document: '1234',
      User: {
        name: 'Kelvin',
        email: 'kelvin@kelvin',
        password: '1234'

      }
    } as any

    return db.Client.create(input, {
      include: [db.User],
      transaction
    })
  },
  async down (db: IDbConnection, transaction: Sequelize.Transaction) {
    await db.sequelize.getQueryInterface().bulkDelete('clients', null, { transaction })
    return db.sequelize.getQueryInterface().bulkDelete('users', null, { transaction })
  }
}
