import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse,
  ValidateEmailMutationArgs,
  ValidateEmailResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: authResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email
            });
            if (verification) {
              user.verifiedEmail = true;
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              const newVerification = await Verification.create({
                payload: user.email,
                target: "EMAIL"
              });
              await sendVerificationEmail(
                newVerification.payload,
                newVerification.key
              );
              user.email = newVerification.payload;
              user.verifiedEmail = false;
              user.save();
              return {
                ok: true,
                error: null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "No Email to verify"
          };
        }
      }
    ),
    ValidateEmail: authResolver(
      async (
        _,
        args: ValidateEmailMutationArgs,
        { req }
      ): Promise<ValidateEmailResponse> => {
        const { key } = args;
        const user: User = req.user;
        if (user.email) {
          try {
            const requested = await Verification.findOne({
              payload: user.email,
              key
            });
            if (requested) {
              requested.verified = true;
              requested.save();
              user.verifiedEmail = true;
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Verification can't valid"
              };
            }
          } catch (err) {
            return {
              ok: false,
              error: err.message
            };
          }
        }
        return {
          ok: false,
          error: "user doesn't have an email for validating"
        };
      }
    )
  }
};

export default resolvers;
