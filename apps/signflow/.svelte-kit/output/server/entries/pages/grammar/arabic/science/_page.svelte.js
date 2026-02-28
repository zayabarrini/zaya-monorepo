import { f as fallback, i as escape_html, j as ensure_array_like, a as attr_class, d as stringify, b as bind_props, h as head, e as attr } from "../../../../../chunks/vendor-svelte.js";
function LogicSection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filteredOperators, filteredConnectors;
    let language = fallback($$props["language"], "ar");
    let searchTerm = fallback($$props["searchTerm"], "");
    const logicOperators = [
      {
        symbol: "∧",
        name: { ar: "و المنطقية (العطف)", en: "Logical AND (Conjunction)" },
        description: {
          ar: "تعطي النتيجة صحيحة فقط إذا كان كلا الطرفين صحيحين",
          en: "Returns true only if both operands are true"
        },
        example: "P ∧ Q",
        usage: {
          ar: 'تُستخدم في الشروط المركبة مثل "إذا كان الطقس مشمساً والمدرسة مفتوحة"',
          en: 'Used in compound conditions like "If sunny AND school is open"'
        },
        level: "basic"
      },
      {
        symbol: "∨",
        name: { ar: "أو المنطقية (الفصل)", en: "Logical OR (Disjunction)" },
        description: {
          ar: "تعطي النتيجة صحيحة إذا كان أحد الطرفين صحيحاً على الأقل",
          en: "Returns true if at least one operand is true"
        },
        example: "P ∨ Q",
        usage: {
          ar: 'تُستخدم في الاختيارات مثل "يمكنك اختيار الشاي أو القهوة"',
          en: 'Used in choices like "You can have tea OR coffee"'
        },
        level: "basic"
      },
      {
        symbol: "¬",
        name: { ar: "ليس المنطقية (النفي)", en: "Logical NOT (Negation)" },
        description: {
          ar: "تعكس قيمة الصواب، تجعل الصحيح خطأ والخطأ صحيحاً",
          en: "Inverts the truth value, true becomes false and false becomes true"
        },
        example: "¬P",
        usage: {
          ar: 'تُستخدم لنفي العبارات مثل "ليس الجو ممطراً"',
          en: 'Used to negate statements like "It is NOT raining"'
        },
        level: "basic"
      },
      {
        symbol: "⇒",
        name: { ar: "الاستلزام (إذا...فإن)", en: "Implication (If...Then)" },
        description: {
          ar: "إذا كانت الفرضية صحيحة فإن النتيجة صحيحة",
          en: "If the hypothesis is true, then the conclusion is true"
        },
        example: "P ⇒ Q",
        usage: {
          ar: 'تُستخدم في الاستدلال المنطقي مثل "إذا كانت س=٢ فإن س²=٤"',
          en: 'Used in logical reasoning like "If x=2 then x²=4"'
        },
        level: "advanced"
      },
      {
        symbol: "⇔",
        name: {
          ar: "التكافؤ (إذا وفقط إذا)",
          en: "Biconditional (If and Only If)"
        },
        description: {
          ar: "العبارتان متكافئتان، لهما نفس قيمة الصواب",
          en: "The statements are equivalent, they have the same truth value"
        },
        example: "P ⇔ Q",
        usage: {
          ar: 'تُستخدم في التعريفات الرياضية مثل "المثلث متساوي الأضلاع إذا وفقط إذا كانت زواياه ٦٠°"',
          en: 'Used in mathematical definitions like "Triangle is equilateral IFF all angles are 60°"'
        },
        level: "advanced"
      },
      {
        symbol: "∀",
        name: {
          ar: "المحدد الكلي (لكل)",
          en: "Universal Quantifier (For All)"
        },
        description: {
          ar: "تعبير ينطبق على جميع عناصر المجموعة",
          en: "Expression that applies to all elements of a set"
        },
        example: "∀x ∈ ℝ, x² ≥ 0",
        usage: {
          ar: 'تُستخدم في البراهين الرياضية مثل "لكل عدد حقيقي س، مربعه غير سالب"',
          en: 'Used in mathematical proofs like "For all real x, its square is non-negative"'
        },
        level: "advanced"
      }
    ];
    const connectors = [
      {
        symbol: "∵",
        name: { ar: "بسبب", en: "Because" },
        usage: "A ∵ B"
      },
      {
        symbol: "∴",
        name: { ar: "لذلك", en: "Therefore" },
        usage: "A ∴ B"
      },
      {
        symbol: "∝",
        name: { ar: "يتناسب مع", en: "Proportional to" },
        usage: "A ∝ B"
      },
      {
        symbol: "①",
        name: { ar: "أولاً", en: "First" },
        usage: "① ثم ②"
      },
      {
        symbol: "Ⓝ",
        name: { ar: "أخيراً", en: "Finally" },
        usage: "... Ⓝ"
      }
    ];
    filteredOperators = logicOperators.filter((op) => searchTerm === "" || op.symbol.includes(searchTerm) || op.name.ar.includes(searchTerm) || op.name.en.toLowerCase().includes(searchTerm.toLowerCase()));
    filteredConnectors = connectors.filter((conn) => searchTerm === "" || conn.symbol.includes(searchTerm) || conn.name.ar.includes(searchTerm) || conn.name.en.toLowerCase().includes(searchTerm.toLowerCase()));
    $$renderer2.push(`<div class="logic-section"><h2 class="section-title"><i class="fas fa-brain"></i> ${escape_html(language === "ar" ? "المؤثرات المنطقية" : "Logic Operators")}</h2> <div class="section-description"><p>${escape_html(language === "ar" ? "المؤثرات المنطقية هي رموز تستخدم لربط العبارات المنطقية وتكوين عبارات مركبة. وهي أساس البرهان والاستدلال في الرياضيات وعلوم الحاسب." : "Logical operators are symbols used to connect logical statements and form compound statements. They are fundamental to proof and reasoning in mathematics and computer science.")}</p></div> <div class="operators-grid"><!--[-->`);
    const each_array = ensure_array_like(filteredOperators);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let operator = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`operator-card ${stringify(operator.level)}`)}><div class="operator-header"><div class="operator-symbol">${escape_html(operator.symbol)}</div> <div${attr_class(`operator-level-badge ${stringify(operator.level)}`)}>${escape_html(operator.level === "basic" ? language === "ar" ? "أساسي" : "Basic" : language === "ar" ? "متقدم" : "Advanced")}</div></div> <div class="operator-name">${escape_html(operator.name[language])}</div> <div class="operator-description">${escape_html(operator.description[language])}</div> <div class="example-box"><div class="example-title">${escape_html(language === "ar" ? "مثال:" : "Example:")}</div> <div class="example-content">${escape_html(operator.example)}</div> <div class="example-usage">${escape_html(operator.usage[language])}</div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <h3 class="sub-section-title"><i class="fas fa-link"></i> ${escape_html(language === "ar" ? "الوصلات المنطقية" : "Logical Connectors")}</h3> <div class="connectors-grid"><!--[-->`);
    const each_array_1 = ensure_array_like(filteredConnectors);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let connector = each_array_1[$$index_1];
      $$renderer2.push(`<div class="connector-card"><div class="connector-symbol">${escape_html(connector.symbol)}</div> <div class="connector-name">${escape_html(connector.name[language])}</div> <div class="connector-usage">${escape_html(connector.usage)}</div></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    $$renderer2.push(`<style>
    .logic-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--logic);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--logic);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(52, 152, 219, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--logic);
    }

    .sub-section-title {
      color: var(--logic);
      margin: 2rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .operators-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
      );
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .operator-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid var(--logic);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .operator-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px var(--shadow);
    }

    .operator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--logic);
      font-family: "Times New Roman", serif;
    }

    .operator-level-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .operator-level-badge.basic {
      background: rgba(243, 156, 18, 0.2);
      color: var(--warning);
    }

    .operator-level-badge.advanced {
      background: rgba(52, 73, 94, 0.2);
      color: var(--text-primary);
    }

    .operator-name {
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
    }

    .operator-description {
      color: var(--text-secondary);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .example-box {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .example-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--logic);
    }

    .example-content {
      font-family: "Courier New", monospace;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: var(--bg-secondary);
      border-radius: 5px;
    }

    .example-usage {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .connectors-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(150px, 1fr)
      );
      gap: 1rem;
    }

    .connector-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--logic);
      transition: all 0.3s ease;
    }

    .connector-card:hover {
      background: var(--logic);
      color: white;
      transform: scale(1.05);
    }

    .connector-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .connector-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .connector-usage {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .connectors-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>`);
    $$renderer2.push(`</div>`);
    bind_props($$props, { language, searchTerm });
  });
}
function _page($$renderer) {
  let activeTab = "logic";
  let language = "ar";
  let searchTerm = "";
  const tabs = [
    { id: "logic", name: "المنطق", icon: "a" },
    { id: "math", name: "الرياضيات", icon: "∫" },
    { id: "physics", name: "الفيزياء", icon: "⚛" },
    { id: "chemistry", name: "الكيمياء", icon: "⚗" }
  ];
  head("19i5eqo", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>دليل شامل للمؤثرات في المنطق والعلوم</title>`);
    });
    $$renderer2.push(`<meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/> `);
    $$renderer2.push(`<style>
    :root {
      --primary: #2c3e50;
      --secondary: #3498db;
      --accent: #e74c3c;
      --success: #27ae60;
      --warning: #f39c12;
      --logic: #3498db;
      --math: #e74c3c;
      --physics: #2ecc71;
      --chemistry: #9b59b6;
      --bg-primary: #ffffff;
      --bg-secondary: #f8f9fa;
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --border: #eaeaea;
      --shadow: rgba(0, 0, 0, 0.1);
    }

    .dark-mode {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --text-primary: #e6e6e6;
      --text-secondary: #b3b3b3;
      --border: #2d3748;
      --shadow: rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family:
        "Segoe UI", "Tahoma", "Arial", sans-serif;
    }

    body {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      line-height: 1.6;
      transition: all 0.3s ease;
      direction: rtl;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      margin-top: 6rem;
    }

    /* Header Styles */

    .header {
      background: linear-gradient(
        135deg,
        var(--logic),
        var(--math)
      );
      color: white;
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px var(--shadow);
      text-align: center;
      position: relative;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
      max-width: 800px;
      margin: 0 auto;
    }

    .controls {
      position: absolute;
      left: 2rem;
      top: 2rem;
      display: flex;
      gap: 1rem;
    }

    .control-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .control-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    /* Search Bar */

    .search-container {
      background: var(--bg-primary);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      box-shadow: 0 5px 15px var(--shadow);
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid var(--border);
      border-radius: 25px;
      font-size: 1rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--secondary);
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    .search-icon {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
    }

    /* Navigation Tabs */

    .nav-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .tab-btn {
      padding: 0.8rem 1.5rem;
      background: var(--bg-secondary);
      border: 2px solid;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .tab-btn.logic {
      border-color: var(--logic);
      color: var(--logic);
    }

    .tab-btn.math {
      border-color: var(--math);
      color: var(--math);
    }

    .tab-btn.physics {
      border-color: var(--physics);
      color: var(--physics);
    }

    .tab-btn.chemistry {
      border-color: var(--chemistry);
      color: var(--chemistry);
    }

    .tab-btn:hover {
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px var(--shadow);
    }

    .tab-btn.logic:hover {
      background: var(--logic);
    }

    .tab-btn.math:hover {
      background: var(--math);
    }

    .tab-btn.physics:hover {
      background: var(--physics);
    }

    .tab-btn.chemistry:hover {
      background: var(--chemistry);
    }

    .tab-btn.active {
      color: white;
    }

    .tab-btn.logic.active {
      background: var(--logic);
    }

    .tab-btn.math.active {
      background: var(--math);
    }

    .tab-btn.physics.active {
      background: var(--physics);
    }

    .tab-btn.chemistry.active {
      background: var(--chemistry);
    }

    /* Content Area */

    .content-area {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px var(--shadow);
      min-height: 500px;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Quick Facts */

    .quick-facts {
      background: linear-gradient(
        135deg,
        var(--bg-secondary),
        var(--bg-primary)
      );
      padding: 1.5rem;
      border-radius: 10px;
      margin-top: 2rem;
      border-right: 4px solid var(--secondary);
    }

    .quick-facts h3 {
      color: var(--secondary);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .fact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 5px;
    }

    /* Footer */

    .footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      margin-top: 2rem;
      font-size: 0.9rem;
    }

    /* Responsive Design */

    @media (max-width: 768px) {
      .header h1 {
        font-size: 1.8rem;
      }
      .controls {
        position: static;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .tab-btn {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
      .content-area {
        padding: 1rem;
      }
    }

    /* Print Styles */

    @media print {
      .controls,
      .search-container,
      .nav-tabs {
        display: none;
      }
      .header {
        background: white;
        color: black;
      }
    }
  </style>`);
  });
  $$renderer.push(`<div class="container"><header class="header"><div class="controls"><button class="control-btn" title="تبديل اللغة">`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`ع`);
  }
  $$renderer.push(`<!--]--></button> <button class="control-btn" title="الوضع الداكن">`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<i class="fas fa-moon"></i>`);
  }
  $$renderer.push(`<!--]--></button></div> <h1>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`دليل شامل للمؤثرات في المنطق والعلوم`);
  }
  $$renderer.push(`<!--]--></h1> <p>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`مرجع تفاعلي شامل للمؤثرات والرموز المستخدمة في
        المنطق والرياضيات والفيزياء والكيمياء`);
  }
  $$renderer.push(`<!--]--></p></header> <div class="search-container"><i class="fas fa-search search-icon"></i> <input type="text" class="search-input"${attr(
    "placeholder",
    "ابحث عن مؤثر أو رمز..."
  )}${attr("value", searchTerm)}/></div> <nav class="nav-tabs"><!--[-->`);
  const each_array = ensure_array_like(tabs);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tab = each_array[$$index];
    $$renderer.push(`<button${attr_class(`tab-btn ${stringify(tab.id)} ${stringify(activeTab === tab.id ? "active" : "")}`)}><span>${escape_html(tab.icon)}</span> <span>${escape_html(tab.name)}</span></button>`);
  }
  $$renderer.push(`<!--]--></nav> <main class="content-area">`);
  {
    $$renderer.push("<!--[-->");
    LogicSection($$renderer, { language, searchTerm });
  }
  $$renderer.push(`<!--]--></main> <div class="quick-facts"><h3><i class="fas fa-lightbulb"></i> ${escape_html("حقائق سريعة")}</h3> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`معظم الرموز الرياضية المعاصرة ظهرت في القرنين
          السادس عشر والسابع عشر`);
  }
  $$renderer.push(`<!--]--></span></div> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`رمز النهاية ∞ صممه جون واليس عام 1655`);
  }
  $$renderer.push(`<!--]--></span></div> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`رمز التكامل ∫ استوحاه لايبنتز من حرف S للكلمة
          اللاتينية "summa"`);
  }
  $$renderer.push(`<!--]--></span></div></div> <footer class="footer"><p>`);
  {
    $$renderer.push("<!--[-->");
    $$renderer.push(`© 2024 دليل المؤثرات العلمية | تم التطوير لأغراض
        تعليمية`);
  }
  $$renderer.push(`<!--]--></p></footer></div>`);
}
export {
  _page as default
};
