<script>
  import Conjuncts from "./Conjuncts.svelte";
  import Numbers from "./Numbers.svelte";

  export let title =
    "वर्णमाला - Hindi Devanagari Conjugation Table";
  export let subtitle =
    "व्यंजन + स्वर संयोजन (Consonant + Vowel Combinations)";

  // Define all consonants (व्यंजन) with their names and symbols
  const consonants = [
    { letter: "क", name: "क (ka)", translit: "ka" },
    { letter: "ख", name: "ख (kha)", translit: "kha" },
    { letter: "ग", name: "ग (ga)", translit: "ga" },
    { letter: "घ", name: "घ (gha)", translit: "gha" },
    { letter: "ङ", name: "ङ (ṅa)", translit: "ṅa" },
    { letter: "च", name: "च (ca)", translit: "ca" },
    { letter: "छ", name: "छ (cha)", translit: "cha" },
    { letter: "ज", name: "ज (ja)", translit: "ja" },
    { letter: "झ", name: "झ (jha)", translit: "jha" },
    { letter: "ञ", name: "ञ (ña)", translit: "ña" },
    { letter: "ट", name: "ट (ṭa)", translit: "ṭa" },
    { letter: "ठ", name: "ठ (ṭha)", translit: "ṭha" },
    { letter: "ड", name: "ड (ḍa)", translit: "ḍa" },
    { letter: "ढ", name: "ढ (ḍha)", translit: "ḍha" },
    { letter: "ण", name: "ण (ṇa)", translit: "ṇa" },
    { letter: "त", name: "त (ta)", translit: "ta" },
    { letter: "थ", name: "थ (tha)", translit: "tha" },
    { letter: "द", name: "द (da)", translit: "da" },
    { letter: "ध", name: "ध (dha)", translit: "dha" },
    { letter: "न", name: "न (na)", translit: "na" },
    { letter: "प", name: "प (pa)", translit: "pa" },
    { letter: "फ", name: "फ (pha)", translit: "pha" },
    { letter: "ब", name: "ब (ba)", translit: "ba" },
    { letter: "भ", name: "भ (bha)", translit: "bha" },
    { letter: "म", name: "म (ma)", translit: "ma" },
    { letter: "य", name: "य (ya)", translit: "ya" },
    { letter: "र", name: "र (ra)", translit: "ra" },
    { letter: "ल", name: "ल (la)", translit: "la" },
    { letter: "व", name: "व (va)", translit: "va" },
    { letter: "श", name: "श (śa)", translit: "śa" },
    { letter: "ष", name: "ष (ṣa)", translit: "ṣa" },
    { letter: "स", name: "स (sa)", translit: "sa" },
    { letter: "ह", name: "ह (ha)", translit: "ha" }
  ];

  // Define all vowels (स्वर) with their symbols and names
  const vowels = [
    {
      symbol: "अ",
      diacritic: "",
      name: "अ (a)",
      translit: "a",
      class: "vowel-a"
    },
    {
      symbol: "आ",
      diacritic: "ा",
      name: "आ (ā)",
      translit: "ā",
      class: "vowel-aa"
    },
    {
      symbol: "इ",
      diacritic: "ि",
      name: "इ (i)",
      translit: "i",
      class: "vowel-i"
    },
    {
      symbol: "ई",
      diacritic: "ी",
      name: "ई (ī)",
      translit: "ī",
      class: "vowel-ii"
    },
    {
      symbol: "उ",
      diacritic: "ु",
      name: "उ (u)",
      translit: "u",
      class: "vowel-u"
    },
    {
      symbol: "ऊ",
      diacritic: "ू",
      name: "ऊ (ū)",
      translit: "ū",
      class: "vowel-uu"
    },
    {
      symbol: "ए",
      diacritic: "े",
      name: "ए (e)",
      translit: "e",
      class: "vowel-e"
    },
    {
      symbol: "ऐ",
      diacritic: "ै",
      name: "ऐ (ai)",
      translit: "ai",
      class: "vowel-ai"
    },
    {
      symbol: "ओ",
      diacritic: "ो",
      name: "ओ (o)",
      translit: "o",
      class: "vowel-o"
    },
    {
      symbol: "औ",
      diacritic: "ौ",
      name: "औ (au)",
      translit: "au",
      class: "vowel-au"
    }
  ];

  // Function to generate the combined form
  function getCombinedForm(consonant, vowelIndex) {
    const c = consonant.letter;
    const v = vowels[vowelIndex];

    // For the first vowel (अ), just the consonant
    if (vowelIndex === 0) {
      return {
        devanagari: c,
        translit: consonant.translit,
        display: `${c} (${consonant.translit})`
      };
    }

    // For other vowels, add the diacritic
    const combined = c + v.diacritic;
    const translit =
      consonant.translit.slice(0, -1) + v.translit;

    return {
      devanagari: combined,
      translit: translit,
      display: `${combined} (${translit})`
    };
  }

  // Vowel symbols row for header
  const vowelSymbols = [
    { symbol: "अ", diacritic: "", name: "a" },
    { symbol: "आ", diacritic: "ा", name: "ā" },
    { symbol: "इ", diacritic: "ि", name: "i" },
    { symbol: "ई", diacritic: "ी", name: "ī" },
    { symbol: "उ", diacritic: "ु", name: "u" },
    { symbol: "ऊ", diacritic: "ू", name: "ū" },
    { symbol: "ए", diacritic: "े", name: "e" },
    { symbol: "ऐ", diacritic: "ै", name: "ai" },
    { symbol: "ओ", diacritic: "ो", name: "o" },
    { symbol: "औ", diacritic: "ौ", name: "au" }
  ];
</script>

<div class="container mainpage">
  <div class="devanagari-table">
    <header class="table-header">
      <h1>{title}</h1>
      <p class="subtitle">{subtitle}</p>
      <div class="header-decoration">
        <span class="decoration-symbol">ॐ</span>
        <span class="decoration-text">हिन्दी वर्णमाला</span>
        <span class="decoration-symbol">🕉️</span>
      </div>
    </header>

    <!-- Vowel Legend / स्वर तालिका -->
    <section class="vowel-legend">
      <h2>📖 स्वर (Vowels)</h2>
      <div class="vowel-grid">
        {#each vowels as vowel, index}
          <div class="vowel-card {vowel.class}">
            <span class="vowel-symbol">{vowel.symbol}</span>
            <span class="vowel-diacritic"
              >{vowel.diacritic || "—"}</span
            >
            <span class="vowel-name">{vowel.name}</span>
            <span class="vowel-translit"
              >{vowel.translit}</span
            >
          </div>
        {/each}
      </div>
    </section>

    <!-- Main Conjugation Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="sticky-col"
              >व्यंजन<br /><span class="subhead"
                >(Consonant)</span
              ></th
            >
            {#each vowelSymbols as vowel}
              <th>
                <div class="vowel-header">
                  <span class="vowel-header-symbol"
                    >{vowel.symbol}</span
                  >
                  <span class="vowel-header-diacritic"
                    >{vowel.diacritic || "अ"}</span
                  >
                  <span class="vowel-header-name"
                    >{vowel.name}</span
                  >
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each consonants as consonant}
            <tr>
              <td class="sticky-col consonant-cell">
                <span class="consonant-symbol"
                  >{consonant.letter}</span
                >
                <span class="consonant-name"
                  >{consonant.name}</span
                >
              </td>
              {#each vowels as _, index}
                {@const form = getCombinedForm(
                  consonant,
                  index
                )}
                <td class="conjugation-cell">
                  <div class="conjugation-content">
                    <span class="devanagari-form"
                      >{form.devanagari}</span
                    >
                    <span class="transliteration"
                      >{form.translit}</span
                    >
                  </div>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Information Cards -->

    <div class="info-section">
      <div class="info-card pronounciation-card">
        <h3>उच्चारण 🗣️</h3>
        <table class="pronounciation-table">
          <thead>
            <tr>
              <th>Vowel</th>
              <th>Pronunciation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>अ (a)</td>
              <td>like 'u' in "but"</td>
            </tr>
            <tr>
              <td>आ (ā)</td>
              <td>like 'a' in "father"</td>
            </tr>
            <tr>
              <td>इ (i)</td>
              <td>like 'i' in "sit"</td>
            </tr>
            <tr>
              <td>ई (ī)</td>
              <td>like 'ee' in "see"</td>
            </tr>
            <tr>
              <td>उ (u)</td>
              <td>like 'u' in "put"</td>
            </tr>
            <tr>
              <td>ऊ (ū)</td>
              <td>like 'oo' in "moon"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="info-card sanskrit-card">
      <h3>संस्कृत 🌸</h3>
      <p>
        Devanagari is an abugida where each consonant
        inherently contains the vowel अ (a). Diacritics
        modify this inherent vowel.
      </p>
      <div class="example-row">
        <span class="example">क + ा = का</span>
        <span class="example">क + ि = कि</span>
        <span class="example">क + ु = कु</span>
      </div>
    </div>

    <div class="info-card special-card">
      <h3>विशेष ⭐</h3>
      <p>
        <strong>अनुस्वार (ं):</strong> कं (kaṁ) - nasalization
      </p>
      <p>
        <strong>विसर्ग (ः):</strong> कः (kaḥ) - voiceless breath
      </p>
      <p>
        <strong>चन्द्रबिन्दु (ँ):</strong> काँ (kā̃) - nasalized
        vowel
      </p>
    </div>

    <!-- Vowel Diacritic Showcase -->
    <section class="diacritic-showcase">
      <h2>🎨 स्वर चिह्न (Vowel Signs)</h2>
      <div class="showcase-grid">
        <div class="showcase-item">
          <span class="base">क</span>
          <span class="plus">+</span>
          <span class="diacritic">ा</span>
          <span class="equals">=</span>
          <span class="result">का</span>
          <span class="label">का (kā)</span>
        </div>
        <div class="showcase-item">
          <span class="base">क</span>
          <span class="plus">+</span>
          <span class="diacritic">ि</span>
          <span class="equals">=</span>
          <span class="result">कि</span>
          <span class="label">कि (ki)</span>
        </div>
        <div class="showcase-item">
          <span class="base">क</span>
          <span class="plus">+</span>
          <span class="diacritic">ी</span>
          <span class="equals">=</span>
          <span class="result">की</span>
          <span class="label">की (kī)</span>
        </div>
        <div class="showcase-item">
          <span class="base">क</span>
          <span class="plus">+</span>
          <span class="diacritic">ु</span>
          <span class="equals">=</span>
          <span class="result">कु</span>
          <span class="label">कु (ku)</span>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="table-footer">
      <p>
        हिन्दी वर्णमाला - 33 व्यंजन × 10 स्वर = 330 संयोजन
      </p>
      <p class="small">
        33 consonants × 10 vowels = 330 combinations shown
        in this table
      </p>
    </footer>
  </div>
  <Conjuncts />
  <Numbers />
</div>

<style>
  .container {
    margin-top: 4rem;
  }

  .devanagari-table {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", "Arial Unicode MS",
      system-ui, sans-serif;
    background: linear-gradient(
      145deg,
      #fff5e6 0%,
      #ffe4cc 100%
    );
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(147, 51, 30, 0.25);
    border: 1px solid #ffd2b3;
  }

  .table-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #cc6600, #b34d00);
    border-radius: 1.5rem;
    color: white;
    box-shadow: 0 10px 20px rgba(179, 77, 0, 0.3);
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    opacity: 0.95;
    font-style: italic;
  }

  .header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
    font-size: 1.8rem;
  }

  .decoration-symbol {
    font-size: 2rem;
    opacity: 0.9;
  }

  .decoration-text {
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 2px;
  }

  h2 {
    font-size: 1.8rem;
    color: #b34d00;
    margin: 2rem 0 1.5rem;
    padding-left: 0.75rem;
    border-left: 8px solid #ff9933;
    font-weight: 600;
  }

  /* Vowel Legend */
  .vowel-legend {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #ffcc99;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .vowel-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(150px, 1fr)
    );
    gap: 1rem;
  }

  .vowel-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(255, 153, 51, 0.1);
    border: 1px solid #ffd2b3;
    transition: transform 0.2s ease;
  }

  .vowel-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(255, 102, 0, 0.2);
  }

  .vowel-symbol {
    font-size: 2.8rem;
    line-height: 1.2;
    color: #b34d00;
    font-weight: 600;
  }

  .vowel-diacritic {
    font-size: 2rem;
    color: #ff6600;
    min-height: 2.5rem;
  }

  .vowel-name {
    font-size: 1rem;
    font-weight: 600;
    color: #4d2600;
  }

  .vowel-translit {
    font-size: 0.9rem;
    color: #ff6600;
    background: #fff2e6;
    padding: 0.2rem 1rem;
    border-radius: 40px;
    margin-top: 0.25rem;
  }

  /* Vowel-specific colors */
  .vowel-a {
    background: #fff9f0;
  }
  .vowel-aa {
    background: #fff0e0;
  }
  .vowel-i {
    background: #f0f0ff;
  }
  .vowel-ii {
    background: #e6f0ff;
  }
  .vowel-u {
    background: #f0fff0;
  }
  .vowel-uu {
    background: #e6ffe6;
  }
  .vowel-e {
    background: #fff0f5;
  }
  .vowel-ai {
    background: #fff0fa;
  }
  .vowel-o {
    background: #fff5e6;
  }
  .vowel-au {
    background: #ffe6e6;
  }

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    border-radius: 24px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(179, 77, 0, 0.2);
    border: 2px solid #ffb380;
    margin: 2rem 0;
    max-height: 600px;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    min-width: 1100px;
  }

  th {
    background: linear-gradient(145deg, #ff944d, #ff751a);
    color: white;
    font-weight: 600;
    padding: 1rem 0.5rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 3px solid #cc5200;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 20;
    min-width: 120px;
  }

  td.sticky-col {
    background: #fff2e6;
    border-right: 3px solid #ffb380;
    font-weight: 600;
  }

  .subhead {
    font-size: 0.75rem;
    opacity: 0.9;
    font-weight: normal;
  }

  .vowel-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .vowel-header-symbol {
    font-size: 2rem;
    line-height: 1.2;
  }

  .vowel-header-diacritic {
    font-size: 1.8rem;
    color: #fff2e6;
  }

  .vowel-header-name {
    font-size: 0.85rem;
  }

  /* Cell Styles */
  .consonant-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem 0.5rem;
    background: #fff2e6;
  }

  .consonant-symbol {
    font-size: 2.4rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
    color: #b3470d;
  }

  .consonant-name {
    font-size: 0.8rem;
    color: #804020;
  }

  .conjugation-cell {
    padding: 0.75rem 0.25rem;
    text-align: center;
    border-bottom: 1px solid #ffd9b3;
    transition: background-color 0.2s ease;
  }

  tr:hover .conjugation-cell {
    background-color: #fff9f2;
  }

  .conjugation-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .devanagari-form {
    font-size: 2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
    color: #4d2600;
    line-height: 1.2;
  }

  .transliteration {
    font-size: 0.75rem;
    color: #ff751a;
    background: #fff2e6;
    padding: 0.15rem 0.5rem;
    border-radius: 40px;
    white-space: nowrap;
  }

  /* Zebra striping */
  tbody tr:nth-child(even) {
    background-color: #fffcf5;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
  }

  /* Info Cards */
  .info-section {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(280px, 1fr)
    );
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .info-card {
    font-size: 1.2em;
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
    border: 1px solid #ffcc99;
    transition: transform 0.2s ease;
  }

  .info-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 24px rgba(255, 102, 0, 0.15);
  }

  .info-card h3 {
    color: #b34d00;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    border-bottom: 2px solid #ffd2b3;
    padding-bottom: 0.5rem;
  }

  .sanskrit-card {
    background: linear-gradient(145deg, #fff5e6, #ffe6cc);
  }

  .example-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .example {
    background: #ff751a;
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 40px;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .pronounciation-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.5rem;
  }

  .pronounciation-table td {
    padding: 0.3rem 0;
    border-bottom: 1px dashed #ffd2b3;
  }

  .pronounciation-table td:first-child {
    font-weight: 600;
    color: #b34d00;
  }

  .special-card {
    background: linear-gradient(145deg, #f0e6ff, #ffe6f0);
  }

  /* Diacritic Showcase */
  .diacritic-showcase {
    margin: 2rem 0;
  }

  .showcase-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .showcase-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    background: white;
    padding: 1rem;
    border-radius: 60px;
    border: 2px solid #ffb380;
  }

  .base,
  .diacritic,
  .result {
    font-size: 2rem;
    font-family: "Nirmala UI", "Mangal", sans-serif;
  }

  .base {
    color: #4d2600;
  }
  .plus {
    color: #ff751a;
    font-size: 1.2rem;
  }
  .diacritic {
    color: #ff3300;
  }
  .equals {
    color: #ff751a;
    font-size: 1.2rem;
  }
  .result {
    color: #cc5200;
    font-weight: bold;
  }
  .label {
    font-size: 0.8rem;
    background: #fff2e6;
    padding: 0.2rem 0.8rem;
    border-radius: 40px;
    color: #b34d00;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
  }

  /* Footer */
  .table-footer {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(145deg, #cc6600, #b34d00);
    border-radius: 1.5rem;
    color: white;
    text-align: center;
    font-size: 1.2rem;
  }

  .small {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-top: 0.5rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .devanagari-table {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .vowel-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
