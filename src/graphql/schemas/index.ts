import * as fs from 'fs'
import Environment from '../../environment'
import { importSafeEslint } from '../../utils'

let Query = ''
let Mutation = ''
let Type = ''

const filter = Environment.TYPESCRIPT ? '.schema.ts' : '.schema.js'
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file.slice(-10) === filter
  })
  .forEach(file => {
    const { query = '', mutation = '', type = '' } = importSafeEslint(__dirname, file)
    Query += query
    Mutation += mutation
    Type += type
  })

const Schemas = {
  query: `
  type Query {
    ${Query}
  }
  `,

  mutation: `
  type Mutation {
    ${Mutation}
  }
  `,
  type: Type
}
export default Schemas
