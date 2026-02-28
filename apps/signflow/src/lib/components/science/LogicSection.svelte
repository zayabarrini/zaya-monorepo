<!-- LogicSection.svelte -->
<script>
  export let language = "ar";
  export let searchTerm = "";

  // Logic operators data
  const logicOperators = [
    {
      symbol: "∧",
      name: {
        ar: "و المنطقية (العطف)",
        en: "Logical AND (Conjunction)"
      },
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
      name: {
        ar: "أو المنطقية (الفصل)",
        en: "Logical OR (Disjunction)"
      },
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
      name: {
        ar: "ليس المنطقية (النفي)",
        en: "Logical NOT (Negation)"
      },
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
      name: {
        ar: "الاستلزام (إذا...فإن)",
        en: "Implication (If...Then)"
      },
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

  // Logical connectors
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

  // Filter operators based on search term
  $: filteredOperators = logicOperators.filter(
    (op) =>
      searchTerm === "" ||
      op.symbol.includes(searchTerm) ||
      op.name.ar.includes(searchTerm) ||
      op.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  $: filteredConnectors = connectors.filter(
    (conn) =>
      searchTerm === "" ||
      conn.symbol.includes(searchTerm) ||
      conn.name.ar.includes(searchTerm) ||
      conn.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
</script>

<div class="logic-section">
  <h2 class="section-title">
    <i class="fas fa-brain"></i>
    {language === "ar"
      ? "المؤثرات المنطقية"
      : "Logic Operators"}
  </h2>

  <div class="section-description">
    <p>
      {language === "ar"
        ? "المؤثرات المنطقية هي رموز تستخدم لربط العبارات المنطقية وتكوين عبارات مركبة. وهي أساس البرهان والاستدلال في الرياضيات وعلوم الحاسب."
        : "Logical operators are symbols used to connect logical statements and form compound statements. They are fundamental to proof and reasoning in mathematics and computer science."}
    </p>
  </div>

  <!-- Operators Grid -->
  <div class="operators-grid">
    {#each filteredOperators as operator}
      <div class="operator-card {operator.level}">
        <div class="operator-header">
          <div class="operator-symbol">
            {operator.symbol}
          </div>
          <div
            class="operator-level-badge {operator.level}"
          >
            {operator.level === "basic"
              ? language === "ar"
                ? "أساسي"
                : "Basic"
              : language === "ar"
                ? "متقدم"
                : "Advanced"}
          </div>
        </div>

        <div class="operator-name">
          {operator.name[language]}
        </div>

        <div class="operator-description">
          {operator.description[language]}
        </div>

        <div class="example-box">
          <div class="example-title">
            {language === "ar" ? "مثال:" : "Example:"}
          </div>
          <div class="example-content">
            {operator.example}
          </div>
          <div class="example-usage">
            {operator.usage[language]}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Connectors Section -->
  <h3 class="sub-section-title">
    <i class="fas fa-link"></i>
    {language === "ar"
      ? "الوصلات المنطقية"
      : "Logical Connectors"}
  </h3>

  <div class="connectors-grid">
    {#each filteredConnectors as connector}
      <div class="connector-card">
        <div class="connector-symbol">
          {connector.symbol}
        </div>
        <div class="connector-name">
          {connector.name[language]}
        </div>
        <div class="connector-usage">{connector.usage}</div>
      </div>
    {/each}
  </div>

  <style>
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
  </style>
</div>
