import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($key: String!) {
    ValidateEmail(key: $key) {
      ok
      error
    }
  }
`;

export const GET_VALIDATION = gql`
  query getValidation($email: String!) {
    GetValidation(email: $email) {
      ok
      error
      verification {
        payload
        key
        verified
      }
    }
  }
`;
