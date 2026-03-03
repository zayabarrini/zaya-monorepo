import { log } from './utils.js';

export class LanguageDetector {
  constructor(languagePatterns) {
    // Ensure we have patterns even if none provided
    this.languagePatterns = languagePatterns || window.languagePatterns || {};

    log('LanguageDetector initialized with patterns:', Object.keys(this.languagePatterns));

    this.languageToVoiceCode = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      it: 'it-IT',
      pt: 'pt-PT',
      ru: 'ru-RU',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ar: 'ar-SA',
      hi: 'hi-IN',
      ko: 'ko-KR',
      el: 'el-GR',
      he: 'he-IL',
      th: 'th-TH',
      tr: 'tr-TR',
      nl: 'nl-NL',
      sv: 'sv-SE',
      da: 'da-DK',
      no: 'no-NO',
      fi: 'fi-FI',
      pl: 'pl-PL',
      cs: 'cs-CZ',
      hu: 'hu-HU',
      ro: 'ro-RO',
    };
  }

  detectLanguage(text, debug = false) {
    if (!text || text.trim().length === 0) return 'en';
    if (!this.languagePatterns || Object.keys(this.languagePatterns).length === 0) {
      log('Language patterns not loaded, defaulting to en');
      return 'en';
    }

    const sample = text.substring(0, 500);
    let scores = {};

    // Initialize scores
    Object.keys(this.languagePatterns).forEach((lang) => {
      scores[lang] = 0;
    });

    if (debug) console.log('\n📊 ANALYSIS FOR LANGUAGE DETECTION:');

    // Script detection (highest weight - 1000 points)
    const hasCJK = /[一-龯ぁ-んァ-ン가-힣]/.test(sample);
    const hasCyrillic = /[а-яА-Я]/.test(sample);
    const hasArabic = /[\u0600-\u06FF]/.test(sample);
    const hasDevanagari = /[\u0900-\u097F]/.test(sample);
    const hasGreek = /[α-ωΑ-Ω]/.test(sample);
    const hasHebrew = /[\u0590-\u05FF]/.test(sample);
    const hasThai = /[ก-๙]/.test(sample);

    if (debug) {
      console.log('\n📝 Script detection:');
      if (hasCJK) console.log('  ✅ CJK script detected');
      if (hasCyrillic) console.log('  ✅ Cyrillic script detected');
      if (hasArabic) console.log('  ✅ Arabic script detected');
      if (hasDevanagari) console.log('  ✅ Devanagari script detected');
      if (hasGreek) console.log('  ✅ Greek script detected');
      if (hasHebrew) console.log('  ✅ Hebrew script detected');
      if (hasThai) console.log('  ✅ Thai script detected');
    }

    // Script-based scoring
    if (hasCJK) {
      if (/[ぁ-んァ-ン]/.test(sample)) {
        if (debug) console.log('  ✅ Japanese (hiragana/katakana)');
        scores['ja'] += 1000;
      }
      if (/[가-힣]/.test(sample)) {
        if (debug) console.log('  ✅ Korean (Hangul)');
        scores['ko'] += 1000;
      }
      if (/[一-龯]/.test(sample) && !/[ぁ-んァ-ン가-힣]/.test(sample)) {
        if (debug) console.log('  ✅ Chinese (Hanzi)');
        scores['zh'] += 1000;
      }
    }

    if (hasCyrillic) {
      if (/[ёЁ]/.test(sample)) {
        if (debug) console.log('  ✅ Russian (Cyrillic with ё)');
        scores['ru'] += 1000;
      } else {
        if (debug) console.log('  ✅ Other Cyrillic language');
        scores['ru'] += 1000; // Default to Russian for now
      }
    }

    if (hasArabic) scores['ar'] += 1000;
    if (hasDevanagari) scores['hi'] += 1000;
    if (hasGreek) scores['el'] += 1000;
    if (hasHebrew) scores['he'] += 1000;
    if (hasThai) scores['th'] += 1000;

    // For non-Latin scripts, return early with minimal logging
    if (hasCJK || hasCyrillic || hasArabic || hasDevanagari || hasGreek || hasHebrew || hasThai) {
      if (debug) {
        console.log('\n🏆 Final scores (top 3):');
        const sorted = Object.entries(scores)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);
        sorted.forEach(([lang, score]) => console.log(`  ${lang}: ${score}`));
        console.log(`\n✅ Detected: ${Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]}`);
      }
      return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    }

    // For Latin scripts, do detailed analysis
    const words = sample
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    if (debug) console.log('\n🔤 Analyzing Latin script text...');

    // Language-specific character sets with higher weights
    const characterSets = {
      sv: { pattern: /[åäö]/g, name: 'Swedish', weight: 40 },
      da: { pattern: /[æøå]/g, name: 'Danish', weight: 40 },
      no: { pattern: /[æøå]/g, name: 'Norwegian', weight: 40 },
      de: { pattern: /[äöüß]/g, name: 'German', weight: 40 },
      fr: { pattern: /[àâäéèêëïîôöùûüÿçœæ]/g, name: 'French', weight: 40 },
      es: { pattern: /[áéíóúüñ¿¡]/g, name: 'Spanish', weight: 40 },
      it: { pattern: /[àèéìíîòóùú]/g, name: 'Italian', weight: 30 },
      pt: { pattern: /[áâãàçéêíóôõú]/g, name: 'Portuguese', weight: 40 },
      pl: { pattern: /[ąćęłńóśźż]/g, name: 'Polish', weight: 50 },
      cs: { pattern: /[áčďéěíňóřšťúůýž]/g, name: 'Czech', weight: 50 },
      hu: { pattern: /[áéíóöőúüű]/g, name: 'Hungarian', weight: 50 },
      ro: { pattern: /[ăâîșț]/g, name: 'Romanian', weight: 50 },
      tr: { pattern: /[çğıİöşü]/g, name: 'Turkish', weight: 50 },
      nl: { pattern: /[áàäéèëíïóöúü]/g, name: 'Dutch', weight: 20 },
      fi: { pattern: /[äåö]/g, name: 'Finnish', weight: 40 },
    };

    if (debug) console.log('\n📊 Character scores:');
    for (let [lang, data] of Object.entries(characterSets)) {
      const matches = (sample.match(data.pattern) || []).length;
      if (matches > 0) {
        const points = matches * data.weight;
        scores[lang] += points;
        if (debug) console.log(`  ${lang} (${data.name}): +${points} (${matches} special chars)`);
      }
    }

    // NORDIC LANGUAGE DISTINCTION - Comprehensive word lists
    const nordicWords = {
      sv: {
        words: [
          'och',
          'att',
          'det',
          'som',
          'en',
          'är',
          'för',
          'på',
          'med',
          'till',
          'av',
          'den',
          'ett',
          'har',
          'inte',
          'men',
          'om',
          'när',
          'han',
          'hon',
          'dig',
          'mig',
          'oss',
          'var',
          'här',
          'också',
          'bara',
          'kan',
          'ska',
          'vill',
          'skulle',
          'deras',
          'där',
          'denna',
          'detta',
          'svenska',
          'sverige',
          'stockholm',
          'hej',
          'tack',
          'god',
          'dag',
          'kväll',
          'morgon',
          'flicka',
          'pojke',
          'man',
          'kvinna',
          'hus',
          'bil',
          'bok',
          'skola',
          'arbete',
          'mat',
        ],
        name: 'Swedish',
      },
      da: {
        words: [
          'og',
          'at',
          'det',
          'som',
          'en',
          'er',
          'for',
          'på',
          'med',
          'til',
          'af',
          'den',
          'et',
          'har',
          'ikke',
          'men',
          'om',
          'når',
          'han',
          'hun',
          'dig',
          'mig',
          'os',
          'var',
          'her',
          'også',
          'bare',
          'kan',
          'skal',
          'vil',
          'ville',
          'deres',
          'der',
          'denne',
          'dette',
          'dansk',
          'danmark',
          'københavn',
          'hej',
          'tak',
          'god',
          'dag',
          'aften',
          'morgen',
          'pige',
          'dreng',
          'mand',
          'kvinde',
          'hus',
          'bil',
          'bog',
          'skole',
          'arbejde',
          'mad',
        ],
        name: 'Danish',
      },
      no: {
        words: [
          'og',
          'at',
          'det',
          'som',
          'en',
          'er',
          'for',
          'på',
          'med',
          'til',
          'av',
          'den',
          'ett',
          'har',
          'ikke',
          'men',
          'om',
          'når',
          'han',
          'hun',
          'deg',
          'meg',
          'seg',
          'oss',
          'var',
          'her',
          'også',
          'bare',
          'kan',
          'skal',
          'vil',
          'ville',
          'deres',
          'der',
          'denne',
          'dette',
          'norsk',
          'norge',
          'oslo',
          'hei',
          'takk',
          'god',
          'dag',
          'kveld',
          'morgen',
          'jente',
          'gutt',
          'mann',
          'kvinne',
          'hus',
          'bil',
          'bok',
          'skole',
          'arbeid',
          'mat',
        ],
        name: 'Norwegian',
      },
      fi: {
        words: [
          'ja',
          'on',
          'se',
          'että',
          'ei',
          'oli',
          'mutta',
          'niin',
          'ovat',
          'ole',
          'hän',
          'joka',
          'sillä',
          'kuin',
          'kanssa',
          'voi',
          'tämä',
          'tuo',
          'nämä',
          'ne',
          'minä',
          'sinä',
          'me',
          'te',
          'he',
          'minun',
          'sinun',
          'meidän',
          'teidän',
          'heidän',
          'täällä',
          'siellä',
          'suomi',
          'suomalainen',
          'helsinki',
          'hei',
          'kiitos',
          'hyvä',
          'päivä',
          'ilta',
          'aamu',
          'tyttö',
          'poika',
          'mies',
          'nainen',
          'talo',
          'auto',
          'kirja',
          'koulu',
          'työ',
          'ruoka',
        ],
        name: 'Finnish',
      },
    };

    if (debug) console.log('\n📖 Nordic language word matches:');

    // Count word matches for each Nordic language
    for (let word of words) {
      for (let [lang, data] of Object.entries(nordicWords)) {
        if (data.words.includes(word)) {
          // Higher weight for distinctive words
          let weight = 30;

          // Extra weight for language-defining words
          if (
            [
              'svenska',
              'sverige',
              'dansk',
              'danmark',
              'norsk',
              'norge',
              'suomi',
              'suomalainen',
            ].includes(word)
          ) {
            weight = 60;
          }

          // Extra weight for pronouns (very distinctive)
          if (
            [
              'jag',
              'du',
              'han',
              'hon',
              'vi',
              'ni',
              'de',
              'jeg',
              'deg',
              'meg',
              'dig',
              'mig',
              'minä',
              'sinä',
              'hän',
            ].includes(word)
          ) {
            weight = 50;
          }

          scores[lang] += weight;
          if (debug) console.log(`  ${lang} (${data.name}): +${weight} (word: "${word}")`);
        }
      }
    }

    // Other language word lists (non-Nordic)
    const otherWords = {
      fr: {
        words: [
          'le',
          'la',
          'les',
          'et',
          'de',
          'que',
          'dans',
          'est',
          'pour',
          'avec',
          'sur',
          'qui',
          'pas',
          'plus',
          'tout',
          'faire',
        ],
        weight: 25,
        name: 'French',
      },
      de: {
        words: [
          'der',
          'die',
          'das',
          'und',
          'zu',
          'von',
          'mit',
          'auf',
          'für',
          'ist',
          'im',
          'dem',
          'den',
          'des',
          'bei',
          'aus',
        ],
        weight: 25,
        name: 'German',
      },
      es: {
        words: [
          'el',
          'la',
          'los',
          'las',
          'y',
          'en',
          'de',
          'que',
          'por',
          'para',
          'con',
          'un',
          'una',
        ],
        weight: 25,
        name: 'Spanish',
      },
      it: {
        words: ['il', 'la', 'gli', 'le', 'e', 'di', 'che', 'per', 'con', 'su', 'in', 'da'],
        weight: 25,
        name: 'Italian',
      },
      pt: {
        words: ['o', 'a', 'os', 'as', 'e', 'de', 'do', 'da', 'em', 'para', 'com', 'por'],
        weight: 25,
        name: 'Portuguese',
      },
      nl: {
        words: ['de', 'het', 'een', 'van', 'op', 'in', 'met', 'voor', 'aan', 'bij', 'door'],
        weight: 25,
        name: 'Dutch',
      },
      en: {
        words: ['the', 'and', 'of', 'to', 'in', 'that', 'is', 'was', 'for', 'with'],
        weight: 15,
        name: 'English',
      },
    };

    if (debug) console.log('\n📖 Other language word matches:');
    for (let word of words) {
      for (let [lang, data] of Object.entries(otherWords)) {
        if (data.words.includes(word)) {
          scores[lang] += data.weight;
          if (debug) console.log(`  ${lang} (${data.name}): +${data.weight} (word: "${word}")`);
        }
      }
    }

    // Pattern matching from languagePatterns
    if (debug) console.log('\n🎯 Pattern matches:');
    for (let [lang, config] of Object.entries(this.languagePatterns)) {
      let patternMatches = 0;
      for (let pattern of config.patterns) {
        const matches = (sample.match(pattern) || []).length;
        patternMatches += matches * (config.weight || 2.0);
      }
      if (patternMatches > 0) {
        scores[lang] += patternMatches;
        if (debug && patternMatches > 1) {
          console.log(`  ${lang}: +${patternMatches.toFixed(1)}`);
        }
      }
    }

    // SPECIALIZED NORDIC LANGUAGE BOOSTS
    if (debug) console.log('\n🚀 Nordic language special boosts:');

    // Character-based boosts
    if (/[åäö]/.test(sample)) {
      // Swedish uses å, ä, ö
      if (/[å]/.test(sample) && /[ä]/.test(sample) && /[ö]/.test(sample)) {
        scores['sv'] += 80;
        if (debug) console.log('  sv: +80 (all Swedish chars åäö)');
      }
    }

    if (/[æøå]/.test(sample)) {
      // Danish and Norwegian use æ, ø, å
      if (/[æ]/.test(sample) && /[ø]/.test(sample)) {
        scores['da'] += 60;
        scores['no'] += 60;
        if (debug) console.log('  da/no: +60 (both æ and ø)');
      }
    }

    // Specific word pattern boosts
    if (/\b(?:och|att|det|är)\b/i.test(sample)) {
      scores['sv'] += 50;
      if (debug) console.log('  sv: +50 (common Swedish words)');
    }

    if (/\b(?:og|at|det|er)\b/i.test(sample)) {
      scores['da'] += 50;
      scores['no'] += 50;
      if (debug) console.log('  da/no: +50 (common Danish/Norwegian words)');
    }

    // Swedish vs Finnish distinction
    if (/[åäö]/.test(sample)) {
      // Finnish uses ä and ö but not å in native words
      if (/[å]/.test(sample) && !/[ä]{3,}/.test(sample)) {
        scores['sv'] += 100;
        scores['fi'] -= 30;
        if (debug) console.log('  sv: +100 (Swedish å present, not heavy Finnish ä usage)');
      }

      // Finnish has more agglutination (long words)
      const longWords = words.filter((w) => w.length > 8).length;
      if (longWords > 2) {
        scores['fi'] += longWords * 30;
        if (debug)
          console.log(`  fi: +${longWords * 30} (${longWords} long words - agglutination)`);
      }
    }

    // Danish vs Norwegian distinction
    if (/[æøå]/.test(sample)) {
      // Check for distinctive words
      if (/\b(?:meg|deg|seg)\b/i.test(sample)) {
        scores['no'] += 80;
        if (debug) console.log('  no: +80 (Norwegian pronouns meg/deg/seg)');
      }

      if (/\b(?:mig|dig|sig)\b/i.test(sample)) {
        scores['da'] += 80;
        if (debug) console.log('  da: +80 (Danish pronouns mig/dig/sig)');
      }

      // Check for word endings
      if (/\b(?:venn|mann|kvinne|jente|gutt)\b/i.test(sample)) {
        scores['no'] += 60;
        if (debug) console.log('  no: +60 (Norwegian word forms)');
      }

      if (/\b(?:ven|mand|kvinde|pige|dreng)\b/i.test(sample)) {
        scores['da'] += 60;
        if (debug) console.log('  da: +60 (Danish word forms)');
      }
    }

    // Get top language
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const detectedLang = sortedScores[0][0];

    if (debug) {
      console.log('\n🏆 Final scores (top 5):');
      sortedScores.slice(0, 5).forEach(([lang, score]) => console.log(`  ${lang}: ${score}`));
      console.log(`\n✅ Detected: ${detectedLang}`);
    }

    return detectedLang;
  }

  // Keep simpleDetectLanguage as a fallback
  simpleDetectLanguage(text) {
    // Fallback when patterns aren't available
    const sample = text.substring(0, 200);

    if (/[а-яА-Я]/.test(sample)) return 'ru';
    if (/[\u0600-\u06FF]/.test(sample)) return 'ar';
    if (/[一-龯]/.test(sample)) {
      if (/[ぁ-んァ-ン]/.test(sample)) return 'ja';
      if (/[가-힣]/.test(sample)) return 'ko';
      return 'zh';
    }
    if (/[α-ωΑ-Ω]/.test(sample)) return 'el';
    if (/[\u0590-\u05FF]/.test(sample)) return 'he';
    if (/[ก-๙]/.test(sample)) return 'th';

    return 'en';
  }

  getLanguageName(langCode) {
    const names = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ja: 'Japanese',
      zh: 'Chinese',
      ar: 'Arabic',
      hi: 'Hindi',
      ko: 'Korean',
      el: 'Greek',
      he: 'Hebrew',
      th: 'Thai',
      tr: 'Turkish',
      nl: 'Dutch',
      sv: 'Swedish',
      da: 'Danish',
      no: 'Norwegian',
      fi: 'Finnish',
      pl: 'Polish',
      cs: 'Czech',
      hu: 'Hungarian',
      ro: 'Romanian',
    };
    return names[langCode] || langCode.toUpperCase();
  }

  getVoiceCode(langCode) {
    return this.languageToVoiceCode[langCode] || 'en-US';
  }
}
