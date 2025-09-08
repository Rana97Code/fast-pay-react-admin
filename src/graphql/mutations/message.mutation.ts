import { gql } from "@apollo/client";

// Mutation to update a message
export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($updateMessageDto: UpdateMessageDto!) {
    updateMessage(updateMessageDto: $updateMessageDto) {
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

// Mutation to delete a message
export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: String!) {
    deleteMessage(id: $id) {
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
