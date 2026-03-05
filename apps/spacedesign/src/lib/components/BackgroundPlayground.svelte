<!-- src/lib/components/BackgroundPlayground.svelte
<script>
  import {
    getBackground,
    colorSchemes,
    BackgroundType,
    backgroundAnimations
  } from "$lib/utils/background";
  import { colors } from "$lib/utils/colors";

  export let currentType: BackgroundType = "blobs";
  export let intensity: number = 0.3;
  export let scheme: keyof typeof colorSchemes = "sunset";

  $: backgroundStyle = getBackground(
    currentType,
    {
      primary: colorSchemes[scheme].primary,
      secondary: colorSchemes[scheme].secondary,
      tertiary: colorSchemes[scheme].tertiary,
      background: colors.inkBlack
    },
    intensity
  );
</script>

<div class="playground">
  <div
    class="preview"
    style="background: {backgroundStyle};"
  >
    <div class="controls">
      <label>
        Background Type:
        <select bind:value={currentType}>
          <option value="blobs">Blobs</option>
          <option value="waves">Waves</option>
          <option value="grid">Grid</option>
          <option value="dots">Dots</option>
          <option value="noise">Noise</option>
          <option value="circuit">Circuit</option>
          <option value="topography">Topography</option>
          <option value="aurora">Aurora</option>
          <option value="stripe">Stripe</option>
          <option value="vignette">Vignette</option>
          <option value="morph">Morph</option>
          <option value="liquid">Liquid</option>
        </select>
      </label>

      <label>
        Color Scheme:
        <select bind:value={scheme}>
          <option value="sunset">Sunset</option>
          <option value="ocean">Ocean</option>
          <option value="forest">Forest</option>
          <option value="desert">Desert</option>
          <option value="volcanic">Volcanic</option>
          <option value="teal">Teal</option>
          <option value="copper">Copper</option>
        </select>
      </label>

      <label>
        Intensity: {intensity.toFixed(2)}
        <input
          type="range"
          bind:value={intensity}
          min="0"
          max="1"
          step="0.05"
        />
      </label>
    </div>
  </div>
</div>

<style>
  .playground {
    width: 100%;
    height: 100vh;
  }

  .preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 2rem;
    transition: background 0.3s ease;
  }

  .controls {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    color: var(--vanilla-custard);
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    border: 1px solid var(--golden-orange);
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  select,
  input {
    background: var(--dark-teal);
    color: var(--vanilla-custard);
    border: 1px solid var(--golden-orange);
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-family: inherit;
  }

  input[type="range"] {
    width: 200px;
  }
</style> -->
