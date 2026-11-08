import { API_BASE_URL, DEFAULT_PAGE_SIZE, isApiConfigured } from "./config";
import { sessionStore } from "@/lib/auth/session";

export type ApiErrorKind =
  | "not_configured"
  | "network"
  | "unauthorized"
  | "forbidden"
  | "validation"
  | "not_found"
  | "rate_limited"
  | "server"
  | "aborted";

/** Normalised error. `message` is always safe to show to a user. */
export class ApiError extends Error {
  kind: ApiErrorKind;
  status: number;
  fieldErrors: Record<string, string[]>;
  constructor(kind: ApiErrorKind, message: string, status = 0, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export type Query = Record<string, string | number | boolean | undefined | null>;

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  query?: Query;
  body?: unknown;
  formData?: FormData;
  signal?: AbortSignal;
  /** Defaults to true, except for /public/* and /health which must never carry a token (gap G-08). */
  auth?: boolean;
}

export interface ApiResult<T> {
  data: T;
  message: string;
}

export function isPublicPath(path: string) {
  return path.startsWith("/public/") || path === "/health" || path.startsWith("/auth/login") || path.startsWith("/auth/register") || path.startsWith("/auth/forgot-password") || path.startsWith("/auth/reset-password");
}

export function buildUrl(path: string, query?: Query) {
  const url = new URL(API_BASE_URL + (path.startsWith("/") ? path : `/${path}`));
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === "") continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

const SAFE_MESSAGES: Record<ApiErrorKind, string> = {
  not_configured: "The PANDA TECH backend is not connected yet.",
  network: "We couldn't reach the PANDA TECH servers. Check your connection and try again.",
  unauthorized: "Your session has ended. Please sign in again.",
  forbidden: "You don't have permission to do this.",
  validation: "Please correct the highlighted fields.",
  not_found: "We couldn't find what you were looking for.",
  rate_limited: "Too many requests. Please wait a moment and try again.",
  server: "The server couldn't complete this request. Please try again later.",
  aborted: "Request cancelled.",
};

function kindFromStatus(status: number): ApiErrorKind {
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 422) return "validation";
  if (status === 429) return "rate_limited";
  return "server";
}

/**
 * Converts any backend error body into an ApiError. Handles both envelopes found in the Laravel source:
 *  - Controller::error()  → { success:false, message, errors }
 *  - Laravel default      → { message, errors: { field: [..] } }
 * 5xx messages are replaced with a generic message so stack traces / SQL never reach the UI.
 */
export function toApiError(status: number, body: unknown): ApiError {
  const kind = kindFromStatus(status);
  const obj = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const fieldErrors: Record<string, string[]> = {};
  if (obj.errors && typeof obj.errors === "object" && !Array.isArray(obj.errors)) {
    for (const [k, v] of Object.entries(obj.errors as Record<string, unknown>)) {
      fieldErrors[k] = Array.isArray(v) ? v.map(String) : [String(v)];
    }
  }
  const backendMessage = typeof obj.message === "string" ? obj.message : "";
  let message = SAFE_MESSAGES[kind];
  if ((kind === "validation" || kind === "forbidden" || kind === "not_found") && backendMessage && backendMessage.length < 200) {
    message = backendMessage;
  }
  if (kind === "unauthorized" && backendMessage === "Invalid credentials") message = "Incorrect email or password.";
  // Controller::error() is also used for 4xx business-rule rejections (e.g. 400 "Email already verified.")
  if (status >= 400 && status < 500 && kind === "server" && backendMessage && backendMessage.length < 200) {
    message = backendMessage;
  }
  return new ApiError(kind, message, status, fieldErrors);
}

export async function apiRequest<T = unknown>(opts: ApiRequestOptions): Promise<ApiResult<T>> {
  if (!isApiConfigured) throw new ApiError("not_configured", SAFE_MESSAGES.not_configured);
  const method = opts.method ?? "GET";
  const useAuth = opts.auth ?? !isPublicPath(opts.path);
  const headers: Record<string, string> = { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" };
  const token = useAuth ? sessionStore.getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;
  let body: BodyInit | undefined;
  if (opts.formData) body = opts.formData;
  else if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }

  let res: Response;
  try {
    res = await fetch(buildUrl(opts.path, opts.query), { method, headers, body, signal: opts.signal });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw new ApiError("aborted", SAFE_MESSAGES.aborted);
    throw new ApiError("network", SAFE_MESSAGES.network);
  }

  let json: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }
  }

  if (!res.ok) {
    const err = toApiError(res.status, json);
    if (err.kind === "unauthorized" && token) sessionStore.expire();
    throw err;
  }
  const env = (json ?? {}) as Record<string, unknown>;
  if (env.success === false) throw toApiError(res.status >= 400 ? res.status : 400, env);
  const data = ("data" in env ? env.data : json) as T;
  return { data, message: typeof env.message === "string" ? env.message : "" };
}

export interface Page<T> {
  items: T[];
  page: number;
  /** Pagination meta is stripped by the backend (gap G-06); inferred from a full page. */
  hasNext: boolean;
}

/** Normalises list endpoints: data may be an array, or a Laravel paginator object if the backend is fixed later. */
export async function apiList<T>(path: string, query: Query = {}, signal?: AbortSignal, pageSize = DEFAULT_PAGE_SIZE): Promise<Page<T>> {
  const page = Number(query.page ?? 1) || 1;
  const { data } = await apiRequest<unknown>({ path, query: { ...query, page }, signal });
  if (Array.isArray(data)) return { items: data as T[], page, hasNext: data.length >= pageSize };
  const obj = (data ?? {}) as Record<string, unknown>;
  if (Array.isArray(obj.data)) {
    const meta = (obj.meta ?? obj) as Record<string, unknown>;
    const last = Number(meta.last_page ?? 0);
    return { items: obj.data as T[], page, hasNext: last ? page < last : (obj.data as T[]).length >= pageSize };
  }
  return { items: [], page, hasNext: false };
}

/** Authorised download: fetches with the bearer token and saves the blob. */
export async function downloadAuthorized(url: string, filename: string) {
  const token = sessionStore.getToken();
  const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!res.ok) throw toApiError(res.status, null);
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

/** TanStack Query retry policy: retry network/5xx twice, never retry 4xx or missing config. */
export function shouldRetry(failureCount: number, error: unknown) {
  if (error instanceof ApiError && !["network", "server"].includes(error.kind)) return false;
  return failureCount < 2;
}
