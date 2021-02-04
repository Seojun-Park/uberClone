import { withFilter } from "graphql-yoga";
import Ride from "../../../entities/Ride";
import { StatusSubscriptionSubscriptionArgs } from "../../../types/graph";

const resolvers = {
  Subscription: {
    StatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => {
          return pubSub.asyncIterator("status");
        },
        async (payload, args: StatusSubscriptionSubscriptionArgs, __) => {
          const ride = await Ride.findOne({ id: args.rideId });
          const { StatusSubscription } = payload;
          console.log(StatusSubscription);
          console.log(ride);
          return StatusSubscription;
        }
      )
    }
  }
};

export default resolvers;
