import { gql } from "@apollo/client";

// create service
export const CREATE_SERVICE = gql`
  mutation CreateService($createServiceInput: CreateServiceInput!) {
    createService(createServiceInput: $createServiceInput) {
      id
      title
      description
      imageUrl
      link
      createdAt
    }
  }
`;

// delete service
export const DELETE_SERVICE = gql`
  mutation DeleteService($id: String!) {
    deleteService(id: $id) {
      id
      title
      description
      imageUrl
      link
      createdAt
    }
  }
`;

// update service
export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: String!
    $updateServiceInput: UpdateServiceInput!
  ) {
    updateService(id: $id, updateServiceInput: $updateServiceInput) {
      id
      title
      description
      imageUrl
      link
      createdAt
    }
  }
`;
