<script lang="ts">
  import { onMount } from "svelte";
  import LanguageSelector from "$lib/components/LanguageSelector.svelte";
  import MultilingualSentenceTable from "$lib/components/MultilingualSentenceTable.svelte";
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

  // Dataset selection
  type Dataset = "sentences" | "1000-sentences" | "asti";
  let dataset: Dataset = "sentences";

  // Dataset metadata
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

  // Data
  let allSentences: any[] = [];
  let filteredSentences: any[] = [];
  let loading = false;
  let page = 1;
  let pageSize = 200;
  let totalItems = 0;
  let searchQuery = "";

  // Statistics
  let sentenceCount = 0;
  let availableLanguages: LanguageCode[] = [];
  let showTranslationConfig = false;
  let currentDatasetInfo = DATASET_INFO.sentences;

  // Filter sentences based on selection
  function filterSentences() {
    let result = [...allSentences];

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter((sentence) =>
        selectedLanguages.some((lang) => {
          const text = sentence[lang];
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
    filteredSentences = result.slice(start, end);
  }

  async function loadSentences() {
    loading = true;
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        dataset,
        ...(searchQuery && { search: searchQuery })
      });

      const response = await fetch(
        `/api/sentences?${params}`
      );
      const result = await response.json();

      if (result.success) {
        allSentences = result.data;
        availableLanguages =
          result.meta?.availableLanguages || [];
        sentenceCount =
          result.meta?.total || allSentences.length;
        currentDatasetInfo =
          DATASET_INFO[dataset] || DATASET_INFO.sentences;

        filterSentences();
      }
    } catch (error) {
      console.error("Failed to load sentences:", error);
    } finally {
      loading = false;
    }
  }

  function handleLanguageChange(event: CustomEvent) {
    selectedLanguages = event.detail.selectedLanguages;
    sourceLanguage = event.detail.sourceLanguage;
    filterSentences();
  }

  function handleDatasetChange() {
    page = 1;
    loadSentences();
  }

  $: if (searchQuery || page || pageSize || dataset) {
    filterSentences();
  }

  onMount(() => {
    loadSentences();
  });
</script>

<svelte:head>
  <title>Multilingual Sentences</title>
  <meta
    name="description"
    content="Compare sentences across multiple languages with word-by-word breakdown"
  />
</svelte:head>

<div class="container">
  <header>
    <h1>Multilingual Sentences</h1>
    <p class="subtitle">
      Compare sentences across languages with word-by-word
      translation breakdown
    </p>
  </header>

  <div class="content">
    <aside class="sidebar">
      <div class="card dataset-card">
        <h3>📊 Dataset Selection</h3>
        <div class="dataset-selector">
          {#each Object.entries(DATASET_INFO) as [key, info]}
            <label
              class="dataset-option"
              class:selected={dataset === key}
            >
              <input
                type="radio"
                name="dataset"
                value={key}
                checked={dataset === key}
                on:change={() => {
                  dataset = key as Dataset;
                  handleDatasetChange();
                }}
              />
              <span class="dataset-label">
                <span class="dataset-icon">{info.icon}</span
                >
                <span class="dataset-details">
                  <span class="dataset-name"
                    >{info.name}</span
                  >
                  <span class="dataset-description"
                    >{info.description}</span
                  >
                </span>
              </span>
              {#if dataset === key}
                <span class="selected-badge"
                  >✓ Selected</span
                >
              {/if}
            </label>
          {/each}
        </div>
      </div>

      <div class="card">
        <LanguageSelector
          bind:selectedLanguages
          bind:sourceLanguage
          on:change={handleLanguageChange}
          maxSelection={6}
        />
      </div>

      <div class="card stats">
        <h3>📈 Statistics</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Dataset:</span>
            <span class="stat-value highlight">
              {currentDatasetInfo.icon}
              {currentDatasetInfo.name}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total Sentences:</span>
            <span class="stat-value"
              >{sentenceCount.toLocaleString()}</span
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
            <span class="stat-label"
              >Available Languages:</span
            >
            <span class="stat-value"
              >{availableLanguages.length}</span
            >
          </div>
        </div>
      </div>

      <div class="card tips">
        <h3>💡 Tips</h3>
        <ul>
          <li>
            ✨ Click any sentence to copy it to clipboard
          </li>
          <li>
            🔍 Click language flags for word-by-word
            breakdown
          </li>
          <li>🎯 Source language is highlighted in blue</li>
          <li>
            📱 Cards stack vertically on mobile for easy
            reading
          </li>
          <li>
            🔄 Use shuffle to randomize practice order
          </li>
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
              filterSentences();
            }}
            class="search-input"
          />
          {#if searchQuery}
            <button
              on:click={() => (searchQuery = "")}
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
              >Sentences per page</label
            >
            <select
              id="pageSize"
              bind:value={pageSize}
              on:change={() => (page = 1)}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
              <option value={200}>200 per page</option>
            </select>
          </div>

          <span class="results-count">
            Showing <strong
              >{filteredSentences.length}</strong
            >
            of
            <strong>{totalItems.toLocaleString()}</strong> sentences
          </span>
        </div>
      </div>

      {#if loading && filteredSentences.length === 0}
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading {currentDatasetInfo.name}...</p>
          <span class="loading-hint"
            >This may take a moment</span
          >
        </div>
      {:else if filteredSentences.length > 0}
        <div class="table-wrapper">
          <MultilingualSentenceTable
            data={filteredSentences}
            {sourceLanguage}
            targetLanguages={selectedLanguages.filter(
              (l) => l !== sourceLanguage
            )}
            showBreakdown={true}
          />
        </div>

        <div class="pagination">
          <button
            on:click={() => {
              page--;
              filterSentences();
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
              >({pageSize} per page)</span
            >
          </div>

          <button
            on:click={() => {
              page++;
              filterSentences();
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
          <h3>No sentences found</h3>
          <p>
            No sentences match "<strong
              >{searchQuery}</strong
            >" in the selected languages
          </p>
          <div class="empty-actions">
            <button
              on:click={() => (searchQuery = "")}
              class="btn-primary"
            >
              Clear Search
            </button>
            <button
              on:click={() => {
                selectedLanguages = ["en"];
                sourceLanguage = "en";
                filterSentences();
              }}
              class="btn-secondary"
            >
              Reset Languages
            </button>
          </div>
        </div>
      {:else}
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No sentences available</h3>
          <p>
            Try selecting a different dataset or adjusting
            your language selection
          </p>
          <button
            on:click={() => {
              dataset = "sentences";
              handleDatasetChange();
            }}
            class="btn-primary"
          >
            Load Basic Sentences
          </button>
        </div>
      {/if}

      <TranslationConfig
        bind:showConfig={showTranslationConfig}
        on:close={() => (showTranslationConfig = false)}
        on:cachecleared={() => {
          console.log("Cache cleared");
          loadSentences();
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
    background: linear-gradient(135deg, #007bff, #28a745);
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
    max-height: calc(
      100vh - 48px
    ); /* Viewport height minus top/bottom spacing */
    overflow-y: auto; /* Enable vertical scrolling */
    padding-right: 8px; /* Add some padding for the scrollbar */
    scrollbar-width: none;
  }

  /* Optional: Style the scrollbar for better appearance */
  .sidebar::-webkit-scrollbar {
    width: 6px;
  }

  .sidebar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .sidebar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  .sidebar::-webkit-scrollbar-thumb:hover {
    background: #555;
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

  .dataset-selector {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .dataset-option {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 16px;
    border-radius: 12px;
    border: 2px solid #e0e0e0;
    transition: all 0.2s;
    position: relative;
  }

  .dataset-option:hover {
    border-color: #007bff;
    background: #f8f9fa;
    transform: translateY(-1px);
  }

  .dataset-option.selected {
    border-color: #007bff;
    background: #f0f7ff;
  }

  .dataset-option input[type="radio"] {
    margin: 0;
    width: 18px;
    height: 18px;
    accent-color: #007bff;
  }

  .dataset-label {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .dataset-icon {
    font-size: 24px;
  }

  .dataset-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .dataset-name {
    font-weight: 600;
    color: #333;
    font-size: 16px;
  }

  .dataset-description {
    font-size: 13px;
    color: #666;
  }

  .selected-badge {
    background: #007bff;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
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
    color: #007bff;
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
    color: #007bff;
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

  .table-wrapper {
    margin-bottom: 32px;
    border-radius: 12px;
    overflow: hidden;
  }

  .loading-state {
    text-align: center;
    padding: 80px 20px;
    background: #f8f9fa;
    border-radius: 16px;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  .loading-hint {
    display: block;
    color: #666;
    font-size: 14px;
    margin-top: 12px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
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
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.2s;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
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
