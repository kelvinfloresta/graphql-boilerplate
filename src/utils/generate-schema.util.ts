const generateSave = (modelName): string => `Save${modelName}(input: ${modelName}Input!): ${modelName}!`
const generateUpdate = (modelName): string => `Update${modelName}(id: ID!, input: ${modelName}Input!): ${modelName}!`
const generateDelete = (modelName): string => `Delete${modelName}(id: ID!): Boolean!`
const generateGetNoFilter = (modelName): string => `${modelName}(id: ID!): ${modelName}`
const generateGetFilter = (modelName): string => `${modelName}(filter: ${modelName}FilterInput): ${modelName}`
const generateGet = (filter): ((modelName: string) => string) => (filter ? generateGetFilter : generateGetNoFilter)

const generateGetAllNoFilter = (modelName): string => `${modelName}s: [${modelName}!]!`
const generateGetAllFilter = (modelName): string => `${modelName}s(filter: ${modelName}FilterInput): [${modelName}!]!`
const generateGetAll = (filter): filterParams => (filter ? generateGetAllFilter : generateGetAllNoFilter)

type filterParams = (filter) => string
const generateGetAllPaginationNoFilter = (modelName): string => `${modelName}s: [${modelName}!]!`
const generateGetAllPaginationFilter = (modelName): string => `${modelName}s(filter: ${modelName}FilterInput): [${modelName}!]!`
const generateGetAllPagination = (filter): filterParams => (filter ? generateGetAllPaginationFilter : generateGetAllPaginationNoFilter)
const getCorrectGetAll = (pagination: boolean, filter: string, modelname: string): string =>
  pagination ? generateGetAllPagination(filter)(modelname) : generateGetAll(filter)(modelname)

const generateInputType = (modelName: string, inputFields: string): string => `

    input ${modelName}Input  {
        ${inputFields}
    }

`

const generateInputFilter = (modelName: string, filterFields: string): string => `

    input ${modelName}FilterInput  {
        ${filterFields}
    }

`

const generateType = (modelName: string, queryFields: string): string => `

    type ${modelName} {
        id: ID!
            ${queryFields}
        createdAt: String!
        updatedAt: String!
    }

`

export interface GenerateModelConfig {
  modelName: string
  inputFields?: string
  queryFields?: string
  filterFields?: string
  get?: boolean
  getAll?: boolean
  pagination?: boolean
  save?: boolean
  update?: boolean
  del?: boolean
}

export function generateDefaultModelSchema ({
  modelName,
  inputFields = '',
  queryFields = '',
  filterFields = '',
  get = true,
  getAll = true,
  pagination = true,
  save = true,
  update = true,
  del = true
}: GenerateModelConfig): { mutation: string, query: string, type: string } {
  const saveMutation = save ? generateSave(modelName) : ''
  const updateMutation = update ? generateUpdate(modelName) : ''
  const deleteMutation = del ? generateDelete(modelName) : ''

  const getQuery = get ? generateGet(filterFields)(modelName) : ''
  const getAllQuery = getAll ? getCorrectGetAll(pagination, filterFields, modelName) : ''

  const typeModel = queryFields ? generateType(modelName, queryFields) : ''
  const inputTypeModel = inputFields ? generateInputType(modelName, inputFields) : ''
  const inputFilterModel = filterFields ? generateInputFilter(modelName, filterFields) : ''

  return {
    mutation: `
      ${saveMutation}
      ${updateMutation}
      ${deleteMutation}
      `,

    query: `
        ${getQuery}
        ${getAllQuery}
        `,

    type: `
        ${inputTypeModel}
        ${inputFilterModel}
        ${typeModel}
        `
  }
}

export const printGenerateSchema = (schema): void => {
  console.log(schema.query)
  console.log(schema.mutation)
  console.log(schema.type)
}
