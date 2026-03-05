<!-- src/lib/components/slides/FutureFieldSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";

  const metrics = [
    { metric: "Net Worth", target: "$10M" },
    { metric: "Class Position", target: "Owning Class" },
    {
      metric: "Income Source",
      target: "From assets, not labor"
    },
    {
      metric: "Geography",
      target: "Intelligent use of space"
    },
    {
      metric: "Identity",
      target: "Not defined by role or class"
    }
  ];
</script>

<div class="future-slide">
  <div class="future-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Future Field (2026+)
    </h1>

    <div class="target-state parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Target State
      </h2>
      <div class="metrics-grid">
        {#each metrics as item, index}
          <div
            class="metric-card"
            style="animation-delay: {index * 0.1}s"
          >
            <div
              class="metric-name"
              style="color: {colors.pearlAqua};"
            >
              {item.metric}
            </div>
            <div
              class="metric-value"
              style="color: {colors.vanillaCustard};"
            >
              {item.target}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="product-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Perfected Product:
      </h2>
      <ul>
        <li style="color: {colors.vanillaCustard};">
          Smart Wallet, Smart Banking, Smart International
          Tax
        </li>
        <li style="color: {colors.vanillaCustard};">
          Anonymous international clients → Anonymous
          corporation
        </li>
        <li style="color: {colors.vanillaCustard};">
          High flow, low maintenance
        </li>
        <li style="color: {colors.vanillaCustard};">
          Minimal PL for passive income
        </li>
      </ul>
    </div>

    <div class="timeline-section parallax-item">
      <div class="timeline-marker">
        <span
          class="marker now"
          style="background: {colors.darkCyan};"
          >Right Now: Premium features, subscription model</span
        >
        <span
          class="marker next"
          style="background: {colors.goldenOrange};"
          >Next: The architecture completes itself</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .future-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .future-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .target-state {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .metric-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.2rem;
    border-radius: 0.5rem;
    text-align: center;
    border: 1px solid var(--dark-cyan);
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .metric-name {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .metric-value {
    font-size: 1.3rem;
    font-weight: 600;
  }

  .product-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--golden-orange);
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .product-section ul {
    list-style: none;
    padding: 0;
  }

  .product-section li {
    font-size: 1.1rem;
    margin: 0.8rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .product-section li::before {
    content: "→";
    position: absolute;
    left: 0;
    color: var(--golden-orange);
  }

  .timeline-section {
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .timeline-marker {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .marker {
    padding: 1rem;
    border-radius: 0.5rem;
    color: var(--ink-black);
    font-weight: 600;
    text-align: center;
    animation: pulse 2s infinite;
  }

  .now {
    background: var(--dark-cyan);
  }

  .next {
    background: var(--golden-orange);
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

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .metrics-grid {
      grid-template-columns: 1fr;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
</style>
