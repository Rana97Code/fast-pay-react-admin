import { gql } from "@apollo/client";

export const GET_LAND_OWNER_EXECELENCE_SLIDER = gql`
  query {
    getEssenceItems {
      id
      title
      icon
      description
    }
  }
`;

export const GET_ALL_CUSTOMER_VENTURE = gql`
  query {
    getAllJointVentures {
      id
      landownerName
      contactPerson
      email
      phone
      message
      locality
      address
      landSize
      frontRoadWidth
      landCategory
      facing
      benefits
    }
  }
`;
