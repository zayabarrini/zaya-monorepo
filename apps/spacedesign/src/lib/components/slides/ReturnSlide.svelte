<!-- src/lib/components/slides/ReturnSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="return-slide">
  <div class="return-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      What You Get
    </h1>

    <div class="returns-grid">
      <div class="return-card financial parallax-item">
        <h2 style="color: {colors.goldenOrange};">
          Financial Return
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Equity in a growing product ecosystem
          </li>
          <li style="color: {colors.vanillaCustard};">
            Participation in the Perfect Product
          </li>
          <li style="color: {colors.vanillaCustard};">
            Access to international financial product
            markets
          </li>
          <li
            class="highlight"
            style="color: {colors.pearlAqua};"
          >
            10x potential by 2026
          </li>
        </ul>
      </div>

      <div class="return-card non-financial parallax-item">
        <h2 style="color: {colors.pearlAqua};">
          Non-Financial Return
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Participation in a class migration experiment
          </li>
          <li style="color: {colors.vanillaCustard};">
            Access to a unique theoretical framework
          </li>
          <li style="color: {colors.vanillaCustard};">
            Connection to psychoanalysis, cinema, technology
          </li>
          <li style="color: {colors.vanillaCustard};">
            A story worth telling
          </li>
        </ul>
      </div>
    </div>

    <div class="futurity-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Field of Futurity
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Past generations, current generations, future
        generations.
      </p>
      <p style="color: {colors.vanillaCustard};">
        This is not just about money.
      </p>
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        This is about <strong
          >participating in future generations.</strong
        >
      </p>
    </div>
  </div>
</div>

<style>
  .return-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .return-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .returns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .return-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    animation: slideInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .financial {
    animation-delay: 0.2s;
    border: 1px solid var(--golden-orange);
  }

  .non-financial {
    animation-delay: 0.4s;
    border: 1px solid var(--pearl-aqua);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1.1rem;
    margin: 1rem 0;
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

  .highlight {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 1.5rem;
  }

  .futurity-section {
    background: linear-gradient(
      135deg,
      rgba(238, 155, 0, 0.1),
      rgba(10, 147, 150, 0.1)
    );
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .futurity-section h2 {
    margin-bottom: 1rem;
  }

  .futurity-section p {
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

    .returns-grid {
      grid-template-columns: 1fr;
    }

    h2 {
      font-size: 1.5rem;
    }

    li {
      font-size: 1rem;
    }
  }
</style>
