const { gql } = require('apollo-server')

module.exports = gql`
  
  input RegisterInput {
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    token: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`