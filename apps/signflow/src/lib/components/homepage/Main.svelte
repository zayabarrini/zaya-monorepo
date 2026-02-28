<script>
  import Section from "./Section.svelte";
  import Page from "./Page.svelte";

  export let PostsContent = [];
</script>

{#each PostsContent as { id, title, content, showPromo, promoText, href }}
  <Page {id} {title} {showPromo} {promoText} {href}
    >{content}</Page
  >
{/each}
