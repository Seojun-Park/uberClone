import { withFilter } from "graphql-yoga";
import Chat from "../../../entities/Chat";
import Message from "../../../entities/Message";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    MessageSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("newChatMessage");
        },
        async (payload, _, { context }) => {
          const user: User = context.currentUser;
          const message: Message = payload.MessageSubscription;
          try {
            const { chatId } = message;
            const chat = await Chat.findOne({ id: chatId });
            if (chat) {
              return chat.driverId === user.id || chat.passengerId === user.id;
            }
            return false;
          } catch (err) {
            return false;
          }
        }
      )
    }
  }
};

export default resolvers;

// const {
//   MessageSubscription: { chatId }
// } = payload;
// try {
//   const chat = await Chat.findOne({ id: chatId });
//   if (chat) {
//     return chat.driverId === user.id || chat.passengerId === user.id;
//   } else {
//     return false;
//   }
// } catch (err) {
//   return false;
// }
