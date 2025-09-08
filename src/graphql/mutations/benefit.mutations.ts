import { gql } from "@apollo/client";

// benefits and parks for career page
export const CREATE_BENEFITS = gql`
  mutation CreateBenefit(
    $title: String!
    $description: String!
    $icon: String!
  ) {
    createBenefit(
      createBenefitInput: {
        title: $title
        description: $description
        icon: $icon
      }
    ) {
      id
      title
      description
      icon
      createdAt
    }
  }
`;

// delete benefits
export const DELETE_BENEFITS = gql`
  mutation DeleteBenefit($id: ID!) {
    deleteBenefit(id: $id)
  }
`;

// updated benefit
export const UPDATE_BENEFIT = gql`
  mutation UpdateBenefit(
    $id: ID!
    $title: String!
    $description: String!
    $icon: String!
  ) {
    updateBenefit(
      id: $id
      updateBenefitInput: {
        title: $title
        description: $description
        icon: $icon
      }
    ) {
      id
      title
      description
      icon
      createdAt
    }
  }
`;
