<!-- src/lib/components/LanguageSelector.svelte -->
<script lang="ts">
  import {
    ALL_LANGUAGES,
    type LanguageCode
  } from "$lib/languages";

  export let selectedLanguages: LanguageCode[] = [
    "en",
    "de",
    "fr"
  ];
  export let sourceLanguage: LanguageCode = "en";
  export let showSourceSelector = true;
  export let maxSelection = 5;

  // Emit events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function toggleLanguage(lang: LanguageCode) {
    if (
      lang === sourceLanguage &&
      selectedLanguages.length === 1
    ) {
      // Don't allow removing the last language if it's the source
      return;
    }

    if (selectedLanguages.includes(lang)) {
      if (lang === sourceLanguage) {
        // If removing source, set first other language as new source
        const otherLangs = selectedLanguages.filter(
          (l) => l !== lang
        );
        if (otherLangs.length > 0) {
          selectedLanguages = otherLangs;
          sourceLanguage = otherLangs[0];
          dispatch("change", {
            selectedLanguages,
            sourceLanguage
          });
        }
      } else {
        selectedLanguages = selectedLanguages.filter(
          (l) => l !== lang
        );
        dispatch("change", {
          selectedLanguages,
          sourceLanguage
        });
      }
    } else if (selectedLanguages.length < maxSelection) {
      selectedLanguages = [...selectedLanguages, lang];
      dispatch("change", {
        selectedLanguages,
        sourceLanguage
      });
    }
  }

  function setSourceLanguage(lang: LanguageCode) {
    if (selectedLanguages.includes(lang)) {
      sourceLanguage = lang;
      // Ensure source is first in the list
      const others = selectedLanguages.filter(
        (l) => l !== lang
      );
      selectedLanguages = [lang, ...others];
      dispatch("change", {
        selectedLanguages,
        sourceLanguage
      });
    }
  }
</script>

<div class="language-selector">
  {#if showSourceSelector}
    <div class="source-section">
      <h3>Source Language</h3>
      <div class="source-languages">
        {#each selectedLanguages as lang}
          <button
            class:active={sourceLanguage === lang}
            on:click={() => setSourceLanguage(lang)}
          >
            {ALL_LANGUAGES.find((l) => l.code === lang)
              ?.flag}
            {ALL_LANGUAGES.find((l) => l.code === lang)
              ?.name}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <div class="target-section">
    <h3>Target Languages (max {maxSelection})</h3>
    <div class="language-grid">
      {#each ALL_LANGUAGES as lang}
        <button
          class:selected={selectedLanguages.includes(
            lang.code
          )}
          class:source={sourceLanguage === lang.code}
          on:click={() => toggleLanguage(lang.code)}
          title={lang.native}
        >
          <span class="flag">{lang.flag}</span>
          <span class="name">{lang.name}</span>
          {#if sourceLanguage === lang.code}
            <span class="source-badge">Source</span>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .language-selector {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .source-section,
  .target-section {
    margin-bottom: 24px;
  }

  h3 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .source-languages {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .source-languages button {
    padding: 8px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .source-languages button.active {
    border-color: #007bff;
    background: #007bff;
    color: white;
  }

  .language-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(120px, 1fr)
    );
    gap: 8px;
  }

  .language-grid button {
    padding: 12px 8px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
  }

  .language-grid button:hover {
    border-color: #007bff;
    transform: translateY(-1px);
  }

  .language-grid button.selected {
    border-color: #007bff;
    background: #f0f8ff;
  }

  .language-grid button.source {
    border-color: #28a745;
    background: #f0fff4;
  }

  .flag {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .name {
    font-size: 12px;
    font-weight: 500;
  }

  .source-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #28a745;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
  }
</style>
