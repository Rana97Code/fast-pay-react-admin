import { gql } from "@apollo/client";

// Delete project
export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Float!) {
    deleteProject(id: $id)
  }
`;

// Update project
export const UPDATE_PROJECT = gql`
  mutation EditProject($id: Float!, $input: UpdateProjectInput!) {
    editProject(id: $id, input: $input)
  }
`;

// create project
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: AddProjectInput!) {
    createProject(input: $input) {
      id
      name
      slug
      status
      location
      city
      type
      size
      image
      features
      amenities
      images
      locationCoordinates {
        lat
        lng
      }
    }
  }
`;

// DELETE CONTACT MESSAGE
export const DELETE_CONTACT_MSG_PROJECT = gql`
   mutation DeleteConnect($id: String!) {
    deleteConnect(id: $id)
  }
`;
