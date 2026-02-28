<script>
  import { onMount } from "svelte";

  // Tab functionality
  onMount(() => {
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

    // Auto-focus on first question when practice section is visible
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          if (
            document
              .getElementById("logic")
              ?.classList.contains("active")
          ) {
            document.getElementById("q1")?.focus();
          }
        }, 300);
      });
    });
  });

  // Practice answer checking
  function checkAnswer(questionNum) {
    const answerInput = document.getElementById(
      `q${questionNum}`
    );
    const resultDiv = document.getElementById(
      `result${questionNum}`
    );
    const answer = answerInput.value.trim().toLowerCase();

    const correctAnswers = {
      1: [
        "(p ∧ q) ⇒ r",
        "p ∧ q ⇒ r",
        "(p and q) implies r",
        "if p and q then r"
      ],
      2: [
        "sum of squares from 1 to 5",
        "1² + 2² + 3² + 4² + 5²",
        "summation of i squared from 1 to 5",
        "sum i^2 from i=1 to 5"
      ],
      3: [
        "reversible reaction",
        "equilibrium",
        "reversible process",
        "chemical equilibrium"
      ]
    };

    if (answer === "") {
      resultDiv.textContent = "Please enter an answer";
      resultDiv.className = "result incorrect";
      return;
    }

    const isCorrect = correctAnswers[questionNum].some(
      (correct) =>
        answer.includes(correct.toLowerCase()) ||
        correct.toLowerCase().includes(answer)
    );

    if (isCorrect) {
      resultDiv.textContent = "✅ Correct! Well done.";
      resultDiv.className = "result correct";
    } else {
      resultDiv.textContent = "❌ Not quite. Try again!";
      resultDiv.className = "result incorrect";

      // Show hint after incorrect answer
      setTimeout(() => {
        const hints = {
          1: "Hint: Use ∧ for AND and ⇒ for THEN",
          2: "Hint: ∑ means summation, i² means i squared",
          3: "Hint: This symbol indicates a reaction that goes both ways"
        };
        resultDiv.textContent += ` ${hints[questionNum]}`;
      }, 1000);
    }
  }
</script>

<svelte:head>
  <title
    >Comprehensive Guide: Logic, Math, Physics & Chemistry
    Operators</title
  >
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</svelte:head>

<div class="container mainpage">
  <title></title>

  <div class="container">
    <h1>Logic, Math, Physics & Chemistry Operators</h1>
    <p class="subtitle">
      A comprehensive guide to operators across disciplines
      - from basic logic connectors to advanced scientific
      notation
    </p>

    <div class="legend-container">
      <div class="legend-box logic-box">
        <div class="legend-title">
          <span style="color: var(--logic)">🔣</span> Logic Operators
        </div>
        <div class="legend-grid">
          <div class="legend-item logic-item">
            <strong>Propositional Logic:</strong> AND, OR, NOT,
            IMPLIES
          </div>
          <div class="legend-item logic-item">
            <strong>Quantifiers:</strong> ∀ (for all), ∃ (exists)
          </div>
          <div class="legend-item logic-item">
            <strong>Set Theory:</strong> ∈ (belongs to), ∪ (union),
            ∩ (intersection)
          </div>
        </div>
      </div>

      <div class="legend-box math-box">
        <div class="legend-title">
          <span style="color: var(--math)">∫</span> Math Operators
        </div>
        <div class="legend-grid">
          <div class="legend-item math-item">
            <strong>Arithmetic:</strong> +, −, ×, ÷, √
          </div>
          <div class="legend-item math-item">
            <strong>Calculus:</strong> ∂ (partial), ∫ (integral),
            ∇ (nabla)
          </div>
          <div class="legend-item math-item">
            <strong>Linear Algebra:</strong> · (dot), × (cross),
            † (adjoint)
          </div>
        </div>
      </div>

      <div class="legend-box physics-box">
        <div class="legend-title">
          <span style="color: var(--physics)">⚛</span> Physics
          Operators
        </div>
        <div class="legend-grid">
          <div class="legend-item physics-item">
            <strong>Mechanics:</strong> F (force), v (velocity),
            a (acceleration)
          </div>
          <div class="legend-item physics-item">
            <strong>Quantum:</strong> Ĥ (Hamiltonian), Ψ (wave
            function)
          </div>
          <div class="legend-item physics-item">
            <strong>Relativity:</strong> η (metric tensor), Γ
            (Christoffel)
          </div>
        </div>
      </div>

      <div class="legend-box chemistry-box">
        <div class="legend-title">
          <span style="color: var(--chemistry)">⚗</span> Chemistry
          Operators
        </div>
        <div class="legend-grid">
          <div class="legend-item chemistry-item">
            <strong>Reactions:</strong> → (yields), ⇌ (equilibrium)
          </div>
          <div class="legend-item chemistry-item">
            <strong>Notation:</strong> ∆ (change), ⦵ (standard
            state)
          </div>
          <div class="legend-item chemistry-item">
            <strong>Quantum Chemistry:</strong> Ê (energy operator)
          </div>
        </div>
      </div>
    </div>

    <div class="nav-tabs">
      <button
        class="tab-btn logic-btn active"
        data-tab="logic">Logic Operators</button
      >
      <button class="tab-btn math-btn" data-tab="math"
        >Math Operators</button
      >
      <button class="tab-btn physics-btn" data-tab="physics"
        >Physics Operators</button
      >
      <button
        class="tab-btn chemistry-btn"
        data-tab="chemistry">Chemistry Operators</button
      >
    </div>

    <!-- Logic Operators Tab -->
    <div id="logic" class="tab-content active">
      <h2 class="section-title logic-title">
        Basic Logic Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ∧
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">
            Logical AND (Conjunction)
          </div>
          <div class="operator-description">
            Returns true if both operands are true.
            Represents "and" in logical statements.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              P ∧ Q
            </div>
            <div class="example-explanation">
              "P and Q are both true"
            </div>
          </div>
        </div>

        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ∨
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">
            Logical OR (Disjunction)
          </div>
          <div class="operator-description">
            Returns true if at least one operand is true.
            Represents inclusive "or".
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              P ∨ Q
            </div>
            <div class="example-explanation">
              "Either P or Q is true (or both)"
            </div>
          </div>
        </div>

        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ¬
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">
            Logical NOT (Negation)
          </div>
          <div class="operator-description">
            Returns the opposite truth value. Inverts true
            to false and false to true.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              ¬P
            </div>
            <div class="example-explanation">
              "P is not true" or "It is not the case that P"
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title logic-title advanced">
        Advanced Logic Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ⇒
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Implication (If...Then)
          </div>
          <div class="operator-description">
            "If P then Q". False only when P is true and Q
            is false.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              P ⇒ Q
            </div>
            <div class="example-explanation">
              "If it rains (P), then the ground is wet (Q)"
            </div>
          </div>
        </div>

        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ⇔
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Biconditional (If and Only If)
          </div>
          <div class="operator-description">
            "P if and only if Q". True when P and Q have the
            same truth value.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              P ⇔ Q
            </div>
            <div class="example-explanation">
              "A triangle is equilateral if and only if all
              angles are 60°"
            </div>
          </div>
        </div>

        <div class="operator-card logic-card">
          <div class="operator-header">
            <div class="operator-symbol logic-symbol">
              ∀
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Universal Quantifier
          </div>
          <div class="operator-description">
            "For all" or "For every". Indicates that a
            property holds for all members of a domain.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content logic-example">
              ∀x ∈ ℝ, x² ≥ 0
            </div>
            <div class="example-explanation">
              "For all real numbers x, x squared is
              non-negative"
            </div>
          </div>
        </div>
      </div>

      <table class="comparison-table">
        <thead>
          <tr>
            <th colspan="4">Logical Connectors Summary</th>
          </tr>
          <tr>
            <th>Connector</th>
            <th>Symbol</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Because/Since</td>
            <td class="table-symbol logic-symbol-cell">∵</td
            >
            <td>Reason or cause</td>
            <td>A ∵ B (A because B)</td>
          </tr>
          <tr>
            <td>Therefore</td>
            <td class="table-symbol logic-symbol-cell">∴</td
            >
            <td>Conclusion or result</td>
            <td>A ∴ B (A therefore B)</td>
          </tr>
          <tr>
            <td>First/Firstly</td>
            <td>① or (1)</td>
            <td>Initial point in sequence</td>
            <td>① P, ② Q, ③ R</td>
          </tr>
          <tr>
            <td>Last/Finally</td>
            <td>Ⓝ or (n)</td>
            <td>Final point in sequence</td>
            <td>Finally, we conclude...</td>
          </tr>
          <tr>
            <td>In relation to</td>
            <td>∝</td>
            <td>Proportional relationship</td>
            <td>A ∝ B (A is proportional to B)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Math Operators Tab -->
    <div id="math" class="tab-content">
      <h2 class="section-title math-title">
        Basic Math Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">±</div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Plus-Minus</div>
          <div class="operator-description">
            Indicates two possible values, one positive and
            one negative.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              x = 3 ± 1
            </div>
            <div class="example-explanation">
              "x equals 3 plus or minus 1" (x = 2 or x = 4)
            </div>
          </div>
        </div>

        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">×</div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Multiplication</div>
          <div class="operator-description">
            Alternative symbol for multiplication, often
            used in vector products.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              3 × 4 = 12
            </div>
            <div class="example-explanation">
              Cross product: a × b
            </div>
          </div>
        </div>

        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">÷</div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Division</div>
          <div class="operator-description">
            Classic division symbol, less common in advanced
            mathematics.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              12 ÷ 4 = 3
            </div>
            <div class="example-explanation">
              "Twelve divided by four equals three"
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title math-title advanced">
        Advanced Math Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">∫</div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">Integral</div>
          <div class="operator-description">
            Represents integration, the inverse operation of
            differentiation.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              ∫f(x)dx
            </div>
            <div class="example-explanation">
              "The integral of f(x) with respect to x"
            </div>
          </div>
        </div>

        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">∂</div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Partial Derivative
          </div>
          <div class="operator-description">
            Derivative with respect to one variable while
            holding others constant.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              ∂f/∂x
            </div>
            <div class="example-explanation">
              "Partial derivative of f with respect to x"
            </div>
          </div>
        </div>

        <div class="operator-card math-card">
          <div class="operator-header">
            <div class="operator-symbol math-symbol">∇</div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Nabla/Del Operator
          </div>
          <div class="operator-description">
            Vector differential operator used in gradient,
            divergence, and curl.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content math-example">
              ∇f
            </div>
            <div class="example-explanation">
              "Gradient of f" (vector of partial
              derivatives)
            </div>
          </div>
        </div>
      </div>

      <table class="comparison-table math-table">
        <thead>
          <tr>
            <th colspan="4"
              >Mathematical Operators Summary</th
            >
          </tr>
          <tr>
            <th>Operator</th>
            <th>Symbol</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Square Root</td>
            <td class="table-symbol math-symbol-cell">√</td>
            <td>Principal square root</td>
            <td>√9 = 3</td>
          </tr>
          <tr>
            <td>n-th Root</td>
            <td class="table-symbol math-symbol-cell">ⁿ√</td
            >
            <td>n-th root of a number</td>
            <td>³√8 = 2</td>
          </tr>
          <tr>
            <td>Summation</td>
            <td class="table-symbol math-symbol-cell">∑</td>
            <td>Sum of a sequence</td>
            <td>∑(i=1 to n) i</td>
          </tr>
          <tr>
            <td>Product</td>
            <td class="table-symbol math-symbol-cell">∏</td>
            <td>Product of a sequence</td>
            <td>∏(i=1 to n) i = n!</td>
          </tr>
          <tr>
            <td>Limit</td>
            <td class="table-symbol math-symbol-cell"
              >lim</td
            >
            <td>Limit of a function</td>
            <td>lim(x→0) sin(x)/x = 1</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Physics Operators Tab -->
    <div id="physics" class="tab-content">
      <h2 class="section-title physics-title">
        Basic Physics Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              →
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Vector</div>
          <div class="operator-description">
            Indicates a vector quantity with both magnitude
            and direction.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              v⃗ = 5 m/s east
            </div>
            <div class="example-explanation">
              "Velocity vector of 5 meters per second
              eastward"
            </div>
          </div>
        </div>

        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              Δ
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Delta (Change)</div>
          <div class="operator-description">
            Represents change in a quantity or difference
            between values.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              Δx = x₂ - x₁
            </div>
            <div class="example-explanation">
              "Change in position equals final minus initial
              position"
            </div>
          </div>
        </div>

        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              ·
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Dot Product</div>
          <div class="operator-description">
            Scalar product of two vectors, producing a
            scalar quantity.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              A·B = |A||B|cosθ
            </div>
            <div class="example-explanation">
              "Dot product gives projection of one vector
              onto another"
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title physics-title advanced">
        Advanced Physics Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              ∇
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">Del Operator</div>
          <div class="operator-description">
            Vector differential operator crucial in
            electromagnetism and fluid dynamics.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              ∇·E = ρ/ε₀
            </div>
            <div class="example-explanation">
              "Gauss's law for electricity (divergence of E
              field)"
            </div>
          </div>
        </div>

        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              Ĥ
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Hamiltonian Operator
          </div>
          <div class="operator-description">
            Quantum mechanical operator representing total
            energy of a system.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              ĤΨ = EΨ
            </div>
            <div class="example-explanation">
              "Time-independent Schrödinger equation"
            </div>
          </div>
        </div>

        <div class="operator-card physics-card">
          <div class="operator-header">
            <div class="operator-symbol physics-symbol">
              Γ
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">
            Christoffel Symbol
          </div>
          <div class="operator-description">
            Describes the Levi-Civita connection in general
            relativity.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content physics-example">
              Γⁱⱼₖ
            </div>
            <div class="example-explanation">
              "Connection coefficients in curved spacetime"
            </div>
          </div>
        </div>
      </div>

      <div class="quick-reference">
        <div class="reference-card physics-reference">
          <div class="reference-title">
            Classical Mechanics
          </div>
          <ul class="reference-list physics-list">
            <li>
              <strong>F</strong> = ma (Newton's Second Law)
            </li>
            <li><strong>p</strong> = mv (Momentum)</li>
            <li><strong>τ</strong> = r × F (Torque)</li>
            <li>
              <strong>L</strong> = r × p (Angular Momentum)
            </li>
            <li><strong>W</strong> = F·d (Work)</li>
          </ul>
        </div>

        <div class="reference-card physics-reference">
          <div class="reference-title">
            Electromagnetism
          </div>
          <ul class="reference-list physics-list">
            <li><strong>E</strong> = Electric Field</li>
            <li><strong>B</strong> = Magnetic Field</li>
            <li>
              <strong>∇×E</strong> = -∂B/∂t (Faraday's Law)
            </li>
            <li>
              <strong>∇·B</strong> = 0 (Gauss's Law for Magnetism)
            </li>
            <li><strong>J</strong> = Current Density</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Chemistry Operators Tab -->
    <div id="chemistry" class="tab-content">
      <h2 class="section-title chemistry-title">
        Basic Chemistry Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              →
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Reaction Arrow</div>
          <div class="operator-description">
            Indicates direction of a chemical reaction from
            reactants to products.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              2H₂ + O₂ → 2H₂O
            </div>
            <div class="example-explanation">
              "Hydrogen and oxygen react to form water"
            </div>
          </div>
        </div>

        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              ⇌
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Equilibrium Arrow</div>
          <div class="operator-description">
            Indicates a reversible reaction at equilibrium.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              N₂ + 3H₂ ⇌ 2NH₃
            </div>
            <div class="example-explanation">
              "Haber process: nitrogen and hydrogen in
              equilibrium with ammonia"
            </div>
          </div>
        </div>

        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              Δ
            </div>
            <div class="operator-level basic-level">
              Basic
            </div>
          </div>
          <div class="operator-name">Heat/Change</div>
          <div class="operator-description">
            Indicates heat applied or change in a
            thermodynamic quantity.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              CaCO₃ → CaO + CO₂ (Δ)
            </div>
            <div class="example-explanation">
              "Calcium carbonate decomposes with heat to
              calcium oxide and carbon dioxide"
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title chemistry-title advanced">
        Advanced Chemistry Operators
      </h2>
      <div class="operator-grid">
        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              ⦵
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">Standard State</div>
          <div class="operator-description">
            Indicates a thermodynamic quantity at standard
            conditions (1 bar, specified temperature).
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              ΔG⦵
            </div>
            <div class="example-explanation">
              "Standard Gibbs free energy change"
            </div>
          </div>
        </div>

        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              Ê
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">Energy Operator</div>
          <div class="operator-description">
            Quantum chemical operator representing energy in
            molecular systems.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              Ĥ = Ê + V̂
            </div>
            <div class="example-explanation">
              "Hamiltonian as sum of kinetic and potential
              energy operators"
            </div>
          </div>
        </div>

        <div class="operator-card chemistry-card">
          <div class="operator-header">
            <div class="operator-symbol chemistry-symbol">
              ∇²
            </div>
            <div class="operator-level advanced-level">
              Advanced
            </div>
          </div>
          <div class="operator-name">Laplacian</div>
          <div class="operator-description">
            Divergence of gradient, appears in diffusion and
            Schrödinger equations.
          </div>
          <div class="example-box">
            <div class="example-title">Example:</div>
            <div class="example-content chemistry-example">
              -ħ²/2m ∇²Ψ + VΨ = EΨ
            </div>
            <div class="example-explanation">
              "Time-independent Schrödinger equation for
              molecular systems"
            </div>
          </div>
        </div>
      </div>

      <table class="comparison-table chemistry-table">
        <thead>
          <tr>
            <th colspan="4">Chemical Notation Summary</th>
          </tr>
          <tr>
            <th>Notation</th>
            <th>Symbol</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gas</td>
            <td class="table-symbol chemistry-symbol-cell"
              >(g)</td
            >
            <td>Gaseous state</td>
            <td>H₂O(g)</td>
          </tr>
          <tr>
            <td>Liquid</td>
            <td class="table-symbol chemistry-symbol-cell"
              >(l)</td
            >
            <td>Liquid state</td>
            <td>H₂O(l)</td>
          </tr>
          <tr>
            <td>Solid</td>
            <td class="table-symbol chemistry-symbol-cell"
              >(s)</td
            >
            <td>Solid state</td>
            <td>NaCl(s)</td>
          </tr>
          <tr>
            <td>Aqueous</td>
            <td class="table-symbol chemistry-symbol-cell"
              >(aq)</td
            >
            <td>Dissolved in water</td>
            <td>NaCl(aq)</td>
          </tr>
          <tr>
            <td>Catalyst</td>
            <td class="table-symbol chemistry-symbol-cell"
              >→[cat]</td
            >
            <td>Reaction with catalyst</td>
            <td>2H₂O₂ →[MnO₂] 2H₂O + O₂</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="practice-section">
      <h2 class="practice-title">Practice Exercises</h2>

      <div class="practice-question">
        <div class="question-text">
          1. Complete the logical statement: "If it is
          raining (P) AND the temperature is below freezing
          (Q), THEN there will be snow (R)."
        </div>
        <input
          type="text"
          class="answer-input"
          id="q1"
          placeholder="Write the logical expression..."
        />
        <button
          class="check-button"
          on:click={() => checkAnswer(1)}
          >Check Answer</button
        >
        <div id="result1" class="result"></div>
      </div>

      <div class="practice-question">
        <div class="question-text">
          2. What does this mathematical expression
          represent? ∑(i=1 to 5) i²
        </div>
        <input
          type="text"
          class="answer-input"
          id="q2"
          placeholder="Describe the operation..."
        />
        <button
          class="check-button"
          on:click={() => checkAnswer(2)}
          >Check Answer</button
        >
        <div id="result2" class="result"></div>
      </div>

      <div class="practice-question">
        <div class="question-text">
          3. In chemistry, what does the symbol ⇌ indicate?
        </div>
        <input
          type="text"
          class="answer-input"
          id="q3"
          placeholder="Describe the chemical notation..."
        />
        <button
          class="check-button"
          on:click={() => checkAnswer(3)}
          >Check Answer</button
        >
        <div id="result3" class="result"></div>
      </div>
    </div>

    <footer>
      <p>
        Comprehensive Guide to Logic, Math, Physics &
        Chemistry Operators
      </p>
      <p>
        Remember: Operators are the building blocks of
        scientific communication across disciplines!
      </p>
    </footer>
  </div>
</div>

<style>
  :root {
    --logic: #3498db;
    --math: #e74c3c;
    --physics: #2ecc71;
    --chemistry: #9b59b6;
    --basic: #f39c12;
    --advanced: #34495e;
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
    max-width: 1400px;
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
    color: var(--text-primary);
    margin-bottom: 20px;
    font-size: 3.2rem;
    background: linear-gradient(
      135deg,
      #2c3e50,
      #3498db,
      #e74c3c,
      #2ecc71
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 1.3rem;
    max-width: 1000px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .legend-container {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
    gap: 25px;
    margin-bottom: 60px;
  }

  .legend-box {
    background: white;
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-top: 5px solid;
    transition: transform 0.3s ease;
  }

  .legend-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  .logic-box {
    border-top-color: var(--logic);
  }
  .math-box {
    border-top-color: var(--math);
  }
  .physics-box {
    border-top-color: var(--physics);
  }
  .chemistry-box {
    border-top-color: var(--chemistry);
  }

  .legend-title {
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
  }

  .legend-title i {
    margin-right: 15px;
    font-size: 1.6rem;
  }

  .legend-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 12px 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid;
  }

  .logic-item {
    border-left-color: var(--logic);
  }
  .math-item {
    border-left-color: var(--math);
  }
  .physics-item {
    border-left-color: var(--physics);
  }
  .chemistry-item {
    border-left-color: var(--chemistry);
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
    border: 2px solid;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .logic-btn {
    border-color: var(--logic);
    color: var(--logic);
  }
  .math-btn {
    border-color: var(--math);
    color: var(--math);
  }
  .physics-btn {
    border-color: var(--physics);
    color: var(--physics);
  }
  .chemistry-btn {
    border-color: var(--chemistry);
    color: var(--chemistry);
  }

  .tab-btn:hover {
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .logic-btn:hover {
    background: var(--logic);
  }
  .math-btn:hover {
    background: var(--math);
  }
  .physics-btn:hover {
    background: var(--physics);
  }
  .chemistry-btn:hover {
    background: var(--chemistry);
  }

  .tab-btn.active {
    color: white;
  }

  .logic-btn.active {
    background: var(--logic);
  }
  .math-btn.active {
    background: var(--math);
  }
  .physics-btn.active {
    background: var(--physics);
  }
  .chemistry-btn.active {
    background: var(--chemistry);
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
    color: var(--text-primary);
    margin: 50px 0 30px 0;
    padding-bottom: 15px;
    border-bottom: 3px solid;
    font-size: 2.2rem;
    position: relative;
  }

  .logic-title {
    border-bottom-color: var(--logic);
  }
  .math-title {
    border-bottom-color: var(--math);
  }
  .physics-title {
    border-bottom-color: var(--physics);
  }
  .chemistry-title {
    border-bottom-color: var(--chemistry);
  }

  .section-title:after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100px;
    height: 3px;
    background: var(--basic);
  }

  .section-title.advanced:after {
    background: var(--advanced);
  }

  .operator-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(350px, 1fr)
    );
    gap: 30px;
    margin: 40px 0;
  }

  .operator-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-left: 6px solid;
    transition: transform 0.3s ease;
  }

  .operator-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  .logic-card {
    border-left-color: var(--logic);
  }
  .math-card {
    border-left-color: var(--math);
  }
  .physics-card {
    border-left-color: var(--physics);
  }
  .chemistry-card {
    border-left-color: var(--chemistry);
  }

  .operator-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .operator-symbol {
    font-size: 2.5rem;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
  }

  .logic-symbol {
    color: var(--logic);
  }
  .math-symbol {
    color: var(--math);
  }
  .physics-symbol {
    color: var(--physics);
  }
  .chemistry-symbol {
    color: var(--chemistry);
  }

  .operator-level {
    padding: 6px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .basic-level {
    background: rgba(243, 156, 18, 0.15);
    color: var(--basic);
  }
  .advanced-level {
    background: rgba(52, 73, 94, 0.15);
    color: var(--advanced);
  }

  .operator-name {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.3rem;
    color: var(--text-primary);
  }

  .operator-description {
    color: var(--text-secondary);
    margin-bottom: 20px;
    line-height: 1.7;
  }

  .example-box {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    border: 1px solid #eaeaea;
  }

  .example-title {
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--text-primary);
  }

  .example-content {
    font-family: "Courier New", monospace;
    font-size: 1.1rem;
    margin-bottom: 10px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    border-left: 3px solid;
  }

  .logic-example {
    border-left-color: var(--logic);
  }
  .math-example {
    border-left-color: var(--math);
  }
  .physics-example {
    border-left-color: var(--physics);
  }
  .chemistry-example {
    border-left-color: var(--chemistry);
  }

  .example-explanation {
    font-size: 0.95rem;
    color: var(--text-secondary);
    font-style: italic;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    overflow: hidden;
  }

  .comparison-table th {
    background-color: var(--logic);
    color: white;
    padding: 20px;
    text-align: center;
    font-weight: 600;
  }

  .math-table th {
    background-color: var(--math);
  }
  .physics-table th {
    background-color: var(--physics);
  }
  .chemistry-table th {
    background-color: var(--chemistry);
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

  .table-symbol {
    font-size: 1.8rem;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
    margin-bottom: 5px;
  }

  .logic-symbol-cell {
    color: var(--logic);
  }
  .math-symbol-cell {
    color: var(--math);
  }
  .physics-symbol-cell {
    color: var(--physics);
  }
  .chemistry-symbol-cell {
    color: var(--chemistry);
  }

  .quick-reference {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
    gap: 25px;
    margin: 50px 0;
  }

  .reference-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-top: 5px solid;
  }

  .logic-reference {
    border-top-color: var(--logic);
  }
  .math-reference {
    border-top-color: var(--math);
  }
  .physics-reference {
    border-top-color: var(--physics);
  }
  .chemistry-reference {
    border-top-color: var(--chemistry);
  }

  .reference-title {
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-size: 1.4rem;
  }

  .reference-list {
    list-style-type: none;
  }

  .reference-list li {
    margin-bottom: 15px;
    padding-left: 25px;
    position: relative;
  }

  .reference-list li:before {
    content: "→";
    position: absolute;
    left: 0;
    color: inherit;
    font-weight: bold;
  }

  .logic-list li:before {
    color: var(--logic);
  }
  .math-list li:before {
    color: var(--math);
  }
  .physics-list li:before {
    color: var(--physics);
  }
  .chemistry-list li:before {
    color: var(--chemistry);
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

  .practice-question {
    background: white;
    padding: 30px;
    border-radius: 10px;
    margin-bottom: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  .question-text {
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: var(--text-primary);
  }

  .answer-input {
    width: 100%;
    padding: 15px;
    font-size: 1.2rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .check-button {
    background: #27ae60;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .check-button:hover {
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
  }
  .incorrect {
    background: rgba(231, 76, 60, 0.15);
    color: #e74c3c;
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

    .operator-grid {
      grid-template-columns: 1fr;
    }

    .quick-reference {
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
