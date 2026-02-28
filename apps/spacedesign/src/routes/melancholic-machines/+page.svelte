<script lang="ts">
  // import CarouselBootstrap from "$lib/components/homepage/CarouselBootstrap.svelte";
  // import Phototable from "$lib/components/homepage/Phototable.svelte";
  // import Main from "$lib/components/homepage/Main.svelte";
  import Paralax from "$lib/components/homepage/Paralax.svelte";
  import CircularParallax from "$lib/components/homepage/CircularParallax.svelte";
  import TOC from "$lib/components/TOC.svelte";
  import { TOCMelancholicMachines } from "$lib/data/TOC";

  import { ParallaxMelancholicMachines } from "$lib/data/parallaxData";
  // import {
  //   photoTableCinema,
  //   photoTableCinemaHeader
  // } from "$lib/data/photoTableContent";
  // import { PostsCinemaContent } from "$lib/data/postsData";
  // import { CarouselDataCinema } from "$lib/data/CarouselData";

  import "../style.css";
  const bookLink =
    "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";
</script>

<div class="homepage">
  <!-- <CarouselBootstrap CarouselData={CarouselDataCinema} /> -->
  <CircularParallax
    title="Melancholic Machines"
    href={bookLink}
    backgroundImage="/css/img/Psychoanalysis/Topology22.png"
    text=""
  />
  <TOC toc={TOCMelancholicMachines} />
  <Paralax pages={ParallaxMelancholicMachines} />
  <!-- <Main PostsContent={PostsCinemaContent} /> -->
  <!-- <Phototable
      photoTableContent={photoTableCinema}
      title={photoTableCinemaHeader.title}
      content={photoTableCinemaHeader.content}
    /> -->
</div>
