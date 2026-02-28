<!-- src/lib/components/MultilingualTable.svelte -->
<script lang="ts">
  export let data: any[] = [];
  export let sourceLanguage: string = "en";
  export let targetLanguages: string[] = [];
  export let showSourceColumn = true;
  export let page: number = 1;
  export let pageSize: number = 10;
  export let shuffle: boolean = false; // New prop for shuffle control

  import { ALL_LANGUAGES } from "$lib/languages";

  // Filter columns to only show selected languages
  $: columns = [
    ...(showSourceColumn
      ? [
          {
            key: sourceLanguage,
            label: getLanguageName(sourceLanguage),
            width: "200px",
            isSource: true
          }
        ]
      : []),
    ...targetLanguages.map((lang) => ({
      key: lang,
      label: getLanguageName(lang),
      width: "200px",
      isSource: false
    }))
  ];

  // Computed property for shuffled data
  $: displayData = shuffle ? shuffleArray([...data]) : data;

  // Fisher-Yates shuffle algorithm
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i]
      ];
    }
    return shuffled;
  }

  function getLanguageName(code: string): string {
    const lang = ALL_LANGUAGES.find((l) => l.code === code);
    return lang ? `${lang.flag} ${lang.name}` : code;
  }

  function copyToClipboard(text: string) {
    if (text && text !== "-") {
      navigator.clipboard.writeText(text).then(() => {
        // Optional: Show toast notification
      });
    }
  }

  // Get display value for a cell
  function getCellValue(row: any, key: string): string {
    return row[key] || "-";
  }

  // Function to trigger shuffle (can be called from parent)
  function triggerShuffle() {
    if (shuffle) {
      displayData = shuffleArray([...data]);
    }
  }

  // Export the shuffle function if needed
  export { triggerShuffle };
</script>

<div class="multilingual-table">
  <div class="table-header">
    <div class="table-info">
      <span class="item-count">
        Showing {displayData.length} items
        {#if shuffle}
          <span class="shuffle-badge" title="Random order"
            >🎲</span
          >
        {/if}
      </span>
    </div>
    {#if shuffle}
      <div class="shuffle-controls">
        <button
          class="reshuffle-btn"
          on:click={triggerShuffle}
          title="Reshuffle the words"
        >
          🔀 Reshuffle
        </button>
      </div>
    {/if}
  </div>

  <table>
    <thead>
      <tr>
        <th class="index">#</th>
        {#each columns as col}
          <th
            style="width: {col.width};"
            class:source={col.isSource}
          >
            {col.label}
          </th>
        {/each}
        <th class="actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each displayData as row, i}
        <tr>
          <td class="index"
            >{(i + 1).toString().padStart(3, "0")}</td
          >

          {#each columns as col}
            <td class:source={col.isSource}>
              <div class="cell-content">
                <span class="text"
                  >{getCellValue(row, col.key)}</span
                >
                <button
                  on:click={() =>
                    copyToClipboard(
                      getCellValue(row, col.key)
                    )}
                  class="copy-btn"
                  title="Copy to clipboard"
                  disabled={!row[col.key]}
                >
                  📋
                </button>
              </div>
            </td>
          {/each}

          <td class="actions">
            <button
              on:click={() =>
                copyToClipboard(
                  columns
                    .map((col) =>
                      getCellValue(row, col.key)
                    )
                    .join(" | ")
                )}
              class="copy-all-btn"
              title="Copy all translations"
            >
              Copy All
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .multilingual-table {
    overflow-x: auto;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  .table-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .item-count {
    color: #666;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .shuffle-badge {
    background: #e3f2fd;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    color: #1976d2;
  }

  .shuffle-controls {
    display: flex;
    gap: 8px;
  }

  .reshuffle-btn {
    padding: 6px 12px;
    background: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .reshuffle-btn:hover {
    background: #e0e0e0;
    border-color: #007bff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: (--background-color) !important;
    padding: 16px 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #dee2e6;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: top;
  }

  td.source {
    font-weight: 500;
  }

  .index {
    width: 60px;
    text-align: center;
    color: #666;
    font-family: monospace;
  }

  .actions {
    width: 120px;
    text-align: center;
  }

  .cell-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }

  .text {
    flex: 1;
    word-break: break-word;
    line-height: 1.5;
  }

  .copy-btn {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    padding: 4px;
    font-size: 14px;
  }

  .copy-btn:hover {
    opacity: 1;
  }

  .copy-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .copy-all-btn {
    padding: 6px 12px;
    background: (--background-color) !important;
    border-radius: 4px;
    box-shadow: 0 2px 2px black;
    cursor: pointer;
    font-size: 12px;
    transition: background 0.2s;
  }

  .copy-all-btn:hover {
    box-shadow: 0 4px 8px black;
  }

  tr:hover td {
    background: #f8f9fa;
  }
</style>
