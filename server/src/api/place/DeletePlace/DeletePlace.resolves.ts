import Place from "../../../entities/Place";
import User from "../../../entities/User";
import {
  DeletePlaceMutationArgs,
  DeletePlaceResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeletePlace: authResolver(
      async (
        _,
        args: DeletePlaceMutationArgs,
        { req }
      ): Promise<DeletePlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              place.remove();
              return {
                ok: true,
                err: null
              };
            } else {
              return {
                ok: false,
                err: "Not Authorized"
              };
            }
          } else {
            return {
              ok: false,
              err: "place not found"
            };
          }
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
