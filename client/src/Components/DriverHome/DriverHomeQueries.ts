import { gql } from "@apollo/client";

export const GET_NEARBY_RIDES = gql`
  query GetNearbyRides {
    GetNearbyRides {
      ok
      err
      ride {
        id
        pickUpAddress
        pickUpLat
        pickUpLng
        dropOffAddress
        dropOffLat
        dropOffLng
        price
        distance
        duration
      }
    }
  }
`;

export const RIDE_SUBSCRIPTION = gql`
  subscription RideStatusSubscription {
    RideStatusSubscription {
      id
      pickUpAddress
      pickUpLat
      pickUpLng
      dropOffAddress
      dropOffLat
      dropOffLng
      price
      distance
      duration
    }
  }
`;

export const ACCEPT_RIDE = gql`
  mutation AcceptRide($rideId: Int!) {
    AcceptRide(rideId: $rideId) {
      ok
      err
    }
  }
`;
