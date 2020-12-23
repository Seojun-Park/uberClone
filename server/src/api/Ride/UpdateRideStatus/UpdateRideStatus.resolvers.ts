// import Chat from "../../../entities/Chat";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: authResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
            { relations: ["passenger", "driver"] }
          );
          if (ride) {
            if (ride.passengerId === user.id || ride.driverId === user.id) {
              ride.status = args.status;
              if (args.status === "FINISHED" || args.status === "CANCELED") {
                await User.update(
                  { id: ride.passengerId },
                  { currentRide: undefined }
                );
                await User.update(
                  { id: ride.driverId },
                  { currentRide: undefined }
                );
              }
              ride.save();
              pubSub.publish("rideUpdate", {
                RideStatusSubscription: ride
              });
              return {
                ok: true,
                err: null,
                rideId: ride.id
              };
            } else {
              return {
                ok: false,
                err: "Not authrorized person to update ride",
                rideId: null
              };
            }
          } else {
            return {
              ok: false,
              err: "no ride has been found",
              rideId: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            err: error.message,
            rideId: null
          };
        }
      }
    )
  }
};
export default resolvers;
