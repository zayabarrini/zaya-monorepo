<!-- src/lib/components/slides/VisionSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="vision-slide">
  <div class="vision-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      What I Want
    </h1>

    <div class="goal-card parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Primary Goal:
      </h2>
      <p style="color: {colors.pearlAqua};">
        Change in Net Worth from <strong
          >Precariat/Working Class</strong
        >
        to <strong>Owning Class</strong>
      </p>
      <div class="target-box">
        <span style="color: {colors.vanillaCustard};"
          >Target:
        </span>
        <span
          style="color: {colors.goldenOrange}; font-size: 2.5rem;"
          >$10M</span
        >
        <span style="color: {colors.pearlAqua};">
          by 2028+</span
        >
      </div>
      <p style="color: {colors.vanillaCustard};">
        Assets: Houses | Businesses | Intellectual Property
      </p>
    </div>

    <div class="vision-grid">
      <div class="vision-item parallax-item">
        <h3 style="color: {colors.goldenOrange};">
          The Architecture
        </h3>
        <p style="color: {colors.vanillaCustard};">
          A product ecosystem that generates <span
            style="color: {colors.pearlAqua};"
            >owner's equity</span
          >
        </p>
        <p style="color: {colors.vanillaCustard};">
          —an asset that builds itself, that creates value
          without continuous labor
        </p>
      </div>

      <div class="vision-item parallax-item">
        <h3 style="color: {colors.goldenOrange};">
          The Identity
        </h3>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Not being defined by work role or social class
          </li>
          <li style="color: {colors.vanillaCustard};">
            Controlling information flow
          </li>
          <li style="color: {colors.vanillaCustard};">
            Responsible exchange where it matters
          </li>
          <li style="color: {colors.vanillaCustard};">
            Using geography intelligently
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .vision-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .vision-container {
    max-width: 1000px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .goal-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    border: 1px solid var(--golden-orange);
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .goal-card h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .goal-card p {
    font-size: 1.2rem;
    margin: 1rem 0;
    line-height: 1.6;
  }

  .target-box {
    background: var(--vanillaCustard);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    text-align: center;
  }

  .vision-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .vision-item {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
  }

  .vision-item h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--golden-orange);
    padding-bottom: 0.5rem;
  }

  .vision-item p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0.5rem 0;
  }

  .vision-item ul {
    list-style: none;
    padding: 0;
  }

  .vision-item li {
    font-size: 1.1rem;
    margin: 0.8rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .vision-item li::before {
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

    .vision-grid {
      grid-template-columns: 1fr;
    }

    .goal-card h2 {
      font-size: 1.5rem;
    }
  }
</style>
