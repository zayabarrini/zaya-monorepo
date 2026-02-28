<svelte:head>
  <title>Japanese Verb Morphology</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>
<div class="container mainpage">
  <div class="subtitle">
    Color-Coded Syntax for Prefixes, Suffixes, Verb Roots,
    and Pronouns
  </div>

  <section class="legend">
    <h2>Color Coding Legend</h2>
    <div class="color-items">
      <div class="color-item">
        <div class="color-box prefix-color"></div>
        <div class="color-label">
          <strong>Prefixes</strong><br />
          (Politeness, negation, potential)
        </div>
      </div>
      <div class="color-item">
        <div class="color-box suffix-color"></div>
        <div class="color-label">
          <strong>Suffixes</strong><br />
          (Tense, aspect, mood)
        </div>
      </div>
      <div class="color-item">
        <div class="color-box root-color"></div>
        <div class="color-label">
          <strong>Verb Roots</strong><br />
          (Base verb form)
        </div>
      </div>
      <div class="color-item">
        <div class="color-box pronoun-color"></div>
        <div class="color-label">
          <strong>Pronouns</strong><br />
          (Object pronouns in composition)
        </div>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Transitive Verb Examples</h2>

    <div class="verb-display">
      <h3>Verb: 見せる (みせる - to show)</h3>
      <div class="verb-components">
        <div class="component prefix">お</div>
        <div class="component root">見せ</div>
        <div class="component suffix">し</div>
        <div class="component pronoun">いただき</div>
        <div class="component suffix">ます</div>
      </div>
      <div class="explanation">
        <strong>お見せしいただきます</strong> - "I will
        humbly show (it to someone)"<br />
        Breakdown: <span class="prefix">お</span> (honorific
        prefix) + <span class="root">見せ</span> (verb root
        "show") + <span class="suffix">し</span> (causative
        suffix) + <span class="pronoun">いただき</span>
        (humble receiving pronoun) +
        <span class="suffix">ます</span> (polite suffix)
      </div>
    </div>

    <div class="verb-display">
      <h3>Verb: 渡す (わたす - to hand over)</h3>
      <div class="verb-components">
        <div class="component prefix">お</div>
        <div class="component root">渡し</div>
        <div class="component suffix">し</div>
        <div class="component pronoun">て</div>
        <div class="component suffix">いただけませんか</div>
      </div>
      <div class="explanation">
        <strong>お渡ししていただけませんか</strong> - "Could
        you please hand (it) over?"<br />
        Breakdown: <span class="prefix">お</span> (honorific
        prefix) + <span class="root">渡し</span> (verb root
        "hand over") + <span class="suffix">し</span>
        (causative suffix) + <span class="pronoun">て</span>
        (connecting pronoun) +
        <span class="suffix">いただけませんか</span> (polite request
        suffix)
      </div>
    </div>
  </section>

  <section class="verb-info">
    <div class="verb-card">
      <h3>Transitive Direct Verbs</h3>
      <span class="transitivity direct">Direct Object</span>
      <p>
        These verbs act directly on an object without an
        intermediary.
      </p>
      <div class="verb-example">
        <div class="verb-components">
          <div class="component root">食べ</div>
          <div class="component suffix">ます</div>
        </div>
        <p>
          <strong>食べます</strong> - "to eat (something)"
        </p>
      </div>
      <div class="verb-example">
        <div class="verb-components">
          <div class="component root">読</div>
          <div class="component suffix">みます</div>
        </div>
        <p>
          <strong>読みます</strong> - "to read (something)"
        </p>
      </div>
    </div>

    <div class="verb-card">
      <h3>Transitive Indirect Verbs</h3>
      <span class="transitivity indirect"
        >Indirect Object</span
      >
      <p>
        These verbs involve an intermediary or recipient of
        the action.
      </p>
      <div class="verb-example">
        <div class="verb-components">
          <div class="component prefix">お</div>
          <div class="component root">話し</div>
          <div class="component suffix">します</div>
        </div>
        <p>
          <strong>お話しします</strong> - "to talk (to someone)"
        </p>
      </div>
      <div class="verb-example">
        <div class="verb-components">
          <div class="component root">教え</div>
          <div class="component pronoun">て</div>
          <div class="component suffix">あげます</div>
        </div>
        <p>
          <strong>教えてあげます</strong> - "to teach (to someone)"
        </p>
      </div>
    </div>
  </section>

  <section class="example-section">
    <h2>Pronominal Composition Examples</h2>

    <div class="verb-display">
      <h3>Verb: 送る (おくる - to send)</h3>
      <div class="verb-components">
        <div class="component root">送</div>
        <div class="component pronoun">って</div>
        <div class="component pronoun">いただき</div>
        <div class="component suffix">たい</div>
      </div>
      <div class="explanation">
        <strong>送っていただきたい</strong> - "I would like
        to receive (you) sending (it)"<br />
        Breakdown: <span class="root">送</span> (verb root
        "send") + <span class="pronoun">って</span>
        (connective pronoun) +
        <span class="pronoun">いただき</span>
        (receiving pronoun) +
        <span class="suffix">たい</span> (desire suffix)
      </div>
    </div>

    <div class="verb-display">
      <h3>Verb: 伝える (つたえる - to convey)</h3>
      <div class="verb-components">
        <div class="component prefix">お</div>
        <div class="component root">伝え</div>
        <div class="component suffix">し</div>
        <div class="component pronoun">て</div>
        <div class="component suffix">ください</div>
      </div>
      <div class="explanation">
        <strong>お伝えしてください</strong> - "Please convey
        (it to someone)"<br />
        Breakdown: <span class="prefix">お</span> (honorific
        prefix) + <span class="root">伝え</span> (verb root
        "convey") + <span class="suffix">し</span>
        (causative suffix) + <span class="pronoun">て</span>
        (connecting pronoun) +
        <span class="suffix">ください</span> (polite request suffix)
      </div>
    </div>
  </section>

  <div class="note">
    <h3>Note on Japanese Pronominal Composition</h3>
    <p>
      In Japanese, unstressed object pronouns are typically
      incorporated into verb morphology through specific
      grammatical constructions rather than as separate
      words. These include:
    </p>
    <ul>
      <li>
        <strong>て-form + くれる/あげる/もらう</strong> - indicating
        giving/receiving actions
      </li>
      <li>
        <strong>Causative-passive forms</strong> - indicating
        actions done for/by someone
      </li>
      <li>
        <strong>Honorific/humble forms</strong> - indicating social
        relationships
      </li>
    </ul>
    <p>
      The color-coded pronouns in the examples above
      represent these incorporated pronominal elements in
      verb conjugations.
    </p>
  </div>

  <footer>
    <p>
      Japanese Verb Morphology Visualization | Created for
      educational purposes
    </p>
    <p>
      Note: This visualization simplifies complex
      grammatical structures for learning purposes.
    </p>
  </footer>
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .container {
    max-width: 1400px;
    margin-top: 6rem;
    background-color: var(--card-bg);
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    padding: 40px;
    border: 1px solid rgba(52, 152, 219, 0.15);
    text-align: center;
  }

  .subtitle {
    color: #7f8c8d;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .legend {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .legend h2 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  .color-items {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
    gap: 15px;
  }

  .color-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .color-box {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    margin-right: 15px;
    border: 1px solid #ddd;
  }

  .prefix-color {
    background-color: #3498db; /* Blue for prefixes */
  }

  .suffix-color {
    background-color: #e74c3c; /* Red for suffixes */
  }

  .root-color {
    background-color: #2ecc71; /* Green for verb roots */
  }

  .pronoun-color {
    background-color: #f39c12; /* Orange for pronouns */
  }

  .example-section {
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .example-section h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .verb-display {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border-left: 4px solid #3498db;
  }

  .verb-components {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: white;
    border-radius: 6px;
  }

  .component {
    padding: 8px 15px;
    margin: 5px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .prefix {
    background-color: #3498db;
    color: white;
  }

  .suffix {
    background-color: #e74c3c;
    color: white;
  }

  .root {
    background-color: #2ecc71;
    color: white;
  }

  .pronoun {
    background-color: #f39c12;
    color: white;
  }

  .connector {
    font-size: 1.5rem;
    margin: 0 10px;
    color: #7f8c8d;
  }

  .explanation {
    padding: 15px;
    background-color: #f0f7ff;
    border-radius: 6px;
    margin-top: 10px;
    border-left: 3px solid #3498db;
  }

  .verb-info {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(300px, 1fr)
    );
    gap: 20px;
    margin-top: 30px;
  }

  .verb-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-top: 4px solid #2ecc71;
  }

  .verb-card h3 {
    color: #2c3e50;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }

  .transitivity {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .direct {
    background-color: #e8f6f3;
    color: #1abc9c;
  }

  .indirect {
    background-color: #fef9e7;
    color: #f39c12;
  }

  .note {
    background-color: #fff9e6;
    border-left: 4px solid #f39c12;
    padding: 15px;
    margin-top: 30px;
    border-radius: 4px;
  }

  .note h3 {
    color: #d35400;
    margin-bottom: 10px;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eaeaea;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .color-items {
      grid-template-columns: 1fr;
    }

    .verb-info {
      grid-template-columns: 1fr;
    }

    .verb-components {
      justify-content: center;
    }
  }
</style>
