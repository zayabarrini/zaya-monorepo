import { i as escape_html, e as attr, j as ensure_array_like } from "../../../../chunks/vendor-svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredTests;
    const languageTests = [
      {
        name: "Spanish",
        code: "es",
        text: "El rápido zorro marrón salta sobre el perro perezoso. Esta es una frase simple en español para pruebas."
      },
      {
        name: "French",
        code: "fr",
        text: "Le renard brun rapide saute par-dessus le chien paresseux. Ceci est une phrase simple en français pour les tests."
      },
      {
        name: "German",
        code: "de",
        text: "Der schnelle braune Fuchs springt über den faulen Hund. Dies ist ein einfacher deutscher Satz zum Testen."
      },
      {
        name: "Italian",
        code: "it",
        text: "La veloce volpe marrone salta sopra il cane pigro. Questa è una semplice frase italiana per test."
      },
      {
        name: "Portuguese",
        code: "pt",
        text: "A rápida raposa marrom salta sobre o cão preguiçoso. Esta é uma frase simples em português para teste."
      },
      {
        name: "Dutch",
        code: "nl",
        text: "De snelle bruine vos springt over de luie hond. Dit is een eenvoudige Nederlandse zin om te testen."
      },
      {
        name: "Swedish",
        code: "sv",
        text: "Den snabba bruna räven hoppar över den lata hunden. Detta är en enkel svensk mening för testning."
      },
      {
        name: "Danish",
        code: "da",
        text: "Den hurtige brune ræv hopper over den dovne hund. Dette er en simpel dansk sætning til test."
      },
      {
        name: "Norwegian",
        code: "no",
        text: "Den raske brune reven hopper over den late hunden. Dette er en enkel norsk setning for testing."
      },
      {
        name: "Finnish",
        code: "fi",
        text: "Nopea ruskea kettu hyppää laiska koiran yli. Tämä on yksinkertainen suomalainen testilause."
      },
      {
        name: "Polish",
        code: "pl",
        text: "Szybki brązowy lis przeskakuje nad leniwym psem. To jest proste polskie zdanie do testowania."
      },
      {
        name: "Czech",
        code: "cs",
        text: "Rychlá hnědá liška skáče přes líného psa. Toto je jednoduchá česká věta pro testování."
      },
      {
        name: "Hungarian",
        code: "hu",
        text: "A gyors barna róka átugrik a lusta kutya fölött. Ez egy egyszerű magyar mondat a teszteléshez."
      },
      {
        name: "Romanian",
        code: "ro",
        text: "Vulpea maro rapidă sare peste câinele leneș. Aceasta este o propoziție simplă în limba română pentru testare."
      },
      {
        name: "Turkish",
        code: "tr",
        text: "Hızlı kahverengi tilki tembel köpeğin üzerinden atlar. Bu test için basit bir Türkçe cümledir."
      },
      {
        name: "Russian",
        code: "ru",
        text: "Быстрая коричневая лиса прыгает через ленивую собаку. Это простое русское предложение для тестирования."
      },
      {
        name: "Japanese",
        code: "ja",
        text: "素早い茶色のキツネが怠け者の犬を飛び越えます。これはテスト用の簡単な日本語の文です。"
      },
      {
        name: "Chinese",
        code: "zh",
        text: "敏捷的棕色狐狸跳过懒狗。这是一个用于测试的简单中文句子。"
      },
      {
        name: "Korean",
        code: "ko",
        text: "재빠른 갈색 여우가 게으른 개를 뛰어넘습니다. 이것은 테스트를 위한 간단한 한국어 문장입니다."
      }
    ];
    let searchQuery = "";
    let selectedLanguage = "all";
    const languageCodes = ["all", ...new Set(languageTests.map((t) => t.code))];
    filteredTests = languageTests.filter((test) => {
      const matchesSearch = test.text.toLowerCase().includes(searchQuery.toLowerCase()) || test.name.toLowerCase().includes(searchQuery.toLowerCase()) || test.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguage === "all";
      return matchesSearch && matchesLanguage;
    });
    $$renderer2.push(`<main class="container svelte-11x9dyh"><div class="header svelte-11x9dyh"><h1 class="svelte-11x9dyh">🌐 Language Detection Test Phrases</h1> <p class="subtitle svelte-11x9dyh">Displaying ${escape_html(languageTests.length)} languages from the test
      suite</p></div> <div class="controls svelte-11x9dyh"><div class="search-box svelte-11x9dyh"><input type="text" placeholder="Search phrases, languages, or codes..."${attr("value", searchQuery)} class="svelte-11x9dyh"/></div> <div class="filter-box svelte-11x9dyh">`);
    $$renderer2.select(
      { value: selectedLanguage, class: "" },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(languageCodes);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let code = each_array[$$index];
          $$renderer3.option({ value: code }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(code === "all" ? "All Languages" : code.toUpperCase())}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-11x9dyh"
    );
    $$renderer2.push(`</div></div> <div class="stats svelte-11x9dyh">Showing ${escape_html(filteredTests.length)} of ${escape_html(languageTests.length)} languages</div> <div class="card-grid svelte-11x9dyh"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredTests);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let test = each_array_1[$$index_1];
      $$renderer2.push(`<div class="card svelte-11x9dyh"><div class="card-header svelte-11x9dyh"><span class="language-name svelte-11x9dyh">${escape_html(test.name)}</span> <span class="language-code svelte-11x9dyh">${escape_html(test.code)}</span></div> <div class="card-body svelte-11x9dyh"><p class="phrase svelte-11x9dyh">${escape_html(test.text)}</p></div> <div class="card-footer svelte-11x9dyh"><button class="copy-btn svelte-11x9dyh">📋 Copy Phrase</button></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filteredTests.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="no-results svelte-11x9dyh"><p>No matching languages found. Try adjusting your
        search.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}
export {
  _page as default
};
