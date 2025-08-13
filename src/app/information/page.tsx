"use client";

import { useMemo, useState } from "react";
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
  Dialog,
  VStack,
} from "@chakra-ui/react";
import { useRequireProfile } from "@/hooks/use-require-profile";
import { QUERY_CHARACTERS } from "@/configs/ricky-morty.gql";

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
    skip: !profile,
    fetchPolicy: "cache-first",
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(() => {
    const list = data?.characters?.results ?? [];
    return list.find((x) => x.id === activeId) ?? null;
  }, [data, activeId]);

  if (!ready) return null;

  const gotoPage = (p: number) => router.replace(`/information?page=${p}`);

  return (
    <Box px={6} py={8}>
      <HStack justify="space-between" mb={2}>
        <Heading size="lg">Information</Heading>
      </HStack>
      {error && (
        <Box color="red.600" mb={4}>
          Failed to load: {String(error.message ?? error)}
        </Box>
      )}
      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 5 }}
        gap={4}
        aria-busy={loading ? "true" : "false"}
      >
        {(data?.characters?.results ?? []).map((ch) => (
          <Box
            key={ch.id}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            _hover={{ boxShadow: "md", cursor: "pointer" }}
            onClick={() => setActiveId(ch.id)}
          >
            <Image
              src={ch.image}
              alt={ch.name}
              objectFit="cover"
              loading="lazy"
            />
            <Box p={2}>
              <Text fontWeight="semibold" title={ch.name}>
                {ch.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {ch.species} · {ch.gender}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <HStack justify="center" gap={2} mt={6}>
        <Button
          variant="outline"
          onClick={() =>
            gotoPage(
              Math.max(1, (data?.characters?.info?.prev ?? page - 1) || 1)
            )
          }
          disabled={!data?.characters?.info?.prev}
        >
          Prev
        </Button>
        <Text>
          Page {page} / {data?.characters?.info?.pages ?? "…"}
        </Text>
        <Button
          variant="outline"
          onClick={() => gotoPage(data?.characters?.info?.next ?? page + 1)}
          disabled={!data?.characters?.info?.next}
        >
          Next
        </Button>
      </HStack>

      <Dialog.Root
        open={!!active}
        onOpenChange={(e) => {
          if (!e.open) setActiveId(null);
        }}
      >
        <Dialog.Backdrop bg="blackAlpha.750" />
        <Dialog.Positioner alignItems="center" justifyContent="center">
          <Dialog.Content p={4}>
            <Dialog.Header display="flex" justifyContent="center">
              <Dialog.Title>{active?.name ?? "Details"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              {active ? (
                <VStack align="center" gap={4}>
                  <Image
                    src={active.image}
                    alt={active.name}
                    objectFit="contain"
                    borderRadius="md"
                  />
                  <Box textAlign="center">
                    <Text>Status: {active.status}</Text>
                    <Text>Species: {active.species}</Text>
                    <Text>Gender: {active.gender}</Text>
                  </Box>
                </VStack>
              ) : (
                <Text fontSize="sm" color="gray.600">
                  Loading…
                </Text>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </Box>
  );
};

export default InformationPage;
