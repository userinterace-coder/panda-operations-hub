/**
 * PANDA TECH API configuration.
 * The base URL must include the version prefix, e.g. https://api.pandatech.co.ke/api/v1
 * Set VITE_PANDATECH_API_URL in the environment. No secrets belong here — the API uses
 * per-user Sanctum bearer tokens obtained at login.
 */
const raw = (import.meta.env.VITE_PANDATECH_API_URL as string | undefined)?.trim() ?? "";

export const API_BASE_URL = raw.replace(/\/+$/, "");
export const isApiConfigured = API_BASE_URL.length > 0;

/** Laravel paginate(20) is used by every list endpoint that paginates. */
export const DEFAULT_PAGE_SIZE = 20;

export const APP_TIMEZONE = "Africa/Nairobi";
export const APP_CURRENCY = "KES";
export const APP_LOCALE = "en-KE";
