<!-- /home/zaya/Downloads/Zayas/zaya-monorepo/apps/signflow/src/routes/grammar/japanese/japanese-transliteration/JapaneseReader.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // Types for our data structure
  interface WordAnalysis {
    word: string;
    transliteration: string;
    translation: string;
    part_of_speech: string;
    syntax_role: string;
    particle_type: string;
    verb_form: string;
    honorific_level: string;
    is_punctuation: boolean;
    semantic_category: string;
  }

  interface Paragraph {
    ja: string;
    en: string;
    analysis?: WordAnalysis[];
  }

  interface Section {
    id: string;
    filename: string;
    title?: {
      ja: string;
    };
    paragraphs: Paragraph[];
  }

  // Props
  export let jsonPath: string =
    "/json/ja/epub_content_web-Downton-abbey.json";
  export let apiUrl: string =
    "http://localhost:5000/api/analyze/japanese";
  export let initialSection: number = 0;
  export let initialParagraph: number = 0;
  export let showCleanVersion: boolean = true;
  export let showAnnotations: boolean = true;
  export let showSyntaxLabels: boolean = true;
  export let showTranslation: boolean = true;
  export let showTransliteration: boolean = true;
  export let autoAnalyze: boolean = true;

  // State
  let sections: Section[] = [];
  let currentSectionIndex: number = initialSection;
  let currentParagraphIndex: number = initialParagraph;
  let loading: boolean = true;
  let analyzing: boolean = false;
  let error: string | null = null;
  let showSettings: boolean = false;

  // Derived values
  $: currentSection = sections[currentSectionIndex];
  $: currentParagraph =
    currentSection?.paragraphs[currentParagraphIndex];
  $: hasPrevious =
    currentParagraphIndex > 0 || currentSectionIndex > 0;
  $: hasNext =
    currentSectionIndex < sections.length - 1 ||
    (currentSection &&
      currentParagraphIndex <
        currentSection.paragraphs.length - 1);
  $: currentParagraphText = currentParagraph?.ja || "";

  onMount(async () => {
    await loadData();
  });

  $: if (
    browser &&
    currentParagraph &&
    autoAnalyze &&
    !currentParagraph.analysis
  ) {
    analyzeCurrentParagraph();
  }

  async function loadData() {
    try {
      loading = true;
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(
          `Failed to load: ${response.statusText}`
        );
      }
      sections = await response.json();
      error = null;

      // If first paragraph doesn't have analysis, trigger analysis
      if (
        sections.length > 0 &&
        sections[0].paragraphs.length > 0 &&
        !sections[0].paragraphs[0].analysis
      ) {
        await analyzeCurrentParagraph();
      }
    } catch (err) {
      error = err.message;
      console.error("Error loading data:", err);
    } finally {
      loading = false;
    }
  }

  async function analyzeCurrentParagraph() {
    if (
      !currentParagraph ||
      !currentParagraph.ja ||
      analyzing
    )
      return;

    try {
      analyzing = true;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: currentParagraph.ja,
          target_language: "en"
        })
      });

      if (!response.ok) {
        throw new Error(
          `API error: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        // Update the current paragraph with analysis and translation
        currentParagraph.analysis = data.analysis;

        // Also update in the sections array to persist
        sections[currentSectionIndex].paragraphs[
          currentParagraphIndex
        ].analysis = data.analysis;

        // If the API returns a full translation, you could store it too
        if (data.translated) {
          // Optionally store the full translation
        }
      }
    } catch (err) {
      console.error("Error analyzing paragraph:", err);
    } finally {
      analyzing = false;
    }
  }

  function next() {
    if (!currentSection) return;

    if (
      currentParagraphIndex <
      currentSection.paragraphs.length - 1
    ) {
      currentParagraphIndex++;
    } else if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      currentParagraphIndex = 0;
    }
  }

  function previous() {
    if (currentParagraphIndex > 0) {
      currentParagraphIndex--;
    } else if (currentSectionIndex > 0) {
      currentSectionIndex--;
      currentParagraphIndex =
        sections[currentSectionIndex].paragraphs.length - 1;
    }
  }

  function goToSection(sectionIndex: number) {
    if (
      sectionIndex >= 0 &&
      sectionIndex < sections.length
    ) {
      currentSectionIndex = sectionIndex;
      currentParagraphIndex = 0;
    }
  }

  // Update the getPosClass function to match the new POS values
  function getPosClass(analysis: WordAnalysis): string {
    const pos = analysis.part_of_speech;

    // Map part of speech to CSS classes (matching your MeCab version)
    if (pos === "NOUN") return "noun";
    if (pos === "PRONOUN") return "pronoun";
    if (pos === "VERB") return "verb";
    if (pos === "ADJECTIVE_I") return "adjective-i";
    if (pos === "ADJECTIVE_NA") return "adjective-na";
    if (pos === "ADVERB") return "adverb";
    if (pos === "PARTICLE") return "particle";
    if (pos === "AUXILIARY_VERB") return "auxiliary";
    if (pos === "CONJUNCTION") return "conjunction";
    if (pos === "INTERJECTION") return "interjection";
    if (pos === "PREFIX") return "prefix";
    if (pos === "SUFFIX") return "suffix";

    // Semantic categories
    const semantic = analysis.semantic_category;
    if (semantic === "TIME") return "time";
    if (semantic === "LOCATION") return "location";
    if (semantic === "PERSON") return "person";
    if (semantic === "QUESTION") return "question";
    if (semantic === "ACTION") return "action";
    if (semantic === "DESCRIPTION") return "description";
    if (semantic === "OBJECT") return "object";
    if (semantic === "GRAMMAR") return "grammar";

    return "default";
  }

  // Update getSyntaxLabel for better display
  function getSyntaxLabel(analysis: WordAnalysis): string {
    const role = analysis.syntax_role;
    if (role === "UNKNOWN") return "";
    return role.replace(/_/g, " ").toLowerCase();
  }

  // Update getParticleLabel
  function getParticleLabel(
    analysis: WordAnalysis
  ): string {
    if (
      analysis.particle_type === "None" ||
      analysis.particle_type === "NONE"
    )
      return "";
    return analysis.particle_type
      .replace(/_/g, " ")
      .toLowerCase();
  }

  // Update getVerbFormLabel
  function getVerbFormLabel(
    analysis: WordAnalysis
  ): string {
    if (
      analysis.verb_form === "None" ||
      analysis.verb_form === "NONE"
    )
      return "";
    return analysis.verb_form
      .replace(/_/g, " ")
      .toLowerCase();
  }

  // Update buildAnnotatedHTML to match the new data structure
  function buildAnnotatedHTML(
    analyses: WordAnalysis[]
  ): string {
    return analyses
      .map((analysis) => {
        if (analysis.is_punctuation) {
          return `<span class="punctuation-token">${analysis.word}</span>`;
        }

        const posClass = getPosClass(analysis);
        const syntaxRole = analysis.syntax_role
          .toLowerCase()
          .replace(/_/g, "-");

        // Build tooltip with all available information
        const tooltipParts = [];
        if (analysis.translation)
          tooltipParts.push(`📖 ${analysis.translation}`);
        if (analysis.part_of_speech !== "UNKNOWN")
          tooltipParts.push(
            `🏷️ ${analysis.part_of_speech.toLowerCase()}`
          );
        if (analysis.syntax_role !== "UNKNOWN")
          tooltipParts.push(
            `🔤 ${getSyntaxLabel(analysis)}`
          );
        if (
          analysis.particle_type !== "None" &&
          analysis.particle_type !== "NONE"
        ) {
          tooltipParts.push(
            `⚡ ${getParticleLabel(analysis)}`
          );
        }
        if (
          analysis.verb_form !== "None" &&
          analysis.verb_form !== "NONE"
        ) {
          tooltipParts.push(
            `🔄 ${getVerbFormLabel(analysis)}`
          );
        }
        if (
          analysis.honorific_level !== "NEUTRAL" &&
          analysis.honorific_level !== "PLAIN"
        ) {
          tooltipParts.push(
            `👑 ${analysis.honorific_level.toLowerCase()}`
          );
        }
        if (analysis.semantic_category !== "GENERAL") {
          tooltipParts.push(
            `📌 ${analysis.semantic_category.toLowerCase()}`
          );
        }

        const tooltip = tooltipParts.join(" • ");

        // Build syntax label if enabled
        const syntaxLabel =
          showSyntaxLabels &&
          analysis.syntax_role !== "UNKNOWN"
            ? `<span class="syntax-label">${getSyntaxLabel(analysis)}</span>`
            : "";

        // Build extra info
        const extraInfo = [];
        if (
          analysis.particle_type !== "None" &&
          analysis.particle_type !== "NONE"
        ) {
          extraInfo.push(
            `<span class="particle-info">${getParticleLabel(analysis)}</span>`
          );
        }
        if (
          analysis.verb_form !== "None" &&
          analysis.verb_form !== "NONE"
        ) {
          extraInfo.push(
            `<span class="verb-info">${getVerbFormLabel(analysis)}</span>`
          );
        }
        if (
          analysis.honorific_level !== "NEUTRAL" &&
          analysis.honorific_level !== "PLAIN"
        ) {
          extraInfo.push(
            `<span class="honorific-info">${analysis.honorific_level.toLowerCase()}</span>`
          );
        }

        const extraInfoHtml =
          extraInfo.length > 0
            ? `<span class="extra-info">${extraInfo.join(" ")}</span>`
            : "";

        return `<ruby class="japanese ruby-${posClass} ruby-${syntaxRole}" data-syntax="${analysis.syntax_role}" title="${tooltip}">
          ${syntaxLabel}
          ${extraInfoHtml}
          <span class="word-token">${analysis.word}</span>
          ${showTransliteration && analysis.transliteration ? `<rt class="romaji">${analysis.transliteration}</rt>` : ""}
        </ruby>`;
      })
      .join("");
  }
</script>

<!-- Loading State -->
{#if loading}
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading Japanese reader...</p>
  </div>

  <!-- Error State -->
{:else if error}
  <div class="error-container">
    <h3>Error Loading Content</h3>
    <p>{error}</p>
    <button on:click={loadData} class="retry-button"
      >Retry</button
    >
  </div>

  <!-- Main Content -->
{:else if sections.length > 0}
  <div class="japanese-reader">
    <!-- Header with navigation and settings -->
    <header class="reader-header">
      <div class="header-brand">
        <div class="brand-icon">🗾</div>
        <div class="brand-text">
          <h1>Japanese Reader</h1>
          <span class="brand-subtitle"
            >with Grammar Analysis</span
          >
        </div>
      </div>

      <div class="header-controls">
        <button
          class="settings-button"
          class:active={showSettings}
          on:click={() => (showSettings = !showSettings)}
          aria-label="Settings"
        >
          <span class="settings-icon">⚙️</span>
          <span class="settings-text">Settings</span>
        </button>

        <div class="progress-badge">
          <span class="progress-section"
            >{currentSectionIndex +
              1}/{sections.length}</span
          >
          <span class="progress-separator">•</span>
          <span class="progress-paragraph"
            >{currentParagraphIndex + 1}/{currentSection
              ?.paragraphs.length || 0}</span
          >
          {#if analyzing}
            <span class="analyzing-indicator">🔍</span>
          {/if}
        </div>
      </div>
    </header>

    <!-- Settings Panel -->
    {#if showSettings}
      <div class="settings-panel">
        <h3 class="settings-title">Display Options</h3>
        <div class="settings-grid">
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={showCleanVersion}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text"
              >Show Clean Version</span
            >
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={showAnnotations}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text"
              >Show Annotations</span
            >
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={showSyntaxLabels}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text"
              >Show Syntax Labels</span
            >
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={showTranslation}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text"
              >Show Translations</span
            >
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={showTransliteration}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">Show Romaji</span>
          </label>
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={autoAnalyze}
            />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">Auto-analyze</span>
          </label>
        </div>
      </div>
    {/if}

    <!-- Main Content Area -->
    <main class="reader-content">
      {#if currentSection}
        <!-- Section Title -->
        {#if currentSection.title && currentParagraphIndex === 0}
          <div class="section-title">
            <h2 class="title-text">
              {currentSection.title.ja}
            </h2>
          </div>
        {/if}

        <!-- Current Paragraph -->
        {#if currentParagraph}
          <div class="paragraph-card">
            <!-- English Translation -->
            {#if showTranslation}
              <div class="english-text">
                <p>{currentParagraph.en}</p>
              </div>
            {/if}

            <!-- Japanese Clean Version -->
            {#if showCleanVersion}
              <div class="clean-version">
                <div class="clean-text">
                  {currentParagraph.ja}
                </div>
              </div>
            {/if}

            <!-- Annotated Version -->
            {#if showAnnotations && currentParagraph.analysis && currentParagraph.analysis.length > 0}
              <div class="annotated-version">
                <div class="annotated-text">
                  {@html buildAnnotatedHTML(
                    currentParagraph.analysis
                  )}
                </div>
              </div>
            {:else if analyzing}
              <div class="analyzing-message">
                <div class="spinner-small"></div>
                <p>Analyzing Japanese text...</p>
              </div>
            {/if}

            <!-- Manual Analysis Button -->
            {#if !currentParagraph.analysis && !analyzing}
              <button
                class="analyze-button"
                on:click={analyzeCurrentParagraph}
              >
                🔍 Analyze This Paragraph
              </button>
            {/if}
          </div>
        {/if}
      {/if}
    </main>

    <!-- Navigation Footer -->
    <footer class="reader-footer">
      <button
        class="nav-button prev-button"
        on:click={previous}
        disabled={!hasPrevious || analyzing}
      >
        <span class="nav-icon">←</span>
        <span class="nav-text">Previous</span>
      </button>

      <div class="nav-center">
        <button
          class="nav-icon-button"
          on:click={() =>
            goToSection(currentSectionIndex - 1)}
          disabled={currentSectionIndex === 0 || analyzing}
          title="Previous section"
        >
          ⏪
        </button>

        <div class="nav-position">
          <select
            class="section-selector"
            on:change={(e) =>
              goToSection(parseInt(e.currentTarget.value))}
            value={currentSectionIndex}
            disabled={analyzing}
          >
            {#each sections as section, index}
              <option value={index}>
                Section {index + 1}: {section.id}
              </option>
            {/each}
          </select>
        </div>

        <button
          class="nav-icon-button"
          on:click={() =>
            goToSection(currentSectionIndex + 1)}
          disabled={currentSectionIndex ===
            sections.length - 1 || analyzing}
          title="Next section"
        >
          ⏩
        </button>
      </div>

      <button
        class="nav-button next-button"
        on:click={next}
        disabled={!hasNext || analyzing}
      >
        <span class="nav-text">Next</span>
        <span class="nav-icon">→</span>
      </button>
    </footer>
  </div>
{/if}

<!-- Add the same styles from the previous JapaneseReader.svelte here -->
<style>
  /* CSS Variables - defined at the root level */
  :global(:root) {
    --primary-color: #4f46e5;
    --primary-hover: #6366f1;
    --primary-light: #e0e7ff;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;

    /* POS tag colors */
    --n: #60a5fa; /* blue for nouns */
    --v: #f87171; /* red for verbs */
    --adj: #34d399; /* green for adjectives */
    --adv: #a78bfa; /* purple for adverbs */
    --r: #fbbf24; /* yellow for pronouns */
    --nm: #f97316; /* orange for numerals */
    --p: #06b6d4; /* cyan for prepositions */
    --c: #d946ef; /* pink for conjunctions */
    --ax: #8b5cf6; /* indigo for auxiliary */
    --mp: #f59e0b; /* amber for modal particles */
    --q: #10b981; /* emerald for quantifiers */
    --o: #94a3b8; /* gray for other */
    --x: #cbd5e1; /* light gray for unknown */

    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;

    --adjective-i: #34d399; /* green for i-adjectives */
    --adjective-na: #10b981; /* darker green for na-adjectives */
    --auxiliary: #8b5cf6; /* purple for auxiliary verbs */
    --prefix: #f59e0b; /* orange for prefixes */
    --suffix: #f97316; /* orange for suffixes */
    --action: #f87171; /* red for actions */
    --description: #a78bfa; /* purple for descriptions */
    --object: #60a5fa; /* blue for objects */
    --grammar: #fbbf24; /* yellow for grammar */
  }

  /* Add these new ruby classes */
  .japanese-reader :global(ruby.ruby-adjective-i) {
    background-color: var(--adjective-i);
  }
  .japanese-reader :global(ruby.ruby-adjective-na) {
    background-color: var(--adjective-na);
  }
  .japanese-reader :global(ruby.ruby-auxiliary) {
    background-color: var(--auxiliary);
  }
  .japanese-reader :global(ruby.ruby-prefix) {
    background-color: var(--prefix);
  }
  .japanese-reader :global(ruby.ruby-suffix) {
    background-color: var(--suffix);
  }
  .japanese-reader :global(ruby.ruby-action) {
    background-color: var(--action);
  }
  .japanese-reader :global(ruby.ruby-description) {
    background-color: var(--description);
  }
  .japanese-reader :global(ruby.ruby-object) {
    background-color: var(--object);
  }
  .japanese-reader :global(ruby.ruby-grammar) {
    background-color: var(--grammar);
  }

  .japanese-reader {
    max-width: 1500px;
    margin: 4rem auto;
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
    color: var(--gray-800);
  }

  /* Beautiful Header */
  .reader-header {
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    border-radius: var(--radius-xl);
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow-lg);
    color: white;
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .brand-icon {
    font-size: 2.5rem;
    line-height: 1;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
  }

  .brand-text h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .brand-subtitle {
    font-size: 0.875rem;
    opacity: 0.9;
    display: block;
    margin-top: 0.25rem;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .settings-button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-lg);
    padding: 0.625rem 1.25rem;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .settings-button:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  .settings-button.active {
    background: white;
    color: var(--primary-color);
    border-color: white;
  }

  .settings-icon {
    font-size: 1.25rem;
  }

  .settings-text {
    display: inline-block;
  }

  .progress-badge {
    background: rgba(0, 0, 0, 0.3);
    border-radius: var(--radius-lg);
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
  }

  .progress-section,
  .progress-paragraph {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
  }

  .progress-separator {
    opacity: 0.5;
  }

  /* Settings Panel */
  .settings-panel {
    background: white;
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-200);
  }

  .settings-title {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .settings-grid {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: var(--gray-700);
    font-size: 0.95rem;
    position: relative;
  }

  .checkbox-label input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .checkbox-custom {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--gray-300);
    border-radius: var(--radius-sm);
    background: white;
    transition: all 0.2s ease;
    position: relative;
  }

  .checkbox-label
    input[type="checkbox"]:checked
    + .checkbox-custom {
    background: var(--primary-color);
    border-color: var(--primary-color);
  }

  .checkbox-label
    input[type="checkbox"]:checked
    + .checkbox-custom::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 0.875rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .checkbox-label:hover .checkbox-custom {
    border-color: var(--primary-color);
  }

  /* Ruby annotation styles - background on entire ruby */
  .chinese-reader :global(ruby) {
    display: inline-flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 0.25rem 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    text-align: center;
    line-height: 1.6;
    vertical-align: middle;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
  }

  .chinese-reader :global(ruby:hover) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* POS tag backgrounds on ruby */
  .chinese-reader :global(ruby.ruby-n) {
    background-color: var(--n);
  }
  .chinese-reader :global(ruby.ruby-v) {
    background-color: var(--v);
  }
  .chinese-reader :global(ruby.ruby-adj) {
    background-color: var(--adj);
  }
  .chinese-reader :global(ruby.ruby-adv) {
    background-color: var(--adv);
  }
  .chinese-reader :global(ruby.ruby-r) {
    background-color: var(--r);
  }
  .chinese-reader :global(ruby.ruby-nm) {
    background-color: var(--nm);
  }
  .chinese-reader :global(ruby.ruby-p) {
    background-color: var(--p);
  }
  .chinese-reader :global(ruby.ruby-c) {
    background-color: var(--c);
  }
  .chinese-reader :global(ruby.ruby-ax) {
    background-color: var(--ax);
  }
  .chinese-reader :global(ruby.ruby-mp) {
    background-color: var(--mp);
  }
  .chinese-reader :global(ruby.ruby-q) {
    background-color: var(--q);
  }
  .chinese-reader :global(ruby.ruby-o) {
    background-color: var(--o);
  }
  .chinese-reader :global(ruby.ruby-x) {
    background-color: var(--x);
  }

  .chinese-reader :global(rt) {
    font-size: 0.75rem;
    line-height: 1.2;
    display: block;
    color: var(--gray-600);
  }

  .chinese-reader :global(span.grammatical-class),
  .chinese-reader :global(span.syntax-label) {
    color: var(--gray-600);
    font-size: 0.625rem;
    text-transform: uppercase;
    margin-bottom: 0.125rem;
    display: block;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .chinese-reader :global(.word-token) {
    font-size: 4rem;
    font-weight: 500;
    display: inline-block;
    color: var(--gray-800);
  }

  .chinese-reader :global(.punctuation-token) {
    display: inline-block;
    margin: 0 0.25rem;
    font-size: 1.125rem;
    color: var(--gray-500);
    vertical-align: middle;
  }

  /* Language labels */
  .language-label {
    display: inline-block;
    background: var(--gray-200);
    color: var(--gray-600);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    margin-right: 0.75rem;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  /* Clean version styling */
  .clean-version {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
  }

  .clean-text {
    font-size: 2rem;
    line-height: 1.5;
    color: var(--gray-800);
    margin-top: 0.5rem;
  }

  .transliterated-version {
    padding: 1rem;
    background: white;
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
  }

  .annotated-text {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 0.5rem;
    line-height: 2.5;
  }

  /* Content Area */
  .reader-content {
    min-height: 400px;
    margin-bottom: 2rem;
  }

  .section-title {
    text-align: center;
    margin: 2rem 0;
    padding: 1.5rem;
    background: linear-gradient(
      135deg,
      var(--primary-light) 0%,
      #f3e8ff 100%
    );
    border-radius: var(--radius-lg);
    border: 1px solid var(--primary-color);
  }

  .title-text {
    color: var(--gray-800);
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
  }

  .paragraph-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-200);
  }

  .english-text {
    margin-bottom: 2rem;
  }

  .english-text p {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--gray-700);
    margin: 0.5rem 0 0 0;
  }

  /* Beautiful Footer Navigation */
  .reader-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-200);
    margin-top: 2rem;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius-lg);
    background: var(--primary-color);
    color: white;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 120px;
    justify-content: center;
  }

  .nav-button:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .nav-button:disabled {
    background: var(--gray-200);
    color: var(--gray-400);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .prev-button .nav-icon {
    margin-right: auto;
  }

  .next-button .nav-icon {
    margin-left: auto;
  }

  .nav-center {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--gray-50);
    padding: 0.5rem;
    border-radius: var(--radius-lg);
  }

  .nav-icon-button {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--gray-600);
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nav-icon-button:hover:not(:disabled) {
    background: var(--primary-color);
    color: white;
    transform: scale(1.1);
  }

  .nav-icon-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .nav-position {
    min-width: 140px;
  }

  .section-selector {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--gray-300);
    border-radius: var(--radius-md);
    background: white;
    color: var(--gray-700);
    font-size: 0.9rem;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
  }

  .section-selector:hover {
    border-color: var(--primary-color);
  }

  .section-selector:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  .nav-text {
    display: inline-block;
  }

  /* Loading and Error States */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    color: var(--gray-500);
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--gray-200);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-container {
    text-align: center;
    padding: 3rem;
    background: #fef2f2;
    border-radius: var(--radius-lg);
    color: var(--danger-color);
    border: 1px solid #fecaca;
  }

  .retry-button {
    padding: 0.75rem 2rem;
    background: var(--danger-color);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1.5rem;
    transition: all 0.2s ease;
  }

  .retry-button:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .chinese-reader {
      margin: 1rem;
    }

    .reader-header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      padding: 1.5rem;
    }

    .header-brand {
      flex-direction: column;
    }

    .header-controls {
      flex-direction: column;
      width: 100%;
    }

    .settings-button {
      width: 100%;
      justify-content: center;
    }

    .settings-text {
      display: inline;
    }

    .settings-grid {
      flex-direction: column;
      gap: 1rem;
    }

    .reader-footer {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-button {
      width: 100%;
    }

    .nav-center {
      width: 100%;
      justify-content: center;
    }

    .nav-text {
      display: none;
    }

    .prev-button .nav-icon,
    .next-button .nav-icon {
      margin: 0;
    }

    .clean-text {
      font-size: 1.5rem;
    }
  }

  /* Add these new styles */
  .analyzing-indicator {
    animation: pulse 1s infinite;
    margin-left: 0.5rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .analyzing-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    background: var(--gray-50);
    border-radius: var(--radius-lg);
    color: var(--gray-600);
  }

  .spinner-small {
    width: 20px;
    height: 20px;
    border: 2px solid var(--gray-200);
    border-top: 2px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .analyze-button {
    width: 100%;
    padding: 1rem;
    background: var(--primary-light);
    border: 2px solid var(--primary-color);
    border-radius: var(--radius-lg);
    color: var(--primary-color);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 1rem;
  }

  .analyze-button:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .analyze-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
</style>
