<!-- ChemistrySection.svelte -->
<script>
  export let language = "ar";
  export let searchTerm = "";

  // Chemistry operators data
  const chemistryOperators = [
    // Basic Operators
    {
      symbol: "→",
      name: { ar: "سهم التفاعل", en: "Reaction Arrow" },
      description: {
        ar: "يشير إلى اتجاه التفاعل الكيميائي من المواد المتفاعلة إلى النواتج",
        en: "Indicates direction of chemical reaction from reactants to products"
      },
      example: "2H₂ + O₂ → 2H₂O",
      usage: {
        ar: "كتابة معادلات التفاعل",
        en: "Writing reaction equations"
      },
      level: "basic"
    },
    {
      symbol: "⇌",
      name: { ar: "سهم الاتزان", en: "Equilibrium Arrow" },
      description: {
        ar: "يشير إلى تفاعل عكسي عند حالة الاتزان",
        en: "Indicates reversible reaction at equilibrium state"
      },
      example: "N₂ + 3H₂ ⇌ 2NH₃",
      usage: {
        ar: "تفاعلات الاتزان",
        en: "Equilibrium reactions"
      },
      level: "basic"
    },
    {
      symbol: "Δ",
      name: {
        ar: "دلتا (التغير/الحرارة)",
        en: "Delta (Change/Heat)"
      },
      description: {
        ar: "يشير إلى التغير في كمية ما أو تطبيق الحرارة",
        en: "Indicates change in a quantity or application of heat"
      },
      example: "CaCO₃ → CaO + CO₂ (Δ)",
      usage: {
        ar: "التفاعلات الماصة أو الطاردة للحرارة",
        en: "Endothermic or exothermic reactions"
      },
      level: "basic"
    },
    {
      symbol: "↑",
      name: { ar: "تصاعد الغاز", en: "Gas Evolution" },
      description: {
        ar: "يشير إلى تصاعد غاز من التفاعل",
        en: "Indicates gas evolution from reaction"
      },
      example: "Zn + 2HCl → ZnCl₂ + H₂↑",
      usage: {
        ar: "تفاعلات تصاعد الغاز",
        en: "Gas evolution reactions"
      },
      level: "basic"
    },
    // Advanced Operators
    {
      symbol: "⦵",
      name: { ar: "الحالة القياسية", en: "Standard State" },
      description: {
        ar: "يشير إلى الكمية في الحالة القياسية (ضغط ١ بار، درجة حرارة محددة)",
        en: "Indicates quantity at standard state (1 bar pressure, specified temperature)"
      },
      example: "ΔG⦵",
      usage: {
        ar: "الديناميكا الحرارية",
        en: "Thermodynamics"
      },
      level: "advanced"
    },
    {
      symbol: "∇²",
      name: {
        ar: "مؤثر اللاپلاس",
        en: "Laplacian Operator"
      },
      description: {
        ar: "مؤثر تفاضلي يظهر في معادلات الانتشار ومعادلة شرودنجر",
        en: "Differential operator appearing in diffusion equations and Schrödinger equation"
      },
      example: "-ħ²/2m ∇²Ψ + VΨ = EΨ",
      usage: {
        ar: "الكيمياء الكمومية",
        en: "Quantum chemistry"
      },
      level: "advanced"
    },
    {
      symbol: "∂",
      name: {
        ar: "المشتق الجزئي",
        en: "Partial Derivative"
      },
      description: {
        ar: "معدل التغير بالنسبة لمتغير مع ثبات الباقي",
        en: "Rate of change with respect to one variable, others constant"
      },
      example: "(∂G/∂T)_p = -S",
      usage: {
        ar: "الديناميكا الحرارية الكيميائية",
        en: "Chemical thermodynamics"
      },
      level: "advanced"
    }
  ];

  // States of matter
  const states = [
    {
      symbol: "(s)",
      name: { ar: "صلب", en: "Solid" },
      example: "NaCl(s)"
    },
    {
      symbol: "(l)",
      name: { ar: "سائل", en: "Liquid" },
      example: "H₂O(l)"
    },
    {
      symbol: "(g)",
      name: { ar: "غاز", en: "Gas" },
      example: "O₂(g)"
    },
    {
      symbol: "(aq)",
      name: { ar: "مذاب في الماء", en: "Aqueous" },
      example: "NaCl(aq)"
    },
    {
      symbol: "→[cat]",
      name: { ar: "مع عامل مساعد", en: "With catalyst" },
      example: "2H₂O₂ →[MnO₂] 2H₂O + O₂"
    },
    {
      symbol: "⇌",
      name: { ar: "اتزان", en: "Equilibrium" },
      example: "CH₃COOH ⇌ CH₃COO⁻ + H⁺"
    }
  ];

  // Filter operators
  $: filteredOperators = chemistryOperators.filter(
    (op) =>
      searchTerm === "" ||
      op.symbol.includes(searchTerm) ||
      op.name.ar.includes(searchTerm) ||
      op.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  $: filteredStates = states.filter(
    (state) =>
      searchTerm === "" ||
      state.symbol.includes(searchTerm) ||
      state.name.ar.includes(searchTerm) ||
      state.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
</script>

<div class="chemistry-section">
  <h2 class="section-title">
    <i class="fas fa-flask"></i>
    {language === "ar"
      ? "المؤثرات الكيميائية"
      : "Chemistry Operators"}
  </h2>

  <div class="section-description">
    <p>
      {language === "ar"
        ? "المؤثرات الكيميائية هي رموز تستخدم لتمثيل التفاعلات والحالات والعمليات في الكيمياء، من التفاعلات الأساسية إلى الكيمياء الكمومية."
        : "Chemistry operators are symbols used to represent reactions, states, and processes in chemistry, from basic reactions to quantum chemistry."}
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

  <!-- States of Matter -->
  <h3 class="sub-section-title">
    <i class="fas fa-vial"></i>
    {language === "ar"
      ? "حالات المادة والرموز"
      : "States of Matter & Symbols"}
  </h3>

  <div class="states-grid">
    {#each filteredStates as state}
      <div class="state-card">
        <div class="state-symbol">{state.symbol}</div>
        <div class="state-name">{state.name[language]}</div>
        <div class="state-example">{state.example}</div>
      </div>
    {/each}
  </div>

  <style>
    .chemistry-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--chemistry);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--chemistry);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(155, 89, 182, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--chemistry);
    }

    .sub-section-title {
      color: var(--chemistry);
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
      border-left: 5px solid var(--chemistry);
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
      color: var(--chemistry);
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
      color: var(--chemistry);
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

    .states-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .state-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--chemistry);
      transition: all 0.3s ease;
    }

    .state-card:hover {
      background: var(--chemistry);
      color: white;
      transform: scale(1.05);
    }

    .state-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .state-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .state-example {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .states-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</div>
