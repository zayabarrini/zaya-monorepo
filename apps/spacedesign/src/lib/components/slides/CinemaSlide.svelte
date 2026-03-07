<!-- src/lib/components/slides/CinemaSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="cinema-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Cinema Foundation
    </h1>

    <div class="tragedy-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Structure of Tragedy
      </h2>
      <div class="tragedy-grid">
        <div
          class="tragedy-item"
          style="background: {colors.darkTeal};"
        >
          <span class="emoji">🎭</span>
          <span>Emotion</span>
        </div>
        <div
          class="tragedy-item"
          style="background: {colors.darkCyan};"
        >
          <span class="emoji">🖼️</span>
          <span>Image</span>
        </div>
        <div
          class="tragedy-item"
          style="background: {colors.rustySpice};"
        >
          <span class="emoji">📜</span>
          <span>Narrative</span>
        </div>
        <div
          class="tragedy-item"
          style="background: {colors.goldenOrange};"
        >
          <span class="emoji">⏳</span>
          <span>Timeline</span>
        </div>
        <div
          class="tragedy-item"
          style="background: {colors.oxidizedIron};"
        >
          <span class="emoji">👩</span>
          <span>Female narratives</span>
        </div>
        <div
          class="tragedy-item"
          style="background: {colors.burntCaramel};"
        >
          <span class="emoji">⏰</span>
          <span>Female time and space</span>
        </div>
      </div>
    </div>

    <div class="productions-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Productions
      </h2>
      <div class="productions-list">
        <div class="production-item">
          <span
            class="bullet"
            style="color: {colors.goldenOrange};">🎬</span
          >
          <span style="color: {colors.vanillaCustard};"
            >Short films (ongoing)</span
          >
        </div>
        <div class="production-item">
          <span
            class="bullet"
            style="color: {colors.goldenOrange};">🎨</span
          >
          <span style="color: {colors.vanillaCustard};"
            >Animations (ZayaAnimations)</span
          >
        </div>
        <div class="production-item">
          <span
            class="bullet"
            style="color: {colors.goldenOrange};">📝</span
          >
          <span style="color: {colors.vanillaCustard};"
            >Screenplay database (200+ screenplays tracked)</span
          >
        </div>
      </div>
    </div>

    <div class="infrastructure-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Infrastructure
      </h2>
      <div class="infra-grid">
        <div class="infra-card">
          <span
            class="infra-label"
            style="color: {colors.pearlAqua};"
            >Budget tracking</span
          >
        </div>
        <div class="infra-card">
          <span
            class="infra-label"
            style="color: {colors.pearlAqua};"
            >Distributor contacts</span
          >
        </div>
        <div class="infra-card">
          <span
            class="infra-label"
            style="color: {colors.pearlAqua};"
            >Streaming platform analysis</span
          >
        </div>
        <div class="infra-card">
          <span
            class="infra-label"
            style="color: {colors.pearlAqua};"
            >Oscar submission tracking</span
          >
          <span
            class="infra-detail"
            style="color: {colors.goldenOrange};"
            >International-2026-Oscars</span
          >
        </div>
      </div>
    </div>

    <div class="thesis-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Investment Thesis
      </h2>
      <p style="color: {colors.vanillaCustard};">
        Cinema loses money until it doesn't.
      </p>
      <p style="color: {colors.vanillaCustard};">
        When it works, it works forever.
      </p>
      <p style="color: {colors.pearlAqua};">
        Royalties, catalog, legacy.
      </p>
    </div>
  </div>
</div>

<style>
  .cinema-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .content-container {
    max-width: 900px;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .tragedy-section {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--golden-orange);
    padding-bottom: 0.5rem;
  }

  .tragedy-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .tragedy-item {
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--vanilla-custard);
    transition: transform 0.3s ease;
  }

  .tragedy-item:hover {
    transform: scale(1.05);
  }

  .emoji {
    font-size: 2rem;
  }

  .productions-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .productions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .production-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
  }

  .production-item:hover {
    transform: translateX(10px);
    background: var(--inkBlack);
  }

  .bullet {
    font-size: 1.2rem;
  }

  .infrastructure-section {
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.6s both;
  }

  .infra-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .infra-card {
    background: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
    border: 1px solid var(--dark-cyan);
  }

  .infra-label {
    font-size: 1rem;
    display: block;
    margin-bottom: 0.3rem;
  }

  .infra-detail {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .thesis-section {
    background: linear-gradient(
      135deg,
      var(--inkBlack),
      var(--darkCyan)
    );
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out 0.8s both;
  }

  .thesis-section p {
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

    .tragedy-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .infra-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
