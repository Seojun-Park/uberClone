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
        if (user.currentRideId) {
          return {
            ok: false,
            err: `You are already on route now`,
            ride: null
          };
        }

        if (user.isDriving) {
          return {
            ok: false,
            err: "you are a driver",
            ride: null
          };
        }

        try {
          const existedRide = await Ride.findOne({
            ...args,
            passenger: user
          });
          if (existedRide) {
            existedRide.remove();
          }
          const ride = await Ride.create({ ...args, passenger: user }).save();
          await User.update({ id: user.id }, { currentRide: ride });
          pubSub.publish("rideRequest", {
            NearbyRideSubscription: ride
          });
          return {
            ok: true,
            err: null,
            ride
          };
        } catch (error) {
          return {
            ok: false,
            err: error.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
