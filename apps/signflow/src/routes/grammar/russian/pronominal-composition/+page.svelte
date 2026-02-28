<svelte:head>
  <title
    >Russian Verb Morphology & Pronominal Composition</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>
<div class="container mainpage">
  <div class="intro">
    <p>
      This page demonstrates the complex structure of
      Russian verbs, focusing on <strong
        >transitive verbs</strong
      > (those that take direct objects) and how unstressed object
      pronouns are incorporated into the verb structure. We'll
      examine verb morphology and pronominal composition with
      color-coded examples.
    </p>
  </div>

  <h2>Color Coding Legend</h2>
  <div class="color-legend">
    <div class="color-item">
      <div class="color-box prefix"></div>
      <div>
        <strong>Prefix (приставка)</strong><br />
        Modifies verb meaning (aspect, direction, etc.)
      </div>
    </div>
    <div class="color-item">
      <div class="color-box root"></div>
      <div>
        <strong>Verb Root (корень)</strong><br />
        Core meaning of the verb
      </div>
    </div>
    <div class="color-item">
      <div class="color-box suffix"></div>
      <div>
        <strong>Suffix (суффикс)</strong><br />
        Indicates aspect, conjugation class
      </div>
    </div>
    <div class="color-item">
      <div class="color-box ending"></div>
      <div>
        <strong>Ending (окончание)</strong><br />
        Person, number, tense markers
      </div>
    </div>
    <div class="color-item">
      <div class="color-box pronoun-direct"></div>
      <div>
        <strong>Direct Object Pronoun</strong><br />
        Unstressed pronoun (меня, тебя, его...)
      </div>
    </div>
    <div class="color-item">
      <div class="color-box pronoun-indirect"></div>
      <div>
        <strong>Indirect Object Pronoun</strong><br />
        Unstressed pronoun (мне, тебе, ему...)
      </div>
    </div>
    <div class="color-item">
      <div class="color-box particle"></div>
      <div>
        <strong>Particle (частица)</strong><br />
        -ся/-сь (reflexive), -ка, -то, etc.
      </div>
    </div>
    <div class="color-item">
      <div class="color-box reflexive"></div>
      <div>
        <strong>Reflexive Pronoun</strong><br />
        себя (self) in different cases
      </div>
    </div>
  </div>

  <h2>Basic Verb Structure Analysis</h2>

  <div class="verb-analysis">
    <h3>Simple Transitive Verb</h3>
    <div class="verb-example">
      <span
        class="prefix"
        style="color: #4dabf7; font-weight: bold;">про</span
      ><span
        class="root"
        style="color: #40c057; font-weight: bold;">чит</span
      ><span
        class="suffix"
        style="color: #ff6b6b; font-weight: bold;">ыва</span
      ><span
        class="ending"
        style="color: #ff922b; font-weight: bold;">ю</span
      >
    </div>

    <div class="verb-breakdown">
      <div
        class="verb-part"
        style="background-color: #4dabf7; color: white;"
      >
        про-
      </div>
      <div
        class="verb-part"
        style="background-color: #40c057; color: white;"
      >
        чит
      </div>
      <div
        class="verb-part"
        style="background-color: #ff6b6b; color: white;"
      >
        -ыва-
      </div>
      <div
        class="verb-part"
        style="background-color: #ff922b; color: white;"
      >
        -ю
      </div>
    </div>

    <div class="explanation">
      <p>
        <strong>про-</strong> (prefix) - indicates "through" or
        completion
      </p>
      <p>
        <strong>чит</strong> (root) - from "читать" (to read)
      </p>
      <p>
        <strong>-ыва-</strong> (suffix) - imperfective aspect
        marker
      </p>
      <p>
        <strong>-ю</strong> (ending) - 1st person singular present
        tense
      </p>
    </div>

    <div class="translation">
      <strong>Translation:</strong> "I am reading through" / "I
      am reading completely"
    </div>
  </div>

  <h2>Pronominal Composition Rules</h2>

  <div class="pronoun-composition">
    <p>
      In Russian, unstressed object pronouns are placed <strong
        >after the verb prefix but before the verb root</strong
      > in certain constructions. This is called "pronominal composition"
      or "энклитика".
    </p>

    <div class="pronoun-rule">
      <h4>Rule 1: Direct Object Pronouns</h4>
      <p>
        Direct object pronouns (меня, тебя, его, её, нас,
        вас, их) are placed between the prefix and root when
        unstressed.
      </p>
    </div>

    <div class="pronoun-rule">
      <h4>Rule 2: Indirect Object Pronouns</h4>
      <p>
        Indirect object pronouns (мне, тебе, ему, ей, нам,
        вам, им) follow the same placement rule when
        unstressed.
      </p>
    </div>

    <div class="pronoun-rule">
      <h4>Rule 3: Multiple Pronouns</h4>
      <p>
        When both direct and indirect object pronouns are
        present, the indirect pronoun comes before the
        direct pronoun.
      </p>
    </div>

    <div class="pronoun-rule">
      <h4>Rule 4: Reflexive Pronouns</h4>
      <p>
        The reflexive pronoun "себя" (self) is placed after
        other object pronouns but before the verb root.
      </p>
    </div>
  </div>

  <h2>Examples with Pronominal Composition</h2>

  <div class="sentence-grid">
    <!-- Example 1 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;"
          >на</span
        ><span
          class="pronoun-direct"
          style="color: #9c36b5; font-weight: bold;"
          >меня</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >пис</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;"
          >ал</span
        >
      </div>
      <div class="sentence-en">
        He wrote to me (lit. "on me" - influenced me)
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">на-</span
        >) + Direct Object Pronoun (<span
          style="color: #9c36b5;">меня</span
        >) + Root (<span style="color: #40c057;">пис</span>)
        + Ending (<span style="color: #ff922b;">-ал</span>)
      </div>
    </div>

    <!-- Example 2 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;"
          >по</span
        ><span
          class="pronoun-indirect"
          style="color: #5c7cfa; font-weight: bold;"
          >тебе</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >скуч</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;"
          >аю</span
        >
      </div>
      <div class="sentence-en">
        I miss you (lit. "I am bored for you")
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">по-</span
        >) + Indirect Object Pronoun (<span
          style="color: #5c7cfa;">тебе</span
        >) + Root (<span style="color: #40c057;">скуч</span
        >) + Ending (<span style="color: #ff922b;">-аю</span
        >)
      </div>
    </div>

    <!-- Example 3 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;">в</span
        ><span
          class="pronoun-indirect"
          style="color: #5c7cfa; font-weight: bold;"
          >вам</span
        ><span
          class="pronoun-direct"
          style="color: #9c36b5; font-weight: bold;"
          >нас</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >ыла</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;"
          >ла</span
        >
      </div>
      <div class="sentence-en">
        She sent us to you (formal/plural)
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">в-</span
        >) + Indirect Pronoun (<span style="color: #5c7cfa;"
          >вам</span
        >) + Direct Pronoun (<span style="color: #9c36b5;"
          >нас</span
        >) + Root (<span style="color: #40c057;">сыла</span
        >) + Ending (<span style="color: #ff922b;">-ла</span
        >)
      </div>
    </div>
  </div>

  <div class="complex-verb">
    <div class="complex-title">
      Complex Transitive Verb with Multiple Elements
    </div>

    <div class="verb-chain">
      <div
        class="chain-part"
        style="background-color: #4dabf7; color: white;"
      >
        пере-
        <span class="chain-label">Prefix</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #5c7cfa; color: white;"
      >
        мне
        <span class="chain-label">Indirect Object</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #9c36b5; color: white;"
      >
        его
        <span class="chain-label">Direct Object</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #40c057; color: white;"
      >
        да
        <span class="chain-label">Root</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #ff6b6b; color: white;"
      >
        ва
        <span class="chain-label">Suffix</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #ff922b; color: white;"
      >
        л
        <span class="chain-label">Ending</span>
      </div>
      <div style="font-size: 1.5em; color: #495057;">+</div>
      <div
        class="chain-part"
        style="background-color: #15aabf; color: white;"
      >
        а
        <span class="chain-label">Gender</span>
      </div>
    </div>

    <div
      class="verb-example"
      style="font-size: 2em; margin: 25px 0;"
    >
      <span
        class="prefix"
        style="color: #4dabf7; font-weight: bold;"
        >пере</span
      ><span
        class="pronoun-indirect"
        style="color: #5c7cfa; font-weight: bold;">мне</span
      ><span
        class="pronoun-direct"
        style="color: #9c36b5; font-weight: bold;">его</span
      ><span
        class="root"
        style="color: #40c057; font-weight: bold;">да</span
      ><span
        class="suffix"
        style="color: #ff6b6b; font-weight: bold;">ва</span
      ><span
        class="ending"
        style="color: #ff922b; font-weight: bold;">л</span
      ><span
        class="reflexive"
        style="color: #15aabf; font-weight: bold;">а</span
      >
    </div>

    <div class="explanation">
      <p>
        <strong>пере-</strong> (prefix) - indicates transfer or
        repetition
      </p>
      <p>
        <strong>мне</strong> (indirect object pronoun) - to me
        (dative case)
      </p>
      <p>
        <strong>его</strong> (direct object pronoun) - him/it
        (accusative/genitive case)
      </p>
      <p>
        <strong>да</strong> (root) - from "дать" (to give)
      </p>
      <p>
        <strong>-ва-</strong> (suffix) - imperfective aspect marker
      </p>
      <p>
        <strong>-л</strong> (ending) - past tense marker
      </p>
      <p>
        <strong>-а</strong> (gender ending) - feminine singular
        past tense
      </p>
    </div>

    <div class="translation">
      <strong>Full Translation:</strong> "She was transferring/giving
      him to me repeatedly"
    </div>
  </div>

  <h2>More Examples with Different Verb Types</h2>

  <div class="sentence-grid">
    <!-- Example 4 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;"
          >вы</span
        ><span
          class="pronoun-direct"
          style="color: #9c36b5; font-weight: bold;"
          >его</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >гон</span
        ><span
          class="suffix"
          style="color: #ff6b6b; font-weight: bold;">я</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;"
          >ют</span
        >
      </div>
      <div class="sentence-en">
        They are chasing him out
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">вы-</span
        >) + Direct Object (<span style="color: #9c36b5;"
          >его</span
        >) + Root (<span style="color: #40c057;">гон</span>)
        + Suffix (<span style="color: #ff6b6b;">-я-</span>)
        + Ending (<span style="color: #ff922b;">-ют</span>)
      </div>
    </div>

    <!-- Example 5 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;"
          >под</span
        ><span
          class="pronoun-indirect"
          style="color: #5c7cfa; font-weight: bold;"
          >ему</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >бир</span
        ><span
          class="suffix"
          style="color: #ff6b6b; font-weight: bold;">а</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;">ю</span
        >
      </div>
      <div class="sentence-en">
        I am picking/selecting for him
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">под-</span
        >) + Indirect Object (<span style="color: #5c7cfa;"
          >ему</span
        >) + Root (<span style="color: #40c057;">бир</span>)
        + Suffix (<span style="color: #ff6b6b;">-а-</span>)
        + Ending (<span style="color: #ff922b;">-ю</span>)
      </div>
    </div>

    <!-- Example 6 -->
    <div class="sentence-card">
      <div class="sentence-ru">
        <span
          class="prefix"
          style="color: #4dabf7; font-weight: bold;"
          >за</span
        ><span
          class="pronoun-indirect"
          style="color: #5c7cfa; font-weight: bold;"
          >ней</span
        ><span
          class="root"
          style="color: #40c057; font-weight: bold;"
          >хаж</span
        ><span
          class="ending"
          style="color: #ff922b; font-weight: bold;"
          >ивал</span
        >
      </div>
      <div class="sentence-en">
        He used to court her (lit. "go after her")
      </div>
      <div class="analysis">
        <strong>Analysis:</strong> Prefix (<span
          style="color: #4dabf7;">за-</span
        >) + Indirect Object (<span style="color: #5c7cfa;"
          >ней</span
        >) + Root (<span style="color: #40c057;">хаж</span>)
        + Ending (<span style="color: #ff922b;">-ивал</span
        >)
      </div>
    </div>
  </div>

  <div class="verb-analysis">
    <h3>Verb with Reflexive and Particle</h3>
    <div class="verb-example">
      <span
        class="prefix"
        style="color: #4dabf7; font-weight: bold;">об</span
      ><span
        class="pronoun-indirect"
        style="color: #5c7cfa; font-weight: bold;"
        >себе</span
      ><span
        class="root"
        style="color: #40c057; font-weight: bold;"
        >заботь</span
      ><span
        class="ending"
        style="color: #ff922b; font-weight: bold;">ся</span
      ><span
        class="particle"
        style="color: #ffd43b; font-weight: bold;">-ка</span
      >
    </div>

    <div class="verb-breakdown">
      <div
        class="verb-part"
        style="background-color: #4dabf7; color: white;"
      >
        об-
      </div>
      <div
        class="verb-part"
        style="background-color: #15aabf; color: white;"
      >
        себе
      </div>
      <div
        class="verb-part"
        style="background-color: #40c057; color: white;"
      >
        забот
      </div>
      <div
        class="verb-part"
        style="background-color: #ff922b; color: white;"
      >
        -сь
      </div>
      <div
        class="verb-part"
        style="background-color: #ffd43b; color: #333;"
      >
        -ка
      </div>
    </div>

    <div class="explanation">
      <p>
        <strong>об-</strong> (prefix) - indicates "about" or reflexive
        action
      </p>
      <p>
        <strong>себе</strong> (reflexive pronoun) - about oneself
        (prepositional case)
      </p>
      <p>
        <strong>забот</strong> (root) - from "заботиться" (to
        take care)
      </p>
      <p>
        <strong>-сь</strong> (reflexive particle) - reduced form
        of -ся after vowels
      </p>
      <p>
        <strong>-ка</strong> (particle) - adds encouraging or
        softening tone
      </p>
    </div>

    <div class="translation">
      <strong>Translation:</strong> "Do take care of yourself!"
      (encouraging/friendly tone)
    </div>
  </div>

  <div class="note">
    <h3>Important Notes on Pronominal Composition</h3>
    <ol>
      <li>
        <strong>Stress matters:</strong> Only unstressed pronouns
        participate in this composition. Stressed pronouns remain
        separate words.
      </li>
      <li>
        <strong>Word order:</strong> The pronoun insertion happens
        in specific morphological contexts, not in all verb forms.
      </li>
      <li>
        <strong>Case agreement:</strong> The pronoun must be in
        the correct case (accusative for direct objects, dative
        for indirect objects).
      </li>
      <li>
        <strong>Reflexive priority:</strong> The reflexive pronoun
        "себя" always comes last in the pronoun sequence before
        the root.
      </li>
      <li>
        <strong>Imperative forms:</strong> In imperative mood,
        the pronoun typically comes after the verb: "дай мне"
        (give me), not "мне дай".
      </li>
    </ol>

    <div class="interactive-note">
      <p>
        <strong>Tip:</strong> Pronominal composition is more common
        in spoken Russian and informal writing. In formal contexts,
        pronouns are often placed separately.
      </p>
    </div>
  </div>

  <footer>
    <p>
      Russian Verb Morphology & Pronominal Composition •
      Color coding helps visualize complex verb structures
    </p>
    <p>
      Note: Some examples show literary/archaic forms for
      demonstration purposes
    </p>
  </footer>
</div>

<style>
  * {
    box-sizing: border-box;
    font-family:
      "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  .container {
    margin-top: 6rem;
  }

  h2 {
    color: #343a40;
    border-bottom: 2px solid #adb5bd;
    padding-bottom: 10px;
    margin-top: 40px;
    font-size: 1.8em;
  }

  h3 {
    color: #495057;
    margin-top: 30px;
    padding-left: 10px;
    border-left: 4px solid #ff6b6b;
  }

  .intro {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    margin-bottom: 30px;
    border-left: 6px solid #4dabf7;
  }

  .color-legend {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
    gap: 15px;
    margin: 25px 0;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  .color-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #f8f9fa;
    transition: transform 0.2s;
  }

  .color-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .color-box {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
  }

  /* .prefix {
    background-color: #4dabf7;
  }

  .root {
    background-color: #40c057;
  }

  .suffix {
    background-color: #ff6b6b;
  }

  .ending {
    background-color: #ff922b;
  }

  .pronoun-direct {
    background-color: #9c36b5;
  }

  .pronoun-indirect {
    background-color: #5c7cfa;
  }

  .particle {
    background-color: #ffd43b;
  }

  .reflexive {
    background-color: #15aabf;
  } */

  .verb-analysis {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    margin: 30px 0;
    border: 1px solid #dee2e6;
  }

  .verb-example {
    font-size: 1.8em;
    margin: 20px 0;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    text-align: center;
    border: 2px dashed #adb5bd;
  }

  .verb-breakdown {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
    padding: 15px;
    background-color: #f1f3f5;
    border-radius: 10px;
  }

  .verb-part {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 1.2em;
    display: inline-block;
    margin: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .explanation {
    background-color: #e7f5ff;
    padding: 18px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 4px solid #4dabf7;
  }

  .translation {
    font-style: italic;
    color: #495057;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 6px;
    margin-top: 10px;
  }

  .pronoun-composition {
    background-color: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    margin: 30px 0;
  }

  .pronoun-rule {
    background-color: #fff9db;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 4px solid #ffd43b;
  }

  .sentence-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(350px, 1fr)
    );
    gap: 20px;
    margin: 30px 0;
  }

  .sentence-card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-top: 4px solid #40c057;
    transition: transform 0.3s;
  }

  .sentence-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }

  .sentence-ru {
    font-size: 1.5em;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e9ecef;
    text-align: center;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sentence-en {
    color: #495057;
    font-style: italic;
    margin-bottom: 15px;
  }

  .analysis {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    font-size: 0.95em;
  }

  .complex-verb {
    background: linear-gradient(
      135deg,
      #e7f5ff 0%,
      #d0ebff 100%
    );
    padding: 30px;
    border-radius: 12px;
    margin: 40px 0;
    border: 2px solid #4dabf7;
  }

  .complex-title {
    color: #1864ab;
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.6em;
  }

  .verb-chain {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 25px 0;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  .chain-part {
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .chain-label {
    font-size: 0.8em;
    margin-top: 5px;
    color: #495057;
    font-weight: normal;
  }

  .note {
    background-color: #fff9db;
    padding: 20px;
    border-radius: 10px;
    margin-top: 40px;
    border-left: 6px solid #ff922b;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  footer {
    text-align: center;
    margin-top: 50px;
    padding-top: 25px;
    border-top: 2px solid #adb5bd;
    color: #6c757d;
    font-size: 0.9em;
  }

  @media (max-width: 768px) {
    .sentence-grid {
      grid-template-columns: 1fr;
    }

    .verb-breakdown,
    .verb-chain {
      flex-direction: column;
      align-items: center;
    }

    .verb-example {
      font-size: 1.4em;
      padding: 15px;
    }

    .color-legend {
      grid-template-columns: 1fr;
    }
  }

  .highlight {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  .interactive-note {
    background-color: #e7f5ff;
    border-left: 5px solid #339af0;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    transition: all 0.3s;
  }

  .interactive-note:hover {
    background-color: #d0ebff;
    transform: translateX(5px);
  }
</style>
