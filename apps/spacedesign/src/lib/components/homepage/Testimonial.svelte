<script>
  export let post = {};
</script>

<section id="testimonial">
  <div class="container">
    <p>
      <a href="/posts">{post.text}</a>
    </p>
    <p class="customer">{post.author}</p>
  </div>
</section>

<style>
  #testimonial {
    padding: 20px;
    background-color: #eaeaea;
    text-align: center;
  }
  .customer {
    font-style: italic;
    margin-top: 10px;
  }
</style>
