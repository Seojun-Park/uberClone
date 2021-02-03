import User from "../../../entities/User";
import { ToggleDrivingModeResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    ToggleDrivingMode: authResolver(
      async (_, __, { req }): Promise<ToggleDrivingModeResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          user.isDriving = false;
        } else {
          user.isDriving = true;
        }
        user.save();
        return {
          ok: true,
          err: null
        };
      }
    )
  }
};

export default resolvers;
