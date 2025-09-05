"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

export type UserProfile = { username: string; jobTitle: string } | null;

type UserProfileContextType = {
  profile: UserProfile;
  ready: boolean;
  updateProfile: (username: string, jobTitle: string) => void;
  clearProfile: () => void;
};

const STORAGE_KEY = "ricky-morty-user";
const UserProfileContext = createContext<UserProfileContextType | null>(null);

// Helper: safely load from localStorage
const loadProfile = (): UserProfile => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Lazy init ensures localStorage is read only once on first render
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [ready] = useState(true); // since it's client-only, we can mark ready immediately

  // Update profile and persist to localStorage
  const updateProfile = (username: string, jobTitle: string) => {
    const next = { username: username.trim(), jobTitle: jobTitle.trim() };
    if (JSON.stringify(next) !== JSON.stringify(profile)) {
      setProfile(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
    }
  };

  // Clear profile
  const clearProfile = () => {
    if (profile !== null) {
      setProfile(null);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  };

  // Optional: sync across browser tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        setProfile(e.newValue ? JSON.parse(e.newValue) : null);
      } catch {
        setProfile(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Memoize context value so children don't re-render unnecessarily
  const value = useMemo(
    () => ({ profile, ready, updateProfile, clearProfile }),
    [profile, ready]
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Hook to access profile
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context)
    throw new Error(
      "useUserProfile must be used within <UserProfileProvider />"
    );
  return context;
};
