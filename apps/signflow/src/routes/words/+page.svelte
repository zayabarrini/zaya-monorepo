<script lang="ts">
  import { onMount } from "svelte";
  import LanguageSelector from "$lib/components/LanguageSelector.svelte";
  import MultilingualTable from "$lib/components/MultilingualTable.svelte";
  import TranslationConfig from "$lib/components/TranslationConfig.svelte";
  import {
    ALL_LANGUAGES,
    type LanguageCode
  } from "$lib/languages";

  // Language selection
  let selectedLanguages: LanguageCode[] = [
    "en",
    "ar",
    "ru",
    "ch"
  ];
  let sourceLanguage: LanguageCode = "en";

  // Data
  let allWords: any[] = [];
  let filteredWords: any[] = [];
  let loading = false;
  let page = 1;
  let pageSize = 50;
  let totalItems = 0;
  let searchQuery = "";
  let isShuffled = false;

  // Available languages from data
  let availableLanguages: LanguageCode[] = [];
  let showTranslationConfig = false;

  // Filter words based on selected languages and search
  function filterWords() {
    let result = [...allWords];

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter((word) =>
        selectedLanguages.some((lang) => {
          const text = word[lang];
          return (
            text &&
            typeof text === "string" &&
            text.toLowerCase().includes(searchLower)
          );
        })
      );
    }

    totalItems = result.length;

    // Paginate
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    filteredWords = result.slice(start, end);
  }

  // Toggle shuffle state
  function toggleShuffle() {
    isShuffled = !isShuffled;
    if (isShuffled) {
      page = 1; // Reset to first page
    }
    filterWords();
  }

  // Reset shuffle and go back to normal order
  function resetShuffle() {
    isShuffled = false;
    page = 1;
    filterWords();
  }

  async function loadWords() {
    loading = true;

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(searchQuery && { search: searchQuery })
      });

      const response = await fetch(`/api/words?${params}`);
      const result = await response.json();

      if (result.success) {
        allWords = result.data;
        availableLanguages =
          result.meta?.availableLanguages || [];
        totalItems = result.meta?.total || allWords.length;

        // Reset shuffle when loading new data
        isShuffled = false;

        // Filter based on current selection
        filterWords();
      }
    } catch (error) {
      console.error("Failed to load words:", error);
    } finally {
      loading = false;
    }
  }

  function handleLanguageChange(event: CustomEvent) {
    selectedLanguages = event.detail.selectedLanguages;
    sourceLanguage = event.detail.sourceLanguage;
    isShuffled = false;
    filterWords();
  }

  function handlePageSizeChange() {
    page = 1;
    loadWords();
  }

  $: if (searchQuery || page || pageSize) {
    filterWords();
  }

  onMount(() => {
    loadWords();
  });
</script>

<svelte:head>
  <title>Multilingual Words Dictionary</title>
  <meta
    name="description"
    content="Compare words across multiple languages with translations and frequency data"
  />
</svelte:head>

<div class="container">
  <header>
    <h1>📚 Multilingual Words Dictionary</h1>
    <p class="subtitle">
      Compare words across {selectedLanguages.length} languages
      with translations and study tools
    </p>
  </header>

  <div class="content">
    <aside class="sidebar">
      <div class="card">
        <LanguageSelector
          bind:selectedLanguages
          bind:sourceLanguage
          on:change={handleLanguageChange}
          maxSelection={8}
        />
      </div>

      <div class="card stats">
        <h3>📊 Statistics</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Words:</span>
            <span class="stat-value highlight"
              >{totalItems.toLocaleString()}</span
            >
          </div>
          <div class="stat-item">
            <span class="stat-label"
              >Available Languages:</span
            >
            <span class="stat-value"
              >{availableLanguages.length}</span
            >
          </div>
          <div class="stat-item">
            <span class="stat-label"
              >Selected Languages:</span
            >
            <span class="stat-value language-flags">
              {#each selectedLanguages as lang}
                <span
                  class="flag-badge"
                  title={ALL_LANGUAGES.find(
                    (l) => l.code === lang
                  )?.name}
                >
                  {ALL_LANGUAGES.find(
                    (l) => l.code === lang
                  )?.flag || lang}
                </span>
              {/each}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Source Language:</span>
            <span class="stat-value source-highlight">
              {ALL_LANGUAGES.find(
                (l) => l.code === sourceLanguage
              )?.flag}
              {ALL_LANGUAGES.find(
                (l) => l.code === sourceLanguage
              )?.name}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Order:</span>
            <span class="stat-value">
              {#if isShuffled}
                <span class="shuffle-badge">🎲 Random</span>
              {:else}
                Default
              {/if}
            </span>
          </div>
        </div>
      </div>

      <div class="card shuffle-controls">
        <h3>🎮 Display Options</h3>
        <button
          class="shuffle-button {isShuffled
            ? 'active'
            : ''}"
          on:click={toggleShuffle}
          title="Shuffle/Randomize the order of words"
          disabled={totalItems === 0}
        >
          <span class="button-icon"
            >{isShuffled ? "✅" : "🔀"}</span
          >
          {isShuffled
            ? "Shuffled Mode Active"
            : "Shuffle Words"}
        </button>
        {#if isShuffled}
          <button
            class="reset-button"
            on:click={resetShuffle}
            title="Reset to default order"
          >
            ↩️ Reset to Default Order
          </button>
        {/if}
        <p class="shuffle-hint">
          {#if isShuffled}
            Words are displayed in random order for varied
            practice
          {:else}
            Enable shuffle to randomize word order for
            better memorization
          {/if}
        </p>
      </div>

      <div class="card tips">
        <h3>💡 Study Tips</h3>
        <ul>
          <li>✨ Click any word to copy it to clipboard</li>
          <li>🎯 Source language is highlighted in blue</li>
          <li>🔄 Use shuffle mode for varied practice</li>
          <li>
            🔍 Search works across all selected languages
          </li>
          <li>📱 Responsive design works on all devices</li>
        </ul>
      </div>
    </aside>

    <main class="main-content">
      <div class="controls">
        <div class="search-container">
          <input
            type="text"
            placeholder="🔍 Search in selected languages..."
            bind:value={searchQuery}
            on:input={() => {
              page = 1;
              isShuffled = false;
              loadWords();
            }}
            class="search-input"
          />
          {#if searchQuery}
            <button
              on:click={() => {
                searchQuery = "";
                loadWords();
              }}
              class="clear-search"
              title="Clear search"
            >
              ✕
            </button>
          {/if}
          <button
            on:click={() => (showTranslationConfig = true)}
            class="config-btn"
            title="Translation settings"
          >
            ⚙️ Settings
          </button>
        </div>

        <div class="control-group">
          <div class="page-size-selector">
            <label for="pageSize" class="visually-hidden"
              >Words per page</label
            >
            <select
              id="pageSize"
              bind:value={pageSize}
              on:change={handlePageSizeChange}
            >
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={200}>200 per page</option>
              <option value={500}>500 per page</option>
            </select>
          </div>

          <span class="results-count">
            Showing <strong>{filteredWords.length}</strong>
            of
            <strong>{totalItems.toLocaleString()}</strong> words
          </span>
        </div>
      </div>

      {#if loading && allWords.length === 0}
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading dictionary...</p>
          <span class="loading-hint"
            >This may take a moment</span
          >
        </div>
      {:else if filteredWords.length > 0}
        <div class="display-info">
          {#if isShuffled}
            <div class="shuffle-notice">
              <span class="notice-icon">🎲</span>
              <span class="notice-text"
                >Random order mode active</span
              >
              <button
                on:click={resetShuffle}
                class="notice-reset"
              >
                Reset Order
              </button>
            </div>
          {/if}
        </div>

        <div class="table-wrapper">
          <MultilingualTable
            data={filteredWords}
            {sourceLanguage}
            targetLanguages={selectedLanguages.filter(
              (l) => l !== sourceLanguage
            )}
            shuffle={isShuffled}
            bind:page
            bind:pageSize
          />
        </div>

        <div class="pagination">
          <button
            on:click={() => {
              page--;
              filterWords();
            }}
            disabled={page <= 1}
            class="pagination-btn"
          >
            ← Previous
          </button>

          <div class="page-info">
            <span class="current-page">Page {page}</span>
            <span class="total-pages">
              of {Math.ceil(totalItems / pageSize)}
            </span>
            <span class="page-size-info"
              >({pageSize} words)</span
            >
          </div>

          <button
            on:click={() => {
              page++;
              filterWords();
            }}
            disabled={page >=
              Math.ceil(totalItems / pageSize)}
            class="pagination-btn"
          >
            Next →
          </button>
        </div>
      {:else if searchQuery}
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No words found</h3>
          <p>
            No words match "<strong>{searchQuery}</strong>"
            in the selected languages
          </p>
          <div class="empty-actions">
            <button
              on:click={() => {
                searchQuery = "";
                loadWords();
              }}
              class="btn-primary"
            >
              Clear Search
            </button>
            <button
              on:click={() => {
                selectedLanguages = ["en"];
                sourceLanguage = "en";
                loadWords();
              }}
              class="btn-secondary"
            >
              Reset to English
            </button>
          </div>
        </div>
      {:else}
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No words available</h3>
          <p>
            Try selecting different languages or check back
            later
          </p>
          <button
            on:click={() => {
              selectedLanguages = ["en", "ar", "ru", "ch"];
              sourceLanguage = "en";
              loadWords();
            }}
            class="btn-primary"
          >
            Load Default Selection
          </button>
        </div>
      {/if}

      <TranslationConfig
        bind:showConfig={showTranslationConfig}
        on:close={() => (showTranslationConfig = false)}
        on:cachecleared={() => {
          console.log("Cache cleared");
          loadWords();
        }}
      />
    </main>
  </div>
</div>

<style>
  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 24px;
    min-height: 100vh;
    margin-top: 4rem;
  }

  header {
    margin-bottom: 40px;
    text-align: center;
  }

  h1 {
    font-size: 2.8rem;
    margin: 0 0 12px 0;
    color: #333;
    background: linear-gradient(135deg, #28a745, #007bff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
  }

  .subtitle {
    color: #666;
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .content {
    display: grid;
    grid-template-columns: 360px 1fr;
    gap: 32px;
    margin-top: 40px;
  }

  .sidebar {
    position: sticky;
    top: 24px;
    height: fit-content;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .card h3 {
    margin: 0 0 20px 0;
    font-size: 18px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
  }

  .stats-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .stat-item:last-child {
    border-bottom: none;
  }

  .stat-label {
    color: #666;
    font-size: 14px;
    font-weight: 500;
  }

  .stat-value {
    font-weight: 600;
    color: #333;
    text-align: right;
  }

  .stat-value.highlight {
    color: #28a745;
    font-size: 18px;
  }

  .source-highlight {
    color: #007bff;
    background: #e7f3ff;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .language-flags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .flag-badge {
    font-size: 18px;
    padding: 2px 4px;
    border-radius: 4px;
    transition: transform 0.2s;
  }

  .flag-badge:hover {
    transform: scale(1.1);
  }

  .shuffle-badge {
    background: #ffc107;
    color: #212529;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .shuffle-button {
    width: 100%;
    padding: 14px;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .shuffle-button:hover:not(:disabled) {
    background: #e0e0e0;
    border-color: #007bff;
    transform: translateY(-1px);
  }

  .shuffle-button.active {
    background: #007bff;
    border-color: #007bff;
    color: white;
  }

  .shuffle-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button-icon {
    font-size: 18px;
  }

  .reset-button {
    width: 100%;
    padding: 12px;
    background: white;
    border: 2px solid #dc3545;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #dc3545;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .reset-button:hover {
    background: #dc3545;
    color: white;
    transform: translateY(-1px);
  }

  .shuffle-hint {
    margin-top: 16px;
    margin-bottom: 0;
    font-size: 13px;
    color: #666;
    text-align: center;
    font-style: italic;
  }

  .tips ul {
    margin: 0;
    padding-left: 0;
    list-style: none;
  }

  .tips li {
    margin-bottom: 12px;
    color: #555;
    font-size: 14px;
    line-height: 1.6;
    padding-left: 24px;
    position: relative;
  }

  .tips li::before {
    content: "•";
    color: #28a745;
    font-weight: bold;
    position: absolute;
    left: 8px;
  }

  .main-content {
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    border: 1px solid #f0f0f0;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
  }

  .search-container {
    position: relative;
    display: flex;
    gap: 12px;
  }

  .search-input {
    flex: 1;
    padding: 14px 20px;
    padding-right: 50px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
  }

  .clear-search {
    position: absolute;
    right: 90px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 8px 12px;
    font-size: 18px;
    border-radius: 6px;
  }

  .clear-search:hover {
    color: #333;
    background: #f0f0f0;
  }

  .config-btn {
    padding: 14px 24px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .config-btn:hover {
    background: #545b62;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.2);
  }

  .control-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .page-size-selector select {
    padding: 12px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    background: white;
    font-size: 15px;
    min-width: 160px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .page-size-selector select:hover {
    border-color: #007bff;
  }

  .results-count {
    color: #666;
    font-size: 15px;
    background: #f8f9fa;
    padding: 12px 24px;
    border-radius: 10px;
  }

  .results-count strong {
    color: #333;
  }

  .display-info {
    margin-bottom: 20px;
  }

  .shuffle-notice {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    background: #fff3cd;
    border: 1px solid #ffe69c;
    border-radius: 30px;
    color: #856404;
    font-weight: 500;
  }

  .notice-icon {
    font-size: 18px;
  }

  .notice-reset {
    padding: 6px 16px;
    background: white;
    border: 1px solid #856404;
    border-radius: 20px;
    color: #856404;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .notice-reset:hover {
    background: #856404;
    color: white;
  }

  .table-wrapper {
    margin-bottom: 32px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }

  .loading-state {
    text-align: center;
    padding: 80px 20px;
    background: #f8f9fa;
    border-radius: 16px;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #28a745;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-hint {
    display: block;
    color: #666;
    font-size: 14px;
    margin-top: 12px;
  }

  .empty-state {
    text-align: center;
    padding: 80px 20px;
    background: #f8f9fa;
    border-radius: 16px;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .empty-state h3 {
    margin-bottom: 12px;
    color: #333;
    font-size: 24px;
  }

  .empty-state p {
    color: #666;
    margin-bottom: 24px;
    font-size: 16px;
  }

  .empty-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .btn-primary {
    padding: 12px 28px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
  }

  .btn-secondary {
    padding: 12px 28px;
    background: white;
    color: #007bff;
    border: 2px solid #007bff;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    background: #f0f7ff;
    transform: translateY(-1px);
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding-top: 32px;
    border-top: 2px solid #f0f0f0;
    margin-top: 16px;
  }

  .pagination-btn {
    padding: 12px 28px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #218838;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
  }

  .pagination-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .page-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #555;
    background: #f8f9fa;
    padding: 8px 20px;
    border-radius: 30px;
  }

  .current-page {
    font-weight: 700;
    color: #333;
  }

  .total-pages {
    color: #666;
  }

  .page-size-info {
    font-size: 13px;
    color: #888;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @media (max-width: 1024px) {
    .content {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: static;
    }

    h1 {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 16px;
      margin-top: 3rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }

    .main-content {
      padding: 20px;
    }

    .search-container {
      flex-direction: column;
    }

    .clear-search {
      right: 12px;
    }

    .control-group {
      flex-direction: column;
      align-items: stretch;
    }

    .results-count {
      text-align: center;
    }

    .pagination {
      flex-direction: column;
      gap: 16px;
    }

    .empty-actions {
      flex-direction: column;
    }
  }
</style>
