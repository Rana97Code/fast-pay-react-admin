import { gql } from '@apollo/client';

export const UPDATE_LEADER_HERO = gql`
  mutation UpdateLeaderHero($input: LeaderHeroInput!) {
    updateLeaderHero(input: $input) {
      title
      backgroundImage
    }
  }
`;

export const ADD_LEADER_MUTATION = gql`
  mutation addLeaderToTeam($input: TeamMemberInput!) {
    addLeaderToTeam(input: $input) {
      id
      name
      title
      imageUrl
    }
  }
`;

export const UPDATE_LEADER_MUTATION = gql`
  mutation updateLeaderOfTeam($id: Int!, $input: TeamMemberInput!) {
    updateLeaderOfTeam(id: $id, input: $input) {
      id
      name
      title
      imageUrl
    }
  }
`;

export const DELETE_LEADER_MUTATION = gql`
  mutation deleteLeaderFromTeam($id: Int!) {
    deleteLeaderFromTeam(id: $id)
  }
`;

// GraphQL Mutation to update founder info
export const UPDATE_FOUNDER_INFO = gql`
  mutation UpdateFounderInfo($input: FounderInput!) {
    updateFounderSection(input: $input) {
      name
      title
      description
      imageUrl
    }
  }
`;


// Mutation to add a recognition
export const ADD_RECOGNITION_MUTATION = gql`
 mutation AddRecognition($input: RecognitionInput!) {
  addRecognition(input: $input) {
    id
    src
    name
    description
  }
}
`;

// Mutation to update a recognition
export const UPDATE_RECOGNITION_MUTATION = gql`
  mutation UpdateRecognition($id: Int!, $input: RecognitionInput!) {
  updateRecognition(id: $id, input: $input) {
    id
    src
    name
    description
  }
}

`;

// Mutation to delete a recognition
export const DELETE_RECOGNITION_MUTATION = gql`
  mutation DeleteRecognition($id: Int!) {
  deleteRecognition(id: $id)
}
`;
