import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Box, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import { fetchGraphQL, QUERY_CHARACTERS } from "@/graphql/server-fetch";
import { CharacterCard } from "@/shared/components/ui/CharacterCard";
import { PaginationControls } from "@/shared/components/ui/PaginationControls";
import { CharacterModalWrapper } from "@/shared/components/ui/CharacterModalWrapper";
import { Colors } from "@/shared/constants/colors";

type Character = {
  id: string;
  name: string;
  status: string;
  image: string;
  species: string;
};

type CharactersData = {
  characters: {
    info: { pages: number; next: number | null; prev: number | null };
    results: Character[];
  };
};

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return {
    title: page === 1 ? "Information" : `Information - Page ${page}`,
    description: `Browse Rick and Morty characters - Page ${page}`,
  };
}

async function InformationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const pageFromUrl = Number(params.page || "1");
  const currentPage =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  // Fetch data on the server
  let data: CharactersData | null = null;
  let error: string | null = null;

  try {
    data = await fetchGraphQL<CharactersData>(QUERY_CHARACTERS, {
      page: currentPage,
    });
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load characters";
  }

  const totalPages = data?.characters?.info?.pages ?? 0;
  const characters = data?.characters?.results ?? [];

  // If page number exceeds total, redirect to last page
  if (totalPages > 0 && currentPage > totalPages) {
    redirect(`/information?page=${totalPages}`);
  }

  return (
    <Box px={6} py={8} maxW="1600px" mx="auto">
      <HStack justify="space-between" mb={2}>
        <Heading size="lg">Information</Heading>
      </HStack>

      {error && (
        <Box color={Colors.error} mb={4}>
          Failed to load: {error}
        </Box>
      )}

      <SimpleGrid
        justifyItems="center"
        columns={{ base: 2, md: 4, lg: 5 }}
        gap={4}
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </SimpleGrid>

      {totalPages > 0 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}

      <CharacterModalWrapper />
    </Box>
  );
}

export default InformationPage;
