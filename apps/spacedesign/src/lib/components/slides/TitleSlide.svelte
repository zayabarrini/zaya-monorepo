<!-- src/lib/components/slides/TitleSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="title-slide">
  <div class="title-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      THE ZAYAS PROJECT
    </h1>
    <h2
      class="parallax-item"
      style="color: {colors.pearlAqua};"
    >
      Building the bridge from Precariat to Owning Class
    </h2>
    <h3
      class="parallax-item"
      style="color: {colors.goldenOrange};"
    >
      2016-2026
    </h3>

    <div class="author-container parallax-item">
      <p
        class="author-name"
        style="color: {colors.vanillaCustard};"
      >
        [YOUR NAME]
      </p>
      <p
        class="author-title"
        style="color: {colors.pearlAqua};"
      >
        Psychoanalyst | Filmmaker | Computer Engineer
      </p>
    </div>

    <div class="ask-container parallax-item">
      <p
        class="ask-text"
        style="color: {colors.goldenOrange};"
      >
        The Ask:
      </p>
      <p
        class="ask-description"
        style="color: {colors.vanillaCustard};"
      >
        Investment in a vision, a trajectory, and a product
        ecosystem
      </p>
    </div>
  </div>
</div>

<style>
  .title-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .title-container {
    max-width: 900px;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: fadeInUp 0.8s ease-out;
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 4rem;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }

  .author-container {
    margin-bottom: 3rem;
    animation: fadeInUp 0.8s ease-out 0.6s both;
  }

  .author-name {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .author-title {
    font-size: 1.2rem;
    opacity: 0.8;
  }

  .ask-container {
    padding: 2rem;
    border-top: 2px solid var(--golden-orange);
    border-bottom: 2px solid var(--golden-orange);
    animation: fadeInUp 0.8s ease-out 0.8s both;
  }

  .ask-text {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .ask-description {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  @keyframes fadeInUp {
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
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.2rem;
    }

    .author-name {
      font-size: 1.5rem;
    }

    .author-title {
      font-size: 1rem;
    }
  }
</style>
