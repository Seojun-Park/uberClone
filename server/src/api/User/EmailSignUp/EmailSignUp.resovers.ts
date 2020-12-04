import createJWT from "../../../utils/createJWT";
import User from "./../../../entities/User";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "./../../../types/graph.d";
import { Resolvers } from "./../../../types/resolvers.d";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null
          };
        } else {
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.Message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
