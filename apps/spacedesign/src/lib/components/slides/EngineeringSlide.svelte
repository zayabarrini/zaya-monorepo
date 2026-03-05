<!-- src/lib/components/slides/EngineeringSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="engineering-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Computer Engineering Foundation
    </h1>

    <div class="practice-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Practice
      </h2>
      <div class="practice-grid">
        <div
          class="practice-card"
          style="background: {colors.darkTeal};"
        >
          <span class="icon">⚡</span>
          <span>Nerves and code</span>
        </div>
        <div
          class="practice-card"
          style="background: {colors.darkCyan};"
        >
          <span class="icon">😴</span>
          <span>Exhaustion and restart</span>
        </div>
        <div
          class="practice-card"
          style="background: {colors.rustySpice};"
        >
          <span class="icon">⏳</span>
          <span>Hours of wasted work</span>
        </div>
        <div
          class="practice-card"
          style="background: {colors.goldenOrange};"
        >
          <span class="icon">💭</span>
          <span>Sleeping on problems</span>
        </div>
        <div
          class="practice-card"
          style="background: {colors.oxidizedIron};"
        >
          <span class="icon">🔄</span>
          <span>Starting over</span>
        </div>
      </div>
    </div>

    <div class="paranoia-section parallax-item">
      <h2 style="color: {colors.rustySpice};">
        The Paranoia
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Performance and competitiveness
      </p>
      <p style="color: {colors.vanillaCustard};">
        The history of computing as burden and inspiration
      </p>
      <p style="color: {colors.pearlAqua};">
        Knowing you're late. Running anyway.
      </p>
    </div>

    <div class="discipline-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Discipline
      </h2>
      <div class="discipline-timeline">
        <div class="timeline-point">
          <span
            class="point-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span
            class="point-label"
            style="color: {colors.vanillaCustard};"
            >Bimonthly review</span
          >
        </div>
        <div class="timeline-point">
          <span
            class="point-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span
            class="point-label"
            style="color: {colors.vanillaCustard};"
            >Bimonthly planning</span
          >
        </div>
        <div class="timeline-point">
          <span
            class="point-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span
            class="point-label"
            style="color: {colors.vanillaCustard};"
            >Vision of future and path</span
          >
        </div>
      </div>
    </div>

    <div class="products-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Products
      </h2>
      <p style="color: {colors.vanillaCustard};">
        15+ digital products
      </p>
      <p style="color: {colors.vanillaCustard};">
        Ranging from language learning to movie prediction
      </p>
      <p style="color: {colors.pearlAqua};">
        All feeding into the Perfect Product
      </p>
    </div>
  </div>
</div>

<style>
  .engineering-slide {
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

  .practice-section {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--golden-orange);
    padding-bottom: 0.5rem;
  }

  .practice-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .practice-card {
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--vanilla-custard);
    transition: transform 0.3s ease;
  }

  .practice-card:hover {
    transform: translateY(-5px);
  }

  .icon {
    font-size: 2rem;
  }

  .paranoia-section {
    background: rgba(187, 62, 3, 0.1);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    border-left: 4px solid var(--rusty-spice);
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .paranoia-section p {
    font-size: 1.2rem;
    margin: 0.8rem 0;
  }

  .discipline-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.6s both;
  }

  .discipline-timeline {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .timeline-point {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .point-marker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .point-label {
    font-size: 1.1rem;
  }

  .products-section {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(238, 155, 0, 0.1),
      rgba(10, 147, 150, 0.1)
    );
    border-radius: 1rem;
    animation: fadeIn 0.8s ease-out 0.8s both;
  }

  .products-section p {
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

    .practice-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
