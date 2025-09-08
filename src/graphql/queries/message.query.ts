import { gql } from "@apollo/client";

// Query to get all messages
export const GET_ALL_MESSAGES = gql`
 query GetAllMessages {
  getAllMessages {
    _id
    userName
    email
    phone
    location
    plan
    content
    createdAt
  }
}
`;

// Query to get a single message by ID
export const GET_SINGLE_MESSAGE = gql`
  query GetSingleMessage($id: String!) {
    getSingleMessage(id: $id) {
      _id
      userName
      email
      phone
      location
      plan
      content
      createdAt
    }
  }
`;