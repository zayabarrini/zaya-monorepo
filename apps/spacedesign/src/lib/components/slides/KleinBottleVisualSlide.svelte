<!-- src/lib/components/slides/KleinBottleVisualSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
</script>

<div class="klein-visual-slide">
  <div class="content-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      The Klein Bottle
    </h1>

    <div class="visual-container parallax-item">
      <!-- Klein bottle ASCII/SVG representation -->
      <div class="klein-drawing">
        <div class="klein-shape">
          <div
            class="klein-path"
            style="border-color: {colors.goldenOrange};"
          ></div>
          <div
            class="klein-path"
            style="border-color: {colors.pearlAqua};"
          ></div>
          <div
            class="klein-path"
            style="border-color: {colors.rustySpice};"
          ></div>
        </div>
      </div>

      <div class="klein-labels">
        <div class="label-item">
          <span
            class="label-dot"
            style="background: {colors.goldenOrange};"
          ></span>
          <span style="color: {colors.goldenOrange};"
            >Outside becomes inside</span
          >
        </div>
        <div class="label-item">
          <span
            class="label-dot"
            style="background: {colors.pearlAqua};"
          ></span>
          <span style="color: {colors.pearlAqua};"
            >Flow regulates itself</span
          >
        </div>
        <div class="label-item">
          <span
            class="label-dot"
            style="background: {colors.rustySpice};"
          ></span>
          <span style="color: {colors.rustySpice};"
            >Containment without boundary</span
          >
        </div>
        <div class="label-item">
          <span
            class="label-dot"
            style="background: {colors.vanillaCustard};"
          ></span>
          <span style="color: {colors.vanillaCustard};"
            >Unease as feature, not bug</span
          >
        </div>
      </div>
    </div>

    <div class="zayas-klein parallax-item">
      <h2 style="color: {colors.goldenOrange};">
        The Zayas Project is a Klein bottle:
      </h2>
      <div class="klein-components">
        <div
          class="component"
          style="background: {colors.darkTeal};"
        >
          <span class="comp-title">Psychoanalysis</span>
          <span class="comp-desc">inner flow</span>
        </div>
        <div
          class="component"
          style="background: {colors.darkCyan};"
        >
          <span class="comp-title">Cinema</span>
          <span class="comp-desc">outer image</span>
        </div>
        <div
          class="component"
          style="background: {colors.rustySpice};"
        >
          <span class="comp-title">Engineering</span>
          <span class="comp-desc"
            >the surface that connects them</span
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .klein-visual-slide {
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

  .visual-container {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.2s both;
  }

  .klein-drawing {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 2rem;
  }

  .klein-shape {
    position: relative;
    width: 100%;
    height: 100%;
    animation: rotate 20s infinite linear;
  }

  .klein-path {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border: 3px solid;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .klein-path:nth-child(1) {
    width: 200px;
    height: 200px;
    animation: morph1 8s infinite ease-in-out;
  }

  .klein-path:nth-child(2) {
    width: 150px;
    height: 150px;
    animation: morph2 8s infinite ease-in-out 1s;
  }

  .klein-path:nth-child(3) {
    width: 100px;
    height: 100px;
    animation: morph3 8s infinite ease-in-out 2s;
  }

  .klein-labels {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .label-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.4);
  }

  .label-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .zayas-klein {
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .zayas-klein h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .klein-components {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .component {
    padding: 1rem;
    border-radius: 1rem;
    text-align: center;
    color: var(--vanilla-custard);
    transition: transform 0.3s ease;
  }

  .component:hover {
    transform: scale(1.05);
  }

  .comp-title {
    display: block;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .comp-desc {
    display: block;
    font-size: 0.85rem;
    opacity: 0.9;
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

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes morph1 {
    0%,
    100% {
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  @keyframes morph2 {
    0%,
    100% {
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
      transform: translate(-50%, -50%) scale(0.9);
    }
  }

  @keyframes morph3 {
    0%,
    100% {
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .klein-labels {
      grid-template-columns: 1fr;
    }

    .klein-components {
      grid-template-columns: 1fr;
    }
  }
</style>
