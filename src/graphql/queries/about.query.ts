import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query {
    getCompanies {
      id
      name
      logo
      description
      phone
      website
    }
  }
`;

export const GET_MANAGEMENT_TEAM = gql`
  query {
    getManagementTeam {
      id
      name
      title
      imageUrl
    }
  }
`;



// **Query to get all excellence items**
export const GET_EXCELLENCE_ITEMS = gql`
  query {
    getExcellenceItems {
      id
      title
      description
      icon
    }
  }
`;
