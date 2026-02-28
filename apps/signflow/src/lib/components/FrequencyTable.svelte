<!-- src/lib/components/FrequencyTable.svelte -->
<script context="module" lang="ts">
  export interface FrequencyWord {
    id: number;
    rank: number;
    word: string;
    en: string;
    frequency: number;
    percentage: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { getLanguage, isRTL } from "$lib/languages";

  export let words: FrequencyWord[] = [];
  export let language: string = "";
  export let languageName: string = "";
  export let nativeName: string = "";
  export let showFilters: boolean = true;

  // State
  let filteredWords: FrequencyWord[] = [];
  let searchQuery = "";
  let minRank = 1;
  let maxRank = 10000;
  let sortBy: "rank" | "word" | "en" | "frequency" = "rank";
  let sortDirection: "asc" | "desc" = "asc";
  let page = 1;
  let pageSize = 200;
  let copyFeedback = "";
  let copyTimeout: ReturnType<typeof setTimeout> | null =
    null;

  // Language info
  $: langInfo = getLanguage(language);
  $: isTargetRTL = isRTL(language);

  // Initialize
  $: {
    filteredWords = filterAndSortWords();
  }

  // Filter and sort words
  function filterAndSortWords(): FrequencyWord[] {
    let result = [...words];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (word) =>
          word.word.toLowerCase().includes(query) ||
          word.en.toLowerCase().includes(query)
      );
    }

    // Apply rank filter
    result = result.filter(
      (word) => word.rank >= minRank && word.rank <= maxRank
    );

    // Apply sorting
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

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return result;
  }

  // Sort functions
  function sortByColumn(column: typeof sortBy) {
    if (sortBy === column) {
      sortDirection =
        sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortBy = column;
      sortDirection = "asc";
    }
  }

  // Copy to clipboard
  async function copyToClipboard(text: string) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      showCopyFeedback("Failed to copy");
    }
  }

  function showCopyFeedback(message: string) {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }

    copyFeedback = message;
    copyTimeout = setTimeout(() => {
      copyFeedback = "";
      copyTimeout = null;
    }, 1500);
  }

  // Format frequency number
  function formatFrequency(freq: number): string {
    if (freq >= 1000000) {
      return (freq / 1000000).toFixed(1) + "M";
    } else if (freq >= 1000) {
      return (freq / 1000).toFixed(1) + "K";
    }
    return freq.toString();
  }

  // Get paginated words
  $: paginatedWords = filteredWords.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  $: totalPages = Math.ceil(
    filteredWords.length / pageSize
  );

  // Reset page when filters change
  $: if (
    searchQuery ||
    minRank !== 1 ||
    maxRank !== 10000
  ) {
    page = 1;
  }

  // Cleanup
  onMount(() => {
    return () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };
  });
</script>

<div class="frequency-table-container">
  {#if showFilters}
    <div class="table-filters">
      <div class="filter-group">
        <input
          type="text"
          placeholder="Search words or translations..."
          bind:value={searchQuery}
          class="search-input"
          aria-label="Search frequency words"
        />

        <div class="rank-filter">
          <label>Rank Range:</label>
          <input
            type="number"
            bind:value={minRank}
            min="1"
            max="10000"
            class="rank-input"
            aria-label="Minimum rank"
          />
          <span>to</span>
          <input
            type="number"
            bind:value={maxRank}
            min="1"
            max="10000"
            class="rank-input"
            aria-label="Maximum rank"
          />
        </div>
      </div>

      <div class="stats-badge">
        Showing {filteredWords.length.toLocaleString()} of {words.length.toLocaleString()}
        words
      </div>
    </div>
  {/if}

  <div class="table-wrapper">
    <table class="frequency-table">
      <thead>
        <tr>
          <th
            class="sortable"
            class:active={sortBy === "rank"}
            on:click={() => sortByColumn("rank")}
            aria-sort={sortBy === "rank"
              ? sortDirection
              : "none"}
          >
            Rank
            {#if sortBy === "rank"}
              <span class="sort-icon"
                >{sortDirection === "asc" ? "↑" : "↓"}</span
              >
            {/if}
          </th>

          <th
            class="sortable"
            class:active={sortBy === "word"}
            on:click={() => sortByColumn("word")}
            aria-sort={sortBy === "word"
              ? sortDirection
              : "none"}
          >
            {languageName} Word
            {#if sortBy === "word"}
              <span class="sort-icon"
                >{sortDirection === "asc" ? "↑" : "↓"}</span
              >
            {/if}
          </th>

          <th
            class="sortable"
            class:active={sortBy === "en"}
            on:click={() => sortByColumn("en")}
            aria-sort={sortBy === "en"
              ? sortDirection
              : "none"}
          >
            English Translation
            {#if sortBy === "en"}
              <span class="sort-icon"
                >{sortDirection === "asc" ? "↑" : "↓"}</span
              >
            {/if}
          </th>

          <!-- <th
            class="sortable"
            class:active={sortBy === "frequency"}
            on:click={() => sortByColumn("frequency")}
            aria-sort={sortBy === "frequency"
              ? sortDirection
              : "none"}
          >
            Frequency
            {#if sortBy === "frequency"}
              <span class="sort-icon"
                >{sortDirection === "asc" ? "↑" : "↓"}</span
              >
            {/if}
          </th>

          <th class="percentage-col">Percentage</th>
          <th class="actions-col">Actions</th> -->
        </tr>
      </thead>

      <tbody>
        {#each paginatedWords as word (word.id)}
          <tr class="frequency-row">
            <td class="rank-cell">
              <span class="rank-badge">{word.rank}</span>
            </td>

            <td class="word-cell" class:rtl={isTargetRTL}>
              <div
                class="word-content"
                on:click={() => copyToClipboard(word.word)}
                role="button"
                tabindex="0"
                on:keydown={(e) =>
                  e.key === "Enter" &&
                  copyToClipboard(word.word)}
              >
                <span class="word-text">{word.word}</span>
                <!-- {#if langInfo}
                  <span class="word-lang"
                    >{langInfo.flag}</span
                  >
                {/if} -->
              </div>
            </td>

            <td class="translation-cell">
              <div
                class="translation-content"
                on:click={() => copyToClipboard(word.en)}
                role="button"
                tabindex="0"
                on:keydown={(e) =>
                  e.key === "Enter" &&
                  copyToClipboard(word.en)}
              >
                <span class="translation-text"
                  >{word.en}</span
                >
                <!-- <span class="translation-lang">🇺🇸</span> -->
              </div>
            </td>

            <!-- <td class="frequency-cell">
              <div class="frequency-display">
                <span class="frequency-value"
                  >{formatFrequency(word.frequency)}</span
                >
                <div
                  class="frequency-bar"
                  style="width: {Math.min(
                    100,
                    Math.log10(word.frequency) * 20
                  )}%"
                  aria-label={`Frequency: ${word.frequency}`}
                ></div>
              </div>
            </td> -->

            <!-- <td class="percentage-cell">
              <span class="percentage-value"
                >{word.percentage}</span
              >
            </td> -->

            <!-- <td class="actions-cell">
              <div class="action-buttons">
                <button
                  class="action-btn copy-btn"
                  on:click={() =>
                    copyToClipboard(word.word)}
                  title="Copy word"
                  aria-label="Copy word"
                >
                  📋
                </button>
                <button
                  class="action-btn translate-btn"
                  on:click={() => copyToClipboard(word.en)}
                  title="Copy translation"
                  aria-label="Copy translation"
                >
                  🇺
                </button>
                <button
                  class="action-btn both-btn"
                  on:click={() =>
                    copyToClipboard(
                      `${word.word} - ${word.en}`
                    )}
                  title="Copy both word and translation"
                  aria-label="Copy both"
                >
                  📝
                </button>
              </div>
            </td> -->
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  {#if totalPages > 1}
    <div class="pagination">
      <button
        class="pagination-btn"
        on:click={() => (page = Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div class="page-info">
        <span>Page {page} of {totalPages}</span>
        <select
          bind:value={pageSize}
          class="page-size-select"
        >
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
          <option value={200}>200 per page</option>
          <option value={500}>500 per page</option>
        </select>
      </div>

      <button
        class="pagination-btn"
        on:click={() =>
          (page = Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  {/if}
</div>

<!-- Copy feedback toast -->
{#if copyFeedback}
  <div class="copy-feedback" role="alert">
    {copyFeedback}
  </div>
{/if}

<style>
  .frequency-table-container {
    border-radius: 12px;
    box-shadow: 0 4px 8px black;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .table-filters {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    color: black;
    background: radial-gradient(
      700px at 20% 30%,
      color-mix(in srgb, #440625 30%, transparent),
      transparent 60%
    );
    justify-content: space-between;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-width: 300px;
  }

  .search-input {
    padding: 12px 16px;
    border: none;
    color: black;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    transition: background 0.2s;
  }

  .search-input:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }

  .rank-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
  }

  .rank-filter label {
    font-weight: 500;
  }

  .rank-input {
    width: 80px;
    color: black;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.9);
  }

  .stats-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 500;
    white-space: nowrap;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .frequency-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
  }

  th {
    padding: 16px 12px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
  }

  .sortable {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s;
  }

  .sortable:hover {
    background: #e9ecef;
  }

  .sortable.active {
    background: #e7f3ff;
    color: #007bff;
  }

  .sort-icon {
    margin-left: 8px;
    font-size: 12px;
  }

  .percentage-col,
  .actions-col {
    text-align: center;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
  }

  .frequency-row:hover td {
    background: #f8f9fa;
  }

  .rank-cell {
    text-align: center;
    width: 80px;
  }

  .rank-badge {
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
  }

  .word-cell,
  .word-content {
    text-align: right;
  }

  .word-cell,
  .translation-cell {
    min-width: 200px;
    max-width: 300px;
  }

  .word-content,
  .translation-content {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .word-content:hover,
  .translation-content:hover {
    background: #f0f8ff;
  }

  .word-content.rtl {
    direction: rtl;
    text-align: left;
  }

  .word-text,
  .translation-text {
    flex: 1;
    word-break: break-word;
    font-weight: 500;
  }

  .word-text {
    font-size: 4rem;
  }

  .word-lang,
  .translation-lang {
    font-size: 20px;
    flex-shrink: 0;
  }

  .frequency-cell {
    width: 150px;
  }

  .frequency-display {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .frequency-value {
    min-width: 60px;
    font-weight: 500;
    color: #28a745;
  }

  .frequency-bar {
    height: 8px;
    background: linear-gradient(90deg, #28a745, #20c997);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .percentage-cell {
    text-align: center;
    width: 100px;
  }

  .percentage-value {
    background: #ffc107;
    color: #212529;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 500;
  }

  .actions-cell {
    width: 140px;
  }

  .action-buttons {
    display: flex;
    gap: 6px;
    justify-content: center;
  }

  .action-btn {
    padding: 8px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
    background: none;
  }

  .copy-btn:hover {
    background: #007bff;
    color: white;
  }

  .translate-btn:hover {
    background: #dc3545;
    color: white;
  }

  .both-btn:hover {
    background: #28a745;
    color: white;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #e0e0e0;
    background: #f8f9fa;
  }

  .pagination-btn {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
  }

  .pagination-btn:hover:not(:disabled) {
    background: #0056b3;
  }

  .pagination-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .page-info {
    display: flex;
    align-items: center;
    gap: 16px;
    color: #495057;
  }

  .page-size-select {
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background: white;
  }

  .copy-feedback {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #28a745;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    animation: fadeInOut 1.5s ease-in-out;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
    10%,
    90% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .table-filters {
      flex-direction: column;
      align-items: stretch;
    }

    .filter-group {
      min-width: auto;
    }

    .rank-filter {
      flex-wrap: wrap;
    }

    .pagination {
      flex-direction: column;
      gap: 12px;
    }

    .page-info {
      flex-direction: column;
      gap: 8px;
    }

    .action-buttons {
      flex-direction: column;
    }
  }
</style>
