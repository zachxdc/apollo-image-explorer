"use client";

import { useEffect, useState, useCallback } from "react";
import { VStack, Input, Button, Dialog, Field } from "@chakra-ui/react";
import { Colors } from "@/shared/constants/colors";

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
  const [jobTitle, setJobTitle] = useState(defaultJobTitle);

  // keep state in sync with default values
  useEffect(() => {
    setUsername(defaultUsername);
    setJobTitle(defaultJobTitle);
  }, [defaultUsername, defaultJobTitle]);

  const MAX_USERNAME = 15;
  const MAX_JOB_TITLE = 50;

  const isEditing = Boolean(defaultUsername || defaultJobTitle);
  const canSubmit = username.trim().length > 0 && jobTitle.trim().length > 0;

  // stable handlers
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
    []
  );

  const handleJobTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setJobTitle(e.target.value),
    []
  );

  const handleOpenChange = useCallback(
    (e: { open: boolean }) => {
      if (!e.open) onClose?.();
    },
    [onClose]
  );

  const handleSubmit = useCallback(() => {
    if (!onSubmit || !canSubmit) return;
    onSubmit(username, jobTitle);
    onClose?.();
  }, [onSubmit, onClose, username, jobTitle, canSubmit]);

  return (
    <Dialog.Root open={!!open} onOpenChange={handleOpenChange}>
      <Dialog.Backdrop bg={Colors.overlayBg} />
      <Dialog.Positioner alignItems="center">
        <Dialog.Content
          w="full"
          maxW="sm"
          borderRadius="md"
          boxShadow="lg"
          p={4}
        >
          <Dialog.Header>
            <Dialog.Title>
              {isEditing ? "Edit your info" : "Enter your info to continue"}
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <VStack alignItems="stretch" gap={4}>
              <Field.Root>
                <Field.Label>Username*</Field.Label>
                <Input
                  value={username}
                  onChange={handleUsernameChange}
                  maxLength={MAX_USERNAME}
                />
                {username.length === MAX_USERNAME && (
                  <Field.HelperText color={Colors.textSecondary}>
                    Maximum {MAX_USERNAME} characters reached
                  </Field.HelperText>
                )}
              </Field.Root>
              <Field.Root>
                <Field.Label>Job Title*</Field.Label>
                <Input
                  value={jobTitle}
                  onChange={handleJobTitleChange}
                  maxLength={MAX_JOB_TITLE}
                />
                {jobTitle.length === MAX_JOB_TITLE && (
                  <Field.HelperText color={Colors.textSecondary}>
                    Maximum {MAX_JOB_TITLE} characters reached
                  </Field.HelperText>
                )}
              </Field.Root>
            </VStack>
          </Dialog.Body>
          <Dialog.Footer gap={2}>
            <Button onClick={handleSubmit} disabled={!canSubmit} mr={2}>
              {isEditing ? "Save" : "Continue"}
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
