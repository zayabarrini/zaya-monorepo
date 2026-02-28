<script lang="ts">
  import { translateWord } from "$lib/utils/translate"; // Your translation utility
  import { speak } from "$lib/utils/textToSpeech"; // Your text-to-speech utility

  export let text: string;
  // export let index: number;
  export let isActive: boolean;
  export let style: string; // Declare the style prop

  console.log(text);
  let translatedText: string = "";

  const handleWordClick = async (word: string) => {
    // translatedText = await translateWord(word); // Translate the word
    // speak(translatedText); // Speak the translated word
  };
</script>

<div class="card {isActive ? 'active' : ''}" {style}>
  <div class="word-container">
    {#each text.split(" ") as word, i}
      <span
        class="word"
        on:click={() => handleWordClick(word)}
        on:keypress={() => handleWordClick(word)}
        aria-label="Translate"
        role="button"
        tabindex="0">{word}</span
      >
    {/each}

    <!-- Conditionally render the translated text -->
    {#if translatedText}
      <div class="translation">{translatedText}</div>
    {/if}
  </div>
</div>

<style>
  .card {
    position: absolute;
    width: 70vh;
    height: 50vh; /* Set a fixed height for the card */
    padding: 2em;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, opacity 0.3s ease;
    display: flex; /* Use Flexbox for centering */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  .word-container {
    text-align: center; /* Center text inside the container */
  }

  .word {
    cursor: pointer;
    margin-right: 0.2em;
    display: inline; /* Ensure words are rendered inline */
  }

  .word:hover {
    text-decoration: underline;
  }

  .translation {
    margin-top: 1em;
    padding: 0.5em;
    background-color: var(--translation-bg-color, #f0f0f0);
    color: var(--translation-text-color, #000000);
    border-radius: 5px;
  }
</style>
