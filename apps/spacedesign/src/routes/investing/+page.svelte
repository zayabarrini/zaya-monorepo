<!-- src/routes/investing/+page.svelte -->
<script>
  import VerticalSlides from "$lib/components/VerticalSlides.svelte";
  import BackgroundPlayground from "$lib/components/BackgroundPlayground.svelte";
  import { browser } from "$app/environment";

  // SEO metadata
  export const prerender = true;
</script>

<svelte:head>
  <title>The Zayas Project - Investment Presentation</title>
  <meta
    name="description"
    content="A class migration architecture: Building the bridge from Precariat to Owning Class"
  />
  <meta
    property="og:title"
    content="The Zayas Project - Investment Presentation"
  />
  <meta
    property="og:description"
    content="A class migration architecture: Building the bridge from Precariat to Owning Class"
  />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- Loading state for SSR -->
{#if !browser}
  <div class="ssr-loading">
    <div class="loading-content">
      <h1>The Zayas Project</h1>
      <p>Loading investment presentation...</p>
      <div class="loading-spinner"></div>
    </div>
  </div>
{:else}
  <main>
    <!-- <BackgroundPlayground /> -->
    <VerticalSlides />
  </main>
{/if}

<style>
  .ssr-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(
      135deg,
      #001219ff,
      #005f73ff
    );
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e9d8a6ff;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  .loading-content {
    text-align: center;
    animation: pulse 2s infinite;
  }

  .loading-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ee9b00ff;
  }

  .loading-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #94d2bdff;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #005f73ff;
    border-top-color: #ee9b00ff;
    border-radius: 50%;
    margin: 0 auto;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    .loading-content h1 {
      font-size: 1.8rem;
    }

    .loading-content p {
      font-size: 1rem;
    }
  }
</style>
