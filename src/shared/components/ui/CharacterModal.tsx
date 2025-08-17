"use client";
import {
  Dialog,
  Image,
  Text,
  Box,
  VStack,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { QUERY_CHARACTER } from "@/graphql/ricky-morty.gql";
import { useEffect, useState } from "react";
import { capitaliseFirstLetter } from "@/shared/utils/formatValue";
import { Colors } from "@/shared/constants/colors";

export function CharacterModal({
  id,
  open,
  onClose,
  fallback,
}: {
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
}) {
  const { data, loading, error } = useQuery(QUERY_CHARACTER, {
    variables: { id: id! },
    skip: !open || !id,
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-and-network",
    returnPartialData: true,
  });

  const [epLimit, setEpLimit] = useState(5);

  useEffect(() => {
    setEpLimit(5);
  }, [id]);

  const character = data?.character ?? (open ? fallback : null);

  const fields: Array<[label: string, value?: string | null]> = [
    ["Status", character?.status],
    ["Species", character?.species],
    ["Type", character?.type],
    ["Gender", character?.gender],
    ["Origin", character?.origin?.name],
    ["Location", character?.location?.name],
  ];

  const isValidValue = (v?: string | null, field?: string) => {
    if (field === "status") {
      return !!v;
    }
    return !!v && v.toLowerCase() !== "unknown";
  };

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value?: string | null;
  }) =>
    isValidValue(value, label.toLowerCase()) ? (
      <Text>
        <Text as="span" fontWeight="semibold">
          {label}:{" "}
        </Text>
        {label === "Status" ? capitaliseFirstLetter(value) : value}{" "}
      </Text>
    ) : null;

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop bg={Colors.overlayBg} />
      <Dialog.Positioner alignItems="center" justifyContent="center">
        <Dialog.Content p={4} w="full" maxW="380px" maxH="80vh">
          <Dialog.Header>
            <Dialog.Title>{character?.name ?? "Details"}</Dialog.Title>
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
            ) : !character ? (
              <Text color={Colors.textSecondary}>Loading…</Text>
            ) : (
              <VStack gap={4} align="stretch">
                {isValidValue(character.image) && (
                  <Box textAlign="center">
                    <Image
                      src={character.image!}
                      alt={character.name ?? ""}
                      objectFit="contain"
                      maxW="300px"
                      borderRadius="md"
                      mx="auto"
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
                          Episodes({character.episode.length}):
                        </Text>
                        <Box as="ul" pl={4} m={0} textAlign="left">
                          {character.episode.slice(0, epLimit).map((e: any) => (
                            <Box as="li" key={e.id} listStyleType="disc">
                              {e.episode} — {e.name} ({e.air_date})
                            </Box>
                          ))}
                        </Box>
                        {epLimit < character.episode.length && (
                          <Box display="flex" justifyContent="center" pt={4}>
                            <Button
                              onClick={() =>
                                setEpLimit((n) =>
                                  Math.min(n + 10, character.episode.length)
                                )
                              }
                            >
                              View more
                            </Button>
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
}
