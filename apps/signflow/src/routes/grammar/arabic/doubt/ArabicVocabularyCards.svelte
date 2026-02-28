<!-- VocabularyCard.svelte -->
<script>
  import { onMount } from "svelte";

  // Props
  export let vocabularyData = [];
  export let title = "Arabic Vocabulary";
  export let showCategories = true;
  export let initialCategory = "all";
  export let itemsPerPage = 20;

  // State
  let selectedCategory = initialCategory;
  let searchTerm = "";
  let currentPage = 1;
  let selectedWord = null;
  let darkMode = false;
  let viewMode = "grid"; // 'grid' or 'list'
  let expandedCategories = new Set();

  // Categories derived from data
  let categories = [];
  let filteredWords = [];
  let paginatedWords = [];
  let totalPages = 1;

  // Process data on mount and when dependencies change
  $: {
    // Extract unique categories
    if (vocabularyData.length) {
      categories = [
        "all",
        ...new Set(
          vocabularyData.map((item) => item.category)
        )
      ];
    }

    // Filter words based on category and search
    filteredWords = vocabularyData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory;
      const matchesSearch =
        searchTerm === "" ||
        item.ar.includes(searchTerm) ||
        item.en
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.category &&
          item.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Pagination
    totalPages = Math.ceil(
      filteredWords.length / itemsPerPage
    );
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    paginatedWords = filteredWords.slice(start, end);
  }

  // Toggle category expansion
  function toggleCategory(category) {
    if (expandedCategories.has(category)) {
      expandedCategories.delete(category);
    } else {
      expandedCategories.add(category);
    }
    expandedCategories = new Set(expandedCategories); // Trigger reactivity
  }

  // Group words by category for categorized view
  $: groupedByCategory = vocabularyData.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Filtered categories with search
  $: filteredCategories = Object.entries(groupedByCategory)
    .filter(([category, words]) => {
      if (searchTerm === "") return true;
      return (
        category
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        words.some(
          (w) =>
            w.ar.includes(searchTerm) ||
            w.en
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      );
    })
    .map(([category, words]) => ({
      category,
      words: words.filter(
        (w) =>
          searchTerm === "" ||
          w.ar.includes(searchTerm) ||
          w.en
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    }));

  // Reset page when filters change
  $: {
    currentPage = 1;
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      selectedWord = null;
    }
    if (e.ctrlKey && e.key === "f") {
      e.preventDefault();
      document.getElementById("search-input").focus();
    }
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      darkMode = !darkMode;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  });
</script>

<svelte:head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600&display=swap");
  </style>
</svelte:head>

<div
  class="vocabulary-container"
  class:dark-mode={darkMode}
>
  <!-- Header -->
  <header class="header">
    <h1>{title}</h1>
    <div class="header-controls">
      <button
        class="theme-toggle"
        on:click={() => (darkMode = !darkMode)}
        title="Toggle dark mode (Ctrl+D)"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
      <div class="stats">
        <span class="stat-item">
          <span class="stat-label">Total:</span>
          <span class="stat-value"
            >{vocabularyData.length}</span
          >
        </span>
        <span class="stat-item">
          <span class="stat-label">Categories:</span>
          <span class="stat-value"
            >{categories.length - 1}</span
          >
        </span>
        <span class="stat-item">
          <span class="stat-label">Showing:</span>
          <span class="stat-value"
            >{filteredWords.length}</span
          >
        </span>
      </div>
    </div>
  </header>

  <!-- Controls -->
  <div class="controls">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        id="search-input"
        type="text"
        placeholder="Search words or categories... (Ctrl+F)"
        bind:value={searchTerm}
      />
      {#if searchTerm}
        <button
          class="clear-search"
          on:click={() => (searchTerm = "")}>✕</button
        >
      {/if}
    </div>

    <div class="view-controls">
      <div class="view-toggle">
        <button
          class="view-btn"
          class:active={viewMode === "grid"}
          on:click={() => (viewMode = "grid")}
          title="Grid view">📱 Grid</button
        >
        <button
          class="view-btn"
          class:active={viewMode === "list"}
          on:click={() => (viewMode = "list")}
          title="List view">📋 List</button
        >
        {#if showCategories}
          <button
            class="view-btn"
            class:active={viewMode === "categories"}
            on:click={() => (viewMode = "categories")}
            title="Categories view">📂 Categories</button
          >
        {/if}
      </div>

      <select
        bind:value={selectedCategory}
        class="category-select"
      >
        {#each categories as category}
          <option value={category}>
            {category === "all"
              ? "📚 All Categories"
              : category}
          </option>
        {/each}
      </select>

      <select
        bind:value={itemsPerPage}
        class="per-page-select"
      >
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
      </select>
    </div>
  </div>

  <!-- Main Content -->
  <main class="main-content">
    {#if filteredWords.length === 0}
      <div class="no-results">
        <span class="no-results-icon">🔍</span>
        <h3>No words found</h3>
        <p>Try adjusting your search or category filter</p>
        <button
          class="reset-btn"
          on:click={() => {
            searchTerm = "";
            selectedCategory = "all";
          }}>Reset Filters</button
        >
      </div>
    {:else if viewMode === "grid"}
      <!-- Grid View -->
      <div class="grid-view">
        {#each paginatedWords as word (word.ar + word.en)}
          <div
            class="word-card"
            class:selected={selectedWord === word}
            on:click={() =>
              (selectedWord =
                selectedWord === word ? null : word)}
            on:keydown={(e) =>
              e.key === "Enter" &&
              (selectedWord =
                selectedWord === word ? null : word)}
            tabindex="0"
            role="button"
            aria-label={`Word: ${word.ar}, meaning: ${word.en}`}
          >
            <div class="card-arabic">{word.ar}</div>
            <div class="card-english">{word.en}</div>
            {#if word.category && word.category !== selectedCategory}
              <div class="card-category">
                {word.category}
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Pagination -->
      {#if totalPages > 1}
        <div class="pagination">
          <button
            class="page-btn"
            on:click={() => (currentPage = 1)}
            disabled={currentPage === 1}>⏮️ First</button
          >
          <button
            class="page-btn"
            on:click={() =>
              (currentPage = Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}>◀️ Prev</button
          >

          <div class="page-numbers">
            {#each { length: Math.min(5, totalPages) } as _, i}
              {#if totalPages <= 5}
                <button
                  class="page-number"
                  class:active={currentPage === i + 1}
                  on:click={() => (currentPage = i + 1)}
                  >{i + 1}</button
                >
              {:else}
                <!-- Complex pagination for many pages -->
                {#if i === 0}
                  <button
                    class="page-number"
                    class:active={currentPage === 1}
                    on:click={() => (currentPage = 1)}
                    >1</button
                  >
                {:else if i === 1 && currentPage > 3}
                  <span class="page-ellipsis">...</span>
                {:else if i === 2}
                  {#if currentPage > 3 && currentPage < totalPages - 2}
                    <button
                      class="page-number active"
                      disabled>{currentPage}</button
                    >
                  {:else if currentPage <= 3}
                    <button
                      class="page-number"
                      class:active={currentPage === 2}
                      on:click={() => (currentPage = 2)}
                      >2</button
                    >
                  {:else if currentPage >= totalPages - 2}
                    <button
                      class="page-number"
                      class:active={currentPage ===
                        totalPages - 2}
                      on:click={() =>
                        (currentPage = totalPages - 2)}
                      >{totalPages - 2}</button
                    >
                  {/if}
                {:else if i === 3 && currentPage < totalPages - 2}
                  <span class="page-ellipsis">...</span>
                {:else if i === 4}
                  <button
                    class="page-number"
                    class:active={currentPage ===
                      totalPages}
                    on:click={() =>
                      (currentPage = totalPages)}
                    >{totalPages}</button
                  >
                {/if}
              {/if}
            {/each}
          </div>

          <button
            class="page-btn"
            on:click={() =>
              (currentPage = Math.min(
                totalPages,
                currentPage + 1
              ))}
            disabled={currentPage === totalPages}
            >Next ▶️</button
          >
          <button
            class="page-btn"
            on:click={() => (currentPage = totalPages)}
            disabled={currentPage === totalPages}
            >Last ⏭️</button
          >
        </div>
      {/if}
    {:else if viewMode === "list"}
      <!-- List View -->
      <div class="list-view">
        <table class="word-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Arabic</th>
              <th>English</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {#each paginatedWords as word, index (word.ar + word.en)}
              <tr
                class:selected={selectedWord === word}
                on:click={() =>
                  (selectedWord =
                    selectedWord === word ? null : word)}
              >
                <td class="index-cell"
                  >{(currentPage - 1) * itemsPerPage +
                    index +
                    1}</td
                >
                <td class="arabic-cell">{word.ar}</td>
                <td class="english-cell">{word.en}</td>
                <td class="category-cell"
                  >{word.category}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else if viewMode === "categories"}
      <!-- Categories View -->
      <div class="categories-view">
        {#each filteredCategories as { category, words }}
          <div class="category-section">
            <div
              class="category-header"
              on:click={() => toggleCategory(category)}
              on:keydown={(e) =>
                e.key === "Enter" &&
                toggleCategory(category)}
              tabindex="0"
              role="button"
              aria-expanded={expandedCategories.has(
                category
              )}
            >
              <span class="category-icon"
                >{expandedCategories.has(category)
                  ? "📂"
                  : "📁"}</span
              >
              <h2 class="category-title">{category}</h2>
              <span class="category-count"
                >({words.length})</span
              >
              <span class="category-toggle"
                >{expandedCategories.has(category)
                  ? "▼"
                  : "▶"}</span
              >
            </div>

            {#if expandedCategories.has(category)}
              <div class="category-words">
                {#each words as word (word.ar + word.en)}
                  <div class="category-word-card">
                    <div class="category-word-arabic">
                      {word.ar}
                    </div>
                    <div class="category-word-english">
                      {word.en}
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </main>

  <!-- Word Detail Modal -->
  {#if selectedWord}
    <div
      class="modal-overlay"
      on:click={() => (selectedWord = null)}
    >
      <div class="modal-content" on:click|stopPropagation>
        <button
          class="modal-close"
          on:click={() => (selectedWord = null)}>✕</button
        >

        <div class="modal-header">
          <h2>Word Details</h2>
        </div>

        <div class="modal-body">
          <div class="detail-row">
            <span class="detail-label">Arabic:</span>
            <span class="detail-value arabic"
              >{selectedWord.ar}</span
            >
          </div>

          <div class="detail-row">
            <span class="detail-label">English:</span>
            <span class="detail-value"
              >{selectedWord.en}</span
            >
          </div>

          <div class="detail-row">
            <span class="detail-label">Category:</span>
            <span class="detail-value category-tag"
              >{selectedWord.category}</span
            >
          </div>

          <div class="detail-actions">
            <button
              class="action-btn"
              on:click={() => {
                navigator.clipboard.writeText(
                  selectedWord.ar
                );
                alert("Copied to clipboard!");
              }}
            >
              📋 Copy Arabic
            </button>
            <button
              class="action-btn"
              on:click={() => {
                navigator.clipboard.writeText(
                  selectedWord.en
                );
                alert("Copied to clipboard!");
              }}
            >
              📋 Copy English
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .vocabulary-container {
    font-family: "Inter", sans-serif;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    background: #ffffff;
    color: #1a1a1a;
    min-height: 100vh;
    transition: all 0.3s ease;
  }

  .vocabulary-container.dark-mode {
    background: #1a1a1a;
    color: #f0f0f0;
  }

  /* Header Styles */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header h1 {
    font-size: 2rem;
    margin: 0;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .header-controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .theme-toggle:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .dark-mode .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .stats {
    display: flex;
    gap: 1rem;
    background: #f5f5f5;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
  }

  .dark-mode .stats {
    background: #2d2d2d;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .stat-label {
    color: #666;
  }

  .dark-mode .stat-label {
    color: #aaa;
  }

  .stat-value {
    font-weight: 600;
    color: #667eea;
  }

  /* Controls */
  .controls {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    position: relative;
    width: 100%;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }

  .search-box input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    font-size: 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 2rem;
    outline: none;
    transition: border-color 0.2s;
    background: #ffffff;
    color: #1a1a1a;
  }

  .dark-mode .search-box input {
    background: #2d2d2d;
    border-color: #444;
    color: #f0f0f0;
  }

  .search-box input:focus {
    border-color: #667eea;
  }

  .clear-search {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 1rem;
  }

  .view-controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .view-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .view-btn {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    background: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    color: inherit;
  }

  .view-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  .dark-mode .view-btn {
    border-color: #444;
  }

  .dark-mode .view-btn.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  .category-select,
  .per-page-select {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.5rem;
    background: #ffffff;
    font-size: 0.9rem;
    cursor: pointer;
    color: #1a1a1a;
  }

  .dark-mode .category-select,
  .dark-mode .per-page-select {
    background: #2d2d2d;
    border-color: #444;
    color: #f0f0f0;
  }

  /* Grid View */
  .grid-view {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .word-card {
    background: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 1rem;
    padding: 1.5rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .dark-mode .word-card {
    background: #2d2d2d;
    border-color: #444;
  }

  .word-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }

  .word-card.selected {
    border-color: #667eea;
    background: #f0f4ff;
  }

  .dark-mode .word-card.selected {
    background: #1a2639;
  }

  .card-arabic {
    font-family: "Amiri", serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .card-english {
    font-size: 1rem;
    color: #666;
  }

  .dark-mode .card-english {
    color: #aaa;
  }

  .card-category {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    background: #667eea;
    color: white;
    border-radius: 1rem;
  }

  /* List View */
  .list-view {
    background: #f9f9f9;
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .dark-mode .list-view {
    background: #2d2d2d;
  }

  .word-table {
    width: 100%;
    border-collapse: collapse;
  }

  .word-table th {
    background: #f0f0f0;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }

  .dark-mode .word-table th {
    background: #363636;
    color: #f0f0f0;
  }

  .word-table td {
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
  }

  .dark-mode .word-table td {
    border-bottom-color: #444;
  }

  .word-table tr:hover td {
    background: rgba(102, 126, 234, 0.1);
  }

  .word-table tr.selected td {
    background: rgba(102, 126, 234, 0.2);
  }

  .arabic-cell {
    font-family: "Amiri", serif;
    font-size: 1.2rem;
  }

  .category-cell {
    color: #666;
    font-size: 0.9rem;
  }

  .dark-mode .category-cell {
    color: #aaa;
  }

  /* Categories View */
  .categories-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .category-section {
    background: #f9f9f9;
    border-radius: 1rem;
    overflow: hidden;
  }

  .dark-mode .category-section {
    background: #2d2d2d;
  }

  .category-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    color: white;
    cursor: pointer;
    user-select: none;
  }

  .category-icon {
    font-size: 1.5rem;
  }

  .category-title {
    margin: 0;
    font-size: 1.5rem;
    flex-grow: 1;
  }

  .category-count {
    font-size: 1rem;
    opacity: 0.9;
  }

  .category-toggle {
    font-size: 1.2rem;
  }

  .category-words {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(150px, 1fr)
    );
    gap: 1rem;
    padding: 1.5rem;
  }

  .category-word-card {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .dark-mode .category-word-card {
    background: #363636;
  }

  .category-word-arabic {
    font-family: "Amiri", serif;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .category-word-english {
    font-size: 0.9rem;
    color: #666;
  }

  .dark-mode .category-word-english {
    color: #aaa;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .page-btn {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    background: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    color: inherit;
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn:not(:disabled):hover {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  .page-numbers {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .page-number {
    padding: 0.5rem 1rem;
    border: 2px solid #e0e0e0;
    background: none;
    border-radius: 0.5rem;
    cursor: pointer;
    min-width: 2.5rem;
    transition: all 0.2s;
    color: inherit;
  }

  .page-number.active {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  .page-number:not(.active):hover {
    background: rgba(102, 126, 234, 0.1);
  }

  .page-ellipsis {
    padding: 0.5rem;
  }

  /* No Results */
  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: #f9f9f9;
    border-radius: 1rem;
  }

  .dark-mode .no-results {
    background: #2d2d2d;
  }

  .no-results-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
  }

  .no-results h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .no-results p {
    color: #666;
    margin-bottom: 2rem;
  }

  .dark-mode .no-results p {
    color: #aaa;
  }

  .reset-btn {
    padding: 0.75rem 2rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .reset-btn:hover {
    background: #5a6fd8;
  }

  /* Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  }

  .dark-mode .modal-content {
    background: #2d2d2d;
    color: #f0f0f0;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    transition: color 0.2s;
  }

  .modal-close:hover {
    color: #667eea;
  }

  .modal-header {
    margin-bottom: 2rem;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .detail-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .detail-label {
    font-weight: 600;
    color: #666;
  }

  .dark-mode .detail-label {
    color: #aaa;
  }

  .detail-value {
    font-size: 1.2rem;
  }

  .detail-value.arabic {
    font-family: "Amiri", serif;
    font-size: 2rem;
    font-weight: 700;
  }

  .category-tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white;
    border-radius: 2rem;
    font-size: 0.9rem;
    align-self: flex-start;
  }

  .detail-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .action-btn {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    background: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
    color: inherit;
  }

  .action-btn:hover {
    background: #667eea;
    border-color: #667eea;
    color: white;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .vocabulary-container {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      align-items: flex-start;
    }

    .header-controls {
      width: 100%;
      justify-content: space-between;
    }

    .view-controls {
      flex-direction: column;
    }

    .view-toggle {
      width: 100%;
    }

    .view-btn {
      flex: 1;
    }

    .category-select,
    .per-page-select {
      width: 100%;
    }

    .grid-view {
      grid-template-columns: 1fr;
    }

    .pagination {
      flex-wrap: wrap;
    }

    .page-numbers {
      order: -1;
      width: 100%;
      justify-content: center;
    }
  }
</style>
