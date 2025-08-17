"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserProfile = { username: string; jobTitle: string } | null;

type Ctx = {
  profile: UserProfile;
  ready: boolean;
  save: (username: string, jobTitle: string) => void;
  reset: () => void;
};

const KEY = "ricky-morty-user";
const C = createContext<Ctx | null>(null);

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<UserProfile>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (profile) localStorage.setItem(KEY, JSON.stringify(profile));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [profile]);

  const save = (username: string, jobTitle: string) =>
    setProfile({ username: username.trim(), jobTitle: jobTitle.trim() });
  const reset = () => setProfile(null);

  return (
    <C.Provider value={{ profile, ready, save, reset }}>{children}</C.Provider>
  );
};

export const useUserProfile = () => {
  const ctx = useContext(C);
  if (!ctx)
    throw new Error(
      "useUserProfile must be used within <UserProfileProvider />"
    );
  return ctx;
};
