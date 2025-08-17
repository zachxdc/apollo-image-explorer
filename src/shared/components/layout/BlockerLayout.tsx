"use client";

import { useState } from "react";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import { Footer } from "../ui/Footer";
import { BlockerModal } from "../ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";
import { Colors } from "@/shared/constants/colors";

export const BlockerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { profile, ready, save } = useUserProfile();
  const [editOpen, setEditOpen] = useState(false);

  if (!ready) return null;

  return (
    <Box minH="100dvh" display="flex" flexDir="column">
      <Box as="header" px={4} py={3} borderBottomWidth="1px">
        <HStack justify="space-between">
          <Text fontWeight="bold">Apollo Image Explorer</Text>
          {profile && (
            <HStack>
              <Text fontSize="sm" color={Colors.textSecondary}>
                {profile?.username} | {profile?.jobTitle}{" "}
              </Text>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditOpen(true)}
              >
                Edit Info
              </Button>
            </HStack>
          )}
        </HStack>
      </Box>

      <Box as="main" flex="1">
        {children}
      </Box>

      <Footer />

      {profile && (
        <BlockerModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={(u, j) => save(u, j)}
          defaultUsername={profile.username}
          defaultJobTitle={profile.jobTitle}
        />
      )}
    </Box>
  );
};
