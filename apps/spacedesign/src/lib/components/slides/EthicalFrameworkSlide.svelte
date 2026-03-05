<!-- src/lib/components/slides/EthicalFrameworkSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const values = [
    {
      value: "Knowing what you want and holding it",
      meaning: "Vision as anchor. No drift."
    },
    {
      value: "Not settling for less than your vision",
      meaning: "Quality as non-negotiable."
    },
    {
      value: "Using geography intelligently",
      meaning: "Space as strategy. Location as leverage."
    },
    {
      value:
        "Not being defined by work role or social class",
      meaning: "Identity beyond function."
    },
    {
      value: "Controlling information flow",
      meaning:
        "What enters, what exits. The ethics of flow."
    },
    {
      value: "Responsible exchange where it matters",
      meaning:
        "Investment, not extraction. Care in key relationships."
    }
  ];
</script>

<div class="ethical-slide">
  <div class="ethical-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Values That Guide
    </h1>

    <div class="values-grid">
      {#each values as item, index}
        <div
          class="value-card parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <div
            class="value-name"
            style="color: {colors.goldenOrange};"
          >
            {item.value}
          </div>
          <div
            class="value-meaning"
            style="color: {colors.pearlAqua};"
          >
            {item.meaning}
          </div>
        </div>
      {/each}
    </div>

    <div class="ethical-flow parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Ethical Flow:
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Not speaking too much or too late.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Not being present too early or too late.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Being present-absent.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Neither too much force nor too little.
      </p>

      <div class="flow-domains">
        <span
          class="domain-tag"
          style="background: {colors.darkTeal};"
          >In digital spaces</span
        >
        <span
          class="domain-tag"
          style="background: {colors.darkCyan};"
          >In clinical sessions</span
        >
        <span
          class="domain-tag"
          style="background: {colors.rustySpice};"
          >In family relationships</span
        >
        <span
          class="domain-tag"
          style="background: {colors.goldenOrange};"
          >In financial transactions</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .ethical-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .ethical-container {
    max-width: 1000px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .value-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    border-left: 4px solid var(--golden-orange);
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .value-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .value-meaning {
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.9;
  }

  .ethical-flow {
    background: rgba(0, 0, 0, 0.4);
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .ethical-flow h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .ethical-flow p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    font-style: italic;
  }

  .flow-domains {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .domain-tag {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    color: var(--vanilla-custard);
    font-size: 0.9rem;
    transition: transform 0.3s ease;
  }

  .domain-tag:hover {
    transform: scale(1.05);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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

    .values-grid {
      grid-template-columns: 1fr;
    }

    .ethical-flow h2 {
      font-size: 1.5rem;
    }

    .ethical-flow p {
      font-size: 1rem;
    }
  }
</style>
