<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import mermaid from "mermaid";

  // Initialize Mermaid configuration
  mermaid.initialize({
    startOnLoad: false, // We'll manually render
    theme: "dark",
    securityLevel: "loose",
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      curve: "basis"
    },
    fontFamily: "inherit"
  });

  let container: HTMLDivElement;
  let mermaidCode: string;

  export { container as $$rendered };
  export let code: string;

  // Function to render mermaid
  async function renderMermaid() {
    if (!container || !code) return;

    try {
      // Clear previous content
      container.innerHTML = "";

      // Create a unique ID for this diagram
      const id =
        "mermaid-" +
        Math.random().toString(36).substr(2, 9);

      // Create the mermaid element
      const mermaidElement = document.createElement("div");
      mermaidElement.className = "mermaid";
      mermaidElement.textContent = code;
      mermaidElement.id = id;

      container.appendChild(mermaidElement);

      // Render the diagram
      const { svg } = await mermaid.render(id, code);
      mermaidElement.innerHTML = svg;
    } catch (error) {
      console.error("Mermaid rendering error:", error);
      if (container) {
        container.innerHTML = `
          <div class="mermaid-error bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded">
            <strong>Diagram Error:</strong> Failed to render flowchart.
            <details class="mt-2 text-sm">
              <summary>Technical details</summary>
              ${error instanceof Error ? error.message : String(error)}
            </details>
          </div>
        `;
      }
    }
  }

  onMount(() => {
    renderMermaid();
  });

  afterUpdate(() => {
    // Re-render if code changes
    if (mermaidCode !== code) {
      mermaidCode = code;
      renderMermaid();
    }
  });
</script>

<div class="mermaid-container my-6" bind:this={container}>
  <!-- Mermaid will be rendered here -->
</div>

<style>
  .mermaid-container {
    text-align: center;
    overflow: auto;
  }

  .mermaid {
    display: inline-block;
    margin: 0 auto;
  }

  .mermaid-error {
    font-family: system-ui, sans-serif;
  }
</style>
