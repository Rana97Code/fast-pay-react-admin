import { gql } from "@apollo/client";

// customer enquery
export const GET_CUSTOMER_ENQUERY_TITLE = gql`
  query {
    getCustomerTitle {
      heroTitle
      background
    }
  }
`;

