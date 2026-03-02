<script lang="ts">
  import ArabicReader from "./ArabicReader.svelte";

  // Configuration
  let jsonPath =
    "/json/ar/Downton-Abbey_Cinema-Screenplays-db.json";
  let apiUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/analyze/arabic`
    : "http://localhost:5000/api/analyze/arabic";
</script>

<div class="page-container">
  <ArabicReader
    {jsonPath}
    {apiUrl}
    initialSection={0}
    initialParagraph={0}
    autoAnalyze={true}
  />
</div>

<style>
  .page-container {
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      #f5f7fa 0%,
      #e9ecef 100%
    );
    padding: 2rem;
  }
</style>
