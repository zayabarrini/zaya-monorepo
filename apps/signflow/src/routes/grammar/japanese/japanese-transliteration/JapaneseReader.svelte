<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import JapaneseStrokeOrder from './JapaneseStrokeOrder.svelte';

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

  // Display configuration interface
  interface DisplayConfig {
    showWord: boolean;
    showTransliteration: boolean;
    showTranslation: boolean;
    showPartOfSpeech: boolean;
    showSyntaxRole: boolean;
    showParticleType: boolean;
    showVerbForm: boolean;
    showHonorificLevel: boolean;
    showSemanticCategory: boolean;
  }

  // Props
  export let jsonPath: string = "/json/ja/epub_content_web-Downton-abbey.json";
  export let apiUrl: string = "http://localhost:5000/api/analyze/japanese";
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
  let activeTab: 'display' | 'fields' = 'display';
  let selectedCharacter: string = '';
  let showStrokeOrder: boolean = true;

  // Display configuration - all enabled by default
  let displayConfig: DisplayConfig = {
    showWord: true,
    showTransliteration: true,
    showTranslation: true,
    showPartOfSpeech: true,
    showSyntaxRole: true,
    showParticleType: true,
    showVerbForm: true,
    showHonorificLevel: true,
    showSemanticCategory: true
  };

  $: kanjiCharacters = currentParagraph?.ja 
    ? [...new Set(currentParagraph.ja.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/g) || [])]
    : [];

  // Derived values
  $: currentSection = sections[currentSectionIndex];
  $: currentParagraph = currentSection?.paragraphs[currentParagraphIndex];
  $: hasPrevious = currentParagraphIndex > 0 || currentSectionIndex > 0;
  $: hasNext = currentSectionIndex < sections.length - 1 || 
               (currentSection && currentParagraphIndex < currentSection.paragraphs.length - 1);
  $: currentParagraphText = currentParagraph?.ja || "";

  onMount(async () => {
    await loadData();
  });

  $: if (browser && currentParagraph && autoAnalyze && !currentParagraph.analysis) {
    analyzeCurrentParagraph();
  }

  async function loadData() {
    try {
      loading = true;
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.statusText}`);
      }
      sections = await response.json();
      error = null;

      if (sections.length > 0 && sections[0].paragraphs.length > 0 && !sections[0].paragraphs[0].analysis) {
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
    if (!currentParagraph || !currentParagraph.ja || analyzing) return;

    try {
      analyzing = true;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: currentParagraph.ja,
          target_language: "en"
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        currentParagraph.analysis = data.analysis;
        sections[currentSectionIndex].paragraphs[currentParagraphIndex].analysis = data.analysis;
      }
    } catch (err) {
      console.error("Error analyzing paragraph:", err);
    } finally {
      analyzing = false;
    }
  }

  function next() {
    if (!currentSection) return;

    if (currentParagraphIndex < currentSection.paragraphs.length - 1) {
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
      currentParagraphIndex = sections[currentSectionIndex].paragraphs.length - 1;
    }
  }

  function goToSection(sectionIndex: number) {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
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
      showParticleType: true,
      showVerbForm: true,
      showHonorificLevel: true,
      showSemanticCategory: true
    };
  }

  function getPosClass(analysis: WordAnalysis): string {
    const pos = analysis.part_of_speech;
    
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

    const semantic = analysis.semantic_category;
    if (semantic === "TIME") return "time";
    if (semantic === "LOCATION") return "location";
    if (semantic === "PERSON") return "person";
    if (semantic === "ACTION") return "action";
    if (semantic === "DESCRIPTION") return "description";
    if (semantic === "OBJECT") return "object";
    if (semantic === "GRAMMAR") return "grammar";

    return "default";
  }

  function getSyntaxLabel(analysis: WordAnalysis): string {
    const role = analysis.syntax_role;
    if (role === "UNKNOWN") return "";
    return role.replace(/_/g, " ").toLowerCase();
  }

  function getParticleLabel(analysis: WordAnalysis): string {
    if (analysis.particle_type === "None" || analysis.particle_type === "NONE") return "";
    return analysis.particle_type.replace(/_/g, " ").toLowerCase();
  }

  function getVerbFormLabel(analysis: WordAnalysis): string {
    if (analysis.verb_form === "None" || analysis.verb_form === "NONE") return "";
    return analysis.verb_form.replace(/_/g, " ").toLowerCase();
  }

  function buildTooltip(analysis: WordAnalysis): string {
    const parts = [];
    if (displayConfig.showTranslation && analysis.translation) 
      parts.push(`📖 ${analysis.translation}`);
    if (displayConfig.showPartOfSpeech && analysis.part_of_speech !== "UNKNOWN") 
      parts.push(`🏷️ ${analysis.part_of_speech.toLowerCase()}`);
    if (displayConfig.showSyntaxRole && analysis.syntax_role !== "UNKNOWN") 
      parts.push(`🔤 ${getSyntaxLabel(analysis)}`);
    if (displayConfig.showParticleType && analysis.particle_type !== "None" && analysis.particle_type !== "NONE") {
      parts.push(`⚡ ${getParticleLabel(analysis)}`);
    }
    if (displayConfig.showVerbForm && analysis.verb_form !== "None" && analysis.verb_form !== "NONE") {
      parts.push(`🔄 ${getVerbFormLabel(analysis)}`);
    }
    if (displayConfig.showHonorificLevel && analysis.honorific_level !== "NEUTRAL" && analysis.honorific_level !== "PLAIN") {
      parts.push(`👑 ${analysis.honorific_level.toLowerCase()}`);
    }
    if (displayConfig.showSemanticCategory && analysis.semantic_category !== "GENERAL") {
      parts.push(`📌 ${analysis.semantic_category.toLowerCase()}`);
    }
    return parts.join(" • ");
  }

  // Count active display fields
  $: activeFieldsCount = Object.values(displayConfig).filter(Boolean).length;
</script>

<!-- Loading State -->
{#if loading}
  <div class="loading-container">
    <div class="spinner"></div>
    <p>Loading your Japanese reader...</p>
  </div>

<!-- Error State -->
{:else if error}
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3>Oops! Something went wrong</h3>
    <p>{error}</p>
    <button on:click={loadData} class="retry-button">Try Again</button>
  </div>

<!-- Main Content -->
{:else if sections.length > 0}
  <div class="japanese-reader">
    <!-- Beautiful Header with Gradient -->
    <header class="reader-header">
      <div class="header-content">
        <h1>日本語リーダー</h1>
        <p class="subtitle">Japanese Reader with Grammar Analysis</p>
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
          {#if activeFieldsCount < 9}
            <span class="settings-badge">{activeFieldsCount}/9</span>
          {/if}
        </button>
        <div class="progress-indicator">
          <span class="section-badge">Section {currentSectionIndex + 1}/{sections.length}</span>
          <span class="paragraph-badge">Paragraph {currentParagraphIndex + 1}/{currentSection?.paragraphs.length || 0}</span>
          {#if analyzing}
            <span class="analyzing-badge">Analyzing...</span>
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
            class:active={activeTab === 'display'}
            on:click={() => activeTab = 'display'}
          >
            Display Options
          </button>
          <button 
            class="tab-button" 
            class:active={activeTab === 'fields'}
            on:click={() => activeTab = 'fields'}
          >
            Data Fields <span class="field-count">{activeFieldsCount}/9</span>
          </button>
        </div>

        {#if activeTab === 'display'}
          <div class="settings-section">
            <h3>Display Settings</h3>
            <div class="settings-grid">
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showCleanVersion} />
                <span class="checkbox-custom"></span>
                <span>Show Clean Version</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showAnnotations} />
                <span class="checkbox-custom"></span>
                <span>Show Annotations</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showSyntaxLabels} />
                <span class="checkbox-custom"></span>
                <span>Show Syntax Labels</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showTranslation} />
                <span class="checkbox-custom"></span>
                <span>Show Full Translation</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showTransliteration} />
                <span class="checkbox-custom"></span>
                <span>Show Romaji</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={autoAnalyze} />
                <span class="checkbox-custom"></span>
                <span>Auto-analyze</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" bind:checked={showStrokeOrder} />
                <span class="checkbox-custom"></span>
                <span>Show Stroke Order</span>
              </label>
            </div>
          </div>
        {:else}
          <div class="settings-section">
            <div class="settings-header">
              <h3>Data Fields to Display</h3>
              <div class="settings-actions">
                <button class="settings-action" on:click={resetToDefaults}>Reset to Defaults</button>
              </div>
            </div>
            <p class="settings-description">
              Choose which linguistic data fields to show in the annotations. 
              Hover over words to see all available data regardless of selection.
            </p>
            <div class="fields-grid">
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showWord} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Word</span>
                <span class="field-badge">Japanese text</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showTransliteration} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Transliteration</span>
                <span class="field-badge">Romaji</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showTranslation} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Translation</span>
                <span class="field-badge">English meaning</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showPartOfSpeech} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Part of Speech</span>
                <span class="field-badge">POS tag</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showSyntaxRole} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Syntax Role</span>
                <span class="field-badge">Subject, object, etc.</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showParticleType} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Particle Type</span>
                <span class="field-badge">Case, connective, etc.</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showVerbForm} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Verb Form</span>
                <span class="field-badge">Conjugation</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showHonorificLevel} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Honorific Level</span>
                <span class="field-badge">Polite, humble, etc.</span>
              </label>
              <label class="checkbox-label field-item">
                <input type="checkbox" bind:checked={displayConfig.showSemanticCategory} />
                <span class="checkbox-custom"></span>
                <span class="field-name">Semantic Category</span>
                <span class="field-badge">Time, location, etc.</span>
              </label>
            </div>
            <div class="settings-note">
              <span class="note-icon">💡</span>
              <span>All data is always available in tooltips when hovering over words.</span>
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
            <h2>{currentSection.title.ja}</h2>
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

            <!-- Japanese Clean Version -->
            {#if showCleanVersion}
              <div class="clean-version">
                <div class="clean-text">{currentParagraph.ja}</div>
              </div>
            {/if}

            <!-- Annotated Version - Now using Svelte templating instead of HTML injection -->
            {#if showAnnotations && currentParagraph.analysis && currentParagraph.analysis.length > 0}
              <div class="annotated-version">
                <div class="annotated-text">
                  {#each currentParagraph.analysis as analysis (analysis.word + analysis.transliteration + analysis.part_of_speech)}
                    {#if analysis.is_punctuation}
                      <span class="punctuation-token">{analysis.word}</span>
                    {:else}
                      {@const posClass = getPosClass(analysis)}
                      {@const syntaxRole = analysis.syntax_role.toLowerCase().replace(/_/g, "-")}
                      {@const tooltip = buildTooltip(analysis)}
                      
                      <div 
                        class="word-container word-{posClass} syntax-{syntaxRole}" 
                        data-syntax={analysis.syntax_role}
                        title={tooltip}
                      >
                        {#if displayConfig.showWord}
                          <span class="word-field">{analysis.word}</span>
                        {/if}
                        
                        {#if displayConfig.showTransliteration && analysis.transliteration}
                          <span class="transliteration-field">{analysis.transliteration}</span>
                        {/if}
                        
                        {#if displayConfig.showTranslation && analysis.translation}
                          <span class="translation-field">{analysis.translation}</span>
                        {/if}
                        
                        {#if displayConfig.showPartOfSpeech && analysis.part_of_speech !== "UNKNOWN"}
                          <span class="pos-field pos-{analysis.part_of_speech.toLowerCase()}">
                            {analysis.part_of_speech.toLowerCase()}
                          </span>
                        {/if}
                        
                        {#if displayConfig.showSyntaxRole && analysis.syntax_role !== "UNKNOWN"}
                          <span class="syntax-field">{getSyntaxLabel(analysis)}</span>
                        {/if}
                        
                        {#if displayConfig.showParticleType && analysis.particle_type !== "None" && analysis.particle_type !== "NONE"}
                          <span class="particle-field">{getParticleLabel(analysis)}</span>
                        {/if}
                        
                        {#if displayConfig.showVerbForm && analysis.verb_form !== "None" && analysis.verb_form !== "NONE"}
                          <span class="verb-form-field">{getVerbFormLabel(analysis)}</span>
                        {/if}
                        
                        {#if displayConfig.showHonorificLevel && analysis.honorific_level !== "NEUTRAL" && analysis.honorific_level !== "PLAIN"}
                          <span class="honorific-field">{analysis.honorific_level.toLowerCase()}</span>
                        {/if}
                        
                        {#if displayConfig.showSemanticCategory && analysis.semantic_category !== "GENERAL"}
                          <span class="semantic-field">{analysis.semantic_category.toLowerCase()}</span>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
              {#if showStrokeOrder && currentParagraph.analysis && currentParagraph.analysis.length > 0}
      <div class="stroke-order-section">
        <div class="section-header">
          <h3>✍️ Stroke Order</h3>
          <p class="section-description">Click on any character to see its stroke order</p>
        </div>
        
        <div class="character-grid">
          {#each kanjiCharacters as char}
            <button 
              class="character-button"
              class:active={selectedCharacter === char}
              on:click={() => selectedCharacter = char}
            >
              <span class="char">{char}</span>
              <span class="char-info">
                {char.codePointAt(0)?.toString(16).toUpperCase()}
              </span>
            </button>
          {/each}
        </div>
        
        {#if selectedCharacter}
          <div class="stroke-order-detail">
            <button 
              class="close-button"
              on:click={() => selectedCharacter = ''}
              title="Close"
            >
              ✕
            </button>
            <JapaneseStrokeOrder 
              character={selectedCharacter}
              width={250}
              height={250}
              showStrokeNumber={true}
              animationSpeed={1.0}
              strokeColor="#2c3e50"
              numberColor="#ff6b6b"
              autoplay={true}
            />
          </div>
        {:else}
          <div class="stroke-order-prompt">
            <span class="prompt-icon">👆</span>
            <span>Select a character above to see its stroke order</span>
          </div>
        {/if}
      </div>
    {/if}
            {:else if analyzing}
              <div class="analyzing-message">
                <div class="spinner-small"></div>
                <p>Analyzing Japanese text...</p>
              </div>
            {/if}

            <!-- Manual Analysis Button -->
            {#if !currentParagraph.analysis && !analyzing}
              <button class="analyze-button" on:click={analyzeCurrentParagraph}>
                <span>🔍</span> Analyze This Paragraph
              </button>
            {/if}
          </div>
        {/if}
      {/if}
    </main>

    <!-- Legend -->
    <div class="legend">
      <h3>Grammar Legend</h3>
      <div class="legend-items">
        <span class="legend-item" data-category="NOUN">Noun</span>
        <span class="legend-item" data-category="VERB">Verb</span>
        <span class="legend-item" data-category="PRONOUN">Pronoun</span>
        <span class="legend-item" data-category="ADJECTIVE_I">I-Adjective</span>
        <span class="legend-item" data-category="ADJECTIVE_NA">Na-Adjective</span>
        <span class="legend-item" data-category="PARTICLE">Particle</span>
        <span class="legend-item" data-category="ADVERB">Adverb</span>
        <span class="legend-item" data-category="AUXILIARY">Auxiliary</span>
      </div>
    </div>

    <!-- Navigation Footer -->
    <footer class="reader-footer">
      <button class="nav-button prev" on:click={previous} disabled={!hasPrevious || analyzing}>
        <span class="nav-icon">←</span>
        <span class="nav-text">Previous</span>
      </button>

      <div class="nav-center">
        <button class="nav-icon-button" on:click={() => goToSection(currentSectionIndex - 1)} 
                disabled={currentSectionIndex === 0 || analyzing} title="Previous section">
          ⏪
        </button>
        
        <select class="section-selector" on:change={(e) => goToSection(parseInt(e.currentTarget.value))} 
                value={currentSectionIndex} disabled={analyzing}>
          {#each sections as section, index}
            <option value={index}>Section {index + 1}: {section.id}</option>
          {/each}
        </select>
        
        <button class="nav-icon-button" on:click={() => goToSection(currentSectionIndex + 1)} 
                disabled={currentSectionIndex === sections.length - 1 || analyzing} title="Next section">
          ⏩
        </button>
      </div>

      <button class="nav-button next" on:click={next} disabled={!hasNext || analyzing}>
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

  .japanese-reader {
    max-width: 1200px;
    margin: 2rem auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* Beautiful Header */
  .reader-header {
    background: linear-gradient(135deg, #2c3e50, #34495e);
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
    position: relative;
  }

  .settings-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .settings-button.active {
    background: white;
    color: #2c3e50;
    border-color: white;
  }

  .settings-badge {
    background: #e74c3c;
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.25rem;
  }

  .progress-indicator {
    display: flex;
    gap: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }

  .section-badge, .paragraph-badge, .analyzing-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .section-badge {
    background: #3498db;
  }

  .paragraph-badge {
    background: #e74c3c;
  }

  .analyzing-badge {
    background: #f39c12;
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
    transition: all 0.3s ease;
  }

  .tab-button.active {
    color: #2c3e50;
  }

  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
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

  .tab-button.active .field-count {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  .settings-section h3 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }

  .settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .settings-actions {
    display: flex;
    gap: 1rem;
  }

  .settings-action {
    padding: 0.4rem 1rem;
    border: 1px solid #e1e5e9;
    border-radius: 4px;
    background: white;
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .settings-action:hover {
    background: #f8f9fa;
    border-color: #667eea;
    color: #667eea;
  }

  .settings-description {
    color: #666;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .fields-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .field-item {
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .field-item:hover {
    background: #e9ecef;
    transform: translateY(-2px);
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

  .settings-note {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #e8f4fd;
    border-radius: 8px;
    color: #0369a1;
    font-size: 0.9rem;
  }

  .note-icon {
    font-size: 1.2rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    color: #555;
    font-size: 1rem;
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

  .checkbox-label input[type="checkbox"]:checked + .checkbox-custom {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: transparent;
  }

  .checkbox-label input[type="checkbox"]:checked + .checkbox-custom::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 0.875rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .checkbox-label:hover .checkbox-custom {
    border-color: #667eea;
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
    display: inline-block;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid linear-gradient(135deg, #667eea, #764ba2);
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
    line-height: 1.6;
    color: #2c3e50;
    font-family: 'MS Gothic', 'Hiragino Sans', 'Meiryo', sans-serif;
    text-align: center;
  }

  /* Word Container */
  .japanese-reader :global(.word-container) {
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
    min-width: 5rem;
    position: relative;
    background: white;
  }

  .japanese-reader :global(.word-container:hover) {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  /* Base field styles */
  .japanese-reader :global(.word-container > span) {
    display: block;
    width: 100%;
    padding: 0.1rem 0;
    line-height: 1.4;
  }

  /* Word field - largest */
  .japanese-reader :global(.word-field) {
    font-size: 3.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.1rem;
  }

  /* Transliteration field */
  .japanese-reader :global(.transliteration-field) {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 0.2rem;
    padding-bottom: 0.2rem;
  }

  /* Translation field */
  .japanese-reader :global(.translation-field) {
    font-size: 0.9rem;
    color: #2c3e50;
    font-weight: 500;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 4px;
    padding: 0.2rem 0.4rem !important;
    margin: 0.2rem 0;
  }

  /* Metadata fields (all the grammatical info) */
  .japanese-reader :global(.pos-field),
  .japanese-reader :global(.syntax-field),
  .japanese-reader :global(.particle-field),
  .japanese-reader :global(.verb-form-field),
  .japanese-reader :global(.honorific-field),
  .japanese-reader :global(.semantic-field) {
    font-size: 0.7rem;
    padding: 0.15rem 0.3rem;
    border-radius: 4px;
    margin: 0.1rem 0;
    background: #f8f9fa;
    color: #555;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    display: inline-block;
    width: auto;
    align-self: center;
  }

  /* Specific field colors */
  .japanese-reader :global(.pos-field) {
    background: #e3f2fd;
    color: #1976d2;
  }

  .japanese-reader :global(.syntax-field) {
    background: #f3e5f5;
    color: #7b1fa2;
  }

  .japanese-reader :global(.particle-field) {
    background: #fff3e0;
    color: #f57c00;
  }

  .japanese-reader :global(.verb-form-field) {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .japanese-reader :global(.honorific-field) {
    background: #fce4ec;
    color: #c2185b;
  }

  .japanese-reader :global(.semantic-field) {
    background: #e0f2f1;
    color: #00796b;
  }

  /* Part of Speech specific colors for the POS field */
  .japanese-reader :global(.pos-noun) {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .japanese-reader :global(.pos-verb) {
    background: #ffebee;
    color: #c62828;
  }

  .japanese-reader :global(.pos-pronoun) {
    background: #efebe9;
    color: #5d4037;
  }

  .japanese-reader :global(.pos-adjective_i) {
    background: #f3e5f5;
    color: #7b1fa2;
  }

  .japanese-reader :global(.pos-adjective_na) {
    background: #ede7f6;
    color: #512da8;
  }

  .japanese-reader :global(.pos-particle) {
    background: #fff3e0;
    color: #ef6c00;
  }

  /* Word container background colors based on part of speech */
  .japanese-reader :global(.word-noun) {
    background: linear-gradient(135deg, #f1f8e9, #dcedc8);
    border-color: #8bc34a;
  }

  .japanese-reader :global(.word-verb) {
    background: linear-gradient(135deg, #ffebee, #ffcdd2);
    border-color: #ef5350;
  }

  .japanese-reader :global(.word-pronoun) {
    background: linear-gradient(135deg, #efebe9, #d7ccc8);
    border-color: #8d6e63;
  }

  .japanese-reader :global(.word-adjective-i) {
    background: linear-gradient(135deg, #f3e5f5, #e1bee7);
    border-color: #ab47bc;
  }

  .japanese-reader :global(.word-adjective-na) {
    background: linear-gradient(135deg, #ede7f6, #d1c4e9);
    border-color: #7e57c2;
  }

  .japanese-reader :global(.word-particle) {
    background: linear-gradient(135deg, #fff3e0, #ffe0b2);
    border-color: #ffa726;
  }

  .japanese-reader :global(.word-adverb) {
    background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
    border-color: #26c6da;
  }

  .japanese-reader :global(.word-auxiliary) {
    background: linear-gradient(135deg, #e1f5fe, #b3e5fc);
    border-color: #42a5f5;
  }

  .japanese-reader :global(.word-default) {
    background: linear-gradient(135deg, #fafafa, #f5f5f5);
    border-color: #bdbdbd;
  }

  /* Syntax role left borders */
  .japanese-reader :global(.syntax-subject) {
    border-left-width: 4px;
    border-left-color: #ef5350;
  }

  .japanese-reader :global(.syntax-topic) {
    border-left-width: 4px;
    border-left-color: #ffa726;
  }

  .japanese-reader :global(.syntax-direct-object) {
    border-left-width: 4px;
    border-left-color: #66bb6a;
  }

  .japanese-reader :global(.syntax-indirect-object) {
    border-left-width: 4px;
    border-left-color: #42a5f5;
  }

  .japanese-reader :global(.syntax-modifier) {
    border-left-width: 4px;
    border-left-color: #ab47bc;
  }

  .japanese-reader :global(.syntax-verb) {
    border-left-width: 4px;
    border-left-color: #ef5350;
  }

  .japanese-reader :global(.syntax-sentence-ender) {
    border-left-width: 4px;
    border-left-color: #78909c;
  }

  /* Punctuation */
  .japanese-reader :global(.punctuation-token) {
    display: inline-block;
    margin: 0 0.2rem;
    font-size: 1.5rem;
    color: #999;
    vertical-align: middle;
  }

  /* Annotated text container */
  .japanese-reader :global(.annotated-text) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.5rem;
    line-height: 1.8;
    font-size: 1rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 10px;
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
    cursor: default;
  }

  .legend-item[data-category="NOUN"] {
    background: #e8f5e8;
    border-color: #4caf50;
  }

  .legend-item[data-category="VERB"] {
    background: #ffebee;
    border-color: #f44336;
  }

  .legend-item[data-category="PRONOUN"] {
    background: #efebe9;
    border-color: #795548;
  }

  .legend-item[data-category="ADJECTIVE_I"] {
    background: #f3e5f5;
    border-color: #9c27b0;
  }

  .legend-item[data-category="ADJECTIVE_NA"] {
    background: #ede7f6;
    border-color: #673ab7;
  }

  .legend-item[data-category="PARTICLE"] {
    background: #fff3e0;
    border-color: #ff9800;
  }

  .legend-item[data-category="ADVERB"] {
    background: #e0f7fa;
    border-color: #00bcd4;
  }

  .legend-item[data-category="AUXILIARY"] {
    background: #e1f5fe;
    border-color: #03a9f4;
  }

  /* Navigation Footer */
  .reader-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background: linear-gradient(135deg, #2c3e50, #34495e);
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
    border-color: rgba(255, 255, 255, 0.3);
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
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .nav-icon-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .nav-icon-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .section-selector {
    padding: 0.5rem 1rem;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    outline: none;
    min-width: 180px;
  }

  .section-selector option {
    background: #2c3e50;
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
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1.5rem;
  }

  .spinner-small {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Error State */
  .error-container {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, #ffebee, #ffcdd2);
    border-radius: 15px;
    color: #c62828;
    max-width: 600px;
    margin: 2rem auto;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-container h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .retry-button {
    padding: 0.75rem 2rem;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1.5rem;
  }

  .retry-button:hover {
    background: #b71c1c;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(198, 40, 40, 0.3);
  }

  .analyzing-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 10px;
    color: #666;
  }

  .analyze-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .analyze-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  /* Compact view for mobile */
  @media (max-width: 768px) {
    .japanese-reader {
      margin: 1rem;
    }

    .reader-header {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
    }

    .header-content h1 {
      font-size: 2rem;
    }

    .header-controls {
      width: 100%;
      justify-content: center;
    }

    .progress-indicator {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .settings-tabs {
      flex-direction: column;
      gap: 0.5rem;
    }

    .tab-button.active::after {
      display: none;
    }

    .settings-grid,
    .fields-grid {
      grid-template-columns: 1fr;
    }

    .settings-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .clean-text {
      font-size: 1.8rem;
    }

    .japanese-reader :global(.word-container) {
      min-width: 4rem;
      padding: 0.4rem 0.5rem;
    }

    .japanese-reader :global(.word-field) {
      font-size: 1.2rem;
    }

    .japanese-reader :global(.transliteration-field) {
      font-size: 0.8rem;
    }

    .japanese-reader :global(.translation-field) {
      font-size: 0.8rem;
    }

    .japanese-reader :global(.pos-field),
    .japanese-reader :global(.syntax-field),
    .japanese-reader :global(.particle-field),
    .japanese-reader :global(.verb-form-field),
    .japanese-reader :global(.honorific-field),
    .japanese-reader :global(.semantic-field) {
      font-size: 0.6rem;
    }

    .reader-footer {
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem;
    }

    .nav-button {
      width: 100%;
      justify-content: center;
    }

    .nav-center {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
    }

    .nav-text {
      display: none;
    }
  }

    /* Stroke Order Section */
  .stroke-order-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 12px;
    border: 1px solid #e1e5e9;
  }

  .section-header {
    margin-bottom: 1.5rem;
  }

  .section-header h3 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 0.25rem;
  }

  .section-description {
    font-size: 0.9rem;
    color: #666;
  }

  .character-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 8px;
    max-height: 120px;
    overflow-y: auto;
  }

  .character-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    min-width: 60px;
    border: 2px solid transparent;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .character-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }

  .character-button.active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: #5a67d8;
  }

  .character-button.active .char {
    color: white;
  }

  .character-button.active .char-info {
    color: rgba(255, 255, 255, 0.8);
  }

  .char {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-family: 'MS Gothic', 'Hiragino Sans', 'Meiryo', sans-serif;
    line-height: 1;
  }

  .char-info {
    font-size: 0.7rem;
    color: #999;
    margin-top: 0.25rem;
  }

  .stroke-order-detail {
    position: relative;
    margin-top: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: #f0f0f0;
    color: #666;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .close-button:hover {
    background: #ff6b6b;
    color: white;
    transform: scale(1.1);
  }

  .stroke-order-prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    color: #666;
    font-style: italic;
  }

  .prompt-icon {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  /* Scrollbar styling for character grid */
  .character-grid::-webkit-scrollbar {
    width: 6px;
  }

  .character-grid::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
  }

  .character-grid::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;
  }

  .character-grid::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .character-grid {
      max-height: 100px;
    }

    .character-button {
      min-width: 50px;
      padding: 0.35rem;
    }

    .char {
      font-size: 1.2rem;
    }

    .char-info {
      font-size: 0.6rem;
    }
  }
</style>