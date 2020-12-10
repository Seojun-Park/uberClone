import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: authResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        if (!user.isRiding && !user.isDriving) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
            console.log("Request ride:", ride);
            return {
              ok: true,
              err: null,
              ride
            };
          } catch (err) {
            return {
              ok: false,
              err: err.message,
              ride: null
            };
          }
        } else {
          // user.isRiding = false;
          // user.save();
          return {
            ok: false,
            err: "You can request two rides or diver and request",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
