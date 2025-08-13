"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlockerModal } from "@/components/ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";

const BlockerPage = () => {
  const router = useRouter();
  const { profile, ready, save } = useUserProfile();

  useEffect(() => {
    if (!ready) return;
    if (profile) router.replace("/information");
  }, [ready, profile, router]);

  if (!ready || profile) return null;

  return <BlockerModal onSubmit={save} />;
};

export default BlockerPage;
