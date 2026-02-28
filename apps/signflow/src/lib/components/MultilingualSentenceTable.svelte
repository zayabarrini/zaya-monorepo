<script lang="ts">
  import { onMount } from "svelte";
  import { getLanguage, isRTL } from "$lib/languages";
  import SentenceBreakdownModal from "./SentenceBreakdownModal.svelte";

  // Types
  interface SentenceRow {
    id?: number;
    [key: string]: string | number | undefined;
  }

  export let data: SentenceRow[] = [];
  export let sourceLanguage: string = "en";
  export let targetLanguages: string[] = [];
  export let showBreakdown: boolean = true;

  // State
  let displayedData: SentenceRow[] = [];
  let modalOpen = false;
  let selectedSentence = "";
  let breakdownSourceLang = "en";
  let breakdownTargetLang = "en";
  let copyFeedback = "";
  let copyTimeout: ReturnType<typeof setTimeout> | null =
    null;
  let isShuffled = false;
  let originalDataOrder: SentenceRow[] = [];

  // Initialize displayed data
  $: {
    if (data && data.length > 0) {
      displayedData = [...data];
      originalDataOrder = [...data];
    }
  }

  function getLanguageDisplay(code: string): string {
    const lang = getLanguage(code);
    return lang
      ? `${lang.flag} ${lang.name}`
      : code.toUpperCase();
  }

  function openBreakdown(
    sentence: string,
    sourceLang: string,
    targetLang: string
  ) {
    selectedSentence = sentence;
    breakdownSourceLang = sourceLang;
    breakdownTargetLang = targetLang;
    modalOpen = true;
  }

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

  function formatSentence(
    sentence: string | number | undefined
  ): string {
    if (!sentence) return "";
    const text = String(sentence);
    return text.replace(/^["']|["']$/g, "").trim();
  }

  function shuffleSentences() {
    if (displayedData.length === 0) return;

    const shuffled = [...displayedData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i]
      ];
    }
    displayedData = shuffled;
    isShuffled = true;
  }

  function resetOrder() {
    if (originalDataOrder.length > 0) {
      displayedData = [...originalDataOrder];
      isShuffled = false;
    }
  }

  // Group translations by row
  function getTranslations(row: SentenceRow) {
    const translations: Array<{
      language: string;
      text: string;
      isSource: boolean;
    }> = [];

    // Add source language
    if (row[sourceLanguage]) {
      translations.push({
        language: sourceLanguage,
        text: formatSentence(row[sourceLanguage]),
        isSource: true
      });
    }

    // Add target languages
    targetLanguages.forEach((lang) => {
      if (row[lang]) {
        translations.push({
          language: lang,
          text: formatSentence(row[lang]),
          isSource: false
        });
      }
    });

    return translations;
  }

  onMount(() => {
    return () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };
  });
</script>

<div class="table-controls">
  <div class="controls-left">
    <span class="count-badge">
      {displayedData.length} sentence{displayedData.length !==
      1
        ? "s"
        : ""}
    </span>
    {#if isShuffled}
      <span class="shuffle-badge"> 🔀 Shuffled </span>
    {/if}
  </div>

  <div class="controls-right">
    <button
      class="control-btn shuffle-btn"
      on:click={shuffleSentences}
      title="Shuffle sentences randomly"
      aria-label="Shuffle sentences"
      disabled={displayedData.length === 0}
    >
      🔀 Shuffle
    </button>

    {#if isShuffled}
      <button
        class="control-btn reset-btn"
        on:click={resetOrder}
        title="Reset to original order"
        aria-label="Reset order"
      >
        ↩️ Reset Order
      </button>
    {/if}
  </div>
</div>

<div class="sentence-grid">
  {#each displayedData as row, rowIndex (row.id || rowIndex)}
    <div class="sentence-card">
      <div class="sentence-header">
        <span class="row-number">#{rowIndex + 1}</span>
        {#if showBreakdown && targetLanguages.length > 0}
          <div class="breakdown-actions">
            {#each targetLanguages as lang}
              {#if row[lang]}
                <button
                  class="breakdown-btn"
                  on:click={() =>
                    openBreakdown(
                      formatSentence(row[lang]),
                      sourceLanguage,
                      lang
                    )}
                  title={`Word-by-word breakdown for ${getLanguageDisplay(lang)}`}
                  aria-label={`Breakdown for ${getLanguageDisplay(lang)}`}
                >
                  {getLanguage(lang)?.flag || lang}
                </button>
              {/if}
            {/each}
          </div>
        {/if}
      </div>

      <div class="translations-block">
        {#each getTranslations(row) as translation (translation.language)}
          <div
            class="translation-item"
            class:source-item={translation.isSource}
            class:rtl={isRTL(translation.language)}
          >
            <div class="language-label">
              <span class="language-flag">
                {getLanguage(translation.language)?.flag ||
                  translation.language}
              </span>
              <span class="language-name">
                {getLanguage(translation.language)?.name ||
                  translation.language.toUpperCase()}
              </span>
              {#if translation.isSource}
                <span class="source-badge">Source</span>
              {/if}
            </div>

            <!-- <div
              class="sentence-text"
              class:rtl-text={isRTL(translation.language)}
              title="Click to copy"
              on:click={() =>
                copyToClipboard(translation.text)}
              role="button"
              tabindex="0"
              on:keydown={(e) =>
                e.key === "Enter" &&
                copyToClipboard(translation.text)}
            >
              {translation.text}
            </div> -->
            <div
              class="sentence-text"
              class:rtl-text={isRTL(translation.language)}
            >
              {translation.text}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!-- Copy feedback toast -->
{#if copyFeedback}
  <div class="copy-feedback" role="alert">
    {copyFeedback}
  </div>
{/if}

{#if showBreakdown}
  <SentenceBreakdownModal
    sentence={selectedSentence}
    sourceLanguage={breakdownSourceLang}
    targetLanguage={breakdownTargetLang}
    isOpen={modalOpen}
    on:close={() => (modalOpen = false)}
  />
{/if}

<style>
  .table-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 16px 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }

  .controls-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .controls-right {
    display: flex;
    gap: 8px;
  }

  .count-badge {
    background: #007bff;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  .shuffle-badge {
    background: #ffc107;
    color: #212529;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    animation: fadeIn 0.3s ease;
  }

  .control-btn {
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .shuffle-btn {
    background: #007bff;
    color: white;
  }

  .shuffle-btn:not(:disabled):hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
  }

  .reset-btn {
    background: #6c757d;
    color: white;
  }

  .reset-btn:hover {
    background: #545b62;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.2);
  }

  .sentence-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
  }

  .sentence-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    transition: all 0.2s;
  }

  .sentence-card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #b0b0b0;
  }

  .sentence-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    color: white;
  }

  .row-number {
    font-size: 16px;
    font-weight: 600;
    color: white;
    background: rgba(255, 255, 255, 0.2);
    padding: 6px 14px;
    border-radius: 20px;
  }

  .breakdown-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .breakdown-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 6px 14px;
    color: white;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
    backdrop-filter: blur(4px);
  }

  .breakdown-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .translations-block {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .translation-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .translation-item.source-item {
    background: linear-gradient(to right, #fff, #e7f3ff);
    border-left: 4px solid #007bff;
  }

  .translation-item:hover {
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .language-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .language-flag {
    font-size: 18px;
  }

  .language-name {
    font-weight: 600;
    color: #495057;
  }

  .source-badge {
    background: #007bff;
    color: white;
    font-size: 11px;
    padding: 2px 10px;
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .sentence-text {
    font-size: 16px;
    line-height: 1.6;
    color: #212529;
    padding: 4px 0;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    word-break: break-word;
  }

  .sentence-text:hover {
    background: rgba(0, 123, 255, 0.05);
    padding-left: 8px;
    border-left: 2px solid #007bff;
  }

  .sentence-text:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
    padding-left: 8px;
  }

  .sentence-text.rtl-text {
    text-align: right;
    direction: rtl;
    font-family: "Traditional Arabic", "Arial", sans-serif;
  }

  .translation-item.rtl .language-label {
    direction: rtl;
  }

  .translation-item.rtl .sentence-text {
    text-align: right;
    direction: rtl;
  }

  .copy-feedback {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #28a745;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    animation: fadeInOut 1.5s ease-in-out;
    z-index: 1000;
    box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
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

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .table-controls {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .controls-left,
    .controls-right {
      width: 100%;
      justify-content: space-between;
    }

    .sentence-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .breakdown-actions {
      width: 100%;
      justify-content: flex-start;
    }

    .translation-item {
      padding: 12px;
    }

    .sentence-text {
      font-size: 15px;
    }
  }

  /* RTL language specific adjustments */
  .translation-item.rtl .language-label {
    flex-direction: row-reverse;
  }

  .translation-item.rtl .source-badge {
    margin-right: 0;
    margin-left: 8px;
  }
</style>
