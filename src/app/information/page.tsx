"use client";

import { useState, useEffect, useRef } from "react";
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

  const pageFromUrl = Number(search.get("page") || "1");
  const page =
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const { data, loading, error } = useQuery<CharactersResp>(QUERY_CHARACTERS, {
    variables: { page },
    skip: !ready || !profile,
    fetchPolicy: "cache-first",
  });

  const totalPagesRef = useRef<number | null>(null);
  useEffect(() => {
    const p = data?.characters?.info?.pages;
    if (typeof p === "number") totalPagesRef.current = p;
  }, [data]);

  useEffect(() => {
    const total = data?.characters?.info?.pages;
    if (total && page > total) {
      router.replace(`/information?page=${total}`);
    }
  }, [data, page, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const [activeId, setActiveId] = useState<string | null>(null);

  if (!ready) return null;

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
          <Center py={400}>
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
        <Button
          variant="outline"
          onClick={() =>
            router.replace(
              `/information?page=${Math.max(
                1,
                (data?.characters?.info?.prev ?? page - 1) || 1
              )}`,
              { scroll: false }
            )
          }
          disabled={!data?.characters?.info?.prev || loading}
        >
          Prev
        </Button>
        <Text>
          Page {page}
          {totalPagesRef.current ? ` / ${totalPagesRef.current}` : ""}
        </Text>
        <Button
          variant="outline"
          onClick={() =>
            router.replace(
              `/information?page=${data?.characters?.info?.next ?? page + 1}`,
              { scroll: false }
            )
          }
          disabled={!data?.characters?.info?.next || loading}
        >
          Next
        </Button>
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
