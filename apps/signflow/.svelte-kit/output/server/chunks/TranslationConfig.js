import { f as fallback, j as ensure_array_like, a as attr_class, i as escape_html, e as attr, b as bind_props } from "./vendor-svelte.js";
import { A as ALL_LANGUAGES } from "./languages.js";
function LanguageSelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedLanguages = fallback($$props["selectedLanguages"], () => ["en", "de", "fr"], true);
    let sourceLanguage = fallback($$props["sourceLanguage"], "en");
    let showSourceSelector = fallback($$props["showSourceSelector"], true);
    let maxSelection = fallback($$props["maxSelection"], 5);
    $$renderer2.push(`<div class="language-selector svelte-19ftpm1">`);
    if (showSourceSelector) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="source-section svelte-19ftpm1"><h3 class="svelte-19ftpm1">Source Language</h3> <div class="source-languages svelte-19ftpm1"><!--[-->`);
      const each_array = ensure_array_like(selectedLanguages);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let lang = each_array[$$index];
        $$renderer2.push(`<button${attr_class("svelte-19ftpm1", void 0, { "active": sourceLanguage === lang })}>${escape_html(ALL_LANGUAGES.find((l) => l.code === lang)?.flag)}
            ${escape_html(ALL_LANGUAGES.find((l) => l.code === lang)?.name)}</button>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="target-section svelte-19ftpm1"><h3 class="svelte-19ftpm1">Target Languages (max ${escape_html(maxSelection)})</h3> <div class="language-grid svelte-19ftpm1"><!--[-->`);
    const each_array_1 = ensure_array_like(ALL_LANGUAGES);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let lang = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr("title", lang.native)}${attr_class("svelte-19ftpm1", void 0, {
        "selected": selectedLanguages.includes(lang.code),
        "source": sourceLanguage === lang.code
      })}><span class="flag svelte-19ftpm1">${escape_html(lang.flag)}</span> <span class="name svelte-19ftpm1">${escape_html(lang.name)}</span> `);
      if (sourceLanguage === lang.code) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="source-badge svelte-19ftpm1">Source</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    bind_props($$props, {
      selectedLanguages,
      sourceLanguage,
      showSourceSelector,
      maxSelection
    });
  });
}
const translationCache = /* @__PURE__ */ new Map();
const wordCache = /* @__PURE__ */ new Map();
const LIBRETRANSLATE_SERVERS = [
  "https://translate.argosopentech.com",
  // Most reliable
  "https://libretranslate.com",
  "https://translate.terraprint.co",
  "https://translate.fortaleza.ifce.edu.br"
];
const LANGUAGE_MAPPING = {
  en: "en",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
  pt: "pt",
  ru: "ru",
  ar: "ar",
  hi: "hi",
  zh: "zh",
  // Chinese
  ch: "zh",
  // Chinese (alternative code)
  ja: "ja",
  ko: "ko",
  pl: "pl",
  // Polish
  po: "pl",
  // Polish (alternative code)
  el: "el",
  // Greek
  gr: "el",
  // Greek (alternative code)
  he: "he",
  // Hebrew
  hb: "he"
  // Hebrew (alternative code)
};
async function translateViaAPI(text, sourceLang, targetLang) {
  if (sourceLang === targetLang) return text;
  const cacheKey = `api_${text}_${sourceLang}_${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
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
        type: text.split(" ").length > 1 ? "sentence" : "word"
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
    return tryServers(text, sourceLang, targetLang);
  }
}
function tokenizeSentence(sentence, language) {
  if (!sentence || typeof sentence !== "string") return [];
  const clean = sentence.replace(/[.,!?;:()\[\]{}'"`~]/g, " ").replace(/\s+/g, " ").trim();
  switch (language) {
    case "ch":
    case "ja":
      return clean.split("").filter((char) => char.trim());
    case "ko":
      return clean.split(" ").filter((word) => word);
    default:
      return clean.split(" ").filter((word) => word && word.length > 0);
  }
}
async function tryServers(text, sourceLang, targetLang) {
  const sourceCode = LANGUAGE_MAPPING[sourceLang] || sourceLang;
  const targetCode = LANGUAGE_MAPPING[targetLang] || targetLang;
  if (sourceCode === targetCode) return text;
  const cacheKey = `${text}_${sourceCode}_${targetCode}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }
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
      continue;
    }
  }
  throw new Error("All LibreTranslate servers failed");
}
async function translateWithServer(server, text, source, target) {
  const response = await fetch(`${server}/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      q: text,
      source,
      target,
      format: "text",
      api_key: ""
      // Empty for public servers
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
async function translateWord(word, sourceLang, targetLang) {
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
    return {
      word,
      translation: `[${word}]`,
      confidence: 0
    };
  }
}
async function translateSentenceWords(sentence, sourceLang, targetLang) {
  if (!sentence || sourceLang === targetLang) {
    return [];
  }
  const cacheKey = `${sentence}_${sourceLang}_${targetLang}_words`;
  if (wordCache.has(cacheKey)) {
    return wordCache.get(cacheKey);
  }
  const words = tokenizeSentence(sentence, sourceLang);
  if (words.length === 0) {
    return [];
  }
  try {
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
    const wordTranslations = await Promise.all(
      words.map(async (word) => {
        try {
          if (word.length <= 2 && /^[a-zA-Z]+$/.test(word)) {
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
    const results = wordTranslations.map(
      (result, index) => {
        if (fullTranslation) {
          result.confidence = (result.confidence || 0.5) + 0.2;
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
async function getSupportedLanguages() {
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
  return Object.entries(LANGUAGE_MAPPING).map(
    ([code, ltCode]) => ({
      code: ltCode,
      name: code
    })
  );
}
function TranslationConfig($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showConfig = fallback($$props["showConfig"], false);
    let supportedLanguages = [];
    let loading = false;
    let cacheSize = 0;
    async function loadSupportedLanguages() {
      loading = true;
      try {
        supportedLanguages = await getSupportedLanguages();
        cacheSize = estimateCacheSize();
      } catch (error) {
        console.error("Failed to load supported languages:", error);
      } finally {
        loading = false;
      }
    }
    function estimateCacheSize() {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("translation_")) {
          total += (localStorage.getItem(key) || "").length;
        }
      }
      return Math.round(total / 1024);
    }
    if (showConfig) {
      loadSupportedLanguages();
    }
    if (showConfig) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="config-overlay svelte-s7np3h"><div class="config-content svelte-s7np3h"><div class="config-header svelte-s7np3h"><h2 class="svelte-s7np3h">Translation Settings</h2> <button class="close-btn svelte-s7np3h" aria-label="Close">✕</button></div> <div class="config-body svelte-s7np3h"><div class="section svelte-s7np3h"><h3 class="svelte-s7np3h">Translation Service</h3> <p class="service-info svelte-s7np3h"><strong>LibreTranslate</strong> - Free &amp; Open Source
            Machine Translation</p> <p class="service-note svelte-s7np3h">Using public servers. Translation quality may
            vary.</p></div> <div class="section svelte-s7np3h"><h3 class="svelte-s7np3h">Supported Languages</h3> `);
      if (loading) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="loading svelte-s7np3h">Loading supported languages...</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="languages-grid svelte-s7np3h"><!--[-->`);
        const each_array = ensure_array_like(supportedLanguages);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let lang = each_array[$$index];
          $$renderer2.push(`<span class="language-tag svelte-s7np3h">${escape_html(lang.code)}: ${escape_html(lang.name)}</span>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="section svelte-s7np3h"><h3 class="svelte-s7np3h">Cache Management</h3> <div class="cache-info svelte-s7np3h"><p>Estimated cache size: <strong>${escape_html(cacheSize)} KB</strong></p> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <button class="btn-clear svelte-s7np3h">Clear Translation Cache</button> <p class="cache-note svelte-s7np3h">Clearing cache will force fresh translations but
            may be slower.</p></div> <div class="section svelte-s7np3h"><h3 class="svelte-s7np3h">Performance Tips</h3> <ul class="tips-list svelte-s7np3h"><li class="svelte-s7np3h">Common words are cached for faster translation</li> <li class="svelte-s7np3h">Long sentences may take longer to translate</li> <li class="svelte-s7np3h">Multiple servers are tried for reliability</li> <li class="svelte-s7np3h">Word-by-word translation provides learning
              insights</li></ul></div></div> <div class="config-footer svelte-s7np3h"><button class="btn-close svelte-s7np3h">Close Settings</button></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { showConfig });
  });
}
export {
  LanguageSelector as L,
  TranslationConfig as T,
  translateSentenceWords as t
};
