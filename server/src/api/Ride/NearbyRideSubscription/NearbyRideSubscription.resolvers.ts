import { withFilter } from "graphql-yoga";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("rideRequest");
        },
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const ride: Ride = payload.NearbyRideSubscription;
          if (!user.isDriving) {
            return false;
          }
          const { pickUpLat, pickUpLng, status } = ride;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            status === "REQUESTING" &&
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
