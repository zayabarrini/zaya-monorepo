<script lang="ts">
  import HindiReader from "./HindiReader.svelte";

  // Configuration
  let jsonPath =
    "/json/hi/Downton-Abbey-Cinema-Screenplays-db-hi.json";
  let apiUrl = "http://localhost:5000/api/analyze/hindi";
</script>

<div class="page-container">
  <HindiReader
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
