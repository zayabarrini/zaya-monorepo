<!-- src/lib/components/slides/FrameworkSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const domains = [
    {
      name: "Urban",
      description: "Migration patterns, rural to digital"
    },
    {
      name: "Digital",
      description: "Ethical flow in digital spaces"
    },
    {
      name: "Feminist",
      description: "Designs oriented toward care"
    },
    {
      name: "Linguistic",
      description:
        "Transliteration, migration between tongues"
    },
    {
      name: "Generational",
      description:
        "Past, current, future—participating in futurity"
    },
    {
      name: "Psychic",
      description: "Regulating symptoms, phobias, paranoia"
    }
  ];
</script>

<div class="framework-slide">
  <div class="framework-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Space Design + Sign Flow
    </h1>

    <div class="core-concept parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Core Concept:
      </h2>
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        Ethical flow in all systems
      </p>
      <p style="color: {colors.vanillaCustard};">
        Time-space-force as a unified field
      </p>
      <p style="color: {colors.vanillaCustard};">
        Present-absent: neither too much nor too little
      </p>
    </div>

    <h2
      class="applications-title parallax-item"
      style="color: {colors.goldenOrange};"
    >
      Applications
    </h2>

    <div class="domains-grid">
      {#each domains as domain, index}
        <div
          class="domain-card parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <h3 style="color: {colors.pearlAqua};">
            {domain.name}
          </h3>
          <p style="color: {colors.vanillaCustard};">
            {domain.description}
          </p>
        </div>
      {/each}
    </div>

    <div class="ai-note parallax-item">
      <p style="color: {colors.vanillaCustard};">
        <span style="color: {colors.goldenOrange};"
          >AI as Tool:</span
        > Educational, ethical flow of questions and answers,
        creating architectures of the world
      </p>
    </div>
  </div>
</div>

<style>
  .framework-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .framework-container {
    max-width: 1000px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .core-concept {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    border: 1px solid var(--golden-orange);
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .core-concept h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .core-concept p {
    font-size: 1.2rem;
    margin: 0.8rem 0;
  }

  .applications-title {
    font-size: 2rem;
    margin: 2rem 0 1.5rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.3s both;
  }

  .domains-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .domain-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    border-left: 4px solid var(--golden-orange);
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .domain-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .domain-card p {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.9;
  }

  .ai-note {
    background: var(--inkBlack);
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .ai-note p {
    font-size: 1.1rem;
    line-height: 1.6;
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

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .domains-grid {
      grid-template-columns: 1fr;
    }

    .core-concept h2 {
      font-size: 1.5rem;
    }
  }
</style>
