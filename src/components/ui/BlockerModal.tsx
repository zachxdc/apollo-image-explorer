"use client";

import { useEffect, useState } from "react";
import { VStack, Input, Button, Text, Dialog } from "@chakra-ui/react";

type Props = {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (u: string, j: string) => void;
  defaultUsername?: string;
  defaultJobTitle?: string;
  contentMaxW?: string | number;
};

export const BlockerModal: React.FC<Props> = ({
  open = true,
  onClose,
  onSubmit,
  defaultUsername = "",
  defaultJobTitle = "",
}) => {
  const [username, setUsername] = useState(defaultUsername);
  const [job, setJob] = useState(defaultJobTitle);

  useEffect(() => {
    setUsername(defaultUsername);
    setJob(defaultJobTitle);
  }, [defaultUsername, defaultJobTitle]);

  const canSubmit = username.trim() && job.trim();
  const submit = () => {
    if (!onSubmit || !canSubmit) return;
    onSubmit(username, job);
    onClose?.();
  };

  return (
    <Dialog.Root
      open={!!open}
      onOpenChange={(e) => {
        if (!e.open) onClose?.();
      }}
    >
      <Dialog.Backdrop bg="blackAlpha.600" />
      <Dialog.Positioner alignItems="center">
        <Dialog.Content
          bg="white"
          color="black"
          w="full"
          maxW="sm"
          borderRadius="md"
          boxShadow="lg"
          p={4}
        >
          <Dialog.Header>
            <Dialog.Title textAlign="center">
              {defaultUsername || defaultJobTitle
                ? "Edit your info"
                : "Welcome"}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <VStack alignItems="stretch" gap={3}>
              <Text fontSize="sm" textAlign="center">
                Enter your username & job title to continue.
              </Text>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Job Title"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </VStack>
          </Dialog.Body>
          <Dialog.Footer gap="2">
            <Button onClick={submit} disabled={!canSubmit} mr={2}>
              {defaultUsername || defaultJobTitle ? "Save" : "Continue"}
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
