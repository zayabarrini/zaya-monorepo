<!-- ArabicVocabularyEnhanced.svelte -->
<script>
  import { onMount } from "svelte";

  // Props
  export let jsonPath = "/json/arabic-vocab-enhanced.json";

  // State
  let vocabularyData = [];
  let filteredWords = [];
  let searchTerm = "";
  let currentCategory = "all";
  let isLoading = true;
  let error = null;

  // Category icons mapping
  const categoryIcons = {
    "Arabic nature & weather vocabulary": "🌿",
    "Arabic human body vocabulary": "🧍",
    "Arabic emotions & personality traits vocabulary": "💭",
    "Arabic colors vocabulary": "🎨",
    "Arabic city/transportation vocabulary": "🏙️",
    "Arabic basic verbs": "⚡",
    "Arabic mankind/kinship vocabulary": "👪",
    "Arabic clothing vocabulary": "👕",
    "Arabic education vocabulary": "📚",
    "Arabic food vocabulary": "🍽️",
    "Arabic geography vocabulary": "🌍",
    "Arabic media and the arts vocabulary": "🎭",
    "Arabic medicine vocabulary": "🏥",
    "Arabic religion vocabulary": "🕋",
    "Arabic sports & hobbies vocabulary": "⚽",
    "Arabic technology vocabulary": "💻",
    "Arabic time vocabulary": "⏰",
    "Arabic work/money vocabulary": "💼",
    "Arabic media vocabulary": "📱",
    "Arabic crime and punishment vocabulary": "⚖️",
    "Arabic government and politics vocabulary": "🏛️",
    "Arabic war vocabulary": "⚔️"
  };

  // Category color mapping
  const categoryColors = {
    "Arabic nature & weather vocabulary": {
      primary: "#047857",
      secondary: "#10b981"
    },
    "Arabic human body vocabulary": {
      primary: "#b45309",
      secondary: "#d97706"
    },
    "Arabic emotions & personality traits vocabulary": {
      primary: "#9d174d",
      secondary: "#be185d"
    },
    "Arabic colors vocabulary": {
      primary: "#6b21a8",
      secondary: "#7e22ce"
    },
    "Arabic city/transportation vocabulary": {
      primary: "#1e40af",
      secondary: "#2563eb"
    },
    "Arabic basic verbs": {
      primary: "#b91c1c",
      secondary: "#dc2626"
    },
    "Arabic mankind/kinship vocabulary": {
      primary: "#92400e",
      secondary: "#b45309"
    },
    "Arabic clothing vocabulary": {
      primary: "#831843",
      secondary: "#9d174d"
    },
    "Arabic education vocabulary": {
      primary: "#065f46",
      secondary: "#047857"
    },
    "Arabic food vocabulary": {
      primary: "#854d0e",
      secondary: "#a16207"
    },
    "Arabic geography vocabulary": {
      primary: "#1e3a8a",
      secondary: "#1e40af"
    },
    "Arabic media and the arts vocabulary": {
      primary: "#6d28d9",
      secondary: "#7c3aed"
    },
    "Arabic medicine vocabulary": {
      primary: "#0e7490",
      secondary: "#0891b2"
    },
    "Arabic religion vocabulary": {
      primary: "#064e3b",
      secondary: "#065f46"
    },
    "Arabic sports & hobbies vocabulary": {
      primary: "#b45309",
      secondary: "#c2410c"
    },
    "Arabic technology vocabulary": {
      primary: "#374151",
      secondary: "#4b5563"
    },
    "Arabic time vocabulary": {
      primary: "#854d0e",
      secondary: "#a16207"
    },
    "Arabic work/money vocabulary": {
      primary: "#166534",
      secondary: "#15803d"
    },
    "Arabic media vocabulary": {
      primary: "#6d28d9",
      secondary: "#7c3aed"
    },
    "Arabic crime and punishment vocabulary": {
      primary: "#991b1b",
      secondary: "#b91c1c"
    },
    "Arabic government and politics vocabulary": {
      primary: "#1e3a8a",
      secondary: "#1e40af"
    },
    "Arabic war vocabulary": {
      primary: "#7f1d1d",
      secondary: "#991b1b"
    }
  };

  // Category emoji mapping for stats
  const categoryEmojis = {
    "Arabic nature & weather vocabulary": "🌿",
    "Arabic human body vocabulary": "🧍",
    "Arabic emotions & personality traits vocabulary": "💭",
    "Arabic colors vocabulary": "🎨",
    "Arabic city/transportation vocabulary": "🏙️",
    "Arabic basic verbs": "⚡",
    "Arabic mankind/kinship vocabulary": "👪",
    "Arabic clothing vocabulary": "👕",
    "Arabic education vocabulary": "📚",
    "Arabic food vocabulary": "🍽️",
    "Arabic geography vocabulary": "🌍",
    "Arabic media and the arts vocabulary": "🎭",
    "Arabic medicine vocabulary": "🏥",
    "Arabic religion vocabulary": "🕋",
    "Arabic sports & hobbies vocabulary": "⚽",
    "Arabic technology vocabulary": "💻",
    "Arabic time vocabulary": "⏰",
    "Arabic work/money vocabulary": "💼",
    "Arabic media vocabulary": "📱",
    "Arabic crime and punishment vocabulary": "⚖️",
    "Arabic government and politics vocabulary": "🏛️",
    "Arabic war vocabulary": "⚔️"
  };

  // Clean and normalize the data
  function cleanData(data) {
    return data
      .filter(
        (item) =>
          item["Standard Arabic"] &&
          item["Standard Arabic"] !== "" &&
          item["Standard Arabic"] !== "null"
      )
      .map((item) => {
        // Handle Egyptian Arabic
        const egyptianArabic =
          item["Egyptian Arabic"] &&
          item["Egyptian Arabic"] !== "'" &&
          item["Egyptian Arabic"] !== "EMPTY_CELL"
            ? item["Egyptian Arabic"]
            : null;

        const egyptianTranslit =
          item["Transliteration.1"] &&
          item["Transliteration.1"] !== "'" &&
          item["Transliteration.1"] !== "EMPTY_CELL"
            ? item["Transliteration.1"]
            : null;

        // Handle example usage
        let example = item["Example_Usage"];
        if (
          !example ||
          example === "NO_EXAMPLE" ||
          example === "EMPTY_CELL"
        ) {
          // Generate a default example if none exists
          example = `مثال: ${item["Standard Arabic"]} في جملة مفيدة.`;
        }

        return {
          english: item["English"] || "",
          standard: item["Standard Arabic"],
          transliteration: item["Transliteration"] || "",
          egyptian: egyptianArabic,
          egyptianTranslit: egyptianTranslit,
          category:
            item["Noun_category"] || "Uncategorized",
          pos: item["POS_Tags"] || "noun",
          gloss: item["Gloss"] || "",
          example: example
        };
      });
  }

  // Load JSON data
  async function loadData() {
    try {
      isLoading = true;
      const response = await fetch(jsonPath);
      if (!response.ok)
        throw new Error("Failed to load vocabulary data");
      const data = await response.json();
      vocabularyData = cleanData(data);
      filteredWords = vocabularyData;
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
      console.error("Error loading vocabulary:", err);

      // Fallback sample data if fetch fails
      vocabularyData = getSampleData();
      filteredWords = vocabularyData;
    }
  }

  // Sample data for fallback
  function getSampleData() {
    return [
      {
        english: "nature",
        standard: "الطبيعة",
        transliteration: "aT-Tabii3a",
        egyptian: null,
        egyptianTranslit: null,
        category: "Arabic nature & weather vocabulary",
        pos: "noun",
        gloss: "the+nature;natural+[fem.sg.]",
        example: "الطبيعة في الربيع جميلة جداً."
      },
      {
        english: "environment",
        standard: "بيئات",
        transliteration: "bii'a (pl.) bii'aat",
        egyptian: null,
        egyptianTranslit: null,
        category: "Arabic nature & weather vocabulary",
        pos: "noun",
        gloss: "environment;milieu+[fem.pl.]",
        example: "المدرسة الابتدائية ست سنوات."
      },
      {
        english: "world",
        standard: "عوالم",
        transliteration: "3aalam (pl.) 3awaalim",
        egyptian: "الدنيا",
        egyptianTranslit: "id-dunya",
        category: "Arabic nature & weather vocabulary",
        pos: "noun",
        gloss: "worlds",
        example: "هناك عوالم لم نكتشفها بعد."
      }
    ];
  }

  // Get unique categories
  $: categories = [
    ...new Set(vocabularyData.map((item) => item.category))
  ]
    .filter(Boolean)
    .sort();

  // Filter by category
  function filterByCategory(category) {
    currentCategory = category;
    if (category === "all") {
      filteredWords = vocabularyData;
    } else {
      filteredWords = vocabularyData.filter(
        (item) => item.category === category
      );
    }
  }

  // Search function
  $: if (searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    filteredWords = vocabularyData.filter(
      (item) =>
        item.standard.includes(term) ||
        (item.english &&
          item.english.toLowerCase().includes(term)) ||
        (item.transliteration &&
          item.transliteration
            .toLowerCase()
            .includes(term)) ||
        (item.egyptian && item.egyptian.includes(term)) ||
        (item.gloss &&
          item.gloss.toLowerCase().includes(term)) ||
        (item.example && item.example.includes(term))
    );
  } else if (currentCategory === "all") {
    filteredWords = vocabularyData;
  } else {
    filteredWords = vocabularyData.filter(
      (item) => item.category === currentCategory
    );
  }

  // Get count per category
  $: categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = vocabularyData.filter(
      (item) => item.category === cat
    ).length;
    return acc;
  }, {});

  // Get POS counts
  $: nounsCount = vocabularyData.filter((item) =>
    item.pos?.includes("noun")
  ).length;
  $: verbsCount = vocabularyData.filter((item) =>
    item.pos?.includes("verb")
  ).length;
  $: adjectivesCount = vocabularyData.filter((item) =>
    item.pos?.includes("adj")
  ).length;
  $: particlesCount = vocabularyData.filter(
    (item) =>
      item.pos?.includes("particle") ||
      item.pos?.includes("prep")
  ).length;

  // Get category style
  function getCategoryStyle(category) {
    const colors = categoryColors[category] || {
      primary: "#4a5568",
      secondary: "#718096"
    };
    return `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
  }

  // Get category card color
  function getCategoryCardColor(category) {
    return categoryColors[category]?.primary || "#4a5568";
  }

  // Initialize on mount
  onMount(() => {
    loadData();
  });
</script>

<div class="container mainpage" dir="rtl">
  <!-- Header -->
  <header class="header">
    <h1>قاموس المفردات العربية المتقدم</h1>
    <p>
      مجموعة شاملة من المفردات العربية المصنفة حسب المجالات
      - Visual Arabic Dictionary
    </p>
  </header>

  <!-- Category Navigation -->
  <nav class="category-nav">
    <button
      class="category-btn all-btn"
      on:click={() => filterByCategory("all")}
      style="background: linear-gradient(135deg, #4a5568, #718096);"
    >
      <span>🌟</span>
      <span>عرض الكل</span>
      <span class="category-count"
        >{vocabularyData.length}</span
      >
    </button>

    {#each categories as category}
      <button
        class="category-btn category-specific"
        on:click={() => filterByCategory(category)}
        style="background: {getCategoryStyle(category)};"
      >
        <span>{categoryIcons[category] || "📖"}</span>
        <span class="category-name"
          >{category
            .replace("Arabic ", "")
            .replace(" vocabulary", "")}</span
        >
        <span class="category-count"
          >{categoryCounts[category] || 0}</span
        >
      </button>
    {/each}
  </nav>

  <!-- Search -->
  <div class="search-container">
    <div class="search-icon">🔍</div>
    <input
      type="text"
      class="search-input"
      placeholder="ابحث عن كلمة أو معنى..."
      bind:value={searchTerm}
    />
    {#if searchTerm}
      <button
        class="clear-search"
        on:click={() => (searchTerm = "")}
      >
        ✕
      </button>
    {/if}
  </div>

  <!-- Stats -->
  <div class="stats-container">
    <div class="stat-item stat-words">
      <div class="stat-number">{vocabularyData.length}</div>
      <div class="stat-label">إجمالي الكلمات</div>
      <div class="stat-icon">📚</div>
    </div>
    <div class="stat-item stat-categories">
      <div class="stat-number">{categories.length}</div>
      <div class="stat-label">التصنيفات</div>
      <div class="stat-icon">🏷️</div>
    </div>
    <div class="stat-item stat-egyptian">
      <div class="stat-number">
        {vocabularyData.filter((w) => w.egyptian).length}
      </div>
      <div class="stat-label">كلمات مصرية</div>
      <div class="stat-icon">🇪🇬</div>
    </div>
    <div class="stat-item stat-examples">
      <div class="stat-number">
        {vocabularyData.filter(
          (w) => w.example && !w.example.includes("مثال:")
        ).length}
      </div>
      <div class="stat-label">أمثلة</div>
      <div class="stat-icon">💬</div>
    </div>
  </div>

  <!-- Loading State -->
  {#if isLoading}
    <div class="loading-container">
      <div class="spinner"></div>
      <p>جاري تحميل المفردات...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>حدث خطأ في تحميل البيانات</h3>
      <p>{error}</p>
      <button class="retry-btn" on:click={loadData}
        >إعادة المحاولة</button
      >
    </div>
  {:else}
    <!-- Results Info -->
    <div class="results-info">
      <div class="results-count">
        <span class="count-number"
          >{filteredWords.length}</span
        >
        <span class="count-label">كلمة</span>
      </div>
      {#if currentCategory !== "all"}
        <div class="current-category">
          <span class="category-icon"
            >{categoryIcons[currentCategory] || "📖"}</span
          >
          <span class="category-name"
            >{currentCategory}</span
          >
        </div>
      {/if}
    </div>

    <!-- Main Content -->
    <main class="main-content">
      {#each filteredWords as word, index (word.standard + index)}
        {@const category = word.category}
        {@const cardColor = getCategoryCardColor(category)}
        <div
          class="word-card"
          style="border-top-color: {cardColor}; --card-color: {cardColor}; animation-delay: {index *
            0.03}s;"
        >
          <div
            class="word-category"
            style="background: {cardColor};"
          >
            <span class="category-icon-small"
              >{categoryIcons[category] || "📖"}</span
            >
            <span class="category-name-small"
              >{category
                .replace("Arabic ", "")
                .replace(" vocabulary", "")}</span
            >
          </div>

          <div class="word-arabic">{word.standard}</div>

          <div class="word-transliteration">
            {word.transliteration}
          </div>

          {#if word.english}
            <div class="word-translation">
              {word.english}
            </div>
          {/if}

          {#if word.egyptian}
            <div class="word-egyptian">
              <span class="egyptian-label">مصري:</span>
              <span class="egyptian-text"
                >{word.egyptian}</span
              >
              {#if word.egyptianTranslit}
                <span class="egyptian-translit"
                  >{word.egyptianTranslit}</span
                >
              {/if}
            </div>
          {/if}

          <div
            class="word-example"
            style="border-right-color: {cardColor};"
          >
            {word.example}
          </div>

          {#if word.gloss && word.gloss !== "EMPTY_CELL"}
            <div class="word-gloss">{word.gloss}</div>
          {/if}
        </div>
      {:else}
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>لا توجد نتائج</h3>
          <p>لم يتم العثور على كلمات تطابق بحثك</p>
          <button
            class="reset-btn"
            on:click={() => {
              searchTerm = "";
              filterByCategory("all");
            }}
          >
            عرض جميع الكلمات
          </button>
        </div>
      {/each}
    </main>
  {/if}

  <!-- Footer -->
  <footer class="footer">
    <p>
      قاموس المفردات العربية المتقدم - Enhanced Arabic
      Vocabulary Dictionary
    </p>
    <p>© 2024 - جميع الحقوق محفوظة</p>
    <div class="category-preview">
      {#each categories.slice(0, 8) as category}
        <div
          class="preview-icon"
          style="background: {getCategoryCardColor(
            category
          )}; color: white;"
        >
          {categoryIcons[category] || "📖"}
        </div>
      {/each}
    </div>
  </footer>
</div>

<style>
  :root {
    --deep-blue: #1a365d;
    --royal-blue: #2d3748;
    --gold: #d69e2e;
    --warm-gold: #b7791f;
    --sage-green: #48bb78;
    --olive-green: #38a169;
    --terracotta: #c53030;
    --warm-red: #9b2c2c;
    --sand: #edf2f7;
    --cream: #f7fafc;
    --dark-sand: #e2e8f0;
    --copper: #dd6b20;
    --plum: #805ad5;
    --rose: #d53f8c;
    --teal: #319795;
    --text-dark: #2d3748;
    --text-light: #4a5568;
    --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: "Cairo", "Noto Naskh Arabic", sans-serif;
  }

  /* Header */
  .header {
    text-align: center;
    padding: 3rem 1rem;
    background: linear-gradient(
      135deg,
      var(--deep-blue),
      var(--plum)
    );
    color: white;
    border-radius: 20px;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  }

  .header h1 {
    font-family: "Noto Naskh Arabic", serif;
    font-size: 3.5rem;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  .header p {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Category Navigation */
  .category-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
  }

  .category-btn {
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 50px;
    font-family: "Cairo", sans-serif;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    position: relative;
  }

  .category-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .category-count {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin-right: 0.3rem;
  }

  .all-btn {
    background: linear-gradient(135deg, #4a5568, #718096);
  }

  /* Search */
  .search-container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    position: relative;
  }

  .search-input {
    width: 100%;
    padding: 1.2rem 4rem 1.2rem 1.2rem;
    font-size: 1.3rem;
    border: 2px solid var(--dark-sand);
    border-radius: 12px;
    font-family: "Cairo", sans-serif;
    transition: var(--transition);
    background: var(--cream);
    color: var(--text-dark);
    text-align: right;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(214, 158, 46, 0.2);
  }

  .search-icon {
    position: absolute;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gold);
    font-size: 1.5rem;
  }

  .clear-search {
    position: absolute;
    left: 3rem;
    top: 50%;
    transform: translateY(-50%);
    background: var(--dark-sand);
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-dark);
    font-size: 1rem;
    transition: var(--transition);
  }

  .clear-search:hover {
    background: var(--terracotta);
    color: white;
  }

  /* Stats */
  .stats-container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1.5rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    border-radius: 10px;
    transition: var(--transition);
    background: linear-gradient(
      135deg,
      rgba(45, 55, 72, 0.05),
      rgba(26, 54, 93, 0.05)
    );
    position: relative;
    overflow: hidden;
  }

  .stat-item:hover {
    transform: translateY(-5px);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    font-family: "Noto Naskh Arabic", serif;
    color: var(--deep-blue);
  }

  .stat-label {
    font-size: 1.1rem;
    color: var(--text-light);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .stat-icon {
    font-size: 1.8rem;
    opacity: 0.2;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
  }

  /* Results Info */
  .results-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .results-count {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .count-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--deep-blue);
  }

  .count-label {
    font-size: 1.2rem;
    color: var(--text-light);
  }

  .current-category {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--cream);
    border-radius: 25px;
  }

  .category-icon {
    font-size: 1.2rem;
  }

  /* Main Content Grid */
  .main-content {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(380px, 1fr)
    );
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .word-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border-top: 5px solid;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.6s ease-out forwards;
  }

  .word-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }

  .word-card::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: var(--card-color);
    opacity: 0.05;
    border-radius: 0 0 0 100%;
  }

  .word-category {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.2rem;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: white;
  }

  .category-icon-small,
  .category-name-small {
    color: white;
  }

  .word-arabic {
    font-family: "Noto Naskh Arabic", serif;
    font-size: 3.8rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    text-align: center;
    line-height: 1.2;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dark);
  }

  .word-transliteration {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 0.5rem;
    text-align: center;
    font-family: monospace;
    direction: ltr;
  }

  .word-translation {
    font-size: 1.3rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
    padding: 0.5rem;
    background: var(--cream);
    border-radius: 8px;
  }

  .word-egyptian {
    background: linear-gradient(
      135deg,
      rgba(214, 158, 46, 0.1),
      rgba(183, 121, 31, 0.1)
    );
    padding: 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    border: 1px solid var(--gold);
  }

  .egyptian-label {
    font-weight: 600;
    color: var(--gold);
    margin-left: 0.5rem;
  }

  .egyptian-text {
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }

  .egyptian-translit {
    font-size: 0.9rem;
    color: var(--text-light);
    font-family: monospace;
  }

  .word-example {
    font-size: 1.1rem;
    color: var(--text-dark);
    font-style: italic;
    padding: 1rem;
    background: var(--sand);
    border-radius: 8px;
    border-right: 3px solid;
    margin: 1rem 0;
  }

  .word-gloss {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed var(--dark-sand);
    font-style: italic;
  }

  /* Loading State */
  .loading-container {
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--sand);
    border-top: 5px solid var(--deep-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Error State */
  .error-container {
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
    border-top: 5px solid var(--terracotta);
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .retry-btn {
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    background: linear-gradient(
      135deg,
      var(--deep-blue),
      var(--plum)
    );
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }

  .retry-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  /* No Results */
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
  }

  .no-results-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--text-light);
  }

  .reset-btn {
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    background: var(--gold);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }

  .reset-btn:hover {
    background: var(--warm-gold);
    transform: translateY(-3px);
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 2.5rem;
    color: var(--text-light);
    font-size: 1.1rem;
    background: white;
    border-radius: 15px;
    box-shadow: var(--shadow);
    margin-top: 2rem;
  }

  .footer p {
    margin-bottom: 0.8rem;
  }

  .category-preview {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .preview-icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: white;
    transition: var(--transition);
  }

  .preview-icon:hover {
    transform: scale(1.15);
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 992px) {
    .header h1 {
      font-size: 2.8rem;
    }

    .word-arabic {
      font-size: 3.2rem;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2.2rem;
    }

    .header p {
      font-size: 1.1rem;
    }

    .main-content {
      grid-template-columns: 1fr;
    }

    .word-arabic {
      font-size: 3rem;
      min-height: 100px;
    }

    .category-nav {
      flex-direction: column;
      align-items: stretch;
    }

    .category-btn {
      justify-content: center;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }

    .results-info {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--sand);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--warm-gold);
  }
</style>
