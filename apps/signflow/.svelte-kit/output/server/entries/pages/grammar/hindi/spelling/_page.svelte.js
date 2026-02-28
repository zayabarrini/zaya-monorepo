import { f as fallback, i as escape_html, j as ensure_array_like, b as bind_props, a as attr_class, d as stringify } from "../../../../../chunks/vendor-svelte.js";
function Conjuncts($$renderer, $$props) {
  let title = fallback($$props["title"], "संयुक्ताक्षर - Devanagari Conjuncts & Special Symbols");
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
  $$renderer.push(`<div class="devanagari-conjuncts svelte-cl4m6t"><header class="page-header svelte-cl4m6t"><h1 class="svelte-cl4m6t">${escape_html(title)}</h1> <p class="subtitle svelte-cl4m6t">संयुक्ताक्षर, मात्राएँ और विशेष चिह्न</p> <div class="om-decoration svelte-cl4m6t"><span class="om-symbol svelte-cl4m6t">ॐ</span> <span class="om-text svelte-cl4m6t">॥ हिन्दी संयुक्ताक्षर सूची ॥</span> <span class="om-symbol svelte-cl4m6t">🕉️</span></div></header> <div class="stats-bar svelte-cl4m6t"><div class="stat-item svelte-cl4m6t"><span class="stat-number svelte-cl4m6t">100+</span> <span class="stat-label svelte-cl4m6t">Conjuncts</span></div> <div class="stat-item svelte-cl4m6t"><span class="stat-number svelte-cl4m6t">10</span> <span class="stat-label svelte-cl4m6t">Matras</span></div> <div class="stat-item svelte-cl4m6t"><span class="stat-number svelte-cl4m6t">4</span> <span class="stat-label svelte-cl4m6t">Nasal Marks</span></div> <div class="stat-item svelte-cl4m6t"><span class="stat-number svelte-cl4m6t">3</span> <span class="stat-label svelte-cl4m6t">Special Consonants</span></div></div> <section class="matras-section"><h2 class="svelte-cl4m6t">📝 मात्राएँ (Vowel Signs)</h2> <div class="matras-grid svelte-cl4m6t"><!--[-->`);
  const each_array = ensure_array_like(matras);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let matra = each_array[$$index];
    $$renderer.push(`<div class="matra-card svelte-cl4m6t"><span class="matra-symbol svelte-cl4m6t">${escape_html(matra.symbol)}</span> <div class="matra-info svelte-cl4m6t"><span class="matra-name svelte-cl4m6t">${escape_html(matra.name)}</span> <span class="matra-type svelte-cl4m6t">${escape_html(matra.type)}</span> <span class="matra-function svelte-cl4m6t">${escape_html(matra.function)}</span> <div class="matra-example svelte-cl4m6t"><span class="example-text svelte-cl4m6t">${escape_html(matra.example)}</span> <span class="example-translit svelte-cl4m6t">${escape_html(matra.translit)}</span></div></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="conjuncts-section"><h2 class="svelte-cl4m6t">🔤 प्रमुख संयुक्ताक्षर (1-50)</h2> <div class="table-container svelte-cl4m6t"><table class="svelte-cl4m6t"><thead><tr><th class="svelte-cl4m6t">Conjunct</th><th class="svelte-cl4m6t">Components</th><th class="svelte-cl4m6t">IAST</th><th class="svelte-cl4m6t">Example</th><th class="svelte-cl4m6t">Meaning</th></tr></thead><tbody><!--[-->`);
  const each_array_1 = ensure_array_like(commonConjuncts);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let conj = each_array_1[$$index_1];
    $$renderer.push(`<tr class="svelte-cl4m6t"><td class="conjunct-cell svelte-cl4m6t">${escape_html(conj.conjunct)}</td><td class="components-cell svelte-cl4m6t">${escape_html(conj.components)}</td><td class="iast-cell svelte-cl4m6t">${escape_html(conj.iast)}</td><td class="example-cell svelte-cl4m6t">${escape_html(conj.example)}</td><td class="meaning-cell svelte-cl4m6t">${escape_html(conj.meaning)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div></section> <section class="conjuncts-section"><h2 class="svelte-cl4m6t">📚 अतिरिक्त संयुक्ताक्षर (51-75)</h2> <div class="table-container svelte-cl4m6t"><table class="svelte-cl4m6t"><thead><tr><th class="svelte-cl4m6t">Conjunct</th><th class="svelte-cl4m6t">Components</th><th class="svelte-cl4m6t">IAST</th><th class="svelte-cl4m6t">Example</th><th class="svelte-cl4m6t">Meaning</th></tr></thead><tbody><!--[-->`);
  const each_array_2 = ensure_array_like(additionalConjuncts);
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let conj = each_array_2[$$index_2];
    $$renderer.push(`<tr class="svelte-cl4m6t"><td class="conjunct-cell svelte-cl4m6t">${escape_html(conj.conjunct)}</td><td class="components-cell svelte-cl4m6t">${escape_html(conj.components)}</td><td class="iast-cell svelte-cl4m6t">${escape_html(conj.iast)}</td><td class="example-cell svelte-cl4m6t">${escape_html(conj.example)}</td><td class="meaning-cell svelte-cl4m6t">${escape_html(conj.meaning)}</td></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div></section> <section class="feature-section"><h2 class="svelte-cl4m6t">✨ र (Ra) संयुक्ताक्षर</h2> <div class="feature-grid svelte-cl4m6t"><!--[-->`);
  const each_array_3 = ensure_array_like(raConjuncts);
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let conj = each_array_3[$$index_3];
    $$renderer.push(`<div class="feature-card svelte-cl4m6t"><span class="feature-conjunct svelte-cl4m6t">${escape_html(conj.conjunct)}</span> <span class="feature-iast svelte-cl4m6t">${escape_html(conj.iast)}</span> <span class="feature-components svelte-cl4m6t">${escape_html(conj.components)}</span> <div class="feature-example svelte-cl4m6t"><span>${escape_html(conj.example)}</span> <span class="feature-meaning svelte-cl4m6t">${escape_html(conj.meaning)}</span></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="trigrupo-section"><h2 class="svelte-cl4m6t">🔱 त्रिसंयुक्ताक्षर (Three-Consonant Conjuncts)</h2> <div class="trigrupo-grid svelte-cl4m6t"><!--[-->`);
  const each_array_4 = ensure_array_like(trigrupoConjuncts);
  for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
    let trig = each_array_4[$$index_5];
    $$renderer.push(`<div class="trigrupo-card svelte-cl4m6t"><div class="trigrupo-header svelte-cl4m6t"><span class="trigrupo-conjunct svelte-cl4m6t">${escape_html(trig.conjunct)}</span> <span class="trigrupo-components svelte-cl4m6t">${escape_html(trig.components)}</span></div> <div class="syllable-row svelte-cl4m6t"><!--[-->`);
    const each_array_5 = ensure_array_like(trig.syllables);
    for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
      let syllable = each_array_5[$$index_4];
      $$renderer.push(`<span class="syllable svelte-cl4m6t">${escape_html(syllable)}</span>`);
    }
    $$renderer.push(`<!--]--></div> <div class="trigrupo-example svelte-cl4m6t"><span>${escape_html(trig.example)}</span> <span class="trigrupo-meaning svelte-cl4m6t">${escape_html(trig.meaning)}</span></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="special-section"><h2 class="svelte-cl4m6t">🎯 विशेष व्यंजन (Special Consonants)</h2> <div class="special-grid svelte-cl4m6t"><!--[-->`);
  const each_array_6 = ensure_array_like(specialConsonants);
  for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
    let cons = each_array_6[$$index_6];
    $$renderer.push(`<div class="special-card svelte-cl4m6t"><span class="special-letter svelte-cl4m6t">${escape_html(cons.letter)}</span> <div class="special-info svelte-cl4m6t"><span class="special-name svelte-cl4m6t">${escape_html(cons.name)}</span> <span class="special-place svelte-cl4m6t">${escape_html(cons.place)}</span> <span class="special-example svelte-cl4m6t">${escape_html(cons.example)}</span> <span class="special-translit svelte-cl4m6t">${escape_html(cons.translit)}</span></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="nasal-section"><h2 class="svelte-cl4m6t">🌬️ नासिक्य चिह्न (Nasalization Symbols)</h2> <div class="nasal-grid svelte-cl4m6t"><!--[-->`);
  const each_array_7 = ensure_array_like(nasalizationSymbols);
  for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
    let nasal = each_array_7[$$index_7];
    $$renderer.push(`<div class="nasal-card svelte-cl4m6t"><span class="nasal-symbol svelte-cl4m6t">${escape_html(nasal.symbol)}</span> <div class="nasal-info svelte-cl4m6t"><span class="nasal-name svelte-cl4m6t">${escape_html(nasal.name)}</span> <span class="nasal-type svelte-cl4m6t">${escape_html(nasal.type)}</span> <span class="nasal-function svelte-cl4m6t">${escape_html(nasal.function)}</span> <div class="nasal-example svelte-cl4m6t"><span>${escape_html(nasal.example)}</span> <span class="nasal-translit svelte-cl4m6t">${escape_html(nasal.translit)}</span></div> <span class="nasal-note svelte-cl4m6t">${escape_html(nasal.note)}</span></div></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <section class="formation-section svelte-cl4m6t"><h2 class="svelte-cl4m6t">🔧 संयुक्ताक्षर निर्माण (Formation Rules)</h2> <div class="formation-grid svelte-cl4m6t"><div class="formation-card svelte-cl4m6t"><h3 class="svelte-cl4m6t">हलंत का प्रयोग (Using Halant)</h3> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">क् + ष = क्ष</span> <span class="explain svelte-cl4m6t">क् (halant removes 'a') + ष = क्ष</span></div> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">त् + र = त्र</span> <span class="explain svelte-cl4m6t">त् + र = त्र (tra)</span></div></div> <div class="formation-card svelte-cl4m6t"><h3 class="svelte-cl4m6t">र के विशेष रूप (Special Ra Forms)</h3> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">र् + क = र्क</span> <span class="explain svelte-cl4m6t">Ra as first element</span></div> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">क् + र = क्र</span> <span class="explain svelte-cl4m6t">Ra as last element</span></div></div> <div class="formation-card svelte-cl4m6t"><h3 class="svelte-cl4m6t">रेफ (Reph)</h3> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">र् + क = र्क</span> <span class="explain svelte-cl4m6t">Ra above the consonant</span></div> <div class="formation-example svelte-cl4m6t"><span class="svelte-cl4m6t">र् + य = र्य</span> <span class="explain svelte-cl4m6t">Ra above ya</span></div></div></div></section> <footer class="page-footer svelte-cl4m6t"><p class="svelte-cl4m6t">॥ हिन्दी वर्णमाला - संयुक्ताक्षर सूची ॥</p> <p class="footer-small svelte-cl4m6t">100+ common conjuncts from Devanagari script •
      Including matras, special consonants, and nasalization
      symbols</p></footer></div>`);
  bind_props($$props, { title });
}
function Numbers($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = fallback($$props["title"], "गिनती - Hindi Numbers Table");
    let subtitle = fallback($$props["subtitle"], "हिन्दी अंक और संख्याएँ (Hindi Numerals and Numbers)");
    const tens = [
      { numeral: "०", name: "शून्य", translit: "shūnya", value: 0 },
      { numeral: "१०", name: "दस", translit: "das", value: 10 },
      { numeral: "२०", name: "बीस", translit: "bīs", value: 20 },
      { numeral: "३०", name: "तीस", translit: "tīs", value: 30 },
      { numeral: "४०", name: "चालीस", translit: "chālīs", value: 40 },
      { numeral: "५०", name: "पचास", translit: "pachās", value: 50 },
      { numeral: "६०", name: "साठ", translit: "sāṭh", value: 60 },
      { numeral: "७०", name: "सत्तर", translit: "sattar", value: 70 },
      { numeral: "८०", name: "अस्सी", translit: "assī", value: 80 },
      { numeral: "९०", name: "नब्बे", translit: "nabbe", value: 90 }
    ];
    const units = [
      { numeral: "०", name: "शून्य", translit: "shūnya", value: 0 },
      { numeral: "१", name: "एक", translit: "ek", value: 1 },
      { numeral: "२", name: "दो", translit: "do", value: 2 },
      { numeral: "३", name: "तीन", translit: "tīn", value: 3 },
      { numeral: "४", name: "चार", translit: "chār", value: 4 },
      { numeral: "५", name: "पाँच", translit: "pāñch", value: 5 },
      { numeral: "६", name: "छह", translit: "chhah", value: 6 },
      { numeral: "७", name: "सात", translit: "sāt", value: 7 },
      { numeral: "८", name: "आठ", translit: "āṭh", value: 8 },
      { numeral: "९", name: "नौ", translit: "nau", value: 9 }
    ];
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
    const numbers11to20 = [
      { numeral: "११", devanagari: "ग्यारह", translit: "gyārah" },
      { numeral: "१२", devanagari: "बारह", translit: "bārah" },
      { numeral: "१३", devanagari: "तेरह", translit: "terah" },
      { numeral: "१४", devanagari: "चौदह", translit: "chaudah" },
      { numeral: "१५", devanagari: "पंद्रह", translit: "pandrah" },
      { numeral: "१६", devanagari: "सोलह", translit: "solah" },
      { numeral: "१७", devanagari: "सत्रह", translit: "satrah" },
      { numeral: "१८", devanagari: "अठारह", translit: "aṭhārah" },
      { numeral: "१९", devanagari: "उन्नीस", translit: "unnīs" },
      { numeral: "२०", devanagari: "बीस", translit: "bīs" }
    ];
    const numbers21to30 = [
      { numeral: "२१", devanagari: "इक्कीस", translit: "ikkīs" },
      { numeral: "२२", devanagari: "बाईस", translit: "bāīs" },
      { numeral: "२३", devanagari: "तेईस", translit: "teīs" },
      { numeral: "२४", devanagari: "चौबीस", translit: "chaubīs" },
      { numeral: "२५", devanagari: "पच्चीस", translit: "pacchīs" },
      { numeral: "२६", devanagari: "छब्बीस", translit: "chabbīs" },
      { numeral: "२७", devanagari: "सत्ताइस", translit: "sattāīs" },
      { numeral: "२८", devanagari: "अट्ठाईस", translit: "aṭṭhāīs" },
      { numeral: "२९", devanagari: "उनतीस", translit: "untīs" },
      { numeral: "३०", devanagari: "तीस", translit: "tīs" }
    ];
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
    function toHindiNumerals(num) {
      const hindiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return num.toString().replace(/\d/g, (d) => hindiDigits[parseInt(d)]);
    }
    const numbers1to100 = [];
    for (let i = 1; i <= 100; i++) {
      numbers1to100.push(i);
    }
    const numbers101to120 = [];
    for (let i = 101; i <= 120; i++) {
      numbers101to120.push(i);
    }
    $$renderer2.push(`<div class="hindi-numbers-container svelte-1k94kem"><header class="table-header svelte-1k94kem"><h1 class="svelte-1k94kem">${escape_html(title)}</h1> <p class="subtitle svelte-1k94kem">${escape_html(subtitle)}</p> <div class="header-decoration svelte-1k94kem"><span class="decoration-symbol svelte-1k94kem">🔢</span> <span class="decoration-text svelte-1k94kem">हिन्दी अंक</span> <span class="decoration-symbol svelte-1k94kem">१२३</span></div></header> <section class="table-section"><h2 class="svelte-1k94kem">📊 संख्या तालिका (Numbers Table)</h2> <div class="table-container svelte-1k94kem"><table class="svelte-1k94kem"><thead><tr><th class="sticky-col svelte-1k94kem">इकाई<br/><span class="subhead svelte-1k94kem">(Units)</span></th><!--[-->`);
    const each_array = ensure_array_like(tens);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ten = each_array[$$index];
      $$renderer2.push(`<th class="svelte-1k94kem"><div class="ten-header svelte-1k94kem"><span class="hindi-number svelte-1k94kem">${escape_html(ten.numeral)}</span> <span class="name svelte-1k94kem">${escape_html(ten.name)}</span> <span class="translit small svelte-1k94kem">${escape_html(ten.translit)}</span></div></th>`);
    }
    $$renderer2.push(`<!--]--></tr></thead><tbody class="svelte-1k94kem"><!--[-->`);
    const each_array_1 = ensure_array_like(numberTable);
    for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
      let row = each_array_1[$$index_2];
      $$renderer2.push(`<tr class="svelte-1k94kem"><td class="sticky-col unit-cell svelte-1k94kem"><span class="hindi-number svelte-1k94kem">${escape_html(units[row.unit].numeral)}</span> <span class="unit-name svelte-1k94kem">${escape_html(row.name)}</span> <span class="translit small svelte-1k94kem">${escape_html(row.translit)}</span></td><!--[-->`);
      const each_array_2 = ensure_array_like(row.values);
      for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
        let value = each_array_2[$$index_1];
        $$renderer2.push(`<td class="number-cell svelte-1k94kem"><span class="hindi-text svelte-1k94kem">${escape_html(value)}</span></td>`);
      }
      $$renderer2.push(`<!--]--></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="info-cards"><h2 class="svelte-1k94kem">बड़ी संख्याएँ (Large Numbers)</h2> <div class="large-numbers-grid svelte-1k94kem"><!--[-->`);
    const each_array_3 = ensure_array_like(largeNumbers);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let num = each_array_3[$$index_3];
      $$renderer2.push(`<div class="info-card svelte-1k94kem"><div class="large-number svelte-1k94kem"><span class="hindi-digit svelte-1k94kem">${escape_html(num.numeral)}</span> <span class="hindi-name svelte-1k94kem">${escape_html(num.devanagari)}</span> <span class="translit svelte-1k94kem">${escape_html(num.translit)}</span> <span class="english-name svelte-1k94kem">${escape_html(num.english)}</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="sequence-section"><h2 class="svelte-1k94kem">१-१० (Numbers 1 to 10)</h2> <div class="basic-numbers-grid svelte-1k94kem"><!--[-->`);
    const each_array_4 = ensure_array_like(basicNumbers);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let num = each_array_4[$$index_4];
      $$renderer2.push(`<div class="basic-card svelte-1k94kem"><span class="hindi-numeral svelte-1k94kem">${escape_html(num.numeral)}</span> <span class="hindi-word svelte-1k94kem">${escape_html(num.devanagari)}</span> <span class="translit svelte-1k94kem">${escape_html(num.translit)}</span> <span class="english-small svelte-1k94kem">${escape_html(num.english)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="sequence-section"><h2 class="svelte-1k94kem">११-२० (Numbers 11 to 20)</h2> <div class="number-grid svelte-1k94kem"><!--[-->`);
    const each_array_5 = ensure_array_like(numbers11to20);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let num = each_array_5[$$index_5];
      $$renderer2.push(`<div class="number-item svelte-1k94kem"><span class="hindi-numeral svelte-1k94kem">${escape_html(num.numeral)}</span> <span class="hindi-word svelte-1k94kem">${escape_html(num.devanagari)}</span> <span class="translit small svelte-1k94kem">${escape_html(num.translit)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="sequence-section"><h2 class="svelte-1k94kem">२१-३० (Numbers 21 to 30)</h2> <div class="number-grid svelte-1k94kem"><!--[-->`);
    const each_array_6 = ensure_array_like(numbers21to30);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let num = each_array_6[$$index_6];
      $$renderer2.push(`<div class="number-item svelte-1k94kem"><span class="hindi-numeral svelte-1k94kem">${escape_html(num.numeral)}</span> <span class="hindi-word svelte-1k94kem">${escape_html(num.devanagari)}</span> <span class="translit small svelte-1k94kem">${escape_html(num.translit)}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="sequence-section"><h2 class="svelte-1k94kem">१-१०० (Numbers 1 to 100)</h2> <div class="hundreds-grid svelte-1k94kem"><!--[-->`);
    const each_array_7 = ensure_array_like(numbers1to100);
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let num = each_array_7[$$index_7];
      $$renderer2.push(`<span class="grid-number svelte-1k94kem">${escape_html(toHindiNumerals(num))}</span>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="sequence-section"><h2 class="svelte-1k94kem">१०१-१२० (Numbers 101 to 120)</h2> <div class="hundreds-grid svelte-1k94kem"><!--[-->`);
    const each_array_8 = ensure_array_like(numbers101to120);
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let num = each_array_8[$$index_8];
      $$renderer2.push(`<span class="grid-number svelte-1k94kem">${escape_html(toHindiNumerals(num))}</span>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="pronunciation-guide svelte-1k94kem"><h2 class="svelte-1k94kem">🗣️ उच्चारण गाइड (Pronunciation Guide)</h2> <div class="guide-grid svelte-1k94kem"><div class="guide-card svelte-1k94kem"><h3 class="svelte-1k94kem">महत्वपूर्ण नियम (Important Rules)</h3> <ul class="rule-list svelte-1k94kem"><li class="svelte-1k94kem"><strong class="svelte-1k94kem">चंद्रबिंदु (ँ)</strong> - nasalization: पाँच
            (pāñch)</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">अनुस्वार (ं)</strong> - nasal sound: पंद्रह
            (pandrah)</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">विसर्ग (ः)</strong> - voiceless breath</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">हलंत (्)</strong> - suppresses inherent vowel</li></ul></div> <div class="guide-card svelte-1k94kem"><h3 class="svelte-1k94kem">विशेष उच्चारण (Special Pronunciation)</h3> <ul class="rule-list svelte-1k94kem"><li class="svelte-1k94kem"><strong class="svelte-1k94kem">ड़</strong> - retroflex flapped: सड़सठ (saṛsaṭh)</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">ढ़</strong> - aspirated retroflex flapped</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">क्ष</strong> - क + ष: इक्यासी (ikyāsī)</li> <li class="svelte-1k94kem"><strong class="svelte-1k94kem">ज्ञ</strong> - ज + ञ</li></ul></div></div></section> <footer class="table-footer svelte-1k94kem"><p>हिन्दी गिनती - संख्याओं की पूरी तालिका</p> <p class="small svelte-1k94kem">Complete table of Hindi numbers from 0 to 100 and
      beyond</p></footer></div>`);
    bind_props($$props, { title, subtitle });
  });
}
function _page($$renderer, $$props) {
  let title = fallback($$props["title"], "वर्णमाला - Hindi Devanagari Conjugation Table");
  let subtitle = fallback($$props["subtitle"], "व्यंजन + स्वर संयोजन (Consonant + Vowel Combinations)");
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
  function getCombinedForm(consonant, vowelIndex) {
    const c = consonant.letter;
    const v = vowels[vowelIndex];
    if (vowelIndex === 0) {
      return {
        devanagari: c,
        translit: consonant.translit,
        display: `${c} (${consonant.translit})`
      };
    }
    const combined = c + v.diacritic;
    const translit = consonant.translit.slice(0, -1) + v.translit;
    return {
      devanagari: combined,
      translit,
      display: `${combined} (${translit})`
    };
  }
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
  $$renderer.push(`<div class="container mainpage svelte-1t4jslu"><div class="devanagari-table svelte-1t4jslu"><header class="table-header svelte-1t4jslu"><h1 class="svelte-1t4jslu">${escape_html(title)}</h1> <p class="subtitle svelte-1t4jslu">${escape_html(subtitle)}</p> <div class="header-decoration svelte-1t4jslu"><span class="decoration-symbol svelte-1t4jslu">ॐ</span> <span class="decoration-text svelte-1t4jslu">हिन्दी वर्णमाला</span> <span class="decoration-symbol svelte-1t4jslu">🕉️</span></div></header> <section class="vowel-legend svelte-1t4jslu"><h2 class="svelte-1t4jslu">📖 स्वर (Vowels)</h2> <div class="vowel-grid svelte-1t4jslu"><!--[-->`);
  const each_array = ensure_array_like(vowels);
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let vowel = each_array[index];
    $$renderer.push(`<div${attr_class(`vowel-card ${stringify(vowel.class)}`, "svelte-1t4jslu")}><span class="vowel-symbol svelte-1t4jslu">${escape_html(vowel.symbol)}</span> <span class="vowel-diacritic svelte-1t4jslu">${escape_html(vowel.diacritic || "—")}</span> <span class="vowel-name svelte-1t4jslu">${escape_html(vowel.name)}</span> <span class="vowel-translit svelte-1t4jslu">${escape_html(vowel.translit)}</span></div>`);
  }
  $$renderer.push(`<!--]--></div></section> <div class="table-container svelte-1t4jslu"><table class="svelte-1t4jslu"><thead><tr><th class="sticky-col svelte-1t4jslu">व्यंजन<br/><span class="subhead svelte-1t4jslu">(Consonant)</span></th><!--[-->`);
  const each_array_1 = ensure_array_like(vowelSymbols);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let vowel = each_array_1[$$index_1];
    $$renderer.push(`<th class="svelte-1t4jslu"><div class="vowel-header svelte-1t4jslu"><span class="vowel-header-symbol svelte-1t4jslu">${escape_html(vowel.symbol)}</span> <span class="vowel-header-diacritic svelte-1t4jslu">${escape_html(vowel.diacritic || "अ")}</span> <span class="vowel-header-name svelte-1t4jslu">${escape_html(vowel.name)}</span></div></th>`);
  }
  $$renderer.push(`<!--]--></tr></thead><tbody class="svelte-1t4jslu"><!--[-->`);
  const each_array_2 = ensure_array_like(consonants);
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    let consonant = each_array_2[$$index_3];
    $$renderer.push(`<tr class="svelte-1t4jslu"><td class="sticky-col consonant-cell svelte-1t4jslu"><span class="consonant-symbol svelte-1t4jslu">${escape_html(consonant.letter)}</span> <span class="consonant-name svelte-1t4jslu">${escape_html(consonant.name)}</span></td><!--[-->`);
    const each_array_3 = ensure_array_like(vowels);
    for (let index = 0, $$length2 = each_array_3.length; index < $$length2; index++) {
      each_array_3[index];
      const form = getCombinedForm(consonant, index);
      $$renderer.push(`<td class="conjugation-cell svelte-1t4jslu"><div class="conjugation-content svelte-1t4jslu"><span class="devanagari-form svelte-1t4jslu">${escape_html(form.devanagari)}</span> <span class="transliteration svelte-1t4jslu">${escape_html(form.translit)}</span></div></td>`);
    }
    $$renderer.push(`<!--]--></tr>`);
  }
  $$renderer.push(`<!--]--></tbody></table></div> <div class="info-section svelte-1t4jslu"><div class="info-card pronounciation-card svelte-1t4jslu"><h3 class="svelte-1t4jslu">उच्चारण 🗣️</h3> <table class="pronounciation-table svelte-1t4jslu"><thead><tr><th class="svelte-1t4jslu">Vowel</th><th class="svelte-1t4jslu">Pronunciation</th></tr></thead><tbody class="svelte-1t4jslu"><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">अ (a)</td><td class="svelte-1t4jslu">like 'u' in "but"</td></tr><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">आ (ā)</td><td class="svelte-1t4jslu">like 'a' in "father"</td></tr><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">इ (i)</td><td class="svelte-1t4jslu">like 'i' in "sit"</td></tr><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">ई (ī)</td><td class="svelte-1t4jslu">like 'ee' in "see"</td></tr><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">उ (u)</td><td class="svelte-1t4jslu">like 'u' in "put"</td></tr><tr class="svelte-1t4jslu"><td class="svelte-1t4jslu">ऊ (ū)</td><td class="svelte-1t4jslu">like 'oo' in "moon"</td></tr></tbody></table></div></div> <div class="info-card sanskrit-card svelte-1t4jslu"><h3 class="svelte-1t4jslu">संस्कृत 🌸</h3> <p>Devanagari is an abugida where each consonant
        inherently contains the vowel अ (a). Diacritics
        modify this inherent vowel.</p> <div class="example-row svelte-1t4jslu"><span class="example svelte-1t4jslu">क + ा = का</span> <span class="example svelte-1t4jslu">क + ि = कि</span> <span class="example svelte-1t4jslu">क + ु = कु</span></div></div> <div class="info-card special-card svelte-1t4jslu"><h3 class="svelte-1t4jslu">विशेष ⭐</h3> <p><strong>अनुस्वार (ं):</strong> कं (kaṁ) - nasalization</p> <p><strong>विसर्ग (ः):</strong> कः (kaḥ) - voiceless breath</p> <p><strong>चन्द्रबिन्दु (ँ):</strong> काँ (kā̃) - nasalized
        vowel</p></div> <section class="diacritic-showcase svelte-1t4jslu"><h2 class="svelte-1t4jslu">🎨 स्वर चिह्न (Vowel Signs)</h2> <div class="showcase-grid svelte-1t4jslu"><div class="showcase-item svelte-1t4jslu"><span class="base svelte-1t4jslu">क</span> <span class="plus svelte-1t4jslu">+</span> <span class="diacritic svelte-1t4jslu">ा</span> <span class="equals svelte-1t4jslu">=</span> <span class="result svelte-1t4jslu">का</span> <span class="label svelte-1t4jslu">का (kā)</span></div> <div class="showcase-item svelte-1t4jslu"><span class="base svelte-1t4jslu">क</span> <span class="plus svelte-1t4jslu">+</span> <span class="diacritic svelte-1t4jslu">ि</span> <span class="equals svelte-1t4jslu">=</span> <span class="result svelte-1t4jslu">कि</span> <span class="label svelte-1t4jslu">कि (ki)</span></div> <div class="showcase-item svelte-1t4jslu"><span class="base svelte-1t4jslu">क</span> <span class="plus svelte-1t4jslu">+</span> <span class="diacritic svelte-1t4jslu">ी</span> <span class="equals svelte-1t4jslu">=</span> <span class="result svelte-1t4jslu">की</span> <span class="label svelte-1t4jslu">की (kī)</span></div> <div class="showcase-item svelte-1t4jslu"><span class="base svelte-1t4jslu">क</span> <span class="plus svelte-1t4jslu">+</span> <span class="diacritic svelte-1t4jslu">ु</span> <span class="equals svelte-1t4jslu">=</span> <span class="result svelte-1t4jslu">कु</span> <span class="label svelte-1t4jslu">कु (ku)</span></div></div></section> <footer class="table-footer svelte-1t4jslu"><p>हिन्दी वर्णमाला - 33 व्यंजन × 10 स्वर = 330 संयोजन</p> <p class="small svelte-1t4jslu">33 consonants × 10 vowels = 330 combinations shown
        in this table</p></footer></div> `);
  Conjuncts($$renderer, {});
  $$renderer.push(`<!----> `);
  Numbers($$renderer, {});
  $$renderer.push(`<!----></div>`);
  bind_props($$props, { title, subtitle });
}
export {
  _page as default
};
