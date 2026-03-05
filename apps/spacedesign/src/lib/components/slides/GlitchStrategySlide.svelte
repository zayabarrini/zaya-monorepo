<!-- src/lib/components/slides/GlitchStrategySlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="glitch-slide">
  <div class="glitch-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      How Class Change Happens
    </h1>

    <div class="insight-card parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Insight:
      </h2>
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        Class change requires a flaw, a war, a pandemic, a
        creative act.
      </p>
      <p style="color: {colors.vanillaCustard};">
        A <span style="color: {colors.goldenOrange};"
          >glitch in the system.</span
        >
      </p>
    </div>

    <div class="my-glitch parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        My Glitch:
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Computer Engineering product that generates <span
          style="color: {colors.pearlAqua};"
          >owner's equity</span
        >
      </p>
      <p style="color: {colors.vanillaCustard};">
        —an asset that builds itself without continuous
        labor.
      </p>
    </div>

    <div class="foundation-cards">
      <div
        class="foundation-card parallax-item"
        style="background: linear-gradient(135deg, {colors.darkTeal}, {colors.darkCyan});"
      >
        <h3 style="color: {colors.vanillaCustard};">
          Psychoanalysis
        </h3>
        <p style="color: {colors.pearlAqua};">
          Understanding human flow
        </p>
      </div>

      <div
        class="foundation-card parallax-item"
        style="background: linear-gradient(135deg, {colors.goldenOrange}, {colors.burntCaramel});"
      >
        <h3 style="color: {colors.inkBlack};">Cinema</h3>
        <p style="color: {colors.inkBlack};">
          Creating narrative and image
        </p>
      </div>

      <div
        class="foundation-card parallax-item"
        style="background: linear-gradient(135deg, {colors.rustySpice}, {colors.oxidizedIron});"
      >
        <h3 style="color: {colors.vanillaCustard};">
          Engineering
        </h3>
        <p style="color: {colors.vanillaCustard};">
          Building the machine
        </p>
      </div>
    </div>

    <div class="result-card parallax-item">
      <h3 style="color: {colors.goldenOrange};">
        The Result:
      </h3>
      <p style="color: {colors.vanillaCustard};">
        A product that is:
      </p>
      <ul>
        <li>Impersonal, automated, international</li>
        <li>Financial in nature</li>
        <li>Anonymous clients → Anonymous corporation</li>
        <li>High volume, low maintenance</li>
        <li>Passive income threshold crossed</li>
      </ul>
    </div>
  </div>
</div>

<style>
  .glitch-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .glitch-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .insight-card,
  .my-glitch {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .insight-card {
    animation-delay: 0.2s;
    border-left: 4px solid var(--golden-orange);
  }

  .my-glitch {
    animation-delay: 0.4s;
    border-left: 4px solid var(--pearl-aqua);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0.5rem 0;
  }

  .foundation-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 2rem 0;
  }

  .foundation-card {
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    transition: transform 0.3s ease;
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .foundation-card:nth-child(1) {
    animation-delay: 0.5s;
  }
  .foundation-card:nth-child(2) {
    animation-delay: 0.6s;
  }
  .foundation-card:nth-child(3) {
    animation-delay: 0.7s;
  }

  .foundation-card:hover {
    transform: translateY(-5px);
  }

  .foundation-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .foundation-card p {
    font-size: 0.9rem;
  }

  .result-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    animation: slideInUp 0.8s ease-out 0.8s both;
  }

  .result-card h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--golden-orange);
  }

  .result-card p {
    margin-bottom: 0.5rem;
  }

  .result-card ul {
    list-style: none;
    padding: 0;
  }

  .result-card li {
    font-size: 1rem;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--vanilla-custard);
  }

  .result-card li::before {
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

    .foundation-cards {
      grid-template-columns: 1fr;
    }
  }
</style>
