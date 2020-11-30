import { GraphQLServer, Options } from "graphql-yoga";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const server = new GraphQLServer({
  schema
});

server.express.use(cors());
server.express.use(logger("dev"));
server.express.use(helmet());

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT
};

server.start(appOptions, () => console.log(`Listening on port ${PORT}`));
