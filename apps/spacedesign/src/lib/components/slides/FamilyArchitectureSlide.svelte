<!-- src/lib/components/slides/FamilyArchitectureSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="family-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Family Architecture
    </h1>

    <div class="genealogy-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        ZayaGenealogy
      </h2>
      <p
        style="color: {colors.pearlAqua}; font-size: 1.3rem;"
      >
        Family tree with net worth tracking
      </p>
    </div>

    <div class="problem-section parallax-item">
      <h2 style="color: {colors.rustySpice};">
        The Problem
      </h2>
      <ul>
        <li>Family consequences of class change</li>
        <li>The wound of departure</li>
        <li>The responsibility of return</li>
        <li>The new grammar of relationship</li>
      </ul>
    </div>

    <div class="strategy-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Strategy
      </h2>
      <div class="strategy-items">
        <div class="strategy-item">
          <span
            class="strategy-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span>Track it. Name it. Don't hide from it.</span
          >
        </div>
        <div class="strategy-item">
          <span
            class="strategy-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span>The List includes family.</span>
        </div>
        <div class="strategy-item">
          <span
            class="strategy-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span>The accounting includes the soul.</span>
        </div>
        <div class="strategy-item">
          <span
            class="strategy-marker"
            style="background: {colors.goldenOrange};"
          ></span>
          <span>The future includes past generations.</span>
        </div>
      </div>
    </div>

    <div class="family-tree parallax-item">
      <div
        class="tree-node root"
        style="border-color: {colors.goldenOrange};"
      >
        <span style="color: {colors.vanillaCustard};"
          >Past Generations</span
        >
      </div>
      <div class="tree-line"></div>
      <div
        class="tree-node current"
        style="border-color: {colors.pearlAqua};"
      >
        <span style="color: {colors.vanillaCustard};"
          >Current Generations</span
        >
      </div>
      <div class="tree-line"></div>
      <div
        class="tree-node future"
        style="border-color: {colors.rustySpice};"
      >
        <span style="color: {colors.vanillaCustard};"
          >Future Generations</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .family-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content-container {
    max-width: 800px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .genealogy-section {
    background: linear-gradient(
      135deg,
      rgba(238, 155, 0, 0.1),
      rgba(10, 147, 150, 0.1)
    );
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--golden-orange);
    padding-bottom: 0.5rem;
  }

  .problem-section {
    background: rgba(187, 62, 3, 0.1);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--rusty-spice);
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .problem-section ul {
    list-style: none;
    padding: 0;
  }

  .problem-section li {
    font-size: 1.1rem;
    margin: 1rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--vanilla-custard);
  }

  .problem-section li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--rusty-spice);
    font-size: 1.2rem;
  }

  .strategy-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.6s both;
  }

  .strategy-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .strategy-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--vanilla-custard);
    font-size: 1.1rem;
  }

  .strategy-marker {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .family-tree {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
    animation: fadeIn 0.8s ease-out 0.8s both;
  }

  .tree-node {
    padding: 1rem 2rem;
    border: 2px solid;
    border-radius: 2rem;
    text-align: center;
  }

  .tree-line {
    width: 2px;
    height: 30px;
    background: linear-gradient(
      to bottom,
      var(--golden-orange),
      var(--rusty-spice)
    );
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

    .tree-node {
      padding: 0.8rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
