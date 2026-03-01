<!-- JapaneseStrokeOrder.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  export let character: string = '';
  export let width: number = 200;
  export let height: number = 200;
  export let showStrokeNumber: boolean = true;
  export let animationSpeed: number = 1.0; // 1.0 = normal speed
  export let strokeColor: string = '#333333';
  export let strokeWidth: number = 2;
  export let numberColor: string = '#ff6b6b';
  export let autoplay: boolean = true;

  let svgContent: string = '';
  let loading: boolean = false;
  let error: string | null = null;
  let strokes: SVGPathElement[] = [];
  let currentStroke: number = -1;
  let isPlaying: boolean = false;
  let animationInterval: any = null;
  let svgContainer: HTMLDivElement;

  // Get Unicode code point for the character
  $: charCode = character ? character.codePointAt(0)?.toString(16).toLowerCase() : '';
  
  // KanjiVG uses 5-digit hex codes with leading zeros
  $: kanjiVGID = charCode ? charCode.padStart(5, '0') : '';

  // Fetch stroke data when character changes
  $: if (character && character.length === 1) {
    fetchStrokeData();
  }

  onMount(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  });

  async function fetchStrokeData() {
    if (!character || character.length !== 1) {
      error = 'Please enter a single character';
      return;
    }

    try {
      loading = true;
      error = null;
      
      // KanjiVG repository URL
      const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${kanjiVGID}.svg`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Character not found: ${character}`);
      }
      
      const svgText = await response.text();
      
      // Parse and clean the SVG
      svgContent = processSVG(svgText);
      
      // Reset stroke animation
      resetAnimation();
      
    } catch (err) {
      error = err.message;
      console.error('Error fetching stroke data:', err);
      svgContent = '';
    } finally {
      loading = false;
    }
  }

  function processSVG(svgText: string): string {
    // Create a DOM parser to manipulate the SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    const svg = doc.querySelector('svg');
    
    if (!svg) return '';
    
    // Set viewBox and dimensions
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', '0 0 109 109');
    
    // Remove any existing styles that might interfere
    const style = svg.querySelector('style');
    if (style) style.remove();
    
    // Add classes to strokes for animation
    const paths = svg.querySelectorAll('path');
    paths.forEach((path, index) => {
      path.classList.add('stroke', `stroke-${index + 1}`);
      path.setAttribute('data-stroke-number', (index + 1).toString());
      path.style.stroke = strokeColor;
      path.style.strokeWidth = strokeWidth.toString();
      path.style.fill = 'none';
      path.style.strokeLinecap = 'round';
      path.style.strokeLinejoin = 'round';
      
      // Hide all strokes initially for animation
      if (autoplay) {
        path.style.opacity = '0';
      }
    });
    
    return svg.outerHTML;
  }

  function resetAnimation() {
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    currentStroke = -1;
    isPlaying = false;
    
    // Hide all strokes
    if (svgContainer) {
      const paths = svgContainer.querySelectorAll('path.stroke');
      paths.forEach(path => {
        (path as SVGPathElement).style.opacity = '0';
      });
    }
    
    if (autoplay) {
      playAnimation();
    }
  }

  function playAnimation() {
    if (!svgContainer) return;
    
    const paths = Array.from(svgContainer.querySelectorAll('path.stroke')) as SVGPathElement[];
    strokes = paths;
    
    if (strokes.length === 0) return;
    
    isPlaying = true;
    currentStroke = -1;
    
    // Hide all strokes
    strokes.forEach(path => {
      path.style.opacity = '0';
    });
    
    // Show strokes one by one
    const baseDelay = 300 / animationSpeed; // milliseconds per stroke
    
    function showNextStroke() {
      currentStroke++;
      if (currentStroke < strokes.length) {
        strokes[currentStroke].style.opacity = '1';
        
        // Add a little highlight effect
        strokes[currentStroke].style.transition = 'opacity 0.3s ease';
        
        if (currentStroke < strokes.length - 1) {
          animationInterval = setTimeout(showNextStroke, baseDelay);
        } else {
          isPlaying = false;
        }
      }
    }
    
    showNextStroke();
  }

  function pauseAnimation() {
    if (animationInterval) {
      clearTimeout(animationInterval);
      animationInterval = null;
      isPlaying = false;
    }
  }

  function showAllStrokes() {
    pauseAnimation();
    if (svgContainer) {
      const paths = svgContainer.querySelectorAll('path.stroke');
      paths.forEach(path => {
        (path as SVGPathElement).style.opacity = '1';
      });
      currentStroke = strokes.length - 1;
    }
  }

  function showStroke(index: number) {
    pauseAnimation();
    if (svgContainer && index >= 0 && index < strokes.length) {
      const paths = svgContainer.querySelectorAll('path.stroke');
      paths.forEach((path, i) => {
        (path as SVGPathElement).style.opacity = i <= index ? '1' : '0';
      });
      currentStroke = index;
    }
  }

  function getStrokeNumberPosition(path: SVGPathElement): { x: number; y: number } {
    // Get the first point of the path for number placement
    const bbox = path.getBBox();
    return {
      x: bbox.x + 5,
      y: bbox.y + 15
    };
  }
</script>

<div class="stroke-order-container">
  {#if loading}
    <div class="stroke-loading">
      <div class="spinner-small"></div>
      <span>Loading stroke data...</span>
    </div>
  {:else if error}
    <div class="stroke-error">
      <span class="error-icon">⚠️</span>
      <span>{error}</span>
    </div>
  {:else if svgContent}
    <div class="stroke-display">
      <div class="character-header">
        <span class="character-large">{character}</span>
        <span class="character-info">
          {#if strokes.length > 0}
            {strokes.length} strokes
          {/if}
        </span>
      </div>
      
      <div 
        class="svg-container"
        bind:this={svgContainer}
        on:mouseenter={() => pauseAnimation()}
        on:mouseleave={() => autoplay && !isPlaying && playAnimation()}
      >
        {@html svgContent}
        
        <!-- Stroke numbers overlay -->
        {#if showStrokeNumber && svgContainer}
          {#each strokes as stroke, index}
            {@const bbox = stroke.getBBox()}
            {#if bbox}
              <div 
                class="stroke-number"
                style="left: {bbox.x + 5}px; top: {bbox.y + 15}px;"
                data-active={index <= currentStroke}
              >
                {index + 1}
              </div>
            {/if}
          {/each}
        {/if}
      </div>
      
      <div class="stroke-controls">
        <button 
          class="control-button" 
          on:click={resetAnimation}
          disabled={!strokes.length}
          title="Replay"
        >
          ⏮️
        </button>
        
        {#if isPlaying}
          <button 
            class="control-button" 
            on:click={pauseAnimation}
            disabled={!strokes.length}
            title="Pause"
          >
            ⏸️
          </button>
        {:else}
          <button 
            class="control-button" 
            on:click={playAnimation}
            disabled={!strokes.length}
            title="Play"
          >
            ▶️
          </button>
        {/if}
        
        <button 
          class="control-button" 
          on:click={showAllStrokes}
          disabled={!strokes.length}
          title="Show all"
        >
          ⏺️
        </button>
        
        <div class="stroke-slider">
          <input 
            type="range" 
            min="-1" 
            max={strokes.length - 1} 
            bind:value={currentStroke}
            on:input={(e) => showStroke(parseInt(e.currentTarget.value))}
            disabled={!strokes.length}
          />
          <span class="stroke-indicator">
            {currentStroke + 1}/{strokes.length}
          </span>
        </div>
        
        <div class="speed-control">
          <label for="speed">Speed:</label>
          <select 
            id="speed" 
            bind:value={animationSpeed}
            on:change={() => {
              if (isPlaying) {
                pauseAnimation();
                playAnimation();
              }
            }}
          >
            <option value={0.5}>0.5x</option>
            <option value={1.0}>1.0x</option>
            <option value={1.5}>1.5x</option>
            <option value={2.0}>2.0x</option>
          </select>
        </div>
      </div>
    </div>
  {:else}
    <div class="stroke-placeholder">
      <span class="placeholder-icon">✍️</span>
      <span>Enter a Japanese character to see stroke order</span>
    </div>
  {/if}
</div>

<style>
  .stroke-order-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .stroke-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 2rem;
    color: #666;
    background: #f8f9fa;
  }

  .spinner-small {
    width: 20px;
    height: 20px;
    border: 2px solid #e1e5e9;
    border-top: 2px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .stroke-error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #ffebee;
    color: #c62828;
    border-radius: 8px;
    margin: 1rem;
  }

  .error-icon {
    font-size: 1.2rem;
  }

  .stroke-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    color: #666;
    text-align: center;
  }

  .placeholder-icon {
    font-size: 3rem;
    opacity: 0.5;
  }

  .stroke-display {
    padding: 1.5rem;
  }

  .character-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }

  .character-large {
    font-size: 2.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-family: 'MS Gothic', 'Hiragino Sans', 'Meiryo', sans-serif;
  }

  .character-info {
    font-size: 0.9rem;
    color: #666;
    background: #f0f0f0;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
  }

  .svg-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    min-height: 220px;
    border: 1px solid #e1e5e9;
  }

  .svg-container :global(svg) {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .svg-container :global(path.stroke) {
    transition: opacity 0.3s ease;
  }

  .svg-container :global(path.stroke:hover) {
    stroke: #ff6b6b !important;
    stroke-width: 3 !important;
    cursor: pointer;
  }

  .stroke-number {
    position: absolute;
    font-size: 0.8rem;
    font-weight: 600;
    color: #ff6b6b;
    background: white;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #ff6b6b;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .stroke-number[data-active="true"] {
    background: #ff6b6b;
    color: white;
  }

  .stroke-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
    flex-wrap: wrap;
  }

  .control-button {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: white;
    color: #2c3e50;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .control-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
  }

  .control-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .stroke-slider {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 200px;
  }

  .stroke-slider input[type="range"] {
    flex: 1;
    height: 4px;
    -webkit-appearance: none;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    outline: none;
  }

  .stroke-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    border: 2px solid #667eea;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .stroke-slider input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    background: #667eea;
  }

  .stroke-indicator {
    font-size: 0.9rem;
    color: #666;
    min-width: 60px;
    text-align: center;
  }

  .speed-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }

  .speed-control select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #e1e5e9;
    border-radius: 4px;
    background: white;
    color: #2c3e50;
    cursor: pointer;
    outline: none;
  }

  .speed-control select:hover {
    border-color: #667eea;
  }

  @media (max-width: 768px) {
    .stroke-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .control-button {
      width: 40px;
      height: 40px;
    }

    .stroke-slider {
      min-width: auto;
    }

    .speed-control {
      justify-content: space-between;
    }
  }
</style>