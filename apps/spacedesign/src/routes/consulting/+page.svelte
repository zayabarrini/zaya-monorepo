<script lang="ts">
  import CarouselBootstrap from "$lib/components/homepage/CarouselBootstrap.svelte";
  import Phototable from "$lib/components/homepage/Phototable.svelte";
  import Main from "$lib/components/homepage/Main.svelte";
  import Paralax from "$lib/components/homepage/Paralax.svelte";
  import CircularParallax from "$lib/components/homepage/CircularParallax.svelte";
  import SupportUs from "$lib/components/SupportUs.svelte";

  import { ParalaxCinema } from "$lib/data/parallaxData";
  import {
    photoTableCinema,
    photoTableDirectors,
    photoTableCinemaHeader,
    photoTableDirectorsHeader
  } from "$lib/data/photoTableContent";
  import { PostsCinemaContent } from "$lib/data/postsData";
  import { CarouselDataCinema } from "$lib/data/CarouselData";

  import "../style.css";
  import ProductsShowcase from "$lib/components/ProductsShowcase.svelte";
  import HighValueConsulting from "$lib/components/HighValueConsulting.svelte";

  const bookLink =
    "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";
</script>

<div class="homepage">
  <HighValueConsulting />
  <ProductsShowcase />
  <SupportUs />
  <CarouselBootstrap CarouselData={CarouselDataCinema} />
  <Paralax pages={ParalaxCinema} />
  <Phototable
    photoTableContent={photoTableDirectors}
    title={photoTableDirectorsHeader.title}
    content={photoTableDirectorsHeader.content}
  />
  <Main PostsContent={PostsCinemaContent} />
  <Phototable
    photoTableContent={photoTableCinema}
    title={photoTableCinemaHeader.title}
    content={photoTableCinemaHeader.content}
  />
  <CircularParallax
    title="Melancholic Machines"
    href={bookLink}
    backgroundImage="/css/img/Psychoanalysis/Topology18.png"
    text=""
  />
</div>
