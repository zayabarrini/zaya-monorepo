// src/lib/services/frequencyService.ts
import type { FrequencyLanguage } from "$lib/languages";
import { getFrequencyLanguage } from "$lib/languages";

export interface FrequencyWord {
  id: number;
  rank: number;
  word: string;
  en: string;
  frequency: number;
  percentage: string;
  ipa?: string; // Optional: International Phonetic Alphabet
  partOfSpeech?: string; // Optional: Part of speech
  example?: string; // Optional: Example sentence
}

export interface FrequencyData {
  language: string;
  name: string;
  native: string;
  words: FrequencyWord[];
  totalWords: number;
  lastUpdated?: Date;
}

const CACHE_KEY_PREFIX = "frequency_";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Load frequency data for a specific language
export async function loadFrequencyData(
  language: FrequencyLanguage
): Promise<FrequencyData> {
  const cacheKey = `${CACHE_KEY_PREFIX}${language}`;

  // Check cache first
  const cached = getCachedData<FrequencyData>(cacheKey);
  if (cached) {
    console.log(
      `Loaded ${language} frequency data from cache`
    );
    return cached;
  }

  try {
    const langInfo = getFrequencyLanguage(language);
    if (!langInfo) {
      throw new Error(
        `Language ${language} not found in frequency list`
      );
    }

    // Load the CSV file
    const response = await fetch(
      `/Freq/${langInfo.fileName}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to load ${language} frequency data`
      );
    }

    const csvText = await response.text();
    const words = parseFrequencyCSV(csvText, language);

    const data: FrequencyData = {
      language,
      name: langInfo.en,
      native: langInfo.native,
      words,
      totalWords: words.length,
      lastUpdated: new Date()
    };

    // Cache the data
    cacheData(cacheKey, data);

    console.log(
      `Loaded ${words.length} frequency words for ${language}`
    );
    return data;
  } catch (error) {
    console.error(
      `Error loading frequency data for ${language}:`,
      error
    );
    throw error;
  }
}

// Parse CSV with format: targetLang,en
function parseFrequencyCSV(
  csvText: string,
  language: string
): FrequencyWord[] {
  const lines = csvText.trim().split("\n");
  const words: FrequencyWord[] = [];

  // Skip header lines (lines starting with #)
  let dataStartIndex = 0;
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (!lines[i].startsWith("#")) {
      dataStartIndex = i;
      break;
    }
  }

  // Parse data lines
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(",");
    if (parts.length >= 2) {
      const word = parts[0].trim();
      const en = parts[1].trim();

      // Skip header-like rows
      if (word.startsWith("#") || en.startsWith("#"))
        continue;

      const rank = i - dataStartIndex + 1;

      words.push({
        id: rank,
        rank,
        word,
        en,
        frequency: calculateFrequency(rank),
        percentage: calculatePercentage(rank)
      });
    }
  }

  return words;
}

// Calculate frequency score based on rank
function calculateFrequency(rank: number): number {
  // Common Zipf's law approximation: frequency ≈ 1/rank
  // Scale to reasonable numbers
  return Math.round((1 / rank) * 1000000);
}

// Calculate percentage of usage
function calculatePercentage(rank: number): string {
  // Approximate percentage based on Zipf's law
  const percentage = (1 / rank) * 100;
  return percentage >= 0.01
    ? percentage.toFixed(2) + "%"
    : "< 0.01%";
}

// Search within frequency data
export function searchFrequencyWords(
  words: FrequencyWord[],
  query: string,
  searchIn: "both" | "target" | "english" = "both"
): FrequencyWord[] {
  if (!query.trim()) return words;

  const searchLower = query.toLowerCase();

  return words.filter((word) => {
    switch (searchIn) {
      case "target":
        return word.word
          .toLowerCase()
          .includes(searchLower);
      case "english":
        return word.en.toLowerCase().includes(searchLower);
      case "both":
      default:
        return (
          word.word.toLowerCase().includes(searchLower) ||
          word.en.toLowerCase().includes(searchLower)
        );
    }
  });
}

// Filter by frequency range
export function filterByFrequencyRange(
  words: FrequencyWord[],
  minRank: number = 1,
  maxRank: number = 10000
): FrequencyWord[] {
  return words.filter(
    (word) => word.rank >= minRank && word.rank <= maxRank
  );
}

// Get statistics about frequency data
export function getFrequencyStats(words: FrequencyWord[]) {
  if (words.length === 0) {
    return {
      total: 0,
      coverage: "0%",
      mostCommon: null,
      leastCommon: null
    };
  }

  const total = words.length;
  const mostCommon = words[0];
  const leastCommon = words[words.length - 1];

  // Calculate estimated text coverage (Zipf's law approximation)
  let coveragePercent = 0;
  for (let i = 0; i < Math.min(1000, words.length); i++) {
    coveragePercent += 1 / (i + 1);
  }
  coveragePercent = Math.min(100, coveragePercent);

  return {
    total,
    coverage: coveragePercent.toFixed(1) + "%",
    mostCommon,
    leastCommon
  };
}

// Cache utilities
function getCachedData<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data as T;
  } catch (error) {
    console.warn("Cache read error:", error);
    return null;
  }
}

function cacheData(key: string, data: any): void {
  try {
    const item = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.warn("Cache write error:", error);
  }
}

// Clear frequency cache
export function clearFrequencyCache(): void {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(CACHE_KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

// Preload multiple languages
export async function preloadFrequencyData(
  languages: FrequencyLanguage[]
): Promise<void> {
  await Promise.allSettled(
    languages.map((lang) => loadFrequencyData(lang))
  );
}
