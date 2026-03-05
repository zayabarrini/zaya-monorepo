<!-- src/lib/components/slides/AccountingSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const financeItems = [
    "FC | Res Plans | DAM | LA | ElDebts | DRE | Balanço",
    "Annual tracking: 2024, Retorno_Investimentos, Imobilizados",
    "Daily: Daily 2022 Estimativas, Prestação_de_Serv",
    "Investments: Investidores, Empréstimos, Doações"
  ];

  const schoolItems = [
    "Estratégias 2024, Escola, Clinic, Mastery Recrutamento",
    "Competitive Grid, Udemy, Livros, IA",
    "Contabilidade, Data Analysis, Guide, Advocacia"
  ];

  const knowledgeItems = [
    "Languages: Chinese, Japanese, German, Russian, Arabic, Hindi, French, Italian",
    "Cinema: Directors, Screenplays, Budgets, Distributors",
    "Psychoanalysis: Lacan, Freud, Klein, Revista Stylus",
    "Philosophy, Literature"
  ];
</script>

<div class="accounting-slide">
  <div class="accounting-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Financial Architecture (Current)
    </h1>

    <div class="dashboard-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Dashboard:
      </h2>
      <div class="tag-cloud">
        {#each financeItems as item}
          <span
            class="tag"
            style="background: {colors.darkTeal}; color: {colors.vanillaCustard};"
            >{item}</span
          >
        {/each}
      </div>
    </div>

    <div class="school-section parallax-item">
      <h2 style="color: {colors.pearlAqua};">
        The School (Zaya Barrini):
      </h2>
      <div class="tag-cloud">
        {#each schoolItems as item}
          <span
            class="tag"
            style="background: {colors.darkCyan}; color: {colors.vanillaCustard};"
            >{item}</span
          >
        {/each}
      </div>
    </div>

    <div class="knowledge-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Knowledge Base:
      </h2>
      <div class="knowledge-grid">
        {#each knowledgeItems as item}
          <div
            class="knowledge-card"
            style="background: rgba(0, 0, 0, 0.3); border-left: 4px solid {colors.goldenOrange};"
          >
            <p style="color: {colors.vanillaCustard};">
              {item}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .accounting-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .accounting-container {
    max-width: 1000px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .dashboard-section,
  .school-section,
  .knowledge-section {
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .dashboard-section {
    animation-delay: 0.2s;
  }

  .school-section {
    animation-delay: 0.4s;
  }

  .knowledge-section {
    animation-delay: 0.6s;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .tag {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }

  .tag:hover {
    transform: scale(1.05);
  }

  .knowledge-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .knowledge-card {
    padding: 1rem;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
  }

  .knowledge-card:hover {
    transform: translateX(5px);
  }

  .knowledge-card p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    .knowledge-grid {
      grid-template-columns: 1fr;
    }

    .tag {
      font-size: 0.8rem;
    }
  }
</style>
