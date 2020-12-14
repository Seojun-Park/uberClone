import Verification from "../../../entities/Verification";
import {
  GetValidationQueryArgs,
  GetValidationResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetValidation: authResolver(
      async (
        _,
        arg: GetValidationQueryArgs
      ): Promise<GetValidationResponse> => {
        try {
          const verification = await Verification.findOne({
            payload: arg.email
          });
          if (verification) {
            return {
              ok: true,
              error: null,
              verification
            };
          } else {
            return {
              ok: false,
              error: "no verification found",
              verification: null
            };
          }
        } catch (err) {
          return {
            ok: false,
            error: err.message,
            verification: null
          };
        }
      }
    )
  }
};

export default resolvers;
