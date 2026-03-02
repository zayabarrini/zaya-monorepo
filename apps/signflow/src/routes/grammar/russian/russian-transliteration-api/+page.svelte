<script lang="ts">
  import RussianReader from "./RussianReader.svelte";

  // Configuration
  let jsonPath =
    "/json/ru/Downton-Abbey_Cinema-Screenplays-db-ru.json";
  let apiUrl = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/analyze/russian`
    : "http://localhost:5000/api/analyze/russian";
</script>

<div class="page-container">
  <RussianReader
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
