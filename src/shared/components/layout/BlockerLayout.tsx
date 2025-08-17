"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Footer } from "../ui/Footer";
import { BlockerModal } from "../ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";
import { Header } from "../ui/Header";

export const BlockerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { profile, ready, save } = useUserProfile();
  const [editOpen, setEditOpen] = useState(false);

  if (!ready) return null;

  return (
    <Box minH="100dvh" display="flex" flexDir="column">
      <Header
        username={profile?.username}
        jobTitle={profile?.jobTitle}
        onEditInfo={() => setEditOpen(true)}
      />
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
