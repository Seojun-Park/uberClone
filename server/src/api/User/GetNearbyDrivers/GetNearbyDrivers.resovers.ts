import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import { GetNearbyDriversResponse } from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import { Between } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: authResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.uesr;
        const { lastLat, lastLng } = user;
        try {
          const drivers: User[] = await User.find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          return {
            ok: true,
            err: null,
            drivers
          };
        } catch (err) {
          return {
            ok: false,
            err: err.message,
            drivers: null
          };
        }
      }
    )
  }
};
export default resolvers;
