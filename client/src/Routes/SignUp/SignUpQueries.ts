import { gql } from "@apollo/client";

export const EMAIL_SIGNUP = gql`
  mutation emailSignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $profilePhoto: String!
    $age: Int!
  ) {
    EmailSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      profilePhoto: $profilePhoto
      age: $age
    ) {
      ok
      error
      token
    }
  }
`;
