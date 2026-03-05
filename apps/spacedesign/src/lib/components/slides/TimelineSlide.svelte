<!-- src/lib/components/slides/TimelineSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";

  const timeline = [
    {
      year: "2016",
      event: "Starting point: Precariat, family precarity"
    },

    {
      year: "16-21",
      event: "Expulsions: Aeronautics, Livup, UFSC"
    },
    {
      year: "2017",
      event: "Suicidal ideation, family crisis"
    },
    {
      year: "2018",
      event: "Begin Psychoanalysis formation"
    },
    { year: "2019", event: "Psychoanalysis clinic begins" },

    {
      year: "2021",
      event: "Return to Boa Esperança, End of Doctorate"
    },
    {
      year: "2022",
      event: "Development of Psychoanalytic School"
    },
    {
      year: "2023",
      event:
        "Begin Cinema formation, First digital products"
    },
    { year: "2024", event: "Cinema projects, animations" },
    {
      year: "2025",
      event: "Product ecosystem expands (15+)"
    },
    {
      year: "2026",
      event:
        "Focus on Digital Products Integration and Marketing"
    },
    {
      year: "2027",
      event:
        "Cash flow, development of products related to finances, international markets"
    },
    {
      year: "2028",
      event: "Target: $10M, Perfect Product launched"
    }
  ];
</script>

<div class="timeline-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Timeline 2016-2026
    </h1>

    <div class="timeline-container">
      {#each timeline as item, index}
        <div
          class="timeline-item parallax-item"
          style="animation-delay: {index * 0.1}s"
        >
          <div
            class="timeline-year"
            style="background: {colors.goldenOrange}; color: {colors.inkBlack};"
          >
            {item.year}
          </div>
          <div
            class="timeline-event"
            style="border-left-color: {colors.goldenOrange};"
          >
            <span style="color: {colors.vanillaCustard};"
              >{item.event}</span
            >
          </div>
        </div>
      {/each}
    </div>

    <div class="timeline-progress">
      <div
        class="progress-line"
        style="background: linear-gradient(90deg, {colors.goldenOrange}, {colors.pearlAqua});"
      ></div>
    </div>
  </div>
</div>

<style>
  .timeline-slide {
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
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 1rem;
  }

  .timeline-container::-webkit-scrollbar {
    width: 8px;
  }

  .timeline-container::-webkit-scrollbar-track {
    background: var(--dark-teal);
    border-radius: 4px;
  }

  .timeline-container::-webkit-scrollbar-thumb {
    background: var(--golden-orange);
    border-radius: 4px;
  }

  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .timeline-year {
    min-width: 80px;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    text-align: center;
  }

  .timeline-event {
    flex: 1;
    padding: 0.8rem 1rem;
    border-left: 3px solid;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0 0.5rem 0.5rem 0;
  }

  .timeline-event span {
    font-size: 1rem;
    line-height: 1.5;
  }

  .timeline-progress {
    padding: 1rem;
  }

  .progress-line {
    height: 4px;
    width: 100%;
    border-radius: 2px;
    animation: progress 10s infinite;
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

  @keyframes progress {
    0% {
      width: 0%;
    }
    50% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .timeline-year {
      min-width: 60px;
      font-size: 0.9rem;
    }

    .timeline-event span {
      font-size: 0.9rem;
    }
  }
</style>
