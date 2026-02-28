// src/lib/services/translationService.ts
import type { LanguageCode } from "$lib/languages";

export interface TranslationResult {
  word: string;
  translation: string;
  confidence?: number;
}

export interface TranslationError {
  error: string;
  code?: string;
}

// Cache for translations to avoid redundant API calls
const translationCache = new Map<string, string>();
const wordCache = new Map<string, TranslationResult[]>();

// Public LibreTranslate servers (you can add more)
const LIBRETRANSLATE_SERVERS = [
  "https://translate.argosopentech.com", // Most reliable
  "https://libretranslate.com",
  "https://translate.terraprint.co",
  "https://translate.fortaleza.ifce.edu.br"
];

// Language code mapping from your app to LibreTranslate
const LANGUAGE_MAPPING: Record<string, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  pt: "pt",
  ru: "ru",
  ar: "ar",
  hi: "hi",
  zh: "zh", // Chinese
  ch: "zh", // Chinese (alternative code)
  ja: "ja",
  ko: "ko",
  pl: "pl", // Polish
  po: "pl", // Polish (alternative code)
  el: "el", // Greek
  gr: "el", // Greek (alternative code)
  he: "he", // Hebrew
  hb: "he" // Hebrew (alternative code)
};

// Alternative: Use your own API endpoint
export async function translateViaAPI(
  text: string,
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): Promise<string> {
  if (sourceLang === targetLang) return text;

  const cacheKey = `api_${text}_${sourceLang}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang,
        type:
          text.split(" ").length > 1 ? "sentence" : "word"
      })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.translation) {
      translationCache.set(cacheKey, data.translation);
      return data.translation;
    } else {
      throw new Error(data.error || "Translation failed");
    }
  } catch (error) {
    console.error("API translation failed:", error);
    // Fall back to direct LibreTranslate
    return tryServers(text, sourceLang, targetLang);
  }
}

// Simple tokenizer
export function tokenizeSentence(
  sentence: string,
  language: string
): string[] {
  if (!sentence || typeof sentence !== "string") return [];

  const clean = sentence
    .replace(/[.,!?;:()\[\]{}'"`~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Basic tokenization - for production, consider language-specific tokenizers
  switch (language) {
    case "ch":
    case "ja":
      // Character-based languages
      return clean.split("").filter((char) => char.trim());
    case "ko":
      // Korean - might need specialized tokenization
      return clean.split(" ").filter((word) => word);
    default:
      // Most languages - split by spaces
      return clean
        .split(" ")
        .filter((word) => word && word.length > 0);
  }
}

// Try different LibreTranslate servers
async function tryServers(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const sourceCode =
    LANGUAGE_MAPPING[sourceLang] || sourceLang;
  const targetCode =
    LANGUAGE_MAPPING[targetLang] || targetLang;

  if (sourceCode === targetCode) return text;

  const cacheKey = `${text}_${sourceCode}_${targetCode}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Try each server until one works
  for (const server of LIBRETRANSLATE_SERVERS) {
    try {
      const translation = await translateWithServer(
        server,
        text,
        sourceCode,
        targetCode
      );
      translationCache.set(cacheKey, translation);
      return translation;
    } catch (error) {
      console.warn(`Server ${server} failed:`, error);
      continue; // Try next server
    }
  }

  throw new Error("All LibreTranslate servers failed");
}

async function translateWithServer(
  server: string,
  text: string,
  source: string,
  target: string
): Promise<string> {
  const response = await fetch(`${server}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: text,
      source: source,
      target: target,
      format: "text",
      api_key: "" // Empty for public servers
    })
  });

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.translatedText) {
    return data.translatedText;
  } else {
    throw new Error("No translation in response");
  }
}

// Main translation function for single words
// Update the translateWord function in translationService.ts
export async function translateWord(
  word: string,
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): Promise<TranslationResult> {
  console.log(
    `Translating: "${word}" from ${sourceLang} to ${targetLang}`
  );

  if (!word || word.trim().length === 0) {
    return { word, translation: "" };
  }

  if (sourceLang === targetLang) {
    console.log(
      "Source and target are same, returning original"
    );
    return { word, translation: word };
  }

  const cacheKey = `${word}_${sourceLang}_${targetLang}`;
  const cached = translationCache.get(cacheKey);
  if (cached) {
    console.log("Cache hit:", cacheKey);
    return { word, translation: cached };
  }

  try {
    console.log("Attempting translation...");

    // Try direct API first
    const translation = await translateViaAPI(
      word,
      sourceLang,
      targetLang
    );

    console.log("Translation result:", translation);
    translationCache.set(cacheKey, translation);
    return { word, translation };
  } catch (error) {
    console.error("Translation failed:", error);

    // Return the word with brackets to indicate failure
    return {
      word,
      translation: `[${word}]`,
      confidence: 0
    };
  }
}

// Batch translate words in a sentence
export async function translateSentenceWords(
  sentence: string,
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): Promise<TranslationResult[]> {
  if (!sentence || sourceLang === targetLang) {
    return [];
  }

  const cacheKey = `${sentence}_${sourceLang}_${targetLang}_words`;
  if (wordCache.has(cacheKey)) {
    return wordCache.get(cacheKey)!;
  }

  const words = tokenizeSentence(sentence, sourceLang);

  if (words.length === 0) {
    return [];
  }

  try {
    // For better results, we can try different strategies:

    // Strategy 1: Try to translate the whole sentence first
    let fullTranslation = "";
    try {
      fullTranslation = await tryServers(
        sentence,
        sourceLang,
        targetLang
      );
    } catch (error) {
      console.warn(
        "Full sentence translation failed:",
        error
      );
    }

    // Strategy 2: Translate individual words
    const wordTranslations = await Promise.all(
      words.map(async (word) => {
        try {
          // Skip very short words (articles, conjunctions, etc.)
          if (
            word.length <= 2 &&
            /^[a-zA-Z]+$/.test(word)
          ) {
            return { word, translation: word };
          }

          const result = await translateWord(
            word,
            sourceLang,
            targetLang
          );
          return result;
        } catch (error) {
          return { word, translation: `[${word}]` };
        }
      })
    );

    // Add context from full translation if available
    const results = wordTranslations.map(
      (result, index) => {
        if (fullTranslation) {
          // This is simplified - in reality you'd need to align words
          result.confidence =
            (result.confidence || 0.5) + 0.2;
        }
        return result;
      }
    );

    wordCache.set(cacheKey, results);
    return results;
  } catch (error) {
    console.error("Word translation failed:", error);
    return words.map((word) => ({
      word,
      translation: `[${word}]`
    }));
  }
}

// Get supported languages from LibreTranslate
export async function getSupportedLanguages(): Promise<
  Array<{ code: string; name: string }>
> {
  try {
    const response = await fetch(
      `${LIBRETRANSLATE_SERVERS[0]}/languages`
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn(
      "Could not fetch supported languages:",
      error
    );
  }

  // Fallback to known languages
  return Object.entries(LANGUAGE_MAPPING).map(
    ([code, ltCode]) => ({
      code: ltCode,
      name: code
    })
  );
}

// Clear the cache
export function clearTranslationCache(): void {
  translationCache.clear();
  wordCache.clear();
}

// Pre-warm cache with common words
export async function prewarmCache(
  commonWords: string[],
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): Promise<void> {
  if (sourceLang === targetLang) return;

  // Translate in batches to avoid overwhelming the API
  const batchSize = 10;
  for (let i = 0; i < commonWords.length; i += batchSize) {
    const batch = commonWords.slice(i, i + batchSize);
    await Promise.allSettled(
      batch.map((word) =>
        translateWord(word, sourceLang, targetLang)
      )
    );
    // Small delay between batches
    await new Promise((resolve) =>
      setTimeout(resolve, 100)
    );
  }
}
