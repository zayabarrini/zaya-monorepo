<script>
  export let title =
    "الأبجدية - Arabic Alphabet Conjugation";

  // Define all consonants with their names and symbols
  const consonants = [
    { letter: "ب", name: "Bāʾ (B)" },
    { letter: "ت", name: "Tāʾ (T)" },
    { letter: "ث", name: "Thāʾ (Th)" },
    { letter: "ج", name: "Jīm (J)" },
    { letter: "ح", name: "Ḥāʾ (Ḥ)" },
    { letter: "خ", name: "Khāʾ (Kh)" },
    { letter: "د", name: "Dāl (D)" },
    { letter: "ذ", name: "Dhāl (Dh)" },
    { letter: "ر", name: "Rāʾ (R)" },
    { letter: "ز", name: "Zāy (Z)" },
    { letter: "س", name: "Sīn (S)" },
    { letter: "ش", name: "Shīn (Sh)" },
    { letter: "ص", name: "Ṣād (Ṣ)" },
    { letter: "ض", name: "Ḍād (Ḍ)" },
    { letter: "ط", name: "Ṭāʾ (Ṭ)" },
    { letter: "ظ", name: "Ẓāʾ (Ẓ)" },
    { letter: "ع", name: "ʿAyn (ʿ)" },
    { letter: "غ", name: "Ghayn (Gh)" },
    { letter: "ف", name: "Fāʾ (F)" },
    { letter: "ق", name: "Qāf (Q)" },
    { letter: "ك", name: "Kāf (K)" },
    { letter: "ل", name: "Lām (L)" },
    { letter: "م", name: "Mīm (M)" },
    { letter: "ن", name: "Nūn (N)" },
    { letter: "ه", name: "Hāʾ (H)" },
    { letter: "و", name: "Wāw (W)" },
    { letter: "ي", name: "Yāʾ (Y)" },
    { letter: "ء", name: "Hamza (ʾ)" }
  ];

  // Define the diacritic/vowel columns with their symbols and names
  const columns = [
    {
      symbol: "َ",
      name: "Fatḥa",
      translit: "a",
      class: "fatha"
    },
    {
      symbol: "ُ",
      name: "Ḍamma",
      translit: "u",
      class: "vowel-symbol"
    },
    {
      symbol: "ِ",
      name: "Kasra",
      translit: "i",
      class: "kasra"
    },
    {
      symbol: "ً",
      name: "Tanwin Fatḥ",
      translit: "an",
      class: "tanwin"
    },
    {
      symbol: "ٌ",
      name: "Tanwin Ḍamm",
      translit: "un",
      class: "tanwin"
    },
    {
      symbol: "ٍ",
      name: "Tanwin Kasr",
      translit: "in",
      class: "tanwin"
    },
    {
      symbol: "َا",
      name: "Ā long",
      translit: "ā",
      class: "long-vowel"
    },
    {
      symbol: "ُو",
      name: "Ū long",
      translit: "ū",
      class: "long-vowel"
    },
    {
      symbol: "ِي",
      name: "Ī long",
      translit: "ī",
      class: "long-vowel"
    },
    {
      symbol: "ْ",
      name: "Sukūn",
      translit: "",
      class: "sukun"
    },
    {
      symbol: "ّ",
      name: "Shadda",
      translit: "double",
      class: "shadda"
    }
  ];

  // Helper function to generate the conjugated form
  function getConjugatedForm(consonant, columnIndex) {
    const c = consonant.letter;
    const col = columns[columnIndex];

    // Handle special cases
    if (c === "ء" && columnIndex >= 3 && columnIndex <= 5)
      return "-";
    if (c === "و" && columnIndex === 8) return "-"; // No ي for waw
    if (c === "ي" && columnIndex === 7) return "-"; // No و for ya
    if (c === "و" && columnIndex === 2) return "وِ (Wi)";
    if (c === "ي" && columnIndex === 1) return "يُ (Yu)";

    // Special handling for hamza
    if (c === "ء") {
      if (columnIndex === 0) return "أَ (ʾa) / ءَ";
      if (columnIndex === 1) return "أُ (ʾu) / ءُ";
      if (columnIndex === 2) return "إِ (ʾi) / ءِ";
      if (columnIndex === 6) return "آ (ʾā)";
      if (columnIndex === 9) return "ءْ (ʾ)";
      if (columnIndex === 10) return "ءّ (ʾʾ)";
    }

    // Standard conjugation
    const base = c + col.symbol;
    let translit = "";

    // Generate transliteration based on consonant and column
    const consonantMap = {
      ب: "B",
      ت: "T",
      ث: "Th",
      ج: "J",
      ح: "Ḥ",
      خ: "Kh",
      د: "D",
      ذ: "Dh",
      ر: "R",
      ز: "Z",
      س: "S",
      ش: "Sh",
      ص: "Ṣ",
      ض: "Ḍ",
      ط: "Ṭ",
      ظ: "Ẓ",
      ع: "ʿ",
      غ: "Gh",
      ف: "F",
      ق: "Q",
      ك: "K",
      ل: "L",
      م: "M",
      ن: "N",
      ه: "H",
      و: "W",
      ي: "Y",
      ء: "ʾ"
    };

    const cons = consonantMap[c] || c;

    if (columnIndex === 10) {
      translit = `${cons}${cons}`;
    } else if (columnIndex === 9) {
      translit = cons;
    } else if (columnIndex >= 6 && columnIndex <= 8) {
      const longVowel = col.translit;
      translit = `${cons}${longVowel}`;
    } else {
      const vowel = col.translit;
      translit = `${cons}${vowel}`;
    }

    return `${base} (${translit})`;
  }
</script>

<div class="arabic-conjugation-table">
  <header class="table-header">
    <h1>{title}</h1>
    <p class="subtitle">
      Complete conjugation of Arabic consonants with all
      diacritics
    </p>
  </header>

  <!-- Diacritic Legend -->
  <section class="legend-section">
    <h2>🔤 Diacritic Key</h2>
    <div class="legend-grid">
      {#each columns as col, index}
        <div class="legend-item">
          <span class="legend-symbol {col.class}"
            >{col.symbol}</span
          >
          <span class="legend-name">{col.name}</span>
          <span class="legend-translit">{col.translit}</span
          >
        </div>
      {/each}
    </div>
  </section>

  <!-- Main Table -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th class="sticky-col">Consonant</th>
          {#each columns as col}
            <th>
              <div class="column-header">
                <span class="header-symbol {col.class}"
                  >{col.symbol}</span
                >
                <span class="header-name">{col.name}</span>
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
            {#each columns as _, index}
              {@const form = getConjugatedForm(
                consonant,
                index
              )}
              <td class="conjugation-cell">
                {#if form === "-"}
                  <span class="empty-cell">—</span>
                {:else}
                  <div class="conjugation-content">
                    <span class="arabic-form"
                      >{form.split(" ")[0]}</span
                    >
                    <span class="transliteration"
                      >{form.split(" ")[1]}</span
                    >
                  </div>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Footer with usage notes -->
  <footer class="table-footer">
    <div class="notes-grid">
      <div class="note-card">
        <h3>📝 How to Read</h3>
        <p>
          Each cell shows the consonant with its diacritic,
          followed by the transliteration in parentheses.
        </p>
      </div>
      <div class="note-card">
        <h3>🎯 Special Cases</h3>
        <p>
          <strong>ء (Hamza)</strong> combines with alif for long
          vowels: آ (ʾā)
        </p>
        <p>
          <strong>و (Wāw)</strong> and
          <strong>ي (Yāʾ)</strong> have limited tanwin forms
        </p>
      </div>
      <div class="note-card">
        <h3>✨ Diacritic Classes</h3>
        <p>
          <span class="vowel-symbol">ُ</span> uses the
          <code>.vowel-symbol</code> class for proper rendering
        </p>
      </div>
    </div>
  </footer>
</div>

<style>
  .arabic-conjugation-table {
    max-width: 1400px;
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
      145deg,
      #fbf9f5 0%,
      #f0e9de 100%
    );
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .table-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 3px solid #b48643;
  }

  h1 {
    font-size: 2.5rem;
    color: #4a3729;
    margin-bottom: 0.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #8b5a2b, #b48643);
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
    font-size: 1.6rem;
    color: #5d3a1a;
    margin: 1.5rem 0 1rem;
    padding-left: 0.75rem;
    border-left: 6px solid #c7a15e;
  }

  /* Legend Styles */
  .legend-section {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e9d9c5;
  }

  .legend-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(150px, 1fr)
    );
    gap: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: white;
    border-radius: 40px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    border: 1px solid #f0e4d2;
    transition: transform 0.2s ease;
  }

  .legend-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .legend-symbol {
    font-size: 1.8rem;
    min-width: 2.5rem;
    text-align: center;
  }

  .legend-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: #3a2c1b;
  }

  .legend-translit {
    font-size: 0.8rem;
    color: #b17d4e;
    background: #f9f2e9;
    padding: 0.1rem 0.4rem;
    border-radius: 20px;
    margin-left: auto;
  }

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    border-radius: 24px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.2);
    border: 1px solid #e2d3c0;
    margin: 2rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    min-width: 1200px;
  }

  th {
    background: linear-gradient(145deg, #9e7a56, #7d5d3e);
    color: white;
    font-weight: 600;
    padding: 1rem 0.5rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 20;
    background: linear-gradient(145deg, #9e7a56, #7d5d3e);
    min-width: 120px;
  }

  td.sticky-col {
    background: #f8f2e9;
    border-right: 2px solid #d4b68a;
  }

  .column-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .header-symbol {
    font-size: 2rem;
    line-height: 1.2;
  }

  .header-name {
    font-size: 0.8rem;
    opacity: 0.9;
  }

  /* Cell Styles */
  .consonant-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem 0.5rem;
    background: #f8f2e9;
    font-weight: 600;
  }

  .consonant-symbol {
    font-size: 2.2rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #4a3729;
  }

  .consonant-name {
    font-size: 0.75rem;
    color: #7d5d3e;
    white-space: nowrap;
  }

  .conjugation-cell {
    padding: 0.75rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #f0e4d2;
    transition: background-color 0.2s ease;
  }

  tr:hover .conjugation-cell {
    background-color: #fdf9f2;
  }

  .conjugation-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .arabic-form {
    font-size: 1.8rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #5d3a1a;
    direction: rtl;
  }

  .transliteration {
    font-size: 0.8rem;
    color: #b17d4e;
    font-weight: 500;
    background: #f9f2e9;
    padding: 0.1rem 0.3rem;
    border-radius: 12px;
    display: inline-block;
  }

  .empty-cell {
    color: #c0a78b;
    font-size: 1.2rem;
    font-weight: 300;
  }

  /* Diacritic styling classes */
  .vowel-symbol {
    display: inline-block;
    color: #c4450c;
    font-weight: bold;
    text-shadow: 0 0 2px rgba(196, 69, 12, 0.2);
    transform: translateY(-0.1em);
  }

  .fatha,
  .kasra,
  .tanwin,
  .sukun,
  .shadda,
  .long-vowel {
    display: inline-block;
    color: #a1521e;
  }

  .fatha {
    color: #2a6f6f;
  }
  .kasra {
    color: #6f4e8c;
  }
  .tanwin {
    color: #2d7a4b;
  }
  .sukun {
    color: #a56134;
  }
  .shadda {
    color: #b33f2f;
  }
  .long-vowel {
    color: #a1662f;
  }

  /* Footer Notes */
  .table-footer {
    margin-top: 2rem;
  }

  .notes-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 1.5rem;
  }

  .note-card {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
    border: 1px solid #e9d9c5;
    transition: transform 0.2s ease;
  }

  .note-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.08);
  }

  .note-card h3 {
    color: #5d3a1a;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    border-bottom: 2px solid #e9d9c5;
    padding-bottom: 0.5rem;
  }

  .note-card p {
    color: #4a3729;
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  .note-card code {
    background: #f0e4d2;
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    color: #a1440e;
    font-family: monospace;
  }

  /* Zebra striping for rows */
  tbody tr:nth-child(even) {
    background-color: #fcf9f4;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .arabic-conjugation-table {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .legend-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .legend-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
