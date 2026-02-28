import { h as head, j as ensure_array_like, i as escape_html, k as html, a as attr_class, c as clsx } from "../../../../../chunks/vendor-svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const examples = [
      {
        id: 1,
        arabic: "يعطيني الكتاب",
        translation: "He gives me the book. / He gives the book to me.",
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
          verbStructure: "أعط (root: give) + ـيت (I - past tense suffix) = 'I gave'",
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
        description: "When both direct and indirect object pronouns attach to a verb, the <span class='direct-obj'>direct object pronoun</span> comes immediately after the verb root, followed by the <span class='indirect-obj'>indirect object pronoun</span>."
      },
      {
        number: 2,
        title: "Order Cannot Be Reversed",
        description: "The sequence is fixed: Verb + <span class='direct-obj'>Direct Object Pronoun</span> + <span class='indirect-obj'>Indirect Object Pronoun</span>. Reversing this order creates ungrammatical structures."
      },
      {
        number: 3,
        title: "Phonetic Adjustments",
        description: "When certain pronouns combine, phonetic adjustments occur (e.g., <span class='highlight'>ه + ها → هاها</span> becomes <span class='highlight'>هَا</span> with vowel lengthening)."
      },
      {
        number: 4,
        title: "Prepositional Pronouns as Indirect Objects",
        description: "Indirect object pronouns often derive from prepositional pronouns (لـ + pronoun → له، لها، لنا etc.) but attach directly to the verb without the preposition."
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
    head("1r6cqqu", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Arabic Pronominal Composition - Direct &amp; Indirect
    Object Pronouns</title>`);
      });
      $$renderer3.push(`<meta charset="UTF-8" class="svelte-1r6cqqu"/> <meta name="viewport" content="width=device-width, initial-scale=1.0" class="svelte-1r6cqqu"/>`);
    });
    $$renderer2.push(`<div class="container mainpage svelte-1r6cqqu"><header class="svelte-1r6cqqu"><h1 class="svelte-1r6cqqu">Arabic Pronominal Composition</h1> <p class="subtitle svelte-1r6cqqu">Direct and Indirect Object Pronouns with Transitive
      Verbs - Color-Coded Morphological Analysis</p></header> <div class="legend-container svelte-1r6cqqu"><div class="legend-box svelte-1r6cqqu"><div class="legend-title morphology-title svelte-1r6cqqu">Morphological Elements</div> <div class="legend-grid svelte-1r6cqqu"><div class="legend-item svelte-1r6cqqu"><div class="legend-color prefix-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Prefix (بادئة)</span></div> <div class="legend-item svelte-1r6cqqu"><div class="legend-color suffix-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Suffix (لاحقة)</span></div> <div class="legend-item svelte-1r6cqqu"><div class="legend-color verb-root-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Verb Root (جذر الفعل)</span></div> <div class="legend-item svelte-1r6cqqu"><div class="legend-color pronoun-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Pronoun (ضمير)</span></div> <div class="legend-item svelte-1r6cqqu"><div class="legend-color direct-obj-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Direct Object (مفعول به مباشر)</span></div> <div class="legend-item svelte-1r6cqqu"><div class="legend-color indirect-obj-color svelte-1r6cqqu"></div> <span class="svelte-1r6cqqu">Indirect Object (مفعول به غير مباشر)</span></div></div></div> <div class="legend-box svelte-1r6cqqu"><div class="legend-title pronoun-title svelte-1r6cqqu">Object Pronouns Chart</div> <div class="pronoun-grid svelte-1r6cqqu"><!--[-->`);
    const each_array = ensure_array_like(pronouns);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let pronoun = each_array[$$index];
      $$renderer2.push(`<div class="pronoun-item svelte-1r6cqqu">${escape_html(pronoun)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div style="margin-top: 15px; font-size: 0.9rem; color: #7f8c8d;" class="svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Note:</strong> Pronouns attach directly to verbs
        as suffixes</div></div></div> <div class="rules-section svelte-1r6cqqu"><h3 style="color: #2c3e50; margin-bottom: 25px;" class="svelte-1r6cqqu">Rules of Pronominal Composition in Arabic</h3> <!--[-->`);
    const each_array_1 = ensure_array_like(rules);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let rule = each_array_1[$$index_1];
      $$renderer2.push(`<div class="rule-item svelte-1r6cqqu"><div class="rule-title svelte-1r6cqqu"><span class="rule-number svelte-1r6cqqu">${escape_html(rule.number)}</span> ${escape_html(rule.title)}</div> <p class="svelte-1r6cqqu">${html(rule.description)}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <h2 class="section-title svelte-1r6cqqu">Single Object Pronoun Examples</h2> <div class="examples-container svelte-1r6cqqu"><!--[-->`);
    const each_array_2 = ensure_array_like(examples.slice(0, 2));
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let example = each_array_2[$$index_3];
      $$renderer2.push(`<div class="example-card svelte-1r6cqqu"><div class="example-number svelte-1r6cqqu">${escape_html(example.id)}</div> <div class="example-arabic svelte-1r6cqqu"><!--[-->`);
      const each_array_3 = ensure_array_like(example.components);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let component = each_array_3[$$index_2];
        if (component.type) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span${attr_class(clsx(component.type), "svelte-1r6cqqu")}>${escape_html(component.text)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${escape_html(component.text)}`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="example-translation svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Translation:</strong> ${escape_html(example.translation)}</div> <div class="analysis-container svelte-1r6cqqu"><div class="analysis-title svelte-1r6cqqu">Analysis:</div> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Direct Object:</strong> ${html(example.analysis.direct)}</div> <div class="analysis-detail indirect-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Indirect Object:</strong> ${html(example.analysis.indirect)}</div> <div class="structure-container svelte-1r6cqqu"><div class="structure-visual svelte-1r6cqqu">`);
      if (example.id === 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="prefix svelte-1r6cqqu">يـ</span><span class="verb-root svelte-1r6cqqu">عطي</span><span class="pronoun svelte-1r6cqqu">ني</span> = <span class="prefix svelte-1r6cqqu">He</span>-<span class="verb-root svelte-1r6cqqu">gives</span>-<span class="pronoun svelte-1r6cqqu">me</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="prefix svelte-1r6cqqu">سأ</span><span class="verb-root svelte-1r6cqqu">عطي</span><span class="pronoun svelte-1r6cqqu">ه</span> = <span class="prefix svelte-1r6cqqu">I will</span>-<span class="verb-root svelte-1r6cqqu">give</span>-<span class="pronoun svelte-1r6cqqu">it</span>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div style="margin-top: 15px; padding: 15px; background: rgba(52, 152, 219, 0.05); border-radius: 6px;" class="svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Note:</strong> ${html(example.analysis.note)}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <h2 class="section-title svelte-1r6cqqu">Double Object Pronoun Attachments</h2> <div class="examples-container svelte-1r6cqqu"><!--[-->`);
    const each_array_4 = ensure_array_like(examples.slice(2, 4));
    for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
      let example = each_array_4[$$index_5];
      $$renderer2.push(`<div class="example-card svelte-1r6cqqu"><div class="example-number svelte-1r6cqqu">${escape_html(example.id)}</div> <div class="example-arabic svelte-1r6cqqu"><!--[-->`);
      const each_array_5 = ensure_array_like(example.components);
      for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
        let component = each_array_5[$$index_4];
        if (component.type) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span${attr_class(clsx(component.type), "svelte-1r6cqqu")}>${escape_html(component.text)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`${escape_html(component.text)}`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="example-translation svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Translation:</strong> ${escape_html(example.translation)}</div> <div class="analysis-container svelte-1r6cqqu"><div class="analysis-title svelte-1r6cqqu">Detailed Analysis:</div> `);
      if (example.analysis.verbStructure) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Verb Structure:</strong> ${html(example.analysis.verbStructure)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Direct Object:</strong> ${html(example.analysis.direct)}</div> <div class="analysis-detail indirect-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Indirect Object:</strong> ${html(example.analysis.indirect)}</div> `);
      if (example.analysis.additional) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="analysis-detail svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Additional Indirect Object:</strong> ${html(example.analysis.additional)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="structure-container svelte-1r6cqqu"><div class="structure-visual svelte-1r6cqqu">`);
      if (example.id === 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`أعطيت + ها + إياه = <span class="verb-root svelte-1r6cqqu">Gave</span>-<span class="suffix svelte-1r6cqqu">I</span> + <span class="direct-obj svelte-1r6cqqu">it(f)</span> + <span class="indirect-obj svelte-1r6cqqu">to him</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="prefix svelte-1r6cqqu">يـ</span><span class="verb-root svelte-1r6cqqu">عطي</span><span class="pronoun svelte-1r6cqqu">ه</span><span class="suffix svelte-1r6cqqu">ك</span> = <span class="prefix svelte-1r6cqqu">He</span>-<span class="verb-root svelte-1r6cqqu">gives</span>-<span class="direct-obj svelte-1r6cqqu">it</span>-<span class="indirect-obj svelte-1r6cqqu">to you</span>`);
      }
      $$renderer2.push(`<!--]--></div></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <h2 class="section-title svelte-1r6cqqu">Pronoun Attachment Paradigm</h2> <table class="paradigm-table svelte-1r6cqqu"><thead class="svelte-1r6cqqu"><tr class="svelte-1r6cqqu"><th class="svelte-1r6cqqu">Verb + Direct Object</th><th class="svelte-1r6cqqu">Verb + Indirect Object</th><th class="svelte-1r6cqqu">Verb + Both Objects</th><th class="svelte-1r6cqqu">Translation</th></tr></thead><tbody class="svelte-1r6cqqu"><!--[-->`);
    const each_array_6 = ensure_array_like(paradigmData);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let row = each_array_6[$$index_6];
      $$renderer2.push(`<tr class="svelte-1r6cqqu"><td class="svelte-1r6cqqu"><div class="paradigm-arabic svelte-1r6cqqu">${escape_html(row.verbDirect)}</div> <div class="paradigm-translation svelte-1r6cqqu">${escape_html(row.translation.split(" - ")[0])}</div></td><td class="svelte-1r6cqqu"><div class="paradigm-arabic svelte-1r6cqqu">${escape_html(row.verbIndirect)}</div> <div class="paradigm-translation svelte-1r6cqqu">${escape_html(row.translation.split(" - ")[0])}</div></td><td class="svelte-1r6cqqu"><div class="paradigm-arabic svelte-1r6cqqu">${escape_html(row.verbBoth)}</div> <div class="paradigm-translation svelte-1r6cqqu">${escape_html(row.translation.split(" - ")[0])}</div></td><td class="svelte-1r6cqqu">${escape_html(row.translation)}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <h2 class="section-title svelte-1r6cqqu">Complex Examples with Analysis</h2> <div class="examples-container svelte-1r6cqqu"><div class="example-card svelte-1r6cqqu"><div class="example-number svelte-1r6cqqu">5</div> <div class="example-arabic svelte-1r6cqqu"><span class="prefix svelte-1r6cqqu">لن</span> <span class="prefix svelte-1r6cqqu">ي</span><span class="verb-root svelte-1r6cqqu">عطي</span><span class="pronoun svelte-1r6cqqu">ك</span><span class="suffix svelte-1r6cqqu">ه</span><span class="pronoun svelte-1r6cqqu">إياها</span> <span class="indirect-obj svelte-1r6cqqu">أبداً</span></div> <div class="example-translation svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Translation:</strong> He will never give it to
        you for her sake.</div> <div class="analysis-container svelte-1r6cqqu"><div class="analysis-title svelte-1r6cqqu">Complex Analysis:</div> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Negation + Future:</strong> <span class="prefix svelte-1r6cqqu">لن</span> (will not) + <span class="prefix svelte-1r6cqqu">يـ</span> (he - present prefix)</div> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Verb with Attached Pronouns:</strong> <span class="verb-root svelte-1r6cqqu">عطي</span> (give) + <span class="pronoun svelte-1r6cqqu">ـك</span> (to you) + <span class="pronoun svelte-1r6cqqu">ـه</span> (it)</div> <div class="analysis-detail indirect-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Benefactive Pronoun:</strong> <span class="indirect-obj svelte-1r6cqqu"><span class="pronoun svelte-1r6cqqu">إياها</span></span> (for her - separate emphatic form)</div> <div class="analysis-detail svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Adverb:</strong> <span class="indirect-obj svelte-1r6cqqu">أبداً</span> (never)</div> <div class="structure-container svelte-1r6cqqu"><div class="structure-visual svelte-1r6cqqu">Structure: لن + يـعطي + كـ + هـ + إياها + أبداً</div></div></div></div> <div class="example-card svelte-1r6cqqu"><div class="example-number svelte-1r6cqqu">6</div> <div class="example-arabic svelte-1r6cqqu"><span class="prefix svelte-1r6cqqu">أعط</span><span class="verb-root svelte-1r6cqqu">تنا</span><span class="suffix svelte-1r6cqqu">كم</span><span class="pronoun svelte-1r6cqqu">إياهن</span> <span class="direct-obj svelte-1r6cqqu">بالأمس</span></div> <div class="example-translation svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Translation:</strong> We gave them (feminine)
        to you (plural) yesterday.</div> <div class="analysis-container svelte-1r6cqqu"><div class="analysis-title svelte-1r6cqqu">Complex Analysis:</div> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Past Verb with Subject:</strong> <span class="prefix svelte-1r6cqqu">أعط</span> (give) + <span class="suffix svelte-1r6cqqu">ـتنا</span> (we - past suffix)</div> <div class="analysis-detail indirect-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Indirect Object Pronoun:</strong> <span class="indirect-obj svelte-1r6cqqu"><span class="pronoun svelte-1r6cqqu">ـكم</span></span> (to you plural) attached</div> <div class="analysis-detail direct-analysis svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Direct Object Pronoun:</strong> <span class="direct-obj svelte-1r6cqqu"><span class="pronoun svelte-1r6cqqu">إياهن</span></span> (them feminine) as separate word</div> <div class="analysis-detail svelte-1r6cqqu"><strong class="svelte-1r6cqqu">Time Adjunct:</strong> <span class="direct-obj svelte-1r6cqqu">بالأمس</span> (yesterday)</div> <div class="structure-container svelte-1r6cqqu"><div class="structure-visual svelte-1r6cqqu">Order: Verb + Indirect Object + Direct Object +
            Time</div></div></div></div></div> <div class="notes svelte-1r6cqqu"><h3 class="svelte-1r6cqqu">Key Points about Arabic Pronominal Composition</h3> <ul class="svelte-1r6cqqu"><!--[-->`);
    const each_array_7 = ensure_array_like(keyPoints);
    for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
      let point = each_array_7[$$index_7];
      $$renderer2.push(`<li class="svelte-1r6cqqu">${html(point)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <footer class="svelte-1r6cqqu"><p class="svelte-1r6cqqu">Arabic Pronominal Composition - Analysis of Direct and
      Indirect Object Pronouns with Transitive Verbs</p> <p class="svelte-1r6cqqu">Morphological Elements: <span class="prefix svelte-1r6cqqu">Prefixes</span> | <span class="suffix svelte-1r6cqqu">Suffixes</span> | <span class="verb-root svelte-1r6cqqu">Verb Roots</span> | <span class="pronoun svelte-1r6cqqu">Pronouns</span></p> <p class="svelte-1r6cqqu">Syntactic Functions: <span class="direct-obj svelte-1r6cqqu">Direct Objects</span> | <span class="indirect-obj svelte-1r6cqqu">Indirect Objects</span></p></footer></div>`);
  });
}
export {
  _page as default
};
