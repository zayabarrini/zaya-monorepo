<!-- src/lib/components/slides/RiskAssessmentSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";

  const risks = [
    {
      risk: "The List surfacing",
      mitigation:
        "Already accounted for. Transparency prepared."
    },
    {
      risk: "Product failure",
      mitigation:
        "15+ products diversify risk. One will hit."
    },
    {
      risk: "Class transition costs",
      mitigation: "Family consequences named and tracked."
    },
    {
      risk: "Market rejection",
      mitigation:
        "International clients diversify geography."
    },
    {
      risk: "Execution delay",
      mitigation:
        "Bimonthly review ensures course correction."
    }
  ];
</script>

<div class="risk-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Risk Assessment
    </h1>

    <div class="risks-container">
      {#each risks as item, index}
        <div
          class="risk-card parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <div class="risk-header">
            <span
              class="risk-icon"
              style="color: {colors.rustySpice};">⚠️</span
            >
            <h3 style="color: {colors.goldenOrange};">
              {item.risk}
            </h3>
          </div>
          <p
            class="mitigation"
            style="color: {colors.pearlAqua};"
          >
            {item.mitigation}
          </p>
        </div>
      {/each}
    </div>

    <div class="real-risk parallax-item">
      <h2 style="color: {colors.rustySpice};">
        The Real Risk:
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Not trying.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Staying in the working class grammar.
      </p>
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        Dying with the song unsung.
      </p>
    </div>
  </div>
</div>

<style>
  .risk-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content-container {
    max-width: 800px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .risks-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .risk-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    border-left: 4px solid var(--rusty-spice);
    animation: slideInUp 0.6s ease-out forwards;
    opacity: 0;
    transition: transform 0.3s ease;
  }

  .risk-card:hover {
    transform: translateY(-5px);
  }

  .risk-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .risk-icon {
    font-size: 1.2rem;
  }

  .risk-header h3 {
    font-size: 1.1rem;
    margin: 0;
  }

  .mitigation {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  .real-risk {
    background: linear-gradient(
      135deg,
      rgba(187, 62, 3, 0.2),
      rgba(0, 0, 0, 0.3)
    );
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .real-risk h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .real-risk p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
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
      transform: translateY(20px);
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

    .risks-container {
      grid-template-columns: 1fr;
    }

    .real-risk h2 {
      font-size: 1.5rem;
    }
  }
</style>
