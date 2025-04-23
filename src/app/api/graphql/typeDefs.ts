import {gql} from '@apollo/client';

export const typeDefs = gql`
  type MessageResponse {
    message: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    submitContactForm(
      firstName: String!
      lastName: String
      email: String!
      message: String!
      fileUrl: String
      captchaToken: String!
    ): MessageResponse!
  }
`;
