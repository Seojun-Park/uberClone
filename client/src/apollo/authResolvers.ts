import { gql } from "@apollo/client";
import client, { isLoggedInVar } from "./apollo";

const query = gql`
  query isLoggedIn {
    isLoggedIn @client
  }
`;

export const userLogIn = (token: string) => {
  client.cache.writeQuery({
    query,
    data: {
      isLoggedIn: true
    }
  });
  localStorage.setItem("X-JWT", token);
  isLoggedInVar(true);
};

export const userLogOut = () => {
  client.cache.writeQuery({
    query,
    data: {
      isLoggedIn: false
    }
  });
  localStorage.removeItem("X-JWT");
  isLoggedInVar(false);
  window.location.href = "/";
};
