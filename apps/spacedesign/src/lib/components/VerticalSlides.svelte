<!-- src/lib/components/VerticalSlides.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { spring } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import { quintOut, cubicOut } from "svelte/easing";
  import { browser } from "$app/environment";

  // Import colors from your new color system
  import { colors } from "$lib/utils/colors.js";

  // Import background utilities
  import {
    getBackground,
    colorSchemes,
    type BackgroundType
  } from "$lib/utils/background";

  // Import all slide components
  import TitleSlide from "./slides/TitleSlide.svelte";
  import ProblemSlide from "./slides/ProblemSlide.svelte";
  import VisionSlide from "./slides/VisionSlide.svelte";
  import FoundationSlide from "./slides/FoundationSlide.svelte";
  import FrameworkSlide from "./slides/FrameworkSlide.svelte";
  import ProductsSlide from "./slides/ProductsSlide.svelte";
  import PerfectProductSlide from "./slides/PerfectProductSlide.svelte";
  import TrajectorySlide from "./slides/TrajectorySlide.svelte";
  import AccountingSlide from "./slides/AccountingSlide.svelte";
  import SoulAccountingSlide from "./slides/SoulAccountingSlide.svelte";
  import GlitchStrategySlide from "./slides/GlitchStrategySlide.svelte";
  import FutureFieldSlide from "./slides/FutureFieldSlide.svelte";
  import EthicalFrameworkSlide from "./slides/EthicalFrameworkSlide.svelte";
  import KleinBottleSlide from "./slides/KleinBottleSlide.svelte";
  import AskSlide from "./slides/AskSlide.svelte";
  import ReturnSlide from "./slides/ReturnSlide.svelte";
  import CloseSlide from "./slides/CloseSlide.svelte";
  import ContactSlide from "./slides/ContactSlide.svelte";
  import PsychoanalysisSlide from "./slides/PsychoanalysisSlide.svelte";
  import CinemaSlide from "./slides/CinemaSlide.svelte";
  import EngineeringSlide from "./slides/EngineeringSlide.svelte";
  import KnowledgeBaseSlide from "./slides/KnowledgeBaseSlide.svelte";
  import FamilyArchitectureSlide from "./slides/FamilyArchitectureSlide.svelte";
  import TimelineSlide from "./slides/TimelineSlide.svelte";
  import RiskAssessmentSlide from "./slides/RiskAssessmentSlide.svelte";
  import KleinBottleVisualSlide from "./slides/KleinBottleVisualSlide.svelte";
  import EndSlide from "./slides/EndSlide.svelte";

  // Types
  interface Slide {
    component: any;
    title: string;
    gradientStart?: keyof typeof colors;
    gradientEnd?: keyof typeof colors;
    backgroundType?: BackgroundType;
    backgroundIntensity?: number;
    primaryColor?: keyof typeof colors;
    secondaryColor?: keyof typeof colors;
  }

  // Props
  export let initialSlide: number = 0;

  // State
  let container: HTMLElement;
  let currentIndex: number = initialSlide;
  let isScrolling: boolean = false;
  let showTOC: boolean = false;
  let slideElements: HTMLElement[] = [];

  // Client-only state
  let scrollY: any;
  let touchStartY: number = 0;
  let unsubscribe: () => void;

  // Slide definitions with background types
  const slides: Slide[] = [
    {
      component: TitleSlide,
      title: "Title",
      gradientStart: "darkTeal",
      gradientEnd: "oxidizedIron",
      backgroundType: "blobs",
      backgroundIntensity: 0.35
    },
    {
      component: ProblemSlide,
      title: "The Problem",
      gradientStart: "burntCaramel",
      gradientEnd: "brownRed",
      backgroundType: "waves",
      backgroundIntensity: 0.25
    },
    {
      component: VisionSlide,
      title: "The Vision",
      gradientStart: "goldenOrange",
      gradientEnd: "rustySpice",
      backgroundType: "aurora",
      backgroundIntensity: 0.3
    },
    {
      component: FoundationSlide,
      title: "The Foundation",
      gradientStart: "darkCyan",
      gradientEnd: "pearlAqua",
      backgroundType: "grid",
      backgroundIntensity: 0.15
    },
    {
      component: FrameworkSlide,
      title: "Theoretical Framework",
      gradientStart: "oxidizedIron",
      gradientEnd: "burntCaramel",
      backgroundType: "circuit",
      backgroundIntensity: 0.2
    },
    {
      component: ProductsSlide,
      title: "Product Ecosystem",
      gradientStart: "darkTeal",
      gradientEnd: "darkCyan",
      backgroundType: "dots",
      backgroundIntensity: 0.2
    },
    {
      component: PerfectProductSlide,
      title: "The Perfect Product",
      gradientStart: "goldenOrange",
      gradientEnd: "brownRed",
      backgroundType: "morph",
      backgroundIntensity: 0.3
    },
    {
      component: TrajectorySlide,
      title: "The Trajectory",
      gradientStart: "rustySpice",
      gradientEnd: "oxidizedIron",
      backgroundType: "topography",
      backgroundIntensity: 0.15
    },
    {
      component: AccountingSlide,
      title: "Financial Architecture",
      gradientStart: "darkCyan",
      gradientEnd: "darkTeal",
      backgroundType: "grid",
      backgroundIntensity: 0.12
    },
    // {
    //   component: SoulAccountingSlide,
    //   title: "Accounting of the Soul",
    //   gradientStart: "brownRed",
    //   gradientEnd: "burntCaramel",
    //   backgroundType: "noise",
    //   backgroundIntensity: 0.1
    // },
    {
      component: GlitchStrategySlide,
      title: "The Glitch Strategy",
      gradientStart: "pearlAqua",
      gradientEnd: "goldenOrange",
      backgroundType: "circuit",
      backgroundIntensity: 0.25
    },
    {
      component: FutureFieldSlide,
      title: "The Future Field",
      gradientStart: "oxidizedIron",
      gradientEnd: "rustySpice",
      backgroundType: "aurora",
      backgroundIntensity: 0.35
    },
    {
      component: EthicalFrameworkSlide,
      title: "Ethical Framework",
      gradientStart: "darkTeal",
      gradientEnd: "pearlAqua",
      backgroundType: "waves",
      backgroundIntensity: 0.2
    },
    {
      component: KleinBottleSlide,
      title: "Klein Bottle Principle",
      gradientStart: "goldenOrange",
      gradientEnd: "darkCyan",
      backgroundType: "morph",
      backgroundIntensity: 0.3
    },
    {
      component: KleinBottleVisualSlide,
      title: "The Klein Bottle",
      gradientStart: "darkCyan",
      gradientEnd: "pearlAqua",
      backgroundType: "morph",
      backgroundIntensity: 0.35
    },
    {
      component: AskSlide,
      title: "The Ask",
      gradientStart: "burntCaramel",
      gradientEnd: "goldenOrange",
      backgroundType: "blobs",
      backgroundIntensity: 0.4
    },
    {
      component: ReturnSlide,
      title: "The Return",
      gradientStart: "pearlAqua",
      gradientEnd: "oxidizedIron",
      backgroundType: "liquid",
      backgroundIntensity: 0.25
    },
    {
      component: CloseSlide,
      title: "The Close",
      gradientStart: "darkCyan",
      gradientEnd: "rustySpice",
      backgroundType: "vignette",
      backgroundIntensity: 0.5
    },
    {
      component: ContactSlide,
      title: "Contact",
      gradientStart: "brownRed",
      gradientEnd: "darkTeal",
      backgroundType: "stripe",
      backgroundIntensity: 0.2
    },
    {
      component: PsychoanalysisSlide,
      title: "Psychoanalysis Foundation",
      gradientStart: "darkTeal",
      gradientEnd: "pearlAqua",
      backgroundType: "blobs",
      backgroundIntensity: 0.3
    },
    {
      component: CinemaSlide,
      title: "Cinema Foundation",
      gradientStart: "goldenOrange",
      gradientEnd: "burntCaramel",
      backgroundType: "aurora",
      backgroundIntensity: 0.3
    },
    {
      component: EngineeringSlide,
      title: "Engineering Foundation",
      gradientStart: "rustySpice",
      gradientEnd: "brownRed",
      backgroundType: "circuit",
      backgroundIntensity: 0.25
    },
    {
      component: KnowledgeBaseSlide,
      title: "The Knowledge Base",
      gradientStart: "darkCyan",
      gradientEnd: "oxidizedIron",
      backgroundType: "grid",
      backgroundIntensity: 0.15
    },
    {
      component: FamilyArchitectureSlide,
      title: "Family Architecture",
      gradientStart: "pearlAqua",
      gradientEnd: "darkTeal",
      backgroundType: "topography",
      backgroundIntensity: 0.15
    },
    {
      component: TimelineSlide,
      title: "Timeline 2016-2026",
      gradientStart: "burntCaramel",
      gradientEnd: "goldenOrange",
      backgroundType: "waves",
      backgroundIntensity: 0.2
    },
    {
      component: RiskAssessmentSlide,
      title: "Risk Assessment",
      gradientStart: "oxidizedIron",
      gradientEnd: "rustySpice",
      backgroundType: "noise",
      backgroundIntensity: 0.15
    },

    {
      component: EndSlide,
      title: "End",
      gradientStart: "brownRed",
      gradientEnd: "darkTeal",
      backgroundType: "vignette",
      backgroundIntensity: 0.6
    }
  ];

  function handleWheel(event: WheelEvent): void {
    if (!browser || isScrolling) return;

    // Check if the target is inside scrollable content or TOC
    const target = event.target as HTMLElement;
    const isInScrollableContent =
      target.closest(".slide-content") !== null;
    const isInTOC = target.closest(".toc") !== null;
    const isInNavigation =
      target.closest(".navigation") !== null;

    // Don't navigate if scrolling inside content areas
    if (
      isInScrollableContent ||
      isInTOC ||
      isInNavigation
    ) {
      return;
    }

    event.preventDefault();

    const delta = event.deltaY;
    const direction = delta > 0 ? 1 : -1;
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < slides.length) {
      isScrolling = true;

      // Trigger parallax effect on current slide elements
      if (slideElements[currentIndex]) {
        const elements = slideElements[
          currentIndex
        ].querySelectorAll(".parallax-item");
        elements.forEach((el: Element) => {
          (el as HTMLElement).style.transition =
            "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
          (el as HTMLElement).style.transform =
            `translateY(${direction * 15}px)`;
          setTimeout(() => {
            (el as HTMLElement).style.transform =
              "translateY(0)";
          }, 100);
        });
      }

      currentIndex = newIndex;

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }

  // Handle keyboard navigation - prevent when in content areas
  function handleKeyDown(event: KeyboardEvent): void {
    if (!browser) return;

    // Check if focus is inside scrollable content
    const target = event.target as HTMLElement;
    const isInScrollableContent =
      target.closest(".slide-content") !== null;
    const isInTOC = target.closest(".toc") !== null;
    const isInNavigation =
      target.closest(".navigation") !== null;

    // Only handle arrow keys for navigation if not in content areas
    if (
      (event.key === "ArrowUp" ||
        event.key === "ArrowDown") &&
      (isInScrollableContent || isInTOC || isInNavigation)
    ) {
      // Let the content scroll naturally
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        navigateToSlide(currentIndex - 1);
        break;
      case "ArrowDown":
        event.preventDefault();
        navigateToSlide(currentIndex + 1);
        break;
      case "Home":
        event.preventDefault();
        navigateToSlide(0);
        break;
      case "End":
        event.preventDefault();
        navigateToSlide(slides.length - 1);
        break;
    }
  }

  // Navigate to specific slide with parallax
  function navigateToSlide(index: number): void {
    if (!browser) return;

    if (
      index < 0 ||
      index >= slides.length ||
      index === currentIndex ||
      isScrolling
    )
      return;

    isScrolling = true;
    const direction = index > currentIndex ? 1 : -1;

    // Parallax effect on navigation
    if (slideElements[currentIndex]) {
      const elements = slideElements[
        currentIndex
      ].querySelectorAll(".parallax-item");
      elements.forEach((el: Element) => {
        (el as HTMLElement).style.transition =
          "transform 1s cubic-bezier(0.23, 1, 0.32, 1)";
        (el as HTMLElement).style.transform =
          `translateY(${direction * 20}px)`;
        setTimeout(() => {
          (el as HTMLElement).style.transform =
            "translateY(0)";
        }, 150);
      });
    }

    currentIndex = index;

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  // Touch handling
  function handleTouchStart(event: TouchEvent): void {
    if (!browser) return;
    touchStartY = event.touches[0].clientY;
  }

  function handleTouchEnd(event: TouchEvent): void {
    if (!browser) return;

    const touchEndY = event.changedTouches[0].clientY;
    const delta = touchStartY - touchEndY;

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        navigateToSlide(currentIndex + 1);
      } else {
        navigateToSlide(currentIndex - 1);
      }
    }
  }

  // Update scroll position when index changes
  function updateScrollPosition(): void {
    if (!browser || !container || !scrollY) return;

    const height = window.innerHeight;
    const targetPosition = currentIndex * height;

    scrollY.set(targetPosition);
  }

  // Get background style for a slide
  function getSlideBackground(slide: Slide): string {
    // Get colors from slide or use defaults from the colors object
    const primary = slide.gradientStart
      ? colors[slide.gradientStart]
      : colors.goldenOrange;
    const secondary = slide.gradientEnd
      ? colors[slide.gradientEnd]
      : colors.rustySpice;
    const tertiary = colors.rustySpice;
    const background = colors.inkBlack;

    if (slide.backgroundType) {
      return getBackground(
        slide.backgroundType,
        { primary, secondary, tertiary, background },
        slide.backgroundIntensity || 0.3
      );
    }

    // Fallback to gradient
    return `linear-gradient(135deg, ${primary}, ${secondary})`;
  }

  // Set up event listeners
  onMount(() => {
    if (!browser) return;

    // Initialize spring with smoother settings
    const initialPosition =
      currentIndex * window.innerHeight;
    scrollY = spring(initialPosition, {
      stiffness: 0.05,
      damping: 0.3,
      precision: 0.1
    });

    // Set up scroll subscription
    unsubscribe = scrollY.subscribe((value: number) => {
      if (container) {
        container.style.transform = `translateY(-${value}px)`;
      }
    });

    // Add event listeners
    window.addEventListener("wheel", handleWheel, {
      passive: false
    });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateScrollPosition();
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Set CSS custom properties for colors
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value as string);
    });

    // Clean up
    return () => {
      if (unsubscribe) unsubscribe();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );
      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );
      window.removeEventListener("resize", handleResize);
    };
  });

  // Update when currentIndex changes
  $: if (browser && scrollY && !isScrolling) {
    updateScrollPosition();
  }

  // Helper function to get color with type safety
  function getColor(colorKey: keyof typeof colors): string {
    return colors[colorKey] || colors.darkCyan;
  }
</script>

<svelte:head>
  <!-- Beautiful font imports -->
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Navigation Icons -->
<div class="navigation">
  <button
    class="nav-btn up-btn"
    class:disabled={currentIndex === 0}
    on:click={() => navigateToSlide(currentIndex - 1)}
    disabled={currentIndex === 0}
    aria-label="Previous slide"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L12 20M12 4L18 10M12 4L6 10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <button
    class="nav-btn down-btn"
    class:disabled={currentIndex === slides.length - 1}
    on:click={() => navigateToSlide(currentIndex + 1)}
    disabled={currentIndex === slides.length - 1}
    aria-label="Next slide"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20L12 4M12 20L18 14M12 20L6 14"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>

  <button
    class="nav-btn toc-btn"
    class:active={showTOC}
    on:click={() => (showTOC = !showTOC)}
    aria-label="Table of contents"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>
</div>

{#if showTOC}
  <div
    class="toc"
    transition:fly={{
      x: 20,
      duration: 400,
      easing: quintOut
    }}
  >
    <div
      class="toc-header"
      style="background: {colors.goldenOrange}"
    >
      <h3 style="color: {colors.inkBlack}">Contents</h3>
      <button
        class="close-toc"
        on:click={() => (showTOC = false)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <div class="toc-items">
      {#each slides as slide, index}
        <button
          class="toc-item"
          class:active={index === currentIndex}
          style="background: {index === currentIndex
            ? colors.goldenOrange
            : 'transparent'};"
          on:click={() => {
            navigateToSlide(index);
            showTOC = false;
          }}
        >
          <span
            class="toc-dot"
            style="background: {getColor(
              slide.gradientStart || 'darkCyan'
            )}"
          ></span>
          <span
            class="toc-title"
            style="color: {index === currentIndex
              ? colors.inkBlack
              : colors.vanillaCustard}"
          >
            {slide.title}
          </span>
          <span
            class="toc-index"
            style="color: {colors.pearlAqua}"
            >0{index + 1}</span
          >
        </button>
      {/each}
    </div>
  </div>
{/if}

<!-- Slides Container -->
<div class="slides-container" bind:this={container}>
  {#each slides as slide, index}
    <div
      class="slide"
      class:active={index === currentIndex}
      bind:this={slideElements[index]}
      style="background: {getSlideBackground(slide)};"
      in:fade={{ duration: 600, easing: cubicOut }}
    >
      <!-- Parallax background elements with smoother animation -->
      <div class="parallax-bg">
        <div
          class="bg-circle circle-1"
          style="background: {colors.pearlAqua};"
        ></div>
        <div
          class="bg-circle circle-2"
          style="background: {colors.goldenOrange};"
        ></div>
        <div
          class="bg-circle circle-3"
          style="background: {colors.rustySpice};"
        ></div>
      </div>

      <div class="slide-content">
        <svelte:component this={slide.component} />
      </div>

      <div class="slide-indicator">
        <span class="indicator-current">0{index + 1}</span>
        <div
          class="indicator-line"
          style="background: {colors.goldenOrange};"
        ></div>
        <span class="indicator-total">0{slides.length}</span
        >
      </div>
    </div>
  {/each}
</div>

<div class="progress-bar">
  <div
    class="progress-fill"
    style="width: {((currentIndex + 1) / slides.length) *
      100}%; background: {colors.goldenOrange};"
  ></div>
</div>

<style>
  :root {
    /* Colors will be set dynamically from the colors object */
    /* --ink-black: #001219ff;
    --dark-teal: #005f73ff;
    --dark-cyan: #0a9396ff;
    --pearl-aqua: #94d2bdff;
    --vanilla-custard: #e9d8a6ff;
    --golden-orange: #ee9b00ff;
    --burnt-caramel: #ca6702ff;
    --rusty-spice: #bb3e03ff;
    --oxidized-iron: #ae2012ff;
    --brown-red: #9b2226ff; */

    /* Typography */
    --font-heading: "Cormorant Garamond", Georgia, serif;
    --font-body:
      "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: "JetBrains Mono", "Courier New", monospace;
  }

  /* Global typography */
  :global(body) {
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    margin: 0;
    padding: 0;
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(p),
  :global(h4),
  :global(h5),
  :global(h6) {
    font-family: var(--font-heading) !important;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  /* :global(span) {
    font-family: var(--font-mono);
  } */

  :global(p) {
    font-size: 1.8em;
  }

  :global(.mono) {
    font-family: var(--font-mono);
  }

  .slides-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    will-change: transform;
    background: var(--ink-black);
  }

  .slide {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .slide.active {
    z-index: 1;
  }

  .slide-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    padding: 2rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    /* scrollbar-width: thin; */
    scrollbar-color: var(--golden-orange) var(--dark-teal);

    font-size: 1.1rem;
    line-height: 1.6;
    font-weight: 400;
    color: var(--vanilla-custard);

    -webkit-overflow-scrolling: touch;
  }

  .slide-content::-webkit-scrollbar {
    width: 8px;
  }

  .slide-content::-webkit-scrollbar-track {
    background: var(--dark-teal);
    border-radius: 4px;
  }

  .slide-content::-webkit-scrollbar-thumb {
    background: var(--golden-orange);
    border-radius: 4px;
  }

  .slide-content::after {
    content: "";
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.1),
      transparent
    );
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .slide-content:hover::after {
    opacity: 1;
  }

  .parallax-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .bg-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 25s infinite ease-in-out;
  }

  .circle-1 {
    width: 70vw;
    height: 70vw;
    top: -25%;
    right: -15%;
    animation-delay: 0s;
  }

  .circle-2 {
    width: 50vw;
    height: 50vw;
    bottom: -15%;
    left: -15%;
    animation-delay: -7s;
  }

  .circle-3 {
    width: 40vw;
    height: 40vw;
    top: 40%;
    left: 30%;
    animation-delay: -14s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(3%, 3%) scale(1.05);
    }
    66% {
      transform: translate(-3%, -3%) scale(0.95);
    }
  }

  .navigation {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    gap: 1rem;
    z-index: 100;
  }

  .nav-btn {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: none;
    background: var(--dark-teal);
    color: var(--vanilla-custard);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-btn:hover:not(.disabled) {
    background: var(--golden-orange);
    color: var(--ink-black);
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 8px 30px rgba(238, 155, 0, 0.3);
  }

  .nav-btn.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .nav-btn.active {
    background: var(--golden-orange);
    color: var(--ink-black);
  }

  .toc-btn {
    background: var(--oxidized-iron);
  }

  .toc {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 340px;
    max-height: 80vh;
    overflow-y: auto;
    background: rgba(0, 18, 25, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    z-index: 99;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(10, 147, 150, 0.3);
    font-family: var(--font-body);
  }

  .toc-header {
    padding: 1.2rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background: var(--golden-orange);
    z-index: 1;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .toc-header h3 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .close-toc {
    background: none;
    border: none;
    color: var(--ink-black);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
  }

  .close-toc:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  .toc-items {
    padding: 0.75rem;
  }

  .toc-item {
    width: 100%;
    padding: 1rem 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 1rem;
    text-align: left;
    margin: 0.25rem 0;
  }

  .toc-item:hover {
    background: var(--dark-teal) !important;
    transform: translateX(-4px);
  }

  .toc-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  .toc-item:hover .toc-dot {
    transform: scale(1.5);
  }

  .toc-title {
    flex: 1;
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .toc-index {
    font-size: 0.8rem;
    opacity: 0.7;
    font-family: var(--font-mono);
  }

  .slide-indicator {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 1px;
  }

  .indicator-current {
    color: var(--vanilla-custard);
  }

  .indicator-line {
    width: 60px;
    height: 2px;
    border-radius: 1px;
  }

  .indicator-total {
    color: var(--pearl-aqua);
  }

  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(0, 95, 115, 0.3);
    z-index: 1000;
    backdrop-filter: blur(5px);
  }

  .progress-fill {
    height: 100%;
    transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 0 20px rgba(238, 155, 0, 0.5);
  }

  @media (max-width: 768px) {
    .navigation {
      bottom: 1rem;
      right: 1rem;
      gap: 0.75rem;
    }

    .nav-btn {
      width: 3rem;
      height: 3rem;
    }

    .toc {
      width: 280px;
      top: 1rem;
      right: 1rem;
      max-height: 70vh;
    }

    .slide-content {
      padding: 1rem;
      font-size: 1rem;
    }

    .slide-indicator {
      bottom: 1rem;
      left: 1rem;
    }
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :focus-visible {
    outline: 2px solid var(--golden-orange);
    outline-offset: 2px;
  }
</style>
