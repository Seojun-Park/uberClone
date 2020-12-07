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
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        try {
          await User.update({ id: user.id }, { ...notNull });
          const updatedUser = await User.findOne({ id: user.id });
          pubSub.publish("driverUpdate", { DriversSubscription: updatedUser });
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
