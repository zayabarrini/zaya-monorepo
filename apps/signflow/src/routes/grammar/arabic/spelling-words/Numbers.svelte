<script>
  export let title = "العد - Arabic Numbers Table";
  export let subtitle =
    "جدول الأرقام العربية (Arabic Numerals Conjugation)";

  // Define the tens (العشرات)
  const tens = [
    {
      arabic: "٠",
      name: "صفر",
      translit: "sifr",
      value: 0
    },
    {
      arabic: "١٠",
      name: "عشرة",
      translit: "ʿashara",
      value: 10
    },
    {
      arabic: "٢٠",
      name: "عشرون",
      translit: "ʿishrūn",
      value: 20
    },
    {
      arabic: "٣٠",
      name: "ثلاثون",
      translit: "thalāthūn",
      value: 30
    },
    {
      arabic: "٤٠",
      name: "أربعون",
      translit: "arbaʿūn",
      value: 40
    },
    {
      arabic: "٥٠",
      name: "خمسون",
      translit: "khamsūn",
      value: 50
    },
    {
      arabic: "٦٠",
      name: "ستون",
      translit: "sittūn",
      value: 60
    },
    {
      arabic: "٧٠",
      name: "سبعون",
      translit: "sabʿūn",
      value: 70
    },
    {
      arabic: "٨٠",
      name: "ثمانون",
      translit: "thamānūn",
      value: 80
    },
    {
      arabic: "٩٠",
      name: "تسعون",
      translit: "tisʿūn",
      value: 90
    },
    {
      arabic: "١٠٠",
      name: "مائة",
      translit: "miʾa",
      value: 100
    }
  ];

  // Define the units (الآحاد)
  const units = [
    {
      arabic: "٠",
      name: "صفر",
      translit: "sifr",
      value: 0
    },
    {
      arabic: "١",
      name: "واحد",
      translit: "wāḥid",
      value: 1
    },
    {
      arabic: "٢",
      name: "اثنان",
      translit: "ithnān",
      value: 2
    },
    {
      arabic: "٣",
      name: "ثلاثة",
      translit: "thalātha",
      value: 3
    },
    {
      arabic: "٤",
      name: "أربعة",
      translit: "arbaʿa",
      value: 4
    },
    {
      arabic: "٥",
      name: "خمسة",
      translit: "khamsa",
      value: 5
    },
    {
      arabic: "٦",
      name: "ستة",
      translit: "sitta",
      value: 6
    },
    {
      arabic: "٧",
      name: "سبعة",
      translit: "sabʿa",
      value: 7
    },
    {
      arabic: "٨",
      name: "ثمانية",
      translit: "thamāniya",
      value: 8
    },
    {
      arabic: "٩",
      name: "تسعة",
      translit: "tisʿa",
      value: 9
    }
  ];

  // Define ordinal numbers (الأعداد الترتيبية)
  const ordinals = [
    {
      arabic: "الأول",
      translit: "al-awwal",
      english: "first"
    },
    {
      arabic: "الثاني",
      translit: "ath-thānī",
      english: "second"
    },
    {
      arabic: "الثالث",
      translit: "ath-thālith",
      english: "third"
    },
    {
      arabic: "الرابع",
      translit: "ar-rābiʿ",
      english: "fourth"
    },
    {
      arabic: "الخامس",
      translit: "al-khāmis",
      english: "fifth"
    },
    {
      arabic: "السادس",
      translit: "as-sādis",
      english: "sixth"
    },
    {
      arabic: "السابع",
      translit: "as-sābiʿ",
      english: "seventh"
    },
    {
      arabic: "الثامن",
      translit: "ath-thāmin",
      english: "eighth"
    },
    {
      arabic: "التاسع",
      translit: "at-tāsiʿ",
      english: "ninth"
    },
    {
      arabic: "العاشر",
      translit: "al-ʿāshir",
      english: "tenth"
    },
    {
      arabic: "الحادي عشر",
      translit: "al-ḥādī ʿashar",
      english: "eleventh"
    }
  ];

  // Define the numbers table data
  const numberTable = [
    {
      unit: 0,
      name: "صفر",
      values: [
        "صفر",
        "عشرة",
        "عشرون",
        "ثلاثون",
        "أربعون",
        "خمسون",
        "ستون",
        "سبعون",
        "ثمانون",
        "تسعون",
        "مائة"
      ]
    },
    {
      unit: 1,
      name: "واحد",
      values: [
        "واحد",
        "أحد عشر",
        "واحد وعشرون",
        "واحد وثلاثون",
        "واحد وأربعون",
        "واحد وخمسون",
        "واحد وستون",
        "واحد وسبعون",
        "واحد وثمانون",
        "واحد وتسعون",
        "—"
      ]
    },
    {
      unit: 2,
      name: "اثنان",
      values: [
        "اثنان",
        "اثنا عشر",
        "اثنان وعشرون",
        "اثنان وثلاثون",
        "اثنان وأربعون",
        "اثنان وخمسون",
        "اثنان وستون",
        "اثنان وسبعون",
        "اثنان وثمانون",
        "اثنان وتسعون",
        "—"
      ]
    },
    {
      unit: 3,
      name: "ثلاثة",
      values: [
        "ثلاثة",
        "ثلاثة عشر",
        "ثلاثة وعشرون",
        "ثلاثة وثلاثون",
        "ثلاثة وأربعون",
        "ثلاثة وخمسون",
        "ثلاثة وستون",
        "ثلاثة وسبعون",
        "ثلاثة وثمانون",
        "ثلاثة وتسعون",
        "—"
      ]
    },
    {
      unit: 4,
      name: "أربعة",
      values: [
        "أربعة",
        "أربعة عشر",
        "أربعة وعشرون",
        "أربعة وثلاثون",
        "أربعة وأربعون",
        "أربعة وخمسون",
        "أربعة وستون",
        "أربعة وسبعون",
        "أربعة وثمانون",
        "أربعة وتسعون",
        "—"
      ]
    },
    {
      unit: 5,
      name: "خمسة",
      values: [
        "خمسة",
        "خمسة عشر",
        "خمسة وعشرون",
        "خمسة وثلاثون",
        "خمسة وأربعون",
        "خمسة وخمسون",
        "خمسة وستون",
        "خمسة وسبعون",
        "خمسة وثمانون",
        "خمسة وتسعون",
        "—"
      ]
    },
    {
      unit: 6,
      name: "ستة",
      values: [
        "ستة",
        "ستة عشر",
        "ستة وعشرون",
        "ستة وثلاثون",
        "ستة وأربعون",
        "ستة وخمسون",
        "ستة وستون",
        "ستة وسبعون",
        "ستة وثمانون",
        "ستة وتسعون",
        "—"
      ]
    },
    {
      unit: 7,
      name: "سبعة",
      values: [
        "سبعة",
        "سبعة عشر",
        "سبعة وعشرون",
        "سبعة وثلاثون",
        "سبعة وأربعون",
        "سبعة وخمسون",
        "سبعة وستون",
        "سبعة وسبعون",
        "سبعة وثمانون",
        "سبعة وتسعون",
        "—"
      ]
    },
    {
      unit: 8,
      name: "ثمانية",
      values: [
        "ثمانية",
        "ثمانية عشر",
        "ثمانية وعشرون",
        "ثمانية وثلاثون",
        "ثمانية وأربعون",
        "ثمانية وخمسون",
        "ثمانية وستون",
        "ثمانية وسبعون",
        "ثمانية وثمانون",
        "ثمانية وتسعون",
        "—"
      ]
    },
    {
      unit: 9,
      name: "تسعة",
      values: [
        "تسعة",
        "تسعة عشر",
        "تسعة وعشرون",
        "تسعة وثلاثون",
        "تسعة وأربعون",
        "تسعة وخمسون",
        "تسعة وستون",
        "تسعة وسبعون",
        "تسعة وثمانون",
        "تسعة وتسعون",
        "—"
      ]
    }
  ];

  // Generate sequence 1-100
  const numbers1to100 = [];
  for (let i = 1; i <= 100; i++) {
    numbers1to100.push(i.toString());
  }

  // Generate sequence 101-120
  const numbers101to120 = [];
  for (let i = 101; i <= 120; i++) {
    numbers101to120.push(i.toString());
  }

  // Generate years 1990-2035
  const years = [];
  for (let i = 1990; i <= 2035; i++) {
    years.push(i.toString());
  }

  // Generate hundreds
  const hundreds = [
    200, 300, 400, 500, 600, 700, 800, 900, 1000
  ];

  // Format number with Arabic numerals
  function toArabicNumerals(num) {
    const arabicDigits = [
      "٠",
      "١",
      "٢",
      "٣",
      "٤",
      "٥",
      "٦",
      "٧",
      "٨",
      "٩"
    ];
    return num
      .toString()
      .replace(/\d/g, (d) => arabicDigits[parseInt(d)]);
  }
</script>

<div class="arabic-numbers-container" dir="rtl">
  <header class="table-header">
    <h1>{title}</h1>
    <p class="subtitle">{subtitle}</p>
    <div class="header-decoration">
      <span class="decoration-symbol">🔢</span>
      <span class="decoration-text">الأرقام العربية</span>
      <span class="decoration-symbol">١٢٣</span>
    </div>
  </header>

  <!-- Main Numbers Table -->
  <section class="table-section">
    <h2>📊 جدول الأرقام (Numbers Table)</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="sticky-col"
              >الآحاد<br /><span class="subhead"
                >(Units)</span
              ></th
            >
            {#each tens as ten}
              <th>
                <div class="ten-header">
                  <span class="arabic-number"
                    >{ten.arabic}</span
                  >
                  <span class="translit">{ten.name}</span>
                  <span class="small-text"
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
                <span class="arabic-number"
                  >{units[row.unit].arabic}</span
                >
                <span class="unit-name">{row.name}</span>
                <span class="translit small"
                  >{units[row.unit].translit}</span
                >
              </td>
              {#each row.values as value}
                <td class="number-cell">
                  {#if value === "—"}
                    <span class="empty-cell">—</span>
                  {:else}
                    <span class="arabic-text">{value}</span>
                  {/if}
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
    <div class="info-card">
      <h3>مليون (Million)</h3>
      <div class="large-number">
        <span class="arabic-digit">١٬٠٠٠٬٠٠٠</span>
        <span class="translit">million</span>
      </div>
    </div>
    <div class="info-card">
      <h3>مليار (Billion)</h3>
      <div class="large-number">
        <span class="arabic-digit">١٬٠٠٠٬٠٠٠٬٠٠٠</span>
        <span class="translit">billion</span>
      </div>
    </div>
    <div class="info-card">
      <h3>سنتيم (Centimeter)</h3>
      <div class="large-number">
        <span class="arabic-digit">سم</span>
        <span class="translit">santīm</span>
      </div>
    </div>
  </section>

  <!-- Ordinal Numbers -->
  <section class="ordinal-section">
    <h2>🔢 الأعداد الترتيبية (Ordinal Numbers)</h2>
    <div class="ordinal-grid">
      {#each ordinals as ordinal}
        <div class="ordinal-card">
          <span class="ordinal-arabic"
            >{ordinal.arabic}</span
          >
          <span class="ordinal-translit"
            >{ordinal.translit}</span
          >
          <span class="ordinal-english"
            >{ordinal.english}</span
          >
        </div>
      {/each}
    </div>
  </section>

  <!-- Numbers 1-100 -->
  <section class="sequence-section">
    <h2>١-١٠٠ (Numbers 1 to 100)</h2>
    <div class="number-grid">
      {#each numbers1to100 as num}
        <span class="number-item"
          >{toArabicNumerals(num)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Numbers 101-120 -->
  <section class="sequence-section">
    <h2>١٠١-١٢٠ (Numbers 101 to 120)</h2>
    <div class="number-grid">
      {#each numbers101to120 as num}
        <span class="number-item"
          >{toArabicNumerals(num)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Hundreds -->
  <section class="sequence-section">
    <h2>المئات (Hundreds)</h2>
    <div class="number-grid">
      {#each hundreds as num}
        <span class="number-item"
          >{toArabicNumerals(num)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Years -->
  <section class="sequence-section">
    <h2>السنوات (Years 1990-2035)</h2>
    <div class="number-grid years-grid">
      {#each years as year}
        <span class="number-item year-item"
          >{toArabicNumerals(year)}</span
        >
      {/each}
    </div>
  </section>

  <!-- Date Example -->
  <section class="date-example">
    <h2>📅 مثال التاريخ (Date Example)</h2>
    <div class="date-card">
      <span class="date-arabic">١٦/٠٥/٢٠٢٤</span>
      <span class="date-explanation">16 مايو 2024</span>
    </div>
  </section>

  <!-- Footer -->
  <footer class="table-footer">
    <p>الأعداد العربية - نظام العد والترقيم</p>
    <p class="small">
      Arabic numerals - Counting and numbering system
    </p>
  </footer>
</div>

<style>
  .arabic-numbers-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      "Traditional Arabic", "Amiri", "Scheherazade",
      "Arial", system-ui, sans-serif;
    background: linear-gradient(145deg, #f5f0e6, #e8dfd1);
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    direction: rtl;
  }

  .table-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #2c5f2d, #1e4a1f);
    border-radius: 1.5rem;
    color: white;
    box-shadow: 0 10px 20px rgba(30, 74, 31, 0.3);
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.8rem;
    color: #1e4a1f;
    margin: 2rem 0 1.5rem;
    padding-right: 0.75rem;
    border-right: 8px solid #2c5f2d;
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
    box-shadow: 0 20px 40px -15px rgba(44, 95, 45, 0.2);
    border: 2px solid #97b596;
    margin: 2rem 0;
    max-height: 900px;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    min-width: 1200px;
  }

  th {
    background: linear-gradient(145deg, #2c5f2d, #1e4a1f);
    color: white;
    font-weight: 600;
    padding: 1rem 0.5rem;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 3px solid #0d2e0e;
  }

  .sticky-col {
    position: sticky;
    right: 0;
    background: inherit;
    z-index: 20;
    min-width: 130px;
  }

  td.sticky-col {
    background: #e8f0e8;
    border-left: 3px solid #97b596;
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

  .arabic-number {
    font-size: 1.8rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    line-height: 1.2;
  }

  .unit-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.75rem 0.5rem;
    background: #e8f0e8;
  }

  .unit-name {
    font-size: 1rem;
    color: #1e4a1f;
    font-weight: 600;
  }

  .number-cell {
    padding: 0.75rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #c5d6c5;
    font-size: 1.2rem;
    font-family: "Traditional Arabic", "Amiri", serif;
  }

  .arabic-text {
    font-size: 1.2rem;
  }

  .empty-cell {
    color: #97b596;
    font-size: 1.2rem;
  }

  .translit {
    font-size: 0.8rem;
    color: #5a715a;
    font-style: italic;
  }

  .small {
    font-size: 0.7rem;
  }

  /* Info Cards */
  .info-cards {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .info-card {
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
    border: 1px solid #97b596;
    text-align: center;
  }

  .info-card h3 {
    color: #1e4a1f;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    border-bottom: 2px solid #c5d6c5;
    padding-bottom: 0.5rem;
  }

  .large-number {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .arabic-digit {
    font-size: 2.2rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #2c5f2d;
  }

  /* Ordinal Numbers */
  .ordinal-section {
    margin: 2rem 0;
  }

  .ordinal-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(150px, 1fr)
    );
    gap: 1rem;
  }

  .ordinal-card {
    background: white;
    border-radius: 20px;
    padding: 1rem;
    text-align: center;
    border: 2px solid #97b596;
    transition: transform 0.2s ease;
  }

  .ordinal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(44, 95, 45, 0.15);
  }

  .ordinal-arabic {
    display: block;
    font-size: 1.6rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #1e4a1f;
  }

  .ordinal-translit {
    display: block;
    font-size: 0.9rem;
    color: #5a715a;
    font-style: italic;
  }

  .ordinal-english {
    display: block;
    font-size: 0.8rem;
    color: #8b9a8b;
  }

  /* Number Grids */
  .sequence-section {
    margin: 2rem 0;
  }

  .number-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(60px, 1fr)
    );
    gap: 0.5rem;
    background: white;
    padding: 1.5rem;
    border-radius: 24px;
    border: 1px solid #97b596;
  }

  .number-item {
    text-align: center;
    padding: 0.5rem;
    background: #f5f9f5;
    border-radius: 12px;
    font-size: 1.2rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    color: #1e4a1f;
    border: 1px solid #c5d6c5;
  }

  .years-grid {
    grid-template-columns: repeat(
      auto-fill,
      minmax(80px, 1fr)
    );
  }

  .year-item {
    background: #e8f0e8;
  }

  /* Date Example */
  .date-example {
    margin: 2rem 0;
  }

  .date-card {
    background: linear-gradient(145deg, #2c5f2d, #1e4a1f);
    color: white;
    padding: 2rem;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 10px 20px rgba(30, 74, 31, 0.3);
  }

  .date-arabic {
    display: block;
    font-size: 3rem;
    font-family: "Traditional Arabic", "Amiri", serif;
    margin-bottom: 0.5rem;
  }

  .date-explanation {
    font-size: 1.2rem;
    opacity: 0.95;
  }

  /* Zebra striping for table */
  tbody tr:nth-child(even) {
    background-color: #f5f9f5;
  }

  tbody tr:nth-child(odd) {
    background-color: white;
  }

  /* Footer */
  .table-footer {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(145deg, #2c5f2d, #1e4a1f);
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
    .arabic-numbers-container {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .number-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 480px) {
    .number-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .ordinal-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
