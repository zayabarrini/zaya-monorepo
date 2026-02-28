<script>
  import Letters from "./Letters.svelte";
  import Alphabet from "./Alphabet.svelte";
  import Numbers from "./Numbers.svelte";
</script>

<svelte:head>
  <title>Arabic Spelling Mastery - Complete Guide</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <script>
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        const arabicInput =
          document.getElementById("arabicInput");
        const analyzeBtn =
          document.getElementById("analyzeBtn");
        const exampleBtn =
          document.getElementById("exampleBtn");
        const resultArea =
          document.getElementById("resultArea");
        const resultWord =
          document.getElementById("resultWord");
        const letterBreakdown = document.getElementById(
          "letterBreakdown"
        );
        const pronunciation =
          document.getElementById("pronunciation");
        const patternInfo =
          document.getElementById("patternInfo");

        // Example words database
        const examples = {
          كتاب: {
            letters: [
              { char: "ك", name: "Kāf", sound: "/k/" },
              { char: "ت", name: "Tāʾ", sound: "/t/" },
              {
                char: "ا",
                name: "Alif",
                sound: "/ā/ (long vowel)"
              },
              { char: "ب", name: "Bāʾ", sound: "/b/" }
            ],
            pronunciation: "/kitāb/",
            pattern: "Noun pattern فِعَال",
            meaning: "Book"
          },
          مدرسة: {
            letters: [
              { char: "م", name: "Mīm", sound: "/m/" },
              { char: "د", name: "Dāl", sound: "/d/" },
              { char: "ر", name: "Rāʾ", sound: "/r/" },
              { char: "س", name: "Sīn", sound: "/s/" },
              {
                char: "ة",
                name: "Tāʾ marbūṭa",
                sound: "/a/ (feminine ending)"
              }
            ],
            pronunciation: "/madrasa/",
            pattern: "Noun pattern مَفْعَلَة",
            meaning: "School"
          },
          انحرافي: {
            letters: [
              {
                char: "ا",
                name: "Hamza + Alif",
                sound: "/i/ (form VII prefix)"
              },
              { char: "ن", name: "Nūn", sound: "/n/" },
              { char: "ح", name: "Ḥāʾ", sound: "/ḥ/" },
              { char: "ر", name: "Rāʾ", sound: "/r/" },
              {
                char: "ا",
                name: "Alif",
                sound: "/ā/ (long vowel)"
              },
              { char: "ف", name: "Fāʾ", sound: "/f/" },
              {
                char: "ي",
                name: "Yāʾ",
                sound: "/iyy/ (nisba ending)"
              }
            ],
            pronunciation: "/inḥirāfiyy/",
            pattern: "Form VII + Nisba (اِنْفِعَالِيّ)",
            meaning: "Deviant (adjective)"
          },
          يكتب: {
            letters: [
              {
                char: "ي",
                name: "Yāʾ",
                sound: "/ya/ (prefix)"
              },
              { char: "ك", name: "Kāf", sound: "/k/" },
              { char: "ت", name: "Tāʾ", sound: "/t/" },
              { char: "ب", name: "Bāʾ", sound: "/bu/" }
            ],
            pronunciation: "/yaktubu/",
            pattern: "Present tense verb (يَفْعُلُ)",
            meaning: "He writes"
          }
        };

        function analyzeWord(word) {
          if (!word.trim()) return;

          // Check if it's in our examples
          if (examples[word]) {
            const example = examples[word];
            displayResult(word, example);
            return;
          }

          // Generic analysis for unknown words
          const letters = [];
          for (let char of word) {
            let letterInfo = {
              char: char,
              name: getLetterName(char),
              sound: getLetterSound(char)
            };
            letters.push(letterInfo);
          }

          const genericResult = {
            letters: letters,
            pronunciation: guessPronunciation(word),
            pattern: guessPattern(word),
            meaning: "Unknown - needs context"
          };

          displayResult(word, genericResult);
        }

        function getLetterName(char) {
          const letterNames = {
            ا: "Alif",
            ب: "Bāʾ",
            ت: "Tāʾ",
            ث: "Thāʾ",
            ج: "Jīm",
            ح: "Ḥāʾ",
            خ: "Khāʾ",
            د: "Dāl",
            ذ: "Dhāl",
            ر: "Rāʾ",
            ز: "Zāy",
            س: "Sīn",
            ش: "Shīn",
            ص: "Ṣād",
            ض: "Ḍād",
            ط: "Ṭāʾ",
            ظ: "Ẓāʾ",
            ع: "ʿAyn",
            غ: "Ghayn",
            ف: "Fāʾ",
            ق: "Qāf",
            ك: "Kāf",
            ل: "Lām",
            م: "Mīm",
            ن: "Nūn",
            ه: "Hāʾ",
            و: "Wāw",
            ي: "Yāʾ",
            ء: "Hamza",
            ة: "Tāʾ marbūṭa",
            ى: "Alif maqṣūra"
          };
          return letterNames[char] || "Unknown letter";
        }

        function getLetterSound(char) {
          const sounds = {
            ا: "/ā/ or glottal stop",
            ب: "/b/",
            ت: "/t/",
            ث: "/θ/",
            ج: "/dʒ/",
            ح: "/ħ/",
            خ: "/x/",
            د: "/d/",
            ذ: "/ð/",
            ر: "/r/",
            ز: "/z/",
            س: "/s/",
            ش: "/ʃ/",
            ص: "/sˤ/",
            ض: "/dˤ/",
            ط: "/tˤ/",
            ظ: "/ðˤ/",
            ع: "/ʕ/",
            غ: "/ɣ/",
            ف: "/f/",
            ق: "/q/",
            ك: "/k/",
            ل: "/l/",
            م: "/m/",
            ن: "/n/",
            ه: "/h/",
            و: "/w/ or /ū/",
            ي: "/j/ or /ī/",
            ة: "Feminine ending"
          };
          return sounds[char] || "Varies by context";
        }

        function guessPronunciation(word) {
          // Very basic pronunciation guess
          if (word.startsWith("ا") && word.length > 3) {
            return (
              "/in" +
              word.substring(1, 3) +
              "ā" +
              word.substring(4) +
              "/ (Form VII guess)"
            );
          }
          if (word.endsWith("ي")) {
            return "/...iyy/ (可能 nisba adjective)";
          }
          return "/.../ (Unknown - needs vowel marks)";
        }

        function guessPattern(word) {
          if (word.endsWith("ي") && word.length > 3) {
            return "Possibly nisba adjective (ـِيّ) or possessive (ـِي)";
          }
          if (word.startsWith("ي") && word.length === 4) {
            return "Possibly present tense verb (يَفْعُلُ)";
          }
          if (
            word.startsWith("ا") &&
            word[1] === "ن" &&
            word.length > 4
          ) {
            return "Possibly Form VII (اِنْفِعَال)";
          }
          return "Unknown pattern - needs context";
        }

        function displayResult(word, data) {
          resultWord.textContent = word;

          // Build letter breakdown
          let breakdownHTML =
            '<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">';
          data.letters.forEach((letter) => {
            breakdownHTML += `
                        <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; min-width: 80px;">
                            <div style="font-size: 2em; text-align: center;">${letter.char}</div>
                            <div style="font-size: 0.9em; text-align: center;">
                                <strong>${letter.name}</strong><br>
                                ${letter.sound}
                            </div>
                        </div>
                    `;
          });
          breakdownHTML += "</div>";
          letterBreakdown.innerHTML = breakdownHTML;

          pronunciation.innerHTML = `<strong>${data.pronunciation}</strong>`;
          patternInfo.innerHTML = `<strong>${data.pattern}</strong><br>Meaning: ${data.meaning}`;

          resultArea.style.display = "block";
        }

        analyzeBtn.addEventListener("click", () => {
          analyzeWord(arabicInput.value);
        });

        exampleBtn.addEventListener("click", () => {
          const words = Object.keys(examples);
          const randomWord =
            words[Math.floor(Math.random() * words.length)];
          arabicInput.value = randomWord;
          analyzeWord(randomWord);
        });

        arabicInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            analyzeWord(arabicInput.value);
          }
        });

        // Show initial example
        arabicInput.value = "انحرافي";
        setTimeout(() => analyzeWord("انحرافي"), 500);
      }
    );
  </script>
</svelte:head>

<div class="container mainpage">
  <div class="container">
    <header>
      <h1>Arabic Spelling Mastery</h1>
      <p class="subtitle">
        Complete Guide to Letters, Vowels, and Word
        Structure
      </p>
      <div class="tip">
        <strong>Key Insight:</strong> Arabic spelling combines
        constant letters with variable vowels. Learn the system,
        not just memorization!
      </div>
    </header>

    <!-- Arabic Alphabet Section -->
    <div class="section">
      <h2 class="section-title">
        The Arabic Alphabet (28 Letters)
      </h2>
      <p
        style="text-align: center; margin-bottom: 25px; color: #666;"
      >
        Each letter has 4 forms: Isolated, Initial, Medial,
        Final. Names are based on the isolated form.
      </p>

      <div class="grid">
        <div class="card letter-card">
          <div class="letter-display">ا</div>
          <div class="letter-name">Alif</div>
          <div class="letter-info">
            Long vowel /ā/<br />No dots
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ب</div>
          <div class="letter-name">Bāʾ</div>
          <div class="letter-info">
            One dot below<br />/b/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ت</div>
          <div class="letter-name">Tāʾ</div>
          <div class="letter-info">
            Two dots above<br />/t/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ث</div>
          <div class="letter-name">Thāʾ</div>
          <div class="letter-info">
            Three dots above<br />/θ/ (th in "think")
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ج</div>
          <div class="letter-name">Jīm</div>
          <div class="letter-info">
            One dot below<br />/dʒ/ (j in "jam")
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ح</div>
          <div class="letter-name">Ḥāʾ</div>
          <div class="letter-info">
            No dots<br />/ħ/ (emphatic h)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">خ</div>
          <div class="letter-name">Khāʾ</div>
          <div class="letter-info">
            One dot above<br />/x/ (ch in "Bach")
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">د</div>
          <div class="letter-name">Dāl</div>
          <div class="letter-info">
            No dots<br />/d/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ذ</div>
          <div class="letter-name">Dhāl</div>
          <div class="letter-info">
            One dot above<br />/ð/ (th in "this")
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ر</div>
          <div class="letter-name">Rāʾ</div>
          <div class="letter-info">
            No dots<br />/r/ sound (trilled)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ز</div>
          <div class="letter-name">Zāy</div>
          <div class="letter-info">
            One dot above<br />/z/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">س</div>
          <div class="letter-name">Sīn</div>
          <div class="letter-info">
            Three dots (eventually)<br />/s/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ش</div>
          <div class="letter-name">Shīn</div>
          <div class="letter-info">
            Three dots above<br />/ʃ/ (sh in "ship")
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ص</div>
          <div class="letter-name">Ṣād</div>
          <div class="letter-info">
            No dots<br />/sˤ/ (emphatic s)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ض</div>
          <div class="letter-name">Ḍād</div>
          <div class="letter-info">
            One dot above<br />/dˤ/ (emphatic d)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ط</div>
          <div class="letter-name">Ṭāʾ</div>
          <div class="letter-info">
            Two dots above? No, none!<br />/tˤ/ (emphatic t)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ظ</div>
          <div class="letter-name">Ẓāʾ</div>
          <div class="letter-info">
            One dot above? Actually, check!<br />/ðˤ/
            (emphatic dh)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ع</div>
          <div class="letter-name">ʿAyn</div>
          <div class="letter-info">
            No dots<br />/ʕ/ (pharyngeal voiced)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">غ</div>
          <div class="letter-name">Ghayn</div>
          <div class="letter-info">
            One dot above<br />/ɣ/ (French r)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ف</div>
          <div class="letter-name">Fāʾ</div>
          <div class="letter-info">
            One dot above<br />/f/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ق</div>
          <div class="letter-name">Qāf</div>
          <div class="letter-info">
            Two dots above<br />/q/ (uvular k)
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ك</div>
          <div class="letter-name">Kāf</div>
          <div class="letter-info">
            Special form<br />/k/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ل</div>
          <div class="letter-name">Lām</div>
          <div class="letter-info">
            No dots<br />/l/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">م</div>
          <div class="letter-name">Mīm</div>
          <div class="letter-info">
            No dots<br />/m/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ن</div>
          <div class="letter-name">Nūn</div>
          <div class="letter-info">
            One dot above<br />/n/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ه</div>
          <div class="letter-name">Hāʾ</div>
          <div class="letter-info">
            No dots<br />/h/ sound
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">و</div>
          <div class="letter-name">Wāw</div>
          <div class="letter-info">
            No dots<br />/w/ or /ū/
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ي</div>
          <div class="letter-name">Yāʾ</div>
          <div class="letter-info">
            Two dots below<br />/j/ or /ī/
          </div>
        </div>
        <div class="card letter-card">
          <div class="letter-display">ء</div>
          <div class="letter-name">Hamza</div>
          <div class="letter-info">
            Glottal stop<br />/ʔ/
          </div>
        </div>
      </div>

      <div class="tip">
        <strong>Pattern Recognition:</strong> Dots distinguish
        similar shapes! ب ت ث all have same base shape, different
        dots.
      </div>
    </div>

    <!-- Vowels and Diacritics Section -->
    <div class="section">
      <h2 class="section-title">
        Vowels & Diacritics (تَشْكِيل)
      </h2>
      <p
        style="text-align: center; margin-bottom: 25px; color: #666;"
      >
        Short vowels are written as marks above/below
        letters. Usually omitted in everyday writing.
      </p>

      <div class="vowel-system">
        <div class="vowel-item">
          <div class="vowel-symbol">ـَ</div>
          <div class="letter-name">Fatḥa</div>
          <div class="letter-info">
            Short /a/<br />Above the letter
          </div>
        </div>
        <div class="vowel-item">
          <div class="vowel-symbol">ـِ</div>
          <div class="letter-name">Kasra</div>
          <div class="letter-info">
            Short /i/<br />Below the letter
          </div>
        </div>
        <div class="vowel-item">
          <div class="vowel-symbol">ـُ</div>
          <div class="letter-name">Ḍamma</div>
          <div class="letter-info">
            Short /u/<br />Above the letter
          </div>
        </div>
        <div class="vowel-item">
          <div class="vowel-symbol">ـْ</div>
          <div class="letter-name">Sukūn</div>
          <div class="letter-info">
            No vowel<br />Circle above letter
          </div>
        </div>
        <div class="vowel-item">
          <div class="vowel-symbol">ّ</div>
          <div class="letter-name">Shadda</div>
          <div class="letter-info">
            Doubled letter<br />Like writing letter twice
          </div>
        </div>
        <div class="vowel-item">
          <div class="vowel-symbol">ٓ</div>
          <div class="letter-name">Madda</div>
          <div class="letter-info">
            Alif elongation<br />آ = /ʔā/
          </div>
        </div>
      </div>

      <div class="breakdown-demo">
        <h3
          style="color: var(--primary); margin-bottom: 20px;"
        >
          Example: كَتَبَ (He wrote)
        </h3>
        <div class="breakdown-grid">
          <div class="breakdown-letter">ك</div>
          <div class="breakdown-info">
            <span class="info-label">Kāf</span>
            Base letter /k/<br />
            <span class="highlight">Fatḥa above → /ka/</span
            >
          </div>

          <div class="breakdown-letter">ت</div>
          <div class="breakdown-info">
            <span class="info-label">Tāʾ</span>
            Base letter /t/<br />
            <span class="highlight">Fatḥa above → /ta/</span
            >
          </div>

          <div class="breakdown-letter">ب</div>
          <div class="breakdown-info">
            <span class="info-label">Bāʾ</span>
            Base letter /b/<br />
            <span class="highlight">Fatḥa above → /ba/</span
            >
          </div>
        </div>
        <div
          style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;"
        >
          <strong>Pronunciation:</strong> /ka-ta-ba/<br />
          <strong>Written without vowels:</strong> كتب<br />
          <strong>Written with vowels:</strong> كَتَبَ
        </div>
      </div>
    </div>

    <!-- Word Spelling Breakdown Section -->
    <div class="section">
      <h2 class="section-title">Word Spelling Breakdown</h2>

      <div class="pattern-example">
        <div class="pattern-card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Example 1: مُدَرِّس (Teacher)
          </h3>
          <div
            class="arabic"
            style="font-size: 2.5em; margin-bottom: 15px;"
          >
            مُدَرِّس
          </div>
          <div class="breakdown-demo">
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">م</div>
              <span
                ><strong>Mīm:</strong> Ḍamma
                <span class="vowel-symbol">(ـُ)</span> → /mu/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">د</div>
              <span
                ><strong>Dāl:</strong> Fatḥa
                <span class="vowel-symbol">(ـَ)</span> → /da/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ر</div>
              <span
                ><strong>Rāʾ:</strong> Shadda
                <span class="vowel-symbol">(ّ)</span>
                + Kasra
                <span class="vowel-symbol">(ـِ)</span>
                → /rri/ (doubled)</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px;"
            >
              <div class="breakdown-letter">س</div>
              <span
                ><strong>Sīn:</strong> Sukūn
                <span class="vowel-symbol">(ـْ)</span> → /s/ (no
                vowel)</span
              >
            </div>
          </div>
          <div
            style="margin-top: 15px; padding: 10px; background: var(--light); border-radius: 5px;"
          >
            <strong>Pattern:</strong> Form II active
            participle (مُفَعِّل)<br />
            <strong>Root:</strong> د ر س (to study)<br />
            <strong>Full:</strong> /mu-dar-ris/
          </div>
        </div>

        <div class="pattern-card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Example 2: اِنْحِرَافِيّ (Deviant)
          </h3>
          <div
            class="arabic"
            style="font-size: 2.5em; margin-bottom: 15px;"
          >
            اِنْحِرَافِيّ
          </div>
          <div class="breakdown-demo">
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ا</div>
              <span
                ><strong>Alif/Hamza:</strong> Kasra below (إِ)
                → /i/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ن</div>
              <span
                ><strong>Nūn:</strong> Sukūn
                <span class="vowel-symbol">(ـْ)</span> → /n/ (no
                vowel)</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ح</div>
              <span
                ><strong>Ḥāʾ:</strong> Kasra
                <span class="vowel-symbol">(ـِ)</span> → /ḥi/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ر</div>
              <span
                ><strong>Rāʾ:</strong> Long vowel ا after it →
                /rā/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
            >
              <div class="breakdown-letter">ف</div>
              <span
                ><strong>Fāʾ:</strong> Kasra
                <span class="vowel-symbol">(ـِ)</span> → /fi/</span
              >
            </div>
            <div
              style="display: flex; align-items: center; gap: 10px;"
            >
              <div class="breakdown-letter">ي</div>
              <span
                ><strong>Yāʾ:</strong> Shadda
                <span class="vowel-symbol">(ّ)</span>
                + Kasra
                <span class="vowel-symbol">(ـِ)</span>
                → /yiyy/ (nisba)</span
              >
            </div>
          </div>
          <div
            style="margin-top: 15px; padding: 10px; background: var(--light); border-radius: 5px;"
          >
            <strong>Pattern:</strong> Form VII + Nisba
            (اِنْفِعَالِيّ)<br />
            <strong>Root:</strong> ح ر ف (to deviate)<br />
            <strong>Full:</strong> /in-ḥi-rā-fiyy/<br />
            <strong>Without vowels:</strong> انحرافي
          </div>
        </div>
      </div>

      <div class="tip">
        <strong>Critical Insight:</strong> In everyday writing,
        only letters and long vowels appear. Short vowels must
        be inferred from context and word patterns!
      </div>
    </div>

    <!-- Interactive Practice Section -->
    <div class="interactive-area">
      <h2
        style="color: white; margin-bottom: 25px; text-align: center;"
      >
        Interactive Spelling Practice
      </h2>

      <div class="input-group">
        <input
          type="text"
          id="arabicInput"
          placeholder="اكتب كلمة عربية (Write an Arabic word)"
          dir="rtl"
        />
        <button id="analyzeBtn">Analyze Word</button>
        <button id="exampleBtn">Show Example</button>
      </div>

      <div
        class="result-area"
        id="resultArea"
        style="display: none;"
      >
        <div class="result-item">
          <div class="result-label">Word:</div>
          <div class="result-value" id="resultWord"></div>
        </div>
        <div class="result-item">
          <div class="result-label">Letter-by-Letter:</div>
          <div id="letterBreakdown"></div>
        </div>
        <div class="result-item">
          <div class="result-label">Pronunciation:</div>
          <div id="pronunciation"></div>
        </div>
        <div class="result-item">
          <div class="result-label">Pattern:</div>
          <div id="patternInfo"></div>
        </div>
      </div>
    </div>

    <!-- Common Patterns Section -->
    <div class="section">
      <h2 class="section-title">
        Common Spelling Patterns
      </h2>

      <div class="grid">
        <div class="card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Nisba Pattern (ـِيّ)
          </h3>
          <div class="arabic">
            مِصْرِيّ، عَرَبِيّ، أُمَرِيكِيّ
          </div>
          <p style="margin-top: 10px; color: #666;">
            <strong>Rule:</strong> Always kasra before ياء<br
            />
            <strong>Meaning:</strong> "Related to"<br />
            <strong>Example:</strong> مِصْر (Egypt) → مِصْرِيّ
            (Egyptian)
          </p>
        </div>

        <div class="card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Form I Verb (فَعَلَ)
          </h3>
          <div class="arabic">كَتَبَ، فَتَحَ، ضَرَبَ</div>
          <p style="margin-top: 10px; color: #666;">
            <strong>Pattern:</strong> فـَ عـَ لـَ<br />
            <strong>Default vowels:</strong> Fatḥa on each
            root letter<br />
            <strong>Meaning:</strong> Basic action
          </p>
        </div>

        <div class="card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Form II (فَعَّلَ)
          </h3>
          <div class="arabic">
            دَرَّسَ، كَسَّرَ، حَوَّلَ
          </div>
          <p style="margin-top: 10px; color: #666;">
            <strong>Pattern:</strong> Second root letter
            doubled<br />
            <strong>Mark:</strong> Shadda on second root<br
            />
            <strong>Meaning:</strong> Intensive/causative
          </p>
        </div>

        <div class="card">
          <h3
            style="color: var(--primary); margin-bottom: 15px;"
          >
            Form VII (اِنْفَعَلَ)
          </h3>
          <div class="arabic">
            اِنْكَسَرَ، اِنْطَلَقَ، اِنْحَرَفَ
          </div>
          <p style="margin-top: 10px; color: #666;">
            <strong>Pattern:</strong> اِنْ + first root with
            kasra<br />
            <strong>Meaning:</strong> Reflexive/passive<br
            />
            <strong>Example:</strong> اِنْحَرَفَ (to deviate)
          </p>
        </div>
      </div>
    </div>

    <!-- Tips and Conclusion -->
    <div class="section">
      <h2 class="section-title">Key Takeaways</h2>

      <div
        style="background: #e8f4fc; padding: 25px; border-radius: 10px;"
      >
        <h3
          style="color: var(--primary); margin-bottom: 15px;"
        >
          Essential Spelling Rules:
        </h3>
        <ul style="list-style: none; padding-left: 20px;">
          <li
            style="margin-bottom: 10px; padding-left: 25px; position: relative;"
          >
            <span
              style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;"
              >1</span
            >
            <strong>Consonants are always written</strong> – vowels
            are often omitted
          </li>
          <li
            style="margin-bottom: 10px; padding-left: 25px; position: relative;"
          >
            <span
              style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;"
              >2</span
            >
            <strong>Long vowels (ا و ي)</strong> appear as
            letters; short vowels
            <span class="vowel-symbol">(ـَ ـِ ـُ)</span> as marks
          </li>
          <li
            style="margin-bottom: 10px; padding-left: 25px; position: relative;"
          >
            <span
              style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;"
              >3</span
            >
            <strong>Word patterns determine vowels</strong> –
            learn patterns, not each word
          </li>
          <li
            style="margin-bottom: 10px; padding-left: 25px; position: relative;"
          >
            <span
              style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;"
              >4</span
            >
            <strong>Context reveals missing vowels</strong> –
            same spelling can have multiple readings
          </li>
          <li
            style="margin-bottom: 10px; padding-left: 25px; position: relative;"
          >
            <span
              style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;"
              >5</span
            >
            <strong>Dots distinguish letters</strong> – ب ت ث
            have same shape, different dots
          </li>
        </ul>

        <div class="tip" style="margin-top: 20px;">
          <strong>For انحرافي specifically:</strong> It follows
          the اِنْفِعَالِيّ pattern. The kasra on ف isn't optional
          – it's required by the nisba (ـِيّ) formation. Without
          it, you'd have انحراف + ي (my deviation) vs. انحرافي
          (deviant).
        </div>
      </div>
    </div>

    <footer>
      <p>
        Arabic Spelling Mastery Guide • Learn the system,
        not just memorization
      </p>
      <p>
        Tip: Practice reading fully voweled texts first,
        then gradually move to unvoweled texts
      </p>
    </footer>

    <Letters />
    <Alphabet />
    <Numbers />
  </div>
</div>

<style>
  :root {
    --primary: #2c3e50;
    --secondary: #3498db;
    --accent: #e74c3c;
    --success: #27ae60;
    --light: #ecf0f1;
    --dark: #2c3e50;
    --border: #bdc3c7;
    --highlight: #f1c40f;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    background: white;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h1 {
    color: var(--primary);
    font-size: 2.8em;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: #7f8c8d;
    font-size: 1.2em;
    margin-bottom: 20px;
  }

  .section {
    background: white;
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    color: var(--primary);
    font-size: 1.8em;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 3px solid var(--secondary);
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .section-title:before {
    content: "✓";
    background: var(--secondary);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .arabic {
    font-family:
      "Scheherazade", "Traditional Arabic", serif;
    font-size: 2em;
    direction: rtl;
    text-align: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 20px;
    margin-top: 20px;
  }

  .card {
    background: var(--light);
    border-radius: 10px;
    padding: 20px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    border-color: var(--secondary);
    box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);
  }

  .letter-card {
    text-align: center;
    padding: 25px 15px;
  }

  .letter-display {
    font-size: 4em;
    font-family: "Scheherazade", serif;
    margin-bottom: 15px;
    color: var(--primary);
  }

  .letter-name {
    font-size: 1.2em;
    font-weight: bold;
    color: var(--dark);
    margin-bottom: 5px;
  }

  .letter-info {
    color: #666;
    font-size: 0.9em;
  }

  .vowel-system {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .vowel-item {
    text-align: center;
    padding: 20px;
    background: linear-gradient(
      135deg,
      #f5f7fa 0%,
      #c3cfe2 100%
    );
    border-radius: 10px;
    min-width: 120px;
  }

  .vowel-symbol {
    font-size: 2em;
    margin-bottom: 10px;
    font-family:
      "Noto Naskh Arabic", "Scheherazade New",
      "Traditional Arabic", serif;
    font-feature-settings:
      "calt" 1,
      "liga" 1;
    unicode-bidi: plaintext;
  }

  .breakdown-demo {
    background: #f8f9fa;
    border-radius: 10px;
    padding: 25px;
    margin: 25px 0;
    border-left: 5px solid var(--success);
  }

  .breakdown-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 15px;
    align-items: center;
  }

  .breakdown-letter {
    font-size: 2.5em;
    font-family: "Scheherazade", serif;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
    border: 2px solid var(--border);
  }

  .breakdown-info {
    padding: 10px;
  }

  .info-label {
    font-weight: bold;
    color: var(--primary);
    display: block;
    margin-bottom: 5px;
  }

  .interactive-area {
    background: linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );
    border-radius: 15px;
    padding: 30px;
    color: white;
    margin-top: 30px;
  }

  .input-group {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    flex-wrap: wrap;
  }

  input[type="text"] {
    flex: 1;
    min-width: 200px;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-size: 1.1em;
    font-family: "Scheherazade", serif;
    text-align: center;
    direction: rtl;
  }

  button {
    background: white;
    color: #667eea;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
  }

  .result-area {
    background: rgba(255, 255, 255, 0.1);
    padding: 25px;
    border-radius: 10px;
    margin-top: 20px;
  }

  .result-item {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .result-label {
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--highlight);
  }

  .result-value {
    font-family: "Scheherazade", serif;
    font-size: 1.8em;
    direction: rtl;
  }

  .pattern-card {
    background: linear-gradient(
      135deg,
      #a1c4fd 0%,
      #c2e9fb 100%
    );
    padding: 20px;
    border-radius: 10px;
    margin: 15px 0;
  }

  .pattern-example {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 20px;
    margin-top: 20px;
  }

  footer {
    text-align: center;
    padding: 20px;
    color: white;
    margin-top: 40px;
  }

  .highlight {
    background: var(--highlight);
    color: var(--dark);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  .tip {
    background: #e8f4fc;
    border-left: 4px solid var(--secondary);
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .vowel-system {
      flex-direction: column;
      align-items: center;
    }

    .input-group {
      flex-direction: column;
    }

    input[type="text"] {
      min-width: 100%;
    }
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .arabic {
      font-size: 1.5em;
    }

    h1 {
      font-size: 2em;
    }
  }
</style>
