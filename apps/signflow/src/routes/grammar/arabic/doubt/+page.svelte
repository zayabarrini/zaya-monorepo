<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { flip } from "svelte/animate";

  // Import the vocabulary data
  import { arabic_vocabulary } from "./arabic-vocabulary-data.js";

  // Types
  interface Word {
    ar: string;
    en: string;
  }

  interface VocabularyData {
    [key: string]: Word[];
  }

  interface CategoryCounts {
    [key: string]: number;
  }

  // State
  let searchTerm = "";
  let selectedCategory = "all";
  let expandedCategories = new Set<string>();
  let viewMode: "grid" | "list" = "grid";
  let isDarkMode = false;
  let categoryCounts: CategoryCounts = {};

  // Available categories
  const categories = [
    { id: "all", name: "All Categories", icon: "📚" },
    {
      id: "religious_nouns",
      name: "Religious Terms",
      icon: "⛪"
    },
    {
      id: "church_items",
      name: "Church Items",
      icon: "🕯️"
    },
    {
      id: "school_nouns",
      name: "School Terms",
      icon: "🏫"
    },
    {
      id: "family_nouns",
      name: "Family Terms",
      icon: "👪"
    },
    { id: "emotion_nouns", name: "Emotions", icon: "😊" },
    {
      id: "physical_nouns",
      name: "Physical Sensations",
      icon: "❤️"
    },
    {
      id: "daily_objects",
      name: "Daily Objects",
      icon: "🏠"
    },
    {
      id: "time_weather",
      name: "Time & Weather",
      icon: "⏰"
    },
    {
      id: "people_nouns",
      name: "People & Roles",
      icon: "👤"
    },
    {
      id: "abstract_nouns",
      name: "Abstract Concepts",
      icon: "💭"
    },
    {
      id: "common_verbs",
      name: "Common Verbs",
      icon: "🏃"
    },
    {
      id: "religious_verbs",
      name: "Religious Verbs",
      icon: "🙏"
    },
    {
      id: "school_verbs",
      name: "School Verbs",
      icon: "✏️"
    },
    {
      id: "communication_verbs",
      name: "Communication Verbs",
      icon: "💬"
    },
    {
      id: "emotion_verbs",
      name: "Emotion Verbs",
      icon: "💓"
    },
    {
      id: "descriptive_adjectives",
      name: "Descriptive Adjectives",
      icon: "📏"
    },
    {
      id: "emotional_adjectives",
      name: "Emotional Adjectives",
      icon: "🎭"
    },
    {
      id: "religious_adjectives",
      name: "Religious Adjectives",
      icon: "✨"
    },
    {
      id: "intellectual_adjectives",
      name: "Intellectual Adjectives",
      icon: "🧠"
    },
    {
      id: "time_adverbs",
      name: "Time Adverbs",
      icon: "⏱️"
    },
    {
      id: "place_adverbs",
      name: "Place Adverbs",
      icon: "📍"
    },
    {
      id: "manner_adverbs",
      name: "Manner Adverbs",
      icon: "🎯"
    },
    {
      id: "degree_adverbs",
      name: "Degree Adverbs",
      icon: "📊"
    },
    {
      id: "prepositions",
      name: "Prepositions",
      icon: "🔗"
    },
    {
      id: "conjunctions",
      name: "Conjunctions",
      icon: "🔄"
    },
    {
      id: "interrogatives",
      name: "Question Words",
      icon: "❓"
    },
    {
      id: "personal_pronouns",
      name: "Personal Pronouns",
      icon: "👤"
    },
    {
      id: "possessive_pronouns",
      name: "Possessive Pronouns",
      icon: "📌"
    },
    {
      id: "demonstrative_pronouns",
      name: "Demonstrative Pronouns",
      icon: "👉"
    },
    {
      id: "relative_pronouns",
      name: "Relative Pronouns",
      icon: "↗️"
    },
    { id: "numbers", name: "Numbers", icon: "🔢" },
    {
      id: "ordinal_numbers",
      name: "Ordinal Numbers",
      icon: "🥇"
    },
    { id: "exclamations", name: "Exclamations", icon: "❗" }
  ];

  // Category display names mapping
  const categoryDisplayNames: { [key: string]: string } =
    Object.fromEntries(
      categories
        .filter((c) => c.id !== "all")
        .map((c) => [c.id, c.name])
    );

  // Initialize counts
  onMount(() => {
    // Calculate word counts per category
    Object.keys(arabic_vocabulary).forEach(
      (cat: string) => {
        categoryCounts[cat] = arabic_vocabulary[cat].length;
      }
    );

    // Load theme preference
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      isDarkMode = savedTheme === "true";
    }
  });

  // Filtered vocabulary based on search and category
  $: filteredVocabulary = getFilteredVocabulary();

  function getFilteredVocabulary(): VocabularyData {
    const result: VocabularyData = {};

    // Determine which categories to include
    const catsToInclude =
      selectedCategory === "all"
        ? Object.keys(arabic_vocabulary)
        : [selectedCategory];

    catsToInclude.forEach((cat: string) => {
      if (!arabic_vocabulary[cat]) return;

      const filtered = arabic_vocabulary[cat].filter(
        (item: Word) => {
          if (!searchTerm) return true;
          const term = searchTerm.toLowerCase();
          return (
            item.ar.includes(searchTerm) ||
            item.en.toLowerCase().includes(term)
          );
        }
      );

      if (filtered.length > 0) {
        result[cat] = filtered;
      }
    });

    return result;
  }

  // Get total word count
  $: totalWords = Object.values(arabic_vocabulary).reduce(
    (sum: number, arr: Word[]) => sum + arr.length,
    0
  );

  $: filteredTotal = Object.values(
    filteredVocabulary
  ).reduce(
    (sum: number, arr: Word[]) => sum + arr.length,
    0
  );

  // Toggle category expansion
  function toggleCategory(categoryId: string) {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    expandedCategories = newExpanded;
  }

  // Expand all categories
  function expandAll() {
    expandedCategories = new Set(
      Object.keys(filteredVocabulary)
    );
  }

  // Collapse all categories
  function collapseAll() {
    expandedCategories = new Set();
  }

  // Reset filters
  function resetFilters() {
    searchTerm = "";
    selectedCategory = "all";
  }

  // Toggle dark mode
  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem("darkMode", String(isDarkMode));
  }

  // Generate unique ID for card
  function getCardId(
    category: string,
    index: number,
    word: Word
  ): string {
    return `${category}-${index}-${word.ar}`;
  }
</script>

<svelte:head>
  <title>Arabic Vocabulary Cards</title>
  <meta
    name="description"
    content="Learn Arabic vocabulary with interactive cards"
  />
</svelte:head>

<!-- Main container with dynamic theme class -->
<div class="vocabulary-app" class:dark-mode={isDarkMode}>
  <!-- Header -->
  <header class="app-header">
    <div class="header-content">
      <h1>
        <span class="arabic-decoration">🕌</span>
        Arabic Vocabulary Cards
        <span class="arabic-decoration">📚</span>
      </h1>
      <p class="subtitle">
        {totalWords} words across {categories.length - 1} categories
      </p>
      <button
        class="theme-toggle"
        on:click={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </div>
  </header>

  <!-- Controls -->
  <div class="controls-container">
    <!-- Search bar -->
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search Arabic or English..."
        bind:value={searchTerm}
        aria-label="Search vocabulary"
      />
      {#if searchTerm}
        <button
          class="clear-search"
          on:click={() => (searchTerm = "")}
          aria-label="Clear search"
        >
          ✕
        </button>
      {/if}
    </div>

    <!-- Category selector -->
    <div class="category-selector">
      <label for="category-select">📂 Category:</label>
      <select
        id="category-select"
        bind:value={selectedCategory}
        aria-label="Select category"
      >
        {#each categories as category}
          <option value={category.id}>
            {category.icon}
            {category.name}
            {category.id !== "all"
              ? `(${categoryCounts[category.id] || 0})`
              : ""}
          </option>
        {/each}
      </select>
    </div>

    <!-- View mode toggle -->
    <div
      class="view-mode"
      role="radiogroup"
      aria-label="View mode"
    >
      <button
        class:active={viewMode === "grid"}
        on:click={() => (viewMode = "grid")}
        aria-label="Grid view"
        aria-checked={viewMode === "grid"}
        role="radio"
      >
        📱 Grid
      </button>
      <button
        class:active={viewMode === "list"}
        on:click={() => (viewMode = "list")}
        aria-label="List view"
        aria-checked={viewMode === "list"}
        role="radio"
      >
        📋 List
      </button>
    </div>

    <!-- Action buttons -->
    <div class="action-buttons">
      <button
        class="action-btn"
        on:click={expandAll}
        title="Expand all categories"
      >
        ▼ Expand All
      </button>
      <button
        class="action-btn"
        on:click={collapseAll}
        title="Collapse all categories"
      >
        ▲ Collapse All
      </button>
      <button
        class="action-btn reset"
        on:click={resetFilters}
        title="Reset filters"
      >
        ↺ Reset
      </button>
    </div>
  </div>

  <!-- Results summary -->
  {#if searchTerm || selectedCategory !== "all"}
    <div class="results-summary">
      Showing {filteredTotal} of {totalWords} words
      {#if searchTerm}
        matching "<strong>{searchTerm}</strong>"
      {/if}
      {#if selectedCategory !== "all"}
        in <strong
          >{categoryDisplayNames[selectedCategory]}</strong
        >
      {/if}
    </div>
  {/if}

  <!-- Main content -->
  <main class="vocabulary-container">
    {#if Object.keys(filteredVocabulary).length === 0}
      <!-- Empty state -->
      <div class="empty-state" transition:fade>
        <div class="empty-icon">🔍</div>
        <h3>No words found</h3>
        <p>Try adjusting your search or category filter</p>
        <button class="reset-btn" on:click={resetFilters}
          >View all words</button
        >
      </div>
    {:else}
      <!-- Categories -->
      {#each Object.entries(filteredVocabulary) as [category, words]}
        <section
          class="category-section"
          in:fly={{ y: 20, duration: 300 }}
        >
          <!-- Category header -->
          <div
            class="category-header"
            on:click={() => toggleCategory(category)}
            role="button"
            tabindex="0"
            aria-expanded={expandedCategories.has(category)}
            on:keydown={(e) =>
              e.key === "Enter" && toggleCategory(category)}
          >
            <span class="category-toggle">
              {expandedCategories.has(category) ? "▼" : "▶"}
            </span>
            <h2 class="category-title">
              {categories.find((c) => c.id === category)
                ?.icon}
              {categoryDisplayNames[category] || category}
            </h2>
            <span class="word-count"
              >{words.length} words</span
            >
          </div>

          <!-- Category content -->
          {#if expandedCategories.has(category)}
            <div
              class="category-content"
              in:fly={{ y: -10, duration: 200 }}
              out:fade={{ duration: 150 }}
            >
              {#if viewMode === "grid"}
                <!-- Grid view - Simple cards showing both Arabic and English -->
                <div class="cards-grid">
                  {#each words as word, index (getCardId(category, index, word))}
                    <div
                      class="simple-card"
                      animate:flip={{ duration: 300 }}
                    >
                      <div class="arabic-word">
                        {word.ar}
                      </div>
                      <div class="english-word">
                        {word.en}
                      </div>
                    </div>
                  {/each}
                </div>
              {:else}
                <!-- List view -->
                <div class="words-list">
                  {#each words as word, index (getCardId(category, index, word))}
                    <div
                      class="list-item"
                      in:fade={{ duration: 200 }}
                      animate:flip={{ duration: 300 }}
                    >
                      <span class="list-arabic"
                        >{word.ar}</span
                      >
                      <span class="list-separator">→</span>
                      <span class="list-english"
                        >{word.en}</span
                      >
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </section>
      {/each}
    {/if}
  </main>

  <!-- Footer -->
  <footer class="app-footer">
    <p>© 2026 Arabic Vocabulary Cards</p>
  </footer>
</div>

<style>
  /* CSS Variables for theming */
  .vocabulary-app {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #2c3e50;
    --text-secondary: #6c757d;
    --accent-color: #8e44ad;
    --accent-light: #e8daef;
    --border-color: #dee2e6;
    --card-bg: #ffffff;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --header-bg: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    --hover-bg: #f1f3f5;

    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    min-height: 100vh;
    transition: all 0.3s ease;
    margin-top: 4rem;
  }

  /* Dark mode variables */
  .vocabulary-app.dark-mode {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --border-color: #404040;
    --card-bg: #2d2d2d;
    --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    --hover-bg: #3d3d3d;
  }

  /* Header */
  .app-header {
    background: var(--header-bg);
    color: white;
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .app-header h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  .arabic-decoration {
    margin: 0 1rem;
    font-size: 2rem;
  }

  .subtitle {
    margin: 0.5rem 0 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .theme-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Controls */
  .controls-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .search-box {
    flex: 2;
    min-width: 300px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    color: var(--text-secondary);
    pointer-events: none;
  }

  .search-box input {
    width: 100%;
    padding: 0.8rem 2.5rem 0.8rem 3rem;
    border: 2px solid var(--border-color);
    border-radius: 30px;
    font-size: 1rem;
    background: var(--card-bg);
    color: var(--text-primary);
    transition: all 0.3s;
  }

  .search-box input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px var(--accent-light);
  }

  .clear-search {
    position: absolute;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.2rem 0.5rem;
    border-radius: 50%;
  }

  .clear-search:hover {
    background: var(--hover-bg);
  }

  .category-selector {
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category-selector label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .category-selector select {
    flex: 1;
    padding: 0.8rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--card-bg);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 0.95rem;
  }

  .category-selector select:focus {
    outline: none;
    border-color: var(--accent-color);
  }

  .view-mode {
    display: flex;
    gap: 0.5rem;
    background: var(--bg-secondary);
    padding: 0.3rem;
    border-radius: 8px;
  }

  .view-mode button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .view-mode button.active {
    background: var(--accent-color);
    color: white;
  }

  .action-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .action-btn {
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background: var(--card-bg);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: var(--hover-bg);
    border-color: var(--accent-color);
  }

  .action-btn.reset {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: white;
  }

  .action-btn.reset:hover {
    opacity: 0.9;
  }

  /* Results summary */
  .results-summary {
    max-width: 1200px;
    margin: 1rem auto 0;
    padding: 0 1rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  /* Vocabulary container */
  .vocabulary-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  /* Category sections */
  .category-section {
    margin-bottom: 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border-color);
  }

  .category-header {
    padding: 1rem 1.5rem;
    background: var(--card-bg);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    user-select: none;
    transition: background 0.2s;
    border-bottom: 1px solid var(--border-color);
  }

  .category-header:hover {
    background: var(--hover-bg);
  }

  .category-toggle {
    font-size: 1.2rem;
    color: var(--accent-color);
    width: 1.5rem;
  }

  .category-title {
    flex: 1;
    margin: 0;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--text-primary);
  }

  .word-count {
    color: var(--text-secondary);
    font-size: 0.9rem;
    background: var(--bg-secondary);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
  }

  .category-content {
    padding: 1.5rem;
  }

  /* Grid view - Simple cards */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
    gap: 1.5rem;
  }

  .simple-card {
    background: var(--card-bg);
    border: 2px solid var(--accent-color);
    border-radius: 10px;
    padding: 1.5rem 1rem;
    box-shadow: var(--card-shadow);
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    height: 150px;
    justify-content: center;
  }

  .simple-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--accent-color);
  }

  .simple-card .arabic-word {
    font-size: 1.5rem;
    font-weight: bold;
    direction: rtl;
    color: var(--text-primary);
  }

  .simple-card .english-word {
    font-size: 1.2rem;
    color: var(--text-secondary);
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
    width: 100%;
    text-align: center;
  }

  /* List view */
  .words-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    background: var(--card-bg);
    border-radius: 8px;
    border: 1px solid var(--border-color);
    transition: all 0.2s;
  }

  .list-item:hover {
    transform: translateX(5px);
    border-color: var(--accent-color);
  }

  .list-arabic {
    font-size: 1.2rem;
    font-weight: 500;
    direction: rtl;
    min-width: 150px;
  }

  .list-separator {
    margin: 0 1rem;
    color: var(--accent-color);
    font-weight: bold;
  }

  .list-english {
    color: var(--text-secondary);
  }

  /* Empty state */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-state h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .reset-btn {
    padding: 0.8rem 2rem;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .reset-btn:hover {
    opacity: 0.9;
  }

  /* Footer */
  .app-footer {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
    border-top: 1px solid var(--border-color);
    margin-top: 2rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .app-header h1 {
      font-size: 1.8rem;
    }

    .arabic-decoration {
      margin: 0 0.3rem;
      font-size: 1.5rem;
    }

    .controls-container {
      flex-direction: column;
      align-items: stretch;
    }

    .search-box {
      min-width: auto;
    }

    .category-selector {
      flex-direction: column;
      align-items: stretch;
    }

    .view-mode {
      justify-content: stretch;
    }

    .view-mode button {
      flex: 1;
    }

    .action-buttons {
      flex-wrap: wrap;
    }

    .cards-grid {
      grid-template-columns: repeat(
        auto-fill,
        minmax(150px, 1fr)
      );
    }

    .simple-card {
      height: 130px;
      padding: 1rem;
    }

    .simple-card .arabic-word {
      font-size: 1.2rem;
    }

    .simple-card .english-word {
      font-size: 1rem;
    }

    .list-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .list-separator {
      display: none;
    }

    .list-arabic {
      min-width: auto;
    }
  }
</style>
