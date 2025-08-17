"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  HStack,
  AspectRatio,
  Center,
  Spinner,
  ButtonGroup,
  IconButton,
  Pagination,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRequireProfile } from "@/hooks/use-require-profile";
import { QUERY_CHARACTERS } from "@/graphql/ricky-morty.gql";
import { CharacterModal } from "@/shared/components/ui/CharacterModal";
import { capitaliseFirstLetter } from "@/shared/utils/formatValue";
import { Colors } from "@/shared/constants/colors";

type Character = {
  id: string;
  name: string;
  status: string;
  image: string;
  species: string;
  gender: string;
};

type CharactersResp = {
  characters: {
    info: { pages: number; next: number | null; prev: number | null };
    results: Character[];
  };
};

const InformationPage = () => {
  const { profile, ready } = useRequireProfile("/blocker");
  const search = useSearchParams();
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const siblingCount = useBreakpointValue({ base: 0, md: 1, lg: 2 });

  const pageFromUrl = Number(search.get("page") || "1");
  const currentPage =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const { data, loading, error } = useQuery<CharactersResp>(QUERY_CHARACTERS, {
    variables: { page: currentPage },
    skip: !ready || !profile,
    fetchPolicy: "cache-first",
  });

  const totalPages = Number(data?.characters?.info?.pages) ?? null;

  useEffect(() => {
    const total = data?.characters?.info?.pages;
    if (total && currentPage > total) {
      router.replace(`/information?page=${total}`);
    }
  }, [data, currentPage, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const handlePageChange = useCallback(
    ({ page }: { page: number }) => {
      if (page !== currentPage) {
        router.replace(`/information?page=${page}`, { scroll: false });
      }
    },
    [currentPage, router]
  );

  if (!ready || !profile) {
    return (
      <Center minH="60vh">
        <Spinner size="lg" color={Colors.textSecondary} />
      </Center>
    );
  }

  return (
    <Box px={6} py={8} maxW="1600px" mx="auto">
      <HStack justify="space-between" mb={2}>
        <Heading size="lg">Information</Heading>
      </HStack>
      {error && (
        <Box color={Colors.error} mb={4}>
          Failed to load: {String(error.message ?? error)}
        </Box>
      )}
      <Box position="relative">
        {loading && (
          <Center minH="60vh">
            <Spinner size="lg" color={Colors.textSecondary} />
          </Center>
        )}
        <SimpleGrid
          justifyItems="center"
          columns={{ base: 2, md: 4, lg: 5 }}
          gap={4}
          aria-busy={loading ? "true" : "false"}
          pointerEvents={loading ? "none" : "auto"}
        >
          {(data?.characters?.results ?? []).map((character) => (
            <Box
              as="article"
              key={character.id}
              w="full"
              maxW="300px"
              borderRadius="md"
              borderWidth="1px"
              overflow="hidden"
              _hover={{ boxShadow: "md", cursor: "pointer" }}
              display="flex"
              flexDir="column"
              onClick={() => setActiveId(character.id)}
            >
              <AspectRatio ratio={1}>
                <Image
                  src={character.image}
                  alt={character.name}
                  objectFit="cover"
                  loading="lazy"
                  decoding="async"
                />
              </AspectRatio>
              <Box p={4}>
                <Text fontWeight="bold" title={character.name}>
                  {character.name}
                </Text>
                <Text fontSize="sm" color={Colors.textSecondary}>
                  Status: {capitaliseFirstLetter(character.status)}
                </Text>
                <Text fontSize="sm" color={Colors.textSecondary}>
                  Species: {capitaliseFirstLetter(character.species)}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <HStack justify="center" gap={2} mt={8}>
        {!loading && (
          <Pagination.Root
            count={totalPages}
            page={currentPage}
            pageSize={1}
            onPageChange={handlePageChange}
            siblingCount={siblingCount}
          >
            <ButtonGroup variant="outline" size="md">
              <Pagination.PrevTrigger asChild>
                <IconButton>Prev</IconButton>
              </Pagination.PrevTrigger>
              <Pagination.Context>
                {({ pages }) =>
                  pages.map((page, index) =>
                    page.type === "page" ? (
                      <Pagination.Item key={index} {...page} asChild>
                        <IconButton
                          variant={
                            page.value === currentPage ? "solid" : "outline"
                          }
                        >
                          {page.value}
                        </IconButton>
                      </Pagination.Item>
                    ) : (
                      <Pagination.Ellipsis
                        key={`ellipsis-${index}`}
                        index={index}
                      >
                        &#8230;
                      </Pagination.Ellipsis>
                    )
                  )
                }
              </Pagination.Context>
              <Pagination.NextTrigger asChild>
                <IconButton>Next</IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        )}
      </HStack>
      <CharacterModal
        id={activeId}
        open={!!activeId}
        onClose={() => setActiveId(null)}
      />
    </Box>
  );
};

export default InformationPage;
