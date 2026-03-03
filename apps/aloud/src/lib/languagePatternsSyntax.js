// languagePatternsSyntax.js - Language detection for syntax analysis
// This is a simplified version focused on the 6 supported languages

const syntaxLanguagePatterns = {
  ja: {
    name: 'Japanese',
    patterns: [
      /[ぁ-ん]/i, // Hiragana
      /[ァ-ン]/i, // Katakana
      /[一-龯]/i, // Kanji
    ],
    endpoint: '/api/analyze/japanese',
    weight: 2.0,
    script: 'cjk',
  },
  zh: {
    name: 'Chinese',
    patterns: [
      /[一-龯]/i, // Hanzi
    ],
    endpoint: '/api/analyze/chinese',
    weight: 2.0,
    script: 'cjk',
  },
  ko: {
    name: 'Korean',
    patterns: [
      /[가-힣]/i, // Hangul
    ],
    endpoint: '/api/analyze/korean',
    weight: 2.0,
    script: 'cjk',
  },
  ar: {
    name: 'Arabic',
    patterns: [
      /[\u0600-\u06FF]/i, // Arabic
    ],
    endpoint: '/api/analyze/arabic',
    weight: 1.5,
    rtl: true,
  },
  ru: {
    name: 'Russian',
    patterns: [
      /[а-яА-Я]/i, // Cyrillic
    ],
    endpoint: '/api/analyze/russian',
    weight: 1.5,
  },
  hi: {
    name: 'Hindi',
    patterns: [
      /[\u0900-\u097F]/i, // Devanagari
    ],
    endpoint: '/api/analyze/hindi',
    weight: 1.5,
  }
};

// Helper function to detect if text contains supported language
export function detectSyntaxLanguage(text) {
  if (!text || text.length < 2) return null;
  
  const scores = {};
  
  for (const [code, config] of Object.entries(syntaxLanguagePatterns)) {
    let score = 0;
    for (const pattern of config.patterns) {
      const matches = text.match(pattern);
      if (matches) {
        score += matches.length;
      }
    }
    if (score > 0) {
      scores[code] = {
        code,
        ...config,
        score
      };
    }
  }
  
  // Return the language with highest score
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [code, data] of Object.entries(scores)) {
    if (data.score > highestScore) {
      highestScore = data.score;
      bestMatch = data;
    }
  }
  
  // Calculate confidence (rough estimate)
  if (bestMatch) {
    bestMatch.confidence = Math.min(highestScore / text.length, 1);
    return bestMatch;
  }
  
  return null;
}

// Export both named and default
export default syntaxLanguagePatterns;

// For compatibility with existing module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = syntaxLanguagePatterns;
  module.exports.detectSyntaxLanguage = detectSyntaxLanguage;
}