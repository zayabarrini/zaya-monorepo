<!-- src/lib/components/SentenceBreakdownModal.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    translateSentenceWords,
    clearTranslationCache
  } from "$lib/services/translationService";
  import {
    isRTL,
    getLanguage,
    type LanguageCode
  } from "$lib/languages";

  export let sentence: string = "";
  export let sourceLanguage: LanguageCode = "en";
  export let targetLanguage: LanguageCode = "en";
  export let isOpen: boolean = false;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  interface WordBreakdown {
    word: string;
    translation: string;
    confidence?: number;
  }

  let breakdown: WordBreakdown[] = [];
  let loading = false;
  let error: string | null = null;
  let fullTranslation: string = "";
  let translationConfidence: number = 0;

  // Keyboard event handling
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      close();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () =>
      window.removeEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    // Clean up if needed
  });

  function close() {
    dispatch("close");
  }

  // Load breakdown when modal opens
  $: if (
    isOpen &&
    sentence &&
    sourceLanguage !== targetLanguage
  ) {
    loadBreakdown();
  } else if (isOpen && sourceLanguage === targetLanguage) {
    breakdown = [];
    fullTranslation = sentence;
    loading = false;
  }

  async function loadBreakdown() {
    if (!sentence || sourceLanguage === targetLanguage) {
      breakdown = [];
      fullTranslation = sentence;
      return;
    }

    loading = true;
    error = null;
    breakdown = [];
    fullTranslation = "";

    try {
      // Get word-by-word breakdown
      breakdown = await translateSentenceWords(
        sentence,
        sourceLanguage,
        targetLanguage
      );

      // Calculate confidence score
      translationConfidence =
        calculateConfidence(breakdown);

      // Create full translation from words
      fullTranslation = breakdown
        .map((item) => item.translation)
        .join(" ")
        .replace(/\[(.*?)\]/g, "$1"); // Remove brackets from failed translations
    } catch (err) {
      error =
        err instanceof Error
          ? err.message
          : "Failed to load word translations";
      console.error("Translation error:", err);

      // Fallback: show words without translations
      const words = sentence
        .split(" ")
        .filter((w) => w.trim());
      breakdown = words.map((word) => ({
        word,
        translation: word
      }));
      fullTranslation = sentence;
    } finally {
      loading = false;
    }
  }

  function calculateConfidence(
    breakdown: WordBreakdown[]
  ): number {
    if (breakdown.length === 0) return 0;

    const successful = breakdown.filter(
      (item) =>
        !item.translation.includes("[") &&
        item.translation !== item.word
    ).length;

    return successful / breakdown.length;
  }

  function clearCache() {
    clearTranslationCache();
    // Reload after clearing cache
    loadBreakdown();
  }

  function copyTranslation() {
    if (fullTranslation) {
      navigator.clipboard.writeText(fullTranslation);
    }
  }

  // Get language info
  $: sourceLangInfo = getLanguage(sourceLanguage);
  $: targetLangInfo = getLanguage(targetLanguage);
  $: isSourceRTL = isRTL(sourceLanguage);
  $: isTargetRTL = isRTL(targetLanguage);
  $: showConfidence =
    translationConfidence > 0 && translationConfidence < 1;
</script>

{#if isOpen}
  <div
    class="modal-overlay"
    on:click={close}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
  >
    <div
      class="modal-content"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-header">
        <div class="header-title">
          <h2>Sentence Breakdown</h2>
          {#if showConfidence}
            <div
              class="confidence-badge"
              title="Translation confidence"
            >
              {Math.round(translationConfidence * 100)}%
              match
            </div>
          {/if}
        </div>
        <button
          on:click={close}
          class="close-btn"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div class="sentence-display">
        <div class="sentence-original">
          <div class="language-label">
            {#if sourceLangInfo}
              <span class="flag">{sourceLangInfo.flag}</span
              >
              <span
                >{sourceLangInfo.name} ({sourceLanguage})</span
              >
            {:else}
              {sourceLanguage}
            {/if}
          </div>
          <div
            class="sentence-text"
            class:rtl={isSourceRTL}
          >
            {sentence}
          </div>
        </div>

        <div class="translation-section">
          <div class="language-label">
            {#if targetLangInfo}
              <span class="flag">{targetLangInfo.flag}</span
              >
              <span
                >{targetLangInfo.name} ({targetLanguage})</span
              >
            {:else}
              {targetLanguage}
            {/if}
            <button
              on:click={copyTranslation}
              class="copy-full-btn"
              title="Copy full translation"
              disabled={!fullTranslation}
            >
              📋 Copy
            </button>
          </div>

          {#if loading}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Translating with LibreTranslate...</p>
              <p class="loading-note">
                Using free translation service, may be
                slower
              </p>
            </div>
          {:else if error}
            <div class="error-state">
              <p>⚠️ {error}</p>
              <button
                on:click={loadBreakdown}
                class="retry-btn"
              >
                Retry
              </button>
            </div>
          {:else if fullTranslation}
            <div
              class="full-translation"
              class:rtl={isTargetRTL}
            >
              {fullTranslation}
            </div>
          {/if}
        </div>

        {#if breakdown.length > 0 && !loading && !error}
          <div class="breakdown-section">
            <h3>Word-by-Word Translation</h3>
            <div class="word-grid">
              {#each breakdown as item, index (index)}
                <div class="word-pair">
                  <div
                    class="word-original"
                    class:rtl={isSourceRTL}
                  >
                    <span class="word-number"
                      >{index + 1}</span
                    >
                    <span class="word-text"
                      >{item.word}</span
                    >
                  </div>
                  <div
                    class="word-translation"
                    class:rtl={isTargetRTL}
                  >
                    {item.translation}
                    {#if item.confidence !== undefined && item.confidence < 0.7}
                      <span
                        class="low-confidence"
                        title="Low confidence translation"
                        >?</span
                      >
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <div class="modal-footer">
        <div class="footer-info">
          <small>
            Powered by <strong>LibreTranslate</strong> - Free
            & Open Source Translation
          </small>
        </div>
        <div class="footer-actions">
          <button
            on:click={clearCache}
            class="btn-secondary"
          >
            Clear Cache
          </button>
          <button on:click={close} class="btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e0e0e0;
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    color: white;
    border-radius: 12px 12px 0 0;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: white;
  }

  .confidence-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    padding: 4px 12px;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .sentence-display {
    padding: 24px;
  }

  .sentence-original,
  .translation-section {
    margin-bottom: 24px;
  }

  .language-label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    font-weight: 600;
    color: #555;
  }

  .flag {
    font-size: 20px;
  }

  .copy-full-btn {
    margin-left: auto;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    opacity: 0.9;
    transition: opacity 0.2s;
  }

  .copy-full-btn:hover:not(:disabled) {
    opacity: 1;
  }

  .copy-full-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .sentence-text,
  .full-translation {
    font-size: 1.2rem;
    line-height: 1.6;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #007bff;
    word-break: break-word;
  }

  .sentence-text.rtl,
  .full-translation.rtl {
    border-left: none;
    border-right: 4px solid #007bff;
    text-align: right;
    direction: rtl;
  }

  .loading-state {
    text-align: center;
    padding: 40px 20px;
    color: #666;
  }

  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }

  .loading-note {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
  }

  .error-state {
    padding: 20px;
    background: #fee;
    border-radius: 8px;
    border: 1px solid #f99;
    color: #c00;
  }

  .retry-btn {
    margin-top: 12px;
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .breakdown-section {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e0e0e0;
  }

  .breakdown-section h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 1.2rem;
  }

  .word-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(180px, 1fr)
    );
    gap: 16px;
  }

  .word-pair {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }

  .word-pair:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .word-original,
  .word-translation {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .word-original {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
  }

  .word-original.rtl {
    direction: rtl;
  }

  .word-number {
    background: #007bff;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .word-text {
    flex: 1;
  }

  .word-translation {
    color: #28a745;
    font-size: 1rem;
  }

  .word-translation.rtl {
    direction: rtl;
  }

  .low-confidence {
    margin-left: 8px;
    color: #ffc107;
    font-weight: bold;
    cursor: help;
  }

  .modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fa;
    border-radius: 0 0 12px 12px;
  }

  .footer-info {
    color: #666;
    font-size: 14px;
  }

  .footer-actions {
    display: flex;
    gap: 12px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #545b62;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .modal-content {
      margin: 10px;
      max-height: 95vh;
    }

    .word-grid {
      grid-template-columns: repeat(
        auto-fill,
        minmax(140px, 1fr)
      );
    }

    .modal-footer {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    .footer-actions {
      width: 100%;
      justify-content: center;
    }
  }
</style>
