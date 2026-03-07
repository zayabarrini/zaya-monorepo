<!-- src/lib/components/slides/PsychoanalysisSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";

  const languages = [
    "Portuguese",
    "English",
    "Spanish",
    "French",
    "learning Chinese"
  ];
  const timeZones = ["Americas", "Europe"];
  const courses = [
    "Dystopias in Psychoanalysis",
    "Figures in Psychoanalysis",
    "The Not-All: Feminine Structures"
  ];
</script>

<div class="psychoanalysis-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Psychoanalysis Foundation
    </h1>

    <div class="clinic-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        International Synchronous Clinic
      </h2>

      <div class="clinic-grid">
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Presence</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >Analyst and analysand</span
          >
        </div>
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Session time</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >Sacred container</span
          >
        </div>
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Languages</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >{#each languages as lang, i}{lang}{i <
              languages.length - 1
                ? ", "
                : ""}{/each}</span
          >
        </div>
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Time zones</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >{#each timeZones as zone, i}{zone}{i <
              timeZones.length - 1
                ? ", "
                : ""}{/each}</span
          >
        </div>
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Platforms</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >Secure, encrypted</span
          >
        </div>
        <div class="clinic-item">
          <span
            class="label"
            style="color: {colors.pearlAqua};"
            >Currencies</span
          >
          <span
            class="value"
            style="color: {colors.vanillaCustard};"
            >Multiple, crypto-ready</span
          >
        </div>
      </div>
    </div>

    <div class="courses-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Courses (ZayaCourses)
      </h2>
      <div class="courses-list">
        {#each courses as course, index}
          <div
            class="course-item"
            style="animation-delay: {index * 0.1}s"
          >
            <span
              class="course-bullet"
              style="color: {colors.goldenOrange};">📚</span
            >
            <span style="color: {colors.vanillaCustard};"
              >{course}</span
            >
          </div>
        {/each}
      </div>
    </div>

    <div class="content-section parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        Content (ZayaWeb)
      </h2>
      <div class="content-tags">
        <span
          class="tag"
          style="background: {colors.darkTeal};"
          >Authorship</span
        >
        <span
          class="tag"
          style="background: {colors.darkCyan};"
          >Clinical cases</span
        >
        <span
          class="tag"
          style="background: {colors.rustySpice};"
          >Theoretical essays</span
        >
      </div>
    </div>
  </div>
</div>

<style>
  .psychoanalysis-slide {
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

  .clinic-section {
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

  .clinic-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .clinic-item {
    display: flex;
    flex-direction: column;
  }

  .label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.3rem;
  }

  .value {
    font-size: 1.1rem;
  }

  .courses-section {
    background: rgba(0, 0, 0, 0.4);
    padding: 1.5rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.4s both;
  }

  .courses-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .course-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
    animation: slideInRight 0.6s ease-out forwards;
    opacity: 0;
  }

  .course-item:hover {
    transform: translateX(10px);
    background: var(--inkBlack);
  }

  .course-bullet {
    font-size: 1.2rem;
  }

  .content-section {
    animation: slideInUp 0.8s ease-out 0.6s both;
  }

  .content-tags {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .tag {
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    color: var(--vanilla-custard);
    transition: transform 0.3s ease;
  }

  .tag:hover {
    transform: scale(1.05);
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
      font-size: 2rem;
    }

    .clinic-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
