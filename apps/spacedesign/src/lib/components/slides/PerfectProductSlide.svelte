<!-- src/lib/components/slides/PerfectProductSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const specifications = [
    {
      attribute: "Scale",
      requirement: "Impersonal, automated, international"
    },
    {
      attribute: "Nature",
      requirement: "Financial products"
    },
    {
      attribute: "Clients",
      requirement:
        "Anonymous international → Anonymous corporation"
    },
    { attribute: "Volume", requirement: "High flow" },
    {
      attribute: "Maintenance",
      requirement: "Low (annual updates)"
    },
    {
      attribute: "Threshold",
      requirement: "Passive income crossed"
    }
  ];
</script>

<div class="perfect-product-slide">
  <div class="product-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Perfect Product
    </h1>

    <div class="target-statement parallax-item">
      <p style="color: {colors.pearlAqua};">
        A product that generates
      </p>
      <p
        style="color: {colors.goldenOrange}; font-size: 2rem; font-weight: 700;"
      >
        Statement of Changes in Equity
      </p>
      <p style="color: {colors.vanillaCustard};">
        —a <span style="color: {colors.goldenOrange};"
          >glitch in the system</span
        > that enables class transition
      </p>
    </div>

    <h2
      class="spec-title parallax-item"
      style="color: {colors.goldenOrange};"
    >
      Specifications
    </h2>

    <div class="spec-grid">
      {#each specifications as spec, index}
        <div
          class="spec-item parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <div
            class="spec-attribute"
            style="color: {colors.pearlAqua};"
          >
            {spec.attribute}
          </div>
          <div
            class="spec-requirement"
            style="color: {colors.vanillaCustard};"
          >
            {spec.requirement}
          </div>
        </div>
      {/each}
    </div>

    <div class="next-steps parallax-item">
      <h3 style="color: {colors.goldenOrange};">
        Next Steps:
      </h3>
      <ul>
        <li style="color: {colors.vanillaCustard};">
          Finances integration
        </li>
        <li style="color: {colors.vanillaCustard};">
          OneKey, cryptocurrencies
        </li>
        <li style="color: {colors.vanillaCustard};">
          Smart Wallet | Smart Banking | Smart International
          Tax
        </li>
      </ul>
    </div>
  </div>
</div>

<style>
  .perfect-product-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .product-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .target-statement {
    text-align: center;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .target-statement p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .spec-title {
    font-size: 2rem;
    margin: 2rem 0 1.5rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.3s both;
  }

  .spec-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .spec-item {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--dark-cyan);
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .spec-attribute {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .spec-requirement {
    font-size: 1rem;
    line-height: 1.5;
  }

  .next-steps {
    background: var(--inkBlack);
    padding: 1.5rem;
    border-radius: 1rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .next-steps h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .next-steps ul {
    list-style: none;
    padding: 0;
  }

  .next-steps li {
    font-size: 1.1rem;
    margin: 0.8rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .next-steps li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--golden-orange);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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

    .spec-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
