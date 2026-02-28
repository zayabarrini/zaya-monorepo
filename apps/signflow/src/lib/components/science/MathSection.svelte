<!-- MathSection.svelte -->
<script>
  export let language = "ar";
  export let searchTerm = "";

  // Math operators data
  const mathOperators = [
    // Basic Operators
    {
      symbol: "+",
      name: { ar: "الجمع", en: "Addition" },
      description: {
        ar: "عملية رياضية تجمع بين عددين أو أكثر لإنتاج مجموع",
        en: "Mathematical operation that combines two or more numbers to produce a sum"
      },
      example: "5 + 3 = 8",
      usage: { ar: "جمع الكميات", en: "Adding quantities" },
      level: "basic"
    },
    {
      symbol: "−",
      name: { ar: "الطرح", en: "Subtraction" },
      description: {
        ar: "عملية رياضية لإيجاد الفرق بين عددين",
        en: "Mathematical operation to find the difference between two numbers"
      },
      example: "10 − 4 = 6",
      usage: {
        ar: "إيجاد الفرق",
        en: "Finding difference"
      },
      level: "basic"
    },
    {
      symbol: "×",
      name: { ar: "الضرب", en: "Multiplication" },
      description: {
        ar: "عملية رياضية تجمع كميات متساوية مكررة",
        en: "Mathematical operation that combines equal repeated quantities"
      },
      example: "3 × 4 = 12",
      usage: { ar: "تكرار الجمع", en: "Repeated addition" },
      level: "basic"
    },
    {
      symbol: "÷",
      name: { ar: "القسمة", en: "Division" },
      description: {
        ar: "عملية رياضية لتقسيم عدد إلى أجزاء متساوية",
        en: "Mathematical operation to divide a number into equal parts"
      },
      example: "12 ÷ 4 = 3",
      usage: { ar: "التقسيم", en: "Division" },
      level: "basic"
    },
    {
      symbol: "√",
      name: { ar: "الجذر التربيعي", en: "Square Root" },
      description: {
        ar: "العدد الذي إذا ضرب في نفسه يعطي العدد الأصلي",
        en: "Number that when multiplied by itself gives the original number"
      },
      example: "√16 = 4",
      usage: {
        ar: "إيجاد طول الضلع",
        en: "Finding side length"
      },
      level: "basic"
    },
    // Advanced Operators
    {
      symbol: "∫",
      name: { ar: "التكامل", en: "Integral" },
      description: {
        ar: "عملية رياضية تجمع كميات متناهية الصغر للحصول على الكل",
        en: "Mathematical operation that sums infinitesimal quantities to find the whole"
      },
      example: "∫x² dx = x³/3 + C",
      usage: {
        ar: "حساب المساحة تحت المنحنى",
        en: "Calculating area under curve"
      },
      level: "advanced"
    },
    {
      symbol: "∂",
      name: {
        ar: "المشتقة الجزئية",
        en: "Partial Derivative"
      },
      description: {
        ar: "معدل التغير بالنسبة لمتغير مع ثبات باقي المتغيرات",
        en: "Rate of change with respect to one variable while others are constant"
      },
      example: "∂f/∂x",
      usage: {
        ar: "الدوال متعددة المتغيرات",
        en: "Multivariable functions"
      },
      level: "advanced"
    },
    {
      symbol: "∇",
      name: { ar: "النابلا (دل)", en: "Nabla (Del)" },
      description: {
        ar: "مؤثر تفاضلي شعاعي يستخدم في حساب التفاضل المتجهي",
        en: "Vector differential operator used in vector calculus"
      },
      example: "∇f = grad(f)",
      usage: {
        ar: "المتجهات والحقول",
        en: "Vectors and fields"
      },
      level: "advanced"
    },
    {
      symbol: "∑",
      name: { ar: "المجموع", en: "Summation" },
      description: {
        ar: "عملية جمع سلسلة من الأعداد وفق نمط معين",
        en: "Operation of adding a series of numbers according to a pattern"
      },
      example: "∑_{i=1}^{n} i = n(n+1)/2",
      usage: { ar: "جمع المتسلسلات", en: "Summing series" },
      level: "advanced"
    },
    {
      symbol: "∏",
      name: { ar: "الضرب المتسلسل", en: "Product" },
      description: {
        ar: "عملية ضرب سلسلة من الأعداد وفق نمط معين",
        en: "Operation of multiplying a series of numbers according to a pattern"
      },
      example: "∏_{i=1}^{n} i = n!",
      usage: {
        ar: "حساب المضروب",
        en: "Calculating factorial"
      },
      level: "advanced"
    }
  ];

  // Special symbols
  const specialSymbols = [
    {
      symbol: "∞",
      name: { ar: "اللانهاية", en: "Infinity" },
      usage: "lim(x→∞) 1/x = 0"
    },
    {
      symbol: "π",
      name: { ar: "باي", en: "Pi" },
      usage: "C = 2πr"
    },
    {
      symbol: "≈",
      name: {
        ar: "تقريباً يساوي",
        en: "Approximately equal"
      },
      usage: "π ≈ 3.14"
    },
    {
      symbol: "≠",
      name: { ar: "لا يساوي", en: "Not equal" },
      usage: "2 ≠ 3"
    },
    {
      symbol: "≤",
      name: {
        ar: "أصغر أو يساوي",
        en: "Less than or equal"
      },
      usage: "x ≤ 5"
    },
    {
      symbol: "≥",
      name: {
        ar: "أكبر أو يساوي",
        en: "Greater than or equal"
      },
      usage: "y ≥ 0"
    }
  ];

  // Filter operators
  $: filteredOperators = mathOperators.filter(
    (op) =>
      searchTerm === "" ||
      op.symbol.includes(searchTerm) ||
      op.name.ar.includes(searchTerm) ||
      op.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  $: filteredSymbols = specialSymbols.filter(
    (sym) =>
      searchTerm === "" ||
      sym.symbol.includes(searchTerm) ||
      sym.name.ar.includes(searchTerm) ||
      sym.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
</script>

<div class="math-section">
  <h2 class="section-title">
    <i class="fas fa-calculator"></i>
    {language === "ar"
      ? "المؤثرات الرياضية"
      : "Mathematical Operators"}
  </h2>

  <div class="section-description">
    <p>
      {language === "ar"
        ? "المؤثرات الرياضية هي رموز تستخدم لتمثيل العمليات الرياضية المختلفة، من العمليات الأساسية مثل الجمع والطرح إلى العمليات المتقدمة مثل التكامل والتفاضل."
        : "Mathematical operators are symbols used to represent various mathematical operations, from basic operations like addition and subtraction to advanced operations like integration and differentiation."}
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

  <!-- Special Symbols -->
  <h3 class="sub-section-title">
    <i class="fas fa-star"></i>
    {language === "ar"
      ? "رموز رياضية خاصة"
      : "Special Mathematical Symbols"}
  </h3>

  <div class="symbols-grid">
    {#each filteredSymbols as symbol}
      <div class="symbol-card">
        <div class="symbol-display">{symbol.symbol}</div>
        <div class="symbol-name">
          {symbol.name[language]}
        </div>
        <div class="symbol-usage">{symbol.usage}</div>
      </div>
    {/each}
  </div>

  <style>
    .math-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--math);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--math);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(231, 76, 60, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--math);
    }

    .sub-section-title {
      color: var(--math);
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
      border-left: 5px solid var(--math);
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
      color: var(--math);
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
      color: var(--math);
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

    .symbols-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .symbol-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--math);
      transition: all 0.3s ease;
    }

    .symbol-card:hover {
      background: var(--math);
      color: white;
      transform: scale(1.05);
    }

    .symbol-display {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .symbol-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .symbol-usage {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .symbols-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</div>
