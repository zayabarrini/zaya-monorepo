<!-- src/lib/components/slides/SoulAccountingSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const women = [
    "Godmother, Meiriane",
    "Rayssa",
    "Woman from Agita party",
    "Woman from Globo meeting, reading of rape text"
  ];

  const men = [
    "Marins",
    "Boy from apartment 120",
    "Fights, drinking, seduction, loud music, mockery"
  ];
</script>

<div class="soul-slide">
  <div class="soul-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Accounting of the Soul
    </h1>

    <div class="epigraph parallax-item">
      <p
        style="color: {colors.pearlAqua}; font-style: italic;"
      >
        When wealth or fame arrives, so do the exposures.
      </p>
    </div>

    <div class="lists-grid">
      <div class="list-card women-list parallax-item">
        <h2 style="color: {colors.goldenOrange};">
          Women:
        </h2>
        <ul>
          {#each women as name}
            <li style="color: {colors.vanillaCustard};">
              {name}
            </li>
          {/each}
        </ul>
      </div>

      <div class="list-card men-list parallax-item">
        <h2 style="color: {colors.rustySpice};">Men:</h2>
        <ul>
          {#each men as name}
            <li style="color: {colors.vanillaCustard};">
              {name}
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="principle-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Principle:
      </h2>
      <p style="color: {colors.vanillaCustard};">
        I keep the list. I know what's there.
      </p>
      <p style="color: {colors.vanillaCustard};">
        I won't be surprised when it surfaces.
      </p>
      <p style="color: {colors.vanillaCustard};">
        The guilt and anguish live where they belong—
      </p>
      <p style="color: {colors.vanillaCustard};">
        not in the architecture of the future.
      </p>
    </div>

    <div class="clarity parallax-item">
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        This is not a liability. This is clarity.
      </p>
      <p style="color: {colors.goldenOrange};">
        Invest in someone who has already done the
        accounting.
      </p>
    </div>
  </div>
</div>

<style>
  .soul-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .soul-container {
    max-width: 800px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .epigraph {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    border-bottom: 2px dashed var(--golden-orange);
    animation: fadeIn 0.8s ease-out 0.2s both;
  }

  .epigraph p {
    font-size: 1.2rem;
  }

  .lists-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .list-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .women-list {
    animation-delay: 0.3s;
    border-left: 4px solid var(--golden-orange);
  }

  .men-list {
    animation-delay: 0.4s;
    border-left: 4px solid var(--rusty-spice);
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid currentColor;
    padding-bottom: 0.5rem;
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
  }

  li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--golden-orange);
  }

  .principle-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    animation: slideInUp 0.8s ease-out 0.5s both;
  }

  .principle-section h2 {
    margin-bottom: 1rem;
  }

  .principle-section p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    line-height: 1.6;
  }

  .clarity {
    text-align: center;
    padding: 1.5rem;
    background: linear-gradient(
      135deg,
      rgba(238, 155, 0, 0.1),
      rgba(187, 62, 3, 0.1)
    );
    border-radius: 1rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .clarity p {
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
      font-size: 1.8rem;
    }

    .lists-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
