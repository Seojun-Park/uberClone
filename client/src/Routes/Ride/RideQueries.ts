import { gql } from "@apollo/client";

export const GET_CURRENT_RIDE = gql`
  query GetRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      err
      ride {
        status
        pickUpAddress
        pickUpLat
        pickUpLng
        dropOffAddress
        dropOffLat
        dropOffLng
        price
        distance
        duration
        driverId
        driver
        passengerId
        passenger
        chat
        chatId
        rideImage
        currentUsers
        createdAt
        updatedAt
      }
    }
  }
`;
