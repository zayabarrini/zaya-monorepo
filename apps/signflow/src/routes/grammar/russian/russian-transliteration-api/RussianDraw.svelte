<!-- /home/zaya/Downloads/Zayas/zaya-monorepo/apps/signflow/src/routes/grammar/chinese/chinese-transliteration-api/ChineseStrokeOrder.svelte -->

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import HanziWriter from "hanzi-writer";
  import { browser } from "$app/environment";

  export let character: string = "";
  export let width: number = 200;
  export let height: number = 200;
  export let strokeColor: string = "#2c3e50";
  export let radicalColor: string = "#e74c3c";
  export let showOutline: boolean = true;
  export let showCharacter: boolean = false;
  export let strokeAnimationSpeed: number = 1;
  export let delayBetweenStrokes: number = 80;
  export let autoplay: boolean = true;
  export let showStrokeNumber: boolean = false;
  export let strokeNumberColor: string = "#e67e22";
  export let strokeNumberSize: string = "12px";
  export let onComplete: () => void = () => {};

  let container: HTMLElement;
  let writer: any = null;
  let isLoading: boolean = false;
  let error: string | null = null;
  let writerId: string = `writer-${Math.random().toString(36).substr(2, 9)}`;

  // Initialize writer when component mounts or character changes
  onMount(() => {
    if (browser && character && container) {
      initializeWriter();
    }
    
    return () => {
      destroyWriter();
    };
  });

  // Re-initialize when character changes
  $: if (browser && character && container) {
    destroyWriter();
    initializeWriter();
  }

  function initializeWriter() {
    if (!character || character.length === 0) {
      error = "No character provided";
      return;
    }

    // Only handle single characters
    if (character.length > 1) {
      error = "Please provide a single character";
      return;
    }

    isLoading = true;
    error = null;

    try {
      // Clear container first
      container.innerHTML = "";

      // Create a unique ID for this instance
      const instanceId = `${writerId}-${Date.now()}`;
      
      // Create the writer
      writer = HanziWriter.create(container, character, {
        width,
        height,
        padding: 10,
        strokeColor,
        radicalColor,
        showOutline,
        showCharacter,
        strokeAnimationSpeed,
        delayBetweenStrokes,
        
        // Optional stroke number configuration
        ...(showStrokeNumber && {
          strokeNumberColor,
          strokeNumberSize,
          showStrokeNumbers: true
        })
      });

      // Auto-animate if enabled
      if (autoplay) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          if (writer) {
            writer.animateCharacter({
              onComplete: () => {
                onComplete();
              }
            });
          }
        }, 100);
      }

      isLoading = false;
    } catch (e) {
      console.error("Failed to initialize HanziWriter:", e);
      error = `Failed to load character: ${character}`;
      isLoading = false;
      
      // Show fallback
      if (container) {
        container.innerHTML = `
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #e53e3e; text-align: center; padding: 1rem;">
            <span style="font-size: 2rem; margin-bottom: 0.5rem;">${character}</span>
            <span style="font-size: 0.8rem;">Stroke order data not available</span>
          </div>
        `;
      }
    }
  }

  function destroyWriter() {
    if (writer) {
      try {
        if (typeof writer.destroy === "function") {
          writer.destroy();
        }
      } catch (e) {
        console.error("Failed to destroy writer:", e);
      }
      writer = null;
    }
  }

  // Public methods
  export function animate() {
    if (writer) {
      writer.animateCharacter({
        onComplete: () => {
          onComplete();
        }
      });
    }
  }

  export function pause() {
    if (writer && typeof writer.pauseAnimation === "function") {
      writer.pauseAnimation();
    }
  }

  export function resume() {
    if (writer && typeof writer.resumeAnimation === "function") {
      writer.resumeAnimation();
    }
  }

  export function setCharacter(newChar: string) {
    if (newChar !== character) {
      character = newChar;
    }
  }

  // Clean up on destroy
  onDestroy(() => {
    destroyWriter();
  });
</script>

<div class="stroke-order-container" style="width: {width}px; height: {height}px;">
  <!-- Loading State -->
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>
  <!-- Error State -->
  {:else if error}
    <div class="error-state">
      <span class="fallback-char">{character}</span>
      <span class="error-message">{error}</span>
    </div>
  <!-- Main Container -->
  {:else}
    <div 
      bind:this={container}
      class="stroke-order-canvas"
      style="width: {width}px; height: {height}px;"
      role="img"
      aria-label={`Stroke order animation for character ${character}`}
    ></div>
  {/if}
</div>

<style>
  .stroke-order-container {
    position: relative;
    background: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .stroke-order-canvas {
    display: block;
    background: white;
  }

  .loading-state {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    color: #666;
    font-size: 0.8rem;
    gap: 0.5rem;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #e2e8f0;
    border-top: 2px solid #c44536;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-state {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    color: #e53e3e;
    font-size: 0.8rem;
    text-align: center;
    gap: 0.5rem;
    padding: 1rem;
  }

  .fallback-char {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
  }

  .error-message {
    color: #e53e3e;
  }
</style>