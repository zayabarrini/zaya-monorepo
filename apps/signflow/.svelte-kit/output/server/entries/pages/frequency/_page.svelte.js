import { h as head, i as escape_html, j as ensure_array_like, e as attr, d as stringify, b as bind_props } from "../../../chunks/vendor-svelte.js";
import { F as FREQUENCY_LANGUAGES } from "../../../chunks/languages.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const prerender = false;
    const frequencyLanguages = Object.entries(FREQUENCY_LANGUAGES).map(([code, info]) => ({
      code,
      name: info.en,
      native: info.native,
      flag: info.flag,
      direction: info.direction,
      fileName: info.fileName,
      estimatedWords: 1e4
      // All your frequency files have ~10k words
    }));
    const stats = {
      totalLanguages: frequencyLanguages.length,
      totalWords: frequencyLanguages.length * 1e4
    };
    head("fjwaa1", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Word Frequency Lists</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Most common words in multiple languages with English translations. Perfect for language learners!"/>`);
    });
    $$renderer2.push(`<div class="container svelte-fjwaa1"><header class="frequency-header svelte-fjwaa1"><h1 class="svelte-fjwaa1">Word Frequency Lists</h1> <p class="subtitle svelte-fjwaa1">Learn the most common words in each language.
      Mastering these gives you ~80% understanding of
      everyday text.</p> <div class="header-stats svelte-fjwaa1"><div class="stat-card svelte-fjwaa1"><div class="stat-number svelte-fjwaa1">${escape_html(stats.totalLanguages)}</div> <div class="stat-label svelte-fjwaa1">Languages</div></div> <div class="stat-card svelte-fjwaa1"><div class="stat-number svelte-fjwaa1">${escape_html(stats.totalWords.toLocaleString())}</div> <div class="stat-label svelte-fjwaa1">Total Words</div></div> <div class="stat-card svelte-fjwaa1"><div class="stat-number svelte-fjwaa1">10k</div> <div class="stat-label svelte-fjwaa1">Words per Language</div></div> <div class="stat-card svelte-fjwaa1"><div class="stat-number svelte-fjwaa1">80%</div> <div class="stat-label svelte-fjwaa1">Text Coverage</div></div></div></header> <main class="frequency-main svelte-fjwaa1"><div class="intro-section svelte-fjwaa1"><h2 class="svelte-fjwaa1">Why Learn Frequency Lists?</h2> <div class="intro-grid svelte-fjwaa1"><div class="intro-card svelte-fjwaa1"><div class="intro-icon svelte-fjwaa1">🚀</div> <h3 class="svelte-fjwaa1">Efficient Learning</h3> <p class="svelte-fjwaa1">Focus on words you'll actually encounter. The
            top 1000 words cover about 80% of everyday
            conversation.</p></div> <div class="intro-card svelte-fjwaa1"><div class="intro-icon svelte-fjwaa1">📈</div> <h3 class="svelte-fjwaa1">Quick Progress</h3> <p class="svelte-fjwaa1">See immediate results as you recognize more
            words in books, movies, and conversations.</p></div> <div class="intro-card svelte-fjwaa1"><div class="intro-icon svelte-fjwaa1">🎯</div> <h3 class="svelte-fjwaa1">Smart Practice</h3> <p class="svelte-fjwaa1">Each word includes English translation and
            frequency data to prioritize your study.</p></div> <div class="intro-card svelte-fjwaa1"><div class="intro-icon svelte-fjwaa1">🔍</div> <h3 class="svelte-fjwaa1">Search &amp; Filter</h3> <p class="svelte-fjwaa1">Find specific words, filter by rank, and sort by
            frequency or alphabetically.</p></div></div></div> <div class="languages-section svelte-fjwaa1"><h2 class="svelte-fjwaa1">Available Languages</h2> <p class="section-subtitle svelte-fjwaa1">Click any language to explore its most common words
        with English translations</p> <div class="languages-grid svelte-fjwaa1"><!--[-->`);
    const each_array = ensure_array_like(frequencyLanguages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let lang = each_array[$$index];
      $$renderer2.push(`<a${attr("href", `/frequency/${stringify(lang.code)}`)} class="language-card svelte-fjwaa1"><div class="card-header svelte-fjwaa1"><div class="language-flag svelte-fjwaa1">${escape_html(lang.flag)}</div> <div class="language-names svelte-fjwaa1"><h3 class="svelte-fjwaa1">${escape_html(lang.name)}</h3> <div class="native-name svelte-fjwaa1">${escape_html(lang.native)}</div></div></div> <div class="card-content svelte-fjwaa1"><p class="svelte-fjwaa1">Top ${escape_html(lang.estimatedWords.toLocaleString())} most
                frequent words</p> <div class="language-stats svelte-fjwaa1"><div class="stat-item svelte-fjwaa1"><span class="stat-label svelte-fjwaa1">Words:</span> <span class="stat-value svelte-fjwaa1">${escape_html(lang.estimatedWords.toLocaleString())}</span></div> <div class="stat-item svelte-fjwaa1"><span class="stat-label svelte-fjwaa1">Direction:</span> <span class="stat-value svelte-fjwaa1">${escape_html(lang.direction.toUpperCase())}</span></div></div> <div class="coverage-meter svelte-fjwaa1"><div class="meter-label svelte-fjwaa1">Text Coverage</div> <div class="meter-bar svelte-fjwaa1"><div class="meter-fill svelte-fjwaa1" style="width: 80%" aria-label="80% text coverage"></div></div> <div class="meter-stats svelte-fjwaa1"><span>Top 1000: 70%</span> <span>Top 5000: 90%</span></div></div></div> <div class="card-footer svelte-fjwaa1"><span class="view-link svelte-fjwaa1">Explore Frequency List →</span></div></a>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="how-to-section svelte-fjwaa1"><h2 class="svelte-fjwaa1">How to Use These Lists</h2> <div class="instructions svelte-fjwaa1"><div class="instruction-step svelte-fjwaa1"><div class="step-number svelte-fjwaa1">1</div> <div class="step-content svelte-fjwaa1"><h3 class="svelte-fjwaa1">Choose Your Target Language</h3> <p class="svelte-fjwaa1">Select a language you want to learn or
              improve. Start with languages similar to ones
              you already know.</p></div></div> <div class="instruction-step svelte-fjwaa1"><div class="step-number svelte-fjwaa1">2</div> <div class="step-content svelte-fjwaa1"><h3 class="svelte-fjwaa1">Study in Chunks</h3> <p class="svelte-fjwaa1">Focus on the top 100 words first, then move to
              500, 1000, and so on. Each level dramatically
              increases comprehension.</p></div></div> <div class="instruction-step svelte-fjwaa1"><div class="step-number svelte-fjwaa1">3</div> <div class="step-content svelte-fjwaa1"><h3 class="svelte-fjwaa1">Use the Filters</h3> <p class="svelte-fjwaa1">Filter by rank range (e.g., 1-100 for most
              common) or search for specific words you want
              to learn.</p></div></div> <div class="instruction-step svelte-fjwaa1"><div class="step-number svelte-fjwaa1">4</div> <div class="step-content svelte-fjwaa1"><h3 class="svelte-fjwaa1">Practice Regularly</h3> <p class="svelte-fjwaa1">Review words daily. Use the copy feature to
              save words to your flashcards or notes.</p></div></div></div></div></main></div>`);
    bind_props($$props, { prerender });
  });
}
export {
  _page as default
};
