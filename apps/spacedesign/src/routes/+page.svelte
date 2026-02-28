<script lang="ts">
  import PostListing from "$lib/components/PostListing.svelte";
  import CarouselBootstrap from "$lib/components/homepage/CarouselBootstrap.svelte";
  import Phototable from "$lib/components/homepage/Phototable.svelte";
  import Main from "$lib/components/homepage/Main.svelte";
  import Paralax from "$lib/components/homepage/Paralax.svelte";
  // import CircularParallax from "$lib/components/homepage/CircularParallax.svelte";
  import ParallaxAux from "$lib/components/homepage/ParallaxAux.svelte";
  import Showcase from "$lib/components/homepage/Showcase.svelte";
  import Testimonial from "$lib/components/homepage/Testimonial.svelte";
  import "./style.css";
  import {
    Paralax1,
    Paralax2,
    ParallaxTopology
  } from "$lib/data/parallaxData";
  import {
    photoTableContent,
    photoTableContentHeader,
    photoTableTopologyHeader,
    photoTableTopology
  } from "$lib/data/photoTableContent";
  import { CarouselData } from "$lib/data/CarouselData";

  import {
    PostsContent,
    PostsContent2,
    post
  } from "$lib/data/postsData";
  import { Showcasedata } from "$lib/data/showcaseData";

  export let data;
</script>

<div class="homepage">
  <CarouselBootstrap {CarouselData} />
  <Paralax pages={Paralax1} />
  <Main {PostsContent} />
  <Paralax pages={ParallaxTopology} />
  <Phototable
    photoTableContent={photoTableTopology}
    title={photoTableTopologyHeader.title}
    content={photoTableTopologyHeader.content}
  />
  <Phototable
    {photoTableContent}
    title={photoTableContentHeader.title}
    content={photoTableContentHeader.content}
  />
  <Paralax pages={Paralax2} />
  <Main PostsContent={PostsContent2} />
  <!-- <CircularParallax
    title="L'écriture"
    href="/posts"
    backgroundImage="/css/img/Psychoanalysis/Topology18.png"
    text="Là où l'écriture devient instrument, elle se plie à une fonction. Là où elle se destine, elle s’aligne sur un but. Là où elle s’organise logistiquement, elle perd sa contingence. Pourtant, c’est bien dans le hors-sens, dans l’équivoque, dans l’accident signifiant que l’Autre de l’écriture surgit. Une écriture Autre ne s’écrit pas d’avance, elle se découvre dans son propre acte, dans le trou qu’elle creuse dans le symbolique."
  /> -->
  <ParallaxAux />
  <Testimonial {post} />
  <!-- <Showcase data={Showcasedata} /> -->
</div>
<div class="pt-24 max-w-5xl mx-auto">
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
</div>
