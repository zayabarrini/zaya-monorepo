<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // Types for our data structure
  interface WordAnalysis {
    word: string;
    base: string;
    transliteration: string;
    translation: string;
    part_of_speech: string;
    syntax_role: string;
    particle_type: string;
    verb_form: string;
    tense?: string;
    person?: string;
    honorific_level: string;
    is_punctuation: boolean;
    semantic_category: string;
    gender?: string;
    number?: string;
    grammatical_case?: string;
    has_matras?: boolean;
  }

  interface Paragraph {
    hi: string;
    en: string;
    analysis?: WordAnalysis[];
  }

  interface Section {
    id: string;
    filename: string;
    title?: {
      hi: string;
    };
    paragraphs: Paragraph[];
  }

  // Display configuration interface
  interface DisplayConfig {
    showWord: boolean;
    showTransliteration: boolean;
    showTranslation: boolean;
    showPartOfSpeech: boolean;
    showSyntaxRole: boolean;
    showGender: boolean;
    showNumber: boolean;
    showCase: boolean;
    showTense: boolean;
    showPerson: boolean;
    showSemanticCategory: boolean;
  }

  // Props
  export let jsonPath: string =
    "/json/hi/Downton-Abbey-Cinema-Screenplays-db-hi.json";
  const API_BASE =
    import.meta.env.VITE_API_URL || "http://localhost:5000";
  export let apiUrl: string = `${API_BASE}/api/analyze/hindi`;
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
  let activeTab: "display" | "fields" = "display";

  // Display configuration - all enabled by default
  let displayConfig: DisplayConfig = {
    showWord: true,
    showTransliteration: true,
    showTranslation: true,
    showPartOfSpeech: true,
    showSyntaxRole: true,
    showGender: true,
    showNumber: true,
    showCase: true,
    showTense: true,
    showPerson: true,
    showSemanticCategory: true
  };

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
  $: currentParagraphText = currentParagraph?.hi || "";

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
      !currentParagraph.hi ||
      analyzing
    )
      return;

    try {
      analyzing = true;
      error = null;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: currentParagraph.hi,
          target_language: "en"
        })
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}));
        throw new Error(
          errorData.error ||
            `API error: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        currentParagraph.analysis = data.analysis;
        sections[currentSectionIndex].paragraphs[
          currentParagraphIndex
        ].analysis = data.analysis;
      } else {
        throw new Error(data.error || "Unknown API error");
      }
    } catch (err) {
      console.error("Error analyzing paragraph:", err);
      error = `Failed to analyze: ${err.message}. Please try again later.`;

      // Show a user-friendly error message
      if (!currentParagraph.analysis) {
        currentParagraph.analysis = [];
      }
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

  function resetToDefaults() {
    displayConfig = {
      showWord: true,
      showTransliteration: true,
      showTranslation: true,
      showPartOfSpeech: true,
      showSyntaxRole: true,
      showGender: true,
      showNumber: true,
      showCase: true,
      showTense: true,
      showPerson: true,
      showSemanticCategory: true
    };
  }

  function getPosClass(analysis: WordAnalysis): string {
    const pos = analysis.part_of_speech;

    if (pos === "NOUN") return "noun";
    if (pos === "VERB") return "verb";
    if (pos === "PRONOUN") return "pronoun";
    if (pos === "ADJECTIVE") return "adjective";
    if (pos === "ADVERB") return "adverb";
    if (pos === "POSTPOSITION") return "postposition";
    if (pos === "CONJUNCTION") return "conjunction";
    if (pos === "PARTICLE") return "particle";
    if (pos === "INTERJECTION") return "interjection";
    if (pos === "NUMERAL") return "numeral";

    const semantic = analysis.semantic_category;
    if (semantic === "TIME") return "time";
    if (semantic === "LOCATION") return "location";
    if (semantic === "PERSON") return "person";

    return "default";
  }

  function getSyntaxLabel(analysis: WordAnalysis): string {
    const role = analysis.syntax_role;
    if (role === "UNKNOWN") return "";
    return role.toLowerCase();
  }

  function buildTooltip(analysis: WordAnalysis): string {
    const parts = [];
    if (
      displayConfig.showTranslation &&
      analysis.translation
    )
      parts.push(`📖 ${analysis.translation}`);
    if (
      displayConfig.showPartOfSpeech &&
      analysis.part_of_speech !== "UNKNOWN"
    )
      parts.push(
        `🏷️ ${analysis.part_of_speech.toLowerCase()}`
      );
    if (
      displayConfig.showSyntaxRole &&
      analysis.syntax_role !== "UNKNOWN"
    )
      parts.push(`🔤 ${getSyntaxLabel(analysis)}`);
    if (
      displayConfig.showGender &&
      analysis.gender &&
      analysis.gender !== "UNKNOWN"
    )
      parts.push(`⚥ ${analysis.gender.toLowerCase()}`);
    if (
      displayConfig.showNumber &&
      analysis.number &&
      analysis.number !== "UNKNOWN"
    )
      parts.push(`#️⃣ ${analysis.number.toLowerCase()}`);
    if (
      displayConfig.showCase &&
      analysis.grammatical_case &&
      analysis.grammatical_case !== "UNKNOWN"
    )
      parts.push(
        `📊 ${analysis.grammatical_case.toLowerCase()}`
      );
    if (
      displayConfig.showTense &&
      analysis.tense &&
      analysis.tense !== "UNKNOWN"
    )
      parts.push(`⏰ ${analysis.tense.toLowerCase()}`);
    if (
      displayConfig.showPerson &&
      analysis.person &&
      analysis.person !== "UNKNOWN"
    )
      parts.push(`👤 ${analysis.person.toLowerCase()}`);
    if (
      displayConfig.showSemanticCategory &&
      analysis.semantic_category !== "GENERAL"
    )
      parts.push(
        `📌 ${analysis.semantic_category.toLowerCase()}`
      );

    return parts.join(" • ");
  }

  // Count active display fields
  $: activeFieldsCount =
    Object.values(displayConfig).filter(Boolean).length;
</script>

<!-- Loading State -->
{#if loading}
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading your Hindi reader...</p>
  </div>

  <!-- Error State -->
{:else if error}
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{error}</p>
    <button on:click={loadData} class="retry-button"
      >Try Again</button
    >
  </div>

  <!-- Main Content -->
{:else if sections.length > 0}
  <div class="hindi-reader">
    <!-- Beautiful Header - Hindi Saffron Theme -->
    <header class="reader-header">
      <div class="header-content">
        <h1>हिन्दी पाठक</h1>
        <p class="subtitle">
          Hindi Reader with Grammar Analysis
        </p>
      </div>
      <div class="header-controls">
        <button
          class="settings-button"
          class:active={showSettings}
          on:click={() => (showSettings = !showSettings)}
          aria-label="Settings"
        >
          <span class="settings-icon">⚙️</span>
          <span>Settings</span>
          {#if activeFieldsCount < 11}
            <span class="settings-badge"
              >{activeFieldsCount}/11</span
            >
          {/if}
        </button>
        <div class="progress-indicator">
          <span class="section-badge"
            >Section {currentSectionIndex +
              1}/{sections.length}</span
          >
          <span class="paragraph-badge"
            >Paragraph {currentParagraphIndex +
              1}/{currentSection?.paragraphs.length ||
              0}</span
          >
          {#if analyzing}
            <span class="analyzing-badge">Analyzing...</span
            >
          {/if}
        </div>
      </div>
    </header>

    <!-- Settings Panel -->
    {#if showSettings}
      <div class="settings-panel">
        <div class="settings-tabs">
          <button
            class="tab-button"
            class:active={activeTab === "display"}
            on:click={() => (activeTab = "display")}
          >
            Display Options
          </button>
          <button
            class="tab-button"
            class:active={activeTab === "fields"}
            on:click={() => (activeTab = "fields")}
          >
            Data Fields <span class="field-count"
              >{activeFieldsCount}/11</span
            >
          </button>
        </div>

        {#if activeTab === "display"}
          <div class="settings-section">
            <h3>Display Settings</h3>
            <div class="settings-grid">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={showCleanVersion}
                />
                <span class="checkbox-custom"></span>
                <span>Show Clean Version</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={showAnnotations}
                />
                <span class="checkbox-custom"></span>
                <span>Show Annotations</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={showSyntaxLabels}
                />
                <span class="checkbox-custom"></span>
                <span>Show Syntax Labels</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={showTranslation}
                />
                <span class="checkbox-custom"></span>
                <span>Show Full Translation</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={showTransliteration}
                />
                <span class="checkbox-custom"></span>
                <span>Show Transliteration</span>
              </label>
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  bind:checked={autoAnalyze}
                />
                <span class="checkbox-custom"></span>
                <span>Auto-analyze</span>
              </label>
            </div>
          </div>
        {:else}
          <div class="settings-section">
            <div class="settings-header">
              <h3>Data Fields to Display</h3>
              <div class="settings-actions">
                <button
                  class="settings-action"
                  on:click={resetToDefaults}
                  >Reset to Defaults</button
                >
              </div>
            </div>
            <p class="settings-description">
              Choose which linguistic data fields to show in
              the annotations.
            </p>
            <div class="fields-grid">
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showWord}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Word</span>
                <span class="field-badge"
                  >Devanagari text</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={
                    displayConfig.showTransliteration
                  }
                />
                <span class="checkbox-custom"></span>
                <span class="field-name"
                  >Transliteration</span
                >
                <span class="field-badge">Romanization</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={
                    displayConfig.showTranslation
                  }
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Translation</span>
                <span class="field-badge"
                  >English meaning</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={
                    displayConfig.showPartOfSpeech
                  }
                />
                <span class="checkbox-custom"></span>
                <span class="field-name"
                  >Part of Speech</span
                >
                <span class="field-badge">POS tag</span>
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={
                    displayConfig.showSyntaxRole
                  }
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Syntax Role</span>
                <span class="field-badge"
                  >Subject, object, etc.</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showGender}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Gender</span>
                <span class="field-badge">Masc/Fem</span>
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showNumber}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Number</span>
                <span class="field-badge"
                  >Singular/Plural</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showCase}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Case</span>
                <span class="field-badge"
                  >Direct/Oblique</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showTense}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Tense</span>
                <span class="field-badge"
                  >Past/Present/Future</span
                >
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={displayConfig.showPerson}
                />
                <span class="checkbox-custom"></span>
                <span class="field-name">Person</span>
                <span class="field-badge">1st/2nd/3rd</span>
              </label>
              <label class="checkbox-label field-item">
                <input
                  type="checkbox"
                  bind:checked={
                    displayConfig.showSemanticCategory
                  }
                />
                <span class="checkbox-custom"></span>
                <span class="field-name"
                  >Semantic Category</span
                >
                <span class="field-badge"
                  >Time, location, etc.</span
                >
              </label>
            </div>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Main Content Area -->
    <main class="reader-content">
      {#if currentSection}
        <!-- Section Title -->
        {#if currentSection.title && currentParagraphIndex === 0}
          <div class="section-title">
            <h2>{currentSection.title.hi}</h2>
          </div>
        {/if}

        <!-- Current Paragraph -->
        {#if currentParagraph}
          <div class="paragraph-container">
            <!-- English Translation -->
            {#if showTranslation}
              <div class="english-translation">
                <p>{currentParagraph.en}</p>
              </div>
            {/if}

            <!-- Hindi Clean Version -->
            {#if showCleanVersion}
              <div class="clean-version">
                <div class="clean-text">
                  {currentParagraph.hi}
                </div>
              </div>
            {/if}

            <!-- Annotated Version -->
            {#if showAnnotations && currentParagraph.analysis && currentParagraph.analysis.length > 0}
              <div class="annotated-version">
                <div class="annotated-text">
                  {#each currentParagraph.analysis as analysis (analysis.word + analysis.transliteration)}
                    {#if analysis.is_punctuation}
                      <span class="punctuation-token"
                        >{analysis.word}</span
                      >
                    {:else}
                      {@const posClass =
                        getPosClass(analysis)}
                      {@const tooltip =
                        buildTooltip(analysis)}

                      <div
                        class="word-container word-{posClass}"
                        title={tooltip}
                      >
                        {#if displayConfig.showWord}
                          <span class="word-field"
                            >{analysis.word}</span
                          >
                        {/if}

                        {#if displayConfig.showTransliteration && analysis.transliteration}
                          <span
                            class="transliteration-field"
                            >{analysis.transliteration}</span
                          >
                        {/if}

                        {#if displayConfig.showTranslation && analysis.translation}
                          <span class="translation-field"
                            >{analysis.translation}</span
                          >
                        {/if}

                        {#if displayConfig.showPartOfSpeech && analysis.part_of_speech !== "UNKNOWN"}
                          <span
                            class="pos-field pos-{analysis.part_of_speech.toLowerCase()}"
                          >
                            {analysis.part_of_speech.toLowerCase()}
                          </span>
                        {/if}

                        {#if displayConfig.showSyntaxRole && analysis.syntax_role !== "UNKNOWN"}
                          <span class="syntax-field"
                            >{getSyntaxLabel(
                              analysis
                            )}</span
                          >
                        {/if}

                        {#if displayConfig.showGender && analysis.gender && analysis.gender !== "UNKNOWN"}
                          <span class="gender-field"
                            >{analysis.gender.toLowerCase()}</span
                          >
                        {/if}

                        {#if displayConfig.showNumber && analysis.number && analysis.number !== "UNKNOWN"}
                          <span class="number-field"
                            >{analysis.number.toLowerCase()}</span
                          >
                        {/if}

                        {#if displayConfig.showCase && analysis.grammatical_case && analysis.grammatical_case !== "UNKNOWN"}
                          <span class="case-field"
                            >{analysis.grammatical_case.toLowerCase()}</span
                          >
                        {/if}

                        {#if displayConfig.showTense && analysis.tense && analysis.tense !== "UNKNOWN"}
                          <span class="tense-field"
                            >{analysis.tense.toLowerCase()}</span
                          >
                        {/if}

                        {#if displayConfig.showPerson && analysis.person && analysis.person !== "UNKNOWN"}
                          <span class="person-field"
                            >{analysis.person.toLowerCase()}</span
                          >
                        {/if}

                        {#if displayConfig.showSemanticCategory && analysis.semantic_category !== "GENERAL"}
                          <span class="semantic-field"
                            >{analysis.semantic_category.toLowerCase()}</span
                          >
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            {:else if analyzing}
              <div class="analyzing-message">
                <div class="spinner-small"></div>
                <p>Analyzing Hindi text...</p>
              </div>
            {/if}

            <!-- Manual Analysis Button -->
            {#if !currentParagraph.analysis && !analyzing}
              <button
                class="analyze-button"
                on:click={analyzeCurrentParagraph}
              >
                <span>🔍</span> Analyze This Paragraph
              </button>
            {/if}
            {#if error}
              <div class="api-error">
                <span class="error-icon">⚠️</span>
                <span>{error}</span>
                <button
                  on:click={analyzeCurrentParagraph}
                  class="retry-small">Retry</button
                >
              </div>
            {/if}
          </div>
        {/if}
      {/if}
    </main>

    <!-- Legend -->
    <div class="legend">
      <h3>Grammar Legend</h3>
      <div class="legend-items">
        <span class="legend-item" data-category="NOUN"
          >Noun</span
        >
        <span class="legend-item" data-category="VERB"
          >Verb</span
        >
        <span class="legend-item" data-category="PRONOUN"
          >Pronoun</span
        >
        <span class="legend-item" data-category="ADJECTIVE"
          >Adjective</span
        >
        <span class="legend-item" data-category="ADVERB"
          >Adverb</span
        >
        <span
          class="legend-item"
          data-category="POSTPOSITION">Postposition</span
        >
        <span
          class="legend-item"
          data-category="CONJUNCTION">Conjunction</span
        >
        <span class="legend-item" data-category="PARTICLE"
          >Particle</span
        >
      </div>
    </div>

    <!-- Navigation Footer -->
    <footer class="reader-footer">
      <button
        class="nav-button prev"
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

        <select
          class="section-selector"
          on:change={(e) =>
            goToSection(parseInt(e.currentTarget.value))}
          value={currentSectionIndex}
          disabled={analyzing}
        >
          {#each sections as section, index}
            <option value={index}
              >Section {index + 1}: {section.id}</option
            >
          {/each}
        </select>

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
        class="nav-button next"
        on:click={next}
        disabled={!hasNext || analyzing}
      >
        <span class="nav-text">Next</span>
        <span class="nav-icon">→</span>
      </button>
    </footer>
  </div>
{/if}

<style>
  /* Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .hindi-reader {
    max-width: 1200px;
    margin: 2rem auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Beautiful Header - Hindi Saffron Theme */
  .reader-header {
    background: linear-gradient(135deg, #ff9933, #ff7f00);
    color: white;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-content h1 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
    font-family:
      "Nirmala UI", "Mangal", "Kohinoor Devanagari",
      sans-serif;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .settings-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .settings-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .settings-button.active {
    background: white;
    color: #ff7f00;
  }

  .settings-badge {
    background: #ff6b6b;
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
  }

  .progress-indicator {
    display: flex;
    gap: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .section-badge {
    background: #3498db;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .paragraph-badge {
    background: #e67e22;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .analyzing-badge {
    background: #f39c12;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    animation: pulse 1.5s infinite;
  }

  /* Settings Panel */
  .settings-panel {
    background: white;
    padding: 2rem;
    border-bottom: 1px solid #e1e5e9;
  }

  .settings-tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e1e5e9;
    padding-bottom: 1rem;
  }

  .tab-button {
    padding: 0.5rem 1.5rem;
    border: none;
    background: transparent;
    color: #666;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    position: relative;
  }

  .tab-button.active {
    color: #ff7f00;
  }

  .tab-button.active::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #ff9933, #ff7f00);
    border-radius: 3px 3px 0 0;
  }

  .field-count {
    background: #e1e5e9;
    color: #666;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.5rem;
  }

  .settings-grid,
  .fields-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1.5rem;
  }

  .fields-grid {
    margin-bottom: 1.5rem;
  }

  .field-item {
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .field-name {
    font-weight: 600;
    color: #2c3e50;
  }

  .field-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    background: #e1e5e9;
    border-radius: 12px;
    color: #666;
    margin-left: auto;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: #555;
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
    border: 2px solid #e1e5e9;
    border-radius: 4px;
    background: white;
    transition: all 0.2s ease;
    position: relative;
    flex-shrink: 0;
  }

  .checkbox-label
    input[type="checkbox"]:checked
    + .checkbox-custom {
    background: linear-gradient(135deg, #ff9933, #ff7f00);
    border-color: transparent;
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

  /* Main Content */
  .reader-content {
    padding: 2rem;
  }

  .section-title {
    text-align: center;
    margin-bottom: 2rem;
  }

  .section-title h2 {
    font-size: 2rem;
    color: #2c3e50;
    font-weight: 300;
    font-family:
      "Nirmala UI", "Mangal", "Kohinoor Devanagari",
      sans-serif;
    border-bottom: 3px solid #ff9933;
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .paragraph-container {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .english-translation {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #3498db;
  }

  .english-translation p {
    font-size: 1.2rem;
    color: #555;
    font-style: italic;
    line-height: 1.6;
  }

  .clean-version {
    margin-bottom: 2rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 10px;
  }

  .clean-text {
    font-size: 2.5rem;
    line-height: 1.8;
    color: #2c3e50;
    font-family:
      "Nirmala UI", "Mangal", "Kohinoor Devanagari",
      sans-serif;
    text-align: center;
  }

  /* Word Container */
  .hindi-reader :global(.word-container) {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0.25rem 0.35rem;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    text-align: center;
    vertical-align: middle;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    min-width: 6rem;
    position: relative;
    background: white;
  }

  .hindi-reader :global(.word-container:hover) {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  /* Word field */
  .hindi-reader :global(.word-field) {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    font-family:
      "Nirmala UI", "Mangal", "Kohinoor Devanagari",
      sans-serif;
  }

  /* Transliteration field */
  .hindi-reader :global(.transliteration-field) {
    font-size: 0.85rem;
    color: #666;
    font-style: italic;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 0.2rem;
    margin: 0.2rem 0;
  }

  /* Translation field */
  .hindi-reader :global(.translation-field) {
    font-size: 0.8rem;
    color: #2c3e50;
    background: rgba(255, 153, 51, 0.1);
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    margin: 0.2rem 0;
  }

  /* Metadata fields */
  .hindi-reader :global(.pos-field),
  .hindi-reader :global(.syntax-field),
  .hindi-reader :global(.gender-field),
  .hindi-reader :global(.number-field),
  .hindi-reader :global(.case-field),
  .hindi-reader :global(.tense-field),
  .hindi-reader :global(.person-field),
  .hindi-reader :global(.semantic-field) {
    font-size: 0.65rem;
    padding: 0.15rem 0.3rem;
    border-radius: 4px;
    margin: 0.1rem 0;
    background: #f8f9fa;
    color: #555;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    width: auto;
  }

  .hindi-reader :global(.pos-field) {
    background: #e3f2fd;
    color: #1976d2;
  }

  .hindi-reader :global(.syntax-field) {
    background: #f3e5f5;
    color: #7b1fa2;
  }

  .hindi-reader :global(.gender-field) {
    background: #fce4ec;
    color: #c2185b;
  }

  .hindi-reader :global(.number-field) {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .hindi-reader :global(.case-field) {
    background: #fff3e0;
    color: #f57c00;
  }

  .hindi-reader :global(.tense-field) {
    background: #e1f5fe;
    color: #0288d1;
  }

  .hindi-reader :global(.person-field) {
    background: #ede7f6;
    color: #5e35b1;
  }

  .hindi-reader :global(.semantic-field) {
    background: #e0f2f1;
    color: #00796b;
  }

  /* Word container colors */
  .hindi-reader :global(.word-noun) {
    background: linear-gradient(135deg, #f1f8e9, #dcedc8);
    border-color: #8bc34a;
  }

  .hindi-reader :global(.word-verb) {
    background: linear-gradient(135deg, #ffebee, #ffcdd2);
    border-color: #ef5350;
  }

  .hindi-reader :global(.word-pronoun) {
    background: linear-gradient(135deg, #efebe9, #d7ccc8);
    border-color: #8d6e63;
  }

  .hindi-reader :global(.word-adjective) {
    background: linear-gradient(135deg, #f3e5f5, #e1bee7);
    border-color: #ab47bc;
  }

  .hindi-reader :global(.word-adverb) {
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
    border-color: #26c6da;
  }

  .hindi-reader :global(.word-postposition) {
    background: linear-gradient(135deg, #fff3e0, #ffe0b2);
    border-color: #ffa726;
  }

  .hindi-reader :global(.word-conjunction) {
    background: linear-gradient(135deg, #e1f5fe, #b3e5fc);
    border-color: #42a5f5;
  }

  .hindi-reader :global(.word-particle) {
    background: linear-gradient(135deg, #fce4ec, #f8bbd0);
    border-color: #ec407a;
  }

  /* Legend */
  .legend {
    padding: 1.5rem 2rem;
    background: #f8f9fa;
    border-top: 1px solid #e1e5e9;
    border-bottom: 1px solid #e1e5e9;
  }

  .legend h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .legend-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .legend-item {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 2px solid transparent;
  }

  .legend-item[data-category="NOUN"] {
    background: #f1f8e9;
    border-color: #8bc34a;
  }

  .legend-item[data-category="VERB"] {
    background: #ffebee;
    border-color: #ef5350;
  }

  .legend-item[data-category="PRONOUN"] {
    background: #efebe9;
    border-color: #8d6e63;
  }

  .legend-item[data-category="ADJECTIVE"] {
    background: #f3e5f5;
    border-color: #ab47bc;
  }

  .legend-item[data-category="ADVERB"] {
    background: #e0f7fa;
    border-color: #26c6da;
  }

  .legend-item[data-category="POSTPOSITION"] {
    background: #fff3e0;
    border-color: #ffa726;
  }

  .legend-item[data-category="CONJUNCTION"] {
    background: #e1f5fe;
    border-color: #42a5f5;
  }

  .legend-item[data-category="PARTICLE"] {
    background: #fce4ec;
    border-color: #ec407a;
  }

  /* Navigation Footer */
  .reader-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #ff9933, #ff7f00);
    color: white;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .nav-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .nav-center {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-icon-button {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .nav-icon-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .section-selector {
    padding: 0.5rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    min-width: 180px;
  }

  .section-selector option {
    background: #ff7f00;
    color: white;
  }

  /* Loading States */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    color: #666;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #ff9933;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  .spinner-small {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #ff9933;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

  /* Responsive */
  @media (max-width: 768px) {
    .hindi-reader {
      margin: 1rem;
    }

    .reader-header {
      flex-direction: column;
      text-align: center;
    }

    .clean-text {
      font-size: 1.8rem;
    }

    .hindi-reader :global(.word-field) {
      font-size: 1.5rem;
    }

    .reader-footer {
      flex-direction: column;
      gap: 1rem;
    }

    .nav-center {
      flex-wrap: wrap;
      justify-content: center;
    }

    .nav-text {
      display: none;
    }
  }
</style>
