"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/contexts/user-profile";

export default function Page() {
  const router = useRouter();
  const { profile, ready } = useUserProfile();

  useEffect(() => {
    if (!ready) return;
    router.replace(profile ? "/information" : "/blocker");
  }, [ready, profile, router]);

  return null;
}
