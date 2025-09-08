import { gql } from "@apollo/client";

// update media center hero
export const UPDATE_MEDIA_CENTER_HERO = gql`
  mutation UpdateMediaHeader($input: UpdateMediaHeaderInput!) {
    updateMediaHeader(input: $input) {
      title
      subtitle
      backgroundImage
    }
  }
`;

// create media center for dashboard
export const CREATE_MEDIA_CENTER = gql`
  mutation createMedia($input: CreateMediaInfoInput!) {
    createMediaInfo(input: $input) {
      id
      title
      date
      category
      imgSrc
      url
    }
  }
`;

// Delete
export const DELETE_MEDIA_CENTER = gql`
  mutation DeleteMediaCenter($id: Float!) {
    deleteMediaCenter(id: $id)
  }
`;

// update
export const UPDATE_MEDIA_CENTER = gql`
  mutation updateMedia($id: Int!, $input: UpdateMediaInfoInput!) {
    updateMediaInfo(id: $id, input: $input) {
      id
      title
      date
      category
      imgSrc
      url
    }
  }
`;
