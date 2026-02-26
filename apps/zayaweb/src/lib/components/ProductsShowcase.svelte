<!-- ProductsShowcase.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  import type { ProductCategory } from "../../types";
  // Product categories data
  const productCategories: ProductCategory[] = [
    {
      id: "digital-experience",
      title: "Digital Experience",
      description:
        "Colors, Fonts, Animations & Beautiful Reading Experiences",
      keywords: [
        "Consulting",
        "Clinic",
        "Urban Studies",
        "Anthropology",
        "Psychology",
        "Gender Studies",
        "Digital Humanities"
      ],
      items: [
        {
          id: "reading-mode",
          title: "Beautiful Reading Mode",
          description: "Browser Extension, App, Desktop",
          url: "#",
          category: "digital-experience"
        },
        {
          id: "pdf-conversion",
          title: "PDF to Webpage Conversion",
          description:
            "From PDFs to beautiful webpages with custom fonts, colors, and design",
          url: "#",
          category: "digital-experience"
        }
      ],
      gradientClass: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: "github-projects",
      title: "GitHub Projects",
      description:
        "Open source projects covering various domains",
      keywords: [
        "ML",
        "Python",
        "Analysis",
        "Agents",
        "Automation",
        "Digital Wellbeing"
      ],
      items: [
        {
          id: "zayapredictions",
          title: "Movies List & Recommendations",
          description:
            "ML, Python movie recommendations and rating preview",
          url: "https://github.com/zayabarrini/zayapredictions",
          category: "github"
        },
        {
          id: "cinema",
          title: "Cinema Analysis",
          description: "Analysis, Industry, Music insights",
          url: "https://github.com/zayabarrini/cinema",
          category: "github"
        },
        {
          id: "zayasagents",
          title: "AI Agents",
          description:
            "Agents for multiple tasks and automation",
          url: "https://github.com/zayabarrini/ZayasAgents",
          category: "github"
        },
        {
          id: "wellbeingos",
          title: "Digital Wellbeing OS",
          description:
            "Wellbeing prompts and digital wellness tools",
          url: "https://github.com/zayabarrini/WellbeingOS",
          category: "github"
        },
        {
          id: "crm",
          title: "Mail Automation",
          description: "Mail scraping and automation CRM",
          url: "https://github.com/zayabarrini/CRM",
          category: "github"
        }
      ],
      gradientClass: "from-emerald-500/20 to-cyan-500/20"
    },
    {
      id: "language-tools",
      title: "Language & Tools",
      description:
        "Grammar, Transliteration, and Language Resources",
      keywords: [
        "Grammar Rules",
        "Transliteration",
        "Subtitles",
        "Epub Creation",
        "Web Tools"
      ],
      items: [
        {
          id: "grammar-db",
          title: "Grammar Rules Database",
          description: "Grammar rules by languages",
          url: "https://github.com/zayabarrini/zayas-grammar-db",
          category: "language"
        },
        {
          id: "transliteration",
          title: "Transliteration Tools",
          description:
            "Transliteration, Subtitles, Epub Creation and Management",
          url: "https://github.com/zayabarrini/Transliteration",
          category: "language"
        },
        {
          id: "languages-blog",
          title: "Languages Blog",
          description:
            "ZayasLanguage Blog for language enthusiasts",
          url: "https://github.com/zayabarrini/languages",
          category: "language"
        },
        {
          id: "zayasbooks",
          title: "Translated Books",
          description:
            "Translated books in multiple languages",
          url: "https://github.com/zayabarrini/ZayasBooks",
          category: "language"
        }
      ],
      gradientClass: "from-blue-500/20 to-indigo-500/20"
    },
    {
      id: "career",
      title: "Career Tools",
      description:
        "Job automation and career development tools",
      keywords: [
        "Job Automation",
        "Digital Twin",
        "Career Development"
      ],
      items: [
        {
          id: "career-digital-twin",
          title: "Job Getter & Automation",
          description:
            "Automatization for job applications and career management",
          url: "https://github.com/zayabarrini/Zayas-career-digital-twin",
          category: "career"
        }
      ],
      gradientClass: "from-orange-500/20 to-amber-500/20"
    },
    {
      id: "3d-psychoanalysis",
      title: "3D Modeling & Psychoanalysis",
      description:
        "3D visualizations and psychological explorations",
      keywords: [
        "3D Modeling",
        "Klein Bottle",
        "Psychoanalysis",
        "Topology"
      ],
      items: [
        {
          id: "kleinsfantasy",
          title: "3D Modeling + Klein Bottle",
          description:
            "3D Modeling and Klein Bottle visualizations on the web",
          url: "https://github.com/zayabarrini/kleinsfantasy",
          category: "3d"
        }
      ],
      gradientClass: "from-rose-500/20 to-fuchsia-500/20"
    }
  ];

  let activeCategory = productCategories[0];
  let isDarkMode = false;

  onMount(() => {
    // Check for dark mode preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    isDarkMode = darkModeMediaQuery.matches;

    // Listen for changes
    darkModeMediaQuery.addEventListener("change", (e) => {
      isDarkMode = e.matches;
    });
  });

  function setActiveCategory(category: ProductCategory) {
    activeCategory = category;
  }

  function openUrl(url: string) {
    window.open(url, "_blank");
  }
</script>

<div
  class="products-showcase font-sans relative min-h-screen overflow-hidden"
  class:dark={isDarkMode}
>
  <!-- Animated Background Blobs -->
  <div class="background-blobs fixed inset-0 z-[-2]"></div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8 relative z-10">
    <!-- Header -->
    <header class="mb-12 text-center">
      <h1
        class="zaya text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
      >
        Zaya's Digital Portfolio
      </h1>
      <p
        class="prose prose-lg mx-auto text-gray-700 dark:text-gray-300 max-w-3xl"
      >
        A collection of projects spanning digital
        experiences, language tools, career automation, 3D
        modeling, and psychoanalysis. All beautifully
        designed for both light and dark modes.
      </p>
    </header>

    <!-- Category Navigation -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      {#each productCategories as category}
        <button
          on:click={() => setActiveCategory(category)}
          class="category-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
          class:active={activeCategory.id === category.id}
        >
          <span class="relative z-10">{category.title}</span
          >
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 {category.gradientClass}"
          ></div>
        </button>
      {/each}
    </div>

    <!-- Active Category Content -->
    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
    >
      <!-- Left Column: Category Info -->
      <div class="lg:col-span-2">
        <div
          class="post-listing p-8 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl"
        >
          <div class="post-listing-content">
            <h2
              class="text-4xl font-bold mb-4 font-playball bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {activeCategory.title}
            </h2>
            <p
              class="prose text-xl mb-6 text-gray-800 dark:text-gray-200"
            >
              {activeCategory.description}
            </p>

            <!-- Keywords -->
            <div class="flex flex-wrap gap-2 mb-8">
              {#each activeCategory.keywords as keyword}
                <span
                  class="keyword-tag px-4 py-2 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              {/each}
            </div>

            <!-- Products Grid -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {#each activeCategory.items as item}
                <button
                  type="button"
                  on:click={() => openUrl(item.url)}
                  class="product-card p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group text-left w-full"
                  aria-label={`View project: ${item.title}`}
                >
                  <div class="flex items-start gap-4">
                    <div
                      class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br {activeCategory.gradientClass} flex items-center justify-center"
                    >
                      <div
                        class="w-6 h-6 bg-white/80 rounded"
                      ></div>
                    </div>
                    <div class="flex-1">
                      <h3
                        class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                      >
                        {item.title}
                      </h3>
                      <p
                        class="text-gray-600 dark:text-gray-300 mb-3"
                      >
                        {item.description}
                      </p>
                      <span
                        class="inline-flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium"
                      >
                        View Project →
                      </span>
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Preview -->
      <div class="space-y-8">
        <!-- Gradient Preview -->
        <div
          class="gradient-preview p-8 rounded-3xl backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20"
        >
          <h3
            class="text-2xl font-bold mb-6 font-playball text-gray-900 dark:text-white"
          >
            Visual Theme
          </h3>
          <div
            class="w-full h-48 rounded-2xl bg-gradient-to-br {activeCategory.gradientClass} relative overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-white/10 to-transparent"
            ></div>
            <div
              class="absolute bottom-4 left-4 right-4 p-4 backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-xl"
            >
              <div
                class="h-3 w-3/4 bg-white/30 rounded-full mb-2"
              ></div>
              <div
                class="h-3 w-1/2 bg-white/20 rounded-full"
              ></div>
            </div>
          </div>
        </div>

        <!-- Mode Toggle -->
        <div
          class="mode-toggle p-8 rounded-3xl backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20"
        >
          <h3
            class="text-2xl font-bold mb-6 font-playball text-gray-900 dark:text-white"
          >
            Display Mode
          </h3>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"
              >
                <div
                  class="w-6 h-6 rounded-full bg-yellow-400"
                ></div>
              </div>
              <span
                class="font-semibold text-gray-900 dark:text-white"
                >Light</span
              >
            </div>

            <div class="relative">
              <div
                class="w-14 h-8 flex items-center rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <div
                  class="transform transition-transform duration-300"
                  style={`transform: translateX(${isDarkMode ? "1.5rem" : "0"});`}
                >
                  <div
                    class="w-6 h-6 rounded-full bg-white shadow-lg"
                  ></div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span
                class="font-semibold text-gray-900 dark:text-white"
                >Dark</span
              >
              <div
                class="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center"
              >
                <div
                  class="w-6 h-6 rounded-full bg-indigo-400"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div
          class="stats p-8 rounded-3xl backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/20"
        >
          <h3
            class="text-2xl font-bold mb-6 font-playball text-gray-900 dark:text-white"
          >
            Project Stats
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300"
                >Total Projects</span
              >
              <span
                class="text-2xl font-bold text-purple-600 dark:text-purple-400"
                >11</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300"
                >Active Categories</span
              >
              <span
                class="text-2xl font-bold text-pink-600 dark:text-pink-400"
                >5</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-300"
                >GitHub Repos</span
              >
              <span
                class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >10</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Projects Quick Links -->
    <div class="mt-16">
      <h2
        class="text-3xl font-bold mb-8 text-center font-playball text-gray-900 dark:text-white"
      >
        All Project Categories
      </h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {#each productCategories as category}
          <button
            type="button"
            on:click={() => setActiveCategory(category)}
            class="category-card p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer text-left w-full"
            aria-label={`Explore category: ${category.title}`}
          >
            <div class="flex items-center gap-4 mb-4">
              <div
                class="w-12 h-12 rounded-xl {category.gradientClass} flex items-center justify-center"
              >
                <div
                  class="w-6 h-6 bg-white/80 rounded"
                ></div>
              </div>
              <h3
                class="text-xl font-bold text-gray-900 dark:text-white"
              >
                {category.title}
              </h3>
            </div>
            <p
              class="text-gray-600 dark:text-gray-300 mb-4"
            >
              {category.description}
            </p>
            <div class="flex items-center justify-between">
              <span
                class="text-sm text-gray-500 dark:text-gray-400"
              >
                {category.items.length}
                {category.items.length === 1
                  ? "project"
                  : "projects"}
              </span>
              <span
                class="text-purple-600 dark:text-purple-400 font-medium"
              >
                Explore →
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer
    class="mt-20 py-8 border-t border-gray-200 dark:border-gray-800"
  >
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-600 dark:text-gray-400">
        Built with Svelte & TypeScript • Designed for both
        light and dark modes
      </p>
      <p
        class="mt-2 text-sm text-gray-500 dark:text-gray-500"
      >
        All projects available on GitHub • Fonts: Lora,
        Playball, Open Sans
      </p>
    </div>
  </footer>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Playball&family=Open+Sans:wght@300;400;500;600;700&family=Satisfy&display=swap");

  .products-showcase {
    background: var(--background-color);
    color: var(--text-color);
    font-family: "Lora", serif;
    min-height: 100vh;
  }

  .dark .products-showcase {
    background:
      radial-gradient(
        700px at 20% 30%,
        color-mix(in srgb, #91476c 30%, transparent),
        transparent 60%
      ),
      radial-gradient(
        600px at 80% 70%,
        color-mix(in srgb, #3e975c 30%, transparent),
        transparent 65%
      ),
      radial-gradient(
        500px at 60% 20%,
        color-mix(in srgb, #a414b4 30%, transparent),
        transparent 70%
      ),
      var(--background-color);
  }

  .zaya {
    font-family: "Satisfy", cursive;
  }

  .font-playball {
    font-family: "Playball", cursive;
  }

  .prose {
    font-family: "Lora", serif;
  }

  .category-btn {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    backdrop-filter: blur(10px);
  }

  .category-btn.active {
    background: linear-gradient(
      135deg,
      rgba(147, 51, 234, 0.2) 0%,
      rgba(219, 39, 119, 0.2) 100%
    );
    border-color: rgba(147, 51, 234, 0.3);
    box-shadow: 0 4px 20px rgba(147, 51, 234, 0.15);
  }

  .keyword-tag {
    position: relative;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-weight: 500;
    font-size: 0.875rem;
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(
      120deg,
      rgba(145, 71, 108, 0.4),
      rgba(164, 20, 180, 0.35)
    );
    color: var(--text-color);
  }

  .dark .keyword-tag {
    color: #f5f5f5;
    background: linear-gradient(
      to bottom right,
      rgba(145, 71, 108, 0.25),
      rgba(164, 20, 180, 0.2)
    );
    border-color: rgba(255, 255, 255, 0.08);
  }

  .keyword-tag::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
      to bottom right,
      rgba(145, 71, 108, 0.18),
      rgba(164, 20, 180, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .keyword-tag:hover::before {
    opacity: 1;
  }

  .product-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .product-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(147, 51, 234, 0.3);
  }

  .dark .product-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .category-card {
    transition: all 0.3s ease;
  }

  .category-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .dark .category-card:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  .background-blobs {
    position: fixed;
    inset: -20%;
    z-index: -1;
    background:
      radial-gradient(
        700px at 20% 30%,
        rgba(145, 71, 108, 0.35),
        transparent 60%
      ),
      radial-gradient(
        600px at 80% 70%,
        rgba(62, 151, 92, 0.3),
        transparent 65%
      ),
      radial-gradient(
        500px at 60% 20%,
        rgba(164, 20, 180, 0.28),
        transparent 70%
      );
    filter: blur(120px);
    animation: float 30s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -50px) rotate(120deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(240deg);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .category-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .post-listing {
      padding: 1.5rem;
    }

    .gradient-preview,
    .mode-toggle,
    .stats {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .products-showcase {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .zaya {
      font-size: 2.5rem;
    }
  }
</style>
