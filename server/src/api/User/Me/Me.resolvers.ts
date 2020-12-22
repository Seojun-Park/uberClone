import { Resolvers } from "../../../types/resolvers";
import { MeResponse } from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    Me: authResolver(
      async (_, __, { req }): Promise<MeResponse> => {
        const user: User = req.user;
        if (user) {
          const me = await User.findOne(
            { id: user.id },
            { relations: ["currentRide"] }
          );
          if (me) {
            return {
              ok: true,
              err: null,
              user: me
            };
          } else {
            return {
              ok: false,
              err: "not in",
              user: null
            };
          }
        } else {
          return {
            ok: false,
            err: "no user",
            user: null
          };
        }
      }
    )
  }
};

export default resolvers;
