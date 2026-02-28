import { f as fallback, o as onDestroy, i as escape_html, a as attr_class, e as attr, j as ensure_array_like, b as bind_props, h as head } from "../../../chunks/vendor-svelte.js";
import { t as translateSentenceWords, L as LanguageSelector, T as TranslationConfig } from "../../../chunks/TranslationConfig.js";
import { a as getLanguage, i as isRTL, A as ALL_LANGUAGES } from "../../../chunks/languages.js";
function SentenceBreakdownModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let sourceLangInfo, targetLangInfo, isSourceRTL, isTargetRTL, showConfidence;
    let sentence = fallback($$props["sentence"], "");
    let sourceLanguage = fallback($$props["sourceLanguage"], "en");
    let targetLanguage = fallback($$props["targetLanguage"], "en");
    let isOpen = fallback($$props["isOpen"], false);
    let breakdown = [];
    let loading = false;
    let error = null;
    let fullTranslation = "";
    let translationConfidence = 0;
    onDestroy(() => {
    });
    async function loadBreakdown() {
      if (!sentence || sourceLanguage === targetLanguage) {
        breakdown = [];
        fullTranslation = sentence;
        return;
      }
      loading = true;
      error = null;
      breakdown = [];
      fullTranslation = "";
      try {
        breakdown = await translateSentenceWords(sentence, sourceLanguage, targetLanguage);
        translationConfidence = calculateConfidence(breakdown);
        fullTranslation = breakdown.map((item) => item.translation).join(" ").replace(/\[(.*?)\]/g, "$1");
      } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load word translations";
        console.error("Translation error:", err);
        const words = sentence.split(" ").filter((w) => w.trim());
        breakdown = words.map((word) => ({ word, translation: word }));
        fullTranslation = sentence;
      } finally {
        loading = false;
      }
    }
    function calculateConfidence(breakdown2) {
      if (breakdown2.length === 0) return 0;
      const successful = breakdown2.filter((item) => !item.translation.includes("[") && item.translation !== item.word).length;
      return successful / breakdown2.length;
    }
    if (isOpen && sentence && sourceLanguage !== targetLanguage) {
      loadBreakdown();
    } else if (isOpen && sourceLanguage === targetLanguage) {
      breakdown = [];
      fullTranslation = sentence;
      loading = false;
    }
    sourceLangInfo = getLanguage(sourceLanguage);
    targetLangInfo = getLanguage(targetLanguage);
    isSourceRTL = isRTL(sourceLanguage);
    isTargetRTL = isRTL(targetLanguage);
    showConfidence = translationConfidence > 0 && translationConfidence < 1;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="modal-overlay svelte-1g1jpnv" role="button" tabindex="0"><div class="modal-content svelte-1g1jpnv" role="dialog" tabindex="-1"><div class="modal-header svelte-1g1jpnv"><div class="header-title svelte-1g1jpnv"><h2 class="svelte-1g1jpnv">Sentence Breakdown</h2> `);
      if (showConfidence) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="confidence-badge svelte-1g1jpnv" title="Translation confidence">${escape_html(Math.round(translationConfidence * 100))}%
              match</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <button class="close-btn svelte-1g1jpnv" aria-label="Close">✕</button></div> <div class="sentence-display svelte-1g1jpnv"><div class="sentence-original svelte-1g1jpnv"><div class="language-label svelte-1g1jpnv">`);
      if (sourceLangInfo) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="flag svelte-1g1jpnv">${escape_html(sourceLangInfo.flag)}</span> <span class="svelte-1g1jpnv">${escape_html(sourceLangInfo.name)} (${escape_html(sourceLanguage)})</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(sourceLanguage)}`);
      }
      $$renderer2.push(`<!--]--></div> <div${attr_class("sentence-text svelte-1g1jpnv", void 0, { "rtl": isSourceRTL })}>${escape_html(sentence)}</div></div> <div class="translation-section svelte-1g1jpnv"><div class="language-label svelte-1g1jpnv">`);
      if (targetLangInfo) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="flag svelte-1g1jpnv">${escape_html(targetLangInfo.flag)}</span> <span class="svelte-1g1jpnv">${escape_html(targetLangInfo.name)} (${escape_html(targetLanguage)})</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`${escape_html(targetLanguage)}`);
      }
      $$renderer2.push(`<!--]--> <button class="copy-full-btn svelte-1g1jpnv" title="Copy full translation"${attr("disabled", !fullTranslation, true)}>📋 Copy</button></div> `);
      if (loading) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="loading-state svelte-1g1jpnv"><div class="spinner svelte-1g1jpnv"></div> <p class="svelte-1g1jpnv">Translating with LibreTranslate...</p> <p class="loading-note svelte-1g1jpnv">Using free translation service, may be
                slower</p></div>`);
      } else if (error) {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<div class="error-state svelte-1g1jpnv"><p class="svelte-1g1jpnv">⚠️ ${escape_html(error)}</p> <button class="retry-btn svelte-1g1jpnv">Retry</button></div>`);
      } else if (fullTranslation) {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<div${attr_class("full-translation svelte-1g1jpnv", void 0, { "rtl": isTargetRTL })}>${escape_html(fullTranslation)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (breakdown.length > 0 && !loading && !error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="breakdown-section svelte-1g1jpnv"><h3 class="svelte-1g1jpnv">Word-by-Word Translation</h3> <div class="word-grid svelte-1g1jpnv"><!--[-->`);
        const each_array = ensure_array_like(breakdown);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let item = each_array[index];
          $$renderer2.push(`<div class="word-pair svelte-1g1jpnv"><div${attr_class("word-original svelte-1g1jpnv", void 0, { "rtl": isSourceRTL })}><span class="word-number svelte-1g1jpnv">${escape_html(index + 1)}</span> <span class="word-text svelte-1g1jpnv">${escape_html(item.word)}</span></div> <div${attr_class("word-translation svelte-1g1jpnv", void 0, { "rtl": isTargetRTL })}>${escape_html(item.translation)} `);
          if (item.confidence !== void 0 && item.confidence < 0.7) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="low-confidence svelte-1g1jpnv" title="Low confidence translation">?</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="modal-footer svelte-1g1jpnv"><div class="footer-info svelte-1g1jpnv"><small class="svelte-1g1jpnv">Powered by <strong class="svelte-1g1jpnv">LibreTranslate</strong> - Free
            &amp; Open Source Translation</small></div> <div class="footer-actions svelte-1g1jpnv"><button class="btn-secondary svelte-1g1jpnv">Clear Cache</button> <button class="btn-primary svelte-1g1jpnv">Close</button></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { sentence, sourceLanguage, targetLanguage, isOpen });
  });
}
function MultilingualSentenceTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = fallback($$props["data"], () => [], true);
    let sourceLanguage = fallback($$props["sourceLanguage"], "en");
    let targetLanguages = fallback($$props["targetLanguages"], () => [], true);
    let showBreakdown = fallback($$props["showBreakdown"], true);
    let displayedData = [];
    let modalOpen = false;
    let selectedSentence = "";
    let breakdownSourceLang = "en";
    let breakdownTargetLang = "en";
    function getLanguageDisplay(code) {
      const lang = getLanguage(code);
      return lang ? `${lang.flag} ${lang.name}` : code.toUpperCase();
    }
    function formatSentence(sentence) {
      if (!sentence) return "";
      const text = String(sentence);
      return text.replace(/^["']|["']$/g, "").trim();
    }
    function getTranslations(row) {
      const translations = [];
      if (row[sourceLanguage]) {
        translations.push({
          language: sourceLanguage,
          text: formatSentence(row[sourceLanguage]),
          isSource: true
        });
      }
      targetLanguages.forEach((lang) => {
        if (row[lang]) {
          translations.push({
            language: lang,
            text: formatSentence(row[lang]),
            isSource: false
          });
        }
      });
      return translations;
    }
    {
      if (data && data.length > 0) {
        displayedData = [...data];
        [...data];
      }
    }
    $$renderer2.push(`<div class="table-controls svelte-x2oln8"><div class="controls-left svelte-x2oln8"><span class="count-badge svelte-x2oln8">${escape_html(
      // Group translations by row
      // Add source language
      // Add target languages
      displayedData.length
    )} sentence${escape_html(displayedData.length !== 1 ? "s" : "")}</span> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="controls-right svelte-x2oln8"><button class="control-btn shuffle-btn svelte-x2oln8" title="Shuffle sentences randomly" aria-label="Shuffle sentences"${attr("disabled", displayedData.length === 0, true)}>🔀 Shuffle</button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="sentence-grid svelte-x2oln8"><!--[-->`);
    const each_array = ensure_array_like(displayedData);
    for (let rowIndex = 0, $$length = each_array.length; rowIndex < $$length; rowIndex++) {
      let row = each_array[rowIndex];
      $$renderer2.push(`<div class="sentence-card svelte-x2oln8"><div class="sentence-header svelte-x2oln8"><span class="row-number svelte-x2oln8">#${escape_html(rowIndex + 1)}</span> `);
      if (showBreakdown && targetLanguages.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="breakdown-actions svelte-x2oln8"><!--[-->`);
        const each_array_1 = ensure_array_like(targetLanguages);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let lang = each_array_1[$$index];
          if (row[lang]) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="breakdown-btn svelte-x2oln8"${attr("title", `Word-by-word breakdown for ${getLanguageDisplay(lang)}`)}${attr("aria-label", `Breakdown for ${getLanguageDisplay(lang)}`)}>${escape_html(getLanguage(lang)?.flag || lang)}</button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="translations-block svelte-x2oln8"><!--[-->`);
      const each_array_2 = ensure_array_like(getTranslations(row));
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let translation = each_array_2[$$index_1];
        $$renderer2.push(`<div${attr_class("translation-item svelte-x2oln8", void 0, {
          "source-item": translation.isSource,
          "rtl": isRTL(translation.language)
        })}><div class="language-label svelte-x2oln8"><span class="language-flag svelte-x2oln8">${escape_html(getLanguage(translation.language)?.flag || translation.language)}</span> <span class="language-name svelte-x2oln8">${escape_html(getLanguage(translation.language)?.name || translation.language.toUpperCase())}</span> `);
        if (translation.isSource) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="source-badge svelte-x2oln8">Source</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <div${attr_class("sentence-text svelte-x2oln8", void 0, { "rtl-text": isRTL(translation.language) })}>${escape_html(translation.text)}</div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showBreakdown) {
      $$renderer2.push("<!--[-->");
      SentenceBreakdownModal($$renderer2, {
        sentence: selectedSentence,
        sourceLanguage: breakdownSourceLang,
        targetLanguage: breakdownTargetLang,
        isOpen: modalOpen
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { data, sourceLanguage, targetLanguages, showBreakdown });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedLanguages = ["en", "ar", "ru", "ch"];
    let sourceLanguage = "en";
    let dataset = "sentences";
    const DATASET_INFO = {
      sentences: {
        name: "Basic Sentences",
        description: "~1,300 basic multilingual sentences",
        icon: "📚"
      },
      "1000-sentences": {
        name: "1000 Sentences",
        description: "~2,000 core vocabulary sentences",
        icon: "⭐"
      },
      asti: {
        name: "Asti Sentences",
        description: "Asti language examples",
        icon: "🗣️"
      }
    };
    let allSentences = [];
    let filteredSentences = [];
    let page = 1;
    let pageSize = 200;
    let totalItems = 0;
    let searchQuery = "";
    let sentenceCount = 0;
    let availableLanguages = [];
    let showTranslationConfig = false;
    let currentDatasetInfo = DATASET_INFO.sentences;
    function filterSentences() {
      let result = [...allSentences];
      totalItems = result.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      filteredSentences = result.slice(start, end);
    }
    {
      filterSentences();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1iag91d", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Multilingual Sentences</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Compare sentences across multiple languages with word-by-word breakdown" class="svelte-1iag91d"/>`);
      });
      $$renderer3.push(`<div class="container svelte-1iag91d"><header class="svelte-1iag91d"><h1 class="svelte-1iag91d">Multilingual Sentences</h1> <p class="subtitle svelte-1iag91d">Compare sentences across languages with word-by-word
      translation breakdown</p></header> <div class="content svelte-1iag91d"><aside class="sidebar svelte-1iag91d"><div class="card dataset-card svelte-1iag91d"><h3 class="svelte-1iag91d">📊 Dataset Selection</h3> <div class="dataset-selector svelte-1iag91d"><!--[-->`);
      const each_array = ensure_array_like(Object.entries(DATASET_INFO));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let [key, info] = each_array[$$index];
        $$renderer3.push(`<label${attr_class("dataset-option svelte-1iag91d", void 0, { "selected": dataset === key })}><input type="radio" name="dataset"${attr("value", key)}${attr("checked", dataset === key, true)} class="svelte-1iag91d"/> <span class="dataset-label svelte-1iag91d"><span class="dataset-icon svelte-1iag91d">${escape_html(info.icon)}</span> <span class="dataset-details svelte-1iag91d"><span class="dataset-name svelte-1iag91d">${escape_html(info.name)}</span> <span class="dataset-description svelte-1iag91d">${escape_html(info.description)}</span></span></span> `);
        if (dataset === key) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span class="selected-badge svelte-1iag91d">✓ Selected</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></label>`);
      }
      $$renderer3.push(`<!--]--></div></div> <div class="card svelte-1iag91d">`);
      LanguageSelector($$renderer3, {
        maxSelection: 6,
        get selectedLanguages() {
          return selectedLanguages;
        },
        set selectedLanguages($$value) {
          selectedLanguages = $$value;
          $$settled = false;
        },
        get sourceLanguage() {
          return sourceLanguage;
        },
        set sourceLanguage($$value) {
          sourceLanguage = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="card stats svelte-1iag91d"><h3 class="svelte-1iag91d">📈 Statistics</h3> <div class="stats-grid svelte-1iag91d"><div class="stat-item svelte-1iag91d"><span class="stat-label svelte-1iag91d">Dataset:</span> <span class="stat-value highlight svelte-1iag91d">${escape_html(currentDatasetInfo.icon)}
              ${escape_html(currentDatasetInfo.name)}</span></div> <div class="stat-item svelte-1iag91d"><span class="stat-label svelte-1iag91d">Total Sentences:</span> <span class="stat-value svelte-1iag91d">${escape_html(sentenceCount.toLocaleString())}</span></div> <div class="stat-item svelte-1iag91d"><span class="stat-label svelte-1iag91d">Selected Languages:</span> <span class="stat-value language-flags svelte-1iag91d"><!--[-->`);
      const each_array_1 = ensure_array_like(selectedLanguages);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let lang = each_array_1[$$index_1];
        $$renderer3.push(`<span class="flag-badge svelte-1iag91d"${attr("title", ALL_LANGUAGES.find((l) => l.code === lang)?.name)}>${escape_html(ALL_LANGUAGES.find((l) => l.code === lang)?.flag || lang)}</span>`);
      }
      $$renderer3.push(`<!--]--></span></div> <div class="stat-item svelte-1iag91d"><span class="stat-label svelte-1iag91d">Source Language:</span> <span class="stat-value source-highlight svelte-1iag91d">${escape_html(ALL_LANGUAGES.find((l) => l.code === sourceLanguage)?.flag)}
              ${escape_html(ALL_LANGUAGES.find((l) => l.code === sourceLanguage)?.name)}</span></div> <div class="stat-item svelte-1iag91d"><span class="stat-label svelte-1iag91d">Available Languages:</span> <span class="stat-value svelte-1iag91d">${escape_html(availableLanguages.length)}</span></div></div></div> <div class="card tips svelte-1iag91d"><h3 class="svelte-1iag91d">💡 Tips</h3> <ul class="svelte-1iag91d"><li class="svelte-1iag91d">✨ Click any sentence to copy it to clipboard</li> <li class="svelte-1iag91d">🔍 Click language flags for word-by-word
            breakdown</li> <li class="svelte-1iag91d">🎯 Source language is highlighted in blue</li> <li class="svelte-1iag91d">📱 Cards stack vertically on mobile for easy
            reading</li> <li class="svelte-1iag91d">🔄 Use shuffle to randomize practice order</li></ul></div></aside> <main class="main-content svelte-1iag91d"><div class="controls svelte-1iag91d"><div class="search-container svelte-1iag91d"><input type="text" placeholder="🔍 Search in selected languages..."${attr("value", searchQuery)} class="search-input svelte-1iag91d"/> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <button class="config-btn svelte-1iag91d" title="Translation settings">⚙️ Settings</button></div> <div class="control-group svelte-1iag91d"><div class="page-size-selector svelte-1iag91d"><label for="pageSize" class="visually-hidden svelte-1iag91d">Sentences per page</label> `);
      $$renderer3.select(
        { id: "pageSize", value: pageSize, class: "" },
        ($$renderer4) => {
          $$renderer4.option(
            { value: 10, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`10 per page`);
            },
            "svelte-1iag91d"
          );
          $$renderer4.option(
            { value: 20, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`20 per page`);
            },
            "svelte-1iag91d"
          );
          $$renderer4.option(
            { value: 50, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`50 per page`);
            },
            "svelte-1iag91d"
          );
          $$renderer4.option(
            { value: 100, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`100 per page`);
            },
            "svelte-1iag91d"
          );
          $$renderer4.option(
            { value: 200, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`200 per page`);
            },
            "svelte-1iag91d"
          );
        },
        "svelte-1iag91d"
      );
      $$renderer3.push(`</div> <span class="results-count svelte-1iag91d">Showing <strong class="svelte-1iag91d">${escape_html(filteredSentences.length)}</strong> of <strong class="svelte-1iag91d">${escape_html(totalItems.toLocaleString())}</strong> sentences</span></div></div> `);
      if (filteredSentences.length > 0) {
        $$renderer3.push("<!--[1-->");
        $$renderer3.push(`<div class="table-wrapper svelte-1iag91d">`);
        MultilingualSentenceTable($$renderer3, {
          data: filteredSentences,
          sourceLanguage,
          targetLanguages: selectedLanguages.filter((l) => l !== sourceLanguage),
          showBreakdown: true
        });
        $$renderer3.push(`<!----></div> <div class="pagination svelte-1iag91d"><button${attr("disabled", page <= 1, true)} class="pagination-btn svelte-1iag91d">← Previous</button> <div class="page-info svelte-1iag91d"><span class="current-page svelte-1iag91d">Page ${escape_html(page)}</span> <span class="total-pages svelte-1iag91d">of ${escape_html(Math.ceil(totalItems / pageSize))}</span> <span class="page-size-info svelte-1iag91d">(${escape_html(pageSize)} per page)</span></div> <button${attr("disabled", page >= Math.ceil(totalItems / pageSize), true)} class="pagination-btn svelte-1iag91d">Next →</button></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="empty-state svelte-1iag91d"><div class="empty-icon svelte-1iag91d">📝</div> <h3 class="svelte-1iag91d">No sentences available</h3> <p class="svelte-1iag91d">Try selecting a different dataset or adjusting
            your language selection</p> <button class="btn-primary svelte-1iag91d">Load Basic Sentences</button></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      TranslationConfig($$renderer3, {
        get showConfig() {
          return showTranslationConfig;
        },
        set showConfig($$value) {
          showTranslationConfig = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></main></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
