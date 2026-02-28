<script>
  export let id;
  export let title;
  export let showPromo = false;
  export let promoText = "";
  export let promoLink = "/posts";
  export let href = "/posts";
</script>

<div {id}>
  <article class="content">
    <h1><a {href}>{title}</a></h1>
    <hr />
    <p>
      <slot />
    </p>
    <hr />
    {#if showPromo}
      <div class="window-tint">
        <div class="promo-text">
          {promoText}
          <a href={promoLink} class="window-cta">Rapport</a>
        </div>
      </div>
    {/if}
  </article>
</div>

<style>
  .window-tint {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    text-align: center;
  }
  .promo-text {
    color: white;
    font-size: 1.5em;
  }
  .window-cta {
    display: inline-block;
    margin-top: 10px;
    color: white;
    text-decoration: underline;
  }
</style>
