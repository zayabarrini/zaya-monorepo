<script lang="ts">
  import Paralax from "$lib/components/homepage/Paralax.svelte";
  import CircularParallax from "$lib/components/homepage/CircularParallax.svelte";
  import TOC from "$lib/components/TOC.svelte";
  import { TOCMelancholicMachines } from "$lib/data/TOC";

  import { ParalaxCinema } from "$lib/data/parallaxData";

  import "../style.css";
  const bookLink =
    "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";
</script>

<div class="homepage">
  <Paralax pages={ParalaxCinema} />
  <CircularParallax
    title="Psychoanalysis and Artificial Intelligence"
    href={"https://go.hotmart.com/B85742391D"}
    backgroundImage="/css/img/Psychoanalysis/Topology15.png"
    text=""
  />
  <CircularParallax
    title="Melancholic Machines"
    href={bookLink}
    backgroundImage="/css/img/Psychoanalysis/Topology22.png"
    text=""
  />
  <TOC toc={TOCMelancholicMachines} />
</div>
