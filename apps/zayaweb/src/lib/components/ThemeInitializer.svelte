<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { darkmode } from "$lib/stores/darkmode";

  onMount(() => {
    if (!browser) return;

    const prefersDark =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)")
          .matches);

    // Update the store first
    $darkmode = prefersDark;

    // Then update the DOM
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
</script>

<svelte:head>
  <title
    >Zaya Barrini Psychoanalysis, Art and Cinema Studio</title
  >
</svelte:head>

<slot />
