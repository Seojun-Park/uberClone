import { Between, getRepository } from "typeorm";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { GetNearbyRidesResponse } from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetNearbyRides: authResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              err: null,
              rides
            };
          } catch (err) {
            return {
              ok: false,
              err: err.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            err: "You are not a driver",
            rides: null
          };
        }
      }
    )
  }
};
export default resolvers;
