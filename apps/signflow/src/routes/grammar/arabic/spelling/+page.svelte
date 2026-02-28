<svelte:head>
  <title
    >Master Arabic Spelling - Complete Guide with Rules &
    Examples</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>

<div class="container mainpage">
  <div class="container">
    <p class="subtitle">
      A comprehensive guide to Arabic orthography, spelling
      rules, and common patterns with interactive examples
      and practice exercises
    </p>
    <div class="nav-tabs">
      <button class="tab-btn active" data-tab="basics"
        >Basics</button
      >
      <button class="tab-btn" data-tab="letters"
        >Letters & Forms</button
      >
      <button class="tab-btn" data-tab="rules"
        >Spelling Rules</button
      >
      <button class="tab-btn" data-tab="hamza"
        >Hamza Rules</button
      >
      <button class="tab-btn" data-tab="practice"
        >Practice</button
      >
      <button class="tab-btn" data-tab="mistakes"
        >Common Mistakes</button
      >
    </div>

    <!-- Basics Tab -->
    <div id="basics" class="tab-content active">
      <h2 class="section-title">
        Arabic Writing System Basics
      </h2>

      <div class="rule-card">
        <div class="rule-number">1</div>
        <div class="rule-title">Right-to-Left Writing</div>
        <p>
          Arabic is written from right to left, which is the
          opposite direction of English and most European
          languages.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            اللغة العربية تُكتب من اليمين إلى اليسار
          </div>
          <div class="translation">
            The Arabic language is written from right to
            left
          </div>
        </div>

        <div class="warning">
          <strong>Important:</strong> Numbers in Arabic are written
          from left to right, even within Arabic text!
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">2</div>
        <div class="rule-title">Cursive Script</div>
        <p>
          Arabic letters connect to each other (with some
          exceptions) within words. Most letters have 4
          forms: isolated, initial, medial, and final.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            كتاب (kitaab) - book
          </div>
          <div class="phonetic">
            kāf (initial) + tā (medial) + ʾalif (medial) +
            bā (final)
          </div>
          <div class="translation">
            Notice how all letters connect in the word
            "book"
          </div>
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">3</div>
        <div class="rule-title">No Capital Letters</div>
        <p>
          Arabic doesn't have capital letters. Proper nouns
          are distinguished by context, not letter case.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            محمد ذهب إلى القاهرة
          </div>
          <div class="phonetic">
            Muhammad dhahaba ilā al-Qāhira
          </div>
          <div class="translation">
            Muhammad went to Cairo (note: no capitalization
            for names or places)
          </div>
        </div>
      </div>
    </div>

    <!-- Letters & Forms Tab -->
    <div id="letters" class="tab-content">
      <h2 class="section-title">Arabic Letter Forms</h2>

      <div class="connectors">
        <h3 style="color: #2c3e50; margin-bottom: 20px;">
          Letter Connection Rules
        </h3>
        <p>
          Arabic letters fall into three categories based on
          how they connect:
        </p>

        <div class="connector-example">
          <div class="letter-form">
            <div class="form-label">
              Connects Both Sides
            </div>
            <div class="form-arabic">ب → بـ → ـبـ → ـب</div>
          </div>
          <div class="arrow">→</div>
          <div class="letter-form">
            <div class="form-label">Example: باء (bāʾ)</div>
            <div class="form-arabic">كتاب (book)</div>
          </div>
        </div>

        <div class="connector-example">
          <div class="letter-form">
            <div class="form-label">
              Connects Right Only
            </div>
            <div class="form-arabic">د → دـ → ـد</div>
          </div>
          <div class="arrow">→</div>
          <div class="letter-form">
            <div class="form-label">Example: دال (dāl)</div>
            <div class="form-arabic">مدينة (city)</div>
          </div>
        </div>

        <div class="connector-example">
          <div class="letter-form">
            <div class="form-label">Never Connects</div>
            <div class="form-arabic">و → ـو → و → ـو</div>
          </div>
          <div class="arrow">→</div>
          <div class="letter-form">
            <div class="form-label">Example: واو (wāw)</div>
            <div class="form-arabic">وداع (farewell)</div>
          </div>
        </div>
      </div>

      <h3 style="margin: 40px 0 20px 0; color: #2c3e50;">
        Arabic Alphabet with Forms
      </h3>
      <div class="letter-grid">
        <div class="letter-card">
          <div class="letter-arabic">ا</div>
          <div class="letter-name">Alif</div>
          <div class="letter-sound">/aː/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Right only
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ب</div>
          <div class="letter-name">Bāʾ</div>
          <div class="letter-sound">/b/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Both sides
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ت</div>
          <div class="letter-name">Tāʾ</div>
          <div class="letter-sound">/t/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Both sides
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ث</div>
          <div class="letter-name">Thāʾ</div>
          <div class="letter-sound">/θ/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Both sides
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ج</div>
          <div class="letter-name">Jīm</div>
          <div class="letter-sound">/dʒ/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Both sides
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ح</div>
          <div class="letter-name">Ḥāʾ</div>
          <div class="letter-sound">/ħ/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Both sides
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">د</div>
          <div class="letter-name">Dāl</div>
          <div class="letter-sound">/d/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Right only
          </div>
        </div>
        <div class="letter-card">
          <div class="letter-arabic">ذ</div>
          <div class="letter-name">Dhāl</div>
          <div class="letter-sound">/ð/</div>
          <div
            style="font-size: 0.8rem; color: #7f8c8d; margin-top: 5px;"
          >
            Right only
          </div>
        </div>
      </div>

      <div class="success">
        <strong>Tip:</strong> The 6 letters that
        <span class="highlight"
          >never connect to the left</span
        > are: ا د ذ ر ز و. Memorize these as they affect word
        spacing and letter forms.
      </div>
    </div>

    <!-- Spelling Rules Tab -->
    <div id="rules" class="tab-content">
      <h2 class="section-title">
        Essential Spelling Rules
      </h2>

      <div class="rule-card">
        <div class="rule-number">1</div>
        <div class="rule-title">
          Definite Article ال (al-) Rules
        </div>
        <p>
          The definite article "al-" (ال) assimilates with
          "sun letters" (الحروف الشمسية).
        </p>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Sun Letters (14)</th>
                <th>Example</th>
                <th>Moon Letters (14)</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="comparison-arabic"
                  >ت ث د ذ ر ز س ش ص ض ط ظ ل ن</td
                >
                <td class="comparison-arabic"
                  >الشمس (ash-shams)</td
                >
                <td class="comparison-arabic"
                  >أ ب ج ح خ ع غ ف ق ك م ه و ي</td
                >
                <td class="comparison-arabic"
                  >القمر (al-qamar)</td
                >
              </tr>
            </tbody>
          </table>
        </div>

        <div class="example-box">
          <div class="arabic-text">
            النَّجْم (an-najm) - the star
          </div>
          <div class="phonetic">
            ن is a sun letter, so الـ becomes النَّـ
          </div>
          <div class="translation">
            The "l" of الـ assimilates with ن
          </div>
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">2</div>
        <div class="rule-title">Tāʾ Marbūṭah (ة) Rules</div>
        <p>
          The feminine ending تاء مربوطة changes
          pronunciation and spelling based on its position
          in the sentence.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            مُدَرِّسَةٌ (mudarrisatun)
          </div>
          <div class="phonetic">
            Pronounced "t" when followed by case ending
          </div>
          <div class="arabic-text">
            هذه مُدَرِّسَة (hādhihi mudarrisah)
          </div>
          <div class="phonetic">
            Pronounced "h" when at end of sentence
          </div>
          <div class="translation">A female teacher</div>
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">3</div>
        <div class="rule-title">
          Shaddah <span class="vowel-symbol">(ّ)</span> Doubling
          Rule
        </div>
        <p>
          The shaddah indicates consonant doubling. The
          consonant is pronounced twice but written once
          with a shaddah mark.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            كُتُب (kutub) vs. كُتَّب (kuttab)
          </div>
          <div class="phonetic">
            /ku.tub/ (books) vs /kut.tab/ (writers)
          </div>
          <div class="translation">
            The shaddah on ت changes meaning completely
          </div>
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">4</div>
        <div class="rule-title">
          Alif Maqṣūrah (ى) vs. Yāʾ (ي)
        </div>
        <p>
          Alif maqṣūrah is written like ي but without dots.
          It only appears at the end of words and represents
          a long /aː/ sound.
        </p>

        <div class="example-box">
          <div class="arabic-text">
            على (ʻalā) - on/upon
          </div>
          <div class="phonetic">
            Ends with alif maqṣūrah (ى), pronounced /aː/
          </div>
          <div class="arabic-text">
            علي (ʻalī) - Ali (name)
          </div>
          <div class="phonetic">
            Ends with yāʾ (ي), pronounced /iː/
          </div>
          <div class="translation">
            Different letters, different meanings
          </div>
        </div>
      </div>
    </div>

    <!-- Hamza Rules Tab -->
    <div id="hamza" class="tab-content">
      <h2 class="section-title">
        Hamza (ء) Spelling Rules
      </h2>

      <div class="rule-card">
        <div class="rule-number">1</div>
        <div class="rule-title">Hamza Carriers</div>
        <p>
          Hamza must sit on a "chair" (carrier). The carrier
          is determined by the surrounding vowels.
        </p>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Carrier</th>
              <th>Example</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Initial</td>
              <td class="comparison-arabic">أ إ آ</td>
              <td class="comparison-arabic">أكل (akala)</td>
              <td>On alif with matching harakah</td>
            </tr>
            <tr>
              <td>Medial</td>
              <td class="comparison-arabic">ئ ؤ</td>
              <td class="comparison-arabic">سؤال (suʼāl)</td
              >
              <td>On yāʾ or wāw based on vowel strength</td>
            </tr>
            <tr>
              <td>Final</td>
              <td class="comparison-arabic">ء</td>
              <td class="comparison-arabic">بناء (bināʼ)</td
              >
              <td
                >Independent or on alif if preceded by
                kasrah</td
              >
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rule-card">
        <div class="rule-number">2</div>
        <div class="rule-title">
          Vowel Strength Hierarchy
        </div>
        <p>
          Hamza carriers follow this vowel strength order:
          kasrah <span class="vowel-symbol">(ـِ)</span> >
          ḍammah <span class="vowel-symbol">(ـُ)</span> >
          fatḥah <span class="vowel-symbol">(ـَ)</span>
        </p>

        <div class="example-box">
          <div class="arabic-text">
            سُئِلَ (suʼila) - he was asked
          </div>
          <div class="phonetic">
            Hamza has kasrah, so it sits on yāʾ (ئ)
          </div>
          <div class="arabic-text">
            يَسْأَلُ (yasʼalu) - he asks
          </div>
          <div class="phonetic">
            Hamza has fatḥah, so it sits on alif (أ)
          </div>
          <div class="translation">
            The hamza carrier changes based on the vowel
          </div>
        </div>
      </div>

      <div class="rule-card">
        <div class="rule-number">3</div>
        <div class="rule-title">
          Hamza al-Waṣl (همزة الوصل)
        </div>
        <p>
          The connecting hamza appears at the beginning of
          words and is only pronounced when starting speech.
        </p>

        <div class="example-box">
          <div class="arabic-text">اسم (ism) - name</div>
          <div class="phonetic">When isolated: /ism/</div>
          <div class="arabic-text">
            بسم الله (bismi-llāh)
          </div>
          <div class="phonetic">
            In context: /bismillāh/ (hamza not pronounced)
          </div>
          <div class="translation">
            The hamza disappears in connected speech
          </div>
        </div>
      </div>
    </div>

    <!-- Practice Tab -->
    <div id="practice" class="tab-content">
      <div class="practice-section">
        <h2 class="practice-title">
          Practice Your Arabic Spelling
        </h2>

        <div class="practice-exercise">
          <h3 style="color: #2c3e50; margin-bottom: 20px;">
            Exercise 1: Definite Article Spelling
          </h3>
          <p>
            Add the definite article "ال" to these words.
            Remember sun letter assimilation!
          </p>

          <div class="input-group">
            <div class="input-label">
              كتاب (book) + ال =
            </div>
            <input
              type="text"
              class="arabic-input"
              id="exercise1"
              placeholder="اكتب الجواب هنا..."
            />
            <button
              class="check-btn"
              on:click={checkExercise1}>Check Answer</button
            >
            <div id="result1" class="result"></div>
          </div>

          <div class="input-group">
            <div class="input-label">شمس (sun) + ال =</div>
            <input
              type="text"
              class="arabic-input"
              id="exercise2"
              placeholder="اكتب الجواب هنا..."
            />
            <button
              class="check-btn"
              on:click={checkExercise2}>Check Answer</button
            >
            <div id="result2" class="result"></div>
          </div>
        </div>

        <div class="practice-exercise">
          <h3 style="color: #2c3e50; margin-bottom: 20px;">
            Exercise 2: Correct the Spelling
          </h3>
          <p>
            These words are misspelled. Type the correct
            spelling:
          </p>

          <div class="input-group">
            <div class="input-label">
              مدرسة (should be: مدرسة) - school
            </div>
            <input
              type="text"
              class="arabic-input"
              id="exercise3"
              placeholder="اكتب التصحيح هنا..."
            />
            <button
              class="check-btn"
              on:click={checkExercise3}>Check Answer</button
            >
            <div id="result3" class="result"></div>
          </div>

          <div class="input-group">
            <div class="input-label">
              يقرء (should be: يقرأ) - he reads
            </div>
            <input
              type="text"
              class="arabic-input"
              id="exercise4"
              placeholder="اكتب التصحيح هنا..."
            />
            <button
              class="check-btn"
              on:click={checkExercise4}>Check Answer</button
            >
            <div id="result4" class="result"></div>
          </div>
        </div>

        <div class="practice-exercise">
          <h3 style="color: #2c3e50; margin-bottom: 20px;">
            Exercise 3: Complete the Word
          </h3>
          <p>
            Add the missing letter in the correct form
            (initial, medial, or final):
          </p>

          <div class="input-group">
            <div class="input-label">
              م_تب (complete with: ك) - office
            </div>
            <input
              type="text"
              class="arabic-input"
              id="exercise5"
              placeholder="اكتب الكلمة الكاملة..."
            />
            <button
              class="check-btn"
              on:click={checkExercise5}>Check Answer</button
            >
            <div id="result5" class="result"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Common Mistakes Tab -->
    <div id="mistakes" class="tab-content">
      <div class="common-mistakes">
        <h2 class="section-title">
          Common Spelling Mistakes to Avoid
        </h2>

        <div class="mistake-item">
          <h3 style="color: #e74c3c; margin-bottom: 15px;">
            Mistake 1: Confusing ت and ط
          </h3>
          <p>
            Both make a "t" sound, but ط is emphatic
            (pharyngealized).
          </p>
          <div class="incorrect-example">
            تَين (incorrect for "figs")
          </div>
          <div class="correct-example">
            طِين (correct - clay) vs تِين (correct - figs)
          </div>
        </div>

        <div class="mistake-item">
          <h3 style="color: #e74c3c; margin-bottom: 15px;">
            Mistake 2: Mixing up ذ, ز, and ظ
          </h3>
          <p>
            ذ is /ð/ (like "the"), ز is /z/, ظ is emphatic
            /ðˤ/.
          </p>
          <div class="incorrect-example">
            هذا (hādhā) spelled as هزا
          </div>
          <div class="correct-example">
            هَذا (this) vs هَزَ (he shook)
          </div>
        </div>

        <div class="mistake-item">
          <h3 style="color: #e74c3c; margin-bottom: 15px;">
            Mistake 3: Wrong Hamza Placement
          </h3>
          <p>
            Placing hamza on wrong carrier based on vowel.
          </p>
          <div class="incorrect-example">
            سؤال spelled as سؤال (hamza should be on wāw)
          </div>
          <div class="correct-example">
            سُؤال (question) - hamza on wāw because
            preceding vowel is ḍammah
          </div>
        </div>

        <div class="mistake-item">
          <h3 style="color: #e74c3c; margin-bottom: 15px;">
            Mistake 4: Forgetting Shaddah
          </h3>
          <p>
            Omitting shaddah changes meaning completely.
          </p>
          <div class="incorrect-example">
            علم (ʻilim) for knowledge vs
          </div>
          <div class="correct-example">
            عَلِمَ (ʻalima) he knew vs عَلَّمَ (ʻallama) he
            taught
          </div>
        </div>
      </div>

      <h2 class="section-title">
        Quick Tips for Better Spelling
      </h2>
      <div class="quick-tips">
        <div class="tip-card">
          <div class="tip-icon">📚</div>
          <div class="tip-title">Read Extensively</div>
          <p>
            The more you read Arabic, the more you
            internalize correct spelling patterns naturally.
          </p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">✍️</div>
          <div class="tip-title">Practice Writing</div>
          <p>
            Regular writing practice helps muscle memory.
            Try copying short texts word-for-word.
          </p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🎯</div>
          <div class="tip-title">Learn Root Patterns</div>
          <p>
            Arabic words derive from 3-letter roots.
            Recognizing roots helps with spelling
            derivatives.
          </p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🔍</div>
          <div class="tip-title">Use a Dictionary</div>
          <p>
            When in doubt, check a reliable Arabic
            dictionary for correct spelling and diacritics.
          </p>
        </div>
      </div>
    </div>

    <footer>
      <p>
        Arabic Spelling Mastery Guide - Comprehensive Rules,
        Examples & Practice Exercises
      </p>
      <p>
        Remember: Consistent practice is the key to
        mastering Arabic spelling!
      </p>
    </footer>
  </div>

  <script>
    // Tab functionality
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents =
      document.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");

        // Remove active class from all buttons and contents
        tabBtns.forEach((b) =>
          b.classList.remove("active")
        );
        tabContents.forEach((c) =>
          c.classList.remove("active")
        );

        // Add active class to clicked button and corresponding content
        btn.classList.add("active");
        document
          .getElementById(tabId)
          .classList.add("active");
      });
    });

    // Exercise checking functions
    function checkExercise1() {
      const answer = document
        .getElementById("exercise1")
        .value.trim();
      const result = document.getElementById("result1");
      const correctAnswers = [
        "الكتاب",
        "الكتابُ",
        "الكتابَ",
        "الكتابِ"
      ];

      if (correctAnswers.includes(answer)) {
        result.textContent =
          "✅ Correct! ال + كتاب = الكتاب (ك is a moon letter, so no assimilation)";
        result.className = "result correct";
      } else if (answer === "") {
        result.textContent = "Please enter an answer";
        result.className = "result incorrect";
      } else {
        result.textContent =
          "❌ Try again. Remember: ك is a moon letter, so ال doesn't assimilate";
        result.className = "result incorrect";
      }
    }

    function checkExercise2() {
      const answer = document
        .getElementById("exercise2")
        .value.trim();
      const result = document.getElementById("result2");
      const correctAnswers = [
        "الشمس",
        "الشَّمس",
        "الشَّمسُ",
        "الشَّمسَ",
        "الشَّمسِ"
      ];

      if (correctAnswers.includes(answer)) {
        result.textContent =
          "✅ Excellent! ال + شمس = الشمس (ش is a sun letter, so ال assimilates to الش)";
        result.className = "result correct";
      } else if (answer === "") {
        result.textContent = "Please enter an answer";
        result.className = "result incorrect";
      } else {
        result.textContent =
          "❌ Not quite. Remember: ش is a sun letter, so الـ should assimilate to الشـ";
        result.className = "result incorrect";
      }
    }

    function checkExercise3() {
      const answer = document
        .getElementById("exercise3")
        .value.trim();
      const result = document.getElementById("result3");

      if (answer === "مدرسة") {
        result.textContent =
          "✅ Perfect! The correct spelling has تاء مربوطة (ة) at the end";
        result.className = "result correct";
      } else if (answer === "") {
        result.textContent = "Please enter an answer";
        result.className = "result incorrect";
      } else {
        result.textContent =
          "❌ Close! Remember: مدرسة ends with تاء مربوطة (ة), not regular ت";
        result.className = "result incorrect";
      }
    }

    function checkExercise4() {
      const answer = document
        .getElementById("exercise4")
        .value.trim();
      const result = document.getElementById("result4");

      if (answer === "يقرأ") {
        result.textContent =
          "✅ Correct! Hamza sits on alif because it has fatḥah";
        result.className = "result correct";
      } else if (answer === "") {
        result.textContent = "Please enter an answer";
        result.className = "result incorrect";
      } else {
        result.textContent =
          "❌ Try again. Remember: يقرأ has hamza on alif (أ) not independent hamza";
        result.className = "result incorrect";
      }
    }

    function checkExercise5() {
      const answer = document
        .getElementById("exercise5")
        .value.trim();
      const result = document.getElementById("result5");

      if (answer === "مكتب") {
        result.textContent =
          "✅ Excellent! The ك is in medial form (ـكـ) connecting between م and ت";
        result.className = "result correct";
      } else if (answer === "") {
        result.textContent = "Please enter an answer";
        result.className = "result incorrect";
      } else {
        result.textContent =
          "❌ Not quite. Remember: مكتب has ك in medial form connecting the letters";
        result.className = "result incorrect";
      }
    }

    // Auto-focus on inputs when practice tab is clicked
    document
      .querySelector('[data-tab="practice"]')
      .addEventListener("click", () => {
        setTimeout(() => {
          document.getElementById("exercise1")?.focus();
        }, 300);
      });
  </script>
</div>

<style>
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
    --primary: #2c3e50;
    --secondary: #3498db;
    --accent: #e74c3c;
    --success: #27ae60;
    --warning: #f39c12;
    --light: #ecf0f1;
    --dark: #2c3e50;
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
    max-width: 1300px;
    margin: 0 auto;
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
    color: var(--primary);
    margin-bottom: 20px;
    font-size: 3.2rem;
    background: linear-gradient(135deg, #2c3e50, #3498db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.3rem;
    max-width: 900px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .nav-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 40px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 15px;
    border: 1px solid #eaeaea;
  }

  .tab-btn {
    padding: 12px 25px;
    background: white;
    border: 2px solid #3498db;
    border-radius: 30px;
    font-weight: 600;
    color: #3498db;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .tab-btn:hover {
    background: #3498db;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }

  .tab-btn.active {
    background: #3498db;
    color: white;
  }

  .tab-content {
    display: none;
    animation: fadeIn 0.5s ease;
  }

  .tab-content.active {
    display: block;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .section-title {
    color: var(--primary);
    margin: 50px 0 30px 0;
    padding-bottom: 15px;
    border-bottom: 3px solid #3498db;
    font-size: 2.2rem;
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

  .rule-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-left: 6px solid #3498db;
    transition: transform 0.3s ease;
  }

  .rule-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  .rule-number {
    display: inline-block;
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 20px;
    box-shadow: 0 6px 15px rgba(52, 152, 219, 0.3);
  }

  .rule-title {
    font-weight: 700;
    margin-bottom: 15px;
    color: #2c3e50;
    font-size: 1.5rem;
  }

  .example-box {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    margin-top: 20px;
    border: 1px solid #eaeaea;
  }

  .arabic-text {
    font-size: 2.2rem;
    direction: rtl;
    text-align: right;
    margin-bottom: 15px;
    line-height: 1.8;
    font-weight: bold;
  }

  .phonetic {
    color: #e74c3c;
    font-size: 1.2rem;
    margin-bottom: 10px;
    font-style: italic;
  }

  .translation {
    color: #27ae60;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .highlight {
    background: rgba(52, 152, 219, 0.15);
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 700;
    color: #2c3e50;
    border: 1px solid rgba(52, 152, 219, 0.3);
  }

  .warning {
    background: rgba(243, 156, 18, 0.15);
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #f39c12;
  }

  .success {
    background: rgba(39, 174, 96, 0.15);
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #27ae60;
  }

  .letter-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(120px, 1fr)
    );
    gap: 15px;
    margin: 30px 0;
  }

  .letter-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .letter-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #3498db;
  }

  .letter-arabic {
    font-size: 3rem;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .letter-name {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .letter-sound {
    color: #e74c3c;
    font-size: 0.9rem;
  }

  .connectors {
    background: linear-gradient(135deg, #f8f9fa, #e8f4fc);
    padding: 30px;
    border-radius: 15px;
    margin: 30px 0;
  }

  .connector-example {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
  }

  .letter-form {
    display: inline-block;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    text-align: center;
    min-width: 80px;
  }

  .form-label {
    font-size: 0.8rem;
    color: #7f8c8d;
    margin-bottom: 5px;
  }

  .form-arabic {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .arrow {
    font-size: 2rem;
    color: #3498db;
  }

  .practice-section {
    background: linear-gradient(135deg, #e8f4fc, #d4e7f7);
    padding: 40px;
    border-radius: 15px;
    margin: 50px 0;
    border: 1px solid rgba(52, 152, 219, 0.2);
  }

  .practice-title {
    text-align: center;
    margin-bottom: 30px;
    color: #2c5a7a;
    font-size: 2rem;
  }

  .practice-exercise {
    background: white;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .input-group {
    margin: 20px 0;
  }

  .input-label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #2c3e50;
  }

  .arabic-input {
    width: 100%;
    padding: 15px;
    font-size: 1.8rem;
    text-align: right;
    direction: rtl;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-family: "Segoe UI", Arial, sans-serif;
  }

  .arabic-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }

  .check-btn {
    background: #27ae60;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 15px;
  }

  .check-btn:hover {
    background: #219653;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
  }

  .result {
    margin-top: 15px;
    padding: 15px;
    border-radius: 8px;
    font-weight: 600;
  }

  .correct {
    background: rgba(39, 174, 96, 0.15);
    color: #27ae60;
    border-left: 4px solid #27ae60;
  }

  .incorrect {
    background: rgba(231, 76, 60, 0.15);
    color: #e74c3c;
    border-left: 4px solid #e74c3c;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
  }

  .comparison-table th {
    background-color: #3498db;
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: 600;
  }

  .comparison-table td {
    padding: 20px;
    border-bottom: 1px solid #eaeaea;
    text-align: center;
  }

  .comparison-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .comparison-table tr:hover {
    background-color: #f0f7ff;
  }

  .comparison-arabic {
    font-size: 1.8rem;
    direction: rtl;
  }

  .common-mistakes {
    background: linear-gradient(135deg, #fef2e8, #fdebd0);
    padding: 40px;
    border-radius: 15px;
    margin: 50px 0;
    border: 1px solid rgba(243, 156, 18, 0.2);
  }

  .mistake-item {
    background: white;
    padding: 25px;
    border-radius: 10px;
    margin-bottom: 20px;
    border-left: 4px solid #e74c3c;
  }

  .incorrect-example {
    color: #e74c3c;
    font-weight: bold;
    font-size: 1.8rem;
    direction: rtl;
  }

  .correct-example {
    color: #27ae60;
    font-weight: bold;
    font-size: 1.8rem;
    direction: rtl;
  }

  .quick-tips {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 25px;
    margin: 40px 0;
  }

  .tip-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    border-top: 5px solid #3498db;
  }

  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #3498db;
  }

  .tip-title {
    font-weight: 700;
    margin-bottom: 15px;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  footer {
    text-align: center;
    margin-top: 60px;
    padding-top: 40px;
    border-top: 3px solid rgba(52, 152, 219, 0.2);
    color: var(--text-secondary);
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }

    h1 {
      font-size: 2.2rem;
    }

    .arabic-text {
      font-size: 1.8rem;
    }

    .letter-grid {
      grid-template-columns: repeat(
        auto-fill,
        minmax(100px, 1fr)
      );
    }

    .quick-tips {
      grid-template-columns: 1fr;
    }

    .nav-tabs {
      flex-direction: column;
      align-items: center;
    }

    .tab-btn {
      width: 100%;
      max-width: 300px;
    }
  }
</style>
