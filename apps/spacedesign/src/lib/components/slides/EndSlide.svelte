<!-- src/lib/components/slides/EndSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="end-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      END OF PRESENTATION
    </h1>

    <div class="quotes parallax-item">
      <div class="quote" style="color: {colors.pearlAqua};">
        "Knowing what you want and holding it."
      </div>
      <div class="quote" style="color: {colors.pearlAqua};">
        "Not settling for less than your vision."
      </div>
      <div class="quote" style="color: {colors.pearlAqua};">
        "Responsible exchange where it matters."
      </div>
    </div>

    <div
      class="divider"
      style="background: {colors.goldenOrange};"
    ></div>

    <div class="invitation parallax-item">
      <p style="color: {colors.vanillaCustard};">
        This presentation is not a pitch. It is an
        invitation.
      </p>
      <p style="color: {colors.vanillaCustard};">
        To participate in a class migration.
      </p>
      <p style="color: {colors.vanillaCustard};">
        To fund a glitch.
      </p>
      <p style="color: {colors.vanillaCustard};">
        To invest in someone who has already done the
        accounting.
      </p>
    </div>

    <div class="final-choice parallax-item">
      <span
        class="choice-yes"
        style="color: {colors.pearlAqua};">Yes</span
      >
      <span
        class="choice-or"
        style="color: {colors.vanillaCustard};">or</span
      >
      <span
        class="choice-no"
        style="color: {colors.rustySpice};">no?</span
      >
    </div>
  </div>
</div>

<style>
  .end-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content-container {
    max-width: 700px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
    animation: fadeIn 0.8s ease-out;
  }

  .quotes {
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .quote {
    font-size: 1.5rem;
    margin: 1rem 0;
    font-style: italic;
  }

  .divider {
    width: 100px;
    height: 3px;
    margin: 2rem auto;
    animation: expand 1s ease-out 0.4s both;
  }

  .invitation {
    margin-bottom: 3rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
    display: inline-block;
  }

  .invitation p {
    font-size: 1.2rem;
    margin: 0.8rem 0;
    line-height: 1.6;
  }

  .final-choice {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
    animation: pulse 2s infinite 0.8s;
  }

  .choice-yes {
    animation: bounce 2s infinite;
  }

  .choice-no {
    animation: bounce 2s infinite 0.5s;
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

  @keyframes expand {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 100px;
      opacity: 1;
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

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .quote {
      font-size: 1.2rem;
    }

    .final-choice {
      font-size: 2rem;
    }
  }
</style>
