<!-- /home/zaya/Downloads/Zayas/zaya-monorepo/apps/signflow/src/routes/grammar/chinese/chinese-transliteration-api/+page.svelte -->

<script lang="ts">
  import ChineseReader from "./ChineseReader.svelte";
  
  // Configuration
  let jsonPath = "/json/zh/epub_content_web-downton-db.json";
  let apiUrl = "http://localhost:5000/api/analyze/chinese";
</script>

<div class="page-container">
  <ChineseReader 
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
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    padding: 2rem;
  }
</style>