import { Between, getRepository } from "typeorm";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { GetNearbyRideResponse } from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRide: authResolver(
      async (_, __, { req }): Promise<GetNearbyRideResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const ride = await getRepository(Ride).findOne({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            if (ride) {
              return {
                ok: true,
                err: null,
                ride
              };
            } else {
              return {
                ok: true,
                err: null,
                ride: null
              };
            }
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
            err: "You are not a driver",
            ride: null
          };
        }
      }
    )
  }
};
export default resolvers;
