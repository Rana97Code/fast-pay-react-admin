import { gql } from "@apollo/client";

// land owner here banner
export const LAND_OWNER_HERO_BANNER = gql`
  mutation UpdateLandownerHeader(
    $title: String!
    $subtitle: String!
    $backgroundImage: String!
  ) {
    updateLandownerHeader(
      input: {
        title: $title
        subtitle: $subtitle
        backgroundImage: $backgroundImage
      }
    ) {
      title
      subtitle
      backgroundImage
    }
  }
`;

// land owner excellence slider
export const LAND_OWNER_EXCELENCE_SLIDER = gql`
  mutation CreateEssenceItem($input: CreateEssenceItemInput!) {
    createEssenceItem(input: $input) {
      id
      title
      icon
      description
    }
  }
`;

// land owner excelence slider delete
export const DELETE_EXCELENCE_SLIDER = gql`
  mutation DeleteEssenceItem($id: Int!) {
    deleteEssenceItem(id: $id)
  }
`;

// land owner slider update
export const LAND_OWNER_SLIDER_UPDATE = gql`
  mutation UpdateEssenceItem($input: UpdateEssenceItemInput!) {
    updateEssenceItem(input: $input) {
      id
      title
      icon
      description
    }
  }
`;

// create testimonial
export const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial($input: CreateTestimonialInput!) {
    createTestimonial(input: $input) {
      id
      title
      quote
      authorName
      authorPosition
      videoUrl
      thumbnailUrl
    }
  }
`;

// delete testimonial for land owner page
export const DELETE_TESTIMONIAL = gql`
  mutation DeleteTestimonial($id: String!) {
    deleteTestimonial(id: $id)
  }
`;

// update testimonial
export const UPDATE_TESTIMONIAL = gql`
  mutation updateTestimonial($id: String!, $input: UpdateTestimonialInput!) {
    updateTestimonial(id: $id, input: $input) {
      id
      title
      quote
      authorName
      authorPosition
      videoUrl
      thumbnailUrl
    }
  }
`;

// Delete customer venture from site
export const DELETE_VENTURE = gql`
  mutation DeleteJointVenture($id: String!) {
    deleteJointVenture(id: $id)
  }
`;
