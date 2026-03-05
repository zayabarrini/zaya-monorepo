<!-- src/lib/components/slides/ContactSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="contact-slide">
  <div class="contact-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Zayas Project
    </h1>

    <div class="contact-card parallax-item">
      <div class="contact-info">
        <p
          class="name"
          style="color: {colors.goldenOrange};"
        >
          [Your Name]
        </p>
        <p
          class="detail"
          style="color: {colors.pearlAqua};"
        >
          [Email]
        </p>
        <p
          class="detail"
          style="color: {colors.pearlAqua};"
        >
          [Phone]
        </p>
        <p
          class="website"
          style="color: {colors.vanillaCustard};"
        >
          zayabarrini.vercel.app
        </p>
      </div>

      <div class="invitation">
        <p style="color: {colors.vanillaCustard};">
          Let's build the bridge.
        </p>
        <div class="bridge-symbol">
          <span
            class="symbol"
            style="background: {colors.goldenOrange};"
          ></span>
          <span
            class="symbol"
            style="background: {colors.pearlAqua};"
          ></span>
          <span
            class="symbol"
            style="background: {colors.rustySpice};"
          ></span>
        </div>
      </div>
    </div>

    <div class="final-message parallax-item">
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
      <p
        style="color: {colors.goldenOrange}; font-size: 2rem;"
      >
        To invest in someone who has already done the
        accounting.
      </p>
      <div class="final-choice">
        <span
          class="choice"
          style="color: {colors.pearlAqua};">Yes</span
        >
        <span
          class="choice"
          style="color: {colors.vanillaCustard};">or</span
        >
        <span
          class="choice"
          style="color: {colors.rustySpice};">no?</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .contact-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .contact-container {
    max-width: 700px;
    width: 100%;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
    animation: fadeIn 0.8s ease-out;
  }

  .contact-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 2rem;
    margin-bottom: 3rem;
    border: 1px solid var(--golden-orange);
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .contact-info {
    margin-bottom: 2rem;
  }

  .name {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .detail {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .website {
    font-size: 1.3rem;
    margin-top: 1rem;
    font-weight: 600;
  }

  .invitation p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .bridge-symbol {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .symbol {
    width: 50px;
    height: 10px;
    border-radius: 5px;
    animation: bridge 2s infinite;
  }

  .symbol:nth-child(1) {
    animation-delay: 0s;
  }
  .symbol:nth-child(2) {
    animation-delay: 0.3s;
  }
  .symbol:nth-child(3) {
    animation-delay: 0.6s;
  }

  .final-message {
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .final-message p {
    font-size: 1.2rem;
    margin: 1rem 0;
    line-height: 1.6;
  }

  .final-choice {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .choice {
    animation: pulse 2s infinite;
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

  @keyframes bridge {
    0%,
    100% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(1.5);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .name {
      font-size: 1.5rem;
    }

    .detail {
      font-size: 1rem;
    }

    .final-choice {
      font-size: 1.5rem;
    }
  }
</style>
