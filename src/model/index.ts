import * as fs from 'fs'
import * as path from 'path'
import { IDbConnection } from '../interface/IDbConnection'
import sequelize from '../database'
import Environment from '../environment'

const db = { sequelize }

const filter = Environment.TYPESCRIPT ? '.model.ts' : '.model.js'
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-9) === filter)
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db as IDbConnection
