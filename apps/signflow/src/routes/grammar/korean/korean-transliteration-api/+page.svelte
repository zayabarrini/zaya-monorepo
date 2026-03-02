<script lang="ts">
  import KoreanReader from "./KoreanReader.svelte";

  // Configuration
  let jsonPath =
    "/json/ko/Downton-Abbey_Cinema-Screenplays.json";
  let apiUrl = "http://localhost:5000/api/analyze/korean";
</script>

<div class="page-container">
  <KoreanReader
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
