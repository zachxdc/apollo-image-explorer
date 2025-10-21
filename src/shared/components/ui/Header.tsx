"use client";

import { Colors } from "@/shared/constants/colors";
import { Box, HStack, Text, Button, Menu, Link } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  appName?: string;
  username?: string;
  jobTitle?: string;
  onEditInfo?: () => void;
};

// Client component for user menu interaction
const UserMenu: React.FC<{
  username: string;
  jobTitle?: string;
  onEditInfo?: () => void;
}> = ({ username, jobTitle, onEditInfo }) => {
  const onSignOut = useCallback(() => {
    localStorage.removeItem("ricky-morty-user");
    window.location.reload();
  }, []);

  return (
    <Menu.Root positioning={{ placement: "bottom-end", gutter: 8 }}>
      <Menu.Trigger asChild>
        <Button variant="outline">
          <Text>{username}</Text>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content borderRadius="xl" boxShadow="lg" p={2}>
          <Menu.Arrow />
          {jobTitle && (
            <Box p={2}>
              <Text fontWeight="semibold">{username}</Text>
              <Text color={Colors.textSecondary} fontSize="sm">
                {jobTitle}
              </Text>
            </Box>
          )}
          {jobTitle && <Menu.Separator />}
          <Menu.Item value="edit-info" onClick={onEditInfo}>
            Edit info
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="sign-out" color={Colors.error} onClick={onSignOut}>
            Sign out
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export const Header: React.FC<Props> = ({
  appName = "Apollo Image Explorer",
  username,
  jobTitle,
  onEditInfo,
}) => {
  return (
    <Box as="header" px={4} py={3} borderBottomWidth="1px">
      <HStack justify="space-between">
        <Link href="/" fontWeight="bold" textDecoration="none">
          {appName}
        </Link>
        {username && (
          <UserMenu
            username={username}
            jobTitle={jobTitle}
            onEditInfo={onEditInfo}
          />
        )}
      </HStack>
    </Box>
  );
};
