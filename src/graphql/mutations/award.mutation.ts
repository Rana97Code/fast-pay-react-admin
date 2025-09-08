import { gql } from "@apollo/client";

// Mutation to update award info
export const UPDATE_AWARD_INFO = gql`
  mutation UpdateAwardInfo($input: AwardInfoInput!) {
    updateAwardInfo(input: $input) {
      title
      backgroundImage
    }
  }
`;


// Mutation to add a new award image
export const ADD_AWARD_IMAGE = gql`
  mutation AddAwardImage($input: AwardImageInput!) {
    addAwardImage(input: $input) {
      id
      src
      name
      description
    }
  }
`;

// Mutation to update an existing award image
export const UPDATE_AWARD_IMAGE = gql`
  mutation UpdateAwardImage($id: Int!, $input: AwardImageInput!) {
    updateAwardImage(id: $id, input: $input) {
      id
      src
      name
      description
    }
  }
`;


// Mutation to delete an award image
export const DELETE_AWARD_IMAGE = gql`
  mutation DeleteAwardImage($id: Int!) {
    deleteAwardImage(id: $id) {
      id
      src
      name
      description
    }
  }
`;

export const ADD_MANAGEMENT_TEAM = gql`
  mutation addManagementTeam($input: TeamMemberInput!) {
    addManagementTeam(input: $input) {
      id
      name
      title
      imageUrl
    }
  }
`;

export const UPDATE_MANAGEMENT_TEAM = gql`
  mutation updateManagementTeam($id: Int!, $input: TeamMemberInput!) {
    updateManagementTeam(id: $id, input: $input) {
      id
      name
      title
      imageUrl
    }
  }
`;

export const DELETE_MANAGEMENT_TEAM = gql`
  mutation deleteManagementTeam($id: Int!) {
    deleteManagementTeam(id: $id)
  }
`;

// **Mutation to add a new excellence item**
export const ADD_EXCELLENCE_ITEM = gql`
  mutation addExcellenceItem($input: ExcellenceItemInput!) {
    addExcellenceItem(input: $input) {
      id
      title
      description
      icon
    }
  }
`;

// **Mutation to update excellence items**
export const UPDATE_EXCELLENCE_ITEMS = gql`
  mutation updateExcellenceItems($id: Int!, $input: ExcellenceItemInput!) {
  updateExcellenceItems(id: $id, input: $input) {
    id
    title
    description
    icon
  }
}

`;

// **Mutation to delete an excellence item by ID**
export const DELETE_EXCELLENCE_ITEM = gql`
  mutation deleteExcellenceItem($id: Int!) {
  deleteExcellenceItem(id: $id)
}
`;
