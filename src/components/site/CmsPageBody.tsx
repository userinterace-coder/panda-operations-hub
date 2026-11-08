import { useQuery } from "@tanstack/react-query";
import { FileClock } from "lucide-react";

import { ErrorState, LoadingRows } from "@/components/states";
import { ApiError } from "@/lib/api/client";
import { publicQueries } from "@/lib/api/public";
import { formatDate } from "@/lib/format";
import { safeHtml } from "@/lib/sanitize";

/**
 * Renders a CMS page (GET /public/pages/{slug}) as trusted staff-authored HTML.
 * When the page has not been published, shows an explicit draft notice instead of invented copy.
 */
export function CmsPageBody({ slug, draftTitle, draftNote }: { slug: string; draftTitle: string; draftNote: string }) {
  const q = useQuery(publicQueries.page(slug));
  if (q.isPending) return <LoadingRows rows={6} />;
  if (q.error) {
    const e = q.error instanceof ApiError ? q.error : null;
    if (e?.kind === "not_found" || e?.kind === "not_configured") {
      return (
        <div className="rounded-lg border border-dashed p-8">
          <FileClock className="h-5 w-5 text-brand-strong" />
          <p className="mt-4 font-display text-lg font-semibold">{draftTitle}</p>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">{draftNote}</p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">Source: CMS page “{slug}” · {e.kind === "not_found" ? "not yet published" : "backend not connected"}</p>
        </div>
      );
    }
    return <ErrorState error={q.error} onRetry={() => q.refetch()} />;
  }
  return (
    <article>
      {q.data.published_at && <p className="mb-6 font-mono text-xs text-muted-foreground">Last published {formatDate(q.data.published_at)}</p>}
      {/* Staff-authored CMS HTML, sanitised before rendering. */}
      <div className="prose-panda" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.content) }} />
    </article>
  );
}
