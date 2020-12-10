import { Resolvers } from "../../../types/resolvers";
import {
  SendChatMessageMutationArgs,
  SendChatMessageResponse
} from "../../../types/graph";
import authResolver from "../../../utils/authResolver";
import User from "../../../entities/User";
import Message from "../../../entities/Message";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: authResolver(
      async (
        _,
        args: SendChatMessageMutationArgs,
        { req }
      ): Promise<SendChatMessageResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          if (chat) {
            const message = await Message.create({
              text: args.text,
              chat,
              user
            });
            return {
              ok: true,
              err: null,
              message
            };
          } else {
            return {
              ok: false,
              err: "Chat not Found",
              message: null
            };
          }
        } catch (err) {
          return {
            ok: false,
            err: err.message,
            message: null
          };
        }
      }
    )
  }
};
export default resolvers;
