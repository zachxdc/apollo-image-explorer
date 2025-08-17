import { gql } from "@apollo/client";

export const QUERY_CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;
