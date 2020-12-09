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
        if (!user.isRiding) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
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
          return {
            ok: false,
            err: "You can request two rides",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
