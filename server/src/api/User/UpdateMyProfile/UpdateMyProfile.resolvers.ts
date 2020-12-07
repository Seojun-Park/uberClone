import User from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: authResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull = {};
        Object.keys(args).forEach((key) => {
          if (args[key] !== null) {
            notNull[key] = args[key];
          }
        });
        try {
            if (args.password !== null){
                user.password = args.password;
                user.save
            }
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch (err) {
          return {
            ok: false,
            error: err.message
          };
        }
      }
    )
  }
};

export default resolvers