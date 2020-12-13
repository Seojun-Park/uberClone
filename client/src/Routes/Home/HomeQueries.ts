import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    Me {
      ok
      err
      user {
        id
        email
        verifiedEmail
        firstName
        lastName
        phoneNumber
        profilePhoto
      }
    }
  }
`;
