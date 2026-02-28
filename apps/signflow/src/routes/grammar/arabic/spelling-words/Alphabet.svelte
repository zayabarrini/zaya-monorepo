<script>
  // Component for rendering Arabic script information
  export let title = "Arabic Script Guide";

  // Data for non-connecting letters
  const nonConnectingLetters = [
    {
      letter: "ا",
      name: "Alif",
      isolated: "ا",
      final: "ـا",
      example: "بَاب (bāb - door)"
    },
    {
      letter: "د",
      name: "Dāl",
      isolated: "د",
      final: "ـد",
      example: "مَدْرَسَة (madrasa - school)"
    },
    {
      letter: "ذ",
      name: "Dhāl",
      isolated: "ذ",
      final: "ـذ",
      example: "بِذَكَاء (bidhakāʾ - with intelligence)"
    },
    {
      letter: "ر",
      name: "Rāʾ",
      isolated: "ر",
      final: "ـر",
      example: "شُرْطَة (shurṭa - police)"
    },
    {
      letter: "ز",
      name: "Zayn",
      isolated: "ز",
      final: "ـز",
      example: "مِزْيَة (mizya - advantage)"
    },
    {
      letter: "و",
      name: "Wāw",
      isolated: "و",
      final: "ـو",
      example: "مَوْعِد (mawʿid - appointment)"
    }
  ];

  // Data for connecting letters
  const connectingLetters = [
    {
      name: "Bāʾ",
      isolated: "ب",
      initial: "بـ",
      medial: "ـبـ",
      final: "ـب"
    },
    {
      name: "Tāʾ",
      isolated: "ت",
      initial: "تـ",
      medial: "ـتـ",
      final: "ـت"
    },
    {
      name: "Thāʾ",
      isolated: "ث",
      initial: "ثـ",
      medial: "ـثـ",
      final: "ـث"
    },
    {
      name: "Jīm",
      isolated: "ج",
      initial: "جـ",
      medial: "ـجـ",
      final: "ـج"
    },
    {
      name: "Ḥāʾ",
      isolated: "ح",
      initial: "حـ",
      medial: "ـحـ",
      final: "ـح"
    },
    {
      name: "Khāʾ",
      isolated: "خ",
      initial: "خـ",
      medial: "ـخـ",
      final: "ـخ"
    },
    {
      name: "Sīn",
      isolated: "س",
      initial: "سـ",
      medial: "ـسـ",
      final: "ـس"
    },
    {
      name: "Shīn",
      isolated: "ش",
      initial: "شـ",
      medial: "ـشـ",
      final: "ـش"
    },
    {
      name: "Ṣād",
      isolated: "ص",
      initial: "صـ",
      medial: "ـصـ",
      final: "ـص"
    },
    {
      name: "Ḍād",
      isolated: "ض",
      initial: "ضـ",
      medial: "ـضـ",
      final: "ـض"
    },
    {
      name: "Ṭāʾ",
      isolated: "ط",
      initial: "طـ",
      medial: "ـطـ",
      final: "ـط"
    },
    {
      name: "Ẓāʾ",
      isolated: "ظ",
      initial: "ظـ",
      medial: "ـظـ",
      final: "ـظ"
    },
    {
      name: "ʿAyn",
      isolated: "ع",
      initial: "عـ",
      medial: "ـعـ",
      final: "ـع"
    },
    {
      name: "Ghayn",
      isolated: "غ",
      initial: "غـ",
      medial: "ـغـ",
      final: "ـغ"
    },
    {
      name: "Fāʾ",
      isolated: "ف",
      initial: "فـ",
      medial: "ـفـ",
      final: "ـف"
    },
    {
      name: "Qāf",
      isolated: "ق",
      initial: "قـ",
      medial: "ـقـ",
      final: "ـق"
    },
    {
      name: "Kāf",
      isolated: "ك",
      initial: "كـ",
      medial: "ـكـ",
      final: "ـك"
    },
    {
      name: "Lām",
      isolated: "ل",
      initial: "لـ",
      medial: "ـلـ",
      final: "ـل"
    },
    {
      name: "Mīm",
      isolated: "م",
      initial: "مـ",
      medial: "ـمـ",
      final: "ـم"
    },
    {
      name: "Nūn",
      isolated: "ن",
      initial: "نـ",
      medial: "ـنـ",
      final: "ـن"
    },
    {
      name: "Hāʾ",
      isolated: "ه",
      initial: "هـ",
      medial: "ـهـ",
      final: "ـه"
    },
    {
      name: "Yāʾ",
      isolated: "ي",
      initial: "يـ",
      medial: "ـيـ",
      final: "ـي"
    }
  ];

  // Hamza placement types
  const hamzaTypes = [
    {
      symbol: "ء",
      name: "Hamza on the line (stand-alone)"
    },
    { symbol: "أ", name: "Hamza on alif with fatha (ʾa)" },
    { symbol: "إ", name: "Hamza on alif with kasra (ʾi)" },
    { symbol: "ؤ", name: "Hamza on waw (ʾu)" },
    {
      symbol: "ئ",
      name: "Hamza on ya’ (ʾi in middle or end)"
    },
    {
      symbol: "ئـ",
      name: "Initial or medial hamza on ya’ without dots"
    },
    {
      symbol: "ء",
      name: "Hamza on the line at word end (e.g., شيء)"
    },
    {
      symbol: "ٱ",
      name: "Alif wasla (non-pronounced alif in context)"
    },
    { symbol: "ٱ", name: "Connective hamza (همزة وصل)" },
    {
      symbol: "ء",
      name: "Glottal stop (همزة القطع), always pronounced"
    }
  ];

  // Other important symbols
  const diacriticSymbols = [
    { symbol: "َ", name: "Fatḥa (a)", class: "fatha" },
    { symbol: "ِ", name: "Kasra (i)", class: "kasra" },
    {
      symbol: "ُ",
      name: "Ḍamma (u)",
      class: "vowel-symbol"
    },
    {
      symbol: "ْ",
      name: "Sukūn (no vowel)",
      class: "sukun"
    },
    {
      symbol: "ّ",
      name: "Shadda (consonant doubling)",
      class: "shadda"
    },
    {
      symbol: "ً",
      name: "Tanwīn fatḥa (an)",
      class: "tanwin"
    },
    {
      symbol: "ٍ",
      name: "Tanwīn kasra (in)",
      class: "tanwin"
    },
    {
      symbol: "ٌ",
      name: "Tanwīn ḍamma (un)",
      class: "tanwin"
    },
    {
      symbol: "ٰ",
      name: "Alif khanjariyya (dagger alif)",
      class: "dagger-alif"
    },
    {
      symbol: "ــ",
      name: "Tatweel (kashida, elongation)",
      class: "tatweel"
    }
  ];

  // Visual examples
  const visualExamples = [
    {
      word: "بَيْت",
      transliteration: "bayt",
      meaning: "house",
      note: "ي connects ب to ت"
    },
    {
      word: "بَاب",
      transliteration: "bāb",
      meaning: "door",
      note: "ا breaks connection"
    },
    {
      word: "دَاوُد",
      transliteration: "Dāwūd",
      meaning: "David",
      note: "All non-connectors!"
    },
    {
      word: "مَوْز",
      transliteration: "mawz",
      meaning: "banana",
      note: "و connects to م only"
    }
  ];
</script>

<div class="arabic-guide">
  <header class="guide-header">
    <h1>{title}</h1>
    <p class="subtitle">
      A comprehensive guide to Arabic script, diacritics,
      and letter forms
    </p>
  </header>

  <!-- Diacritics and Symbols Section -->
  <section class="symbols-section">
    <h2>✨ Arabic Diacritics & Symbols</h2>
    <p class="section-intro">
      Using the <code class="inline-code"
        >.vowel-symbol</code
      > class for proper rendering
    </p>

    <div class="symbols-grid">
      {#each diacriticSymbols as symbol}
        <div class="symbol-card">
          <div class="symbol-display">
            <span class={symbol.class}>{symbol.symbol}</span
            >
          </div>
          <div class="symbol-name">{symbol.name}</div>
        </div>
      {/each}
    </div>

    <div class="example-box">
      <p class="example-title">Example rendering:</p>
      <p class="arabic-example">
        ب<span class="vowel-symbol">َ</span>ي<span
          class="vowel-symbol">ْ</span
        >ت <span class="example-translit">(bayt)</span>
        ← Notice the <span class="vowel-symbol">ُ</span> (ḍamma)
        and other marks
      </p>
    </div>
  </section>

  <!-- Hamza Placement Section -->
  <section class="hamza-section">
    <h2>📍 Hamza Placement Types</h2>
    <div class="hamza-container">
      <div class="hamza-list">
        {#each hamzaTypes as hamza, index}
          <div class="hamza-item">
            <span class="hamza-symbol">{hamza.symbol}</span>
            <span class="hamza-description"
              >{hamza.name}</span
            >
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Non-Connecting Letters Section -->
  <section class="non-connectors">
    <h2>🔹 Non-Connecting Letters (الحروف المتكبرة)</h2>
    <p class="section-note">
      These letters connect to the previous letter but NEVER
      to the following letter
    </p>

    <div class="non-connector-table">
      <div class="table-header">
        <span>Letter</span>
        <span>Name</span>
        <span>Isolated</span>
        <span>Final</span>
        <span>Example</span>
      </div>
      {#each nonConnectingLetters as letter}
        <div class="table-row">
          <span class="letter-cell large"
            >{letter.letter}</span
          >
          <span class="name-cell">{letter.name}</span>
          <span class="form-cell">{letter.isolated}</span>
          <span class="form-cell">{letter.final}</span>
          <span class="example-cell">{letter.example}</span>
        </div>
      {/each}
    </div>

    <div class="mnemonic-box">
      <p>
        <strong>Mnemonic:</strong>
        <span class="arabic-text">ا د ذ ر ز و</span> — Letters
        that "fall below the line"
      </p>
    </div>
  </section>

  <!-- Visual Examples Section -->
  <section class="examples-section">
    <h2>🔍 Visualizing the "Break"</h2>
    <div class="examples-grid">
      {#each visualExamples as ex}
        <div class="example-card">
          <div class="example-word">{ex.word}</div>
          <div class="example-details">
            <span class="translit"
              >{ex.transliteration}</span
            >
            <span class="meaning">{ex.meaning}</span>
            <span class="note">{ex.note}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Connecting Letters Table -->
  <section class="connecting-letters">
    <h2>📊 Letters That Change Shape</h2>
    <p class="section-note">
      Arabic letters have up to four forms: isolated,
      initial, medial, and final
    </p>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Letter Name</th>
            <th>Isolated</th>
            <th>Initial</th>
            <th>Medial</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {#each connectingLetters as letter}
            <tr>
              <td class="letter-name">{letter.name}</td>
              <td class="arabic-form">{letter.isolated}</td>
              <td class="arabic-form">{letter.initial}</td>
              <td class="arabic-form">{letter.medial}</td>
              <td class="arabic-form">{letter.final}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Fun Fact Footer -->
  <footer class="guide-footer">
    <p>
      ✨ In Arabic calligraphy, non-connecting letters are
      "proud" because they stand tall and don't join hands
      with the next letter!
    </p>
    <p class="small">
      The <span class="vowel-symbol">ُ</span> (ḍamma) and other
      diacritics are rendered with the vowel-symbol class
    </p>
  </footer>
</div>

<style>
  .arabic-guide {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      system-ui,
      -apple-system,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      sans-serif;
    background: linear-gradient(
      135deg,
      #fdfbfb 0%,
      #f5f0e7 100%
    );
    border-radius: 2rem;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.05);
  }

  .guide-header {
    text-align: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 3px solid #d4b68a;
  }

  h1 {
    font-size: 2.5rem;
    color: #5d3a1a;
    margin-bottom: 0.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    background: linear-gradient(120deg, #7b4b2a, #a76f3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #7a5c3a;
    font-style: italic;
  }

  h2 {
    font-size: 1.8rem;
    color: #5d3a1a;
    margin: 2rem 0 1.5rem;
    padding-left: 0.5rem;
    border-left: 6px solid #c7a15e;
    font-weight: 500;
  }

  .section-intro {
    color: #7a5c3a;
    margin-bottom: 1.5rem;
  }

  .inline-code {
    background: #e8dfd1;
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-family: monospace;
    color: #a1440e;
  }

  /* Symbols grid */
  .symbols-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(180px, 1fr)
    );
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .symbol-card {
    background: white;
    border-radius: 16px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    border: 1px solid #f0e4d2;
  }

  .symbol-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .symbol-display {
    font-size: 2.5rem;
    line-height: 1.4;
    background: #faf7f0;
    border-radius: 12px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px dashed #d4b68a;
  }

  .symbol-name {
    font-size: 0.9rem;
    color: #5d3a1a;
    font-weight: 500;
  }

  /* Special styling for vowel symbols */
  .vowel-symbol {
    display: inline-block;
    font-size: 1.5em;
    color: #c4450c;
    font-weight: bold;
    text-shadow: 0 0 2px rgba(196, 69, 12, 0.3);
    transform: translateY(-0.1em);
  }

  .fatha,
  .kasra,
  .sukun,
  .shadda,
  .tanwin,
  .dagger-alif,
  .tatweel {
    display: inline-block;
    font-size: 1.5em;
    color: #b3561e;
  }

  .example-box {
    background: #e9ddcf;
    border-radius: 16px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-left: 6px solid #b17d4e;
  }

  .arabic-example {
    font-size: 2rem;
    direction: rtl;
    text-align: right;
    font-family:
      "Traditional Arabic", "Amiri", "Scheherazade", serif;
  }

  .example-translit {
    font-size: 1rem;
    color: #5d3a1a;
    margin-left: 1rem;
    direction: ltr;
  }

  /* Hamza section */
  .hamza-container {
    background: #fcf9f4;
    border-radius: 20px;
    padding: 1.5rem;
    border: 1px solid #eddcc9;
  }

  .hamza-list {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(250px, 1fr)
    );
    gap: 0.75rem;
  }

  .hamza-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: 40px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    border: 1px solid #efe2d2;
  }

  .hamza-symbol {
    font-size: 1.8rem;
    min-width: 2.5rem;
    text-align: center;
    background: #f2e4d5;
    border-radius: 50%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8b4513;
  }

  .hamza-description {
    font-size: 0.9rem;
    color: #3a2c1b;
  }

  /* Non-connector table */
  .non-connector-table {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #e2d3c0;
    margin-bottom: 1.5rem;
  }

  .table-header {
    display: grid;
    grid-template-columns: 80px 100px 80px 80px 1fr;
    background: #c7a15e;
    color: white;
    font-weight: 600;
    padding: 1rem;
    gap: 0.5rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 80px 100px 80px 80px 1fr;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f0e4d2;
    align-items: center;
    gap: 0.5rem;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-row:nth-child(even) {
    background: #faf5ec;
  }

  .letter-cell {
    font-size: 2rem;
    text-align: center;
    font-family: "Traditional Arabic", serif;
  }

  .form-cell {
    font-size: 1.8rem;
    text-align: center;
    font-family: "Traditional Arabic", serif;
    color: #8b4513;
  }

  .name-cell {
    font-weight: 500;
    color: #3a2c1b;
  }

  .example-cell {
    font-size: 0.9rem;
    color: #6b4f2c;
  }

  .mnemonic-box {
    background: #f0ebe1;
    padding: 1rem 1.5rem;
    border-radius: 60px;
    display: inline-block;
    border: 2px dashed #b17d4e;
  }

  .arabic-text {
    font-size: 1.8rem;
    font-family: "Traditional Arabic", serif;
    color: #8b4513;
  }

  /* Examples grid */
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(240px, 1fr)
    );
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .example-card {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
    border: 1px solid #e9d9c5;
    transition: all 0.2s ease;
  }

  .example-card:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.08);
  }

  .example-word {
    font-size: 3rem;
    direction: rtl;
    text-align: center;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #3a2c1b;
    margin-bottom: 1rem;
    border-bottom: 2px solid #eddcc9;
    padding-bottom: 0.75rem;
  }

  .example-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .translit {
    font-weight: 600;
    color: #a76f3c;
  }

  .meaning {
    color: #5d3a1a;
    font-style: italic;
  }

  .note {
    font-size: 0.85rem;
    color: #7a5c3a;
    background: #f9f2e9;
    padding: 0.25rem 0.75rem;
    border-radius: 40px;
    margin-top: 0.5rem;
  }

  /* Table styles */
  .table-container {
    overflow-x: auto;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2d3c0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  th {
    background: #b78d5a;
    color: white;
    font-weight: 600;
    padding: 1rem;
    text-align: center;
  }

  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f0e4d2;
    text-align: center;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background: #faf5ec;
  }

  .letter-name {
    font-weight: 500;
    color: #3a2c1b;
    text-align: left;
  }

  .arabic-form {
    font-size: 2rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #8b4513;
    direction: rtl;
  }

  .section-note {
    color: #7a5c3a;
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  .guide-footer {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 3px solid #d4b68a;
    text-align: center;
    color: #5d3a1a;
    font-size: 1.1rem;
  }

  .guide-footer .small {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
  }

  /* Responsive adjustments */
  @media (max-width: 700px) {
    .arabic-guide {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .table-header,
    .table-row {
      grid-template-columns: 60px 80px 60px 60px 1fr;
      font-size: 0.8rem;
    }

    .letter-cell,
    .form-cell {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 500px) {
    .non-connector-table {
      overflow-x: auto;
    }

    .table-header,
    .table-row {
      min-width: 600px;
    }
  }
</style>
