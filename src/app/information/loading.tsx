import { Box, Center, Spinner } from "@chakra-ui/react";
import { Colors } from "@/shared/constants/colors";

export default function Loading() {
  return (
    <Box px={6} py={8} maxW="1600px" mx="auto">
      <Center minH="60vh">
        <Spinner size="lg" color={Colors.textSecondary} />
      </Center>
    </Box>
  );
}

