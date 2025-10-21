"use client";

import {
  Dialog,
  Text,
  Box,
  VStack,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { QUERY_CHARACTER } from "@/graphql/ricky-morty.gql";
import { useEffect, useState, useCallback, useMemo } from "react";
import { capitaliseFirstLetter } from "@/shared/utils/formatValue";
import { Colors } from "@/shared/constants/colors";

type Episode = {
  id: string;
  episode: string;
  name: string;
  air_date: string;
};

type CharacterModalProps = {
  id: string | null;
  open: boolean;
  onClose: () => void;
  fallback?: Partial<{
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
  }>;
};

// Moved out to avoid re-creating every render
const InfoItem: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => {
  if (!value || value.toLowerCase() === "unknown") return null;
  return (
    <Text>
      <Text as="span" fontWeight="semibold">
        {label}:{" "}
      </Text>
      {label === "Status" ? capitaliseFirstLetter(value) : value}
    </Text>
  );
};

export const CharacterModal: React.FC<CharacterModalProps> = ({
  id,
  open,
  onClose,
  fallback,
}) => {
  const { data, loading, error } = useQuery(QUERY_CHARACTER, {
    variables: { id: id! },
    skip: !open || !id,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
    returnPartialData: true,
  });

  const [epLimit, setEpLimit] = useState(5);

  // Reset episode limit when id changes
  useEffect(() => setEpLimit(5), [id]);

  const character = data?.character ?? (open ? fallback : null);

  // Memoize fields to avoid re-allocating on each render
  const fields = useMemo(
    () =>
      [
        ["Status", character?.status],
        ["Species", character?.species],
        ["Type", character?.type],
        ["Gender", character?.gender],
        ["Origin", character?.origin?.name],
        ["Location", character?.location?.name],
      ] as Array<[string, string | null | undefined]>,
    [character]
  );

  // stable handlers
  const handleOpenChange = useCallback(
    (e: { open: boolean }) => {
      if (!e.open) onClose();
    },
    [onClose]
  );

  const handleViewMore = useCallback(() => {
    if (character?.episode) {
      setEpLimit((n) => Math.min(n + 10, character.episode.length));
    }
  }, [character?.episode]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Backdrop bg={Colors.overlayBg} />
      <Dialog.Positioner alignItems="center" justifyContent="center">
        <Dialog.Content p={4} w="full" maxW="380px" maxH="80vh">
          <Dialog.Header>
            <Dialog.Title>{character?.name}</Dialog.Title>
            <Dialog.CloseTrigger
              as="button"
              position="absolute"
              top={6}
              right={6}
              aria-label="close"
              fontSize="xl"
              cursor="pointer"
            >
              ✕
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body overflowY="auto">
            {error ? (
              <Text color={Colors.error}>Failed to load details.</Text>
            ) : loading || !character ? (
              <Center minH="20vh">
                <Spinner size="lg" color={Colors.textSecondary} />
              </Center>
            ) : (
              <VStack gap={4} align="stretch">
                {character.image && (
                  <Box textAlign="center" position="relative" height="300px">
                    <Image
                      src={character.image}
                      alt={character.name ?? ""}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="380px"
                    />
                  </Box>
                )}
                <Box>
                  {fields.map(([label, value]) => (
                    <InfoItem key={label} label={label} value={value} />
                  ))}
                  {Array.isArray(character.episode) &&
                    character.episode.length > 0 && (
                      <Box>
                        <Text fontWeight="semibold" mb={1}>
                          Episodes ({character.episode.length}):
                        </Text>
                        <Box as="ul" pl={4} m={0} textAlign="left">
                          {character.episode
                            .slice(0, epLimit)
                            .map((e: Episode) => (
                              <Box as="li" key={e.id} listStyleType="disc">
                                {e.episode} — {e.name} ({e.air_date})
                              </Box>
                            ))}
                        </Box>
                        {epLimit < character.episode.length && (
                          <Box display="flex" justifyContent="center" pt={4}>
                            <Button onClick={handleViewMore}>View more</Button>
                          </Box>
                        )}
                      </Box>
                    )}
                </Box>
              </VStack>
            )}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
