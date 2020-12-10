import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import authResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    SendChatMessage: authResolver(
      async (
        _,
        args: SendMessageMutationArgs,
        { req }
      ): Promise<SendMessageResponse> => {
        const user: User = req.user;
        console.log(user);
        try {
          const chat = await Chat.findOne({ id: args.chatId });
          console.log(chat);
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              const message = await Message.create({
                text: args.text,
                chat,
                user
              }).save();
              console.log(message);
              return {
                ok: true,
                err: null,
                message
              };
            } else {
              return { ok: false, err: "Not Authorized", message: null };
            }
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
