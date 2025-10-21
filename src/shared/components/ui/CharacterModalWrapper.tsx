"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CharacterModal } from "./CharacterModal";
import { useCallback } from "react";

export const CharacterModalWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeId = searchParams.get("characterId");

  const handleClose = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("characterId");
    const newUrl = params.toString()
      ? `/information?${params.toString()}`
      : "/information";
    router.push(newUrl, { scroll: false });
  }, [searchParams, router]);

  return <CharacterModal id={activeId} open={!!activeId} onClose={handleClose} />;
};

