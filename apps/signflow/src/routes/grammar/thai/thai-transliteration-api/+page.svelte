<script lang="ts">
  import ThaiReader from "./ThaiReader.svelte";

  // Configuration
  let jsonPath =
    "/json/th/Downton-Abbey_Cinema-Screenplays-db-th.json";
  let apiUrl = "http://localhost:5000/api/analyze/thai";
</script>

<div class="page-container">
  <ThaiReader
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
