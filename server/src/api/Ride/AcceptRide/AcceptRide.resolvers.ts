import { Resolvers } from "../../../types/resolvers";
import {
  AcceptRideMutationArgs,
  AcceptRideResponse
} from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import User from "../../../entities/User";
import Ride from "../../../entities/Ride";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    AcceptRide: authResolver(
      async (
        _,
        args: AcceptRideMutationArgs,
        { req }
      ): Promise<AcceptRideResponse> => {
        const driver: User = req.user;
        if (driver.isDriving) {
          if (driver.currentRide) {
            return {
              ok: false,
              err: "I'm with a passenger"
            };
          }
          try {
            const requestedRide = await Ride.findOne(
              {
                id: args.rideId
              },
              { relations: ["passenger"] }
            );
            if (requestedRide && requestedRide.status === "REQUESTING") {
              const passenger = await User.findOne({
                id: requestedRide.passenger.id
              });
              if (passenger) {
                passenger.currentRide = requestedRide;
                passenger.save();
                driver.currentRide = requestedRide;
                driver.save();
              }
              const chat = await Chat.create({
                driver,
                passenger: requestedRide?.passenger,
                ride: requestedRide
              }).save();
              // if (requestedRide) {
              await Ride.update(
                {
                  id: requestedRide.id
                },
                {
                  chat,
                  driver,
                  status: "ACCEPTED"
                }
              );
              // }
              return {
                ok: true,
                err: null
              };
            } else {
              return {
                ok: false,
                err: "No Requested Ride"
              };
            }
          } catch (err) {
            return {
              ok: false,
              err: err.message
            };
          }
        } else {
          return {
            ok: false,
            err: "You are not driver"
          };
        }
      }
    )
  }
};

export default resolvers;
