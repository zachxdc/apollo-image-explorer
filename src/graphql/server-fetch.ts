/**
 * Server-side GraphQL fetch utility for Next.js Server Components
 * Leverages Next.js 15 caching capabilities
 */

const GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

type GraphQLResponse<T = unknown> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type FetchOptions = {
  /**
   * Next.js cache option
   * - 'force-cache': Cache indefinitely (default)
   * - 'no-store': Never cache
   */
  cache?: RequestCache;
  /**
   * Revalidate interval in seconds
   */
  revalidate?: number;
  /**
   * Tags for on-demand revalidation
   */
  tags?: string[];
};

/**
 * Fetch GraphQL data from server component
 */
export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<T> {
  const { cache = "force-cache", revalidate, tags } = options;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL fetch failed: ${response.statusText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(
      `GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`
    );
  }

  if (!json.data) {
    throw new Error("No data returned from GraphQL");
  }

  return json.data;
}

// Export query strings for server components
export const QUERY_CHARACTERS = `
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

