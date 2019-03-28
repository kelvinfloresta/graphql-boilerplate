export const type = `
    type Token {
        token: String!
    }
`

export const mutation = `
    createToken(email: String!, password: String!): Token
`
