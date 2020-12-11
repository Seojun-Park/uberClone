import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  split,
  Operation,
  gql,
  concat
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const cache: InMemoryCache = new InMemoryCache({});

const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: localStorage.getItem("X-JWT")
  }
});

const authMiddle = new ApolloLink((operation: Operation, forward: any): any => {
  operation.setContext({
    headers: {
      "X-JWT": localStorage.getItem("X-JWT") || ""
    }
  });
  return forward(operation);
});

const subClient = new SubscriptionClient("ws://localhost:4000/subscription", {
  connectionParams: {
    "X-JWT": localStorage.getItem("X-JWT") || ""
  },
  reconnect: true
});

const wsLink = new WebSocketLink(subClient);

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const errLink = onError(({ graphqlErrors, networkError }: any) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }: any) =>
      console.log("network graphql Error : ", message)
    );
  }
});

const linkComb = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([errLink, concat(authMiddle, linkComb)]),
  headers: {
    authorization: localStorage.getItem("X-JWT") || ""
  }
});

export default client;
