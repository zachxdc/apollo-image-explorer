"use client";

import { Box, Text } from "@chakra-ui/react";

export const Footer: React.FC = () => (
  <Box as="footer" bg="gray.800" color="white" py={6} textAlign="center">
    <Text fontSize="sm">
      Leonardo Web Challenge v3.5 © {new Date().getFullYear()}
    </Text>
  </Box>
);
