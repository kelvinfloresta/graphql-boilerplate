export const type = `

    type User {
        id: ID!
        name: String!
        email: String!
        createdAt: String!
        updated: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

`

export const query = `
    Users: [ User! ]!
    User(id: ID!): User
`

export const mutation = `
    SaveUser(input: UserInput!): User
    UpdateUser(id: ID!, input: UserInput!): User
    DeleteUser(id: ID!): Boolean
`
