<script>
  export let title;
  export let href = "/posts";
  export let theme = "light"; // "light" or "dark"
  export let showButton = false;
  export let buttonText = "Read More";
</script>

<section class={`section section-${theme}`}>
  <h2><a {href}>{title}</a></h2>
  <p>
    <slot />
    {#if showButton}
      <a class="btn btn-outline-info btn-lg" {href}
        >{buttonText}</a
      >
    {/if}
  </p>
</section>

<style>
  .section {
    padding: 20px;
    margin: 20px 0;
  }
  .section-light {
    background-color: #f9f9f9;
    color: #333;
  }
  .section-dark {
    background-color: #333;
    color: #f9f9f9;
  }
  .btn {
    margin-top: 10px;
    display: inline-block;
  }
</style>
