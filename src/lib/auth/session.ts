import type { ApiUser } from "@/lib/api/types";

/**
 * Sanctum bearer-token session.
 * Storage decision: the backend issues plain-text personal access tokens (no cookie/CSRF flow exists),
 * so the token must survive reloads. It lives in localStorage under one key, is never sent to /public/*,
 * and is removed on logout, on any 401 and on password reset. No other sensitive data is stored.
 */
const KEY = "pandatech.session";

interface StoredSession {
  token: string;
  user: ApiUser | null;
}

type Listener = (reason: "change" | "expired") => void;
const listeners = new Set<Listener>();

function read(): StoredSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    return typeof parsed?.token === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export const sessionStore = {
  getToken(): string | null {
    return read()?.token ?? null;
  },
  getUser(): ApiUser | null {
    return read()?.user ?? null;
  },
  set(token: string, user: ApiUser | null) {
    window.localStorage.setItem(KEY, JSON.stringify({ token, user }));
    listeners.forEach((l) => l("change"));
  },
  setUser(user: ApiUser) {
    const cur = read();
    if (!cur) return;
    window.localStorage.setItem(KEY, JSON.stringify({ ...cur, user }));
    listeners.forEach((l) => l("change"));
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY);
    listeners.forEach((l) => l("change"));
  },
  expire() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(KEY);
    listeners.forEach((l) => l("expired"));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
