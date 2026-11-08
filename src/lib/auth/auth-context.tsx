import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiRequest, ApiError } from "@/lib/api/client";
import type { ApiUser, AuthPayload } from "@/lib/api/types";
import { sessionStore } from "./session";

type Status = "loading" | "anonymous" | "authenticated";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
}

interface AuthContextValue {
  status: Status;
  user: ApiUser | null;
  login: (email: string, password: string) => Promise<ApiUser>;
  register: (input: RegisterInput) => Promise<ApiUser>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<ApiUser | null>(null);

  const reloadUser = useCallback(async () => {
    if (!sessionStore.getToken()) {
      setUser(null);
      setStatus("anonymous");
      return;
    }
    try {
      const { data } = await apiRequest<ApiUser>({ path: "/auth/me" });
      sessionStore.setUser(data);
      setUser(data);
      setStatus("authenticated");
    } catch (e) {
      if (e instanceof ApiError && e.kind === "unauthorized") {
        setUser(null);
        setStatus("anonymous");
      } else {
        // Backend unreachable: keep the cached profile so the user sees clear connection errors, not a forced logout.
        const cached = sessionStore.getUser();
        setUser(cached);
        setStatus(cached ? "authenticated" : "anonymous");
      }
    }
  }, []);

  useEffect(() => {
    const cached = sessionStore.getUser();
    if (cached && sessionStore.getToken()) {
      setUser(cached);
      setStatus("authenticated");
    }
    void reloadUser();
    return sessionStore.subscribe((reason) => {
      if (reason === "expired") {
        setUser(null);
        setStatus("anonymous");
        queryClient.clear();
        toast.error("Your session has ended. Please sign in again.");
      }
    });
  }, [reloadUser, queryClient]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await apiRequest<AuthPayload>({ method: "POST", path: "/auth/login", body: { email, password } });
    sessionStore.set(data.token, data.user);
    setUser(data.user);
    setStatus("authenticated");
    return data.user;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const { data } = await apiRequest<AuthPayload>({ method: "POST", path: "/auth/register", body: input });
    sessionStore.set(data.token, data.user);
    setUser(data.user);
    setStatus("authenticated");
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      if (sessionStore.getToken()) await apiRequest({ method: "POST", path: "/auth/logout" });
    } catch {
      // Token is discarded locally regardless; the backend revokes it on next login (AuthController::login).
    }
    sessionStore.clear();
    queryClient.clear();
    setUser(null);
    setStatus("anonymous");
  }, [queryClient]);

  const value = useMemo(() => ({ status, user, login, register, logout, reloadUser }), [status, user, login, register, logout, reloadUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
