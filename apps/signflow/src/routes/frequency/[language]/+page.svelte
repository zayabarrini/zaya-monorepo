<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import FrequencyTable from "$lib/components/FrequencyTable.svelte";

  interface FrequencyWord {
    id: number;
    rank: number;
    word: string;
    en: string;
    frequency: number;
    percentage: string;
  }

  interface Meta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    language: string;
    languageName: string;
    nativeName: string;
    minRank: number;
    maxRank: number;
    search: string;
  }

  interface LanguageInfo {
    en: string;
    native: string;
    flag: string;
    direction: string;
    fileName: string;
  }

  // Props from load function - match the actual structure returned
  export let data: {
    success: boolean;
    data: FrequencyWord[];
    meta: Meta;
    language: string;
    langInfo: LanguageInfo;
    initialPage: number;
    initialPageSize: number;
    initialSearch: string;
    initialMinRank: number;
    initialMaxRank: number;
  };

  // Initialize state from props with the correct structure
  let frequencyWords = data.data || [];
  let meta = data.meta || {};
  let langInfo = data.langInfo;
  let language = data.language;

  // UI State
  let loading = false;
  let error: string | null = null;

  // Filter state - use initial values from props
  let searchQuery = data.initialSearch || "";
  let minRank = data.initialMinRank || 1;
  let maxRank = data.initialMaxRank || 10000;
  let currentPage = data.initialPage || 1;
  let pageSize = data.initialPageSize || 100;

  // Search debounce
  let searchTimeout: ReturnType<typeof setTimeout>;

  // Derived values
  $: pageTitle = langInfo
    ? `${langInfo.en} Frequency List`
    : "Frequency List";
  $: pageDescription = langInfo
    ? `Top 10,000 most common ${langInfo.en} words with English translations`
    : "Word frequency list";

  // Update URL with current filters
  function updateUrl() {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      pageSize: pageSize.toString(),
      minRank: minRank.toString(),
      maxRank: maxRank.toString(),
      ...(searchQuery && { search: searchQuery })
    });

    goto(`/frequency/${language}?${params}`, {
      replaceState: true,
      keepFocus: true
    });
  }

  // Load data from API
  async function loadData(resetPage = false) {
    if (resetPage) {
      currentPage = 1;
    }

    loading = true;
    error = null;
    updateUrl();

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        minRank: minRank.toString(),
        maxRank: maxRank.toString(),
        ...(searchQuery && { search: searchQuery })
      });

      const response = await fetch(
        `/api/frequency/${language}?${params}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load data: ${response.statusText}`
        );
      }

      const result = await response.json();

      if (result.success) {
        frequencyWords = result.data || [];
        meta = result.meta || meta;
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (e) {
      error =
        e instanceof Error
          ? e.message
          : "Failed to load data";
      console.error("Error loading frequency data:", e);
    } finally {
      loading = false;
    }
  }

  // Event handlers
  function handleSearch(value: string) {
    searchQuery = value;
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => loadData(true), 500);
  }

  function handleRankChange(
    newMin: number,
    newMax: number
  ) {
    minRank = Math.max(1, Math.min(newMin, 10000));
    maxRank = Math.max(minRank, Math.min(newMax, 10000));
    loadData(true);
  }

  function handlePageChange(newPage: number) {
    currentPage = newPage;
    loadData();
  }

  function handlePageSizeChange(newSize: number) {
    pageSize = newSize;
    loadData(true);
  }

  async function copyAllWords() {
    const text = frequencyWords
      .slice(0, 100)
      .map(
        (word) => `${word.rank}. ${word.word} - ${word.en}`
      )
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Copied top 100 words to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function downloadCSV() {
    if (frequencyWords.length === 0) return;

    const headers = [
      "Rank",
      "Word",
      "English",
      "Frequency",
      "Percentage"
    ];
    const csvContent = [
      headers.join(","),
      ...frequencyWords.map((word) =>
        [
          word.rank,
          `"${word.word.replace(/"/g, '""')}"`,
          `"${word.en.replace(/"/g, '""')}"`,
          word.frequency,
          word.percentage
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${language}-frequency-list.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  onMount(() => {
    // If no data from SSR, load it
    if (frequencyWords.length === 0 && !loading && !error) {
      loadData();
    }

    return () => {
      clearTimeout(searchTimeout);
    };
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
</svelte:head>

<div class="frequency-page">
  {#if !langInfo}
    <div class="error-container">
      <h1>Language Not Found</h1>
      <p>
        The frequency list for "{language}" is not
        available.
      </p>
      <a href="/frequency" class="back-link"
        >← Back to All Languages</a
      >
    </div>
  {:else}
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <a href="/frequency" class="back-link"
          >← All Languages</a
        >

        <div class="language-header">
          <div class="title-section">
            <h1>
              <span class="flag">{langInfo.flag}</span>
              {langInfo.en} Frequency List
            </h1>
            <p class="native-name">{langInfo.native}</p>
            <p class="description">
              Top 10,000 most common words with English
              translations. Mastering these gives you ~80%
              understanding of {langInfo.en} text.
            </p>
          </div>

          <div class="header-actions">
            <button
              on:click={copyAllWords}
              class="action-btn"
            >
              📋 Copy Top 100
            </button>
            <button
              on:click={downloadCSV}
              class="action-btn"
            >
              📥 Download CSV
            </button>
          </div>
        </div>

        <div class="stats">
          <div class="stat">
            <span class="stat-value"
              >{(
                meta.total || 10000
              ).toLocaleString()}</span
            >
            <span class="stat-label">Total Words</span>
          </div>
          <div class="stat">
            <span class="stat-value">80%</span>
            <span class="stat-label">Coverage</span>
          </div>
          <div class="stat">
            <span class="stat-value">1-1000</span>
            <span class="stat-label">Core</span>
          </div>
          <div class="stat">
            <span class="stat-value">1000+</span>
            <span class="stat-label">Advanced</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Filters -->
      <div class="filters-card">
        <div class="search-box">
          <input
            type="text"
            placeholder="🔍 Search words or translations..."
            value={searchQuery}
            on:input={(e) =>
              handleSearch(e.currentTarget.value)}
            class="search-input"
          />
          {#if searchQuery}
            <button
              on:click={() => handleSearch("")}
              class="clear-search"
            >
              ✕
            </button>
          {/if}
        </div>

        <div class="rank-filter">
          <label>Rank Range:</label>
          <div class="rank-inputs">
            <input
              type="number"
              min="1"
              max="10000"
              value={minRank}
              on:change={(e) =>
                handleRankChange(
                  parseInt(e.currentTarget.value) || 1,
                  maxRank
                )}
              class="rank-input"
            />
            <span>to</span>
            <input
              type="number"
              min="1"
              max="10000"
              value={maxRank}
              on:change={(e) =>
                handleRankChange(
                  minRank,
                  parseInt(e.currentTarget.value) || 10000
                )}
              class="rank-input"
            />
          </div>
        </div>

        <div class="page-size">
          <label>Per Page:</label>
          <select
            value={pageSize}
            on:change={(e) =>
              handlePageSizeChange(
                parseInt(e.currentTarget.value)
              )}
            class="page-select"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
        </div>
      </div>

      <!-- Content -->
      {#if loading && frequencyWords.length === 0}
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading frequency data...</p>
        </div>
      {:else if error}
        <div class="error-state">
          <h3>Error Loading Data</h3>
          <p>{error}</p>
          <button
            on:click={() => loadData()}
            class="retry-btn"
          >
            Try Again
          </button>
        </div>
      {:else if frequencyWords.length === 0}
        <div class="empty-state">
          <h3>No Words Found</h3>
          <p>Try adjusting your search or rank filters.</p>
          <button
            on:click={() => {
              searchQuery = "";
              minRank = 1;
              maxRank = 10000;
              loadData(true);
            }}
            class="clear-btn"
          >
            Clear Filters
          </button>
        </div>
      {:else}
        <!-- Table -->
        <div class="table-wrapper">
          <FrequencyTable
            words={frequencyWords}
            {language}
            languageName={langInfo.en}
            nativeName={langInfo.native}
            showFilters={false}
          />
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button
            on:click={() =>
              handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            class="pagination-btn"
          >
            ← Previous
          </button>

          <div class="page-info">
            <span class="current">Page {currentPage}</span>
            <span class="total"
              >of {meta.totalPages || 1}</span
            >
            <span class="size">({pageSize} words)</span>
          </div>

          <button
            on:click={() =>
              handlePageChange(currentPage + 1)}
            disabled={currentPage >= (meta.totalPages || 1)}
            class="pagination-btn"
          >
            Next →
          </button>
        </div>

        <!-- Results Info -->
        <div class="results-info">
          Showing {frequencyWords.length} of {(
            meta.total || 0
          ).toLocaleString()} words
          {#if searchQuery}
            matching "<strong>{searchQuery}</strong>"
          {/if}
          {#if minRank > 1 || maxRank < 10000}
            (rank {minRank}-{maxRank})
          {/if}
        </div>
      {/if}

      <!-- Learning Tips -->
      <div class="tips-section">
        <h2>💡 Learning Tips for {langInfo.en}</h2>
        <div class="tips-grid">
          <div class="tip">
            <h3>Start Small</h3>
            <p>
              Begin with the top 100 words (rank 1-100).
              These cover ~50% of daily text.
            </p>
          </div>
          <div class="tip">
            <h3>Use Spaced Repetition</h3>
            <p>
              Review words at increasing intervals for
              better long-term retention.
            </p>
          </div>
          <div class="tip">
            <h3>Learn in Context</h3>
            <p>
              Try to find example sentences using the words
              you're learning.
            </p>
          </div>
          <div class="tip">
            <h3>Practice Active Recall</h3>
            <p>
              Cover the translation and try to remember the
              meaning before checking.
            </p>
          </div>
        </div>
      </div>
    </main>
  {/if}
</div>

<style>
  .frequency-page {
    min-height: 100vh;
    background: #f8fafc;
  }

  .page-header {
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    color: white;
    padding: 3rem 0;
    margin-bottom: 2rem;
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .back-link {
    display: inline-block;
    color: white;
    text-decoration: none;
    opacity: 0.9;
    margin-bottom: 2rem;
    font-size: 1rem;
    transition: opacity 0.2s;
  }

  .back-link:hover {
    opacity: 1;
  }

  .language-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .title-section h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .flag {
    font-size: 2.5rem;
  }

  .native-name {
    font-size: 1.5rem;
    opacity: 0.9;
    margin: 0 0 1rem 0;
  }

  .description {
    max-width: 600px;
    opacity: 0.9;
    line-height: 1.6;
    margin: 0;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .action-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  .stats {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 4rem;
  }

  .filters-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: flex-end;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 250px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .clear-search {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #a0aec0;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    border-radius: 0.25rem;
  }

  .clear-search:hover {
    color: #4a5568;
    background: #f7fafc;
  }

  .rank-filter {
    min-width: 200px;
  }

  .rank-filter label,
  .page-size label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  .rank-inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rank-input {
    width: 80px;
    padding: 0.5rem 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .rank-input:focus {
    outline: none;
    border-color: #667eea;
  }

  .page-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: white;
    cursor: pointer;
  }

  .table-wrapper {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .retry-btn,
  .clear-btn {
    margin-top: 1rem;
    padding: 0.75rem 2rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 600;
    transition: all 0.2s;
  }

  .retry-btn:hover,
  .clear-btn:hover {
    background: #5a67d8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .pagination-btn {
    padding: 0.5rem 1.5rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #5a67d8;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(102, 126, 234, 0.2);
  }

  .pagination-btn:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }

  .page-info {
    display: flex;
    gap: 0.5rem;
    color: #4a5568;
    font-size: 0.95rem;
  }

  .current {
    font-weight: 600;
  }

  .total {
    color: #718096;
  }

  .size {
    color: #a0aec0;
  }

  .results-info {
    text-align: center;
    color: #718096;
    font-size: 0.9rem;
    margin-bottom: 3rem;
    padding: 0.75rem;
    background: #f7fafc;
    border-radius: 0.5rem;
  }

  .tips-section {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .tips-section h2 {
    margin: 0 0 1.5rem 0;
    color: #2d3748;
    text-align: center;
    font-size: 1.5rem;
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(240px, 1fr)
    );
    gap: 1.5rem;
  }

  .tip {
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 0.75rem;
    transition: all 0.2s;
  }

  .tip:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .tip h3 {
    margin: 0 0 0.5rem 0;
    color: #2d3748;
    font-size: 1.1rem;
  }

  .tip p {
    margin: 0;
    color: #718096;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .language-header {
      flex-direction: column;
    }

    .header-actions {
      width: 100%;
      justify-content: center;
    }

    .stats {
      justify-content: center;
    }

    .filters-card {
      flex-direction: column;
      align-items: stretch;
    }

    .pagination {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .error-container {
    text-align: center;
    padding: 4rem 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .error-container h1 {
    font-size: 2rem;
    color: #2d3748;
    margin-bottom: 1rem;
  }

  .error-container p {
    color: #718096;
    margin-bottom: 2rem;
  }
</style>
