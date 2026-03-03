// languagePatternsSyntax.js - Language detection for syntax analysis

const syntaxLanguagePatterns = {
  ja: {
    name: 'Japanese',
    patterns: [
      /[ぁ-ん]/g, // Hiragana
      /[ァ-ン]/g, // Katakana
      /[一-龯]/g, // Kanji
    ],
    endpoint: '/api/analyze/japanese',
    weight: 2.0,
    script: 'cjk',
  },
  zh: {
    name: 'Chinese',
    patterns: [
      /[一-龯]/g, // Hanzi
    ],
    endpoint: '/api/analyze/chinese',
    weight: 2.0,
    script: 'cjk',
  },
  ko: {
    name: 'Korean',
    patterns: [
      /[가-힣]/g, // Hangul
    ],
    endpoint: '/api/analyze/korean',
    weight: 2.0,
    script: 'cjk',
  },
  ar: {
    name: 'Arabic',
    patterns: [
      /[\u0600-\u06FF]/g, // Arabic
    ],
    endpoint: '/api/analyze/arabic',
    weight: 1.5,
    rtl: true,
  },
  ru: {
    name: 'Russian',
    patterns: [
      /[а-яА-Я]/g, // Cyrillic
    ],
    endpoint: '/api/analyze/russian',
    weight: 1.5,
  },
  hi: {
    name: 'Hindi',
    patterns: [
      /[\u0900-\u097F]/g, // Devanagari
    ],
    endpoint: '/api/analyze/hindi',
    weight: 1.5,
  }
};

// Helper function to detect if text contains supported language
function detectSyntaxLanguage(text) {
  // Guard clauses
  if (!text || typeof text !== 'string' || text.length < 2) return null;
  
  // Ensure syntaxLanguagePatterns exists
  if (!syntaxLanguagePatterns || typeof syntaxLanguagePatterns !== 'object') {
    console.error('❌ syntaxLanguagePatterns is not available');
    return null;
  }
  
  const scores = {};
  
  try {
    // Get only the language codes (filter out any non-language properties)
    const languageCodes = Object.keys(syntaxLanguagePatterns);
    
    for (const code of languageCodes) {
      const config = syntaxLanguagePatterns[code];
      
      if (!config || !config.patterns || !Array.isArray(config.patterns)) {
        continue;
      }
      
      let score = 0;
      for (const pattern of config.patterns) {
        if (!pattern) continue;
        
        try {
          const matches = text.match(pattern);
          if (matches) {
            score += matches.length;
          }
        } catch (regexError) {
          console.warn(`⚠️ Regex error for ${code}:`, regexError);
        }
      }
      
      if (score > 0) {
        scores[code] = {
          code,
          name: config.name,
          endpoint: config.endpoint,
          weight: config.weight,
          script: config.script,
          rtl: config.rtl,
          score
        };
      }
    }
  } catch (error) {
    console.error('❌ Error during language detection:', error);
    return null;
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
  
  // Calculate confidence
  if (bestMatch) {
    bestMatch.confidence = Math.min(highestScore / text.length, 1);
    return bestMatch;
  }
  
  return null;
}

// Export both as named exports
export { syntaxLanguagePatterns, detectSyntaxLanguage };

// Also export default for backward compatibility
export default detectSyntaxLanguage;