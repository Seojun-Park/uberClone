import Member from "../../../entities/Member";
import Verification from "../../../entities/Verification";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            const newMember = await Member.create({ ...args }).save();
            if (newMember.email) {
              const emailVerification = await Verification.create({
                payload: newMember.email,
                target: "EMAIL"
              });
              await sendVerificationEmail(
                newMember.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newMember.id);
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            };
          }
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
