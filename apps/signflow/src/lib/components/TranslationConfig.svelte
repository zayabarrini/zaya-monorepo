<!-- src/lib/components/TranslationConfig.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import {
    clearTranslationCache,
    getSupportedLanguages
  } from "$lib/services/translationService";

  export let showConfig = false;

  let supportedLanguages: Array<{
    code: string;
    name: string;
  }> = [];
  let loading = false;
  let cacheSize = 0;
  let lastCleared = "";

  // Emit events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }

  async function loadSupportedLanguages() {
    loading = true;
    try {
      supportedLanguages = await getSupportedLanguages();
      cacheSize = estimateCacheSize();
    } catch (error) {
      console.error(
        "Failed to load supported languages:",
        error
      );
    } finally {
      loading = false;
    }
  }

  function estimateCacheSize(): number {
    // Estimate based on localStorage (simplified)
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("translation_")) {
        total += (localStorage.getItem(key) || "").length;
      }
    }
    return Math.round(total / 1024); // KB
  }

  function clearCache() {
    clearTranslationCache();
    cacheSize = 0;
    lastCleared = new Date().toLocaleTimeString();
    dispatch("cachecleared");
  }

  onMount(() => {
    if (showConfig) {
      loadSupportedLanguages();
    }
  });

  $: if (showConfig) {
    loadSupportedLanguages();
  }
</script>

{#if showConfig}
  <div class="config-overlay" on:click={close}>
    <div class="config-content" on:click|stopPropagation>
      <div class="config-header">
        <h2>Translation Settings</h2>
        <button
          on:click={close}
          class="close-btn"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div class="config-body">
        <div class="section">
          <h3>Translation Service</h3>
          <p class="service-info">
            <strong>LibreTranslate</strong> - Free & Open Source
            Machine Translation
          </p>
          <p class="service-note">
            Using public servers. Translation quality may
            vary.
          </p>
        </div>

        <div class="section">
          <h3>Supported Languages</h3>
          {#if loading}
            <div class="loading">
              Loading supported languages...
            </div>
          {:else}
            <div class="languages-grid">
              {#each supportedLanguages as lang}
                <span class="language-tag">
                  {lang.code}: {lang.name}
                </span>
              {/each}
            </div>
          {/if}
        </div>

        <div class="section">
          <h3>Cache Management</h3>
          <div class="cache-info">
            <p>
              Estimated cache size: <strong
                >{cacheSize} KB</strong
              >
            </p>
            {#if lastCleared}
              <p>Last cleared: {lastCleared}</p>
            {/if}
          </div>
          <button on:click={clearCache} class="btn-clear">
            Clear Translation Cache
          </button>
          <p class="cache-note">
            Clearing cache will force fresh translations but
            may be slower.
          </p>
        </div>

        <div class="section">
          <h3>Performance Tips</h3>
          <ul class="tips-list">
            <li>
              Common words are cached for faster translation
            </li>
            <li>
              Long sentences may take longer to translate
            </li>
            <li>
              Multiple servers are tried for reliability
            </li>
            <li>
              Word-by-word translation provides learning
              insights
            </li>
          </ul>
        </div>
      </div>

      <div class="config-footer">
        <button on:click={close} class="btn-close">
          Close Settings
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .config-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    padding: 20px;
  }

  .config-content {
    background: white;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }

  .config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e0e0e0;
    background: linear-gradient(
      135deg,
      #f093fb 0%,
      #f5576c 100%
    );
    color: white;
    border-radius: 12px 12px 0 0;
  }

  .config-header h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
    padding: 4px 12px;
    border-radius: 6px;
  }

  .config-body {
    padding: 24px;
  }

  .section {
    margin-bottom: 32px;
  }

  .section h3 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 1.2rem;
  }

  .service-info {
    color: #555;
    margin: 8px 0;
  }

  .service-note {
    color: #666;
    font-size: 14px;
    font-style: italic;
  }

  .loading {
    text-align: center;
    padding: 20px;
    color: #666;
  }

  .languages-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(140px, 1fr)
    );
    gap: 8px;
    max-height: 200px;
    overflow-y: auto;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .language-tag {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 12px;
    color: #555;
  }

  .cache-info {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 16px;
  }

  .btn-clear {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-clear:hover {
    background: #c82333;
  }

  .cache-note {
    color: #666;
    font-size: 13px;
    margin-top: 8px;
  }

  .tips-list {
    margin: 0;
    padding-left: 20px;
    color: #555;
  }

  .tips-list li {
    margin-bottom: 8px;
  }

  .config-footer {
    padding: 20px 24px;
    border-top: 1px solid #e0e0e0;
    text-align: right;
  }

  .btn-close {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 24px;
    cursor: pointer;
  }
</style>
