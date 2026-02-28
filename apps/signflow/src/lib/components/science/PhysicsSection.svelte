<!-- PhysicsSection.svelte -->
<script>
  export let language = "ar";
  export let searchTerm = "";

  // Physics operators data
  const physicsOperators = [
    // Basic Operators
    {
      symbol: "→",
      name: { ar: "المتجه", en: "Vector" },
      description: {
        ar: "كمية لها مقدار واتجاه، يمثل بسهم",
        en: "Quantity with magnitude and direction, represented by an arrow"
      },
      example: "v⃗ = 5 m/s east",
      usage: {
        ar: "السرعة، القوة، التسارع",
        en: "Velocity, force, acceleration"
      },
      level: "basic"
    },
    {
      symbol: "·",
      name: { ar: "الضرب النقطي", en: "Dot Product" },
      description: {
        ar: "عملية بين متجهين تعطي كمية قياسية",
        en: "Operation between two vectors that gives a scalar quantity"
      },
      example: "A·B = |A||B|cosθ",
      usage: { ar: "الشغل، التدفق", en: "Work, flux" },
      level: "basic"
    },
    {
      symbol: "×",
      name: { ar: "الضرب الاتجاهي", en: "Cross Product" },
      description: {
        ar: "عملية بين متجهين تعطي متجه عمودي عليهما",
        en: "Operation between two vectors that gives a vector perpendicular to both"
      },
      example: "τ = r × F",
      usage: {
        ar: "العزم، المجال المغناطيسي",
        en: "Torque, magnetic field"
      },
      level: "basic"
    },
    {
      symbol: "Δ",
      name: { ar: "دلتا (التغير)", en: "Delta (Change)" },
      description: {
        ar: "يمثل التغير أو الفرق في كمية ما",
        en: "Represents change or difference in a quantity"
      },
      example: "Δx = x₂ - x₁",
      usage: {
        ar: "الإزاحة، التغير في الطاقة",
        en: "Displacement, energy change"
      },
      level: "basic"
    },
    // Advanced Operators
    {
      symbol: "∇",
      name: { ar: "مؤثر النابلا", en: "Nabla Operator" },
      description: {
        ar: "مؤثر تفاضلي شعاعي يستخدم في الفيزياء الرياضية",
        en: "Vector differential operator used in mathematical physics"
      },
      example: "∇·E = ρ/ε₀",
      usage: {
        ar: "معادلات ماكسويل",
        en: "Maxwell's equations"
      },
      level: "advanced"
    },
    {
      symbol: "Ĥ",
      name: {
        ar: "مؤثر الهاملتون",
        en: "Hamiltonian Operator"
      },
      description: {
        ar: "مؤثر يمثل الطاقة الكلية للنظام في ميكانيكا الكم",
        en: "Operator representing total energy of system in quantum mechanics"
      },
      example: "ĤΨ = EΨ",
      usage: {
        ar: "معادلة شرودنجر",
        en: "Schrödinger's equation"
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
      example: "∂T/∂t",
      usage: {
        ar: "معادلات الانتشار",
        en: "Diffusion equations"
      },
      level: "advanced"
    }
  ];

  // Physical constants
  const constants = [
    {
      symbol: "c",
      name: { ar: "سرعة الضوء", en: "Speed of light" },
      value: "299,792,458 m/s"
    },
    {
      symbol: "G",
      name: {
        ar: "ثابت الجذب العام",
        en: "Gravitational constant"
      },
      value: "6.674×10⁻¹¹ N·m²/kg²"
    },
    {
      symbol: "h",
      name: { ar: "ثابت بلانك", en: "Planck's constant" },
      value: "6.626×10⁻³⁴ J·s"
    },
    {
      symbol: "k",
      name: {
        ar: "ثابت بولتزمان",
        en: "Boltzmann's constant"
      },
      value: "1.381×10⁻²³ J/K"
    },
    {
      symbol: "ε₀",
      name: {
        ar: "سماحية الفراغ",
        en: "Vacuum permittivity"
      },
      value: "8.854×10⁻¹² F/m"
    },
    {
      symbol: "μ₀",
      name: {
        ar: "نفاذية الفراغ",
        en: "Vacuum permeability"
      },
      value: "4π×10⁻⁷ H/m"
    }
  ];

  // Filter operators
  $: filteredOperators = physicsOperators.filter(
    (op) =>
      searchTerm === "" ||
      op.symbol.includes(searchTerm) ||
      op.name.ar.includes(searchTerm) ||
      op.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  $: filteredConstants = constants.filter(
    (constant) =>
      searchTerm === "" ||
      constant.symbol.includes(searchTerm) ||
      constant.name.ar.includes(searchTerm) ||
      constant.name.en
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
</script>

<div class="physics-section">
  <h2 class="section-title">
    <i class="fas fa-atom"></i>
    {language === "ar"
      ? "المؤثرات الفيزيائية"
      : "Physics Operators"}
  </h2>

  <div class="section-description">
    <p>
      {language === "ar"
        ? "المؤثرات الفيزيائية هي رموز تستخدم لتمثيل الكميات والعمليات في الفيزياء، من الميكانيكا الكلاسيكية إلى ميكانيكا الكم والنسبية."
        : "Physics operators are symbols used to represent quantities and operations in physics, from classical mechanics to quantum mechanics and relativity."}
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

  <!-- Physical Constants -->
  <h3 class="sub-section-title">
    <i class="fas fa-balance-scale"></i>
    {language === "ar"
      ? "الثوابت الفيزيائية"
      : "Physical Constants"}
  </h3>

  <div class="constants-grid">
    {#each filteredConstants as constant}
      <div class="constant-card">
        <div class="constant-symbol">{constant.symbol}</div>
        <div class="constant-name">
          {constant.name[language]}
        </div>
        <div class="constant-value">{constant.value}</div>
      </div>
    {/each}
  </div>

  <style>
    .physics-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--physics);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--physics);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(46, 204, 113, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--physics);
    }

    .sub-section-title {
      color: var(--physics);
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
      border-left: 5px solid var(--physics);
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
      color: var(--physics);
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
      color: var(--physics);
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

    .constants-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .constant-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--physics);
      transition: all 0.3s ease;
    }

    .constant-card:hover {
      background: var(--physics);
      color: white;
      transform: scale(1.05);
    }

    .constant-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .constant-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .constant-value {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .constants-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>
</div>
