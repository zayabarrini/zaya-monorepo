import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getFrequencyLanguage } from "$lib/languages";

// Cache for frequency data (in-memory for serverless)
const frequencyCache: Record<string, any[]> = {};

export const GET: RequestHandler = async ({
  params,
  url,
  fetch
}) => {
  console.log(
    `[Frequency API] Request for language: ${params.language}`
  );

  const { language } = params;
  const page = parseInt(
    url.searchParams.get("page") || "1"
  );
  const pageSize = parseInt(
    url.searchParams.get("pageSize") || "100"
  );
  const search = url.searchParams.get("search") || "";
  const minRank = parseInt(
    url.searchParams.get("minRank") || "1"
  );
  const maxRank = parseInt(
    url.searchParams.get("maxRank") || "10000"
  );

  const langInfo = getFrequencyLanguage(language);
  if (!langInfo) {
    return json(
      {
        success: false,
        error: `Frequency data not available for ${language}`
      },
      { status: 404 }
    );
  }

  try {
    // Check cache first
    const cacheKey = `${language}-${minRank}-${maxRank}`;
    if (frequencyCache[cacheKey]) {
      console.log(
        `[Frequency API] Cache hit for ${language}`
      );
      return processAndPaginate(
        frequencyCache[cacheKey],
        language,
        langInfo,
        {
          page,
          pageSize,
          search,
          minRank,
          maxRank
        }
      );
    }

    // Load JSON file using fetch (works on Vercel)
    console.log(
      `[Frequency API] Loading ${language} data from ${langInfo.fileName}`
    );

    // Try multiple possible paths in order
    const pathsToTry = [
      `/json/Freq/${langInfo.fileName}`,
      `/Freq/${langInfo.fileName}`,
      `/json/${langInfo.fileName}`,
      `/${langInfo.fileName}`
    ];

    let jsonData = null;
    let lastError = null;

    for (const path of pathsToTry) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          jsonData = await response.json();
          console.log(
            `[Frequency API] Successfully loaded from ${path}`
          );
          break;
        }
      } catch (error) {
        lastError = error;
        console.log(
          `[Frequency API] Failed to load from ${path}`
        );
      }
    }

    if (!jsonData) {
      throw new Error(
        `Could not find ${langInfo.fileName} in any location. Tried: ${pathsToTry.join(", ")}`
      );
    }

    // Parse JSON
    let words: any[] = [];

    if (Array.isArray(jsonData)) {
      words = parseFrequencyJSONArray(jsonData, language);
    } else if (
      jsonData.words &&
      Array.isArray(jsonData.words)
    ) {
      words = parseFrequencyJSONArray(
        jsonData.words,
        language
      );
    } else if (
      jsonData.data &&
      Array.isArray(jsonData.data)
    ) {
      words = parseFrequencyJSONArray(
        jsonData.data,
        language
      );
    } else {
      words = parseFrequencyJSONObject(jsonData, language);
    }

    console.log(
      `[Frequency API] Parsed ${words.length} words for ${language}`
    );

    // Cache the results
    frequencyCache[cacheKey] = words;

    // Process and paginate
    return processAndPaginate(words, language, langInfo, {
      page,
      pageSize,
      search,
      minRank,
      maxRank
    });
  } catch (error) {
    console.error(`[Frequency API] Error:`, error);

    return json(
      {
        success: false,
        error: `Failed to load frequency data: ${error instanceof Error ? error.message : "Unknown error"}`,
        hint: `Make sure ${langInfo.fileName} is in static/json/Freq/ directory`
      },
      { status: 500 }
    );
  }
};

function processAndPaginate(
  words: any[],
  language: string,
  langInfo: any,
  options: {
    page: number;
    pageSize: number;
    search: string;
    minRank: number;
    maxRank: number;
  }
) {
  const { page, pageSize, search, minRank, maxRank } =
    options;

  // Apply filters
  let filteredWords = words.filter(
    (word) => word.rank >= minRank && word.rank <= maxRank
  );

  // Apply search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWords = filteredWords.filter(
      (word) =>
        word.word.toLowerCase().includes(searchLower) ||
        (word.en &&
          word.en.toLowerCase().includes(searchLower))
    );
  }

  // Sort by rank by default
  filteredWords.sort((a, b) => a.rank - b.rank);

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedWords = filteredWords.slice(start, end);

  return json({
    success: true,
    data: paginatedWords,
    meta: {
      page,
      pageSize,
      total: filteredWords.length,
      totalPages: Math.ceil(
        filteredWords.length / pageSize
      ),
      language,
      languageName: langInfo.en,
      nativeName: langInfo.native,
      minRank,
      maxRank,
      search
    }
  });
}

function parseFrequencyJSONArray(
  jsonArray: any[],
  language: string
): any[] {
  const words = [];
  let rank = 0;

  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i];

    let word = "";
    let en = "";

    if (typeof item === "string") {
      word = item;
    } else if (item && typeof item === "object") {
      word =
        item.word ||
        item.Word ||
        item.term ||
        item.Term ||
        item[language] ||
        "";
      en =
        item.en ||
        item.En ||
        item.english ||
        item.English ||
        item.translation ||
        "";
    }

    const itemRank =
      item.rank ||
      item.Rank ||
      item.frequency_rank ||
      i + 1;
    rank = parseInt(itemRank) || i + 1;

    if (word && word !== language) {
      words.push({
        id: rank,
        rank: rank,
        word: word.trim(),
        en: en?.trim() || "",
        frequency: calculateFrequency(rank),
        percentage: calculatePercentage(rank)
      });
    }
  }

  // Remove duplicates by word (keep lowest rank)
  const uniqueWords = new Map();
  words.forEach((word) => {
    if (
      !uniqueWords.has(word.word) ||
      uniqueWords.get(word.word).rank > word.rank
    ) {
      uniqueWords.set(word.word, word);
    }
  });

  return Array.from(uniqueWords.values()).sort(
    (a, b) => a.rank - b.rank
  );
}

function parseFrequencyJSONObject(
  jsonObject: any,
  language: string
): any[] {
  const words = [];
  let rank = 0;

  for (const [key, value] of Object.entries(jsonObject)) {
    rank++;

    let word = key;
    let en = "";

    if (typeof value === "string") {
      en = value;
    } else if (value && typeof value === "object") {
      en =
        (value as any).en ||
        (value as any).english ||
        (value as any).translation ||
        "";
      word =
        (value as any).word || (value as any).term || key;
    }

    if (word && word !== language) {
      words.push({
        id: rank,
        rank,
        word: word.trim(),
        en: en?.trim() || "",
        frequency: calculateFrequency(rank),
        percentage: calculatePercentage(rank)
      });
    }
  }

  return words;
}

function calculateFrequency(rank: number): number {
  return Math.round((1 / rank) * 1000000);
}

function calculatePercentage(rank: number): string {
  const percentage = (1 / rank) * 100;
  return percentage >= 0.01
    ? percentage.toFixed(2) + "%"
    : "< 0.01%";
}
