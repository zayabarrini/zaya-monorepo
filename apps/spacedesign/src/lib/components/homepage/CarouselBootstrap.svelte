<script lang="ts">
  // import { CarouselData } from "../CarouselData";
  export let CarouselData = [];

  let activeIndex = 0; // Ensure first slide is active
</script>

<div
  id="myCarousel"
  class="carousel slide"
  data-bs-ride="carousel"
  data-bs-interval="3000"
  data-bs-wrap="true"
>
  <!-- Indicators -->
  <ol class="carousel-indicators">
    {#each CarouselData as slide, i}
      <li
        data-bs-target="#myCarousel"
        data-bs-slide-to={i}
        class={i === activeIndex ? "active" : ""}
      />
    {/each}
  </ol>

  <!-- Carousel Content -->
  <div class="carousel-inner">
    {#each CarouselData as slide, i}
      <div
        class="carousel-item {i === activeIndex
          ? 'active'
          : ''}"
      >
        <img
          class="d-block w-100"
          src={slide.image}
          alt={slide.title}
        />
        <div class="carousel-caption d-none d-md-block">
          <h4>{slide.title}</h4>
          <h5>{slide.description}</h5>
        </div>
      </div>
    {/each}
  </div>

  <!-- Navigation Buttons -->
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#myCarousel"
    data-bs-slide="prev"
  >
    <span
      class="carousel-control-prev-icon"
      aria-hidden="true"
    />
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#myCarousel"
    data-bs-slide="next"
  >
    <span
      class="carousel-control-next-icon"
      aria-hidden="true"
    />
    <span class="visually-hidden">Next</span>
  </button>
</div>
