<script lang="ts">
  import { onMount } from "svelte";

  let utterance: SpeechSynthesisUtterance;
  let isSpeaking = false;
  let isPaused = false;
  let text = "";
  let voices = [];
  let selectedVoice;
  let rate = 1.0;
  let isModalOpen = false;

  onMount(() => {
    text = document.body.innerText;
    voices = window.speechSynthesis.getVoices();
    selectedVoice =
      voices.find((v) => v.default) || voices[0];

    // Ensure voices are loaded
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      selectedVoice =
        voices.find((v) => v.default) || voices[0];
    };
  });

  function speak() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      isPaused = false;
    } else {
      utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;

      utterance.onend = () => {
        isSpeaking = false;
      };

      isSpeaking = true;
      isPaused = false;
      window.speechSynthesis.speak(utterance);
    }
  }

  function pauseResume() {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        isPaused = false;
      } else {
        window.speechSynthesis.pause();
        isPaused = true;
      }
    }
  }

  function setReadingPosition(event) {
    let selectedText = document.getSelection()?.toString();
    if (selectedText) {
      text = selectedText;
    } else {
      let clickedText = event.target.innerText;
      if (clickedText) {
        text = clickedText;
      }
    }
    speak();
  }

  // function setReadingPosition(event) {
  //   const clickedElement = event.target;
  //   const allText = document.body.innerText;

  //   // Get the text content up to the clicked element
  //   const range = document.createRange();
  //   range.selectNodeContents(document.body);
  //   range.setEndBefore(clickedElement);
  //   const textBeforeClick = range.toString();

  //   // Calculate the position of the click in the full text
  //   const clickPosition = textBeforeClick.length;

  //   // Extract the text from the clicked position to the end
  //   text = allText.slice(clickPosition);

  //   // Start reading
  //   speak();
  // }

  function toggleModal() {
    isModalOpen = !isModalOpen;
  }

  function closeModal(event) {
    if (event.target.classList.contains("modal-backdrop")) {
      isModalOpen = false;
    }
  }
</script>

<!-- Floating Button -->
<!-- <button class="floating-share" on:click={toggleModal}>
    🔊
  </button> -->
<div
  class="translate-icon floating-share"
  id="translate-icon"
  on:click={toggleModal}
  on:keypress={toggleModal}
  aria-label="Read Aloud"
  role="button"
  tabindex="0"
>
  <img src="/icons/voice.png" alt="Read Aloud" />
</div>

<!-- Modal Backdrop -->
{#if isModalOpen}
  <div
    class="modal-backdrop"
    on:click={closeModal}
    on:keydown={closeModal}
    aria-label="modal overlay"
    role="button"
    tabindex="0"
  >
    <div class="modal-content">
      <div class="floating-controls">
        <button on:click={speak}>
          {isSpeaking ? "Stop" : "Read Aloud"}
        </button>
        <button
          on:click={pauseResume}
          disabled={!isSpeaking}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>

        <label for="speed">Speed</label>
        <input
          id="speed"
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          bind:value={rate}
        />

        <label for="voice">Voice</label>
        <select id="voice" bind:value={selectedVoice}>
          {#each voices as voice}
            <option value={voice}>{voice.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
{/if}

<svelte:window on:click={setReadingPosition} />

<style>
  /* Floating Button */
  .floating-share {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--background-color, #000);
    color: var(--text-color, #fff);
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: 0.3s;
    z-index: 1000;
    font-size: 24px;
    line-height: 1;
    border: none;
  }

  .floating-share:hover {
    background: var(--hover-background-color, #333);
  }

  #translate-icon img {
    width: 24px;
    height: 24px;
    filter: var(--icon-filter, none);
    /* background: var(--background-color, #000); */
  }

  /* Modal Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Modal Content */
  .modal-content {
    background: var(--background-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 250px;
  }

  .floating-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  select,
  input {
    width: 100%;
    padding: 5px;
    background: var(--background-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
  }
</style>
