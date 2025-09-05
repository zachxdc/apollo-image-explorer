"use client";

import React, { useState, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { Footer } from "../ui/Footer";
import { BlockerModal } from "../ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";
import { Header } from "../ui/Header";

export const BlockerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { profile, ready, updateProfile } = useUserProfile(); // save -> updateProfile
  const [editOpen, setEditOpen] = useState(false);

  // stable handlers to avoid re-renders in children
  const openEdit = useCallback(() => setEditOpen(true), []);
  const closeEdit = useCallback(() => setEditOpen(false), []);
  const submitEdit = useCallback(
    (u: string, j: string) => {
      updateProfile(u, j);
      setEditOpen(false);
    },
    [updateProfile]
  );

  if (!ready) return null;

  const username = profile?.username ?? "";
  const jobTitle = profile?.jobTitle ?? "";

  return (
    <Box minH="100dvh" display="flex" flexDir="column">
      <Header
        username={username || undefined}
        jobTitle={jobTitle || undefined}
        onEditInfo={openEdit}
      />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer />
      {editOpen && (
        <BlockerModal
          open
          onClose={closeEdit}
          onSubmit={submitEdit}
          defaultUsername={username}
          defaultJobTitle={jobTitle}
        />
      )}
    </Box>
  );
};
