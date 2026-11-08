import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

const ORIGINAL_PUBLIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/solutions",
  "/products",
  "/shop",
  "/portfolio",
  "/case-studies",
  "/insights",
  "/developers",
  "/contact",
  "/support",
  "/faqs",
  "/locations",
  "/privacy",
  "/terms",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

describe("Team page", () => {
  it("matches /team to a real page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/team");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Original public pages", () => {
  it.each(ORIGINAL_PUBLIC_PATHS)("keeps %s matched to a real page", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
