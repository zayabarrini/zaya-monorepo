import { h as head, e as attr, i as escape_html, j as ensure_array_like } from "../../../../../chunks/vendor-svelte.js";
import "hanzi-writer";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let paginatedCharacters;
    let characterInput = "";
    let characters = [];
    let isLoading = false;
    let currentPage = 1;
    const charactersPerPage = 500;
    let totalPages = 0;
    function getGlobalIndex(localIndex) {
      return (currentPage - 1) * charactersPerPage + localIndex;
    }
    const exampleCharacters = ["你", "好", "中", "国", "爱"];
    function isChineseCharacter(char) {
      return /[\u4e00-\u9fff]/.test(char);
    }
    paginatedCharacters = characters.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);
    head("11jj37i", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Chinese Strokes - Character Input</title>`);
      });
    });
    $$renderer2.push(`<main class="container svelte-11jj37i" tabindex="0" role="main"><h1 class="svelte-11jj37i">Chinese Character Stroke Order</h1> <div class="input-section svelte-11jj37i"><label for="character-input" class="input-label svelte-11jj37i">Enter Chinese characters:</label> <div class="input-wrapper svelte-11jj37i"><input id="character-input" type="text"${attr("value", characterInput)} placeholder="e.g., 你好世界" class="character-input svelte-11jj37i"${attr("disabled", isLoading, true)}/> <button class="submit-btn svelte-11jj37i" type="button"${attr("disabled", isLoading, true)}>${escape_html("Show Stroke Order")}</button></div> <div class="examples svelte-11jj37i"><span class="examples-label svelte-11jj37i">Try examples:</span> <!--[-->`);
    const each_array = ensure_array_like(exampleCharacters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let char = each_array[$$index];
      $$renderer2.push(`<button class="example-btn svelte-11jj37i" type="button">${escape_html(char)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <p class="input-hint svelte-11jj37i">Enter any Chinese characters (simplified or
      traditional). The app will fetch stroke order data
      from the HanziWriter CDN automatically.</p></div> `);
    if (characters.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="results-section svelte-11jj37i"><p class="subtitle svelte-11jj37i">Total characters: ${escape_html(characters.length)} • Page ${escape_html(currentPage)}
        of ${escape_html(totalPages)}</p> <div class="controls svelte-11jj37i"><button class="animate-btn svelte-11jj37i" type="button"${attr("disabled", paginatedCharacters.length === 0 || isLoading, true)}>▶ Animate Current Page (${escape_html(paginatedCharacters.length)}
          characters)</button> <button class="clear-btn svelte-11jj37i" type="button">Clear All</button></div> <div class="characters-grid svelte-11jj37i"><!--[-->`);
      const each_array_1 = ensure_array_like(paginatedCharacters);
      for (let localIndex = 0, $$length = each_array_1.length; localIndex < $$length; localIndex++) {
        let char = each_array_1[localIndex];
        const globalIndex = getGlobalIndex(localIndex);
        const isChinese = isChineseCharacter(char);
        $$renderer2.push(`<button class="character-card svelte-11jj37i" type="button"${attr("aria-label", `View stroke order for character ${char}`)}${attr("disabled", !isChinese, true)}><div class="character-header svelte-11jj37i"><span class="character-main svelte-11jj37i" aria-hidden="true">${escape_html(char)}</span></div> <div class="character-container-wrapper svelte-11jj37i"><div${attr("id", `char-${globalIndex}`)} class="character-container svelte-11jj37i"${attr("aria-label", `Stroke order animation for ${char}`)} role="img"></div></div> <div class="char-info svelte-11jj37i">${escape_html(char)} • ${escape_html(globalIndex + 1)}/${escape_html(characters.length)} •
              U+${escape_html(char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0"))} `);
        if (!isChinese) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="non-chinese-badge svelte-11jj37i">(non-Chinese)</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="empty-state svelte-11jj37i"><p>Enter characters above to see their stroke order
        animations.</p> <p class="empty-state-hint svelte-11jj37i">The app uses the HanziWriter CDN to fetch character
        data automatically.</p></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
