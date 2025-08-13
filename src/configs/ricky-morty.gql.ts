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
        image
        species
        gender
      }
    }
  }
`;
