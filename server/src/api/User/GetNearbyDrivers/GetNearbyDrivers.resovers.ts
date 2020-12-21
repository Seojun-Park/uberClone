import { Between, getRepository } from "typeorm";
// import { Between } from "typeorm";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: authResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        try {
          const drivers: User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          if (drivers) {
            return {
              ok: true,
              err: null,
              drivers
            };
          } else {
            return {
              ok: true,
              err: "No drivers near you",
              drivers: null
            };
          }
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
//   Query: {
//     GetNearDrivers: authResolver(
//       async (_, __, { req }): Promise<GetNearDriversResponse> => {
//         console.log("came?");
//         const user: User = req.user;
//         const { lastLng, lastLat } = user;
//         console.log(lastLng, lastLat, user);
//         try {
//           const drivers: User[] = await User.find({
//             isDriving: true,
//             lastLng: Between(lastLng - 0.05, lastLng + 0.05),
//             lastLat: Between(lastLat - 0.05, lastLat + 0.05)
//           });
//           console.log("drivers:", drivers);
//           return {
//             ok: true,
//             err: null,
//             drivers
//           };
//         } catch (error) {
//           return {
//             ok: false,
//             err: error.message,
//             drivers: null
//           };
//         }
//       }
//     )
//   }
// };
export default resolvers;
