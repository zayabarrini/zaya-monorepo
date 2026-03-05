<!-- src/lib/components/slides/TrajectorySlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="trajectory-slide">
  <div class="trajectory-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      From Where I Started (2016-2026)
    </h1>

    <div class="landscape-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Personal Landscape:
      </h2>
      <ul>
        <li style="color: {colors.vanillaCustard};">
          Home without stable provider
        </li>
        <li style="color: {colors.vanillaCustard};">
          Expulsion from spaces (Aeronautics, Livup, UFSC)
        </li>
        <li style="color: {colors.vanillaCustard};">
          Return to family origin (Boa Esperança)
        </li>
        <li style="color: {colors.vanillaCustard};">
          Disrupted attachments, suicidal ideation
        </li>
        <li style="color: {colors.vanillaCustard};">
          Family in precarious situation
        </li>
      </ul>
    </div>

    <div class="refusal-section parallax-item">
      <h2 style="color: {colors.rustySpice};">
        The Refusal:
      </h2>
      <ul>
        <li style="color: {colors.vanillaCustard};">
          Refused CLT, public service exams, traditional
          university
        </li>
        <li style="color: {colors.vanillaCustard};">
          Refused working class logic of pure work-exchange
        </li>
        <li style="color: {colors.vanillaCustard};">
          Consequence: expulsion from working class spaces
        </li>
        <li style="color: {colors.vanillaCustard};">
          Cost: lifelong resentment from those who stayed
        </li>
      </ul>
    </div>

    <div class="bet-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Bet:
      </h2>
      <p style="color: {colors.pearlAqua};">
        That a different flow of enjoyment could build a
        different life.
      </p>
      <p style="color: {colors.pearlAqua};">
        That three formations could become one trajectory.
      </p>
      <p style="color: {colors.pearlAqua};">
        That the wound of departure could become the
        architecture of return.
      </p>
    </div>
  </div>
</div>

<style>
  .trajectory-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .trajectory-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .landscape-section,
  .refusal-section,
  .bet-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    animation: slideInRight 0.8s ease-out forwards;
    opacity: 0;
  }

  .landscape-section {
    animation-delay: 0.2s;
    border-left: 4px solid var(--dark-cyan);
  }

  .refusal-section {
    animation-delay: 0.4s;
    border-left: 4px solid var(--rusty-spice);
  }

  .bet-section {
    animation-delay: 0.6s;
    border-left: 4px solid var(--golden-orange);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1.1rem;
    margin: 0.8rem 0;
    padding-left: 1.5rem;
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

  .bet-section p {
    font-size: 1.2rem;
    margin: 0.8rem 0;
    line-height: 1.6;
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
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.3rem;
    }

    li,
    .bet-section p {
      font-size: 1rem;
    }
  }
</style>
