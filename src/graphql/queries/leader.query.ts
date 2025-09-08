import { gql } from '@apollo/client';

export const GET_LEADER_HERO = gql`
  query GetLeaderHero {
    getLeaderHero {
      title
      backgroundImage
    }
  }
`;

export const GET_LEADERS_QUERY = gql`
  query getLeaderTeam {
    getLeaderTeam {
      id
      name
      title
      imageUrl
    }
  }
`;

// GraphQL Query to fetch founder info
export const GET_FOUNDER_INFO = gql`
  query {
    getFounderInfo {
      name
      title
      description
      imageUrl
    }
  }
`;

// Query to get all recognitions
export const GET_RECOGNITIONS_QUERY = gql`
  query {
  getRecognitions {
    id
    src
    name
    description
  }
}

`;