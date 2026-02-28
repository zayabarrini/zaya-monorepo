import { f as fallback, b as bind_props, h as head } from "../../../../../chunks/vendor-svelte.js";
function ChineseReader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentSection;
    let jsonPath = fallback($$props["jsonPath"], "/json/ch/epub_content_web-doubt.json");
    let initialSection = fallback($$props["initialSection"], 0);
    let initialParagraph = fallback($$props["initialParagraph"], 0);
    let showCleanVersion = fallback($$props["showCleanVersion"], true);
    let showAnnotations = fallback($$props["showAnnotations"], true);
    let showSyntaxLabels = fallback($$props["showSyntaxLabels"], true);
    let sections = [];
    let currentSectionIndex = initialSection;
    let currentParagraphIndex = initialParagraph;
    currentSection = sections[currentSectionIndex];
    currentSection?.paragraphs[currentParagraphIndex];
    currentSectionIndex < sections.length - 1 || currentSection && currentParagraphIndex < currentSection.paragraphs.length - 1;
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-container svelte-d3gbyw"><div class="spinner svelte-d3gbyw"></div> <p class="svelte-d3gbyw">Loading Chinese reader...</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, {
      jsonPath,
      initialSection,
      initialParagraph,
      showCleanVersion,
      showAnnotations,
      showSyntaxLabels
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head("1ryagp6", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Chinese Transliteration Reader</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Read Chinese text with pinyin and grammatical annotations" class="svelte-1ryagp6"/> <link rel="preconnect" href="https://fonts.googleapis.com" class="svelte-1ryagp6"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" class="svelte-1ryagp6"/> <link href="https://fonts.googleapis.com/css2?family=Playball&amp;family=Lora:ital,wght@0,400;0,500;0,600;1,400&amp;family=Roboto+Condensed:wght@300;400;700&amp;family=Open+Sans:wght@400;600;700&amp;display=swap" rel="stylesheet" class="svelte-1ryagp6"/>`);
    });
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="page-container svelte-1ryagp6"><div class="header-content svelte-1ryagp6"><h1 class="svelte-1ryagp6"><span class="chinese-ornament svelte-1ryagp6">文</span> Chinese Reader with Transliteration <span class="chinese-ornament svelte-1ryagp6">语</span></h1> <p class="subhead svelte-1ryagp6">Immerse yourself in classical Chinese with pinyin and
      grammar notes</p></div> `);
    {
      $$renderer2.push("<!--[-->");
      ChineseReader($$renderer2, {});
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
