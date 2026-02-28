<script lang="ts">
  import Card from "./Card.svelte";
  import { browser } from "$app/environment";

  export let cards: string[];
  console.log(cards[0]);

  let currentIndex = 0;
  let translatedText: string = "";

  const showNextCard = () => {
    if (currentIndex < cards.length - 1) {
      currentIndex += 1;
      translatedText = ""; // Reset translation when moving to the next card
    }
  };

  //   const handleTranslate = async () => {
  //     if (browser) {
  //       // Only run translation in the browser
  //       translatedText = await translate(cards[currentIndex]);
  //     }
  //   };
</script>

<div class="card-stack">
  {#each cards as text, index}
    <Card
      {text}
      {index}
      isActive={index === currentIndex}
      style="
      {index < 5
        ? `
          top: ${index * 1}px;
          left: ${index * 1}px;
          transform: translateY(${
            index === currentIndex ? 0 : 20
          }px);
          opacity: ${index === currentIndex ? 1 : 0.5};
          z-index: ${index === currentIndex ? 1 : 0};
        `
        : `
          top: 0;
          left: 0;
          transform: translateY(${
            index === currentIndex ? 0 : 20
          }px);
          opacity: ${index === currentIndex ? 1 : 0.5};
          z-index: ${index === currentIndex ? 1 : 0};
        `}
    "
    />
  {/each}

  <!-- Conditionally render the translated text -->
  <!-- {#if translatedText}
    <div class="translation">{translatedText}</div>
  {/if} -->
</div>

<button class="next-button" on:click={showNextCard}
  >Next Card</button
>

<style>
  .card-stack {
    position: relative;
    height: 60vh;
    width: 60vh;
    margin: 0 auto;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  .next-button {
    margin-bottom: 1em;
    padding: 1em;
    width: 80%;
    background-color: var(--button-bg-color, #18222c);
    color: var(--button-text-color, #ffffff);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: inline; /* Ensure words are rendered inline */
  }

  .next-button:hover {
    background-color: var(--button-bg-color-hover, #0056b3);
  }

  /* .translation {
    margin-top: 10px;
    padding: 10px;
    background-color: var(--translation-bg-color, #f0f0f0);
    color: var(--translation-text-color, #000000);
    border-radius: 5px;
  } */
</style>
