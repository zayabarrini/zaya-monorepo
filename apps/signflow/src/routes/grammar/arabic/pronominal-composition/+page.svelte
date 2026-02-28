<script>
  // CSS variables moved here for better organization
  const cssVariables = {
    prefix: "#3498db",
    suffix: "#e74c3c",
    verbRoot: "#2ecc71",
    pronoun: "#9b59b6",
    directObj: "#f39c12",
    indirectObj: "#1abc9c",
    background: "#f8f9fa",
    cardBg: "#ffffff",
    textPrimary: "#2c3e50",
    textSecondary: "#7f8c8d",
    tableHeader: "#34495e"
  };

  // Example data for better maintainability
  const examples = [
    {
      id: 1,
      arabic: "يعطيني الكتاب",
      translation:
        "He gives me the book. / He gives the book to me.",
      components: [
        { type: "prefix", text: "ي" },
        { type: "verb-root", text: "عطي" },
        { type: "pronoun", text: "ني" },
        { text: " " },
        { type: "direct-obj", text: "الكتاب" }
      ],
      analysis: {
        direct: "الكتاب (the book)",
        indirect: "ـني (to me) attached to verb",
        note: "The indirect object pronoun <span class='pronoun'>ـني</span> attaches directly to the verb, replacing the need for a separate prepositional phrase like 'لي' (to me)."
      }
    },
    {
      id: 2,
      arabic: "سأعطيه إياك",
      translation: "I will give it to you.",
      components: [
        { type: "prefix", text: "سأ" },
        { type: "verb-root", text: "عطي" },
        { type: "pronoun", text: "ه" },
        { text: " " },
        { type: "indirect-obj", text: "إياك" }
      ],
      analysis: {
        direct: "ـه (it) attached to verb",
        indirect: "إياك (to you - separate word)",
        note: "When both objects are pronouns, sometimes one appears as a separate word (<span class='indirect-obj'>إياك</span>) for clarity or emphasis."
      }
    },
    {
      id: 3,
      arabic: "أعطيتها إياه",
      translation: "I gave it (feminine) to him.",
      components: [
        { type: "prefix", text: "أعط" },
        { type: "verb-root", text: "يت" },
        { type: "suffix", text: "ها" },
        { text: " " },
        { type: "pronoun", text: "إياه" }
      ],
      analysis: {
        verbStructure:
          "أعط (root: give) + ـيت (I - past tense suffix) = 'I gave'",
        direct: "ـها (it - feminine) attached to verb",
        indirect: "إياه (to him) as separate word"
      }
    },
    {
      id: 4,
      arabic: "يعطيهك إياي",
      translation: "He gives it to you (and) to me.",
      components: [
        { type: "prefix", text: "ي" },
        { type: "verb-root", text: "عطي" },
        { type: "pronoun", text: "ه" },
        { type: "suffix", text: "ك" },
        { text: " " },
        { type: "indirect-obj", text: "إياي" }
      ],
      analysis: {
        direct: "ـه (it) attached to verb",
        indirect: "ـك (to you) attached to verb",
        additional: "إياي (to me) as separate word"
      }
    }
  ];

  const paradigmData = [
    {
      verbDirect: "يعطيني",
      verbIndirect: "يعطيه",
      verbBoth: "يعطيهلي",
      translation: "Basic attachment pattern"
    },
    {
      verbDirect: "تعطيك",
      verbIndirect: "تعطيها",
      verbBoth: "تعطيهالك",
      translation: "Feminine subject pattern"
    },
    {
      verbDirect: "أعطيناه",
      verbIndirect: "أعطيناكم",
      verbBoth: "أعطيناهلكم",
      translation: "Past tense with plural objects"
    },
    {
      verbDirect: "سأعطيهم",
      verbIndirect: "سأعطيه",
      verbBoth: "سأعطيهاياهم",
      translation: "Future tense with إياـ separation"
    }
  ];

  const pronouns = [
    "يـ / ني (me)",
    "كـ (you m.s.)",
    "كـ (you f.s.)",
    "هـ (him)",
    "ها (her)",
    "نا (us)",
    "كم (you m.pl.)",
    "كن (you f.pl.)",
    "هم / هن (them)"
  ];

  const rules = [
    {
      number: 1,
      title: "Direct Object Pronouns Come First",
      description:
        "When both direct and indirect object pronouns attach to a verb, the <span class='direct-obj'>direct object pronoun</span> comes immediately after the verb root, followed by the <span class='indirect-obj'>indirect object pronoun</span>."
    },
    {
      number: 2,
      title: "Order Cannot Be Reversed",
      description:
        "The sequence is fixed: Verb + <span class='direct-obj'>Direct Object Pronoun</span> + <span class='indirect-obj'>Indirect Object Pronoun</span>. Reversing this order creates ungrammatical structures."
    },
    {
      number: 3,
      title: "Phonetic Adjustments",
      description:
        "When certain pronouns combine, phonetic adjustments occur (e.g., <span class='highlight'>ه + ها → هاها</span> becomes <span class='highlight'>هَا</span> with vowel lengthening)."
    },
    {
      number: 4,
      title: "Prepositional Pronouns as Indirect Objects",
      description:
        "Indirect object pronouns often derive from prepositional pronouns (لـ + pronoun → له، لها، لنا etc.) but attach directly to the verb without the preposition."
    }
  ];

  const keyPoints = [
    "<span class='highlight'>Direct object pronouns</span> typically attach directly to the verb as suffixes when they're the only object.",
    "When <span class='highlight'>both direct and indirect object pronouns</span> are present, the direct object attaches first, followed by the indirect object.",
    "Some pronouns have <span class='highlight'>two forms</span>: attached (ـه، ـها، ـهم) and detached (إياه، إياها، إياهم) for emphasis or clarity.",
    "In <span class='highlight'>double pronoun constructions</span>, sometimes one pronoun appears as a separate word (إياـ form) to avoid ambiguity.",
    "The verb <span class='highlight'>عطى</span> (to give) is a classic example of a ditransitive verb that regularly takes both direct and indirect objects.",
    "<span class='highlight'>Phonetic assimilation</span> can occur when certain pronouns combine, changing pronunciation but not meaning.",
    "The <span class='highlight'>order of pronouns</span> is fixed: Verb + Direct Object Pronoun + Indirect Object Pronoun. This cannot be reversed.",
    "When <span class='highlight'>prepositions are involved</span>, the prepositional phrase typically comes after the verb with attached pronouns."
  ];
</script>

<svelte:head>
  <title
    >Arabic Pronominal Composition - Direct & Indirect
    Object Pronouns</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>

<div class="container mainpage">
  <header>
    <h1>Arabic Pronominal Composition</h1>
    <p class="subtitle">
      Direct and Indirect Object Pronouns with Transitive
      Verbs - Color-Coded Morphological Analysis
    </p>
  </header>

  <div class="legend-container">
    <div class="legend-box">
      <div class="legend-title morphology-title">
        Morphological Elements
      </div>
      <div class="legend-grid">
        <div class="legend-item">
          <div class="legend-color prefix-color"></div>
          <span>Prefix (بادئة)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color suffix-color"></div>
          <span>Suffix (لاحقة)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color verb-root-color"></div>
          <span>Verb Root (جذر الفعل)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color pronoun-color"></div>
          <span>Pronoun (ضمير)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color direct-obj-color"></div>
          <span>Direct Object (مفعول به مباشر)</span>
        </div>
        <div class="legend-item">
          <div
            class="legend-color indirect-obj-color"
          ></div>
          <span>Indirect Object (مفعول به غير مباشر)</span>
        </div>
      </div>
    </div>

    <div class="legend-box">
      <div class="legend-title pronoun-title">
        Object Pronouns Chart
      </div>
      <div class="pronoun-grid">
        {#each pronouns as pronoun}
          <div class="pronoun-item">{pronoun}</div>
        {/each}
      </div>
      <div
        style="margin-top: 15px; font-size: 0.9rem; color: #7f8c8d;"
      >
        <strong>Note:</strong> Pronouns attach directly to verbs
        as suffixes
      </div>
    </div>
  </div>

  <div class="rules-section">
    <h3 style="color: #2c3e50; margin-bottom: 25px;">
      Rules of Pronominal Composition in Arabic
    </h3>

    {#each rules as rule}
      <div class="rule-item">
        <div class="rule-title">
          <span class="rule-number">{rule.number}</span>
          {rule.title}
        </div>
        <p>{@html rule.description}</p>
      </div>
    {/each}
  </div>

  <h2 class="section-title">
    Single Object Pronoun Examples
  </h2>
  <div class="examples-container">
    {#each examples.slice(0, 2) as example}
      <div class="example-card">
        <div class="example-number">{example.id}</div>
        <div class="example-arabic">
          {#each example.components as component}
            {#if component.type}
              <span class={component.type}
                >{component.text}</span
              >
            {:else}
              {component.text}
            {/if}
          {/each}
        </div>
        <div class="example-translation">
          <strong>Translation:</strong>
          {example.translation}
        </div>

        <div class="analysis-container">
          <div class="analysis-title">Analysis:</div>

          <div class="analysis-detail direct-analysis">
            <strong>Direct Object:</strong>
            {@html example.analysis.direct}
          </div>

          <div class="analysis-detail indirect-analysis">
            <strong>Indirect Object:</strong>
            {@html example.analysis.indirect}
          </div>

          <div class="structure-container">
            <div class="structure-visual">
              {#if example.id === 1}
                <span class="prefix">يـ</span><span
                  class="verb-root">عطي</span
                ><span class="pronoun">ني</span> =
                <span class="prefix">He</span>-<span
                  class="verb-root">gives</span
                >-<span class="pronoun">me</span>
              {:else}
                <span class="prefix">سأ</span><span
                  class="verb-root">عطي</span
                ><span class="pronoun">ه</span> =
                <span class="prefix">I will</span>-<span
                  class="verb-root">give</span
                >-<span class="pronoun">it</span>
              {/if}
            </div>
          </div>

          <div
            style="margin-top: 15px; padding: 15px; background: rgba(52, 152, 219, 0.05); border-radius: 6px;"
          >
            <strong>Note:</strong>
            {@html example.analysis.note}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="section-title">
    Double Object Pronoun Attachments
  </h2>
  <div class="examples-container">
    {#each examples.slice(2, 4) as example}
      <div class="example-card">
        <div class="example-number">{example.id}</div>
        <div class="example-arabic">
          {#each example.components as component}
            {#if component.type}
              <span class={component.type}
                >{component.text}</span
              >
            {:else}
              {component.text}
            {/if}
          {/each}
        </div>
        <div class="example-translation">
          <strong>Translation:</strong>
          {example.translation}
        </div>

        <div class="analysis-container">
          <div class="analysis-title">
            Detailed Analysis:
          </div>

          {#if example.analysis.verbStructure}
            <div class="analysis-detail direct-analysis">
              <strong>Verb Structure:</strong>
              {@html example.analysis.verbStructure}
            </div>
          {/if}

          <div class="analysis-detail direct-analysis">
            <strong>Direct Object:</strong>
            {@html example.analysis.direct}
          </div>

          <div class="analysis-detail indirect-analysis">
            <strong>Indirect Object:</strong>
            {@html example.analysis.indirect}
          </div>

          {#if example.analysis.additional}
            <div class="analysis-detail">
              <strong>Additional Indirect Object:</strong>
              {@html example.analysis.additional}
            </div>
          {/if}

          <div class="structure-container">
            <div class="structure-visual">
              {#if example.id === 3}
                أعطيت + ها + إياه =
                <span class="verb-root">Gave</span>-<span
                  class="suffix">I</span
                >
                +
                <span class="direct-obj">it(f)</span> +
                <span class="indirect-obj">to him</span>
              {:else}
                <span class="prefix">يـ</span><span
                  class="verb-root">عطي</span
                ><span class="pronoun">ه</span><span
                  class="suffix">ك</span
                >
                =
                <span class="prefix">He</span>-<span
                  class="verb-root">gives</span
                >-<span class="direct-obj">it</span>-<span
                  class="indirect-obj">to you</span
                >
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="section-title">Pronoun Attachment Paradigm</h2>
  <table class="paradigm-table">
    <thead>
      <tr>
        <th>Verb + Direct Object</th>
        <th>Verb + Indirect Object</th>
        <th>Verb + Both Objects</th>
        <th>Translation</th>
      </tr>
    </thead>
    <tbody>
      {#each paradigmData as row}
        <tr>
          <td>
            <div class="paradigm-arabic">
              {row.verbDirect}
            </div>
            <div class="paradigm-translation">
              {row.translation.split(" - ")[0]}
            </div>
          </td>
          <td>
            <div class="paradigm-arabic">
              {row.verbIndirect}
            </div>
            <div class="paradigm-translation">
              {row.translation.split(" - ")[0]}
            </div>
          </td>
          <td>
            <div class="paradigm-arabic">
              {row.verbBoth}
            </div>
            <div class="paradigm-translation">
              {row.translation.split(" - ")[0]}
            </div>
          </td>
          <td>{row.translation}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <h2 class="section-title">
    Complex Examples with Analysis
  </h2>
  <div class="examples-container">
    <div class="example-card">
      <div class="example-number">5</div>
      <div class="example-arabic">
        <span class="prefix">لن</span>
        <span class="prefix">ي</span><span class="verb-root"
          >عطي</span
        ><span class="pronoun">ك</span><span class="suffix"
          >ه</span
        ><span class="pronoun">إياها</span>
        <span class="indirect-obj">أبداً</span>
      </div>
      <div class="example-translation">
        <strong>Translation:</strong> He will never give it to
        you for her sake.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Complex Analysis:</div>

        <div class="analysis-detail direct-analysis">
          <strong>Negation + Future:</strong>
          <span class="prefix">لن</span> (will not) +
          <span class="prefix">يـ</span> (he - present prefix)
        </div>

        <div class="analysis-detail direct-analysis">
          <strong>Verb with Attached Pronouns:</strong>
          <span class="verb-root">عطي</span> (give) +
          <span class="pronoun">ـك</span> (to you) +
          <span class="pronoun">ـه</span> (it)
        </div>

        <div class="analysis-detail indirect-analysis">
          <strong>Benefactive Pronoun:</strong>
          <span class="indirect-obj"
            ><span class="pronoun">إياها</span></span
          > (for her - separate emphatic form)
        </div>

        <div class="analysis-detail">
          <strong>Adverb:</strong>
          <span class="indirect-obj">أبداً</span> (never)
        </div>

        <div class="structure-container">
          <div class="structure-visual">
            Structure: لن + يـعطي + كـ + هـ + إياها + أبداً
          </div>
        </div>
      </div>
    </div>

    <div class="example-card">
      <div class="example-number">6</div>
      <div class="example-arabic">
        <span class="prefix">أعط</span><span
          class="verb-root">تنا</span
        ><span class="suffix">كم</span><span class="pronoun"
          >إياهن</span
        > <span class="direct-obj">بالأمس</span>
      </div>
      <div class="example-translation">
        <strong>Translation:</strong> We gave them (feminine)
        to you (plural) yesterday.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Complex Analysis:</div>

        <div class="analysis-detail direct-analysis">
          <strong>Past Verb with Subject:</strong>
          <span class="prefix">أعط</span> (give) +
          <span class="suffix">ـتنا</span> (we - past suffix)
        </div>

        <div class="analysis-detail indirect-analysis">
          <strong>Indirect Object Pronoun:</strong>
          <span class="indirect-obj"
            ><span class="pronoun">ـكم</span></span
          > (to you plural) attached
        </div>

        <div class="analysis-detail direct-analysis">
          <strong>Direct Object Pronoun:</strong>
          <span class="direct-obj"
            ><span class="pronoun">إياهن</span></span
          > (them feminine) as separate word
        </div>

        <div class="analysis-detail">
          <strong>Time Adjunct:</strong>
          <span class="direct-obj">بالأمس</span> (yesterday)
        </div>

        <div class="structure-container">
          <div class="structure-visual">
            Order: Verb + Indirect Object + Direct Object +
            Time
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="notes">
    <h3>Key Points about Arabic Pronominal Composition</h3>
    <ul>
      {#each keyPoints as point}
        <li>{@html point}</li>
      {/each}
    </ul>
  </div>

  <footer>
    <p>
      Arabic Pronominal Composition - Analysis of Direct and
      Indirect Object Pronouns with Transitive Verbs
    </p>
    <p>
      Morphological Elements: <span class="prefix"
        >Prefixes</span
      >
      | <span class="suffix">Suffixes</span> |
      <span class="verb-root">Verb Roots</span>
      | <span class="pronoun">Pronouns</span>
    </p>
    <p>
      Syntactic Functions: <span class="direct-obj"
        >Direct Objects</span
      >
      | <span class="indirect-obj">Indirect Objects</span>
    </p>
  </footer>
</div>

<style>
  :root {
    --prefix: #3498db;
    --suffix: #e74c3c;
    --verb-root: #2ecc71;
    --pronoun: #9b59b6;
    --direct-obj: #f39c12;
    --indirect-obj: #1abc9c;
    --background: #f8f9fa;
    --card-bg: #ffffff;
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --table-header: #34495e;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: var(--background);
    color: var(--text-primary);
    line-height: 1.6;
    padding: 20px;
    background-image: linear-gradient(
      135deg,
      #f5f7fa 0%,
      #e4edf5 100%
    );
  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    background-color: var(--card-bg);
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    padding: 40px;
    border: 1px solid rgba(52, 152, 219, 0.1);
    margin-top: 4rem;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 25px;
    border-bottom: 2px solid rgba(52, 152, 219, 0.2);
  }

  h1 {
    color: var(--text-primary);
    margin-bottom: 15px;
    font-size: 2.8rem;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.2rem;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .legend-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 25px;
    margin-bottom: 50px;
  }

  .legend-box {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    border: 1px solid #eaeaea;
    transition: transform 0.3s ease;
  }

  .legend-box:hover {
    transform: translateY(-5px);
  }

  .legend-title {
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-primary);
    padding-bottom: 10px;
    border-bottom: 3px solid;
    font-size: 1.3rem;
  }

  .morphology-title {
    border-bottom-color: var(--prefix);
  }

  .pronoun-title {
    border-bottom-color: var(--pronoun);
  }

  .legend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .legend-color {
    width: 22px;
    height: 22px;
    border-radius: 5px;
    margin-right: 12px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .prefix-color {
    background-color: var(--prefix);
  }
  .suffix-color {
    background-color: var(--suffix);
  }
  .verb-root-color {
    background-color: var(--verb-root);
  }
  .pronoun-color {
    background-color: var(--pronoun);
  }
  .direct-obj-color {
    background-color: var(--direct-obj);
  }
  .indirect-obj-color {
    background-color: var(--indirect-obj);
  }

  .pronoun-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 15px;
  }

  .pronoun-item {
    text-align: center;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 6px;
    font-weight: 600;
  }

  .section-title {
    color: var(--text-primary);
    margin: 50px 0 30px 0;
    padding-bottom: 15px;
    border-bottom: 3px solid #3498db;
    font-size: 2rem;
    position: relative;
  }

  .section-title:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100px;
    height: 3px;
    background: #e74c3c;
  }

  .rules-section {
    background: linear-gradient(135deg, #f8f9fa, #e8f4fc);
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 40px;
    border-left: 5px solid #3498db;
  }

  .rule-item {
    margin-bottom: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  }

  .rule-title {
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .rule-number {
    background: #3498db;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-weight: bold;
  }

  .examples-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(500px, 1fr)
    );
    gap: 30px;
    margin-top: 30px;
  }

  .example-card {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-top: 5px solid #3498db;
    transition: all 0.3s ease;
  }

  .example-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }

  .example-number {
    display: inline-block;
    background: #3498db;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    text-align: center;
    line-height: 36px;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }

  .example-arabic {
    font-size: 2rem;
    direction: rtl;
    text-align: right;
    margin-bottom: 25px;
    line-height: 2.2;
    padding: 25px;
    background: linear-gradient(135deg, #f8f9fa, #f0f7ff);
    border-radius: 10px;
    border: 2px solid rgba(52, 152, 219, 0.1);
  }

  .example-translation {
    color: var(--text-primary);
    font-size: 1.2rem;
    padding: 20px 0;
    border-top: 1px dashed #ddd;
    margin-top: 20px;
    font-weight: 600;
  }

  .analysis-container {
    margin-top: 25px;
    padding: 25px;
    background: linear-gradient(135deg, #f8f9fa, #f0f7ff);
    border-radius: 10px;
    border: 1px solid rgba(52, 152, 219, 0.1);
  }

  .analysis-title {
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    font-size: 1.3rem;
  }

  .analysis-title i {
    margin-right: 15px;
    font-size: 1.4rem;
    color: #3498db;
  }

  .analysis-detail {
    margin-bottom: 15px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid;
  }

  .direct-analysis {
    border-left-color: var(--direct-obj);
  }

  .indirect-analysis {
    border-left-color: var(--indirect-obj);
  }

  .structure-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: white;
    border-radius: 10px;
    margin-top: 20px;
    border: 2px dashed #3498db;
  }

  .structure-visual {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    padding: 15px;
  }

  .paradigm-table {
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    overflow: hidden;
  }

  .paradigm-table th {
    background-color: var(--table-header);
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .paradigm-table td {
    padding: 18px 15px;
    border-bottom: 1px solid #eaeaea;
    text-align: center;
  }

  .paradigm-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .paradigm-table tr:hover {
    background-color: #f0f7ff;
  }

  .paradigm-arabic {
    font-size: 1.6rem;
    direction: rtl;
  }

  .paradigm-translation {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-top: 5px;
  }

  .notes {
    background: linear-gradient(135deg, #e8f4fc, #d4e7f7);
    padding: 35px;
    border-radius: 12px;
    margin-top: 50px;
    border: 1px solid rgba(52, 152, 219, 0.2);
  }

  .notes h3 {
    color: #2c5a7a;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
    font-size: 1.8rem;
  }

  .notes ul {
    padding-left: 25px;
  }

  .notes li {
    margin-bottom: 15px;
    line-height: 1.6;
    padding-left: 10px;
  }

  .highlight {
    background: rgba(52, 152, 219, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    color: #2c3e50;
  }

  footer {
    text-align: center;
    margin-top: 50px;
    padding-top: 30px;
    border-top: 2px solid rgba(52, 152, 219, 0.2);
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .prefix {
    color: var(--prefix);
    font-weight: bold;
  }
  .suffix {
    color: var(--suffix);
    font-weight: bold;
  }
  .verb-root {
    color: var(--verb-root);
    font-weight: bold;
  }
  .pronoun {
    color: var(--pronoun);
    font-weight: bold;
  }
  .direct-obj {
    color: var(--direct-obj);
    font-weight: bold;
  }
  .indirect-obj {
    color: var(--indirect-obj);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }

    .examples-container {
      grid-template-columns: 1fr;
    }

    .example-arabic {
      font-size: 1.6rem;
    }

    .legend-grid,
    .pronoun-grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 2.2rem;
    }

    .paradigm-table {
      display: block;
      overflow-x: auto;
    }
  }
</style>
