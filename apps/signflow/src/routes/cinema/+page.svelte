<script lang="ts">
  //   import PostListing from "$lib/components/PostListing.svelte";
  import CarouselBootstrap from "$lib/components/homepage/CarouselBootstrap.svelte";
  import Phototable from "$lib/components/homepage/Phototable.svelte";
  import Main from "$lib/components/homepage/Main.svelte";
  import Paralax from "$lib/components/homepage/Paralax.svelte";
  import CircularParallax from "$lib/components/homepage/CircularParallax.svelte";
  import Footer from "$lib/components/homepage/FooterForm.svelte";
  import Showcase from "$lib/components/homepage/Showcase.svelte";
  import Testimonial from "$lib/components/homepage/Testimonial.svelte";

  import {
    ParalaxCinema,
    Paralax2
  } from "$lib/data/parallaxData";
  import {
    photoTableCinema,
    photoTableCinemaHeader
  } from "$lib/data/photoTableContent";
  import {
    PostsCinemaContent,
    post
  } from "$lib/data/postsData";
  import { Showcasedata } from "$lib/data/showcaseData";
  import { CarouselDataCinema } from "$lib/data/CarouselData";

  import "../style.css";
  const bookLink =
    "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";

  //   export let data;
</script>

<div class="homepage">
  <CarouselBootstrap CarouselData={CarouselDataCinema} />
  <Paralax pages={ParalaxCinema} />
  <Main PostsContent={PostsCinemaContent} />
  <Phototable
    photoTableContent={photoTableCinema}
    title={photoTableCinemaHeader.title}
    content={photoTableCinemaHeader.content}
  />
  <!-- <Paralax pages={Paralax2} /> -->
  <!-- <Main PostsContent={PostsContent2} /> -->
  <CircularParallax
    title="Melancholic Machines"
    href={bookLink}
    backgroundImage="/css/img/Psychoanalysis/Topology18.png"
    text=""
  />
  <!-- <Testimonial {post} /> -->
  <!-- <Showcase data={Showcasedata} /> -->

  <!-- <div class="pt-24 max-w-5xl mx-auto">
      <section class="pb-6">
        <header
          class="inline-block border-b dark:border-gray-700 py-2 mx-4 mb-4"
        >
          <h2 class="text-3xl font-semibold">
            Cinema, Psychoanalysis and Art Creation
          </h2>
        </header>
        <section class="divide-y dark:divide-gray-700">
          {#each data.posts as post}
            <PostListing {post} />
          {/each}
        </section>
      </section>
    </div> -->

  <!-- <Footer /> -->
</div>
