import { error } from "@sveltejs/kit";
import { g as getFrequencyLanguage } from "../../../../chunks/languages.js";
const prerender = false;
const load = async ({
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
  let page = 1;
  let pageSize = 100;
  let search = "";
  let minRank = 1;
  let maxRank = 1e4;
  let hasQueryParams = false;
  try {
    hasQueryParams = url && typeof url.searchParams !== "undefined" && typeof url.searchParams.get === "function";
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
    console.log(
      "Cannot access searchParams during prerendering, using defaults"
    );
  }
  let apiUrl;
  {
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
export {
  load,
  prerender
};
