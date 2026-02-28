import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// Available datasets
const AVAILABLE_DATASETS = {
  sentences: {
    name: "Basic Sentences",
    fileName: "Sentences.json",
    description: "~1,300 basic multilingual sentences"
  },
  "1000-sentences": {
    name: "1000 Sentences",
    fileName: "1000-Sentences.json",
    description: "~2,000 core sentences"
  },
  asti: {
    name: "Asti Sentences",
    fileName: "Asti.json",
    description: "Asti language sentences"
  }
};

// Cache for sentence data (in-memory for serverless)
const sentenceCache: Record<string, any> = {};

export const GET: RequestHandler = async ({
  url,
  fetch,
  setHeaders
}) => {
  const page = parseInt(
    url.searchParams.get("page") || "1"
  );
  const pageSize = parseInt(
    url.searchParams.get("pageSize") || "20"
  );
  const dataset =
    url.searchParams.get("dataset") || "sentences";
  const search = url.searchParams.get("search") || "";

  // Set cache headers
  setHeaders({
    "Cache-Control": "public, max-age=300, s-maxage=600",
    "CDN-Cache-Control": "public, max-age=1800"
  });

  try {
    // Validate dataset
    const datasetInfo =
      AVAILABLE_DATASETS[
        dataset as keyof typeof AVAILABLE_DATASETS
      ];
    if (!datasetInfo) {
      return json(
        {
          success: false,
          error: `Dataset '${dataset}' not found`
        },
        { status: 404 }
      );
    }

    // Check cache first
    const cacheKey = `${dataset}`;
    if (sentenceCache[cacheKey]) {
      console.log(`[Cache hit] ${dataset}`);
      return processSentences(
        sentenceCache[cacheKey],
        page,
        pageSize,
        search,
        dataset,
        datasetInfo
      );
    }

    // Load JSON file using fetch (works on Vercel)
    console.log(
      `[API] Loading ${dataset} from ${datasetInfo.fileName}`
    );

    // Try multiple possible paths in order
    const pathsToTry = [
      `/json/${datasetInfo.fileName}`,
      `/json/Freq/${datasetInfo.fileName}`,
      `/${datasetInfo.fileName}`,
      `/Freq/${datasetInfo.fileName}`
    ];

    let jsonData = null;
    let lastError = null;

    for (const path of pathsToTry) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          jsonData = await response.json();
          console.log(
            `[API] Successfully loaded from ${path}`
          );
          break;
        }
      } catch (error) {
        lastError = error;
        console.log(`[API] Failed to load from ${path}`);
      }
    }

    if (!jsonData) {
      throw new Error(
        `Could not find ${datasetInfo.fileName} in any location. Tried: ${pathsToTry.join(", ")}`
      );
    }

    // Parse JSON
    let sentences: any[] = [];

    try {
      if (Array.isArray(jsonData)) {
        sentences = parseSentencesArray(jsonData);
      } else if (
        jsonData.sentences &&
        Array.isArray(jsonData.sentences)
      ) {
        sentences = parseSentencesArray(jsonData.sentences);
      } else if (
        jsonData.data &&
        Array.isArray(jsonData.data)
      ) {
        sentences = parseSentencesArray(jsonData.data);
      } else {
        sentences = parseSentencesObject(jsonData);
      }

      console.log(
        `[API] Parsed ${sentences.length} sentences from ${datasetInfo.fileName}`
      );
    } catch (parseError) {
      console.error(
        `[API] Error parsing JSON:`,
        parseError
      );
      throw new Error(
        `Invalid JSON format in ${datasetInfo.fileName}`
      );
    }

    // Add IDs if not present
    sentences = sentences.map((sentence, index) => ({
      id: index + 1,
      ...sentence
    }));

    // Cache the results
    sentenceCache[cacheKey] = sentences;

    // Process and return
    return processSentences(
      sentences,
      page,
      pageSize,
      search,
      dataset,
      datasetInfo
    );
  } catch (error) {
    console.error(`[API] Error loading sentences:`, error);

    const errorMessage = import.meta.env.DEV
      ? `Failed to load sentences data: ${error instanceof Error ? error.message : "Unknown error"}`
      : "Failed to load sentences data";

    return json(
      {
        success: false,
        error: errorMessage,
        availableDatasets: AVAILABLE_DATASETS,
        hint: import.meta.env.DEV
          ? `Check that your JSON files exist in the static/json/ directory`
          : undefined
      },
      { status: 500 }
    );
  }
};

function parseSentencesArray(jsonArray: any[]): any[] {
  const sentences = [];

  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i];
    const sentence: any = {};

    if (typeof item === "string") {
      sentence.en = item;
    } else if (typeof item === "object" && item !== null) {
      for (const [key, value] of Object.entries(item)) {
        if (value && typeof value === "string") {
          const langCode = normalizeLanguageCode(key);
          sentence[langCode] = value.trim();
        }
      }
    }

    if (Object.keys(sentence).length > 0) {
      sentences.push(sentence);
    }
  }

  return sentences;
}

function parseSentencesObject(jsonObject: any): any[] {
  const sentences = [];

  for (const [key, value] of Object.entries(jsonObject)) {
    if (
      value &&
      typeof value === "object" &&
      value !== null
    ) {
      const sentence: any = {};

      for (const [lang, text] of Object.entries(
        value as object
      )) {
        if (text && typeof text === "string") {
          const langCode = normalizeLanguageCode(lang);
          sentence[langCode] = text.trim();
        }
      }

      if (Object.keys(sentence).length > 0) {
        sentences.push(sentence);
      }
    }
  }

  return sentences;
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
    asti: "asti",
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

function processSentences(
  sentences: any[],
  page: number,
  pageSize: number,
  search: string,
  dataset: string,
  datasetInfo: any
) {
  // Apply search filter
  let filteredSentences = sentences;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredSentences = sentences.filter((sentence) =>
      Object.entries(sentence).some(
        ([key, value]) =>
          key !== "id" &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchLower)
      )
    );
  }

  // Get available languages from all sentences
  const availableLanguages = new Set<string>();
  sentences.forEach((sentence) => {
    Object.keys(sentence).forEach((key) => {
      if (
        key !== "id" &&
        sentence[key] &&
        typeof sentence[key] === "string"
      ) {
        availableLanguages.add(key);
      }
    });
  });

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filteredSentences.slice(start, end);

  return json({
    success: true,
    data: paginated,
    meta: {
      page,
      pageSize,
      total: filteredSentences.length,
      totalPages: Math.ceil(
        filteredSentences.length / pageSize
      ),
      dataset,
      datasetName: datasetInfo.name,
      datasetDescription: datasetInfo.description,
      availableLanguages: Array.from(
        availableLanguages
      ).sort()
    }
  });
}
