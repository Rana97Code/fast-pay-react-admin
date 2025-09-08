import { gql } from "@apollo/client";

// benefits and parks for career page
export const GET_BENEFITS = gql`
  query {
    getBenefits {
      id
      title
      description
      icon
      createdAt
    }
  }
`;