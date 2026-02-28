import { f as fallback, e as attr, i as escape_html, a as attr_class, j as ensure_array_like, b as bind_props, h as head } from "../../../../chunks/vendor-svelte.js";
import "@sveltejs/kit/internal";
import "@sveltejs/kit/internal/server";
import { a as getLanguage, i as isRTL } from "../../../../chunks/languages.js";
function FrequencyTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isTargetRTL, paginatedWords, totalPages;
    let words = fallback($$props["words"], () => [], true);
    let language = fallback($$props["language"], "");
    let languageName = fallback($$props["languageName"], "");
    let nativeName = fallback($$props["nativeName"], "");
    let showFilters = fallback($$props["showFilters"], true);
    let filteredWords = [];
    let searchQuery = "";
    let minRank = 1;
    let maxRank = 1e4;
    let sortBy = "rank";
    let sortDirection = "asc";
    let page = 1;
    let pageSize = 200;
    function filterAndSortWords() {
      let result = [...words];
      result = result.filter((word) => word.rank >= minRank && word.rank <= maxRank);
      result.sort((a, b) => {
        let aValue, bValue;
        switch (sortBy) {
          case "word":
            aValue = a.word.toLowerCase();
            bValue = b.word.toLowerCase();
            break;
          case "en":
            aValue = a.en.toLowerCase();
            bValue = b.en.toLowerCase();
            break;
          case "frequency":
            aValue = a.frequency;
            bValue = b.frequency;
            break;
          case "rank":
          default:
            aValue = a.rank;
            bValue = b.rank;
        }
        {
          return aValue > bValue ? 1 : -1;
        }
      });
      return result;
    }
    getLanguage(language);
    isTargetRTL = isRTL(language);
    {
      filteredWords = filterAndSortWords();
    }
    paginatedWords = filteredWords.slice((page - 1) * pageSize, page * pageSize);
    totalPages = Math.ceil(filteredWords.length / pageSize);
    $$renderer2.push(`<div class="frequency-table-container svelte-qwzh0i">`);
    if (
      // Cleanup
      showFilters
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="table-filters svelte-qwzh0i"><div class="filter-group svelte-qwzh0i"><input type="text" placeholder="Search words or translations..."${attr("value", searchQuery)} class="search-input svelte-qwzh0i" aria-label="Search frequency words"/> <div class="rank-filter svelte-qwzh0i"><label class="svelte-qwzh0i">Rank Range:</label> <input type="number"${attr("value", minRank)} min="1" max="10000" class="rank-input svelte-qwzh0i" aria-label="Minimum rank"/> <span class="svelte-qwzh0i">to</span> <input type="number"${attr("value", maxRank)} min="1" max="10000" class="rank-input svelte-qwzh0i" aria-label="Maximum rank"/></div></div> <div class="stats-badge svelte-qwzh0i">Showing ${escape_html(filteredWords.length.toLocaleString())} of ${escape_html(words.length.toLocaleString())}
        words</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="table-wrapper svelte-qwzh0i"><table class="frequency-table svelte-qwzh0i"><thead class="svelte-qwzh0i"><tr class="svelte-qwzh0i"><th${attr_class("sortable svelte-qwzh0i", void 0, { "active": sortBy === "rank" })}${attr("aria-sort", sortDirection)}>Rank `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="sort-icon svelte-qwzh0i">${escape_html("↑")}</span>`);
    }
    $$renderer2.push(`<!--]--></th><th${attr_class("sortable svelte-qwzh0i", void 0, { "active": sortBy === "word" })}${attr("aria-sort", "none")}>${escape_html(languageName)} Word `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></th><th${attr_class("sortable svelte-qwzh0i", void 0, { "active": sortBy === "en" })}${attr("aria-sort", "none")}>English Translation `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></th></tr></thead><tbody class="svelte-qwzh0i"><!--[-->`);
    const each_array = ensure_array_like(paginatedWords);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let word = each_array[$$index];
      $$renderer2.push(`<tr class="frequency-row svelte-qwzh0i"><td class="rank-cell svelte-qwzh0i"><span class="rank-badge svelte-qwzh0i">${escape_html(word.rank)}</span></td><td${attr_class("word-cell svelte-qwzh0i", void 0, { "rtl": isTargetRTL })}><div class="word-content svelte-qwzh0i" role="button" tabindex="0"><span class="word-text svelte-qwzh0i">${escape_html(word.word)}</span></div></td><td class="translation-cell svelte-qwzh0i"><div class="translation-content svelte-qwzh0i" role="button" tabindex="0"><span class="translation-text svelte-qwzh0i">${escape_html(word.en)}</span></div></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div> `);
    if (totalPages > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="pagination svelte-qwzh0i"><button class="pagination-btn svelte-qwzh0i"${attr("disabled", page <= 1, true)} aria-label="Previous page">← Previous</button> <div class="page-info svelte-qwzh0i"><span class="svelte-qwzh0i">Page ${escape_html(page)} of ${escape_html(totalPages)}</span> `);
      $$renderer2.select(
        { value: pageSize, class: "page-size-select" },
        ($$renderer3) => {
          $$renderer3.option(
            { value: 50, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`50 per page`);
            },
            "svelte-qwzh0i"
          );
          $$renderer3.option(
            { value: 100, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`100 per page`);
            },
            "svelte-qwzh0i"
          );
          $$renderer3.option(
            { value: 200, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`200 per page`);
            },
            "svelte-qwzh0i"
          );
          $$renderer3.option(
            { value: 500, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`500 per page`);
            },
            "svelte-qwzh0i"
          );
        },
        "svelte-qwzh0i"
      );
      $$renderer2.push(`</div> <button class="pagination-btn svelte-qwzh0i"${attr("disabled", page >= totalPages, true)} aria-label="Next page">Next →</button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { words, language, languageName, nativeName, showFilters });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pageTitle, pageDescription;
    let data = $$props["data"];
    let frequencyWords = data.data || [];
    let meta = data.meta || {};
    let langInfo = data.langInfo;
    let language = data.language;
    let searchQuery = data.initialSearch || "";
    let minRank = data.initialMinRank || 1;
    let maxRank = data.initialMaxRank || 1e4;
    let currentPage = data.initialPage || 1;
    let pageSize = data.initialPageSize || 100;
    pageTitle = langInfo ? `${langInfo.en} Frequency List` : "Frequency List";
    pageDescription = langInfo ? `Top 10,000 most common ${langInfo.en} words with English translations` : "Word frequency list";
    head("18gmq", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(pageTitle)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", pageDescription)} class="svelte-18gmq"/>`);
    });
    $$renderer2.push(`<div class="frequency-page svelte-18gmq">`);
    if (!langInfo) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="error-container svelte-18gmq"><h1 class="svelte-18gmq">Language Not Found</h1> <p class="svelte-18gmq">The frequency list for "${escape_html(language)}" is not
        available.</p> <a href="/frequency" class="back-link svelte-18gmq">← Back to All Languages</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<header class="page-header svelte-18gmq"><div class="header-content svelte-18gmq"><a href="/frequency" class="back-link svelte-18gmq">← All Languages</a> <div class="language-header svelte-18gmq"><div class="title-section svelte-18gmq"><h1 class="svelte-18gmq"><span class="flag svelte-18gmq">${escape_html(langInfo.flag)}</span> ${escape_html(langInfo.en)} Frequency List</h1> <p class="native-name svelte-18gmq">${escape_html(langInfo.native)}</p> <p class="description svelte-18gmq">Top 10,000 most common words with English
              translations. Mastering these gives you ~80%
              understanding of ${escape_html(langInfo.en)} text.</p></div> <div class="header-actions svelte-18gmq"><button class="action-btn svelte-18gmq">📋 Copy Top 100</button> <button class="action-btn svelte-18gmq">📥 Download CSV</button></div></div> <div class="stats svelte-18gmq"><div class="stat svelte-18gmq"><span class="stat-value svelte-18gmq">${escape_html((meta.total || 1e4).toLocaleString())}</span> <span class="stat-label svelte-18gmq">Total Words</span></div> <div class="stat svelte-18gmq"><span class="stat-value svelte-18gmq">80%</span> <span class="stat-label svelte-18gmq">Coverage</span></div> <div class="stat svelte-18gmq"><span class="stat-value svelte-18gmq">1-1000</span> <span class="stat-label svelte-18gmq">Core</span></div> <div class="stat svelte-18gmq"><span class="stat-value svelte-18gmq">1000+</span> <span class="stat-label svelte-18gmq">Advanced</span></div></div></div></header> <main class="main-content svelte-18gmq"><div class="filters-card svelte-18gmq"><div class="search-box svelte-18gmq"><input type="text" placeholder="🔍 Search words or translations..."${attr("value", searchQuery)} class="search-input svelte-18gmq"/> `);
      if (searchQuery) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button class="clear-search svelte-18gmq">✕</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="rank-filter svelte-18gmq"><label class="svelte-18gmq">Rank Range:</label> <div class="rank-inputs svelte-18gmq"><input type="number" min="1" max="10000"${attr("value", minRank)} class="rank-input svelte-18gmq"/> <span class="svelte-18gmq">to</span> <input type="number" min="1" max="10000"${attr("value", maxRank)} class="rank-input svelte-18gmq"/></div></div> <div class="page-size svelte-18gmq"><label class="svelte-18gmq">Per Page:</label> `);
      $$renderer2.select(
        { value: pageSize, class: "page-select" },
        ($$renderer3) => {
          $$renderer3.option(
            { value: 50, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`50`);
            },
            "svelte-18gmq"
          );
          $$renderer3.option(
            { value: 100, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`100`);
            },
            "svelte-18gmq"
          );
          $$renderer3.option(
            { value: 200, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`200`);
            },
            "svelte-18gmq"
          );
          $$renderer3.option(
            { value: 500, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`500`);
            },
            "svelte-18gmq"
          );
          $$renderer3.option(
            { value: 1e3, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`1000`);
            },
            "svelte-18gmq"
          );
        },
        "svelte-18gmq"
      );
      $$renderer2.push(`</div></div> `);
      if (frequencyWords.length === 0) {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<div class="empty-state svelte-18gmq"><h3 class="svelte-18gmq">No Words Found</h3> <p class="svelte-18gmq">Try adjusting your search or rank filters.</p> <button class="clear-btn svelte-18gmq">Clear Filters</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="table-wrapper svelte-18gmq">`);
        FrequencyTable($$renderer2, {
          words: frequencyWords,
          language,
          languageName: langInfo.en,
          nativeName: langInfo.native,
          showFilters: false
        });
        $$renderer2.push(`<!----></div> <div class="pagination svelte-18gmq"><button${attr("disabled", currentPage <= 1, true)} class="pagination-btn svelte-18gmq">← Previous</button> <div class="page-info svelte-18gmq"><span class="current svelte-18gmq">Page ${escape_html(currentPage)}</span> <span class="total svelte-18gmq">of ${escape_html(meta.totalPages || 1)}</span> <span class="size svelte-18gmq">(${escape_html(pageSize)} words)</span></div> <button${attr("disabled", currentPage >= (meta.totalPages || 1), true)} class="pagination-btn svelte-18gmq">Next →</button></div> <div class="results-info svelte-18gmq">Showing ${escape_html(frequencyWords.length)} of ${escape_html((meta.total || 0).toLocaleString())} words `);
        if (searchQuery) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`matching "<strong class="svelte-18gmq">${escape_html(searchQuery)}</strong>"`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (minRank > 1 || maxRank < 1e4) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`(rank ${escape_html(minRank)}-${escape_html(maxRank)})`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="tips-section svelte-18gmq"><h2 class="svelte-18gmq">💡 Learning Tips for ${escape_html(langInfo.en)}</h2> <div class="tips-grid svelte-18gmq"><div class="tip svelte-18gmq"><h3 class="svelte-18gmq">Start Small</h3> <p class="svelte-18gmq">Begin with the top 100 words (rank 1-100).
              These cover ~50% of daily text.</p></div> <div class="tip svelte-18gmq"><h3 class="svelte-18gmq">Use Spaced Repetition</h3> <p class="svelte-18gmq">Review words at increasing intervals for
              better long-term retention.</p></div> <div class="tip svelte-18gmq"><h3 class="svelte-18gmq">Learn in Context</h3> <p class="svelte-18gmq">Try to find example sentences using the words
              you're learning.</p></div> <div class="tip svelte-18gmq"><h3 class="svelte-18gmq">Practice Active Recall</h3> <p class="svelte-18gmq">Cover the translation and try to remember the
              meaning before checking.</p></div></div></div></main>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
