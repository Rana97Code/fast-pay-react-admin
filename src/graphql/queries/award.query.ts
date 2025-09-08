
import { gql } from "@apollo/client";

// Query to get award info
export const GET_AWARD_INFO = gql`
  query {
    getAwardInfo {
      title
      backgroundImage
    }
  }
`;

// Query to fetch award images
export const GET_AWARD_IMAGES = gql`
  query {
    getAwardImages {
      id
      src
      name
      description
    }
  }
`;