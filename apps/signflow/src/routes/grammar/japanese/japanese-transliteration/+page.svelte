<!-- /home/zaya/Downloads/Zayas/zaya-monorepo/apps/signflow/src/routes/grammar/japanese/japanese-transliteration/+page.svelte -->
<script lang="ts">
  import JapaneseReader from "./JapaneseReader.svelte";
  
  // You can override props here if needed
  let jsonPath = "/json/ja/epub_content_web-Downton-abbey.json";
  let apiUrl = "http://localhost:5000/api/analyze/japanese";
</script>

<div class="page-container">
  <JapaneseReader 
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
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
  }
</style>