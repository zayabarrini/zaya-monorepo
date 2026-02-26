<script lang="ts">
  import MainHeader from "$lib/components/MainHeader.svelte";
  import ThemeInitializer from "$lib/components/ThemeInitializer.svelte";
  import { fly } from "svelte/transition";
  import "../app.css";
  import type { LayoutData } from "./$types";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Footer from "$lib/components/homepage/Footer.svelte";
  import TranslateButton from "$lib/components/TranslateButton.svelte";
  import ReadAloud from "$lib/components/ReadAloud.svelte";
  import IAAssitant from "$lib/components/IAAssistant.svelte";
  import InstallButton from "$lib/components/InstallButton.svelte";

  export let data: LayoutData;
  import "../app.css"; // This ensures it's bundled properly
  import "./style.css";

  $: pagePath = data.pathname;
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
  ></script>
  <link
    rel="icon"
    type="image/png"
    href="/css/img/dress-fashion.jpeg"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700%7CRoboto%7CJosefin+Sans:100,300,400,500"
    rel="stylesheet"
    type="text/css"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Satisfy&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Playball|Sedgwick+Ave+Display|Zilla+Slab+Highlight"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Indie+Flower|Lora|Pacifico|Playfair+Display|Roboto|Roboto+Condensed|Slabo+27px"
    rel="stylesheet"
  />
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
  ></script>

  <script
    src="https://unpkg.com/scrollreveal/dist/scrollreveal.min.js"
  ></script>
  <script
    src="https://code.jquery.com/jquery-3.1.1.slim.min.js"
    integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n"
    crossorigin="anonymous"
  ></script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"
    integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb"
    crossorigin="anonymous"
  ></script>
  <!-- <script
    src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"
    integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn"
    crossorigin="anonymous"
  ></script> -->

  <!-- Initialize scripts after DOM is loaded -->
  <script>
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        // ScrollReveal initialization
        if (typeof ScrollReveal !== "undefined") {
          window.sr = ScrollReveal();

          const revealConfigs = {
            ".navbar": { duration: 2000 },
            ".showcase-left": {
              duration: 2000,
              origin: "top",
              distance: "10em"
            },
            ".showcase-right": {
              duration: 2000,
              origin: "right",
              distance: "10em"
            },
            ".showcase-btn": {
              duration: 2000,
              delay: 2000,
              origin: "bottom"
            },
            "#testimonial div": {
              duration: 2000,
              origin: "bottom"
            },
            ".info-left": {
              duration: 2000,
              origin: "left",
              distance: "10em",
              viewFactor: 0.2
            },
            ".info-right": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".info-down": {
              duration: 2000,
              origin: "down",
              distance: "10em"
            },
            ".section": {
              duration: 2000,
              origin: "down",
              distance: "10em"
            },
            "#contact form": {
              duration: 2000,
              origin: "left",
              distance: "10em"
            },
            ".header-collection": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".left": {
              duration: 2000,
              origin: "left",
              distance: "10em",
              viewFactor: 0.2
            },
            ".center": {
              duration: 2000,
              origin: "bottom",
              distance: "10em",
              viewFactor: 0.2
            },
            ".right": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".footer": {
              duration: 2000,
              origin: "left",
              distance: "10em"
            }
          };

          Object.entries(revealConfigs).forEach(
            ([selector, config]) => {
              window.sr.reveal(selector, config);
            }
          );
        }

        // Smooth scrolling
        if (typeof $ !== "undefined") {
          $('a[href*="#"]:not([href="#"])').click(
            function (e) {
              if (
                location.pathname.replace(/^\//, "") ===
                  this.pathname.replace(/^\//, "") &&
                location.hostname === this.hostname
              ) {
                const target =
                  $(this.hash) ||
                  $(`[name=${this.hash.slice(1)}]`);
                if (target.length) {
                  $("html, body").animate(
                    { scrollTop: target.offset().top },
                    1000
                  );
                  e.preventDefault();
                }
              }
            }
          );
        }
      }
    );
  </script>
</svelte:head>

<ThemeInitializer>
  {#key pagePath}
    <div class="">
      <main
        in:fly={{ y: -15, duration: 200, delay: 300 }}
        out:fly={{ y: 15, duration: 200 }}
      >
        <MainHeader />
        <TranslateButton />
        <InstallButton />
        <!-- <ReadAloud /> -->
        <!-- <IAAssitant /> -->
        <slot />
        <Footer />
      </main>
    </div>
  {/key}

  <!-- <script src="/js/functions.js"></script> -->
</ThemeInitializer>
