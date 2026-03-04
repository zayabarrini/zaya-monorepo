<script>
  // Language test data extracted from the provided tests
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
    },
    {
      name: "Arabic",
      code: "ar",
      text: "الثعلب البني السريع يقفز فوق الكلب الكسول. هذه جملة بسيطة باللغة العربية للاختبار."
    },
    {
      name: "Hindi",
      code: "hi",
      text: "तेज़ भूरी लोमड़ी आलसी कुत्ते के ऊपर कूदती है। यह परीक्षण के लिए हिंदी में एक सरल वाक्य है।"
    },
    {
      name: "Thai",
      code: "th",
      text: "สุนัขจิ้งจอกสีน้ำตาลที่รวดเร็วกระโดดข้ามสุนัขขี้เกียจ นี่คือประโยคภาษาไทยอย่างง่ายสำหรับการทดสอบ"
    },
    {
      name: "Hebrew",
      code: "he",
      text: "השועל החום המהיר קופץ מעל הכלב העצלן. זהו משפט פשוט בעברית לבדיקה."
    },
    {
      name: "Indonesian",
      code: "id",
      text: "Rubah coklat yang cepat melompati anjing yang malas. Ini adalah kalimat sederhana dalam bahasa Indonesia untuk pengujian."
    }
  ];

  let searchQuery = "";
  let selectedLanguage = "all";

  // Get unique language codes for filter
  const languageCodes = [
    "all",
    ...new Set(languageTests.map((t) => t.code))
  ];

  // Filter tests based on search and language filter
  $: filteredTests = languageTests.filter((test) => {
    const matchesSearch =
      test.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      test.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      test.code
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "all" ||
      test.code === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });
</script>

<main class="container">
  <div class="header">
    <h1>🌐 Language Detection Test Phrases</h1>
    <p class="subtitle">
      Displaying {languageTests.length} languages from the test
      suite
    </p>
  </div>

  <div class="controls">
    <div class="search-box">
      <input
        type="text"
        placeholder="Search phrases, languages, or codes..."
        bind:value={searchQuery}
      />
    </div>

    <div class="filter-box">
      <select bind:value={selectedLanguage}>
        {#each languageCodes as code}
          <option value={code}>
            {code === "all"
              ? "All Languages"
              : code.toUpperCase()}
          </option>
        {/each}
      </select>
    </div>
  </div>

  <div class="stats">
    Showing {filteredTests.length} of {languageTests.length} languages
  </div>

  <div class="card-grid">
    {#each filteredTests as test (test.code)}
      <div class="card">
        <div class="card-header">
          <span class="language-name">{test.name}</span>
          <span class="language-code">{test.code}</span>
        </div>
        <div class="card-body">
          <p class="phrase">{test.text}</p>
        </div>
        <div class="card-footer">
          <button
            class="copy-btn"
            on:click={() =>
              navigator.clipboard.writeText(test.text)}
          >
            📋 Copy Phrase
          </button>
        </div>
      </div>
    {/each}
  </div>

  {#if filteredTests.length === 0}
    <div class="no-results">
      <p>
        No matching languages found. Try adjusting your
        search.
      </p>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 1400px;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #f8fafc;
    min-height: 100vh;
    margin-top: 6rem;
  }

  .header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
    font-weight: 600;
    letter-spacing: -0.025em;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin-top: 0;
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .search-box {
    flex: 1;
    min-width: 300px;
  }

  .search-box input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    transition: all 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .search-box input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .filter-box select {
    padding: 0.75rem 2rem 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    background: white;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.2rem;
  }

  .stats {
    text-align: center;
    color: #64748b;
    margin-bottom: 2rem;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(380px, 1fr)
    );
    gap: 1.5rem;
  }

  .card {
    background: white;
    border-radius: 16px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    border: 1px solid #e2e8f0;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .card-header {
    padding: 1rem 1.25rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .language-name {
    font-weight: 600;
    color: #0f172a;
    font-size: 1.1rem;
  }

  .language-code {
    background: #3b82f6;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.025em;
  }

  .card-body {
    padding: 1.25rem;
    flex: 1;
  }

  .phrase {
    margin: 0;
    line-height: 1.6;
    color: #334155;
    font-size: 1rem;
    font-style: italic;
    quotes: "„" "“" "‚" "‘";
  }

  .phrase::before {
    content: "„";
    color: #94a3b8;
    font-size: 1.2rem;
    margin-right: 2px;
  }

  .phrase::after {
    content: "“";
    color: #94a3b8;
    font-size: 1.2rem;
    margin-left: 2px;
  }

  .card-footer {
    padding: 1rem 1.25rem;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }

  .copy-btn {
    width: 100%;
    padding: 0.6rem 1rem;
    background: white;
    color: #1e293b;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.15s;
  }

  .copy-btn:hover {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 12px;
    border: 2px dashed #cbd5e1;
    margin-top: 2rem;
    color: #64748b;
  }

  @media (max-width: 640px) {
    main {
      padding: 1rem;
    }

    h1 {
      font-size: 1.8rem;
    }

    .card-grid {
      grid-template-columns: 1fr;
    }

    .controls {
      flex-direction: column;
    }

    .search-box {
      min-width: auto;
    }
  }
</style>
