import Member from "../../../entities/Member";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const member = await Member.findOne({ email });
        if (!member) {
          return {
            ok: false,
            error: "No Member found with that email",
            token: null
          };
        }
        const checkPassword = await member.comparePassword(password);
        if (checkPassword) {
          const token = createJWT(member.id);
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "Wrong password",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};
export default resolvers;
