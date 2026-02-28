<svelte:head>
  <title
    >Advanced Arabic Syntax - Complex Sentences with
    Color-Coding</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>

<div class="container mainpage">
  <header>
    <h1>Advanced Arabic Syntax Analysis</h1>
    <p class="subtitle">
      Complex English sentences translated into Arabic with
      color-coded syntax highlighting: main clauses,
      subordinate clauses, relative clauses, passive
      constructions, compound tenses, and morphological
      elements
    </p>
  </header>

  <div class="legend-container">
    <div class="legend-box">
      <div class="legend-title clause-title">
        Clause & Phrase Types
      </div>
      <div class="legend-grid">
        <div class="legend-item">
          <div class="legend-color main-clause-color"></div>
          <span>Main Clause (جملة رئيسية)</span>
        </div>
        <div class="legend-item">
          <div
            class="legend-color subordinate-clause-color"
          ></div>
          <span>Subordinate Clause (جملة فرعية)</span>
        </div>
        <div class="legend-item">
          <div
            class="legend-color relative-clause-color"
          ></div>
          <span>Relative Clause (جملة موصولة)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color verb-phrase-color"></div>
          <span>Verb Phrase (مركب فعلي)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color noun-phrase-color"></div>
          <span>Noun Phrase (مركب اسمي)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color adverbial-color"></div>
          <span>Adverbial (ظرف)</span>
        </div>
        <div class="legend-item">
          <div
            class="legend-color prepositional-color"
          ></div>
          <span>Prepositional Phrase (جار ومجرور)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color conjunction-color"></div>
          <span>Conjunction (حرف عطف)</span>
        </div>
        <div class="legend-item">
          <div class="legend-color passive-color"></div>
          <span>Passive Construction (مبني للمجهول)</span>
        </div>
        <div class="legend-item">
          <div
            class="legend-color compound-tense-color"
          ></div>
          <span>Compound Tense (زمن مركب)</span>
        </div>
      </div>
    </div>

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
      </div>
      <div
        style="margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px;"
      >
        <strong style="color: #2c3e50;">Note:</strong>
        <p
          style="color: #7f8c8d; margin-top: 10px; font-size: 0.95rem;"
        >
          Arabic uses synthetic structures where English
          uses analytic ones. Complex English sentences are
          often expressed through different grammatical
          mechanisms in Arabic.
        </p>
      </div>
    </div>
  </div>

  <h2 class="section-title">
    Complex Sentences with Subordinate Clauses
  </h2>
  <div class="sentence-grid">
    <!-- Sentence 1 -->
    <div class="sentence-card">
      <div class="sentence-number">1</div>
      <div class="original-sentence">
        "Although he, who is usually so reserved, protested
        loudly, no one listened to him."
      </div>
      <div class="sentence-arabic">
        <span class="conjunction">مع أن</span>
        <span class="main-clause"
          ><span class="pronoun">هو</span>
          <span class="relative-clause"
            >الذي <span class="adverbial">عادةً ما</span>
            يكون <span class="adverbial">هادئًا</span> جدًا</span
          >
          <span class="verb-phrase"
            ><span class="prefix">اح</span><span
              class="verb-root">تج</span
            ><span class="suffix">ّ</span></span
          > <span class="adverbial">بصوت عالٍ</span></span
        >،
        <span class="main-clause"
          ><span class="noun-phrase">لم يسمع</span>
          <span class="pronoun">له</span>
          <span class="noun-phrase">أحد</span></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> Although he, who is usually
        so reserved, protested loudly, no one listened to him.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--conjunction); color: white;"
          >
            Concessive Clause (مع أن)
          </div>
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause 1
          </div>
          <div
            class="clause-tag"
            style="background: var(--relative-clause); color: white;"
          >
            Relative Clause (الذي)
          </div>
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause 2
          </div>
        </div>

        <div class="structure-visual">
          Structure: [Concessive Conjunction + Main Clause₁
          (with embedded Relative Clause)] + Main Clause₂
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase"
              ><span class="prefix">اح</span><span
                class="verb-root">تج</span
              ><span class="suffix">ّ</span></span
            >
            = <span class="prefix">احـ</span> (Form VIII
            prefix) + <span class="verb-root">تج</span>
            (root: protest) + <span class="suffix">ّ</span> (gemination
            for intensity)
          </div>
          <div class="breakdown-item">
            <span class="noun-phrase">لم يسمع</span> =
            <span class="prefix">لم</span>
            (negation) + <span class="prefix">يـ</span>
            (prefix) + <span class="verb-root">سمع</span> (hear)
          </div>
          <div class="breakdown-item">
            <span class="pronoun">له</span> =
            <span class="prepositional">لـ</span>
            (to) + <span class="pronoun">ـه</span> (him)
          </div>
        </div>
      </div>
    </div>

    <!-- Sentence 2 -->
    <div class="sentence-card">
      <div class="sentence-number">2</div>
      <div class="original-sentence">
        "Because the man whose car was stolen had no
        insurance, he had to pay everything himself."
      </div>
      <div class="sentence-arabic">
        <span class="conjunction">لأن</span>
        <span class="main-clause"
          ><span class="noun-phrase">الرجل</span>
          <span class="relative-clause"
            >الذي <span class="passive"
              ><span class="prefix">سُرِقَت</span></span
            > سيارته</span
          >
          <span class="verb-phrase">لم يكن لديه تأمين</span
          ></span
        >،
        <span class="main-clause"
          ><span class="pronoun">هو</span>
          <span class="verb-phrase"
            ><span class="compound-tense"
              >كان مضطرًا أن <span class="prefix">ي</span
              ><span class="verb-root">دفع</span></span
            ></span
          > <span class="noun-phrase">كل شيء</span>
          <span class="adverbial">بنفسه</span></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> Because the man whose car
        was stolen had no insurance, he had to pay everything
        himself.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--conjunction); color: white;"
          >
            Causal Clause (لأن)
          </div>
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause with Relative
          </div>
          <div
            class="clause-tag"
            style="background: var(--relative-clause); color: white;"
          >
            Relative Clause (الذي)
          </div>
          <div
            class="clause-tag"
            style="background: var(--passive); color: white;"
          >
            Passive Verb
          </div>
          <div
            class="clause-tag"
            style="background: var(--compound-tense); color: white;"
          >
            Compound Tense
          </div>
        </div>

        <div class="structure-visual">
          Structure: Causal Clause → [Main Clause containing
          Relative Clause with Passive] → Result Clause with
          Compound Tense
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="passive"
              ><span class="prefix">سُرِقَت</span></span
            >
            = <span class="verb-root">سرق</span> (root:
            steal) + <span class="suffix">ـت</span> (feminine
            passive) = "was stolen"
          </div>
          <div class="breakdown-item">
            <span class="compound-tense"
              >كان مضطرًا أن يدفع</span
            >
            = <span class="verb-root">كان</span> (was) +
            <span class="noun-phrase">مضطرًا</span>
            (obliged) + أن (to) +
            <span class="prefix">يـ</span><span
              class="verb-root">دفع</span
            > (pay)
          </div>
          <div class="breakdown-item">
            <span class="adverbial">بنفسه</span> =
            <span class="prepositional">بـ</span>
            (with) + <span class="noun-phrase">نفس</span>
            (self) + <span class="pronoun">ـه</span> (his)
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="section-title">Adverbial Constructions</h2>
  <div class="sentence-grid">
    <!-- Sentence 3 -->
    <div class="sentence-card">
      <div class="sentence-number">3</div>
      <div class="original-sentence">
        "Regardless of the storm, they sailed on."
      </div>
      <div class="sentence-arabic">
        <span class="adverbial">رغم العاصفة</span>،
        <span class="main-clause"
          ><span class="prefix">اس</span><span
            class="verb-root">تمروا</span
          > <span class="adverbial">في الإبحار</span></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> Regardless of the storm,
        they continued sailing.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--adverbial); color: white;"
          >
            Concessive Adverbial (رغم)
          </div>
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--adverbial); color: white;"
          >
            Adverbial of Manner
          </div>
        </div>

        <div class="structure-visual">
          Structure: Concessive Phrase + Main Clause with
          Verbal Noun
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="prefix">اس</span><span
              class="verb-root">تمروا</span
            >
            = <span class="prefix">اسـ</span> (Form X
            prefix) + <span class="verb-root">تمر</span>
            (continue) + <span class="suffix">ـوا</span> (they)
          </div>
          <div class="breakdown-item">
            <span class="adverbial">في الإبحار</span> =
            <span class="prepositional">في</span>
            (in) + <span class="noun-phrase">الإبحار</span> (sailing
            - verbal noun)
          </div>
        </div>
      </div>
    </div>

    <!-- Sentence 4 -->
    <div class="sentence-card">
      <div class="sentence-number">4</div>
      <div class="original-sentence">
        "Remembering his words, she acted wisely."
      </div>
      <div class="sentence-arabic">
        <span class="adverbial"
          ><span class="verb-phrase">عندما تذكرت كلامه</span
          ></span
        >،
        <span class="main-clause"
          ><span class="pronoun">هي</span>
          <span class="verb-phrase"
            ><span class="prefix">ت</span><span
              class="verb-root">صرّفت</span
            ></span
          > <span class="adverbial">بحكمة</span></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> When she remembered his
        words, she acted wisely.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--adverbial); color: white;"
          >
            Temporal Adverbial Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--adverbial); color: white;"
          >
            Adverbial of Manner
          </div>
        </div>

        <div class="structure-visual">
          Structure: Temporal Clause (translated from
          English participle) + Main Clause
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase">تذكرت</span> =
            <span class="prefix">تـ</span>
            (Form V prefix) +
            <span class="verb-root">ذكر</span>
            (remember) + <span class="suffix">ـت</span> (she)
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase">تصرفت</span> =
            <span class="prefix">تـ</span>
            (Form V prefix) +
            <span class="verb-root">صرف</span>
            (act) + <span class="suffix">ـت</span> (she)
          </div>
          <div class="breakdown-item">
            <span class="pronoun">كلامـه</span> =
            <span class="noun-phrase">كلام</span>
            (words) + <span class="pronoun">ـه</span> (his)
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="section-title">
    Compound Tenses & Modal Constructions
  </h2>
  <div class="sentence-grid">
    <!-- Sentence 5 -->
    <div class="sentence-card">
      <div class="sentence-number">5</div>
      <div class="original-sentence">
        "He will have had to go."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="pronoun">هو</span>
          <span class="compound-tense"
            ><span class="verb-phrase"
              >سيكون قد <span class="prefix">اضطر</span> إلى
              <span class="verb-phrase"
                ><span class="prefix">الذهاب</span></span
              ></span
            ></span
          ></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> He will have been obliged
        to go.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--compound-tense); color: white;"
          >
            Future Perfect Modal
          </div>
          <div
            class="clause-tag"
            style="background: var(--verb-phrase); color: white;"
          >
            Modal Verb + Verbal Noun
          </div>
        </div>

        <div class="structure-visual">
          Structure: Future Perfect of Obligation + Verbal
          Noun Complement
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="compound-tense">سيكون قد اضطر</span
            >
            = <span class="prefix">سـ</span> (future) +
            <span class="verb-root">يكون</span>
            (will be) + قد (already) +
            <span class="verb-root">اضطر</span> (was obliged)
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase">إلى الذهاب</span> =
            <span class="prepositional">إلى</span>
            (to) + <span class="prefix">الـ</span><span
              class="verb-root">ذهاب</span
            > (going - verbal noun)
          </div>
        </div>
      </div>
    </div>

    <!-- Sentence 6 -->
    <div class="sentence-card">
      <div class="sentence-number">6</div>
      <div class="original-sentence">
        "She might have wanted to come."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="pronoun">هي</span>
          <span class="compound-tense"
            ><span class="verb-phrase"
              >قد <span class="prefix">ت</span><span
                class="verb-root">كون</span
              > <span class="prefix">أرادت</span>
              <span class="verb-phrase"
                ><span class="prefix">المجيء</span></span
              ></span
            ></span
          ></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> She might have wanted to
        come.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--compound-tense); color: white;"
          >
            Modal Perfect Construction
          </div>
          <div
            class="clause-tag"
            style="background: var(--verb-phrase); color: white;"
          >
            Verb Chain with Complement
          </div>
        </div>

        <div class="structure-visual">
          Structure: Modal (قد) + Perfect of "to be" +
          Perfect of "to want" + Verbal Noun
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="compound-tense">قد تكون أرادت</span
            >
            = قد (might) +
            <span class="prefix">تـ</span><span
              class="verb-root">كون</span
            >
            (she be) + <span class="prefix">أراد</span><span
              class="verb-root"
            ></span><span class="suffix">ت</span> (she wanted)
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase">المجيء</span> =
            <span class="prefix">الـ</span>
            (the) + <span class="verb-root">مجيء</span> (coming
            - verbal noun)
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="section-title">Passive Constructions</h2>
  <div class="sentence-grid">
    <!-- Sentence 7 -->
    <div class="sentence-card">
      <div class="sentence-number">7</div>
      <div class="original-sentence">
        "The house cannot be sold."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="noun-phrase">البيت</span>
          <span class="passive"
            ><span class="prefix">لا ي</span><span
              class="verb-root">مكن</span
            ></span
          >
          <span class="verb-phrase"
            ><span class="prefix">بيعه</span></span
          ></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> The house cannot be sold.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--passive); color: white;"
          >
            Impersonal Passive
          </div>
          <div
            class="clause-tag"
            style="background: var(--verb-phrase); color: white;"
          >
            Passive Verbal Noun
          </div>
        </div>

        <div class="structure-visual">
          Structure: Subject + Impersonal Passive Verb +
          Passive Verbal Noun with Attached Pronoun
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="passive"
              ><span class="prefix">لا يـ</span><span
                class="verb-root">مكن</span
              ></span
            >
            = <span class="prefix">لا</span> (not) +
            <span class="prefix">يـ</span>
            (it) + <span class="verb-root">مكن</span> (is possible)
            = "it is not possible"
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase"
              ><span class="prefix">بيعه</span></span
            >
            = <span class="verb-root">بيع</span> (selling) +
            <span class="pronoun">ـه</span> (its) = "its selling"
          </div>
        </div>
      </div>
    </div>

    <!-- Sentence 8 -->
    <div class="sentence-card">
      <div class="sentence-number">8</div>
      <div class="original-sentence">
        "Attempts were made to help him."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="passive"
            ><span class="prefix">جُرِّبَ</span></span
          >
          <span class="verb-phrase"
            ><span class="prefix">محاولة</span>
            <span class="subordinate-clause"
              ><span class="verb-phrase"
                ><span class="prefix">مساعدته</span></span
              ></span
            ></span
          ></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> An attempt to help him was
        tried.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--passive); color: white;"
          >
            Passive Main Verb
          </div>
          <div
            class="clause-tag"
            style="background: var(--verb-phrase); color: white;"
          >
            Verbal Noun + Complement
          </div>
          <div
            class="clause-tag"
            style="background: var(--subordinate-clause); color: white;"
          >
            Subordinate Verbal Phrase
          </div>
        </div>

        <div class="structure-visual">
          Structure: Passive Verb + Verbal Noun with
          Embedded Purpose Clause
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="passive"
              ><span class="prefix">جُرِّبَ</span></span
            >
            = <span class="verb-root">جرب</span> (try) + passive
            form = "was tried"
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase">محاولة مساعدته</span>
            = <span class="noun-phrase">محاولة</span>
            (attempt) +
            <span class="verb-root">مساعدة</span>
            (helping) + <span class="pronoun">ـه</span> (him)
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="section-title">
    Reported Speech & Complex Relative Clauses
  </h2>
  <div class="sentence-grid">
    <!-- Sentence 9 -->
    <div class="sentence-card">
      <div class="sentence-number">9</div>
      <div class="original-sentence">
        "He claimed he was innocent."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="pronoun">هو</span>
          <span class="verb-phrase"
            ><span class="prefix">ادّعى</span></span
          >
          <span class="subordinate-clause"
            ><span class="conjunction">أنه</span>
            <span class="verb-phrase"
              ><span class="prefix">بريء</span></span
            ></span
          ></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> He claimed that he was innocent.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Reporting Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--subordinate-clause); color: white;"
          >
            Reported Speech Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--conjunction); color: white;"
          >
            Complementizer (أن)
          </div>
        </div>

        <div class="structure-visual">
          Structure: Reporting Verb + أن (that) + Reported
          Content Clause
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase"
              ><span class="prefix">ادّعى</span></span
            >
            = <span class="prefix">ادّعـ</span> (Form VIII
            prefix) + <span class="verb-root">ع</span> (claim)
            = "claimed"
          </div>
          <div class="breakdown-item">
            <span class="conjunction">أنه</span> =
            <span class="conjunction">أن</span>
            (that) + <span class="pronoun">ـه</span> (he)
          </div>
        </div>
      </div>
    </div>

    <!-- Sentence 10 -->
    <div class="sentence-card">
      <div class="sentence-number">10</div>
      <div class="original-sentence">
        "The question, which has been unresolved and
        discussed again and again for years, is dividing
        society."
      </div>
      <div class="sentence-arabic">
        <span class="main-clause"
          ><span class="noun-phrase">السؤال</span>
          <span class="relative-clause"
            ><span class="conjunction">الذي</span>
            <span class="compound-tense"
              ><span class="verb-phrase"
                >كان <span class="passive"
                  ><span class="prefix">غير محلول</span
                  ></span
                ></span
              ></span
            >
            <span class="conjunction">و</span>
            <span class="passive"
              ><span class="prefix">يُناقش</span></span
            > <span class="adverbial">مرارًا وتكرارًا</span>
            <span class="adverbial">لسنوات</span></span
          >،
          <span class="verb-phause"
            ><span class="prefix">يُقسِّم</span></span
          > <span class="noun-phrase">المجتمع</span></span
        >.
      </div>
      <div class="sentence-translation">
        <strong>Translation:</strong> The question, which has
        been unresolved and discussed again and again for years,
        is dividing society.
      </div>

      <div class="analysis-container">
        <div class="analysis-title">Syntax Analysis:</div>

        <div class="clause-analysis">
          <div
            class="clause-tag"
            style="background: var(--main-clause); color: white;"
          >
            Main Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--relative-clause); color: white;"
          >
            Extended Relative Clause
          </div>
          <div
            class="clause-tag"
            style="background: var(--compound-tense); color: white;"
          >
            Perfect Passive
          </div>
          <div
            class="clause-tag"
            style="background: var(--passive); color: white;"
          >
            Present Passive
          </div>
          <div
            class="clause-tag"
            style="background: var(--adverbial); color: white;"
          >
            Multiple Adverbials
          </div>
        </div>

        <div class="structure-visual">
          Structure: Subject + [Long Relative Clause with
          Multiple Verbs & Adverbials] + Main Verb + Object
        </div>

        <div class="morphology-breakdown">
          <div class="breakdown-title">
            Morphological Breakdown:
          </div>
          <div class="breakdown-item">
            <span class="compound-tense">كان غير محلول</span
            >
            = <span class="verb-root">كان</span> (was) + غير
            (un-) + <span class="noun-phrase">محلول</span> (solved)
          </div>
          <div class="breakdown-item">
            <span class="passive"
              ><span class="prefix">يُناقش</span></span
            >
            = <span class="prefix">يـ</span> (passive
            prefix) + <span class="verb-root">ناقش</span> (discuss)
            = "is discussed"
          </div>
          <div class="breakdown-item">
            <span class="verb-phrase"
              ><span class="prefix">يُقسِّم</span></span
            >
            = <span class="prefix">يـ</span> (he/it) +
            <span class="verb-root">قسّم</span> (divide) = "divides"
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="notes">
    <h3>Key Observations about Arabic Complex Syntax</h3>
    <ul>
      <li>
        <span class="highlight">Subordinate Clauses</span> in
        Arabic are often introduced by specific particles (أن،
        الذي، لأن، مع أن) rather than through participial constructions
        as in English.
      </li>
      <li>
        <span class="highlight"
          >English passive constructions</span
        > are often rendered using Arabic's synthetic passive
        verb forms (يُفعل، فُعل) or impersonal constructions (لا
        يمكن).
      </li>
      <li>
        <span class="highlight">Compound tenses</span> in English
        (will have had to) are expressed through Arabic's auxiliary
        verbs (كان، سيكون) combined with participles or verbal
        nouns.
      </li>
      <li>
        <span class="highlight">Long relative clauses</span> in
        English are usually rendered similarly in Arabic using
        الذي/التي, but Arabic allows more flexibility in clause
        ordering.
      </li>
      <li>
        <span class="highlight"
          >English gerunds and participles</span
        > ("remembering," "regardless of") are typically translated
        using Arabic verbal nouns (المصادر) or adverbial phrases.
      </li>
      <li>
        <span class="highlight">Reported speech</span> in Arabic
        requires the complementizer أن (that) more consistently
        than in English.
      </li>
      <li>
        <span class="highlight">Multiple adverbials</span> in
        English sentences are handled through prepositional phrases
        and adverbs in Arabic, often with different ordering.
      </li>
      <li>
        <span class="highlight"
          >English modal perfect constructions</span
        > ("might have wanted") are expressed through combinations
        of قد (might) with perfect or compound tense forms.
      </li>
      <li>
        <span class="highlight"
          >Parenthetical expressions</span
        > in English ("who is usually so reserved") are typically
        integrated as relative clauses in Arabic without parentheses.
      </li>
      <li>
        <span class="highlight"
          >Arabic tends toward synthetic expression</span
        > where English uses analytic constructions, resulting
        in different syntactic packaging of the same semantic
        content.
      </li>
    </ul>
  </div>

  <footer>
    <p>
      Advanced Arabic Syntax Analysis - Complex
      English-to-Arabic Translations with Color-Coded Clause
      Structure
    </p>
    <p>
      Clause Types: <span class="main-clause">Main</span> |
      <span class="subordinate-clause">Subordinate</span>
      | <span class="relative-clause">Relative</span> |
      Morphology: <span class="prefix">Prefixes</span> |
      <span class="suffix">Suffixes</span>
      | <span class="verb-root">Verb Roots</span>
    </p>
  </footer>
</div>

<style>
  :root {
    --main-clause: #3498db;
    --subordinate-clause: #2ecc71;
    --relative-clause: #e74c3c;
    --verb-phrase: #9b59b6;
    --noun-phrase: #f39c12;
    --adverbial: #1abc9c;
    --prepositional: #34495e;
    --conjunction: #8e44ad;
    --passive: #d35400;
    --compound-tense: #27ae60;
    --prefix: #3498db;
    --suffix: #e74c3c;
    --verb-root: #2ecc71;
    --pronoun: #9b59b6;
    --background: #f8f9fa;
    --card-bg: #ffffff;
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
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
    background: linear-gradient(
      135deg,
      #f5f7fa 0%,
      #e4eaf1 100%
    );
  }

  .container {
    max-width: 1400px;
    margin-top: 4rem;
    background-color: var(--card-bg);
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
    padding: 40px;
    border: 1px solid rgba(52, 152, 219, 0.15);
  }

  header {
    text-align: center;
    margin-bottom: 50px;
    padding-bottom: 30px;
    border-bottom: 3px solid rgba(52, 152, 219, 0.2);
  }

  h1 {
    color: var(--text-primary);
    margin-bottom: 20px;
    font-size: 3rem;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.3rem;
    max-width: 1000px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .legend-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 30px;
    margin-bottom: 60px;
  }

  .legend-box {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #eaeaea;
    transition: transform 0.3s ease;
  }

  .legend-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  .legend-title {
    font-weight: 700;
    margin-bottom: 25px;
    color: var(--text-primary);
    padding-bottom: 15px;
    border-bottom: 3px solid;
    font-size: 1.4rem;
  }

  .clause-title {
    border-bottom-color: var(--main-clause);
  }

  .morphology-title {
    border-bottom-color: var(--prefix);
  }

  .legend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .legend-item:hover {
    background: #e8f4fc;
    transform: scale(1.02);
  }

  .legend-color {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    margin-right: 15px;
    border: 2px solid white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .main-clause-color {
    background-color: var(--main-clause);
  }
  .subordinate-clause-color {
    background-color: var(--subordinate-clause);
  }
  .relative-clause-color {
    background-color: var(--relative-clause);
  }
  .verb-phrase-color {
    background-color: var(--verb-phrase);
  }
  .noun-phrase-color {
    background-color: var(--noun-phrase);
  }
  .adverbial-color {
    background-color: var(--adverbial);
  }
  .prepositional-color {
    background-color: var(--prepositional);
  }
  .conjunction-color {
    background-color: var(--conjunction);
  }
  .passive-color {
    background-color: var(--passive);
  }
  .compound-tense-color {
    background-color: var(--compound-tense);
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

  .section-title {
    color: var(--text-primary);
    margin: 60px 0 40px 0;
    padding-bottom: 20px;
    border-bottom: 3px solid #3498db;
    font-size: 2.2rem;
    position: relative;
  }

  .section-title:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 150px;
    height: 3px;
    background: #e74c3c;
  }

  .sentence-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(600px, 1fr)
    );
    gap: 40px;
    margin-top: 40px;
  }

  .sentence-card {
    background-color: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
    border-top: 6px solid #3498db;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .sentence-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  }

  .sentence-card:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(
      90deg,
      #3498db,
      #2ecc71,
      #e74c3c,
      #9b59b6
    );
  }

  .sentence-number {
    display: inline-block;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 30px;
    box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
  }

  .original-sentence {
    font-size: 1.4rem;
    margin-bottom: 25px;
    color: var(--text-primary);
    font-style: italic;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #3498db;
  }

  .sentence-arabic {
    font-size: 2rem;
    direction: rtl;
    text-align: right;
    margin-bottom: 35px;
    line-height: 2.5;
    padding: 30px;
    background: linear-gradient(135deg, #f8f9fa, #f0f7ff);
    border-radius: 12px;
    border: 2px solid rgba(52, 152, 219, 0.1);
    min-height: 180px;
  }

  .sentence-translation {
    color: var(--text-primary);
    font-size: 1.3rem;
    padding: 25px 0;
    border-top: 2px dashed #ddd;
    margin-top: 25px;
    font-weight: 600;
  }

  .analysis-container {
    margin-top: 35px;
    padding: 30px;
    background: linear-gradient(135deg, #f8f9fa, #f0f7ff);
    border-radius: 12px;
    border: 2px solid rgba(52, 152, 219, 0.1);
  }

  .analysis-title {
    font-weight: 700;
    margin-bottom: 25px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }

  .analysis-title i {
    margin-right: 15px;
    font-size: 1.6rem;
    color: #3498db;
  }

  .clause-analysis {
    margin-bottom: 25px;
  }

  .clause-tag {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 700;
    font-size: 1rem;
    margin-right: 15px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .structure-visual {
    font-size: 1.4rem;
    font-weight: 700;
    padding: 25px;
    background: white;
    border-radius: 10px;
    margin-top: 25px;
    border: 2px solid #eaeaea;
    text-align: center;
    color: #2c3e50;
  }

  .morphology-breakdown {
    margin-top: 25px;
    padding: 25px;
    background: white;
    border-radius: 10px;
    border: 1px solid #eaeaea;
  }

  .breakdown-title {
    font-weight: 700;
    margin-bottom: 15px;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  .breakdown-item {
    margin-bottom: 10px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }

  .notes {
    background: linear-gradient(135deg, #e8f4fc, #d4e7f7);
    padding: 40px;
    border-radius: 15px;
    margin-top: 60px;
    border: 1px solid rgba(52, 152, 219, 0.2);
  }

  .notes h3 {
    color: #2c5a7a;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 3px solid #3498db;
    font-size: 2rem;
  }

  .notes ul {
    padding-left: 30px;
  }

  .notes li {
    margin-bottom: 20px;
    line-height: 1.7;
    font-size: 1.1rem;
    position: relative;
  }

  .notes li:before {
    content: "•";
    color: #3498db;
    font-weight: bold;
    font-size: 1.5rem;
    position: absolute;
    left: -25px;
    top: -2px;
  }

  .highlight {
    background: rgba(52, 152, 219, 0.15);
    padding: 4px 10px;
    border-radius: 5px;
    font-weight: 700;
    color: #2c3e50;
    border: 1px solid rgba(52, 152, 219, 0.3);
  }

  footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 40px;
    border-top: 3px solid rgba(52, 152, 219, 0.2);
    color: var(--text-secondary);
    font-size: 1.1rem;
  }

  .main-clause {
    color: var(--main-clause);
    font-weight: bold;
  }
  .subordinate-clause {
    color: var(--subordinate-clause);
    font-weight: bold;
  }
  .relative-clause {
    color: var(--relative-clause);
    font-weight: bold;
  }
  .verb-phrase {
    color: var(--verb-phrase);
    font-weight: bold;
  }
  .noun-phrase {
    color: var(--noun-phrase);
    font-weight: bold;
  }
  .adverbial {
    color: var(--adverbial);
    font-weight: bold;
  }
  .prepositional {
    color: var(--prepositional);
    font-weight: bold;
  }
  .conjunction {
    color: var(--conjunction);
    font-weight: bold;
  }
  .passive {
    color: var(--passive);
    font-weight: bold;
  }
  .compound-tense {
    color: var(--compound-tense);
    font-weight: bold;
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

  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }

    .sentence-grid {
      grid-template-columns: 1fr;
    }

    .sentence-arabic {
      font-size: 1.7rem;
      padding: 20px;
    }

    .legend-grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 2.2rem;
    }

    .original-sentence {
      font-size: 1.2rem;
    }
  }
</style>
