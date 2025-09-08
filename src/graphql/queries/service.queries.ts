import { gql } from "@apollo/client";

export const GET_ALL_SERVICES = gql`
  query {
    getAllServices {
      id
      title
      description
      imageUrl
      link
      createdAt
    }
  }
`;
