<!-- src/lib/components/slides/FoundationSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const foundations = [
    {
      period: "2018-2026: PSYCHOANALYSIS",
      subtitle: "Understanding human flow",
      points: [
        "Synchronous international clinic",
        "Languages, time zones, platforms, currencies",
        "The ethics of flow: not too much, not too little",
        "Klein bottle topology: regulated vs. invasive flow"
      ]
    },
    {
      period: "2023-2025: CINEMA",
      subtitle: "Creating narrative and image",
      points: [
        "Structure of tragedy",
        "Female narratives, female time and space",
        "Investment, merit, investor relations",
        "Short films, animation (ZayaAnimations)"
      ]
    },
    {
      period: "ONGOING: COMPUTER ENGINEERING",
      subtitle: "Building the machine",
      points: [
        "Nerves and code, exhaustion and restart",
        "Hours of 'wasted work,' sleeping on problems",
        "Performance and competitive paranoia",
        "Bimonthly review, bimonthly planning"
      ]
    }
  ];
</script>

<div class="foundation-slide">
  <div class="foundation-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Three Formations. One Trajectory.
    </h1>

    <div class="timeline">
      {#each foundations as foundation, index}
        <div
          class="timeline-card parallax-item"
          style="animation-delay: {index * 0.2}s"
        >
          <div
            class="card-header"
            style="background: linear-gradient(135deg, {colors.goldenOrange}, {colors.rustySpice});"
          >
            <h2 style="color: {colors.inkBlack};">
              {foundation.period}
            </h2>
          </div>
          <div class="card-content">
            <h3 style="color: {colors.pearlAqua};">
              {foundation.subtitle}
            </h3>
            <ul>
              {#each foundation.points as point}
                <li style="color: {colors.vanillaCustard};">
                  {point}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .foundation-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .foundation-container {
    max-width: 1200px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .timeline {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .timeline-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.3s ease;
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .timeline-card:hover {
    transform: translateY(-10px);
  }

  .card-header {
    padding: 1.5rem;
    text-align: center;
  }

  .card-header h2 {
    font-size: 1.2rem;
    margin: 0;
    font-weight: 700;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-content h3 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .card-content ul {
    list-style: none;
    padding: 0;
  }

  .card-content li {
    font-size: 0.95rem;
    margin: 0.8rem 0;
    padding-left: 1.2rem;
    position: relative;
    line-height: 1.5;
  }

  .card-content li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--golden-orange);
    font-size: 1.2rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
      font-size: 2rem;
    }

    .timeline {
      grid-template-columns: 1fr;
    }
  }
</style>
