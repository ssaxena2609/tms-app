import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  enum UserRole {
    ADMIN
    EMPLOYEE
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
    role: UserRole
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User
    users: [User!]!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
  }
`;
