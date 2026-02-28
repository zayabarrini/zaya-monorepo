import{A as d,a as e,D as n,f as s,I as v,z as c,$ as o}from"../chunks/-0HexQLS.js";var g=v(s(`<meta charset="UTF-8" class="svelte-1fgkdj2"/> <meta name="viewport" content="width=device-width, initial-scale=1.0" class="svelte-1fgkdj2"/> <link rel="preconnect" href="https://fonts.googleapis.com" class="svelte-1fgkdj2"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" class="svelte-1fgkdj2"/> <link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&amp;family=Open+Sans:ital,wght@0,300..800;1,300..800&amp;family=Satisfy&amp;display=swap&amp;subset=arabic" rel="stylesheet" class="svelte-1fgkdj2"/> <script class="svelte-1fgkdj2">
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
            demoOutput.innerHTML = \`<span class="arabic-text">\${example.sentence}</span>\`;
            demoTranslation.textContent =
              example.translation;
          });
        });
      }
    );
  <\/script>`,1)),r=s(`<div class="container mainpage svelte-1fgkdj2"><h1 class="subtitle svelte-1fgkdj2">Understanding Case Endings (إعراب) Through Color-Coded
    Examples</h1> <div class="legend svelte-1fgkdj2"><div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--nominative);"></div> <span class="svelte-1fgkdj2">Nominative (ـُ / رَفْع)</span></div> <div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--accusative);"></div> <span class="svelte-1fgkdj2">Accusative (ـَ / نَصْب)</span></div> <div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--genitive);"></div> <span class="svelte-1fgkdj2">Genitive (ـِ / جَرّ)</span></div> <div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--indicative);"></div> <span class="svelte-1fgkdj2">Indicative Mood (ـُ)</span></div> <div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--subjunctive);"></div> <span class="svelte-1fgkdj2">Subjunctive Mood (ـَ)</span></div> <div class="legend-item svelte-1fgkdj2"><div class="color-box svelte-1fgkdj2" style="background-color: var(--jussive);"></div> <span class="svelte-1fgkdj2">Jussive Mood (ـْ)</span></div></div> <div class="section svelte-1fgkdj2"><h2 class="section-title svelte-1fgkdj2">Noun Cases - Same Word, Different Positions</h2> <div class="example-grid svelte-1fgkdj2"><div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">جَاءَ <span class="highlight nominative-bg svelte-1fgkdj2">الرَّجُلُ</span> إِلَى الْحَدِيقَةِ</div> <div class="translation svelte-1fgkdj2">The man came to the garden</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Nominative (ـُ):</strong> Subject of the
          verb جَاءَ<br class="svelte-1fgkdj2"/> Position: Doer of the action</div></div> <div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">رَأَيْتُ <span class="highlight accusative-bg svelte-1fgkdj2">الرَّجُلَ</span> فِي الْحَدِيقَةِ</div> <div class="translation svelte-1fgkdj2">I saw the man in the garden</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Accusative (ـَ):</strong> Object of the
          verb رَأَيْتُ<br class="svelte-1fgkdj2"/> Position: Receiver of the action</div></div> <div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">سَلَّمْتُ عَلَى <span class="highlight genitive-bg svelte-1fgkdj2">الرَّجُلِ</span> فِي الْحَدِيقَةِ</div> <div class="translation svelte-1fgkdj2">I greeted the man in the garden</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Genitive (ـِ):</strong> After preposition
          عَلَى<br class="svelte-1fgkdj2"/> Rule: Prepositions force genitive case</div></div></div></div> <div class="section svelte-1fgkdj2"><h2 class="section-title svelte-1fgkdj2">Effect of Particles on Case</h2> <div class="example-grid svelte-1fgkdj2"><div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2"><span class="highlight nominative-bg svelte-1fgkdj2">الوَلَدُ</span> ذَكِيٌّ</div> <div class="translation svelte-1fgkdj2">The boy is smart</div> <div class="grammar-note svelte-1fgkdj2">Normal subject case (مبتدأ) → Nominative</div></div> <div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">إِنَّ <span class="highlight accusative-bg svelte-1fgkdj2">الوَلَدَ</span> ذَكِيٌّ</div> <div class="translation svelte-1fgkdj2">Verily the boy is smart</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Rule:</strong> إِنَّ makes its subject accusative</div></div></div> <div class="grammar-note svelte-1fgkdj2" style="margin-top: 20px;"><strong class="svelte-1fgkdj2">Key Particles that Affect Case:</strong> <ul class="rule-list svelte-1fgkdj2"><li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">إِنَّ / أَنَّ / كَأَنَّ / لَكِنَّ</strong> →
          Make subject accusative</li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">كَانَ / أَصْبَحَ / ظَلَّ</strong> → Make predicate
          nominative</li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">لَيْسَ</strong> → Makes predicate accusative</li></ul></div></div> <div class="section svelte-1fgkdj2"><h2 class="section-title svelte-1fgkdj2">Verb Mood Endings</h2> <div class="example-grid svelte-1fgkdj2"><div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">هُوَ <span class="highlight indicative-bg svelte-1fgkdj2">يَكْتُبُ</span> الرِّسَالَةَ الْيَوْمَ</div> <div class="translation svelte-1fgkdj2">He is writing the letter today</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Indicative (ـُ):</strong> Default mood for statements</div></div> <div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">يُرِيدُ أَنْ <span class="highlight subjunctive-bg svelte-1fgkdj2">يَكْتُبَ</span> الرِّسَالَةَ</div> <div class="translation svelte-1fgkdj2">He wants to write the letter</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Subjunctive (ـَ):</strong> After أَنْ / لِـ
          / كَيْ</div></div> <div class="example-card svelte-1fgkdj2"><div class="arabic-text svelte-1fgkdj2">لَمْ <span class="highlight jussive-bg svelte-1fgkdj2">يَكْتُبْ</span> الرِّسَالَةَ أَمْسِ</div> <div class="translation svelte-1fgkdj2">He did not write the letter yesterday</div> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Jussive (ـْ):</strong> After لَمْ / لَمَّا /
          لا الناهية</div></div></div></div> <div class="interactive-demo svelte-1fgkdj2"><h3 class="demo-title svelte-1fgkdj2">Interactive Demo: Watch the Ending Change</h3> <div class="demo-controls svelte-1fgkdj2"><button class="demo-btn active svelte-1fgkdj2" data-case="nominative">Subject (Nominative)</button> <button class="demo-btn svelte-1fgkdj2" data-case="accusative">Object (Accusative)</button> <button class="demo-btn svelte-1fgkdj2" data-case="genitive">After Preposition (Genitive)</button></div> <div class="demo-output svelte-1fgkdj2" id="demoOutput"><span class="arabic-text svelte-1fgkdj2">جاء <span id="dynamicWord" class="highlight nominative-bg svelte-1fgkdj2">الطَّالِبُ</span> إلى الجامعة</span></div> <div class="translation svelte-1fgkdj2" id="demoTranslation" style="color: white; border-color: rgba(255,255,255,0.3);">The student came to the university</div></div> <div class="section svelte-1fgkdj2"><h2 class="section-title svelte-1fgkdj2">Quick Reference Rules</h2> <div class="grammar-note svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Noun Endings Depend On:</strong> <ul class="rule-list svelte-1fgkdj2"><li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Subject → Nominative (ـُ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Object → Accusative (ـَ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">After preposition → Genitive (ـِ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">After إضافة (possession) → Genitive (ـِ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Adjectives match their noun's case</strong></li></ul> <strong class="svelte-1fgkdj2">Verb Endings Depend On:</strong> <ul class="rule-list svelte-1fgkdj2"><li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">Normal statement → Indicative (ـُ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">After أَنْ / لِ / كَيْ → Subjunctive (ـَ)</strong></li> <li class="svelte-1fgkdj2"><strong class="svelte-1fgkdj2">After لَمْ / لَمَّا / لا الناهية → Jussive (ـْ)</strong></li></ul></div></div> <footer class="svelte-1fgkdj2"><p class="svelte-1fgkdj2">Arabic Grammar Visual Guide • Case endings follow
      grammatical rules, not randomness</p> <p class="svelte-1fgkdj2">Tip: Focus on learning the rules, not memorizing each
      word's ending individually</p></footer></div>`);function j(t){var a=r();d("1fgkdj2",l=>{var i=g();c(10),n(()=>{o.title="Arabic Grammatical Endings - Visual Guide"}),e(l,i)}),e(t,a)}export{j as component};
