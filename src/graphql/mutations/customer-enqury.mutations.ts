import { gql } from "@apollo/client";

// update banner
export const UPDATE_CUSTOMER_ENQUERY_BANNER = gql`
  mutation updateCustomerBanner($heroTitle: String!, $background: String!) {
    updateCustomerBanner(heroTitle: $heroTitle, background: $background) {
      heroTitle
      background
    }
  }
`;

// delete customer information from db
export const DELETE_CUSTOMER_INFO = gql`
  mutation DeleteCustomerInquiry($id: String!) {
    deleteCustomerInquiry(id: $id)
  }
`;
