import { GraphQLServer, Options } from "graphql-yoga";
import dotenv from "dotenv";
dotenv.config();
import { createConnection } from "typeorm";
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import schema from "./schema";
import connectionOptions from "./ormConfig";

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

createConnection(connectionOptions)
  .then(() => {
    server.start(appOptions, () => console.log(`Listening on port ${PORT}`));
  })
  .catch((error) => console.log(error));
