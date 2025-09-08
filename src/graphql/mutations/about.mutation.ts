import { gql } from '@apollo/client';

export const UPDATE_ABOUT_HERO = gql`
  mutation UpdateAboutHero($input: AboutHeroInput!) {
    updateAboutHero(input: $input) {
      title
      backgroundImage
    }
  }
`;

// Query to fetch the milestone section
export const GET_MILESTONE_SECTION = gql`
  query GetMilestoneSection {
    getMilestoneSection {
      title
      items {
        id
        value
        label
      }
    }
  }
`;

export const ADD_MILESTONE_ITEM = gql`
  mutation AddMilestoneItem($input: MilestoneItemInput!) {
    addMilestoneItem(input: $input) {
      id
      value
      label
    }
  }
`;


export const UPDATE_MILESTONE_ITEM = gql`
  mutation UpdateMilestoneItem($id: Int!, $input: MilestoneItemInput!) {
  updateMilestoneItem(id: $id, input: $input) {
    id
    label
    value
  }
}

`;


export const DELETE_MILESTONE_ITEM = gql`
  mutation DeleteMilestoneItem($id: Int!) {
  deleteMilestoneItem(id: $id)
}

`;


export const ADD_NEW_COMPANY = gql`
  mutation addNewCompany($input: CompanyInput!) {
    addCompany(input: $input) {
      id
      name
      logo
      description
      phone
      website
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompany($id: Int!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
      name
      logo
      description
      phone
      website
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`;