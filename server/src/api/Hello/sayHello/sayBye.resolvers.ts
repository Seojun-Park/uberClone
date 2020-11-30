import { Greeting } from "src/types/graph";

const resolvers = {
  Query: {
    sayBye: (): Greeting => {
      return {
        text: "bye",
        error: false
      };
    }
  }
};

export default resolvers;
