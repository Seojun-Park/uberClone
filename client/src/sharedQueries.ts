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

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlace {
      ok
      err
      places {
        id
        name
        lat
        lng
        address
        isFav
        createdAt
        updatedAt
      }
    }
  }
`;
