import { gql } from "@apollo/client";

export const REQUEST_RIDE = gql`
  mutation RequestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $distance: String!
    $duration: String!
    $rideImage: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
      rideImage: $rideImage
    ) {
      ok
      err
      ride {
        id
      }
    }
  }
`;

export const GET_NEARBY_DRIVERS = gql`
  query GetNearbyDrivers {
    GetNearbyDrivers {
      ok
      err
      drivers {
        id
        fullName
        profilePhoto
        lastLat
        lastLng
      }
    }
  }
`;
