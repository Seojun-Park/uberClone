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
        fullName
        phoneNumber
        profilePhoto
        isDriving
        isRiding
        isTaken
        lastLng
        lastLat
        lastOrientation
        fbId
      }
    }
  }
`;
