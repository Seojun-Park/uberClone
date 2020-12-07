import { Resolvers } from "../../../types/resolvers";
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: authResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            err: null
          };
        } catch (err) {
          return {
            ok: false,
            err: err.message
          };
        }
      }
    )
  }
};
export default resolvers;
