import * as fs from 'fs'
import { merge } from 'lodash'
import Environment from '../../environment'
import { importSafeEslint } from '../../utils'

const resolvers = []

const filter = Environment.TYPESCRIPT ? '.resolver.ts' : '.resolver.js'

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file.slice(-12) === filter
  })
  .forEach(file => {
    const { resolver = {} } = importSafeEslint(__dirname, file)
    resolvers.push(resolver)
  })

const resolversMerged = merge(resolvers)

export default resolversMerged
