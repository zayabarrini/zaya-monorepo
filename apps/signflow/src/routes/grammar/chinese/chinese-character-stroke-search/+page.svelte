<!-- /home/zaya/Downloads/Zayas/zayaslanguage/src/routes/grammar/chinese/chinese-character-stroke-order/+page.svelte -->
<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { fade, scale } from "svelte/transition";
  import HanziWriter from "hanzi-writer";
  import { browser } from "$app/environment";

  // Types
  type WriterMap = { [key: string]: any };

  let writers: WriterMap = {};
  let modalWriters: WriterMap = {};

  // Input state
  let characterInput: string = "";
  let characters: string[] = [];
  let errorMessage: string = "";
  let isLoading: boolean = false;

  // Pagination
  let currentPage: number = 1;
  const charactersPerPage: number = 500;
  let totalPages: number = 0;

  // Get current page characters
  $: paginatedCharacters = characters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  // Modal state
  let showModal: boolean = false;
  let selectedChar: string = "";
  let selectedGlobalIndex: number = 0;

  // Process input characters
  async function processInput(): Promise<void> {
    // Clear previous error
    errorMessage = "";
    isLoading = true;

    // Remove whitespace and split into characters
    const input = characterInput.replace(/\s+/g, "");

    if (input.length === 0) {
      errorMessage = "Please enter at least one character";
      characters = [];
      totalPages = 0;
      currentPage = 1;
      isLoading = false;
      return;
    }

    // Split into individual characters (including multi-byte characters)
    const chars = [...input];

    // Filter out non-Chinese characters and show warning
    const chineseRegex = /[\u4e00-\u9fff]/;
    const nonChinese = chars.filter(
      (char) => !chineseRegex.test(char)
    );

    if (nonChinese.length > 0) {
      errorMessage = `Non-Chinese characters detected: ${nonChinese.join(", ")}. They may not display correctly.`;
      // Still include them, but show warning
    }

    characters = chars;
    totalPages = Math.ceil(
      characters.length / charactersPerPage
    );
    currentPage = 1;

    // Clean up old writers
    cleanupAllWriters();
    isLoading = false;
  }

  // Clean up all writers
  function cleanupAllWriters(): void {
    Object.keys(writers).forEach((containerId) => {
      try {
        if (
          typeof writers[containerId].destroy === "function"
        ) {
          writers[containerId].destroy();
        }
      } catch (e) {
        console.error(
          `Failed to destroy writer for ${containerId}`,
          e
        );
      }
      delete writers[containerId];
    });
  }

  // Clean up writers for current page
  function cleanupCurrentPageWriters(): void {
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;

        // Destroy the writer if it exists
        if (writers[containerId]) {
          try {
            if (
              typeof writers[containerId].destroy ===
              "function"
            ) {
              writers[containerId].destroy();
            }
          } catch (e) {
            console.error(
              `Failed to destroy writer for ${containerId}`,
              e
            );
          }
          delete writers[containerId];
        }
      }
    );
  }

  // Initialize writers when component mounts or page changes
  onMount(() => {
    // Nothing to initialize initially
  });

  // Re-initialize writers when page changes
  afterUpdate(() => {
    if (characters.length > 0) {
      // Clean up old writers first
      cleanupCurrentPageWriters();

      // Small delay to ensure DOM is updated
      setTimeout(() => {
        initializeWriters();
      }, 100);
    }
  });

  function initializeWriters(): void {
    // Initialize grid writers for current page
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;
        const container: HTMLElement | null =
          document.getElementById(containerId);

        if (container) {
          // Clear container first (prevents duplicate writers)
          container.innerHTML = "";

          try {
            // Create writer without specifying charDataLoader
            // HanziWriter will use its default CDN automatically
            const writer = HanziWriter.create(
              container,
              char,
              {
                width: 150,
                height: 150,
                padding: 5,
                strokeAnimationSpeed: 1,
                strokeColor: "#333333",
                radicalColor: "#E53E3E",
                showOutline: true,
                showCharacter: false,
                delayBetweenStrokes: 100
                // Removed charDataLoader option - it uses the default CDN automatically
              }
            );

            writers[containerId] = writer;

            // Log for debugging
            console.log(
              `Created writer for ${char} at ${containerId}`
            );
          } catch (e) {
            console.error(
              `Failed to create writer for ${char}`,
              e
            );

            // Show error in the container
            container.innerHTML = `
              <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #e53e3e; font-size: 0.8rem; text-align: center;">
                Failed to load<br>${char}
              </div>
            `;
          }
        }
      }
    );
  }

  // Initialize modal writers lazily
  function initializeModalWriter(
    globalIndex: number,
    char: string
  ): any {
    const modalContainerId: string = `modal-char-${globalIndex}`;
    const modalContainer: HTMLElement | null =
      document.getElementById(modalContainerId);

    if (modalContainer) {
      // Destroy existing writer if it exists
      if (modalWriters[modalContainerId]) {
        try {
          if (
            typeof modalWriters[modalContainerId]
              .destroy === "function"
          ) {
            modalWriters[modalContainerId].destroy();
          }
        } catch (e) {
          console.error(
            `Failed to destroy modal writer for ${modalContainerId}`,
            e
          );
        }
        delete modalWriters[modalContainerId];
      }

      modalContainer.innerHTML = "";

      try {
        // Create modal writer without specifying charDataLoader
        const writer = HanziWriter.create(
          modalContainer,
          char,
          {
            width: 300,
            height: 300,
            padding: 10,
            strokeAnimationSpeed: 0.8,
            strokeColor: "#333333",
            radicalColor: "#E53E3E",
            showOutline: true,
            showCharacter: false,
            delayBetweenStrokes: 80
            // Removed charDataLoader option
          }
        );

        modalWriters[modalContainerId] = writer;
        return writer;
      } catch (e) {
        console.error(
          `Failed to create modal writer for ${char}`,
          e
        );

        modalContainer.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #e53e3e; font-size: 1rem; text-align: center;">
            Failed to load<br>${char}
          </div>
        `;
      }
    }
    return modalWriters[modalContainerId];
  }

  // Handle page change
  function changePage(newPage: number): void {
    if (newPage < 1 || newPage > totalPages) return;

    // Clean up current page writers before changing page
    cleanupCurrentPageWriters();

    currentPage = newPage;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Animate all characters on current page
  function animateAll(): void {
    paginatedCharacters.forEach(
      (char: string, localIndex: number) => {
        const globalIndex: number =
          (currentPage - 1) * charactersPerPage +
          localIndex;
        const containerId: string = `char-${globalIndex}`;
        if (writers[containerId]) {
          writers[containerId].animateCharacter();
        }
      }
    );
  }

  // Open modal with selected character
  function openModal(
    char: string,
    globalIndex: number
  ): void {
    selectedChar = char;
    selectedGlobalIndex = globalIndex;
    showModal = true;

    // Small delay to ensure modal is rendered before animating
    setTimeout(() => {
      const writer = initializeModalWriter(
        globalIndex,
        char
      );
      if (writer) {
        writer.animateCharacter();
      }
    }, 100);
  }

  // Close modal
  function closeModal(): void {
    showModal = false;
  }

  // Handle escape key
  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  // Handle click outside
  function handleModalClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      closeModal();
    }
  }

  // Get global index for a character
  function getGlobalIndex(localIndex: number): number {
    return (
      (currentPage - 1) * charactersPerPage + localIndex
    );
  }

  // Example characters for quick testing
  const exampleCharacters = ["你", "好", "中", "国", "爱"];

  // Validate if a character is Chinese
  function isChineseCharacter(char: string): boolean {
    return /[\u4e00-\u9fff]/.test(char);
  }
</script>

<svelte:head>
  <title>Chinese Strokes - Character Input</title>
</svelte:head>

<main
  class="container"
  on:keydown={handleKeyDown}
  tabindex="0"
  role="main"
>
  <h1>Chinese Character Stroke Order</h1>

  <div class="input-section">
    <label for="character-input" class="input-label">
      Enter Chinese characters:
    </label>
    <div class="input-wrapper">
      <input
        id="character-input"
        type="text"
        bind:value={characterInput}
        placeholder="e.g., 你好世界"
        class="character-input"
        on:keydown={(e) => {
          if (e.key === "Enter") {
            processInput();
          }
        }}
        disabled={isLoading}
      />
      <button
        on:click={processInput}
        class="submit-btn"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Show Stroke Order"}
      </button>
    </div>

    <div class="examples">
      <span class="examples-label">Try examples:</span>
      {#each exampleCharacters as char}
        <button
          class="example-btn"
          on:click={() => {
            characterInput = char;
            processInput();
          }}
          type="button"
        >
          {char}
        </button>
      {/each}
    </div>

    {#if errorMessage}
      <p class="error-message" transition:fade>
        {errorMessage}
      </p>
    {/if}

    <p class="input-hint">
      Enter any Chinese characters (simplified or
      traditional). The app will fetch stroke order data
      from the HanziWriter CDN automatically.
    </p>
  </div>

  {#if characters.length > 0}
    <div class="results-section">
      <p class="subtitle">
        Total characters: {characters.length} • Page {currentPage}
        of {totalPages}
      </p>

      <div class="controls">
        <button
          on:click={animateAll}
          class="animate-btn"
          type="button"
          disabled={paginatedCharacters.length === 0 ||
            isLoading}
        >
          ▶ Animate Current Page ({paginatedCharacters.length}
          characters)
        </button>

        <button
          on:click={() => {
            characterInput = "";
            characters = [];
            totalPages = 0;
            currentPage = 1;
            cleanupAllWriters();
            errorMessage = "";
          }}
          class="clear-btn"
          type="button"
        >
          Clear All
        </button>
      </div>

      <div class="characters-grid">
        {#each paginatedCharacters as char, localIndex (localIndex)}
          {@const globalIndex = getGlobalIndex(localIndex)}
          {@const isChinese = isChineseCharacter(char)}
          <button
            class="character-card"
            on:click={() =>
              isChinese && openModal(char, globalIndex)}
            type="button"
            aria-label={`View stroke order for character ${char}`}
            disabled={!isChinese}
          >
            <div class="character-header">
              <span
                class="character-main"
                aria-hidden="true">{char}</span
              >
            </div>

            <div class="character-container-wrapper">
              <div
                id={`char-${globalIndex}`}
                class="character-container"
                aria-label={`Stroke order animation for ${char}`}
                role="img"
              ></div>
            </div>

            <div class="char-info">
              {char} • {globalIndex + 1}/{characters.length} •
              U+{char
                .codePointAt(0)
                ?.toString(16)
                .toUpperCase()
                .padStart(4, "0")}
              {#if !isChinese}
                <span class="non-chinese-badge"
                  >(non-Chinese)</span
                >
              {/if}
            </div>
          </button>
        {/each}
      </div>

      <!-- Pagination Controls -->
      {#if totalPages > 1}
        <div class="pagination">
          <button
            class="page-btn"
            on:click={() => changePage(1)}
            disabled={currentPage === 1}
            type="button"
          >
            ⏮ First
          </button>

          <button
            class="page-btn"
            on:click={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
          >
            ← Previous
          </button>

          <span class="page-info" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>

          <button
            class="page-btn"
            on:click={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
          >
            Next →
          </button>

          <button
            class="page-btn"
            on:click={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
            type="button"
          >
            Last ⏭
          </button>
        </div>
      {/if}
    </div>
  {:else}
    <div class="empty-state">
      <p>
        Enter characters above to see their stroke order
        animations.
      </p>
      <p class="empty-state-hint">
        The app uses the HanziWriter CDN to fetch character
        data automatically.
      </p>
    </div>
  {/if}

  <!-- Modal -->
  {#if showModal}
    <div
      class="modal-overlay"
      on:click={handleModalClick}
      on:keydown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`Stroke order for character ${selectedChar}`}
      tabindex="-1"
      transition:fade={{ duration: 200 }}
    >
      <div
        class="modal-content"
        transition:scale={{ duration: 200 }}
      >
        <button
          class="modal-close"
          on:click={closeModal}
          type="button"
          aria-label="Close modal"
        >
          ×
        </button>

        <div class="modal-header">
          <span class="modal-character" aria-hidden="true"
            >{selectedChar}</span
          >
          <span class="modal-unicode">
            U+{selectedChar
              .codePointAt(0)
              ?.toString(16)
              .toUpperCase()
              .padStart(4, "0")}
          </span>
        </div>

        <div class="modal-animation-container">
          <div
            id={`modal-char-${selectedGlobalIndex}`}
            class="modal-character-container"
            aria-label={`Stroke order animation for ${selectedChar}`}
            role="img"
          ></div>
        </div>

        <div class="modal-controls">
          <button
            class="modal-animate-btn"
            on:click={() => {
              const writer =
                modalWriters[
                  `modal-char-${selectedGlobalIndex}`
                ];
              if (writer) {
                writer.animateCharacter();
              } else {
                const newWriter = initializeModalWriter(
                  selectedGlobalIndex,
                  selectedChar
                );
                if (newWriter) {
                  setTimeout(
                    () => newWriter.animateCharacter(),
                    50
                  );
                }
              }
            }}
            type="button"
          >
            ▶ Replay Animation
          </button>
        </div>

        <div class="modal-info">
          <p>
            Click on the character to see the stroke order
            animation.
          </p>
          <p>The red color shows the radical component.</p>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      sans-serif;
    outline: none;
  }

  h1 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  /* Input Section Styles */
  .input-section {
    max-width: 600px;
    margin: 0 auto 3rem;
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .input-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2d3748;
  }

  .input-wrapper {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .character-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  .character-input:focus {
    outline: none;
    border-color: #4299e1;
  }

  .character-input:disabled {
    background: #edf2f7;
    cursor: not-allowed;
  }

  .submit-btn {
    background: #4299e1;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .submit-btn:hover:not(:disabled) {
    background: #3182ce;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
  }

  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-btn:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }

  .submit-btn:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .examples {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .examples-label {
    color: #718096;
    font-size: 0.9rem;
  }

  .example-btn {
    background: #edf2f7;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    color: #2d3748;
  }

  .example-btn:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  .error-message {
    color: #e53e3e;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fff5f5;
    border-radius: 0.25rem;
  }

  .input-hint {
    color: #718096;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  /* Results Section */
  .results-section {
    margin-top: 2rem;
  }

  .subtitle {
    text-align: center;
    color: #718096;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .animate-btn {
    background: #4299e1;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .animate-btn:hover:not(:disabled) {
    background: #3182ce;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);
  }

  .animate-btn:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }

  .clear-btn {
    background: #fc8181;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .clear-btn:hover {
    background: #f56565;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(245, 101, 101, 0.2);
  }

  .clear-btn:focus-visible {
    outline: 2px solid #fc8181;
    outline-offset: 2px;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #718096;
    background: #f7fafc;
    border-radius: 1rem;
    font-size: 1.1rem;
  }

  .empty-state-hint {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    color: #a0aec0;
  }

  /* Grid Styles */
  .characters-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 2rem;
    justify-items: center;
    margin-bottom: 2rem;
  }

  .character-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
    width: 100%;
    max-width: 250px;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    cursor: pointer;
    border: none;
    text-align: left;
    font-family: inherit;
  }

  .character-card:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }

  .character-card:active:not(:disabled) {
    transform: translateY(-2px);
  }

  .character-card:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #f7fafc;
  }

  .character-card:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .character-header {
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }

  .character-main {
    font-size: 2rem;
    font-weight: 600;
    color: #2d3748;
  }

  .character-container-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 160px;
  }

  .character-container {
    width: 150px;
    height: 150px;
  }

  .char-info {
    text-align: center;
    font-size: 0.8rem;
    color: #718096;
    margin-top: 0.5rem;
    font-family: monospace;
  }

  .non-chinese-badge {
    display: block;
    color: #e53e3e;
    font-size: 0.7rem;
    margin-top: 0.25rem;
  }

  /* Pagination Styles */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    padding: 1rem;
    flex-wrap: wrap;
  }

  .page-btn {
    background: #edf2f7;
    color: #2d3748;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .page-btn:hover:not(:disabled) {
    background: #e2e8f0;
    transform: translateY(-2px);
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .page-info {
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
    padding: 0 0.5rem;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: white;
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #718096;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
    line-height: 1;
  }

  .modal-close:hover {
    background: #f7fafc;
    color: #2d3748;
    transform: rotate(90deg);
  }

  .modal-close:focus-visible {
    outline: 2px solid #4299e1;
    outline-offset: 2px;
  }

  .modal-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-right: 2rem;
  }

  .modal-character {
    font-size: 4rem;
    font-weight: 600;
    color: #2d3748;
    display: block;
    line-height: 1.2;
  }

  .modal-unicode {
    font-size: 0.9rem;
    color: #718096;
    font-family: monospace;
  }

  .modal-animation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    background: #f7fafc;
    border-radius: 1rem;
    padding: 1rem;
  }

  .modal-character-container {
    width: 300px;
    height: 300px;
  }

  .modal-controls {
    text-align: center;
    margin: 1.5rem 0;
  }

  .modal-animate-btn {
    background: #48bb78;
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .modal-animate-btn:hover {
    background: #38a169;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(72, 187, 120, 0.2);
  }

  .modal-animate-btn:focus-visible {
    outline: 2px solid #48bb78;
    outline-offset: 2px;
  }

  .modal-info {
    text-align: center;
    color: #718096;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
    margin-top: 0.5rem;
  }

  .modal-info p {
    margin: 0.25rem 0;
  }

  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }

    .input-wrapper {
      flex-direction: column;
    }

    .submit-btn {
      width: 100%;
    }

    .examples {
      justify-content: center;
    }

    .controls {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .animate-btn,
    .clear-btn {
      width: 100%;
      max-width: 300px;
    }

    .characters-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .character-card {
      max-width: 100%;
    }

    .modal-content {
      padding: 1.5rem;
    }

    .modal-character-container {
      width: 250px;
      height: 250px;
    }

    .modal-character {
      font-size: 3rem;
    }

    .pagination {
      gap: 0.25rem;
    }

    .page-btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }
</style>
