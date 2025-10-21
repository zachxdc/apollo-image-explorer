"use client";

import { Box, Text, AspectRatio } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { capitaliseFirstLetter } from "@/shared/utils/formatValue";
import { Colors } from "@/shared/constants/colors";

type Character = {
  id: string;
  name: string;
  status: string;
  image: string;
  species: string;
};

type CharacterCardProps = {
  character: Character;
};

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("characterId", character.id);
    router.push(`/information?${params.toString()}`, { scroll: false });
  };

  return (
    <Box
      as="article"
      w="full"
      maxW="300px"
      borderRadius="md"
      borderWidth="1px"
      overflow="hidden"
      cursor="pointer"
      _hover={{ boxShadow: "md" }}
      display="flex"
      flexDir="column"
      onClick={handleClick}
    >
      <AspectRatio ratio={1}>
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
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
  );
};

