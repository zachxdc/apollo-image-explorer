"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/contexts/user-profile";

export const useRequireProfile = (fallback: string) => {
  const router = useRouter();
  const { profile, ready } = useUserProfile();

  useEffect(() => {
    if (!ready) return;
    if (!profile) router.replace(fallback);
  }, [ready, profile, router, fallback]);

  return { profile, ready };
};
