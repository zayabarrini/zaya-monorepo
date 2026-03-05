<!-- src/lib/components/slides/KnowledgeBaseSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";

  const languages = [
    "Chinese",
    "Japanese",
    "German",
    "Russian",
    "Arabic",
    "Hindi",
    "French",
    "Italian"
  ];
  const cinemaItems = [
    "Directors (all countries)",
    "Screenplays (with searches)",
    "Budgets (actual figures)",
    "Distributors (contacts)",
    "Oscar history"
  ];
  const psychoanalysisItems = [
    "Lacan (Seminars, Ecrits)",
    "Freud (Complete works)",
    "Klein (Essays)",
    "Revista Stylus (complete)",
    "Contemporary authors"
  ];
  const philosophyItems = [
    "150 Passions assassines de Sade",
    "Klein bottle topology",
    "Feminist theory",
    "Matrilineal designs"
  ];
</script>

<div class="knowledge-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Knowledge Base
    </h1>

    <div class="knowledge-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Languages (Active Learning)
      </h2>
      <div class="language-cloud">
        {#each languages as lang}
          <span
            class="language-tag"
            style="background: {colors.darkTeal}; color: {colors.vanillaCustard};"
            >{lang}</span
          >
        {/each}
      </div>
    </div>

    <div class="knowledge-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Cinema Database
      </h2>
      <div class="knowledge-list">
        {#each cinemaItems as item}
          <div class="knowledge-item">
            <span
              class="item-bullet"
              style="color: {colors.goldenOrange};">🎬</span
            >
            <span style="color: {colors.vanillaCustard};"
              >{item}</span
            >
          </div>
        {/each}
      </div>
    </div>

    <div class="knowledge-grid">
      <div class="knowledge-section parallax-item">
        <h2 style="color: {colors.pearlAqua};">
          Psychoanalysis Library
        </h2>
        <div class="knowledge-list">
          {#each psychoanalysisItems as item}
            <div class="knowledge-item">
              <span
                class="item-bullet"
                style="color: {colors.pearlAqua};">📚</span
              >
              <span style="color: {colors.vanillaCustard};"
                >{item}</span
              >
            </div>
          {/each}
        </div>
      </div>

      <div class="knowledge-section parallax-item">
        <h2 style="color: {colors.rustySpice};">
          Philosophy/Literature
        </h2>
        <div class="knowledge-list">
          {#each philosophyItems as item}
            <div class="knowledge-item">
              <span
                class="item-bullet"
                style="color: {colors.rustySpice};">📖</span
              >
              <span style="color: {colors.vanillaCustard};"
                >{item}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .knowledge-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .knowledge-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .knowledge-section:nth-child(2) {
    animation-delay: 0.2s;
  }
  .knowledge-section:nth-child(3) {
    animation-delay: 0.4s;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--golden-orange);
    padding-bottom: 0.5rem;
  }

  .language-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .language-tag {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }

  .language-tag:hover {
    transform: scale(1.05);
  }

  .knowledge-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .knowledge-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
  }

  .knowledge-item:hover {
    transform: translateX(10px);
    background: rgba(238, 155, 0, 0.1);
  }

  .item-bullet {
    font-size: 1.2rem;
  }

  .knowledge-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
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
      font-size: 2rem;
    }

    .knowledge-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
