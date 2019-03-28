import * as fs from 'fs'
import * as path from 'path'
import db from '../model'

const command = process.argv.slice(-1)[0]

if (!['up', 'down'].includes(command)) throw new Error('Invalid command')

const filter = '.seed.ts'
db.sequelize.transaction(async transaction => {
  const files = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file.slice(-8) === filter)
    })

  const promises = files.map(async file => {
    const seed = require(path.join(__dirname, file)).default
    await seed[command](db, transaction)
  })

  await Promise.all(promises)
    .then(() => console.log('All seeders OK'))
    .catch(error => console.error('Seed Error:', error))
    .finally(() => process.exit())
})
