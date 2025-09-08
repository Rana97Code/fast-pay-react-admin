import { gql } from "@apollo/client";

export const GET_MEDIA_CENTER_HERO = gql`
  query {
    getMediaHeader {
      title
      subtitle
      backgroundImage
    }
  }
`;

export const GET_ALL_MEDIA_CENTER = gql`
  query {
    getAllMediaCenterData {
      id
      title
      date
      category
      imgSrc
      url
    }
  }
`;


