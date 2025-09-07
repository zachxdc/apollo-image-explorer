"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";

export type UserProfile = { username: string; jobTitle: string } | null;

type Context = {
  profile: UserProfile;
  ready: boolean;
  save: (username: string, jobTitle: string) => void;
  reset: () => void;
};

const STORAGE_KEY = "ricky-morty-user";
const UserProfileContext = createContext<Context | null>(null);

/** Type guard to ensure parsed data matches the expected shape */
function isUserProfile(value: unknown): value is Exclude<UserProfile, null> {
  return (
    !!value &&
    typeof value === "object" &&
    "username" in (value as any) &&
    "jobTitle" in (value as any)
  );
}

/** Normalize incoming values (trim and coerce to string) */
function normalize(username: unknown, jobTitle: unknown) {
  return {
    username: String(username ?? "").trim(),
    jobTitle: String(jobTitle ?? "").trim(),
  };
}

/** Shallow equality check for UserProfile values */
function isSameProfile(a: UserProfile, b: UserProfile) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  return a.username === b.username && a.jobTitle === b.jobTitle;
}

export const UserProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // SSR first paint uses null; client will hydrate and load real value
  const [profile, setProfile] = useState<UserProfile>(null);
  const [ready, setReady] = useState(false);

  // Prevent double init in React StrictMode
  const didInitRef = useRef(false);

  // Cache last serialized form to avoid redundant localStorage writes
  const lastSerializedRef = useRef<string | null>(null);

  // Client-side: load from localStorage once
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (isUserProfile(parsed)) {
            const next = normalize(parsed.username, parsed.jobTitle);
            setProfile((prev) => (isSameProfile(prev, next) ? prev : next));
            lastSerializedRef.current = JSON.stringify(next);
          } else {
            setProfile(null);
            lastSerializedRef.current = null;
          }
        } catch {
          setProfile(null);
          lastSerializedRef.current = null;
        }
      } else {
        setProfile(null);
        lastSerializedRef.current = null;
      }
    } catch {
      setProfile(null);
      lastSerializedRef.current = null;
    } finally {
      setReady(true);
    }
  }, []);

  // Persist to localStorage whenever profile changes (dedup writes)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const serialized = profile ? JSON.stringify(profile) : null;

      // Skip if nothing changed since last write
      if (serialized === lastSerializedRef.current) return;

      if (serialized) {
        window.localStorage.setItem(STORAGE_KEY, serialized);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      lastSerializedRef.current = serialized;
    } catch {
      // Ignore quota/private mode errors
    }
  }, [profile]);

  // Cross-tab synchronization via "storage" events (only apply real changes)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const next: UserProfile = e.newValue
          ? (() => {
              const parsed = JSON.parse(e.newValue as string);
              return isUserProfile(parsed)
                ? normalize(parsed.username, parsed.jobTitle)
                : null;
            })()
          : null;

        setProfile((prev) => {
          if (isSameProfile(prev, next)) return prev;
          return next;
        });

        // Keep serialized cache in sync
        lastSerializedRef.current = e.newValue;
      } catch {
        setProfile((prev) => (prev === null ? prev : null));
        lastSerializedRef.current = null;
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Public API: save/reset (no-ops if value effectively unchanged)
  const save = useCallback((username: string, jobTitle: string) => {
    const next = normalize(username, jobTitle);
    setProfile((prev) => (isSameProfile(prev, next) ? prev : next));
  }, []);

  const reset = useCallback(() => {
    setProfile((prev) => (prev === null ? prev : null));
  }, []);

  // Memoize context to avoid re-rendering the entire subtree unnecessarily
  const contextValue = useMemo<Context>(
    () => ({ profile, ready, save, reset }),
    [profile, ready, save, reset]
  );

  return (
    <UserProfileContext.Provider value={contextValue}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfile must be used within <UserProfileProvider />"
    );
  }
  return context;
};
