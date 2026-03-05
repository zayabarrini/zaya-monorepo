<!-- src/lib/components/slides/ProblemSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="problem-slide">
  <div class="problem-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Class Divide Is a Language Divide
    </h1>

    <div class="comparison-grid">
      <div class="working-class parallax-item">
        <h2 style="color: {colors.pearlAqua};">
          The Working Class speaks:
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            CLT | PT | Vacation | Weekend | Overtime
          </li>
          <li style="color: {colors.vanillaCustard};">
            Work or Ask. Nothing else.
          </li>
        </ul>
      </div>

      <div class="owning-class parallax-item">
        <h2 style="color: {colors.goldenOrange};">
          The Owning Class speaks:
        </h2>
        <ul>
          <li style="color: {colors.vanillaCustard};">
            Equity | Assets | ROI | Portfolio | Leverage
          </li>
          <li style="color: {colors.vanillaCustard};">
            Invest or Create. Work is what others do.
          </li>
        </ul>
      </div>
    </div>

    <div class="gap-section parallax-item">
      <h2 style="color: {colors.rustySpice};">The Gap:</h2>
      <p style="color: {colors.vanillaCustard};">
        These are not just economic categories.
      </p>
      <p style="color: {colors.vanillaCustard};">
        They are <span style="color: {colors.goldenOrange};"
          >different psychic realities.</span
        >
      </p>
      <p style="color: {colors.vanillaCustard};">
        Different grammars of existence.
      </p>
      <p style="color: {colors.vanillaCustard};">
        Different flows of enjoyment.
      </p>
    </div>

    <div class="conclusion parallax-item">
      <p style="color: {colors.pearlAqua};">
        Most people die in the grammar they were born into.
      </p>
    </div>
  </div>
</div>

<style>
  .problem-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .problem-container {
    max-width: 1000px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .comparison-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    border-left: 3px solid currentColor;
    animation: slideIn 0.6s ease-out;
  }

  .gap-section {
    text-align: center !important;
    margin-bottom: 3rem;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .gap-section p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .conclusion {
    text-align: center !important;
    font-size: 2rem;
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .comparison-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    li {
      font-size: 1rem;
    }
  }
</style>
