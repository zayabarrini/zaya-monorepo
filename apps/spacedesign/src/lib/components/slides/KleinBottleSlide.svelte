<!-- src/lib/components/slides/KleinBottleSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="klein-slide">
  <div class="klein-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Klein Bottle Principle
    </h1>

    <div class="principle-grid">
      <div class="psychic-system parallax-item">
        <h2 style="color: {colors.goldenOrange};">
          The Psychic System with Ethical Flow regulates:
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Obsessive thoughts | Screams | Anger | Symptoms
          </li>
          <li style="color: {colors.vanillaCustard};">
            Acting out | Devastation | Phobias
          </li>
          <li style="color: {colors.vanillaCustard};">
            Bodily phenomena in psychosis | Paranoia |
            Schizophrenia
          </li>
        </ul>
      </div>

      <div class="business-system parallax-item">
        <h2 style="color: {colors.pearlAqua};">
          The Business System with Ethical Flow regulates:
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Cash flow | Investor relations | Client
            acquisition
          </li>
          <li style="color: {colors.vanillaCustard};">
            Product development | Class transition | Family
            consequences
          </li>
        </ul>
      </div>
    </div>

    <div class="klein-definition parallax-item">
      <div
        class="definition-box"
        style="border: 2px solid {colors.goldenOrange};"
      >
        <p style="color: {colors.pearlAqua};">
          Contains without containing.
        </p>
        <p style="color: {colors.pearlAqua};">
          Flows without losing.
        </p>
        <p style="color: {colors.pearlAqua};">
          Holds the unease without resolving it.
        </p>
      </div>
    </div>

    <div class="architecture-statement parallax-item">
      <p
        style="color: {colors.vanillaCustard}; font-size: 1.3rem;"
      >
        This is my architecture.
      </p>
      <p style="color: {colors.goldenOrange};">
        Not a straight line. A Möbius strip. A Klein bottle.
      </p>
      <p style="color: {colors.vanillaCustard};">
        A system that turns problems into fuel.
      </p>
    </div>
  </div>
</div>

<style>
  .klein-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .klein-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .principle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .psychic-system,
  .business-system {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .psychic-system {
    animation-delay: 0.2s;
    border-left: 4px solid var(--golden-orange);
  }

  .business-system {
    animation-delay: 0.4s;
    border-left: 4px solid var(--pearl-aqua);
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1rem;
    margin: 0.8rem 0;
    padding-left: 1.2rem;
    position: relative;
    line-height: 1.5;
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--golden-orange);
    font-size: 1.2rem;
  }

  .klein-definition {
    margin: 2rem 0;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .definition-box {
    padding: 2rem;
    border-radius: 50% / 10%;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
  }

  .definition-box p {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    font-style: italic;
  }

  .architecture-statement {
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

  .architecture-statement p {
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

    .principle-grid {
      grid-template-columns: 1fr;
    }

    .definition-box p {
      font-size: 1.1rem;
    }
  }
</style>
