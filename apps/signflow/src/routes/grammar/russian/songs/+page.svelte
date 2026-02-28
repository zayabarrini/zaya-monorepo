<script lang="ts">
  // Types and interfaces
  interface VocabularyWord {
    id: number;
    russian: string;
    translation: string;
    color: string;
    category?: string;
  }

  type ColorScheme =
    | "grammar"
    | "frequency"
    | "part-of-speech";
  type SortOrder = "alphabetical" | "original" | "category";

  // Component state
  let words: VocabularyWord[] = [];
  let filteredWords: VocabularyWord[] = [];
  let colorScheme: ColorScheme = "part-of-speech";
  let sortOrder: SortOrder = "original";
  let searchTerm: string = "";
  let showTranslation: boolean = true;
  let currentCategory: string = "all";

  // Color mapping functions
  const getGrammarColor = (word: string): string => {
    if (/[ая]$/.test(word)) return "#FF6B6B"; // Feminine
    if (/[оёе]$/.test(word)) return "#4ECDC4"; // Neuter
    if (/[ийь]$/.test(word)) return "#45B7D1"; // Masculine
    if (/[уют]$/.test(word)) return "#96CEB4"; // Verb forms
    return "#FFEAA7"; // Other
  };

  const getPartOfSpeechColor = (word: string): string => {
    // Noun patterns
    if (/ость$|ство$|ние$|тие$/.test(word))
      return "#FF6B6B";

    // Verb patterns
    if (/ть$|ться$|ла$|ло$|ли$/.test(word))
      return "#4ECDC4";

    // Adjective patterns
    if (/ый$|ий$|ой$|ая$|ое$|ие$/.test(word))
      return "#45B7D1";

    // Adverb patterns
    if (/о$|е$/.test(word) && word.length > 3)
      return "#96CEB4";

    return "#FFEAA7";
  };

  const getFrequencyColor = (index: number): string => {
    const colors = [
      "#FF6B6B",
      "#FF8E53",
      "#FFAA5C",
      "#FFD166",
      "#06D6A0",
      "#118AB2"
    ];
    return colors[
      Math.min(Math.floor(index / 50), colors.length - 1)
    ];
  };

  // Initialize vocabulary data
  const initializeWords = (): void => {
    const wordList = [
      "милый",
      "сладкую",
      "собираемся",
      "счастливым",
      "Разве",
      "снег",
      "Следующее",
      "измеряем",
      "чашки",
      "сложно",
      "день рождения",
      "В противном случае",
      "прерываю",
      "Любой",
      "смехотворно легко",
      "держу пари",
      "Мол",
      "сжимали кастрюлю",
      "Я смачивал сковороду.",
      "достоинства",
      "сильно",
      "заметит",
      "Что бы вы ни делали",
      "замечательно",
      "загородный",
      "проводим",
      "обоих",
      "справляешься",
      "войны",
      "заслужили",
      "прошли",
      "невероятно",
      "хозяйка",
      "уверена",
      "устроить",
      "вечеринку",
      "больницу",
      "рост",
      "матке",
      "взглянуть",
      "кормил",
      "забеременеть",
      "доволен",
      "оказывается",
      "причина",
      "зачать",
      "по которой",
      "повезло",
      "назвать",
      "За исключением",
      "по крайней мере",
      "смогут",
      "справиться",
      "волнуюсь",
      "смысл",
      "беспокоиться",
      "которого",
      "Во всяком случае",
      "Забудь",
      "проверьте",
      "возражал",
      "водил",
      "станет",
      "печенье",
      "смелым",
      "волнуйтесь",
      "Попейте",
      "беспокоиться",
      "имело",
      "неизбежно полностью прекратится",
      "продолжаться",
      "обижалась",
      "стало",
      "утешением",
      "закончилась",
      "случилось",
      "обнаружил",
      "встречал",
      "хрупкой",
      "застенчива",
      "основном",
      "южной",
      "части",
      "привести",
      "степени",
      "мысль о счастье",
      "заставило",
      "представление",
      "исчезнуть",
      "чистите",
      "зубы",
      "ложишься",
      "через",
      "столкнулся",
      "больницу",
      "осмотр",
      "ужасе",
      "Maybe you could",
      "собирался",
      "зайти",
      "поблагодарить",
      "надеялся",
      "выбрал",
      "решена",
      "Судьба",
      "кухне",
      "возьму",
      "нашел",
      "довольно",
      "Очевидно",
      "недостойным",
      "стихи",
      "заставил",
      "больно",
      "притворяться",
      "покинули",
      "оставил",
      "отказался",
      "встречал",
      "принадлежите",
      "родился",
      "сел",
      "записку",
      "пожалели",
      "вынести",
      "снять",
      "кражу",
      "откладываем",
      "вообще",
      "голодны",
      "Возьми",
      "Необходимо",
      "гордиться",
      "смелым",
      "чепуха",
      "здоровым",
      "устраивает",
      "всего лишь",
      "Заполняется",
      "полностью",
      "уважают",
      "восхищаются",
      "потерял",
      "тишину",
      "Поскольку",
      "мгновение",
      "выглядят",
      "несете",
      "пахнет",
      "кажется",
      "нитью",
      "неудачу",
      "Независимо от того",
      "ближе",
      "злились",
      "зол",
      "остаюсь",
      "удовлетворить",
      "собственной",
      "(Не то чтобы я представлял, что это имеет какое -либо значение для вас.)",
      "понятие",
      "-Не не подошли ко мне!",
      "казалось",
      "одолжение",
      "сталкиваться",
      "совсем",
      "голоса",
      "слышите",
      "встал",
      "свежо",
      "обычное",
      "чьей -либо",
      "Боюсь",
      "потрясающе",
      "болезненный",
      "Слишком",
      "ведра",
      "потребовалось",
      "Вроде",
      "некотором",
      "самом",
      "деле",
      "меняет",
      "образом",
      "ясной",
      "Осмелиться посетить",
      "тех",
      "болезнь",
      "подготовиться",
      "изменился",
      "предназначено",
      "выдумки",
      "заставил",
      "Целая",
      "лак для ногтей",
      "угадайте",
      "продолжается",
      "причины",
      "Лю",
      "жесткая",
      "понравилась",
      "расстроила",
      "добро",
      "смелый",
      "столкнуться",
      "тем",
      "нахожусь",
      "настроении",
      "грубо",
      "распутываю",
      "представление",
      "отношении",
      "хозяйка",
      "трогай",
      "ухаживал",
      "держал",
      "заднем",
      "крыльце",
      "плечо",
      "С тех пор я",
      "застрял",
      "пробился",
      "свободным",
      "призраки",
      "собираются",
      "плакали",
      "оглянулся",
      "намеренно",
      "взгляд",
      "ежедневные",
      "подробности",
      "глупый",
      "остальное",
      "рассвет",
      "приходило",
      "выздоровею",
      "сосредоточиться",
      "величайшее",
      "отношениях",
      "порчу",
      "обязана",
      "невероятно",
      "терпелива",
      "потеряно",
      "происшествий",
      "Головные боли?",
      "довольным",
      "рукопись",
      "ошибки",
      "настойчивость",
      "отправить",
      "Силой",
      "предложение",
      "привлекает",
      "высокую",
      "частоту",
      "воздуха",
      "середине",
      "произойдет",
      "обращаете",
      "внимания",
      "узнали",
      "спрашиваете",
      "запрещено",
      "презренных",
      "обширность",
      "сильнее",
      "осторожны",
      "траву",
      "могилу",
      "по крайней мере",
      "кровать",
      "возвращаемся",
      "мирно",
      "закончили",
      "Похороны",
      "завершены",
      "ведет",
      "повезло",
      "придется",
      "сбежать",
      "невыносимый",
      "завидовать",
      "казалось",
      "обязательства",
      "удовольствие",
      "саду",
      "беспокоить",
      "исчезаешь",
      "здравомыслием",
      "опеку",
      "тюремное заключение.",
      "посещают",
      "везде",
      "состоянии",
      "припадков",
      "настроений",
      "отключений",
      "безотзывного",
      "ущерба",
      "намеревали",
      "угрозой",
      "настроили",
      "печатный",
      "источник",
      "поглощения",
      "лекарства",
      "рукодее",
      "неблагодарность",
      "украдена",
      "скучаю",
      "низкому",
      "боролся",
      "темноте",
      "глубокой",
      "удушающий",
      "пригородов",
      "насильственный",
      "толчок",
      "столицы",
      "подлый",
      "рецепте",
      "определяет",
      "ради",
      "тишине",
      "вернемся",
      "заканчивающий",
      "избегая",
      "ошибка",
      "случилось",
      "вырезали",
      "великолепно",
      "волнуйся",
      "представляю",
      "остальные",
      "ценили",
      "Провидца",
      "убрать"
    ];

    const translations = [
      "cute, sweet",
      "sweet (accusative)",
      "we are going to",
      "happy (instrumental)",
      "really?",
      "snow",
      "next",
      "we measure",
      "cups",
      "difficult",
      "birthday",
      "otherwise",
      "I interrupt",
      "any",
      "ridiculously easy",
      "I bet",
      "they say",
      "squeezed the pot",
      "I wet the pan.",
      "merits",
      "strongly, very",
      "will notice",
      "whatever you do",
      "wonderful",
      "country",
      "we spend",
      "both",
      "you manage",
      "wars",
      "deserved",
      "passed",
      "incredibly",
      "hostess",
      "sure",
      "to arrange",
      "party",
      "hospital",
      "height",
      "uterus",
      "to glance",
      "fed",
      "get pregnant",
      "satisfied",
      "it turns out",
      "reason",
      "conceive",
      "by which",
      "got lucky",
      "to name",
      "except",
      "at least",
      "will be able",
      "to cope",
      "I worry",
      "meaning",
      "to worry",
      "whom",
      "anyway",
      "forget",
      "check",
      "objected",
      "drove",
      "will become",
      "cookies",
      "brave",
      "worry",
      "drink",
      "to worry",
      "had",
      "inevitably will completely stop",
      "to continue",
      "was offended",
      "became",
      "consolation",
      "ended",
      "happened",
      "discovered",
      "met",
      "fragile",
      "shy",
      "mainly",
      "southern",
      "part",
      "lead to",
      "degree",
      "thought of happiness",
      "forced",
      "idea",
      "disappear",
      "clean",
      "teeth",
      "you go to bed",
      "through",
      "encountered",
      "hospital",
      "examination",
      "horror",
      "maybe you could",
      "was going to",
      "drop by",
      "thank",
      "hoped",
      "chose",
      "solved",
      "fate",
      "kitchen",
      "I will take",
      "found",
      "quite",
      "obviously",
      "unworthy",
      "poems",
      "forced",
      "painful",
      "pretend",
      "left",
      "left",
      "refused",
      "met",
      "belong",
      "was born",
      "sat down",
      "note",
      "regretted",
      "carry out",
      "take off",
      "theft",
      "we postpone",
      "at all",
      "hungry",
      "take",
      "necessary",
      "be proud",
      "brave",
      "nonsense",
      "healthy",
      "suits",
      "merely",
      "fills",
      "completely",
      "respect",
      "admire",
      "lost",
      "silence",
      "since",
      "moment",
      "look",
      "you carry",
      "smells",
      "seems",
      "thread",
      "failure",
      "regardless of",
      "closer",
      "were angry",
      "angry",
      "I remain",
      "satisfy",
      "own",
      "(Not that I imagined it matters to you.)",
      "concept",
      "don't come near me!",
      "seemed",
      "favor",
      "to encounter",
      "completely",
      "voices",
      "you hear",
      "got up",
      "fresh",
      "usual",
      "anyone's",
      "I'm afraid",
      "amazing",
      "painful",
      "too",
      "buckets",
      "required",
      "like",
      "some",
      "very",
      "fact",
      "changes",
      "way",
      "clear",
      "dare to visit",
      "those",
      "illness",
      "prepare",
      "changed",
      "destined",
      "fictions",
      "forced",
      "whole",
      "nail polish",
      "guess",
      "continues",
      "reasons",
      "Lyu",
      "tough",
      "liked",
      "upset",
      "good",
      "brave",
      "to face",
      "those",
      "I am",
      "mood",
      "rudely",
      "I unravel",
      "idea",
      "relation",
      "hostess",
      "touch",
      "cared for",
      "held",
      "back",
      "porch",
      "shoulder",
      "since then I",
      "got stuck",
      "made my way",
      "free",
      "ghosts",
      "are going to",
      "cried",
      "looked back",
      "deliberately",
      "glance",
      "daily",
      "details",
      "stupid",
      "rest",
      "dawn",
      "came",
      "I will recover",
      "focus",
      "greatest",
      "relationships",
      "I spoil",
      "obliged",
      "incredibly",
      "patient",
      "lost",
      "incidents",
      "headaches?",
      "satisfied",
      "manuscript",
      "mistakes",
      "persistence",
      "send",
      "by force",
      "offer",
      "attracts",
      "high",
      "frequency",
      "air",
      "middle",
      "will happen",
      "pay",
      "attention",
      "found out",
      "you ask",
      "forbidden",
      "despicable",
      "vastness",
      "stronger",
      "careful",
      "grass",
      "grave",
      "at least",
      "bed",
      "we return",
      "peacefully",
      "finished",
      "funeral",
      "completed",
      "leads",
      "lucky",
      "will have to",
      "escape",
      "unbearable",
      "envy",
      "seemed",
      "obligations",
      "pleasure",
      "garden",
      "disturb",
      "you disappear",
      "sanity",
      "guardianship",
      "imprisonment",
      "visit",
      "everywhere",
      "condition",
      "seizures",
      "moods",
      "blackouts",
      "irrevocable",
      "damage",
      "intended",
      "threat",
      "tuned",
      "printed",
      "source",
      "absorption",
      "medicine",
      "needlewoman",
      "ingratitude",
      "stolen",
      "I miss",
      "low",
      "fought",
      "darkness",
      "deep",
      "suffocating",
      "suburbs",
      "violent",
      "push",
      "capital",
      "mean",
      "recipe",
      "defines",
      "for the sake of",
      "silence",
      "we will return",
      "ending",
      "avoiding",
      "mistake",
      "happened",
      "cut out",
      "magnificently",
      "worry",
      "I imagine",
      "rest",
      "appreciated",
      "Seer",
      "remove"
    ];

    words = wordList.map((word, index) => ({
      id: index,
      russian: word,
      translation:
        translations[index] || "translation not available",
      color: getPartOfSpeechColor(word),
      category:
        index < 50
          ? "frequent"
          : index < 100
            ? "common"
            : index < 150
              ? "intermediate"
              : "advanced"
    }));

    filteredWords = [...words];
  };

  // Color scheme handler
  const updateColorScheme = (scheme: ColorScheme): void => {
    colorScheme = scheme;
    words = words.map((word, index) => ({
      ...word,
      color:
        scheme === "grammar"
          ? getGrammarColor(word.russian)
          : scheme === "frequency"
            ? getFrequencyColor(index)
            : getPartOfSpeechColor(word.russian)
    }));
    applyFilters();
  };

  // Sorting functions
  const sortWords = (): void => {
    const sorted = [...filteredWords];

    if (sortOrder === "alphabetical") {
      sorted.sort((a, b) =>
        a.russian.localeCompare(b.russian)
      );
    } else if (sortOrder === "category") {
      sorted.sort((a, b) =>
        (a.category || "").localeCompare(b.category || "")
      );
    }
    // 'original' order is already maintained

    filteredWords = sorted;
  };

  // Filtering logic
  const applyFilters = (): void => {
    let result = words;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (word) =>
          word.russian.toLowerCase().includes(term) ||
          word.translation.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (currentCategory !== "all") {
      result = result.filter(
        (word) => word.category === currentCategory
      );
    }

    filteredWords = result;
    sortWords();
  };

  // Event handlers
  const handleSearch = (e: Event): void => {
    searchTerm = (e.target as HTMLInputElement).value;
    applyFilters();
  };

  const handleSortChange = (order: SortOrder): void => {
    sortOrder = order;
    sortWords();
  };

  const handleCategoryChange = (category: string): void => {
    currentCategory = category;
    applyFilters();
  };

  // Initialize on component mount
  initializeWords();
</script>

<div class="container">
  <div class="header">
    <h1 class="title">Russian Vocabulary Flashcards</h1>
    <p class="subtitle">
      Anna Asti Song Lyrics Vocabulary • {filteredWords.length}
      words
    </p>
  </div>

  <div class="controls">
    <div class="control-group">
      <label for="search-input" class="control-label"
        >Search Vocabulary</label
      >
      <input
        id="search-input"
        type="text"
        class="search-input"
        placeholder="Search Russian or English..."
        bind:value={searchTerm}
        on:input={handleSearch}
      />
    </div>

    <div class="control-group">
      <div class="control-label">Color Coding</div>
      <div class="button-group">
        <button
          class:active={colorScheme === "part-of-speech"}
          class="btn"
          on:click={() =>
            updateColorScheme("part-of-speech")}
        >
          Part of Speech
        </button>
        <button
          class:active={colorScheme === "grammar"}
          class="btn"
          on:click={() => updateColorScheme("grammar")}
        >
          Grammar
        </button>
        <button
          class:active={colorScheme === "frequency"}
          class="btn"
          on:click={() => updateColorScheme("frequency")}
        >
          Frequency
        </button>
      </div>
    </div>

    <div class="control-group">
      <div class="control-label">Sort Order</div>
      <div class="button-group">
        <button
          class:active={sortOrder === "original"}
          class="btn"
          on:click={() => handleSortChange("original")}
        >
          Original
        </button>
        <button
          class:active={sortOrder === "alphabetical"}
          class="btn"
          on:click={() => handleSortChange("alphabetical")}
        >
          A-Z
        </button>
        <button
          class:active={sortOrder === "category"}
          class="btn"
          on:click={() => handleSortChange("category")}
        >
          Category
        </button>
      </div>
    </div>

    <div class="control-group">
      <div class="control-label">Filter by Level</div>
      <div class="button-group">
        <button
          class:active={currentCategory === "all"}
          class="btn"
          on:click={() => handleCategoryChange("all")}
        >
          All
        </button>
        <button
          class:active={currentCategory === "frequent"}
          class="btn"
          on:click={() => handleCategoryChange("frequent")}
        >
          Frequent
        </button>
        <button
          class:active={currentCategory === "common"}
          class="btn"
          on:click={() => handleCategoryChange("common")}
        >
          Common
        </button>
        <button
          class:active={currentCategory === "intermediate"}
          class="btn"
          on:click={() =>
            handleCategoryChange("intermediate")}
        >
          Intermediate
        </button>
        <button
          class:active={currentCategory === "advanced"}
          class="btn"
          on:click={() => handleCategoryChange("advanced")}
        >
          Advanced
        </button>
      </div>
    </div>
  </div>

  <div class="stats">
    <div>
      Showing {filteredWords.length} of {words.length} words
    </div>
    <button
      class="toggle-btn"
      on:click={() => (showTranslation = !showTranslation)}
    >
      {showTranslation
        ? "Hide Translations"
        : "Show Translations"}
    </button>
  </div>

  <div class="word-grid">
    {#each filteredWords as word (word.id)}
      <div
        class="word-card"
        style="border-left-color: {word.color}"
      >
        <div class="word-header">
          <div class="word-russian">{word.russian}</div>
          <div class="word-id">#{word.id + 1}</div>
        </div>

        {#if showTranslation}
          <div class="word-translation">
            {word.translation}
          </div>
        {/if}

        <div class="word-footer">
          <div class="word-category">{word.category}</div>
          <div>Length: {word.russian.length}</div>
        </div>
      </div>
    {:else}
      <div class="no-results">
        No words found matching your criteria. Try a
        different search term.
      </div>
    {/each}
  </div>

  <div class="legend">
    <h3 class="legend-title">Color Legend</h3>
    <div class="legend-items">
      {#if colorScheme === "part-of-speech"}
        <div class="legend-item">
          <div
            class="color-box"
            style="background: var(--color-noun);"
          ></div>
          <span class="legend-label"
            >Nouns (-ость, -ство, -ние)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: var(--color-verb);"
          ></div>
          <span class="legend-label"
            >Verbs (-ть, -ться, -ла, -ли)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: var(--color-adjective);"
          ></div>
          <span class="legend-label"
            >Adjectives (-ый, -ий, -ой)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: var(--color-adverb);"
          ></div>
          <span class="legend-label">Adverbs (-о, -е)</span>
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: var(--color-other);"
          ></div>
          <span class="legend-label">Other / Phrases</span>
        </div>
      {:else if colorScheme === "grammar"}
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #FF6B6B;"
          ></div>
          <span class="legend-label">Feminine (-а, -я)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #4ECDC4;"
          ></div>
          <span class="legend-label"
            >Neuter (-о, -ё, -е)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #45B7D1;"
          ></div>
          <span class="legend-label"
            >Masculine (-ий, -ь)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #96CEB4;"
          ></div>
          <span class="legend-label"
            >Verb Forms (-у, -ю, -т)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #FFEAA7;"
          ></div>
          <span class="legend-label">Other / Irregular</span
          >
        </div>
      {:else}
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #FF6B6B;"
          ></div>
          <span class="legend-label"
            >Most Frequent (1-50)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #FF8E53;"
          ></div>
          <span class="legend-label"
            >Very Common (51-100)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #FFD166;"
          ></div>
          <span class="legend-label">Common (101-150)</span>
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #06D6A0;"
          ></div>
          <span class="legend-label"
            >Less Common (151-200)</span
          >
        </div>
        <div class="legend-item">
          <div
            class="color-box"
            style="background: #118AB2;"
          ></div>
          <span class="legend-label"
            >Rare/Advanced (200+)</span
          >
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Color system variables */
  :global(:root) {
    --color-noun: #ff6b6b;
    --color-verb: #4ecdc4;
    --color-adjective: #45b7d1;
    --color-adverb: #96ceb4;
    --color-other: #ffeaa7;
    --color-bg: #1a1a2e;
    --color-card: #16213e;
    --color-text: #e6e6e6;
    --color-accent: #0f3460;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 4rem;
    padding: 2rem;
    font-family: "Segoe UI", system-ui, sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    min-height: 100vh;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .title {
    font-size: 2.5rem;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 1rem;
  }

  .subtitle {
    color: #96ceb4;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 1.5rem;
    background: var(--color-card);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .control-label {
    font-size: 0.9rem;
    color: #96ceb4;
    font-weight: 600;
  }

  .search-input {
    padding: 0.75rem 1rem;
    border: 2px solid var(--color-accent);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  .search-input:focus {
    outline: none;
    border-color: #4ecdc4;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background: var(--color-accent);
    color: var(--color-text);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
    flex: 1;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .btn.active {
    background: #4ecdc4;
    color: var(--color-bg);
    font-weight: 600;
  }

  .toggle-btn {
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #ff6b6b, #ff8e53);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: transform 0.3s;
  }

  .toggle-btn:hover {
    transform: scale(1.05);
  }

  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-card);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  .word-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    );
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    .word-grid {
      grid-template-columns: 1fr;
    }
  }

  .word-card {
    background: var(--color-card);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    border-left: 4px solid;
  }

  .word-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  .word-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .word-russian {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    line-height: 1.3;
  }

  .word-id {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .word-translation {
    font-size: 1.1rem;
    color: #96ceb4;
    line-height: 1.5;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin: 1rem 0;
    border-left: 3px solid #4ecdc4;
  }

  .word-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 1rem;
  }

  .word-category {
    padding: 0.3rem 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.75rem;
  }

  .legend {
    background: var(--color-card);
    padding: 1.5rem;
    border-radius: 12px;
    margin-top: 3rem;
  }

  .legend-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #96ceb4;
  }

  .legend-items {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
    gap: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .color-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .legend-label {
    font-size: 0.9rem;
    color: var(--color-text);
  }

  .no-results {
    text-align: center;
    padding: 3rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    grid-column: 1 / -1;
  }
</style>
