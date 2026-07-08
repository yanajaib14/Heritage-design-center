import { createClient } from "@sanity/client";

const apiVersion = "2026-07-08";

// Expected environment variables:
// NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function fetchSanity(query, params = {}) {
  return sanityClient.fetch(query, params);
}
