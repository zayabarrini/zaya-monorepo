import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// Cache for words data (in-memory for serverless)
const wordsCache: Record<string, any> = {};

export const GET: RequestHandler = async ({
  url,
  fetch,
  setHeaders
}) => {
  console.log("[Words API] Endpoint called");

  const page = parseInt(
    url.searchParams.get("page") || "1"
  );
  const pageSize = parseInt(
    url.searchParams.get("pageSize") || "50"
  );
  const search = url.searchParams.get("search") || "";

  // Set cache headers
  setHeaders({
    "Cache-Control": "public, max-age=300, s-maxage=600",
    "CDN-Cache-Control": "public, max-age=1800"
  });

  try {
    // Check cache first
    const cacheKey = "words";
    if (wordsCache[cacheKey]) {
      console.log("[Words API] Cache hit");
      return processWords(
        wordsCache[cacheKey],
        page,
        pageSize,
        search
      );
    }

    // Load JSON file using fetch (works on Vercel)
    console.log("[Words API] Loading Words.json");

    // Try multiple possible paths in order
    const pathsToTry = [
      `/json/Words.json`,
      `/json/Freq/Words.json`,
      `/Words.json`,
      `/Freq/Words.json`
    ];

    let jsonData = null;
    let lastError = null;

    for (const path of pathsToTry) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          jsonData = await response.json();
          console.log(
            `[Words API] Successfully loaded from ${path}`
          );
          break;
        }
      } catch (error) {
        lastError = error;
        console.log(
          `[Words API] Failed to load from ${path}`
        );
      }
    }

    if (!jsonData) {
      throw new Error(
        `Could not find Words.json in any location. Tried: ${pathsToTry.join(", ")}`
      );
    }

    // Parse JSON
    let words: any[] = [];

    try {
      if (Array.isArray(jsonData)) {
        words = parseWordsArray(jsonData);
      } else if (
        jsonData.words &&
        Array.isArray(jsonData.words)
      ) {
        words = parseWordsArray(jsonData.words);
      } else if (
        jsonData.data &&
        Array.isArray(jsonData.data)
      ) {
        words = parseWordsArray(jsonData.data);
      } else {
        words = parseWordsObject(jsonData);
      }

      console.log(
        `[Words API] Parsed ${words.length} words`
      );
    } catch (parseError) {
      console.error(
        "[Words API] Error parsing JSON:",
        parseError
      );
      throw new Error("Invalid JSON format in Words.json");
    }

    // Add IDs if not present
    words = words.map((word, index) => ({
      id: index + 1,
      ...word
    }));

    // Cache the results
    wordsCache[cacheKey] = words;

    // Process and return
    return processWords(words, page, pageSize, search);
  } catch (error) {
    console.error("[Words API] Error:", error);

    const errorMessage = import.meta.env.DEV
      ? `Failed to load words data: ${error instanceof Error ? error.message : "Unknown error"}`
      : "Failed to load words data";

    return json(
      {
        success: false,
        error: errorMessage,
        hint: import.meta.env.DEV
          ? "Check that Words.json exists in static/json/ directory"
          : undefined
      },
      { status: 500 }
    );
  }
};

function parseWordsArray(jsonArray: any[]): any[] {
  const words = [];

  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i];
    const wordEntry: any = {};

    if (typeof item === "string") {
      wordEntry.en = item;
      wordEntry.original = item;
    } else if (typeof item === "object" && item !== null) {
      for (const [key, value] of Object.entries(item)) {
        if (value && typeof value === "string") {
          const langCode = normalizeLanguageCode(key);
          wordEntry[langCode] = value.trim();
        }
      }

      if (item.original || item.Original) {
        wordEntry.original = item.original || item.Original;
      }
    }

    if (Object.keys(wordEntry).length > 0) {
      words.push(wordEntry);
    }
  }

  return words;
}

function parseWordsObject(jsonObject: any): any[] {
  const words = [];

  for (const [key, value] of Object.entries(jsonObject)) {
    if (
      value &&
      typeof value === "object" &&
      value !== null
    ) {
      const wordEntry: any = {};

      const langCode = detectLanguageFromKey(key);
      wordEntry[langCode] = key;

      for (const [lang, text] of Object.entries(
        value as object
      )) {
        if (text && typeof text === "string") {
          const normalizedLang =
            normalizeLanguageCode(lang);
          wordEntry[normalizedLang] = text.trim();
        }
      }

      if (Object.keys(wordEntry).length > 0) {
        words.push(wordEntry);
      }
    }
  }

  return words;
}

function normalizeLanguageCode(code: string): string {
  const codeMap: Record<string, string> = {
    english: "en",
    arabic: "ar",
    russian: "ru",
    chinese: "ch",
    japanese: "ja",
    german: "de",
    french: "fr",
    italian: "it",
    hindi: "hi",
    spanish: "es",
    korean: "ko",
    original: "original",
    translation: "en",
    en: "en",
    ar: "ar",
    ru: "ru",
    ch: "ch",
    ja: "ja",
    de: "de",
    fr: "fr",
    it: "it",
    hi: "hi"
  };

  const lowerCode = code.toLowerCase().trim();
  return codeMap[lowerCode] || lowerCode.slice(0, 2);
}

function detectLanguageFromKey(key: string): string {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  const russianRegex = /[\u0400-\u04FF]/;
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf]/;
  const japaneseRegex = /[\u3040-\u309f\u30a0-\u30ff]/;
  const devanagariRegex = /[\u0900-\u097F]/;

  if (arabicRegex.test(key)) return "ar";
  if (russianRegex.test(key)) return "ru";
  if (chineseRegex.test(key)) return "ch";
  if (japaneseRegex.test(key)) return "ja";
  if (devanagariRegex.test(key)) return "hi";

  return "en";
}

function processWords(
  words: any[],
  page: number,
  pageSize: number,
  search: string
) {
  // Apply search filter
  let filteredWords = words;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWords = words.filter((word) =>
      Object.entries(word).some(
        ([key, value]) =>
          key !== "id" &&
          key !== "original" &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchLower)
      )
    );
  }

  // Get available languages from all words
  const availableLanguages = new Set<string>();
  words.forEach((word) => {
    Object.keys(word).forEach((key) => {
      if (
        key !== "id" &&
        key !== "original" &&
        word[key] &&
        typeof word[key] === "string"
      ) {
        availableLanguages.add(key);
      }
    });
  });

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filteredWords.slice(start, end);

  return json({
    success: true,
    data: paginated,
    meta: {
      page,
      pageSize,
      total: filteredWords.length,
      totalPages: Math.ceil(
        filteredWords.length / pageSize
      ),
      availableLanguages: Array.from(
        availableLanguages
      ).sort(),
      totalWords: words.length
    }
  });
}
