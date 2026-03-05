<!-- src/lib/components/slides/ProductsSlide.svelte -->
<script>
  import { colors } from "../../utils/colors.js";
  const products = [
    {
      name: "ZayaWeb",
      function:
        "Psychoanalysis, authorship, cinema content",
      status: "Live"
    },
    {
      name: "ZayaTransliteration",
      function: "Translation, language migration",
      status: "Development"
    },
    {
      name: "ZayaBooks",
      function: "Melancholic Machines (publishing)",
      status: "Concept"
    },
    {
      name: "ZayaCourses",
      function: "Psychoanalytic courses",
      status: "Live"
    },
    {
      name: "ZayaBarrini",
      function: "Landing/portfolio",
      status: "Live"
    },
    {
      name: "ZayaLanguage",
      function: "Native language learning app",
      status: "Development"
    },
    {
      name: "ZayaSmartBooks",
      function: "International publishing, multi-OS",
      status: "Concept"
    },
    {
      name: "ZayaMovies",
      function: "Cinema production, animations",
      status: "Ongoing"
    },
    {
      name: "ZayaCRM",
      function: "Marketing, email campaigns",
      status: "Development"
    },
    {
      name: "ZayaDigitalWellbeing",
      function: "Ethical flow in digital spaces",
      status: "Concept"
    },
    {
      name: "ZayaPredictions",
      function: "Movie recommendation engine",
      status: "Prototype"
    },
    {
      name: "ZayaDB-Grammar",
      function: "Grammar rules by language",
      status: "Prototype"
    },
    {
      name: "ZayaGenealogy",
      function: "Family tree + net worth tracking",
      status: "Concept"
    },
    {
      name: "ZayaGames",
      function: "Klein bottle topology game",
      status: "Concept"
    }
  ];

  function getStatusColor(status) {
    switch (status) {
      case "Live":
        return colors.pearlAqua;
      case "Development":
        return colors.goldenOrange;
      case "Concept":
        return colors.rustySpice;
      case "Ongoing":
        return colors.darkCyan;
      case "Prototype":
        return colors.vanillaCustard;
      default:
        return colors.vanillaCustard;
    }
  }
</script>

<div class="products-slide">
  <div class="products-container">
    <h1
      class="parallax-item"
      style="color: {colors.vanillaCustard};"
    >
      Zayas Digital Products
    </h1>

    <div class="products-grid">
      {#each products as product, index}
        <div
          class="product-card parallax-item"
          style="animation-delay: {index * 0.05}s"
        >
          <h3 style="color: {colors.goldenOrange};">
            {product.name}
          </h3>
          <p style="color: {colors.pearlAqua};">
            {product.function}
          </p>
          <span
            class="status-badge"
            style="background: {getStatusColor(
              product.status
            )}; color: {colors.inkBlack};"
          >
            {product.status}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .products-slide {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .products-container {
    max-width: 1200px;
    width: 100%;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
    gap: 1.5rem;
  }

  .product-card {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: var(--golden-orange);
  }

  .product-card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .product-card p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .products-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
