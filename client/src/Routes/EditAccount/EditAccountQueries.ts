import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $profilePhoto: String
    $email: String
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      profilePhoto: $profilePhoto
      email: $email
    ) {
      ok
      error
    }
  }
`;
