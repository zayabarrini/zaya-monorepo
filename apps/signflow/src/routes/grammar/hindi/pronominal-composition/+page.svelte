<svelte:head>
  <title
    >Hindi Transitive Verbs with Pronominal Composition</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>
<div class="container mainpage">
  <div class="color-legend">
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--prefix);"
      ></div>
      <span>Verb Prefix (नहीं, न)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--verb-root);"
      ></div>
      <span>Verb Root</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--suffix);"
      ></div>
      <span>Verb Suffix/Ending</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--pronoun);"
      ></div>
      <span>Pronoun (Subject/Object)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--direct-obj);"
      ></div>
      <span>Direct Object Marker (को)</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--indirect-obj);"
      ></div>
      <span>Indirect Object Marker</span>
    </div>
    <div class="color-item">
      <div
        class="color-box"
        style="background-color: var(--particle);"
      ></div>
      <span>Other Particles</span>
    </div>
  </div>

  <div class="card">
    <h2 class="section-title">
      Hindi Pronominal Composition: Key Concepts
    </h2>
    <p>
      In Hindi, unstressed object pronouns can be attached
      to verbs or appear before them. This is called
      "pronominal composition." For transitive verbs, the
      structure varies based on whether the verb has:
    </p>

    <div class="note-box">
      <div class="note-title">
        Rule of Pronoun Placement:
      </div>
      <p>
        Unstressed object pronouns typically appear <strong
          >between any negation prefix and the verb root</strong
        >, or
        <strong
          >as suffixes to the infinitive/verb stem</strong
        > in certain constructions.
      </p>
    </div>

    <div class="two-col">
      <div>
        <h3 class="example-title">
          Direct Transitive Verbs
        </h3>
        <p>
          Verbs that take a direct object (without the <span
            class="direct-obj">को</span
          > marker for specific/definite objects):
        </p>
        <div class="example-container">
          <div class="hindi-text">
            <span class="pronoun">मैं</span>
            <span class="verb-root">किताब</span>
            <span class="verb-root">पढ़</span><span
              class="suffix">ता हूँ</span
            >।
          </div>
          <div class="translation">I read a book.</div>
          <div class="gloss">
            Subject + Direct Object + Verb (no को marker for
            indefinite object)
          </div>
        </div>
      </div>

      <div>
        <h3 class="example-title">
          Indirect Transitive Verbs
        </h3>
        <p>
          Verbs that take an indirect object (often with <span
            class="indirect-obj">को</span
          > marker):
        </p>
        <div class="example-container">
          <div class="hindi-text">
            <span class="pronoun">मैं</span>
            <span class="pronoun">उस</span><span
              class="indirect-obj">को</span
            > <span class="verb-root">किताब</span>
            <span class="verb-root">दे</span><span
              class="suffix">ता हूँ</span
            >।
          </div>
          <div class="translation">
            I give him/her a book.
          </div>
          <div class="gloss">
            Subject + Indirect Object (को) + Direct Object +
            Verb
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2 class="section-title">
      Pronominal Composition with Transitive Verbs
    </h2>
    <p>
      The table below shows how unstressed object pronouns
      are incorporated into verb structures:
    </p>

    <table>
      <thead>
        <tr>
          <th>Construction Type</th>
          <th>Hindi Sentence</th>
          <th>Pronoun Placement</th>
          <th>Translation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Direct Object Pronoun</strong></td>
          <td class="hindi-text">
            <span class="pronoun">वह</span>
            <span class="prefix">मुझ</span><span
              class="verb-root"
            >
              देख</span
            ><span class="suffix">ता है</span>।
          </td>
          <td>Pronoun before verb</td>
          <td>He sees me.</td>
        </tr>
        <tr>
          <td><strong>With Negation</strong></td>
          <td class="hindi-text">
            <span class="pronoun">वह</span>
            <span class="prefix">मुझ</span><span
              class="prefix">े</span
            > <span class="prefix">नहीं</span>
            <span class="verb-root">देख</span><span
              class="suffix">ता</span
            >।
          </td>
          <td>Pronoun between subject & negation</td>
          <td>He does not see me.</td>
        </tr>
        <tr>
          <td><strong>Indirect Object Pronoun</strong></td>
          <td class="hindi-text">
            <span class="pronoun">मैं</span>
            <span class="prefix">उस</span><span
              class="indirect-obj">े</span
            > <span class="verb-root">किताब</span>
            <span class="verb-root">दे</span><span
              class="suffix">ता हूँ</span
            >।
          </td>
          <td>Pronoun + को (becomes ए) before verb</td>
          <td>I give him/her a book.</td>
        </tr>
        <tr>
          <td><strong>Both Objects</strong></td>
          <td class="hindi-text">
            <span class="pronoun">मैं</span>
            <span class="prefix">उस</span><span
              class="indirect-obj">े</span
            > <span class="prefix">वह</span>
            <span class="verb-root">दे</span><span
              class="suffix">ता हूँ</span
            >।
          </td>
          <td>Both pronouns before verb</td>
          <td>I give that to him/her.</td>
        </tr>
        <tr>
          <td
            ><strong>Compound Verb with Pronoun</strong></td
          >
          <td class="hindi-text">
            <span class="pronoun">तुम</span>
            <span class="prefix">मुझ</span><span
              class="verb-root">े</span
            > <span class="verb-root">दिखा</span>
            <span class="verb-root">सक</span><span
              class="suffix">ते हो</span
            >।
          </td>
          <td>Pronoun inserted before compound verb</td>
          <td>You can show me.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <h2 class="section-title">
      Detailed Examples: Pronoun-Verb Integration
    </h2>

    <div class="example-container">
      <div class="example-title">
        Example 1: देना (denā - to give) - Ditransitive Verb
      </div>
      <div class="hindi-text">
        <span class="pronoun">वह</span>
        <span class="prefix">मुझ</span><span
          class="indirect-obj">े</span
        >
        <span class="verb-root">पुस्तक</span>
        <span class="verb-root">दे</span><span
          class="suffix">ता है</span
        >।
      </div>
      <div class="translation">He gives me a book.</div>
      <div class="gloss">
        <span class="pronoun">वह</span> (He) +
        <span class="prefix">मुझ</span><span
          class="indirect-obj">े</span
        >
        (to me: मुझ + को = मुझे) +
        <span class="verb-root">पुस्तक</span> (book) +
        <span class="verb-root">दे</span><span
          class="suffix">ता है</span
        > (gives)
      </div>
    </div>

    <div class="example-container">
      <div class="example-title">
        Example 2: लाना (lānā - to bring) with Negation
      </div>
      <div class="hindi-text">
        <span class="pronoun">मैं</span>
        <span class="prefix">तुम</span><span
          class="direct-obj">्हें</span
        >
        <span class="prefix">नहीं</span>
        <span class="verb-root">ला</span>
        <span class="suffix">सकता</span>।
      </div>
      <div class="translation">I cannot bring you.</div>
      <div class="gloss">
        <span class="pronoun">मैं</span> (I) +
        <span class="prefix">तुम</span><span
          class="direct-obj">्हें</span
        >
        (you: तुम + को = तुम्हें) +
        <span class="prefix">नहीं</span> (not) +
        <span class="verb-root">ला</span>
        <span class="suffix">सकता</span> (can bring)
      </div>
    </div>

    <div class="example-container">
      <div class="example-title">
        Example 3: दिखाना (dikhānā - to show) with Both
        Objects
      </div>
      <div class="hindi-text">
        <span class="pronoun">वे</span>
        <span class="prefix">हम</span><span
          class="indirect-obj">ें</span
        >
        <span class="prefix">उस</span><span
          class="direct-obj">े</span
        >
        <span class="verb-root">दिखा</span><span
          class="suffix">ते हैं</span
        >।
      </div>
      <div class="translation">They show that to us.</div>
      <div class="gloss">
        <span class="pronoun">वे</span> (They) +
        <span class="prefix">हम</span><span
          class="indirect-obj">ें</span
        >
        (to us: हम + को = हमें) +
        <span class="prefix">उस</span><span
          class="direct-obj">े</span
        >
        (that: वह + को = उसे) +
        <span class="verb-root">दिखा</span><span
          class="suffix">ते हैं</span
        > (show)
      </div>
    </div>

    <div class="example-container">
      <div class="example-title">
        Example 4: बताना (batānā - to tell) in Past Tense
      </div>
      <div class="hindi-text">
        <span class="pronoun">उस</span><span
          class="direct-obj">ने</span
        >
        <span class="prefix">मुझ</span><span
          class="indirect-obj">े</span
        >
        <span class="verb-root">कहानी</span>
        <span class="verb-root">बता</span><span
          class="suffix">ई</span
        >।
      </div>
      <div class="translation">He told me a story.</div>
      <div class="gloss">
        <span class="pronoun">उस</span><span
          class="direct-obj">ने</span
        >
        (He: उस + ने = उसने) +
        <span class="prefix">मुझ</span><span
          class="indirect-obj">े</span
        >
        (to me) +
        <span class="verb-root">कहानी</span> (story) +
        <span class="verb-root">बता</span><span
          class="suffix">ई</span
        > (told)
      </div>
    </div>
  </div>

  <div class="card">
    <h2 class="section-title">
      Pronoun-Object Marker Combinations
    </h2>
    <p>
      When pronouns combine with object markers, they
      undergo sound changes:
    </p>

    <table>
      <thead>
        <tr>
          <th>Pronoun</th>
          <th>+ Direct Object (को)</th>
          <th>+ Ergative (ने)</th>
          <th>Example Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="pronoun">मैं (I)</td>
          <td class="hindi-text"
            ><span class="pronoun">मुझ</span><span
              class="direct-obj">े</span
            ></td
          >
          <td class="hindi-text"
            ><span class="pronoun">मैं</span><span
              class="particle">ने</span
            ></td
          >
          <td class="translation">to me / I (ergative)</td>
        </tr>
        <tr>
          <td class="pronoun">तू (you intimate)</td>
          <td class="hindi-text"
            ><span class="pronoun">तुझ</span><span
              class="direct-obj">े</span
            ></td
          >
          <td class="hindi-text"
            ><span class="pronoun">तू</span><span
              class="particle">ने</span
            ></td
          >
          <td class="translation"
            >to you / you (ergative)</td
          >
        </tr>
        <tr>
          <td class="pronoun">तुम (you informal)</td>
          <td class="hindi-text"
            ><span class="pronoun">तुम</span><span
              class="direct-obj">्हें</span
            ></td
          >
          <td class="hindi-text"
            ><span class="pronoun">तुम</span><span
              class="particle">ने</span
            ></td
          >
          <td class="translation"
            >to you / you (ergative)</td
          >
        </tr>
        <tr>
          <td class="pronoun">वह (he/she)</td>
          <td class="hindi-text"
            ><span class="pronoun">उस</span><span
              class="direct-obj">े</span
            ></td
          >
          <td class="hindi-text"
            ><span class="pronoun">उस</span><span
              class="particle">ने</span
            ></td
          >
          <td class="translation"
            >to him/her / he/she (ergative)</td
          >
        </tr>
        <tr>
          <td class="pronoun">हम (we)</td>
          <td class="hindi-text"
            ><span class="pronoun">हम</span><span
              class="direct-obj">ें</span
            ></td
          >
          <td class="hindi-text"
            ><span class="pronoun">हम</span><span
              class="particle">ने</span
            ></td
          >
          <td class="translation">to us / we (ergative)</td>
        </tr>
      </tbody>
    </table>

    <div class="note-box">
      <div class="note-title">Important Rule:</div>
      <p>
        In pronominal composition, <strong
          >unstressed object pronouns typically appear
          before the verb</strong
        >. When there are both direct and indirect object
        pronouns, the indirect object pronoun (recipient)
        usually comes before the direct object pronoun.
      </p>
      <p>
        Example: <span class="verb-highlight"
          >उसने मुझे वह दिया</span
        > (He gave that to me) follows the pattern: Subject +
        Indirect Object + Direct Object + Verb
      </p>
    </div>
  </div>

  <footer>
    <p>
      Hindi Transitive Verbs with Pronominal Composition |
      Color-coded syntax analysis
    </p>
    <p>
      Note: Pronominal composition in Hindi involves
      attaching object pronouns to verbs or placing them
      immediately before verbs, with specific rules for
      negation and compound verbs.
    </p>
  </footer>
</div>

<style>
  :root {
    --prefix: #d32f2f;
    --verb-root: #1976d2;
    --suffix: #388e3c;
    --pronoun: #7b1fa2;
    --direct-obj: #f57c00;
    --indirect-obj: #00796b;
    --particle: #5d4037;
    --bg-light: #f5f5f5;
    --bg-card: #ffffff;
    --text-primary: #212121;
    --text-secondary: #616161;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .container {
    margin-top: 6rem;
  }

  .color-legend {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(200px, 1fr)
    );
    gap: 15px;
    margin: 30px 0;
    padding: 20px;
    background-color: var(--bg-card);
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  }

  .color-item {
    display: flex;
    align-items: center;
    padding: 8px 0;
  }

  .color-box {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .card {
    background-color: var(--bg-card);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  }

  .section-title {
    color: var(--verb-root);
    font-size: 1.8rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--verb-root);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th {
    background-color: var(--verb-root);
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
  }

  tr:hover {
    background-color: rgba(25, 118, 210, 0.05);
  }

  .hindi-text {
    font-size: 1.6rem;
    direction: ltr;
    text-align: left;
    padding: 10px 0;
    line-height: 1.8;
  }

  .prefix {
    color: var(--prefix);
    font-weight: bold;
  }
  .verb-root {
    color: var(--verb-root);
    font-weight: bold;
  }
  .suffix {
    color: var(--suffix);
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
  .particle {
    color: var(--particle);
    font-weight: bold;
  }

  .example-container {
    margin: 25px 0;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border-left: 5px solid var(--indirect-obj);
  }

  .example-title {
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .translation {
    color: var(--text-secondary);
    font-style: italic;
    margin-top: 8px;
    padding-left: 10px;
    border-left: 2px solid #ddd;
  }

  .gloss {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-top: 5px;
    padding-left: 10px;
  }

  .note-box {
    background-color: #e3f2fd;
    border-radius: 8px;
    padding: 20px;
    margin: 25px 0;
    border-left: 5px solid var(--verb-root);
  }

  .note-title {
    font-weight: 600;
    color: var(--verb-root);
    margin-bottom: 10px;
  }

  .two-col {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(450px, 1fr)
    );
    gap: 30px;
  }

  @media (max-width: 768px) {
    .two-col {
      grid-template-columns: 1fr;
    }

    .hindi-text {
      font-size: 1.4rem;
    }

    h1 {
      font-size: 2rem;
    }
  }

  footer {
    text-align: center;
    padding: 30px 20px;
    margin-top: 40px;
    color: var(--text-secondary);
    border-top: 1px solid #ddd;
    font-size: 0.9rem;
  }

  .verb-highlight {
    background-color: rgba(25, 118, 210, 0.1);
    padding: 3px 6px;
    border-radius: 4px;
  }
</style>
