"use client";

import { useState } from "react";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import { Footer } from "../ui/Footer";
import { BlockerModal } from "../ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";

export const BlockerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { profile, ready, save } = useUserProfile();
  const [editOpen, setEditOpen] = useState(false);

  if (!ready) return null;

  return (
    <Box minH="100dvh" display="flex" flexDir="column">
      <Box
        as="header"
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <HStack justify="space-between">
          <Text fontWeight="semibold">Apollo Image Explorer</Text>
          {profile && (
            <HStack>
              <Text fontSize="sm" color="gray.600">
                Username: {profile?.username} | Job Title: {profile?.jobTitle}{" "}
              </Text>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditOpen(true)}
              >
                Edit Profile
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
