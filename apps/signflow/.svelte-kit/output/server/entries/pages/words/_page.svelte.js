import { f as fallback, i as escape_html, j as ensure_array_like, l as attr_style, d as stringify, a as attr_class, e as attr, b as bind_props, h as head } from "../../../chunks/vendor-svelte.js";
import { L as LanguageSelector, T as TranslationConfig } from "../../../chunks/TranslationConfig.js";
import { A as ALL_LANGUAGES } from "../../../chunks/languages.js";
function MultilingualTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let columns, displayData;
    let data = fallback($$props["data"], () => [], true);
    let sourceLanguage = fallback($$props["sourceLanguage"], "en");
    let targetLanguages = fallback($$props["targetLanguages"], () => [], true);
    let showSourceColumn = fallback($$props["showSourceColumn"], true);
    let page = fallback($$props["page"], 1);
    let pageSize = fallback($$props["pageSize"], 10);
    let shuffle = fallback($$props["shuffle"], false);
    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    function getLanguageName(code) {
      const lang = ALL_LANGUAGES.find((l) => l.code === code);
      return lang ? `${lang.flag} ${lang.name}` : code;
    }
    function getCellValue(row, key) {
      return row[key] || "-";
    }
    function triggerShuffle() {
      if (shuffle) {
        displayData = shuffleArray([...data]);
      }
    }
    columns = [
      ...showSourceColumn ? [
        {
          key: sourceLanguage,
          label: getLanguageName(sourceLanguage),
          width: "200px",
          isSource: true
        }
      ] : [],
      ...targetLanguages.map((lang) => ({
        key: lang,
        label: getLanguageName(lang),
        width: "200px",
        isSource: false
      }))
    ];
    displayData = shuffle ? shuffleArray([...data]) : data;
    $$renderer2.push(`<div class="multilingual-table svelte-12gufcr"><div class="table-header svelte-12gufcr"><div class="table-info svelte-12gufcr"><span class="item-count svelte-12gufcr">Showing ${escape_html(
      // Export the shuffle function if needed
      displayData.length
    )} items `);
    if (shuffle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="shuffle-badge svelte-12gufcr" title="Random order">🎲</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span></div> `);
    if (shuffle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="shuffle-controls svelte-12gufcr"><button class="reshuffle-btn svelte-12gufcr" title="Reshuffle the words">🔀 Reshuffle</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <table class="svelte-12gufcr"><thead><tr><th class="index svelte-12gufcr">#</th><!--[-->`);
    const each_array = ensure_array_like(columns);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let col = each_array[$$index];
      $$renderer2.push(`<th${attr_style(`width: ${stringify(col.width)};`)}${attr_class("svelte-12gufcr", void 0, { "source": col.isSource })}>${escape_html(col.label)}</th>`);
    }
    $$renderer2.push(`<!--]--><th class="actions svelte-12gufcr">Actions</th></tr></thead><tbody><!--[-->`);
    const each_array_1 = ensure_array_like(displayData);
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let row = each_array_1[i];
      $$renderer2.push(`<tr class="svelte-12gufcr"><td class="index svelte-12gufcr">${escape_html((i + 1).toString().padStart(3, "0"))}</td><!--[-->`);
      const each_array_2 = ensure_array_like(columns);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let col = each_array_2[$$index_1];
        $$renderer2.push(`<td${attr_class("svelte-12gufcr", void 0, { "source": col.isSource })}><div class="cell-content svelte-12gufcr"><span class="text svelte-12gufcr">${escape_html(getCellValue(row, col.key))}</span> <button class="copy-btn svelte-12gufcr" title="Copy to clipboard"${attr("disabled", !row[col.key], true)}>📋</button></div></td>`);
      }
      $$renderer2.push(`<!--]--><td class="actions svelte-12gufcr"><button class="copy-all-btn svelte-12gufcr" title="Copy all translations">Copy All</button></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div>`);
    bind_props($$props, {
      data,
      sourceLanguage,
      targetLanguages,
      showSourceColumn,
      page,
      pageSize,
      shuffle,
      triggerShuffle
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedLanguages = ["en", "ar", "ru", "ch"];
    let sourceLanguage = "en";
    let allWords = [];
    let filteredWords = [];
    let page = 1;
    let pageSize = 50;
    let totalItems = 0;
    let searchQuery = "";
    let isShuffled = false;
    let availableLanguages = [];
    let showTranslationConfig = false;
    function filterWords() {
      let result = [...allWords];
      totalItems = result.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      filteredWords = result.slice(start, end);
    }
    if (page || pageSize) {
      filterWords();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ggzwz6", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Multilingual Words Dictionary</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Compare words across multiple languages with translations and frequency data" class="svelte-ggzwz6"/>`);
      });
      $$renderer3.push(`<div class="container svelte-ggzwz6"><header class="svelte-ggzwz6"><h1 class="svelte-ggzwz6">📚 Multilingual Words Dictionary</h1> <p class="subtitle svelte-ggzwz6">Compare words across ${escape_html(selectedLanguages.length)} languages
      with translations and study tools</p></header> <div class="content svelte-ggzwz6"><aside class="sidebar svelte-ggzwz6"><div class="card svelte-ggzwz6">`);
      LanguageSelector($$renderer3, {
        maxSelection: 8,
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
      $$renderer3.push(`<!----></div> <div class="card stats svelte-ggzwz6"><h3 class="svelte-ggzwz6">📊 Statistics</h3> <div class="stats-grid svelte-ggzwz6"><div class="stat-item svelte-ggzwz6"><span class="stat-label svelte-ggzwz6">Total Words:</span> <span class="stat-value highlight svelte-ggzwz6">${escape_html(totalItems.toLocaleString())}</span></div> <div class="stat-item svelte-ggzwz6"><span class="stat-label svelte-ggzwz6">Available Languages:</span> <span class="stat-value svelte-ggzwz6">${escape_html(availableLanguages.length)}</span></div> <div class="stat-item svelte-ggzwz6"><span class="stat-label svelte-ggzwz6">Selected Languages:</span> <span class="stat-value language-flags svelte-ggzwz6"><!--[-->`);
      const each_array = ensure_array_like(selectedLanguages);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let lang = each_array[$$index];
        $$renderer3.push(`<span class="flag-badge svelte-ggzwz6"${attr("title", ALL_LANGUAGES.find((l) => l.code === lang)?.name)}>${escape_html(ALL_LANGUAGES.find((l) => l.code === lang)?.flag || lang)}</span>`);
      }
      $$renderer3.push(`<!--]--></span></div> <div class="stat-item svelte-ggzwz6"><span class="stat-label svelte-ggzwz6">Source Language:</span> <span class="stat-value source-highlight svelte-ggzwz6">${escape_html(ALL_LANGUAGES.find((l) => l.code === sourceLanguage)?.flag)}
              ${escape_html(ALL_LANGUAGES.find((l) => l.code === sourceLanguage)?.name)}</span></div> <div class="stat-item svelte-ggzwz6"><span class="stat-label svelte-ggzwz6">Order:</span> <span class="stat-value svelte-ggzwz6">`);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`Default`);
      }
      $$renderer3.push(`<!--]--></span></div></div></div> <div class="card shuffle-controls svelte-ggzwz6"><h3 class="svelte-ggzwz6">🎮 Display Options</h3> <button${attr_class(`shuffle-button ${stringify("")}`, "svelte-ggzwz6")} title="Shuffle/Randomize the order of words"${attr("disabled", totalItems === 0, true)}><span class="button-icon svelte-ggzwz6">${escape_html("🔀")}</span> ${escape_html("Shuffle Words")}</button> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <p class="shuffle-hint svelte-ggzwz6">`);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`Enable shuffle to randomize word order for
            better memorization`);
      }
      $$renderer3.push(`<!--]--></p></div> <div class="card tips svelte-ggzwz6"><h3 class="svelte-ggzwz6">💡 Study Tips</h3> <ul class="svelte-ggzwz6"><li class="svelte-ggzwz6">✨ Click any word to copy it to clipboard</li> <li class="svelte-ggzwz6">🎯 Source language is highlighted in blue</li> <li class="svelte-ggzwz6">🔄 Use shuffle mode for varied practice</li> <li class="svelte-ggzwz6">🔍 Search works across all selected languages</li> <li class="svelte-ggzwz6">📱 Responsive design works on all devices</li></ul></div></aside> <main class="main-content svelte-ggzwz6"><div class="controls svelte-ggzwz6"><div class="search-container svelte-ggzwz6"><input type="text" placeholder="🔍 Search in selected languages..."${attr("value", searchQuery)} class="search-input svelte-ggzwz6"/> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <button class="config-btn svelte-ggzwz6" title="Translation settings">⚙️ Settings</button></div> <div class="control-group svelte-ggzwz6"><div class="page-size-selector svelte-ggzwz6"><label for="pageSize" class="visually-hidden svelte-ggzwz6">Words per page</label> `);
      $$renderer3.select(
        { id: "pageSize", value: pageSize, class: "" },
        ($$renderer4) => {
          $$renderer4.option(
            { value: 20, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`20 per page`);
            },
            "svelte-ggzwz6"
          );
          $$renderer4.option(
            { value: 50, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`50 per page`);
            },
            "svelte-ggzwz6"
          );
          $$renderer4.option(
            { value: 100, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`100 per page`);
            },
            "svelte-ggzwz6"
          );
          $$renderer4.option(
            { value: 200, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`200 per page`);
            },
            "svelte-ggzwz6"
          );
          $$renderer4.option(
            { value: 500, class: "" },
            ($$renderer5) => {
              $$renderer5.push(`500 per page`);
            },
            "svelte-ggzwz6"
          );
        },
        "svelte-ggzwz6"
      );
      $$renderer3.push(`</div> <span class="results-count svelte-ggzwz6">Showing <strong class="svelte-ggzwz6">${escape_html(filteredWords.length)}</strong> of <strong class="svelte-ggzwz6">${escape_html(totalItems.toLocaleString())}</strong> words</span></div></div> `);
      if (filteredWords.length > 0) {
        $$renderer3.push("<!--[1-->");
        $$renderer3.push(`<div class="display-info svelte-ggzwz6">`);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> <div class="table-wrapper svelte-ggzwz6">`);
        MultilingualTable($$renderer3, {
          data: filteredWords,
          sourceLanguage,
          targetLanguages: selectedLanguages.filter((l) => l !== sourceLanguage),
          shuffle: isShuffled,
          get page() {
            return page;
          },
          set page($$value) {
            page = $$value;
            $$settled = false;
          },
          get pageSize() {
            return pageSize;
          },
          set pageSize($$value) {
            pageSize = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div> <div class="pagination svelte-ggzwz6"><button${attr("disabled", page <= 1, true)} class="pagination-btn svelte-ggzwz6">← Previous</button> <div class="page-info svelte-ggzwz6"><span class="current-page svelte-ggzwz6">Page ${escape_html(page)}</span> <span class="total-pages svelte-ggzwz6">of ${escape_html(Math.ceil(totalItems / pageSize))}</span> <span class="page-size-info svelte-ggzwz6">(${escape_html(pageSize)} words)</span></div> <button${attr("disabled", page >= Math.ceil(totalItems / pageSize), true)} class="pagination-btn svelte-ggzwz6">Next →</button></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="empty-state svelte-ggzwz6"><div class="empty-icon svelte-ggzwz6">📝</div> <h3 class="svelte-ggzwz6">No words available</h3> <p class="svelte-ggzwz6">Try selecting different languages or check back
            later</p> <button class="btn-primary svelte-ggzwz6">Load Default Selection</button></div>`);
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
