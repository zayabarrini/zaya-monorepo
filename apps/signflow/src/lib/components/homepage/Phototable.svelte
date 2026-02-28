<script>
  // Recebe os dados do componente pai
  export let photoTableContent = [];
  export let title = "";
  export let content = "";

  // Função para dividir o array em grupos de 3
  const chunkArray = (arr, size) => {
    return Array.from(
      { length: Math.ceil(arr.length / size) },
      (_, i) => arr.slice(i * size, i * size + size)
    );
  };

  // Divide os dados em linhas de 3
  const rows = chunkArray(photoTableContent, 3);
</script>

<div id="clothes-section">
  <article class="content">
    <div class="header-collection">
      <h1>
        <a href="/posts">{title}</a>
      </h1>
      <hr />
      <p>
        {content}
      </p>
      <hr />
    </div>
    <div class="clothes-pic">
      {#each rows as row}
        <div class="row img-row">
          {#each row as item, colIndex}
            <figure
              class="col-md-4 col-sm-3 {colIndex === 0
                ? 'left'
                : colIndex === 1
                ? 'center'
                : 'right'}"
            >
              <a href={item.href || "/posts"}>
                <img src={item.src} alt={item.label} />
              </a>
              <figcaption>{item.label}</figcaption>
            </figure>
          {/each}
        </div>
      {/each}
    </div>
  </article>
</div>

<style>
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .col-md-4 {
    flex: 0 0 32%;
    max-width: 32%;
  }
  .left {
    text-align: left;
  }
  .center {
    text-align: center;
  }
  .right {
    text-align: right;
  }
  img {
    width: 100%;
    height: auto;
  }
  figcaption {
    margin-top: 10px;
    font-size: 14px;
  }
</style>
