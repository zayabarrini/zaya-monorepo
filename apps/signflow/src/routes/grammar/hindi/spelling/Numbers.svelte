<script>
  export let title = "गिनती - Hindi Numbers Table";
  export let subtitle =
    "हिन्दी अंक और संख्याएँ (Hindi Numerals and Numbers)";

  // Define the tens (दहाई)
  const tens = [
    {
      numeral: "०",
      name: "शून्य",
      translit: "shūnya",
      value: 0
    },
    {
      numeral: "१०",
      name: "दस",
      translit: "das",
      value: 10
    },
    {
      numeral: "२०",
      name: "बीस",
      translit: "bīs",
      value: 20
    },
    {
      numeral: "३०",
      name: "तीस",
      translit: "tīs",
      value: 30
    },
    {
      numeral: "४०",
      name: "चालीस",
      translit: "chālīs",
      value: 40
    },
    {
      numeral: "५०",
      name: "पचास",
      translit: "pachās",
      value: 50
    },
    {
      numeral: "६०",
      name: "साठ",
      translit: "sāṭh",
      value: 60
    },
    {
      numeral: "७०",
      name: "सत्तर",
      translit: "sattar",
      value: 70
    },
    {
      numeral: "८०",
      name: "अस्सी",
      translit: "assī",
      value: 80
    },
    {
      numeral: "९०",
      name: "नब्बे",
      translit: "nabbe",
      value: 90
    }
  ];

  // Define the units (इकाई)
  const units = [
    {
      numeral: "०",
      name: "शून्य",
      translit: "shūnya",
      value: 0
    },
    { numeral: "१", name: "एक", translit: "ek", value: 1 },
    { numeral: "२", name: "दो", translit: "do", value: 2 },
    {
      numeral: "३",
      name: "तीन",
      translit: "tīn",
      value: 3
    },
    {
      numeral: "४",
      name: "चार",
      translit: "chār",
      value: 4
    },
    {
      numeral: "५",
      name: "पाँच",
      translit: "pāñch",
      value: 5
    },
    {
      numeral: "६",
      name: "छह",
      translit: "chhah",
      value: 6
    },
    {
      numeral: "७",
      name: "सात",
      translit: "sāt",
      value: 7
    },
    { numeral: "८", name: "आठ", translit: "āṭh", value: 8 },
    { numeral: "९", name: "नौ", translit: "nau", value: 9 }
  ];

  // Main numbers table data
  const numberTable = [
    {
      unit: 0,
      name: "शून्य",
      translit: "shūnya",
      values: [
        "शून्य",
        "दस",
        "बीस",
        "तीस",
        "चालीस",
        "पचास",
        "साठ",
        "सत्तर",
        "अस्सी",
        "नब्बे"
      ]
    },
    {
      unit: 1,
      name: "एक",
      translit: "ek",
      values: [
        "एक",
        "ग्यारह",
        "इक्कीस",
        "इकतीस",
        "इकतालीस",
        "इक्यावन",
        "इकसठ",
        "इकहत्तर",
        "इक्यासी",
        "इक्यानवे"
      ]
    },
    {
      unit: 2,
      name: "दो",
      translit: "do",
      values: [
        "दो",
        "बारह",
        "बाईस",
        "बत्तीस",
        "बयालीस",
        "बावन",
        "बासठ",
        "बहत्तर",
        "बयासी",
        "बानवे"
      ]
    },
    {
      unit: 3,
      name: "तीन",
      translit: "tīn",
      values: [
        "तीन",
        "तेरह",
        "तेईस",
        "तैंतीस",
        "तैंतालीस",
        "तिरपन",
        "तिरसठ",
        "तिहत्तर",
        "तिरासी",
        "तिरानवे"
      ]
    },
    {
      unit: 4,
      name: "चार",
      translit: "chār",
      values: [
        "चार",
        "चौदह",
        "चौबीस",
        "चौंतीस",
        "चौंतालीस",
        "चौवन",
        "चौंसठ",
        "चौहत्तर",
        "चौरासी",
        "चौरानवे"
      ]
    },
    {
      unit: 5,
      name: "पाँच",
      translit: "pāñch",
      values: [
        "पाँच",
        "पंद्रह",
        "पच्चीस",
        "पैंतीस",
        "पैंतालीस",
        "पचपन",
        "पैंसठ",
        "पचहत्तर",
        "पचासी",
        "पचानवे"
      ]
    },
    {
      unit: 6,
      name: "छह",
      translit: "chhah",
      values: [
        "छह",
        "सोलह",
        "छब्बीस",
        "छत्तीस",
        "छियालीस",
        "छप्पन",
        "छियासठ",
        "छिहत्तर",
        "छियासी",
        "छियानवे"
      ]
    },
    {
      unit: 7,
      name: "सात",
      translit: "sāt",
      values: [
        "सात",
        "सत्रह",
        "सत्ताइस",
        "सैंतीस",
        "सैंतालीस",
        "सत्तावन",
        "सड़सठ",
        "सतहत्तर",
        "सत्तासी",
        "सत्तानवे"
      ]
    },
    {
      unit: 8,
      name: "आठ",
      translit: "āṭh",
      values: [
        "आठ",
        "अठारह",
        "अट्ठाईस",
        "अड़तीस",
        "अड़तालीस",
        "अट्ठावन",
        "अड़सठ",
        "अठहत्तर",
        "अट्ठासी",
        "अट्ठानवे"
      ]
    },
    {
      unit: 9,
      name: "नौ",
      translit: "nau",
      values: [
        "नौ",
        "उन्नीस",
        "उनतीस",
        "उनतालीस",
        "उनचास",
        "उनसठ",
        "उनहत्तर",
        "उन्यासी",
        "नवासी",
        "निन्यानवे"
      ]
    }
  ];

  // Basic numbers 1-10 with transliteration
  const basicNumbers = [
    {
      numeral: "१",
      devanagari: "एक",
      translit: "ek",
      english: "one"
    },
    {
      numeral: "२",
      devanagari: "दो",
      translit: "do",
      english: "two"
    },
    {
      numeral: "३",
      devanagari: "तीन",
      translit: "tīn",
      english: "three"
    },
    {
      numeral: "४",
      devanagari: "चार",
      translit: "chār",
      english: "four"
    },
    {
      numeral: "५",
      devanagari: "पाँच",
      translit: "pāñch",
      english: "five"
    },
    {
      numeral: "६",
      devanagari: "छह",
      translit: "chhah",
      english: "six"
    },
    {
      numeral: "७",
      devanagari: "सात",
      translit: "sāt",
      english: "seven"
    },
    {
      numeral: "८",
      devanagari: "आठ",
      translit: "āṭh",
      english: "eight"
    },
    {
      numeral: "९",
      devanagari: "नौ",
      translit: "nau",
      english: "nine"
    },
    {
      numeral: "१०",
      devanagari: "दस",
      translit: "das",
      english: "ten"
    }
  ];

  // Numbers 11-20
  const numbers11to20 = [
    {
      numeral: "११",
      devanagari: "ग्यारह",
      translit: "gyārah"
    },
    {
      numeral: "१२",
      devanagari: "बारह",
      translit: "bārah"
    },
    {
      numeral: "१३",
      devanagari: "तेरह",
      translit: "terah"
    },
    {
      numeral: "१४",
      devanagari: "चौदह",
      translit: "chaudah"
    },
    {
      numeral: "१५",
      devanagari: "पंद्रह",
      translit: "pandrah"
    },
    {
      numeral: "१६",
      devanagari: "सोलह",
      translit: "solah"
    },
    {
      numeral: "१७",
      devanagari: "सत्रह",
      translit: "satrah"
    },
    {
      numeral: "१८",
      devanagari: "अठारह",
      translit: "aṭhārah"
    },
    {
      numeral: "१९",
      devanagari: "उन्नीस",
      translit: "unnīs"
    },
    { numeral: "२०", devanagari: "बीस", translit: "bīs" }
  ];

  // Numbers 21-30
  const numbers21to30 = [
    {
      numeral: "२१",
      devanagari: "इक्कीस",
      translit: "ikkīs"
    },
    { numeral: "२२", devanagari: "बाईस", translit: "bāīs" },
    { numeral: "२३", devanagari: "तेईस", translit: "teīs" },
    {
      numeral: "२४",
      devanagari: "चौबीस",
      translit: "chaubīs"
    },
    {
      numeral: "२५",
      devanagari: "पच्चीस",
      translit: "pacchīs"
    },
    {
      numeral: "२६",
      devanagari: "छब्बीस",
      translit: "chabbīs"
    },
    {
      numeral: "२७",
      devanagari: "सत्ताइस",
      translit: "sattāīs"
    },
    {
      numeral: "२८",
      devanagari: "अट्ठाईस",
      translit: "aṭṭhāīs"
    },
    {
      numeral: "२९",
      devanagari: "उनतीस",
      translit: "untīs"
    },
    { numeral: "३०", devanagari: "तीस", translit: "tīs" }
  ];

  // Large numbers
  const largeNumbers = [
    {
      numeral: "१००",
      devanagari: "सौ",
      translit: "sau",
      english: "hundred"
    },
    {
      numeral: "१०००",
      devanagari: "हज़ार",
      translit: "hazār",
      english: "thousand"
    },
    {
      numeral: "१,००,०००",
      devanagari: "लाख",
      translit: "lākh",
      english: "lakh"
    },
    {
      numeral: "१,००,००,०००",
      devanagari: "करोड़",
      translit: "karoṛ",
      english: "crore"
    },
    {
      numeral: "१,००,००,००,०००",
      devanagari: "अरब",
      translit: "arab",
      english: "billion"
    }
  ];

  // Format number with Hindi numerals
  function toHindiNumerals(num) {
    const hindiDigits = [
      "०",
      "१",
      "२",
      "३",
      "४",
      "५",
      "६",
      "७",
      "८",
      "९"
    ];
    return num
      .toString()
      .replace(/\d/g, (d) => hindiDigits[parseInt(d)]);
  }

  // Generate sequence 1-100
  const numbers1to100 = [];
  for (let i = 1; i <= 100; i++) {
    numbers1to100.push(i);
  }

  // Generate sequence 101-120
  const numbers101to120 = [];
  for (let i = 101; i <= 120; i++) {
    numbers101to120.push(i);
  }
</script>

<div class="hindi-numbers-container">
  <header class="table-header">
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
    <div class="header-decoration">
      <span class="decoration-symbol">🔢</span>
      <span class="decoration-text">हिन्दी अंक</span>
      <span class="decoration-symbol">१२३</span>
    </div>
  </header>

  <!-- Main Numbers Table -->
  <section class="table-section">
    <h2>📊 संख्या तालिका (Numbers Table)</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="sticky-col"
              >इकाई<br /><span class="subhead">(Units)</span
              ></th
            >
            {#each tens as ten}
              <th>
                <div class="ten-header">
                  <span class="hindi-number"
                    >{ten.numeral}</span
                  >
                  <span class="name">{ten.name}</span>
                  <span class="translit small"
                    >{ten.translit}</span
                  >
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each numberTable as row}
            <tr>
              <td class="sticky-col unit-cell">
                <span class="hindi-number"
                  >{units[row.unit].numeral}</span
                >
                <span class="unit-name">{row.name}</span>
                <span class="translit small"
                  >{row.translit}</span
                >
              </td>
              {#each row.values as value}
                <td class="number-cell">
                  <span class="hindi-text">{value}</span>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Large Numbers -->
  <section class="info-cards">
    <h2>बड़ी संख्याएँ (Large Numbers)</h2>
    <div class="large-numbers-grid">
      {#each largeNumbers as num}
        <div class="info-card">
          <div class="large-number">
            <span class="hindi-digit">{num.numeral}</span>
            <span class="hindi-name">{num.devanagari}</span>
            <span class="translit">{num.translit}</span>
            <span class="english-name">{num.english}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Basic Numbers 1-10 -->
  <section class="sequence-section">
    <h2>१-१० (Numbers 1 to 10)</h2>
    <div class="basic-numbers-grid">
      {#each basicNumbers as num}
        <div class="basic-card">
          <span class="hindi-numeral">{num.numeral}</span>
          <span class="hindi-word">{num.devanagari}</span>
          <span class="translit">{num.translit}</span>
          <span class="english-small">{num.english}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Numbers 11-20 -->
  <section class="sequence-section">
    <h2>११-२० (Numbers 11 to 20)</h2>
    <div class="number-grid">
      {#each numbers11to20 as num}
        <div class="number-item">
          <span class="hindi-numeral">{num.numeral}</span>
          <span class="hindi-word">{num.devanagari}</span>
          <span class="translit small">{num.translit}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Numbers 21-30 -->
  <section class="sequence-section">
    <h2>२१-३० (Numbers 21 to 30)</h2>
    <div class="number-grid">
      {#each numbers21to30 as num}
        <div class="number-item">
          <span class="hindi-numeral">{num.numeral}</span>
          <span class="hindi-word">{num.devanagari}</span>
          <span class="translit small">{num.translit}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Numbers 1-100 Grid -->
  <section class="sequence-section">
    <h2>१-१०० (Numbers 1 to 100)</h2>
    <div class="hundreds-grid">
      {#each numbers1to100 as num}
        <span class="grid-number"
          >{toHindiNumerals(num)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Numbers 101-120 Grid -->
  <section class="sequence-section">
    <h2>१०१-१२० (Numbers 101 to 120)</h2>
    <div class="hundreds-grid">
      {#each numbers101to120 as num}
        <span class="grid-number"
          >{toHindiNumerals(num)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Pronunciation Guide -->
  <section class="pronunciation-guide">
    <h2>🗣️ उच्चारण गाइड (Pronunciation Guide)</h2>
    <div class="guide-grid">
      <div class="guide-card">
        <h3>महत्वपूर्ण नियम (Important Rules)</h3>
        <ul class="rule-list">
          <li>
            <strong>चंद्रबिंदु (ँ)</strong> - nasalization: पाँच
            (pāñch)
          </li>
          <li>
            <strong>अनुस्वार (ं)</strong> - nasal sound: पंद्रह
            (pandrah)
          </li>
          <li>
            <strong>विसर्ग (ः)</strong> - voiceless breath
          </li>
          <li>
            <strong>हलंत (्)</strong> - suppresses inherent vowel
          </li>
        </ul>
      </div>
      <div class="guide-card">
        <h3>विशेष उच्चारण (Special Pronunciation)</h3>
        <ul class="rule-list">
          <li>
            <strong>ड़</strong> - retroflex flapped: सड़सठ (saṛsaṭh)
          </li>
          <li>
            <strong>ढ़</strong> - aspirated retroflex flapped
          </li>
          <li>
            <strong>क्ष</strong> - क + ष: इक्यासी (ikyāsī)
          </li>
          <li><strong>ज्ञ</strong> - ज + ञ</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="table-footer">
    <p>हिन्दी गिनती - संख्याओं की पूरी तालिका</p>
    <p class="small">
      Complete table of Hindi numbers from 0 to 100 and
      beyond
    </p>
  </footer>
</div>

<style>
  .hindi-numbers-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", "Arial Unicode MS",
      system-ui, sans-serif;
    background: linear-gradient(145deg, #f0f0fa, #e6e6f0);
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .table-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #4834d4, #686de0);
    border-radius: 1.5rem;
    color: white;
    box-shadow: 0 10px 20px rgba(72, 52, 212, 0.3);
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.8rem;
    color: #4834d4;
    margin: 2rem 0 1.5rem;
    padding-left: 0.75rem;
    border-left: 8px solid #686de0;
    font-weight: 600;
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

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    border-radius: 24px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(72, 52, 212, 0.2);
    border: 2px solid #a5a5d9;
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
    background: linear-gradient(145deg, #4834d4, #686de0);
    color: white;
    font-weight: 600;
    padding: 1rem 0.5rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 3px solid #2c1f7a;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 20;
    min-width: 130px;
  }

  td.sticky-col {
    background: #f0f0fa;
    border-right: 3px solid #a5a5d9;
    font-weight: 600;
  }

  .subhead {
    font-size: 0.75rem;
    opacity: 0.9;
    font-weight: normal;
  }

  .ten-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .hindi-number {
    font-size: 1.8rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
    line-height: 1.2;
  }

  .unit-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem 0.5rem;
    background: #f0f0fa;
  }

  .unit-name {
    font-size: 1rem;
    color: #4834d4;
    font-weight: 600;
  }

  .number-cell {
    padding: 0.75rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #d9d9f0;
    font-size: 1.2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
  }

  .hindi-text {
    font-size: 1.2rem;
  }

  .name {
    font-size: 0.9rem;
  }

  .translit {
    font-size: 0.8rem;
    color: #666;
    font-style: italic;
  }

  .small {
    font-size: 0.7rem;
  }

  /* Large Numbers Grid */
  .large-numbers-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(180px, 1fr)
    );
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .info-card {
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
    border: 1px solid #a5a5d9;
    text-align: center;
    transition: transform 0.2s ease;
  }

  .info-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 24px rgba(72, 52, 212, 0.15);
  }

  .large-number {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .hindi-digit {
    font-size: 2.2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
    color: #4834d4;
  }

  .hindi-name {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2c1f7a;
  }

  .english-name {
    font-size: 0.9rem;
    color: #666;
  }

  /* Basic Numbers Grid */
  .basic-numbers-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(100px, 1fr)
    );
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .basic-card {
    background: white;
    border-radius: 16px;
    padding: 1rem;
    text-align: center;
    border: 2px solid #a5a5d9;
    transition: all 0.2s ease;
  }

  .basic-card:hover {
    background: #4834d4;
    border-color: #4834d4;
  }

  .basic-card:hover .hindi-numeral,
  .basic-card:hover .hindi-word,
  .basic-card:hover .translit,
  .basic-card:hover .english-small {
    color: white;
  }

  .hindi-numeral {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #4834d4;
  }

  .hindi-word {
    display: block;
    font-size: 1.2rem;
    font-weight: 600;
    color: #2c1f7a;
  }

  .english-small {
    display: block;
    font-size: 0.8rem;
    color: #666;
    text-transform: capitalize;
  }

  /* Number Grids */
  .number-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(120px, 1fr)
    );
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .number-item {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    border: 1px solid #a5a5d9;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .number-item .hindi-numeral {
    font-size: 1.6rem;
  }

  .number-item .hindi-word {
    font-size: 1.1rem;
  }

  /* Hundreds Grid */
  .hundreds-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(60px, 1fr)
    );
    gap: 0.5rem;
    background: white;
    padding: 1.5rem;
    border-radius: 24px;
    border: 1px solid #a5a5d9;
    margin: 1.5rem 0;
  }

  .grid-number {
    text-align: center;
    padding: 0.5rem;
    background: #f0f0fa;
    border-radius: 8px;
    font-size: 1.2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", sans-serif;
    color: #4834d4;
    border: 1px solid #d9d9f0;
    transition: all 0.2s ease;
  }

  .grid-number:hover {
    background: #4834d4;
    color: white;
    transform: scale(1.05);
  }

  /* Pronunciation Guide */
  .pronunciation-guide {
    margin: 3rem 0;
  }

  .guide-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 1.5rem;
  }

  .guide-card {
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
    border: 1px solid #a5a5d9;
  }

  .guide-card h3 {
    color: #4834d4;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    border-bottom: 2px solid #d9d9f0;
    padding-bottom: 0.5rem;
  }

  .rule-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rule-list li {
    padding: 0.5rem 0;
    border-bottom: 1px dashed #d9d9f0;
    color: #2c1f7a;
  }

  .rule-list li:last-child {
    border-bottom: none;
  }

  .rule-list strong {
    color: #4834d4;
    font-weight: 600;
  }

  /* Zebra striping for table */
  tbody tr:nth-child(even) {
    background-color: #f8f8ff;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
  }

  /* Footer */
  .table-footer {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(145deg, #4834d4, #686de0);
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
    .hindi-numbers-container {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .hundreds-grid {
      grid-template-columns: repeat(10, 1fr);
    }
  }

  @media (max-width: 480px) {
    .hundreds-grid {
      grid-template-columns: repeat(5, 1fr);
    }

    .basic-numbers-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .number-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
