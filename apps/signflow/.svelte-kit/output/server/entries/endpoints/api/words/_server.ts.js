import { json } from "@sveltejs/kit";
const wordsCache = {};
const GET = async ({
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
  setHeaders({
    "Cache-Control": "public, max-age=300, s-maxage=600",
    "CDN-Cache-Control": "public, max-age=1800"
  });
  try {
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
    console.log("[Words API] Loading Words.json");
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
    let words = [];
    try {
      if (Array.isArray(jsonData)) {
        words = parseWordsArray(jsonData);
      } else if (jsonData.words && Array.isArray(jsonData.words)) {
        words = parseWordsArray(jsonData.words);
      } else if (jsonData.data && Array.isArray(jsonData.data)) {
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
    words = words.map((word, index) => ({
      id: index + 1,
      ...word
    }));
    wordsCache[cacheKey] = words;
    return processWords(words, page, pageSize, search);
  } catch (error) {
    console.error("[Words API] Error:", error);
    const errorMessage = "Failed to load words data";
    return json(
      {
        success: false,
        error: errorMessage,
        hint: void 0
      },
      { status: 500 }
    );
  }
};
function parseWordsArray(jsonArray) {
  const words = [];
  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i];
    const wordEntry = {};
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
function parseWordsObject(jsonObject) {
  const words = [];
  for (const [key, value] of Object.entries(jsonObject)) {
    if (value && typeof value === "object" && value !== null) {
      const wordEntry = {};
      const langCode = detectLanguageFromKey(key);
      wordEntry[langCode] = key;
      for (const [lang, text] of Object.entries(
        value
      )) {
        if (text && typeof text === "string") {
          const normalizedLang = normalizeLanguageCode(lang);
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
function normalizeLanguageCode(code) {
  const codeMap = {
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
function detectLanguageFromKey(key) {
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
function processWords(words, page, pageSize, search) {
  let filteredWords = words;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWords = words.filter(
      (word) => Object.entries(word).some(
        ([key, value]) => key !== "id" && key !== "original" && typeof value === "string" && value.toLowerCase().includes(searchLower)
      )
    );
  }
  const availableLanguages = /* @__PURE__ */ new Set();
  words.forEach((word) => {
    Object.keys(word).forEach((key) => {
      if (key !== "id" && key !== "original" && word[key] && typeof word[key] === "string") {
        availableLanguages.add(key);
      }
    });
  });
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
export {
  GET
};
