<svelte:head>
  <title>Doubt in Chinese with transliteration</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <link
    rel="stylesheet"
    href="/css/styles-multilingual.css"
  />
</svelte:head>

<section class="titlepage">
  <div class="calibre2">Jimmy? Come on.</div>

  <div class="calibre2 chinese-block" lang="zh">
    <div class="chinese-dual-display">
      <div class="clean-version">吉米？快点。</div>
      <div class="transliterated-version">
        <ruby class="chinese n">
          <span class="syntax-label">n</span>
          <span class="word-token n">吉米</span>
          <rt class="pinyin">jí mǐ</rt>
        </ruby>
        <span class="punctuation-token">？</span>
        <ruby class="chinese adv">
          <span class="syntax-label">adv</span>
          <span class="word-token adv">快点</span>
          <rt class="pinyin">kuài diǎn</rt>
        </ruby>
        <span class="punctuation-token">。</span>
      </div>
    </div>
  </div>

  <div class="calibre2">You're serving today.</div>

  <div class="calibre2 chinese-block" lang="zh">
    <div class="chinese-dual-display">
      <div class="clean-version">你今天正在服役。</div>
      <div class="transliterated-version">
        <ruby class="chinese r">
          <span class="syntax-label">r</span>
          <span class="word-token r">你</span>
          <rt class="pinyin">nǐ</rt>
        </ruby>
        <ruby class="chinese x">
          <span class="syntax-label">x</span>
          <span class="word-token x">今天</span>
          <rt class="pinyin">jīn tiān</rt>
        </ruby>
        <ruby class="chinese x">
          <span class="syntax-label">x</span>
          <span class="word-token x">正在</span>
          <rt class="pinyin">zhèng zài</rt>
        </ruby>
        <ruby class="chinese n">
          <span class="syntax-label">n</span>
          <span class="word-token n">服役</span>
          <rt class="pinyin">fú yì</rt>
        </ruby>
        <span class="punctuation-token">。</span>
      </div>
    </div>
  </div>

  <div class="calibre2">Christine?</div>
</section>

<style>
  /* Add minimal local styles to ensure display */
  .chinese-block {
    color: #00557f;
  }

  .titlepage {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
  }

  .calibre2 {
    margin: 1rem 0;
    line-height: 1.6;
  }

  .unnumbered {
    border-bottom: 1px solid #ccc;
    margin-bottom: 2rem;
  }

  /* Ruby annotation styling */
  ruby {
    ruby-align: center;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    vertical-align: top;
  }

  rt {
    font-size: 0.7rem;
    color: #666;
  }

  .syntax-label {
    font-size: 0.6rem;
    color: #00557f;
    background: #e6f3ff;
    padding: 2px 4px;
    border-radius: 4px;
  }
</style>
