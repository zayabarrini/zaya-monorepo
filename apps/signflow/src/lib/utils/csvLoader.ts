// src/lib/client/utils/csvLoader.ts
import { csvCache } from "$lib/cache/indexedDB";

interface LoadOptions {
  useCache?: boolean;
  forceRefresh?: boolean;
  page?: number;
  pageSize?: number;
  sourceLang?: string;
  targetLangs?: string[];
  search?: string;
  dataset?: string;
}

export async function loadCSVData(
  endpoint: string,
  options: LoadOptions = {}
): Promise<any> {
  const {
    useCache = true,
    forceRefresh = false,
    page = 1,
    pageSize = 5000,
    sourceLang = "en",
    targetLangs = ["de", "fr"],
    search = "",
    dataset = "words"
  } = options;

  // Create cache key
  const cacheKey = `${endpoint}_${sourceLang}_${targetLangs.join(",")}_${search}_${page}_${pageSize}_${dataset}`;

  // Try cache first
  if (useCache && !forceRefresh) {
    const cached = await csvCache.get(cacheKey);
    if (cached) {
      console.log("Loaded from cache:", cacheKey);
      return cached;
    }
  }

  // Build URL with query parameters
  const url = new URL(endpoint, window.location.origin);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("pageSize", pageSize.toString());
  url.searchParams.set("source", sourceLang);
  url.searchParams.set("targets", targetLangs.join(","));
  if (search) url.searchParams.set("search", search);
  if (dataset) url.searchParams.set("dataset", dataset);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Cache the result
    if (useCache && data.success) {
      await csvCache.set(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error("Failed to load CSV data:", error);
    throw error;
  }
}

// Special function for frequency data (2 columns only)
export async function loadFrequencyData(
  language: string,
  options: Omit<
    LoadOptions,
    "sourceLang" | "targetLangs"
  > = {}
) {
  return loadCSVData(`/api/frequency/${language}`, options);
}
