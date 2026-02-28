// src/lib/languages.ts
export const ALL_LANGUAGES = [
  {
    code: "en",
    name: "English",
    native: "English",
    flag: "🇺🇸"
  },
  {
    code: "de",
    name: "German",
    native: "Deutsch",
    flag: "🇩🇪"
  },
  {
    code: "ru",
    name: "Russian",
    native: "Русский",
    flag: "🇷🇺"
  },
  {
    code: "ar",
    name: "Arabic",
    native: "العربية",
    flag: "🇸🇦",
    rtl: true
  },
  {
    code: "hi",
    name: "Hindi",
    native: "हिन्दी",
    flag: "🇮🇳"
  },
  {
    code: "ch",
    name: "Chinese",
    native: "中文",
    flag: "🇨🇳"
  },
  {
    code: "ja",
    name: "Japanese",
    native: "日本語",
    flag: "🇯🇵"
  },
  {
    code: "ko",
    name: "Korean",
    native: "한국어",
    flag: "🇰🇷"
  },
  {
    code: "fr",
    name: "French",
    native: "Français",
    flag: "🇫🇷"
  },
  {
    code: "pt",
    name: "Portuguese",
    native: "Português",
    flag: "🇵🇹"
  },
  {
    code: "it",
    name: "Italian",
    native: "Italiano",
    flag: "🇮🇹"
  },
  {
    code: "es",
    name: "Spanish",
    native: "Español",
    flag: "🇪🇸"
  },
  {
    code: "po",
    name: "Polish",
    native: "Polski",
    flag: "🇵🇱"
  },
  {
    code: "gr",
    name: "Greek",
    native: "Ελληνικά",
    flag: "🇬🇷"
  },
  {
    code: "hb",
    name: "Hebrew",
    native: "עברית",
    flag: "🇮🇱",
    rtl: true
  }
] as const;

// Helper functions
export function getLanguage(code: string) {
  return ALL_LANGUAGES.find((l) => l.code === code);
}

export function isRTL(code: string): boolean {
  const lang = getLanguage(code);
  return lang?.rtl || false;
}

// src/lib/languages.ts - Add to existing file

export const FREQUENCY_LANGUAGES = {
  ar: {
    en: "Arabic",
    native: "العربية",
    flag: "🇸🇦",
    direction: "rtl",
    fileName: "ar.json" // ✅ Exists in Freq/
  },
  de: {
    en: "German",
    native: "Deutsch",
    flag: "🇩🇪",
    direction: "ltr",
    fileName: "de.json" // ✅ Exists in Freq/
  },
  fr: {
    en: "French",
    native: "Français",
    flag: "🇫🇷",
    direction: "ltr",
    fileName: "fr.json" // ✅ Exists in Freq/
  },
  it: {
    en: "Italian",
    native: "Italiano",
    flag: "🇮🇹",
    direction: "ltr",
    fileName: "it.json" // ✅ Exists in Freq/
  },
  ru: {
    en: "Russian",
    native: "Русский",
    flag: "🇷🇺",
    direction: "ltr",
    fileName: "ru.json" // ✅ Exists in Freq/
  },
  hi: {
    en: "Hindi",
    native: "हिन्दी",
    flag: "🇮🇳",
    direction: "ltr",
    fileName: "hi.json" // ✅ Exists in Freq/
  },
  zh: {
    en: "Chinese",
    native: "中文",
    flag: "🇨🇳",
    direction: "ltr",
    fileName: "chinese-japanese-overlap.json" // ✅ Exists in Freq/
  },
  ja: {
    en: "Japanese",
    native: "日本語",
    flag: "🇯🇵",
    direction: "ltr",
    fileName: "Table of content - JapFreq.json" // ✅ Exists in Freq/
  }
} as const;

export type FrequencyLanguage =
  keyof typeof FREQUENCY_LANGUAGES;

export function getFrequencyLanguage(lang: string) {
  return FREQUENCY_LANGUAGES[lang as FrequencyLanguage];
}
