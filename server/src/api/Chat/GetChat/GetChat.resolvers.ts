import { Resolvers } from "../../../types/resolvers";
import { GetChatQueryArgs, GetChatResponse } from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: authResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne(
            {
              id: args.chatId
            },
            { relations: ["passenger", "driver", "messages"] }
          );
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                err: null,
                chat
              };
            } else {
              return {
                ok: false,
                err: "Not athorized to see this chat",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              err: "Chat Not found",
              chat: null
            };
          }
        } catch (err) {
          return {
            ok: false,
            err: err.message,
            chat: null
          };
        }
      }
    )
  }
};
export default resolvers;
