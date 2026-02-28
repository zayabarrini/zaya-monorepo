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
  let isSpeakingMode = false;
  let hoverTimeout: NodeJS.Timeout;
  let currentHoverElement: HTMLElement | null = null;

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

  // Function to get the word under cursor
  function getWordUnderCursor(
    event: MouseEvent
  ): string | null {
    const target = event.target as HTMLElement;

    // Only handle paragraph and text-containing elements
    if (
      !target ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A"
    ) {
      return null;
    }

    // Create a range at the cursor position
    const range = document.caretRangeFromPoint(
      event.clientX,
      event.clientY
    );

    if (!range) return null;

    // Get the text node and offset
    const textNode = range.startContainer;
    const offset = range.startOffset;

    // If we're not in a text node, return null
    if (textNode.nodeType !== Node.TEXT_NODE) {
      return null;
    }

    const text = textNode.textContent || "";

    // Find word boundaries around the offset
    let start = offset;
    let end = offset;

    // Find the start of the word
    while (start > 0 && !/\s/.test(text[start - 1])) {
      start--;
    }

    // Find the end of the word
    while (end < text.length && !/\s/.test(text[end])) {
      end++;
    }

    // Extract the word
    const word = text.substring(start, end).trim();

    console.log("Word under cursor:", word); // Console log for debugging
    return word || null;
  }

  // Function to get the entire line from a text node
  function getLineFromElement(
    element: HTMLElement
  ): string | null {
    // Get all text content from the element
    const fullText = element.innerText || "";

    // For paragraph elements, return the whole text as one line
    // You can customize this logic based on your needs
    return fullText.trim() || null;
  }

  // Click handler - reads the word under cursor
  function handleWordClick(event: MouseEvent) {
    // Don't trigger on interactive elements or if modal is open
    isSpeakingMode = !isSpeakingMode;

    if (isModalOpen) {
      return;
    }

    // Check if clicking on modal or interactive elements
    const target = event.target as HTMLElement;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A" ||
      target.closest(".modal-content")
    ) {
      return;
    }

    // Get selected text first (prioritize text selection)
    let selectedText = document.getSelection()?.toString();
    if (selectedText && selectedText.trim()) {
      text = selectedText;
      console.log("Selected text:", selectedText);
    } else {
      // Get word under cursor
      const word = getWordUnderCursor(event);
      if (word) {
        text = word;
        console.log("Clicked word:", word); // Console log the word
      } else {
        // Fallback to element text if word detection fails
        const elementText = (
          event.target as HTMLElement
        ).innerText?.trim();
        if (elementText) {
          text = elementText;
          console.log("Element text:", elementText);
        } else {
          return; // No text to read
        }
      }
    }

    console.log("isSpeakingMode:", isSpeakingMode);
    if (isSpeakingMode) {
      // Cancel any ongoing speech
      if (isSpeaking) {
        window.speechSynthesis.cancel();
      }
      speak();
    }
  }

  // Hover handler - reads the entire line after 500ms
  function handleLineHover(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Don't trigger on interactive elements or if modal is open
    if (
      isModalOpen ||
      target.tagName === "BUTTON" ||
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "A" ||
      target.closest(".modal-content")
    ) {
      return;
    }

    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Store the current hover element
    currentHoverElement = target;

    // Set new timeout to read the line
    hoverTimeout = setTimeout(() => {
      if (
        currentHoverElement === target &&
        isSpeakingMode
      ) {
        // Get the line from the hovered element
        const lineText = getLineFromElement(target);

        if (lineText) {
          // Cancel any ongoing speech
          if (isSpeaking) {
            window.speechSynthesis.cancel();
          }

          text = lineText;
          console.log(
            "Reading line:",
            lineText.substring(0, 50) +
              (lineText.length > 50 ? "..." : "")
          ); // Log preview of line
          speak();
        }
      }
    }, 500); // 500ms delay before reading
  }

  // Clear hover timeout when mouse leaves
  function handleMouseLeave(event: MouseEvent) {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    currentHoverElement = null;
  }

  function toggleModal() {
    isModalOpen = !isModalOpen;
    isSpeakingMode = !isSpeakingMode;

    // Clear any pending hover timeouts when toggling mode
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
  }

  function closeModal(event) {
    if (event.target.classList.contains("modal-backdrop")) {
      isModalOpen = false;
      isSpeakingMode = false;
    }
  }
</script>

<!-- Floating Button -->
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

<svelte:window
  on:click={handleWordClick}
  on:mousemove={handleLineHover}
  on:mouseleave={handleMouseLeave}
/>

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

  button:disabled {
    background: #cccccc;
    cursor: not-allowed;
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
