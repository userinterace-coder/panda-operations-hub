import { createFileRoute, Link } from "@tanstack/react-router";

import { AuthCard } from "@/components/auth/AuthCard";
import { BlockedState } from "@/components/states";
import { pageHead } from "@/lib/seo";

// The backend has no forgot-password endpoint yet (gap G-11). No fake form is shown.
export const Route = createFileRoute("/forgot-password")({
  head: () => pageHead("Forgot password", "Recover access to your Pandatechs account."),
  component: () => (
    <AuthCard title="Forgot your password?" footer={<Link to="/login" className="text-foreground underline">Back to sign in</Link>}>
      <BlockedState title="Self-service reset not available yet" reason="Please contact support and our team will help you regain access." gaps={["G-11"]} />
      <p className="mt-4 text-sm"><Link to="/support" className="underline">Contact support</Link></p>
    </AuthCard>
  ),
});
