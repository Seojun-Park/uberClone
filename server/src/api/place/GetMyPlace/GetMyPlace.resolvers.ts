import User from "../../../entities/User";
import { GetMyPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyPlace: authResolver(
      async (_, __, { req }): Promise<GetMyPlaceResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );
          if (user) {
            return {
              ok: true,
              places: user.places,
              err: null
            };
          } else {
            return {
              ok: false,
              places: null,
              err: "User not found"
            };
          }
        } catch (err) {
          return {
            ok: false,
            err: err.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
