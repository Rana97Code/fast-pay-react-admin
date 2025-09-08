import { gql } from "@apollo/client";

// get all projects
export const GET_ALL_PROJECTS = gql`
  query {
    getAllProjects {
      id
      name
      slug
      status
      city
      location
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
      relatedProjects {
        title
        description
        imageUrl
        link
      }
    }
  }
`;

export const CONNECT_PROJECT_MSG = gql`
  query {
    getConnects {
      id
      name
      phone
      email
      message
      createdAt
    }
  }
`;
