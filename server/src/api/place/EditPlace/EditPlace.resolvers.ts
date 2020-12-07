import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { EditPlaceMutationArgs, EditPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    EditPlace: authResolver(
      async (
        _,
        args: EditPlaceMutationArgs,
        { req }
      ): Promise<EditPlaceResponse> => {
        const user: User = req.user;
        try {
          const place = await Place.findOne({ id: args.placeId });
          if (place) {
            if (place.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Place.update({ id: args.placeId }, { ...notNull });
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
              err: "Place not found"
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
