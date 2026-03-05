<!-- src/lib/components/slides/AskSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const investments = [
    "Three formations (Psychoanalysis, Cinema, Engineering)",
    "A theoretical framework (Space Design + Sign Flow)",
    "A product ecosystem (15+ digital products)",
    "A financial architecture (Excel dashboard, tracking)",
    "An ethical framework (The List, The Values)",
    "A strategy (The Glitch, The Perfect Product)",
    "A target ($10M by 2026+)"
  ];
</script>

<div class="ask-slide">
  <div class="ask-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Why Invest in Me?
    </h1>

    <div class="investment-philosophy">
      <div class="philosophy-item parallax-item">
        <span class="not" style="color: {colors.pearlAqua};"
          >You are not investing in a product.</span
        >
        <span
          class="but"
          style="color: {colors.goldenOrange};"
          >You are investing in <strong
            >a trajectory.</strong
          ></span
        >
      </div>

      <div class="philosophy-item parallax-item">
        <span class="not" style="color: {colors.pearlAqua};"
          >You are not investing in a business plan.</span
        >
        <span
          class="but"
          style="color: {colors.goldenOrange};"
          >You are investing in <strong
            >a class migration architecture.</strong
          ></span
        >
      </div>

      <div class="philosophy-item parallax-item">
        <span class="not" style="color: {colors.pearlAqua};"
          >You are not investing in a founder.</span
        >
        <span
          class="but"
          style="color: {colors.goldenOrange};"
          >You are investing in <strong
            >someone who has:</strong
          ></span
        >
      </div>
    </div>

    <div class="qualifications-grid">
      {#each investments as item, index}
        <div
          class="qualification-card parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <span
            class="bullet"
            style="color: {colors.goldenOrange};">→</span
          >
          <span style="color: {colors.vanillaCustard};"
            >{item}</span
          >
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .ask-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .ask-container {
    max-width: 800px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .investment-philosophy {
    margin-bottom: 2rem;
  }

  .philosophy-item {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.2rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .philosophy-item:nth-child(1) {
    animation-delay: 0.2s;
  }
  .philosophy-item:nth-child(2) {
    animation-delay: 0.3s;
  }
  .philosophy-item:nth-child(3) {
    animation-delay: 0.4s;
  }

  .not {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }

  .but {
    font-size: 1.3rem;
    font-weight: 600;
  }

  .qualifications-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .qualification-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transition: transform 0.3s ease;
  }

  .qualification-card:hover {
    transform: translateX(5px);
    background: rgba(238, 155, 0, 0.1);
  }

  .bullet {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .qualification-card span:last-child {
    font-size: 0.95rem;
    line-height: 1.4;
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

    .qualifications-grid {
      grid-template-columns: 1fr;
    }

    .but {
      font-size: 1.1rem;
    }
  }
</style>
