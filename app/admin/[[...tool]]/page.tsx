import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { cmsEnabled } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function AdminPage() {
  if (!cmsEnabled) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "80px auto", padding: 16, lineHeight: 1.5 }}>
        <h1>Admin is not connected yet</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID (and NEXT_PUBLIC_SANITY_DATASET) in the site's environment variables, then redeploy. See README.md.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
