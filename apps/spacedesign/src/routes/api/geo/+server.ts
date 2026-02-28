import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request }) => {
  // Get country from various edge providers
  const country =
    // Vercel
    request.headers.get("x-vercel-ip-country") ||
    // Cloudflare
    request.headers.get("cf-ipcountry") ||
    // Fastly
    request.headers.get("x-fastly-country") ||
    // Akamai
    request.headers.get("x-akamai-country") ||
    // X-Forwarded-For fallback (not reliable)
    null;

  // Get city/region if available
  const city =
    request.headers.get("x-vercel-ip-city") || undefined;
  const region =
    request.headers.get("x-vercel-ip-country-region") ||
    undefined;
  const timezone =
    request.headers.get("x-vercel-ip-timezone") ||
    undefined;

  return json(
    {
      country,
      city,
      region,
      timezone,
      timestamp: Date.now()
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600"
      }
    }
  );
};
