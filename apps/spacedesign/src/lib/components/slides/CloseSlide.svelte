<!-- src/lib/components/slides/CloseSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="close-slide">
  <div class="close-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Question
    </h1>

    <div class="foundation-statement parallax-item">
      <p style="color: {colors.pearlAqua};">
        I have spent 10 years building the foundation.
      </p>

      <div class="pillars">
        <span
          class="pillar"
          style="background: {colors.darkTeal};"
          >Three formations</span
        >
        <span
          class="pillar"
          style="background: {colors.darkCyan};"
          >Fifteen products</span
        >
        <span
          class="pillar"
          style="background: {colors.goldenOrange};"
          >One trajectory</span
        >
        <span
          class="pillar"
          style="background: {colors.rustySpice};"
          >One list</span
        >
        <span
          class="pillar"
          style="background: {colors.oxidizedIron};"
          >One vision</span
        >
      </div>
    </div>

    <div class="question-box parallax-item">
      <p
        class="pre-question"
        style="color: {colors.vanillaCustard};"
      >
        The question is not whether this will work.
      </p>
      <p
        class="the-question"
        style="color: {colors.goldenOrange};"
      >
        The question is:
      </p>
      <div
        class="glitch-text"
        style="color: {colors.pearlAqua};"
      >
        Do you want to be part of the glitch?
      </div>
    </div>

    <div class="signature parallax-item">
      <div
        class="line"
        style="background: {colors.goldenOrange};"
      ></div>
      <p style="color: {colors.vanillaCustard};">
        Knowing what you want and holding it.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Not settling for less than your vision.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Responsible exchange where it matters.
      </p>
    </div>
  </div>
</div>

<style>
  .close-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .close-container {
    max-width: 800px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    animation: fadeIn 0.8s ease-out;
  }

  .foundation-statement {
    margin-bottom: 3rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .foundation-statement p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }

  .pillars {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .pillar {
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    color: var(--vanilla-custard);
    font-weight: 600;
    animation: pulse 2s infinite;
    transition: transform 0.3s ease;
  }

  .pillar:hover {
    transform: scale(1.1);
  }

  .question-box {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 2rem;
    margin-bottom: 3rem;
    border: 2px solid var(--golden-orange);
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .pre-question {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .the-question {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .glitch-text {
    font-size: 3rem;
    font-weight: 800;
    animation: glitch 3s infinite;
  }

  .signature {
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .line {
    width: 100px;
    height: 2px;
    margin: 0 auto 2rem;
  }

  .signature p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    font-style: italic;
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

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes glitch {
    0%,
    100% {
      transform: skew(0deg, 0deg);
      opacity: 1;
    }
    95% {
      transform: skew(5deg, 2deg);
      opacity: 0.8;
    }
    96% {
      transform: skew(-5deg, -2deg);
      opacity: 0.9;
    }
    97% {
      transform: skew(3deg, 1deg);
      opacity: 0.8;
    }
    98% {
      transform: skew(-3deg, -1deg);
      opacity: 0.9;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .glitch-text {
      font-size: 2rem;
    }

    .the-question {
      font-size: 1.5rem;
    }

    .question-box {
      padding: 2rem;
    }
  }
</style>
