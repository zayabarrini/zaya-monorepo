<script>
  import "swiper/element/bundle";
  import { onMount } from "svelte";

  let slides = [
    {
      src: "/css/img/Psychoanalysis/Topology10.png",
      title: "Slide 1: Topology in Psychoanalysis",
      subtitle:
        "Exploring the mathematical models in Lacan’s theories."
    },
    {
      src: "/css/img/Psychoanalysis/Topology11.png",
      title: "Slide 2: Borromean Knot",
      subtitle:
        "The symbolic, imaginary, and real are intertwined."
    },
    {
      src: "/css/img/Psychoanalysis/Topology12.png",
      title: "Slide 3: Lacan’s Perspective",
      subtitle:
        "Understanding the unconscious through topology."
    },
    {
      src: "/css/img/Psychoanalysis/Topology13.png",
      title: "Slide 4: The Real and the Symbolic",
      subtitle: "How the real disrupts the symbolic order."
    }
  ];

  let swiperEl;

  onMount(() => {
    // Select the Swiper container after DOM is loaded
    swiperEl = document.querySelector("swiper-container");

    if (swiperEl) {
      // Assign Swiper properties
      Object.assign(swiperEl, {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: true,
        pagination: true,
        breakpoints: {
          640: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      });

      // Initialize Swiper Web Component
      swiperEl.initialize();
    }
  });

  function nextSlide() {
    swiperEl?.swiper?.slideNext();
  }

  function prevSlide() {
    swiperEl?.swiper?.slidePrev();
  }
</script>

<!-- Swiper Web Component -->
<swiper-container
  class="relative w-full h-[900px]"
  autoplay
  loop
  navigation
  pagination
>
  {#each slides as slide}
    <swiper-slide>
      <div
        class="relative w-full h-full flex justify-center items-center"
      >
        <img
          src={slide.src}
          alt={slide.title}
          class="w-full h-full object-cover"
        />
        <!-- Centered text box -->
        <div
          class="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white p-6 rounded-lg max-w-[60%] text-center"
        >
          <h4 class="text-2xl font-bold">{slide.title}</h4>
          <p class="text-lg">{slide.subtitle}</p>
        </div>
      </div>
    </swiper-slide>
  {/each}
</swiper-container>

<!-- Custom navigation buttons -->
<button
  on:click={prevSlide}
  class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-black p-3 rounded-full z-10"
>
  ⬅
</button>
<button
  on:click={nextSlide}
  class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-black p-3 rounded-full z-10"
>
  ➡
</button>
