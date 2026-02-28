import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getFrequencyLanguage } from "$lib/languages";
import { browser } from "$app/environment";

// This helps but won't stop the parent from triggering prerendering
export const prerender = false;

export const load: PageLoad = async ({
  params,
  url,
  fetch
}) => {
  const { language } = params;
  console.log("=== FREQUENCY PAGE LOAD ===");
  console.log("Params:", params);
  console.log("Language param:", language);

  const langInfo = getFrequencyLanguage(language);
  console.log("Language info:", langInfo);

  if (!langInfo) {
    throw error(
      404,
      `Frequency data not available for ${language}`
    );
  }

  // Default values
  let page = 1;
  let pageSize = 100;
  let search = "";
  let minRank = 1;
  let maxRank = 10000;

  // CRITICAL FIX: Check if we're actually in a browser AND if searchParams is accessible
  // During prerendering, even with browser=false, accessing searchParams might throw
  let hasQueryParams = false;
  try {
    // Test if searchParams is accessible
    hasQueryParams =
      url &&
      typeof url.searchParams !== "undefined" &&
      typeof url.searchParams.get === "function";

    if (hasQueryParams) {
      page = parseInt(url.searchParams.get("page") || "1");
      pageSize = parseInt(
        url.searchParams.get("pageSize") || "100"
      );
      search = url.searchParams.get("search") || "";
      minRank = parseInt(
        url.searchParams.get("minRank") || "1"
      );
      maxRank = parseInt(
        url.searchParams.get("maxRank") || "10000"
      );
    }
  } catch (e) {
    // If we can't access searchParams, just use defaults
    console.log(
      "Cannot access searchParams during prerendering, using defaults"
    );
  }

  // Build API URL - during prerendering, always use relative URL
  let apiUrl: string;

  // During prerendering, avoid any URL object creation that might access searchParams
  if (browser && hasQueryParams) {
    // In browser with valid searchParams
    const urlObj = new URL(
      `/api/frequency/${language}`,
      url.origin
    );
    urlObj.searchParams.set("page", page.toString());
    urlObj.searchParams.set(
      "pageSize",
      pageSize.toString()
    );
    urlObj.searchParams.set("search", search);
    urlObj.searchParams.set("minRank", minRank.toString());
    urlObj.searchParams.set("maxRank", maxRank.toString());
    apiUrl = urlObj.toString();
  } else {
    // During SSR/prerendering or when searchParams is inaccessible
    apiUrl = `/api/frequency/${language}?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&minRank=${minRank}&maxRank=${maxRank}`;
  }

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw error(
        response.status,
        errorData.error || "Failed to load frequency data"
      );
    }

    const result = await response.json();

    return {
      ...result,
      language,
      langInfo,
      initialPage: page,
      initialPageSize: pageSize,
      initialSearch: search,
      initialMinRank: minRank,
      initialMaxRank: maxRank
    };
  } catch (err) {
    console.error("Error loading frequency page:", err);
    throw error(500, "Failed to load frequency data");
  }
};
