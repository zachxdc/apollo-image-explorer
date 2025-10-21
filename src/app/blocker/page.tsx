"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BlockerModal } from "@/shared/components/ui/BlockerModal";
import { useUserProfile } from "@/contexts/user-profile";

const BlockerPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, ready, updateProfile } = useUserProfile();

  useEffect(() => {
    if (!ready) return;
    // redirect only once when profile exists and not already on /information
    if (profile && pathname !== "/information") {
      router.replace("/information");
    }
  }, [ready, profile, pathname]); // router is stable in Next.js 15, intentionally excluded

  // not ready → show nothing
  if (!ready) return null;

  // already have profile → redirect handled above, render nothing
  if (profile) return null;

  // no profile → force user to fill info
  return <BlockerModal onSubmit={updateProfile} />;
};

export default BlockerPage;
