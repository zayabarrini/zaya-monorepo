<script>
  export let pages = [];
</script>

{#each pages as page}
  <div
    id={page.id}
    class:ptext-light={page.light}
    class="parallax"
    style="
      {page.backgroundImage
      ? `background-image: url('${page.backgroundImage}');`
      : ''}
      {page.backgroundColor
      ? `background-color: ${page.backgroundColor};`
      : ''}
    "
  >
    <div class="ptext">
      <span class="border" class:trans={page.light}>
        <a href={page.href || "/posts"}>{page.text}</a>
      </span>
    </div>
  </div>
{/each}

<div id="page6">
  <div class="back-bird" />
  <a href="/posts"><div class="logo" /></a>
  <div class="fore-bird" />
</div>
