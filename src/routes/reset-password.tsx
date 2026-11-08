import { createFileRoute, Link } from "@tanstack/react-router";

import { AuthCard } from "@/components/auth/AuthCard";
import { BlockedState } from "@/components/states";
import { pageHead } from "@/lib/seo";

// Waits on the backend reset endpoint (gap G-11).
export const Route = createFileRoute("/reset-password")({
  head: () => pageHead("Reset password", "Set a new password for your Pandatechs account."),
  component: () => (
    <AuthCard title="Reset password" footer={<Link to="/login" className="text-foreground underline">Back to sign in</Link>}>
      <BlockedState title="Password reset not available yet" reason="This page activates once the backend password-reset service is in place." gaps={["G-11"]} />
    </AuthCard>
  ),
});
