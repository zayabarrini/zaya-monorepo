<script>
  // Import components
  import LogicSection from "../../../../lib/components/science/LogicSection.svelte";
  import MathSection from "../../../../lib/components/science/MathSection.svelte";
  import PhysicsSection from "../../../../lib/components/science/PhysicsSection.svelte";
  import ChemistrySection from "../../../../lib/components/science/ChemistrySection.svelte";

  // State
  let activeTab = "logic";
  let language = "ar";
  let searchTerm = "";
  let darkMode = false;

  // Navigation
  const tabs = [
    { id: "logic", name: "المنطق", icon: "a" },
    { id: "math", name: "الرياضيات", icon: "∫" },
    { id: "physics", name: "الفيزياء", icon: "⚛" },
    { id: "chemistry", name: "الكيمياء", icon: "⚗" }
  ];

  // Toggle language
  function toggleLanguage() {
    language = language === "ar" ? "en" : "ar";
  }

  // Toggle dark mode
  function toggleDarkMode() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle(
      "dark-mode",
      darkMode
    );
  }

  // Filter function
  $: filteredContent = [];
</script>

<svelte:head>
  <title>دليل شامل للمؤثرات في المنطق والعلوم</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
  <style>
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
  </style>
</svelte:head>

<div class="container">
  <!-- Header -->
  <header class="header">
    <div class="controls">
      <button
        class="control-btn"
        on:click={toggleLanguage}
        title="تبديل اللغة"
      >
        {#if language === "ar"}ع{:else}EN{/if}
      </button>
      <button
        class="control-btn"
        on:click={toggleDarkMode}
        title="الوضع الداكن"
      >
        {#if darkMode}<i class="fas fa-sun"></i>{:else}<i
            class="fas fa-moon"
          ></i>{/if}
      </button>
    </div>

    <h1>
      {#if language === "ar"}
        دليل شامل للمؤثرات في المنطق والعلوم
      {:else}
        Comprehensive Guide to Logic, Math, Physics &
        Chemistry Operators
      {/if}
    </h1>
    <p>
      {#if language === "ar"}
        مرجع تفاعلي شامل للمؤثرات والرموز المستخدمة في
        المنطق والرياضيات والفيزياء والكيمياء
      {:else}
        Interactive reference guide for operators and
        symbols used in logic, mathematics, physics, and
        chemistry
      {/if}
    </p>
  </header>

  <!-- Search Bar -->
  <div class="search-container">
    <i class="fas fa-search search-icon"></i>
    <input
      type="text"
      class="search-input"
      placeholder={language === "ar"
        ? "ابحث عن مؤثر أو رمز..."
        : "Search for an operator or symbol..."}
      bind:value={searchTerm}
    />
  </div>

  <!-- Navigation Tabs -->
  <nav class="nav-tabs">
    {#each tabs as tab}
      <button
        class="tab-btn {tab.id} {activeTab === tab.id
          ? 'active'
          : ''}"
        on:click={() => (activeTab = tab.id)}
      >
        <span>{tab.icon}</span>
        <span>{tab.name}</span>
      </button>
    {/each}
  </nav>

  <!-- Main Content -->
  <main class="content-area">
    {#if activeTab === "logic"}
      <LogicSection {language} {searchTerm} />
    {:else if activeTab === "math"}
      <MathSection {language} {searchTerm} />
    {:else if activeTab === "physics"}
      <PhysicsSection {language} {searchTerm} />
    {:else if activeTab === "chemistry"}
      <ChemistrySection {language} {searchTerm} />
    {/if}
  </main>

  <!-- Quick Facts -->
  <div class="quick-facts">
    <h3>
      <i class="fas fa-lightbulb"></i>
      {language === "ar" ? "حقائق سريعة" : "Quick Facts"}
    </h3>
    <div class="fact-item">
      <i
        class="fas fa-check-circle"
        style="color: var(--success)"
      ></i>
      <span>
        {#if language === "ar"}
          معظم الرموز الرياضية المعاصرة ظهرت في القرنين
          السادس عشر والسابع عشر
        {:else}
          Most modern mathematical symbols emerged in the
          16th-17th centuries
        {/if}
      </span>
    </div>
    <div class="fact-item">
      <i
        class="fas fa-check-circle"
        style="color: var(--success)"
      ></i>
      <span>
        {#if language === "ar"}
          رمز النهاية ∞ صممه جون واليس عام 1655
        {:else}
          The infinity symbol ∞ was designed by John Wallis
          in 1655
        {/if}
      </span>
    </div>
    <div class="fact-item">
      <i
        class="fas fa-check-circle"
        style="color: var(--success)"
      ></i>
      <span>
        {#if language === "ar"}
          رمز التكامل ∫ استوحاه لايبنتز من حرف S للكلمة
          اللاتينية "summa"
        {:else}
          The integral symbol ∫ was inspired by Leibniz from
          the letter S for "summa"
        {/if}
      </span>
    </div>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <p>
      {#if language === "ar"}
        © 2024 دليل المؤثرات العلمية | تم التطوير لأغراض
        تعليمية
      {:else}
        © 2024 Scientific Operators Guide | Developed for
        Educational Purposes
      {/if}
    </p>
  </footer>
</div>
