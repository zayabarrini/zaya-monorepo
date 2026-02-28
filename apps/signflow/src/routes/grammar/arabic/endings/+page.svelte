<svelte:head>
  <title>Arabic Grammatical Endings - Visual Guide</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <!-- FIXED: Added Arabic subset and specific font for diacritics -->
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Satisfy&display=swap&subset=arabic"
    rel="stylesheet"
  />
  <script>
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        const demoButtons =
          document.querySelectorAll(".demo-btn");
        const demoOutput =
          document.getElementById("demoOutput");
        const dynamicWord =
          document.getElementById("dynamicWord");
        const demoTranslation = document.getElementById(
          "demoTranslation"
        );

        const examples = {
          nominative: {
            word: "الطَّالِبُ",
            colorClass: "nominative-bg",
            sentence: "جاء الطَّالِبُ إلى الجامعة",
            translation:
              "The student came to the university"
          },
          accusative: {
            word: "الطَّالِبَ",
            colorClass: "accusative-bg",
            sentence: "رأيت الطَّالِبَ في الجامعة",
            translation:
              "I saw the student in the university"
          },
          genitive: {
            word: "الطَّالِبِ",
            colorClass: "genitive-bg",
            sentence: "سلمت على الطَّالِبِ في الجامعة",
            translation:
              "I greeted the student in the university"
          }
        };

        demoButtons.forEach((button) => {
          button.addEventListener("click", function () {
            // Update active button
            demoButtons.forEach((btn) =>
              btn.classList.remove("active")
            );
            this.classList.add("active");

            // Get selected case
            const caseType = this.dataset.case;
            const example = examples[caseType];

            // Update display
            dynamicWord.textContent = example.word;
            dynamicWord.className =
              "highlight " + example.colorClass;

            // Update whole sentence
            demoOutput.innerHTML = `<span class="arabic-text">${example.sentence}</span>`;
            demoTranslation.textContent =
              example.translation;
          });
        });
      }
    );
  </script>
</svelte:head>

<div class="container mainpage">
  <h1 class="subtitle">
    Understanding Case Endings (إعراب) Through Color-Coded
    Examples
  </h1>

  <div class="legend">
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--nominative);"
      ></div>
      <span>Nominative (ـُ / رَفْع)</span>
    </div>
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--accusative);"
      ></div>
      <span>Accusative (ـَ / نَصْب)</span>
    </div>
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--genitive);"
      ></div>
      <span>Genitive (ـِ / جَرّ)</span>
    </div>
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--indicative);"
      ></div>
      <span>Indicative Mood (ـُ)</span>
    </div>
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--subjunctive);"
      ></div>
      <span>Subjunctive Mood (ـَ)</span>
    </div>
    <div class="legend-item">
      <div
        class="color-box"
        style="background-color: var(--jussive);"
      ></div>
      <span>Jussive Mood (ـْ)</span>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">
      Noun Cases - Same Word, Different Positions
    </h2>
    <div class="example-grid">
      <div class="example-card">
        <div class="arabic-text">
          جَاءَ <span class="highlight nominative-bg"
            >الرَّجُلُ</span
          > إِلَى الْحَدِيقَةِ
        </div>
        <div class="translation">
          The man came to the garden
        </div>
        <div class="grammar-note">
          <strong>Nominative (ـُ):</strong> Subject of the
          verb جَاءَ<br />
          Position: Doer of the action
        </div>
      </div>

      <div class="example-card">
        <div class="arabic-text">
          رَأَيْتُ <span class="highlight accusative-bg"
            >الرَّجُلَ</span
          > فِي الْحَدِيقَةِ
        </div>
        <div class="translation">
          I saw the man in the garden
        </div>
        <div class="grammar-note">
          <strong>Accusative (ـَ):</strong> Object of the
          verb رَأَيْتُ<br />
          Position: Receiver of the action
        </div>
      </div>

      <div class="example-card">
        <div class="arabic-text">
          سَلَّمْتُ عَلَى <span
            class="highlight genitive-bg">الرَّجُلِ</span
          > فِي الْحَدِيقَةِ
        </div>
        <div class="translation">
          I greeted the man in the garden
        </div>
        <div class="grammar-note">
          <strong>Genitive (ـِ):</strong> After preposition
          عَلَى<br />
          Rule: Prepositions force genitive case
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">
      Effect of Particles on Case
    </h2>
    <div class="example-grid">
      <div class="example-card">
        <div class="arabic-text">
          <span class="highlight nominative-bg"
            >الوَلَدُ</span
          > ذَكِيٌّ
        </div>
        <div class="translation">The boy is smart</div>
        <div class="grammar-note">
          Normal subject case (مبتدأ) → Nominative
        </div>
      </div>

      <div class="example-card">
        <div class="arabic-text">
          إِنَّ <span class="highlight accusative-bg"
            >الوَلَدَ</span
          > ذَكِيٌّ
        </div>
        <div class="translation">
          Verily the boy is smart
        </div>
        <div class="grammar-note">
          <strong>Rule:</strong> إِنَّ makes its subject accusative
        </div>
      </div>
    </div>

    <div class="grammar-note" style="margin-top: 20px;">
      <strong>Key Particles that Affect Case:</strong>
      <ul class="rule-list">
        <li>
          <strong>إِنَّ / أَنَّ / كَأَنَّ / لَكِنَّ</strong> →
          Make subject accusative
        </li>
        <li>
          <strong>كَانَ / أَصْبَحَ / ظَلَّ</strong> → Make predicate
          nominative
        </li>
        <li>
          <strong>لَيْسَ</strong> → Makes predicate accusative
        </li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Verb Mood Endings</h2>
    <div class="example-grid">
      <div class="example-card">
        <div class="arabic-text">
          هُوَ <span class="highlight indicative-bg"
            >يَكْتُبُ</span
          > الرِّسَالَةَ الْيَوْمَ
        </div>
        <div class="translation">
          He is writing the letter today
        </div>
        <div class="grammar-note">
          <strong>Indicative (ـُ):</strong> Default mood for statements
        </div>
      </div>

      <div class="example-card">
        <div class="arabic-text">
          يُرِيدُ أَنْ <span
            class="highlight subjunctive-bg">يَكْتُبَ</span
          > الرِّسَالَةَ
        </div>
        <div class="translation">
          He wants to write the letter
        </div>
        <div class="grammar-note">
          <strong>Subjunctive (ـَ):</strong> After أَنْ / لِـ
          / كَيْ
        </div>
      </div>

      <div class="example-card">
        <div class="arabic-text">
          لَمْ <span class="highlight jussive-bg"
            >يَكْتُبْ</span
          > الرِّسَالَةَ أَمْسِ
        </div>
        <div class="translation">
          He did not write the letter yesterday
        </div>
        <div class="grammar-note">
          <strong>Jussive (ـْ):</strong> After لَمْ / لَمَّا /
          لا الناهية
        </div>
      </div>
    </div>
  </div>

  <div class="interactive-demo">
    <h3 class="demo-title">
      Interactive Demo: Watch the Ending Change
    </h3>

    <div class="demo-controls">
      <button class="demo-btn active" data-case="nominative"
        >Subject (Nominative)</button
      >
      <button class="demo-btn" data-case="accusative"
        >Object (Accusative)</button
      >
      <button class="demo-btn" data-case="genitive"
        >After Preposition (Genitive)</button
      >
    </div>

    <div class="demo-output" id="demoOutput">
      <span class="arabic-text">
        جاء <span
          id="dynamicWord"
          class="highlight nominative-bg">الطَّالِبُ</span
        > إلى الجامعة
      </span>
    </div>

    <div
      class="translation"
      id="demoTranslation"
      style="color: white; border-color: rgba(255,255,255,0.3);"
    >
      The student came to the university
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Quick Reference Rules</h2>
    <div class="grammar-note">
      <strong>Noun Endings Depend On:</strong>
      <ul class="rule-list">
        <li>
          <strong>Subject → Nominative (ـُ)</strong>
        </li>
        <li><strong>Object → Accusative (ـَ)</strong></li>
        <li>
          <strong>After preposition → Genitive (ـِ)</strong>
        </li>
        <li>
          <strong
            >After إضافة (possession) → Genitive (ـِ)</strong
          >
        </li>
        <li>
          <strong>Adjectives match their noun's case</strong
          >
        </li>
      </ul>

      <strong>Verb Endings Depend On:</strong>
      <ul class="rule-list">
        <li>
          <strong>Normal statement → Indicative (ـُ)</strong
          >
        </li>
        <li>
          <strong
            >After أَنْ / لِ / كَيْ → Subjunctive (ـَ)</strong
          >
        </li>
        <li>
          <strong
            >After لَمْ / لَمَّا / لا الناهية → Jussive (ـْ)</strong
          >
        </li>
      </ul>
    </div>
  </div>

  <footer>
    <p>
      Arabic Grammar Visual Guide • Case endings follow
      grammatical rules, not randomness
    </p>
    <p>
      Tip: Focus on learning the rules, not memorizing each
      word's ending individually
    </p>
  </footer>
</div>

<style>
  /* Add this at the top of your styles */
  :global(.grammar-note) :global(strong) {
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif !important;
    font-feature-settings:
      "calt" 1,
      "liga" 1 !important;
  }

  /* Or even better, apply to all text that might contain Arabic */
  :global(*) {
    font-variant-ligatures: common-ligatures;
    text-rendering: optimizeLegibility;
  }

  /* Fix for legend Arabic text */
  :global(.legend-item span) {
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif !important;
    font-feature-settings:
      "calt" 1,
      "liga" 1 !important;
  }

  /* Or if you want to be more specific for just the diacritics in the legend */
  :global(.legend-item span) {
    font-family: inherit;
  }

  :global(.legend-item span) :global(.arabic-inline) {
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif !important;
    font-feature-settings:
      "calt" 1,
      "liga" 1 !important;
  }

  :root {
    --nominative: #4caf50;
    --accusative: #2196f3;
    --genitive: #ff9800;
    --indicative: #9c27b0;
    --subjunctive: #e91e63;
    --jussive: #795548;
    --bg: #f8f9fa;
    --card-bg: #ffffff;
    --text: #2c3e50;
    --border: #e0e0e0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    margin-top: 6rem;
    text-align: center;
  }

  .subtitle {
    color: #7f8c8d;
    font-size: 1.1em;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin: 30px 0;
    padding: 20px;
    background: var(--card-bg);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 20px;
    background: white;
    border: 1px solid var(--border);
  }

  .color-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .section {
    background: var(--card-bg);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: #2c3e50;
    border-left: 4px solid #3498db;
    padding-left: 15px;
  }

  .example-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 20px;
    margin-top: 20px;
  }

  .example-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid var(--border);
    transition: transform 0.2s;
  }

  .example-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  /* FIXED: Proper Arabic font for diacritics */
  .arabic-text {
    font-size: 1.8em;
    text-align: center;
    direction: rtl;
    margin-bottom: 15px;
    line-height: 1.8;
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif;
    /* Ensure diacritics render properly */
    font-feature-settings:
      "calt" 1,
      "liga" 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* FIXED: Ensure highlighted text uses same font */
  .highlight {
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif;
  }

  .translation {
    color: #7f8c8d;
    font-style: italic;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }

  .grammar-note {
    background: #f8f9fa;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.9em;
    border-left: 3px solid #3498db;
  }

  .nominative-bg {
    background-color: var(--nominative);
    color: white;
  }
  .accusative-bg {
    background-color: var(--accusative);
    color: white;
  }
  .genitive-bg {
    background-color: var(--genitive);
    color: white;
  }
  .indicative-bg {
    background-color: var(--indicative);
    color: white;
  }
  .subjunctive-bg {
    background-color: var(--subjunctive);
    color: white;
  }
  .jussive-bg {
    background-color: var(--jussive);
    color: white;
  }

  .rule-list {
    list-style: none;
    padding-left: 20px;
  }

  .rule-list li {
    margin-bottom: 10px;
    padding-left: 25px;
    position: relative;
  }

  .rule-list li:before {
    content: "→";
    position: absolute;
    left: 0;
    color: #3498db;
  }

  .interactive-demo {
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    color: white;
    padding: 30px;
    border-radius: 10px;
    margin-top: 40px;
  }

  .demo-title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.4em;
  }

  .demo-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .demo-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: bold;
  }

  .demo-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .demo-btn.active {
    background: white;
    color: #667eea;
  }

  .demo-output {
    background: rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 8px;
    text-align: center;
    font-size: 1.5em;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif;
    direction: rtl;
    font-feature-settings:
      "calt" 1,
      "liga" 1;
  }

  footer {
    text-align: center;
    margin-top: 50px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    color: #7f8c8d;
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .example-grid {
      grid-template-columns: 1fr;
    }

    .arabic-text {
      font-size: 1.5em;
    }
  }
</style>
