"use client";

import { Colors } from "@/shared/constants/colors";
import { Box, Text } from "@chakra-ui/react";

export const Footer: React.FC = () => (
  <Box
    as="footer"
    bg={Colors.overlayBg}
    color={Colors.textWhite}
    py={6}
    textAlign="center"
  >
    <Text fontSize="sm">
      © {new Date().getFullYear()} Leonardo Web Team Challenge v3.5
    </Text>
  </Box>
);
