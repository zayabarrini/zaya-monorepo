<!-- src/routes/grammar/chinese/chinese-transliteration/+page.svelte -->
<script>
  import ChineseReader from "./ChineseReader-a.svelte";
  import { onMount } from "svelte";

  let jsonExists = true;
  let mounted = false;

  onMount(async () => {
    mounted = true;
    // Check if the JSON file exists
    try {
      const response = await fetch(
        "/json/ch/epub_content_web-doubt.json"
      );
      jsonExists = response.ok;
    } catch {
      jsonExists = false;
    }
  });
</script>

<svelte:head>
  <title>Chinese Transliteration Reader</title>
  <meta
    name="description"
    content="Read Chinese text with pinyin and grammatical annotations"
  />
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Playball&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Roboto+Condensed:wght@300;400;700&family=Open+Sans:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Animated background blobs (only shown after mount to avoid transition flicker) -->
{#if mounted}
  <div class="background-blobs" aria-hidden="true"></div>
{/if}

<div class="page-container">
  <div class="header-content">
    <h1>
      <span class="chinese-ornament">文</span>
      Chinese Reader with Transliteration
      <span class="chinese-ornament">语</span>
    </h1>
    <p class="subhead">
      Immerse yourself in classical Chinese with pinyin and
      grammar notes
    </p>
  </div>

  {#if jsonExists}
    <ChineseReader />
  {:else}
    <div class="notice-card">
      <div class="notice-icon">📖</div>
      <h2>No Data Found</h2>
      <p class="notice-message">
        Please run the EPUB converter script to generate the
        required JSON file:
      </p>
      <div class="code-block">
        <pre><code
            >python convert_epub_to_json.py your_book.epub</code
          ></pre>
        <button
          class="copy-button"
          on:click={() =>
            navigator.clipboard?.writeText(
              "python convert_epub_to_json.py your_book.epub"
            )}
          title="Copy to clipboard"
        >
          📋
        </button>
      </div>
      <p class="file-path">
        Expected location: <code class="inline-code"
          >/static/grammar/chinese/chinese-transliteration/epub_content_web.json</code
        >
      </p>
      <div class="notice-footer">
        <span class="tip"
          >💡 Tip: Place your EPUB file in the project root
          and run the command above.</span
        >
      </div>
    </div>
  {/if}
</div>

<style>
  /* Import the blob background logic from your existing CSS */
  :global(body) {
    margin: 0;
    font-family: "Lora", serif;
    background-color: var(--background-color);
    color: var(--text-color);
    transition:
      background-color 0.3s ease,
      color 0.2s ease;
    min-height: 100vh;
  }

  .background-blobs {
    position: fixed;
    inset: -20%;
    z-index: -1;
    background:
      radial-gradient(
        700px at 20% 30%,
        rgba(145, 71, 108, 0.35),
        transparent 60%
      ),
      radial-gradient(
        600px at 80% 70%,
        rgba(62, 151, 92, 0.3),
        transparent 65%
      ),
      radial-gradient(
        500px at 60% 20%,
        rgba(164, 20, 180, 0.28),
        transparent 70%
      ),
      var(--background-color);
    filter: blur(120px);
    animation: float 30s ease-in-out infinite;
    pointer-events: none;
  }

  /* Dark mode adjustments for blobs — enhanced via CSS variables */
  :global(.dark) .background-blobs {
    background:
      radial-gradient(
        700px at 20% 30%,
        color-mix(in srgb, #91476c 38%, transparent),
        transparent 60%
      ),
      radial-gradient(
        600px at 80% 70%,
        color-mix(in srgb, #3e975c 32%, transparent),
        transparent 65%
      ),
      radial-gradient(
        500px at 60% 20%,
        color-mix(in srgb, #a414b4 30%, transparent),
        transparent 70%
      ),
      var(--background-color);
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(-2%, -1%) scale(1.02);
    }
    50% {
      transform: translate(1%, -2%) scale(1.01);
    }
    75% {
      transform: translate(-1%, 2%) scale(0.99);
    }
  }

  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 4em;
    padding: 2rem 1.5rem 4rem;
    position: relative;
    z-index: 1;
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header-content {
    text-align: center;
    margin-bottom: 3rem;
  }

  h1 {
    font-family: "Playball", cursive;
    font-size: clamp(2.2rem, 8vw, 3.5rem);
    font-weight: 400;
    margin: 0.5rem 0 0.25rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    text-shadow: 0 4px 12px rgba(var(--blob-1), 0.2);
  }

  .chinese-ornament {
    font-family: "Noto Serif SC", "Lora", serif;
    font-size: 1.2em;
    background: linear-gradient(
      135deg,
      rgba(var(--blob-1), 0.2),
      rgba(var(--blob-3), 0.2)
    );
    padding: 0.2rem 1rem;
    border-radius: 60px;
    border: 1px solid rgba(var(--blob-2), 0.3);
    backdrop-filter: blur(4px);
    display: inline-block;
    line-height: 1.4;
  }

  .subhead {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.5px;
    color: var(--text-color);
    opacity: 0.8;
    max-width: 700px;
    margin: 0 auto;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(
      90deg,
      rgba(var(--blob-1), 0.3),
      rgba(var(--blob-3), 0.3)
    );
    border-image-slice: 1;
    padding-bottom: 1rem;
  }

  /* Notice card when JSON missing — elegant and modern */
  .notice-card {
    background: var(--background-color);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(var(--blob-1), 0.25);
    border-radius: 2rem;
    padding: 3rem 2.5rem;
    max-width: 800px;
    margin: 2rem auto;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition:
      transform 0.2s ease,
      box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .notice-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 20% 30%,
        rgba(var(--blob-1), 0.15),
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(var(--blob-2), 0.12),
        transparent 55%
      );
    pointer-events: none;
  }

  :global(.dark) .notice-card {
    background: rgba(34, 21, 35, 0.8);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .notice-icon {
    font-size: 4.5rem;
    line-height: 1;
    margin-bottom: 0.5rem;
    filter: drop-shadow(
      0 8px 12px rgba(var(--blob-2), 0.4)
    );
    animation: gentlePulse 3s infinite ease-in-out;
  }

  @keyframes gentlePulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.03);
    }
  }

  .notice-card h2 {
    font-family: "Playball", cursive;
    font-size: 2.5rem;
    font-weight: 400;
    margin: 0 0 0.5rem;
    color: var(--text-color);
  }

  .notice-message {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--text-color);
    opacity: 0.9;
  }

  .code-block {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 60px;
    padding: 0.25rem 0.25rem 0.25rem 1.5rem;
    margin: 2rem auto;
    border: 1px solid rgba(var(--blob-1), 0.3);
    max-width: fit-content;
  }

  :global(.dark) .code-block {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .code-block pre {
    margin: 0;
    font-family: "Roboto Condensed", monospace;
    font-size: 1rem;
    background: transparent;
    color: var(--text-color);
  }

  .code-block code {
    background: transparent;
    padding: 0;
  }

  .copy-button {
    background: rgba(var(--blob-1), 0.15);
    border: 1px solid rgba(var(--blob-2), 0.4);
    border-radius: 40px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1.25rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
  }

  .copy-button:hover {
    background: rgba(var(--blob-1), 0.3);
    transform: scale(1.05);
    border-color: rgba(var(--blob-3), 0.5);
  }

  .file-path {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 1rem;
    margin: 1.5rem 0 0.5rem;
    word-break: break-word;
  }

  .inline-code {
    background: rgba(var(--blob-2), 0.15);
    padding: 0.2rem 0.6rem;
    border-radius: 30px;
    font-size: 0.9em;
    border: 1px solid rgba(var(--blob-1), 0.2);
    display: inline-block;
    margin: 0.5rem 0;
  }

  .notice-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px dashed rgba(var(--blob-1), 0.3);
  }

  .tip {
    font-family: "Lora", serif;
    font-style: italic;
    font-size: 1rem;
    opacity: 0.8;
    display: inline-block;
    background: rgba(var(--blob-3), 0.1);
    padding: 0.4rem 1.2rem;
    border-radius: 60px;
  }

  /* Responsive fine-tuning */
  @media (max-width: 640px) {
    .page-container {
      padding: 1.5rem 1rem 3rem;
    }

    h1 {
      flex-direction: column;
      gap: 0.25rem;
    }

    .chinese-ornament {
      padding: 0.1rem 0.8rem;
    }

    .notice-card {
      padding: 2rem 1.5rem;
      border-radius: 1.5rem;
    }

    .code-block {
      flex-wrap: wrap;
      padding: 0.5rem;
      border-radius: 30px;
    }

    .code-block pre {
      font-size: 0.9rem;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }

  /* Dark mode fine-tuning (some additional safety) */
  :global(.dark) .code-block code {
    color: #e5e7eb;
  }

  :global(.dark) .copy-button {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  :global(.dark) .copy-button:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Animation for the ChineseReader integration */
  :global(.chinese-reader-enter) {
    animation: slideUp 0.5s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
