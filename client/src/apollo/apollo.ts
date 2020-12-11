import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  split,
  Operation,
  gql,
  concat,
  makeVar
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("X-JWT"));

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          }
        }
      }
    }
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
  },
  typeDefs,
  resolvers: {
    Mutation: {
      userLogIn: (_: any, { token }: any, { cache: appCache }: any) => {
        console.log(token, "test");
        localStorage.setItem("X-JWT", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return null;
      },
      userLogOut: (_: any, __: any, { cache: appCache }: any) => {
        localStorage.removeItem("X-JWT");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

export default client;
