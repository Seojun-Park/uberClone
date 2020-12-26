import { gql } from "@apollo/client";

export const GET_CHAT_BY_ID = gql`
  query GetChatById($chatId: Int!) {
    GetChatById(chatId: $chatId) {
      ok
      err
      chat {
        id
        messages {
          id
          text
          createdAt
        }
        passengerId
        driverId
        createdAt
      }
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSubscription {
    MessageSubscription {
      id
      text
      userid
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $chatId: Int!) {
    SendMessage(text: $text, chatId: $chatId) {
      ok
      err
      message {
        id
        text
        createdAt
      }
    }
  }
`;
