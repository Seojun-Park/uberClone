import { gql } from "@apollo/client";

export const EMAIL_SIGNUP = gql`
  mutation emailSignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $profilePhoto: String!
  ) {
    EmailSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      profilePhoto: $profilePhoto
    ) {
      ok
      error
      token
    }
  }
`;
