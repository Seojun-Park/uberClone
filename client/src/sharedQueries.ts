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
        currentRideId
        currentRide {
          id
        }
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

export const UPDATE_RIDE_STATUS = gql`
  mutation UpdateRideStatus($rideId: Int!, $status: StatusOptions!) {
    UpdateRideStatus(rideId: $rideId, status: $status) {
      ok
      err
    }
  }
`;
