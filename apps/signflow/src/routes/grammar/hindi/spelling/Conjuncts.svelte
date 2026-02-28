<script>
  export let title =
    "संयुक्ताक्षर - Devanagari Conjuncts & Special Symbols";

  // Most common conjuncts (1-50)
  const commonConjuncts = [
    {
      conjunct: "क्ष",
      components: "क् + ष",
      iast: "kṣa",
      example: "क्षेत्र (kṣetra)",
      meaning: "field"
    },
    {
      conjunct: "त्र",
      components: "त् + र",
      iast: "tra",
      example: "त्राण (trāṇ)",
      meaning: "protection"
    },
    {
      conjunct: "ज्ञ",
      components: "ज् + ञ",
      iast: "jña",
      example: "ज्ञान (jñān)",
      meaning: "knowledge"
    },
    {
      conjunct: "श्र",
      components: "श् + र",
      iast: "śra",
      example: "श्रम (śram)",
      meaning: "labor"
    },
    {
      conjunct: "द्य",
      components: "द् + य",
      iast: "dya",
      example: "विद्या (vidyā)",
      meaning: "knowledge"
    },
    {
      conjunct: "द्ध",
      components: "द् + ध",
      iast: "ddha",
      example: "बुद्ध (buddh)",
      meaning: "Buddha"
    },
    {
      conjunct: "त्त",
      components: "त् + त",
      iast: "tta",
      example: "सत्य (satya)",
      meaning: "truth"
    },
    {
      conjunct: "न्न",
      components: "न् + न",
      iast: "nna",
      example: "पुन्न (punn)",
      meaning: "male"
    },
    {
      conjunct: "द्द",
      components: "द् + द",
      iast: "dda",
      example: "उद्देश्य (uddeśya)",
      meaning: "objective"
    },
    {
      conjunct: "च्छ",
      components: "च् + छ",
      iast: "ccha",
      example: "सच्चा (saccā)",
      meaning: "true"
    },
    {
      conjunct: "ष्ट",
      components: "ष् + ट",
      iast: "ṣṭa",
      example: "शिष्ट (śiṣṭ)",
      meaning: "polite"
    },
    {
      conjunct: "ष्ठ",
      components: "ष् + ठ",
      iast: "ṣṭha",
      example: "स्थिर (sthira)",
      meaning: "stable"
    },
    {
      conjunct: "ङ्ग",
      components: "ङ् + ग",
      iast: "ṅga",
      example: "रंग (raṅg)",
      meaning: "color"
    },
    {
      conjunct: "न्त",
      components: "न् + त",
      iast: "nta",
      example: "अन्तर (antar)",
      meaning: "difference"
    },
    {
      conjunct: "न्द",
      components: "न् + द",
      iast: "nda",
      example: "अन्दर (andar)",
      meaning: "inside"
    },
    {
      conjunct: "म्ब",
      components: "म् + ब",
      iast: "mba",
      example: "अम्बर (ambar)",
      meaning: "sky"
    },
    {
      conjunct: "म्प",
      components: "म् + प",
      iast: "mpa",
      example: "सम्पत्ति (sampatti)",
      meaning: "wealth"
    },
    {
      conjunct: "ह्म",
      components: "ह् + म",
      iast: "hma",
      example: "ब्रह्म (brahma)",
      meaning: "Brahma"
    },
    {
      conjunct: "ह्न",
      components: "ह् + न",
      iast: "hna",
      example: "प्रह्नाद (prahnād)",
      meaning: "(name)"
    },
    {
      conjunct: "ह्ल",
      components: "ह् + ल",
      iast: "hla",
      example: "अह्लाद (ahlād)",
      meaning: "joy"
    },
    {
      conjunct: "ह्व",
      components: "ह् + व",
      iast: "hva",
      example: "आह्वान (āhvān)",
      meaning: "invitation"
    },
    {
      conjunct: "क्क",
      components: "क् + क",
      iast: "kka",
      example: "पक्का (pakkā)",
      meaning: "ripe"
    },
    {
      conjunct: "क्ट",
      components: "क् + ट",
      iast: "kṭa",
      example: "वक्टर (vakṭar)",
      meaning: "vector"
    },
    {
      conjunct: "क्र",
      components: "क् + र",
      iast: "kra",
      example: "शुक्र (śukra)",
      meaning: "Venus"
    },
    {
      conjunct: "क्ल",
      components: "क् + ल",
      iast: "kla",
      example: "क्लेश (kleś)",
      meaning: "trouble"
    },
    {
      conjunct: "ग्न",
      components: "ग् + न",
      iast: "gna",
      example: "यज्ञ (yajña)",
      meaning: "sacrifice"
    },
    {
      conjunct: "ग्ध",
      components: "ग् + ध",
      iast: "gdha",
      example: "मगध (magadh)",
      meaning: "Magadha"
    },
    {
      conjunct: "ग्म",
      components: "ग् + म",
      iast: "gma",
      example: "युग्म (yugma)",
      meaning: "pair"
    },
    {
      conjunct: "च्च",
      components: "च् + च",
      iast: "cca",
      example: "सच्चाई (saccāī)",
      meaning: "truth"
    },
    {
      conjunct: "ञ्ज",
      components: "ञ् + ज",
      iast: "ñja",
      example: "राज्ञी (rājñī)",
      meaning: "queen"
    },
    {
      conjunct: "ट्ट",
      components: "ट् + ट",
      iast: "ṭṭa",
      example: "पट्टा (paṭṭā)",
      meaning: "lease"
    },
    {
      conjunct: "ड्ड",
      components: "ड् + ड",
      iast: "ḍḍa",
      example: "खड्डा (khaḍḍā)",
      meaning: "pit"
    },
    {
      conjunct: "ण्ड",
      components: "ण् + ड",
      iast: "ṇḍa",
      example: "मण्डल (maṇḍal)",
      meaning: "circle"
    },
    {
      conjunct: "त्त",
      components: "त् + त",
      iast: "tta",
      example: "उत्तम (uttam)",
      meaning: "best"
    },
    {
      conjunct: "त्र",
      components: "त् + र",
      iast: "tra",
      example: "मित्र (mitra)",
      meaning: "friend"
    },
    {
      conjunct: "द्म",
      components: "द् + म",
      iast: "dma",
      example: "पद्म (padma)",
      meaning: "lotus"
    },
    {
      conjunct: "द्व",
      components: "द् + व",
      iast: "dva",
      example: "द्वार (dvār)",
      meaning: "door"
    },
    {
      conjunct: "ध्व",
      components: "ध् + व",
      iast: "dhva",
      example: "ध्वनि (dhvani)",
      meaning: "sound"
    },
    {
      conjunct: "न्ध",
      components: "न् + ध",
      iast: "ndha",
      example: "बन्धन (bandhan)",
      meaning: "bond"
    },
    {
      conjunct: "प्त",
      components: "प् + त",
      iast: "pta",
      example: "स्वप्त (svapta)",
      meaning: "sleeping"
    },
    {
      conjunct: "प्र",
      components: "प् + र",
      iast: "pra",
      example: "प्रेम (prem)",
      meaning: "love"
    },
    {
      conjunct: "प्ल",
      components: "प् + ल",
      iast: "pla",
      example: "प्लव (plava)",
      meaning: "float"
    },
    {
      conjunct: "ब्ज",
      components: "ब् + ज",
      iast: "bja",
      example: "अब्ज (abja)",
      meaning: "lotus"
    },
    {
      conjunct: "भ्र",
      components: "भ् + र",
      iast: "bhra",
      example: "भ्रम (bhram)",
      meaning: "illusion"
    },
    {
      conjunct: "म्ल",
      components: "म् + ल",
      iast: "mla",
      example: "अम्ल (amla)",
      meaning: "sour"
    },
    {
      conjunct: "य्य",
      components: "य् + य",
      iast: "yya",
      example: "नय्यर (nayyar)",
      meaning: "(name)"
    },
    {
      conjunct: "ल्ल",
      components: "ल् + ल",
      iast: "lla",
      example: "उल्लास (ullās)",
      meaning: "joy"
    },
    {
      conjunct: "व्र",
      components: "व् + र",
      iast: "vra",
      example: "व्रत (vrat)",
      meaning: "vow"
    },
    {
      conjunct: "श्च",
      components: "श् + च",
      iast: "śca",
      example: "श्चान (ścān)",
      meaning: "(rare)"
    },
    {
      conjunct: "श्न",
      components: "श् + न",
      iast: "śna",
      example: "प्रश्न (praśn)",
      meaning: "question"
    },
    {
      conjunct: "श्व",
      components: "श् + व",
      iast: "śva",
      example: "अश्व (aśva)",
      meaning: "horse"
    },
    {
      conjunct: "ष्ण",
      components: "ष् + ण",
      iast: "ṣṇa",
      example: "कृष्ण (kṛṣṇa)",
      meaning: "Krishna"
    },
    {
      conjunct: "स्क",
      components: "स् + क",
      iast: "ska",
      example: "स्कूल (skūl)",
      meaning: "school"
    },
    {
      conjunct: "स्त",
      components: "स् + त",
      iast: "sta",
      example: "अस्त (asta)",
      meaning: "sunset"
    },
    {
      conjunct: "स्प",
      components: "स् + प",
      iast: "spa",
      example: "स्पष्ट (spaṣṭ)",
      meaning: "clear"
    },
    {
      conjunct: "स्व",
      components: "स् + व",
      iast: "sva",
      example: "स्वर (svar)",
      meaning: "voice"
    },
    {
      conjunct: "हृ",
      components: "ह् + ऋ",
      iast: "hṛ",
      example: "हृदय (hṛday)",
      meaning: "heart"
    }
  ];

  // Additional conjuncts (51-100)
  const additionalConjuncts = [
    {
      conjunct: "ङ्क",
      components: "ङ् + क",
      iast: "ṅka",
      example: "शङ्का (śaṅkā)",
      meaning: "doubt"
    },
    {
      conjunct: "ञ्च",
      components: "ञ् + च",
      iast: "ñca",
      example: "पञ्च (pañca)",
      meaning: "five"
    },
    {
      conjunct: "ट्ठ",
      components: "ट् + ठ",
      iast: "ṭṭha",
      example: "कट्ठा (kaṭṭhā)",
      meaning: "hard"
    },
    {
      conjunct: "ठ्ठ",
      components: "ठ् + ठ",
      iast: "ṭhṭha",
      example: "लठ्ठ (laṭhṭh)",
      meaning: "club"
    },
    {
      conjunct: "ड्ढ",
      components: "ड् + ढ",
      iast: "ḍḍha",
      example: "पेड्ढा (peḍḍhā)",
      meaning: "(dialectal)"
    },
    {
      conjunct: "ढ्ढ",
      components: "ढ् + ढ",
      iast: "ḍhḍha",
      example: "कढ्ढा (kaḍhḍhā)",
      meaning: "(dialectal)"
    },
    {
      conjunct: "ण्ण",
      components: "ण् + ण",
      iast: "ṇṇa",
      example: "पण्ण (paṇṇa)",
      meaning: "leaf"
    },
    {
      conjunct: "न्त्र",
      components: "न् + त् + र",
      iast: "ntra",
      example: "यन्त्र (yantra)",
      meaning: "machine"
    },
    {
      conjunct: "न्द्र",
      components: "न् + द् + र",
      iast: "ndra",
      example: "इन्द्र (indra)",
      meaning: "Indra"
    },
    {
      conjunct: "म्भ",
      components: "म् + भ",
      iast: "mbha",
      example: "आम्भ (āmbha)",
      meaning: "water"
    },
    {
      conjunct: "म्न",
      components: "म् + न",
      iast: "mna",
      example: "प्रम्न (pramna)",
      meaning: "question"
    },
    {
      conjunct: "र्व",
      components: "र् + व",
      iast: "rva",
      example: "गर्व (garva)",
      meaning: "pride"
    },
    {
      conjunct: "ल्क",
      components: "ल् + क",
      iast: "lka",
      example: "वल्कल (valkala)",
      meaning: "bark"
    },
    {
      conjunct: "ल्म",
      components: "ल् + म",
      iast: "lma",
      example: "कल्मष (kalmaṣ)",
      meaning: "sin"
    },
    {
      conjunct: "ल्व",
      components: "ल् + व",
      iast: "lva",
      example: "सल्व (salva)",
      meaning: "salwa"
    },
    {
      conjunct: "व्य",
      components: "व् + य",
      iast: "vya",
      example: "व्यक्ति (vyakti)",
      meaning: "person"
    },
    {
      conjunct: "श्ल",
      components: "श् + ल",
      iast: "śla",
      example: "श्लोक (ślok)",
      meaning: "verse"
    },
    {
      conjunct: "ष्क",
      components: "ष् + क",
      iast: "ṣka",
      example: "ष्कन्ध (ṣkandha)",
      meaning: "shoulder"
    },
    {
      conjunct: "ष्प",
      components: "ष् + प",
      iast: "ṣpa",
      example: "ष्पृश (ṣpṛśa)",
      meaning: "touch"
    },
    {
      conjunct: "ष्म",
      components: "ष् + म",
      iast: "ṣma",
      example: "उष्मा (uṣmā)",
      meaning: "heat"
    },
    {
      conjunct: "स्फ",
      components: "स् + फ",
      iast: "spha",
      example: "स्फटिक (sphaṭik)",
      meaning: "crystal"
    },
    {
      conjunct: "ह्ण",
      components: "ह् + ण",
      iast: "hṇa",
      example: "प्रह्ण (prahṇa)",
      meaning: "(rare)"
    },
    {
      conjunct: "ह्य",
      components: "ह् + य",
      iast: "hya",
      example: "अह्य (ahya)",
      meaning: "today"
    }
  ];

  // Basic conjuncts with ra
  const raConjuncts = [
    {
      conjunct: "क्र",
      components: "क् + र",
      iast: "kra",
      example: "क्रांति (krānti)",
      meaning: "revolution"
    },
    {
      conjunct: "त्र",
      components: "त् + र",
      iast: "tra",
      example: "मित्र (mitra)",
      meaning: "friend"
    },
    {
      conjunct: "ग्र",
      components: "ग् + र",
      iast: "gra",
      example: "ग्रह (grah)",
      meaning: "planet"
    },
    {
      conjunct: "प्र",
      components: "प् + र",
      iast: "pra",
      example: "प्रश्न (praśna)",
      meaning: "question"
    },
    {
      conjunct: "ब्र",
      components: "ब् + र",
      iast: "bra",
      example: "ब्रह्म (brahma)",
      meaning: "Brahma"
    },
    {
      conjunct: "ज्ञ",
      components: "ज् + ञ",
      iast: "jña",
      example: "ज्ञान (jñān)",
      meaning: "knowledge"
    },
    {
      conjunct: "क्ष",
      components: "क् + ष",
      iast: "kṣa",
      example: "शिक्षा (śikṣā)",
      meaning: "education"
    },
    {
      conjunct: "श्र",
      components: "श् + र",
      iast: "śra",
      example: "श्रद्धा (śraddhā)",
      meaning: "faith"
    }
  ];

  // Trigrupo (three-consonant conjuncts)
  const trigrupoConjuncts = [
    {
      conjunct: "स्क्र",
      components: "स् + क् + र",
      syllables: ["स्क्र", "स्क्रि", "स्क्रु"],
      example: "स्क्रिप्ट (skripṭ)",
      meaning: "script"
    },
    {
      conjunct: "स्प्र",
      components: "स् + प् + र",
      syllables: ["स्प्र", "स्प्रि", "स्प्रु"],
      example: "स्प्रिंग (spring)",
      meaning: "spring"
    },
    {
      conjunct: "स्म्र",
      components: "स् + म् + र",
      syllables: ["स्म्र", "स्म्रि", "स्म्रु"],
      example: "स्मरण (smaraṇ)",
      meaning: "memory"
    },
    {
      conjunct: "त्स्त्र",
      components: "त् + स् + त् + र",
      syllables: ["त्स्त्र", "त्स्त्रि", "त्स्त्रु"],
      example: "त्स्त्रिणी (tsstriṇī)",
      meaning: "(rare)"
    },
    {
      conjunct: "ध्भ्य",
      components: "द् + भ् + य",
      syllables: ["ध्भ्य", "ध्भ्यि", "ध्भ्यु"],
      example: "श्रद्ध्भ्य (śraddhbhya)",
      meaning: "(rare)"
    },
    {
      conjunct: "ह्म्न",
      components: "ह् + म् + न",
      syllables: ["ह्म्न", "ह्म्नि", "ह्म्नु"],
      example: "(rare)",
      meaning: "rare"
    }
  ];

  // Matras (vowel signs)
  const matras = [
    {
      symbol: "ा",
      name: "आ की मात्रा (ā kī mātrā)",
      type: "Long vowel",
      function: "Adds long ā sound",
      example: "राम (rām)",
      translit: "rām"
    },
    {
      symbol: "ि",
      name: "इ की मात्रा (i kī mātrā)",
      type: "Short vowel",
      function: "Adds short i sound",
      example: "किताब (kitāb)",
      translit: "kitāb"
    },
    {
      symbol: "ी",
      name: "ई की मात्रा (ī kī mātrā)",
      type: "Long vowel",
      function: "Adds long ī sound",
      example: "पीना (pīnā)",
      translit: "pīnā"
    },
    {
      symbol: "ु",
      name: "उ की मात्रा (u kī mātrā)",
      type: "Short vowel",
      function: "Adds short u sound",
      example: "गुलाब (gulāb)",
      translit: "gulāb"
    },
    {
      symbol: "ू",
      name: "ऊ की मात्रा (ū kī mātrā)",
      type: "Long vowel",
      function: "Adds long ū sound",
      example: "फूल (phūl)",
      translit: "phūl"
    },
    {
      symbol: "े",
      name: "ए की मात्रा (e kī mātrā)",
      type: "Mid vowel",
      function: "Adds e sound",
      example: "मेरा (merā)",
      translit: "merā"
    },
    {
      symbol: "ै",
      name: "ऐ की मात्रा (ai kī mātrā)",
      type: "Open vowel",
      function: "Adds ai sound",
      example: "बैल (bail)",
      translit: "bail"
    },
    {
      symbol: "ो",
      name: "ओ की मात्रा (o kī mātrā)",
      type: "Closed vowel",
      function: "Adds o sound",
      example: "रोज़ (roz)",
      translit: "roz"
    },
    {
      symbol: "ौ",
      name: "औ की मात्रा (au kī mātrā)",
      type: "Closed vowel",
      function: "Adds au sound",
      example: "दौड़ (dauṛ)",
      translit: "dauṛ"
    },
    {
      symbol: "्",
      name: "हलंत (halant)",
      type: "Suppressor",
      function: "Suppresses inherent 'a'",
      example: "श् + र = श्र",
      translit: "śra"
    }
  ];

  // Special consonants
  const specialConsonants = [
    {
      letter: "ण",
      name: "ṇa",
      place: "Retroflex",
      example: "घण्टा (ghaṇṭā)",
      translit: "ghaṇṭā"
    },
    {
      letter: "ङ",
      name: "ṅa",
      place: "Velar",
      example: "अंग (aṅg)",
      translit: "aṅg"
    },
    {
      letter: "ञ",
      name: "ña",
      place: "Palatal",
      example: "ज्ञान (jñān)",
      translit: "jñān"
    }
  ];

  // Nasalization symbols
  const nasalizationSymbols = [
    {
      symbol: "ँ",
      name: "चंद्रबिंदु (candrabindu)",
      type: "Vowel nasalization",
      function: "Nasalizes preceding vowel",
      example: "माँ (mā̃)",
      translit: "mā̃",
      note: "Common in words like 'mother'"
    },
    {
      symbol: "ं",
      name: "अनुनासिक (anusvār)",
      type: "Consonant nasalization",
      function: "Indicates nasal sound",
      example: "हिंदी (hindī)",
      translit: "hindī",
      note: "Changes based on following consonant"
    },
    {
      symbol: "ः",
      name: "विसर्ग (visarga)",
      type: "Soft aspiration",
      function: "Breathy 'h' sound",
      example: "दुःख (duḥkh)",
      translit: "duḥkh",
      note: "Common in Sanskrit loanwords"
    },
    {
      symbol: "ँ+ं",
      name: "Double nasalization",
      type: "Rare",
      function: "Poetic or specific words",
      example: "जाँघ (jā̃gh)",
      translit: "jā̃gh",
      note: "Occurs in specific words"
    }
  ];
</script>

<div class="devanagari-conjuncts">
  <header class="page-header">
    <h1>{title}</h1>
    <p class="subtitle">
      संयुक्ताक्षर, मात्राएँ और विशेष चिह्न
    </p>
    <div class="om-decoration">
      <span class="om-symbol">ॐ</span>
      <span class="om-text"
        >॥ हिन्दी संयुक्ताक्षर सूची ॥</span
      >
      <span class="om-symbol">🕉️</span>
    </div>
  </header>

  <!-- Quick Stats -->
  <div class="stats-bar">
    <div class="stat-item">
      <span class="stat-number">100+</span>
      <span class="stat-label">Conjuncts</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">10</span>
      <span class="stat-label">Matras</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">4</span>
      <span class="stat-label">Nasal Marks</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">3</span>
      <span class="stat-label">Special Consonants</span>
    </div>
  </div>

  <!-- Matras Section -->
  <section class="matras-section">
    <h2>📝 मात्राएँ (Vowel Signs)</h2>
    <div class="matras-grid">
      {#each matras as matra}
        <div class="matra-card">
          <span class="matra-symbol">{matra.symbol}</span>
          <div class="matra-info">
            <span class="matra-name">{matra.name}</span>
            <span class="matra-type">{matra.type}</span>
            <span class="matra-function"
              >{matra.function}</span
            >
            <div class="matra-example">
              <span class="example-text"
                >{matra.example}</span
              >
              <span class="example-translit"
                >{matra.translit}</span
              >
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Most Common Conjuncts -->
  <section class="conjuncts-section">
    <h2>🔤 प्रमुख संयुक्ताक्षर (1-50)</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Conjunct</th>
            <th>Components</th>
            <th>IAST</th>
            <th>Example</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {#each commonConjuncts as conj}
            <tr>
              <td class="conjunct-cell">{conj.conjunct}</td>
              <td class="components-cell"
                >{conj.components}</td
              >
              <td class="iast-cell">{conj.iast}</td>
              <td class="example-cell">{conj.example}</td>
              <td class="meaning-cell">{conj.meaning}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Additional Conjuncts -->
  <section class="conjuncts-section">
    <h2>📚 अतिरिक्त संयुक्ताक्षर (51-75)</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Conjunct</th>
            <th>Components</th>
            <th>IAST</th>
            <th>Example</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {#each additionalConjuncts as conj}
            <tr>
              <td class="conjunct-cell">{conj.conjunct}</td>
              <td class="components-cell"
                >{conj.components}</td
              >
              <td class="iast-cell">{conj.iast}</td>
              <td class="example-cell">{conj.example}</td>
              <td class="meaning-cell">{conj.meaning}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- Ra Conjuncts Showcase -->
  <section class="feature-section">
    <h2>✨ र (Ra) संयुक्ताक्षर</h2>
    <div class="feature-grid">
      {#each raConjuncts as conj}
        <div class="feature-card">
          <span class="feature-conjunct"
            >{conj.conjunct}</span
          >
          <span class="feature-iast">{conj.iast}</span>
          <span class="feature-components"
            >{conj.components}</span
          >
          <div class="feature-example">
            <span>{conj.example}</span>
            <span class="feature-meaning"
              >{conj.meaning}</span
            >
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Trigrupo (Three-Consonant Conjuncts) -->
  <section class="trigrupo-section">
    <h2>🔱 त्रिसंयुक्ताक्षर (Three-Consonant Conjuncts)</h2>
    <div class="trigrupo-grid">
      {#each trigrupoConjuncts as trig}
        <div class="trigrupo-card">
          <div class="trigrupo-header">
            <span class="trigrupo-conjunct"
              >{trig.conjunct}</span
            >
            <span class="trigrupo-components"
              >{trig.components}</span
            >
          </div>
          <div class="syllable-row">
            {#each trig.syllables as syllable}
              <span class="syllable">{syllable}</span>
            {/each}
          </div>
          <div class="trigrupo-example">
            <span>{trig.example}</span>
            <span class="trigrupo-meaning"
              >{trig.meaning}</span
            >
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Special Consonants -->
  <section class="special-section">
    <h2>🎯 विशेष व्यंजन (Special Consonants)</h2>
    <div class="special-grid">
      {#each specialConsonants as cons}
        <div class="special-card">
          <span class="special-letter">{cons.letter}</span>
          <div class="special-info">
            <span class="special-name">{cons.name}</span>
            <span class="special-place">{cons.place}</span>
            <span class="special-example"
              >{cons.example}</span
            >
            <span class="special-translit"
              >{cons.translit}</span
            >
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Nasalization Symbols -->
  <section class="nasal-section">
    <h2>🌬️ नासिक्य चिह्न (Nasalization Symbols)</h2>
    <div class="nasal-grid">
      {#each nasalizationSymbols as nasal}
        <div class="nasal-card">
          <span class="nasal-symbol">{nasal.symbol}</span>
          <div class="nasal-info">
            <span class="nasal-name">{nasal.name}</span>
            <span class="nasal-type">{nasal.type}</span>
            <span class="nasal-function"
              >{nasal.function}</span
            >
            <div class="nasal-example">
              <span>{nasal.example}</span>
              <span class="nasal-translit"
                >{nasal.translit}</span
              >
            </div>
            <span class="nasal-note">{nasal.note}</span>
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- How Conjuncts Are Formed -->
  <section class="formation-section">
    <h2>🔧 संयुक्ताक्षर निर्माण (Formation Rules)</h2>
    <div class="formation-grid">
      <div class="formation-card">
        <h3>हलंत का प्रयोग (Using Halant)</h3>
        <div class="formation-example">
          <span>क् + ष = क्ष</span>
          <span class="explain"
            >क् (halant removes 'a') + ष = क्ष</span
          >
        </div>
        <div class="formation-example">
          <span>त् + र = त्र</span>
          <span class="explain">त् + र = त्र (tra)</span>
        </div>
      </div>
      <div class="formation-card">
        <h3>र के विशेष रूप (Special Ra Forms)</h3>
        <div class="formation-example">
          <span>र् + क = र्क</span>
          <span class="explain">Ra as first element</span>
        </div>
        <div class="formation-example">
          <span>क् + र = क्र</span>
          <span class="explain">Ra as last element</span>
        </div>
      </div>
      <div class="formation-card">
        <h3>रेफ (Reph)</h3>
        <div class="formation-example">
          <span>र् + क = र्क</span>
          <span class="explain">Ra above the consonant</span
          >
        </div>
        <div class="formation-example">
          <span>र् + य = र्य</span>
          <span class="explain">Ra above ya</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="page-footer">
    <p>॥ हिन्दी वर्णमाला - संयुक्ताक्षर सूची ॥</p>
    <p class="footer-small">
      100+ common conjuncts from Devanagari script •
      Including matras, special consonants, and nasalization
      symbols
    </p>
  </footer>
</div>

<style>
  .devanagari-conjuncts {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      "Nirmala UI", "Mangal", "Kokila", "Arial Unicode MS",
      system-ui, sans-serif;
    background: linear-gradient(
      145deg,
      #fef9e7 0%,
      #fdefd4 100%
    );
    border-radius: 2rem;
    box-shadow: 0 25px 50px -12px rgba(204, 102, 0, 0.3);
    border: 1px solid #ffcc99;
  }

  .page-header {
    text-align: center;
    margin-bottom: 2.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #cc6600, #993f00);
    border-radius: 2rem;
    color: white;
    box-shadow: 0 10px 20px rgba(153, 63, 0, 0.4);
  }

  h1 {
    font-size: 2.5rem;
    margin: 0;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .subtitle {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    opacity: 0.95;
  }

  .om-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;
    font-size: 1.8rem;
  }

  .om-symbol {
    font-size: 2.5rem;
    opacity: 0.9;
  }

  .om-text {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 2px;
  }

  h2 {
    font-size: 2rem;
    color: #993f00;
    margin: 2.5rem 0 1.5rem;
    padding-left: 1rem;
    border-left: 8px solid #ff9933;
    font-weight: 600;
  }

  /* Stats Bar */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-item {
    background: white;
    border-radius: 20px;
    padding: 1.5rem 1rem;
    text-align: center;
    box-shadow: 0 8px 16px rgba(255, 153, 51, 0.15);
    border: 1px solid #ffcc99;
    transition: transform 0.2s ease;
  }

  .stat-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 24px rgba(255, 102, 0, 0.2);
  }

  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #cc6600;
    line-height: 1.2;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #804020;
  }

  /* Matras Grid */
  .matras-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .matra-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(255, 153, 51, 0.1);
    border: 1px solid #ffcc99;
    transition: all 0.2s ease;
  }

  .matra-card:hover {
    transform: translateX(4px);
    box-shadow: 0 12px 24px rgba(255, 102, 0, 0.15);
    border-left: 6px solid #ff9933;
  }

  .matra-symbol {
    font-size: 3.5rem;
    min-width: 80px;
    text-align: center;
    color: #cc6600;
    font-weight: bold;
    background: #fff2e6;
    border-radius: 20px;
    padding: 0.5rem;
  }

  .matra-info {
    flex: 1;
  }

  .matra-name {
    display: block;
    font-weight: 600;
    color: #4d2600;
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  .matra-type {
    display: inline-block;
    background: #ff9933;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 40px;
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }

  .matra-function {
    display: block;
    color: #804020;
    font-size: 0.9rem;
    margin: 0.3rem 0;
  }

  .matra-example {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #fff2e6;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .example-text {
    font-size: 1.2rem;
    font-weight: 500;
    color: #4d2600;
  }

  .example-translit {
    color: #ff6600;
    font-size: 0.9rem;
  }

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    border-radius: 24px;
    background: white;
    box-shadow: 0 20px 40px -15px rgba(153, 63, 0, 0.2);
    border: 2px solid #ffb380;
    margin: 1.5rem 0 2.5rem;
    max-height: 500px;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    min-width: 800px;
  }

  th {
    background: linear-gradient(145deg, #ff944d, #ff751a);
    color: white;
    font-weight: 600;
    padding: 1rem 0.75rem;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 3px solid #cc5200;
  }

  td {
    padding: 0.75rem;
    border-bottom: 1px solid #ffd9b3;
  }

  tr:hover td {
    background-color: #fff9f2;
  }

  .conjunct-cell {
    font-size: 2rem;
    font-family: "Nirmala UI", "Mangal", sans-serif;
    color: #cc6600;
    text-align: center;
  }

  .components-cell {
    font-family: monospace;
    color: #4d2600;
  }

  .iast-cell {
    font-style: italic;
    color: #ff6600;
  }

  .example-cell {
    font-weight: 500;
  }

  .meaning-cell {
    color: #804020;
  }

  /* Feature Grid (Ra Conjuncts) */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .feature-card {
    background: white;
    border-radius: 20px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 8px 16px rgba(255, 153, 51, 0.1);
    border: 1px solid #ffcc99;
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 24px rgba(255, 102, 0, 0.15);
    border-color: #ff9933;
  }

  .feature-conjunct {
    display: block;
    font-size: 3rem;
    color: #cc6600;
    margin-bottom: 0.5rem;
  }

  .feature-iast {
    display: block;
    font-style: italic;
    color: #ff6600;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .feature-components {
    display: block;
    color: #804020;
    font-size: 0.9rem;
    background: #fff2e6;
    padding: 0.2rem;
    border-radius: 40px;
    margin: 0.5rem 0;
  }

  .feature-example {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #f5e5d5;
    border-radius: 12px;
    font-size: 0.9rem;
  }

  .feature-meaning {
    display: block;
    color: #4d2600;
    font-style: italic;
    font-size: 0.8rem;
  }

  /* Trigrupo Grid */
  .trigrupo-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .trigrupo-card {
    background: linear-gradient(145deg, #fff5e6, #ffe6cc);
    border-radius: 24px;
    padding: 1.5rem;
    border: 1px solid #ffcc99;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }

  .trigrupo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #ffcc99;
  }

  .trigrupo-conjunct {
    font-size: 2.5rem;
    color: #993f00;
  }

  .trigrupo-components {
    color: #804020;
    font-family: monospace;
    background: #fff2e6;
    padding: 0.3rem 0.8rem;
    border-radius: 40px;
  }

  .syllable-row {
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
    padding: 0.5rem;
    background: white;
    border-radius: 60px;
  }

  .syllable {
    font-size: 1.4rem;
    color: #cc6600;
  }

  .trigrupo-example {
    text-align: center;
    padding: 0.5rem;
    background: white;
    border-radius: 20px;
  }

  .trigrupo-meaning {
    display: block;
    color: #804020;
    font-size: 0.8rem;
    font-style: italic;
  }

  /* Special Consonants */
  .special-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .special-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    border: 1px solid #ffcc99;
    transition: transform 0.2s ease;
  }

  .special-card:hover {
    transform: translateY(-4px);
  }

  .special-letter {
    font-size: 4rem;
    color: #cc6600;
    min-width: 80px;
    text-align: center;
  }

  .special-info {
    flex: 1;
  }

  .special-name {
    display: block;
    font-weight: 600;
    color: #4d2600;
    font-size: 1.2rem;
  }

  .special-place {
    display: inline-block;
    background: #ff9933;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 40px;
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }

  .special-example {
    display: block;
    color: #804020;
  }

  .special-translit {
    color: #ff6600;
    font-style: italic;
  }

  /* Nasalization Grid */
  .nasal-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(350px, 1fr)
    );
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .nasal-card {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: linear-gradient(145deg, #e6f0ff, #cce0ff);
    border-radius: 24px;
    padding: 1.5rem;
    border: 1px solid #99bbff;
  }

  .nasal-symbol {
    font-size: 4rem;
    min-width: 100px;
    text-align: center;
    color: #3366cc;
    background: white;
    border-radius: 20px;
    padding: 0.5rem;
  }

  .nasal-info {
    flex: 1;
  }

  .nasal-name {
    display: block;
    font-weight: 600;
    color: #1a3366;
    font-size: 1.1rem;
  }

  .nasal-type {
    display: inline-block;
    background: #3366cc;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 40px;
    font-size: 0.8rem;
    margin: 0.3rem 0;
  }

  .nasal-function {
    display: block;
    color: #1a3366;
    margin: 0.3rem 0;
  }

  .nasal-example {
    background: white;
    padding: 0.5rem;
    border-radius: 12px;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
  }

  .nasal-translit {
    color: #3366cc;
  }

  .nasal-note {
    display: block;
    font-size: 0.8rem;
    color: #4d4d4d;
    font-style: italic;
    margin-top: 0.5rem;
  }

  /* Formation Section */
  .formation-section {
    margin: 3rem 0;
  }

  .formation-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(280px, 1fr)
    );
    gap: 1.5rem;
  }

  .formation-card {
    background: white;
    border-radius: 24px;
    padding: 1.5rem;
    box-shadow: 0 8px 16px rgba(255, 153, 51, 0.1);
    border: 1px solid #ffcc99;
  }

  .formation-card h3 {
    color: #993f00;
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    border-bottom: 2px solid #ffd9b3;
    padding-bottom: 0.5rem;
  }

  .formation-example {
    margin: 1rem 0;
    padding: 0.75rem;
    background: #fff2e6;
    border-radius: 12px;
  }

  .formation-example span:first-child {
    display: block;
    font-size: 1.8rem;
    color: #cc6600;
    margin-bottom: 0.3rem;
  }

  .explain {
    display: block;
    color: #804020;
    font-size: 0.9rem;
    font-style: italic;
  }

  /* Footer */
  .page-footer {
    margin-top: 3rem;
    padding: 2rem;
    background: linear-gradient(145deg, #cc6600, #993f00);
    border-radius: 2rem;
    color: white;
    text-align: center;
  }

  .page-footer p:first-child {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }

  .footer-small {
    font-size: 0.9rem;
    opacity: 0.9;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .devanagari-conjuncts {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .stats-bar {
      grid-template-columns: repeat(2, 1fr);
    }

    .matra-card {
      flex-direction: column;
      text-align: center;
    }

    .nasal-card {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
