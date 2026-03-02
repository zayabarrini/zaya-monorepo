<!-- GrammarRoute.svelte -->
<script>
  import IconLink from "../../lib/components/IconLink.svelte";
  import { fade } from "svelte/transition";

  // Define the grammar routes with icons and descriptions
  const grammarRoutes = [
    {
      title: "Arabic Verb Conjugation Table",
      href: "/grammar/arabic/conjugation",
      description:
        "Comprehensive verb conjugation tool with tenses and forms",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Arabic Noun & Adjective Conjugation",
      href: "/grammar/arabic/nouns-adjectives",
      description:
        "Declension tables for nouns and adjectives",
      icon: "🔤",
      category: "Grammar"
    },
    {
      title: "Arabic Pronominal Composition",
      href: "/grammar/arabic/pronominal-composition",
      description:
        "Learn how pronouns combine with verbs and prepositions",
      icon: "🔗",
      category: "Grammar"
    },
    {
      title: "Arabic Syntax Analysis",
      href: "/grammar/arabic/sentences",
      description:
        "Color-coded sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Arabic Spelling",
      href: "/grammar/arabic/spelling",
      description:
        "Spelling rules and common mistakes in Arabic",
      icon: "✍️",
      category: "Syntax"
    },
    {
      title: "Arabic Spelling Words",
      href: "/grammar/arabic/spelling-words",
      description:
        "Spelling rules and common mistakes in Arabic",
      icon: "✍️",
      category: "Syntax"
    },
    {
      title: "Arabic Science",
      href: "/grammar/arabic/science",
      description:
        "Logic, Math, Physics terminology and grammar",
      icon: "🔬",
      category: "Syntax"
    },
    {
      title: "Arabic Advanced Sentences Syntax Analysis",
      href: "/grammar/arabic/advanced-sentences",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Arabic Grammatical Endings",
      href: "/grammar/arabic/endings",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Arabic Vocabulary",
      href: "/grammar/arabic/vocabulary",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Arabic Songs Lyrics",
      href: "/grammar/arabic/songs",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Arabic Doubt Words",
      href: "/grammar/arabic/doubt",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Russian Noun Declensions",
      href: "/grammar/russian/russian-declensions",
      description:
        "Color-coded tables for Russian noun declensions",
      icon: "📚",
      category: "Grammar"
    },
    {
      title: "Russian Pronominal Composition",
      href: "/grammar/russian/pronominal-composition",
      description:
        "Color-coded tables for Russian pronoun composition",
      icon: "📚",
      category: "Grammar"
    },
    {
      title: "Russian Sentence Builder",
      href: "/grammar/russian",
      description:
        "Interactive tool to construct Russian sentences",
      icon: "🏗️",
      category: "Syntax"
    },
    {
      title: "Russian Science Builder",
      href: "/grammar/russian/science",
      description:
        "Interactive tool to construct Russian Science",
      icon: "🏗️",
      category: "Syntax"
    },
    {
      title: "Russian Songs Lyrics",
      href: "/grammar/russian/songs",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Hindi Sentence Builder",
      href: "/grammar/hindi",
      description:
        "Interactive tool to construct Hindi sentences",
      icon: "🏗️",
      category: "Syntax"
    },
    {
      title: "Hindi Pronominal Composition",
      href: "/grammar/hindi/pronominal-composition",
      description:
        "Comprehensive Hindi verb conjugation tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Hindi Songs Lyrics",
      href: "/grammar/hindi/songs",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Hindi Spelling Words",
      href: "/grammar/hindi/spelling",
      description:
        "Color-coded advanced sentence structure analysis",
      icon: "🎨",
      category: "Syntax"
    },
    {
      title: "Japanese Pronominal Composition",
      href: "/grammar/japanese/pronominal-composition",
      description:
        "Comprehensive Japanese pronoun composition tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Japanese Transliteration",
      href: "/grammar/japanese/japanese-transliteration",
      description:
        "Interactive Japanese transliteration tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Chinese Verb Conjugation Table",
      href: "/grammar/chinese/chinese-syntax",
      description:
        "Comprehensive Chinese verb conjugation tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Chinese Improved Syntax Analyzer",
      href: "/grammar/chinese/chinese-syntax-improved",
      description: "Enhanced Chinese syntax analysis tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Chinese Character Stroke Order",
      href: "/grammar/chinese/chinese-character-stroke-order",
      description:
        "Interactive Chinese character stroke order visualization",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Search Chinese Character Stroke Order",
      href: "/grammar/chinese/chinese-character-stroke-search",
      description:
        "Search Chinese character stroke order visualization",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Chinese Transliteration - Doubt Version",
      href: "/grammar/chinese/chinese-transliteration",
      description:
        "Enhanced Chinese transliteration tool with doubt annotations",
      icon: "📘",
      category: "Grammar"
    },
     {
      title: "Chinese Transliteration - Downton Abbey Version",
      href: "/grammar/chinese/chinese-transliteration-api",
      description:
        "Enhanced Chinese transliteration tool with doubt annotations",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Word Lists",
      href: "/words",
      description: "Enhanced Word Lists tool",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Word Frequency",
      href: "/frequency",
      description: "Enhanced Word Frequency Lists",
      icon: "📘",
      category: "Grammar"
    },
    {
      title: "Sentence Lists",
      href: "/sentences",
      description: "Enhanced Sentence Lists tool",
      icon: "📘",
      category: "Grammar"
    }
  ];

  const mainRoutes = [
    {
      title: "Psychoanalysis",
      href: "/list?query=Psychoanalysis",
      icon: "🧠",
      variant: "ghost"
    },
    {
      title: "Cards",
      href: "/posts",
      icon: "📝",
      variant: "ghost"
    },
    {
      title: "Languages",
      href: "/list?query=Languages",
      icon: "🌐",
      variant: "ghost"
    }
  ];
</script>

<div
  class="container min-h-screen margin-top-header mainpage"
>
  <!-- Header -->
  <header class="contents max-w-6xl mx-auto mb-12" in:fade>
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
    >
      <!-- Logo -->
      <a
        href="/"
        class="group flex items-center gap-3 no-underline self-start"
      >
        <div class="relative">
          <div
            class="w-12 h-12 flex items-center justify-center group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          >
            <span class="text-white font-bold text-lg"
              >Z</span
            >
          </div>
        </div>
        <div class="flex flex-col">
          <span
            class="zaya notranslate text-2xl font-bold text-gray-900 tracking-tight"
          >
            Zaya Barrini
          </span>
          <span
            class="text-gray-600 text-sm font-medium mt-1"
          >
            Language & Psychoanalysis
          </span>
        </div>
      </a>

      <!-- Main Navigation -->
      <nav class="flex flex-wrap gap-3">
        {#each mainRoutes as route}
          <IconLink
            href={route.href}
            class="px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:shadow-md"
          >
            <span class="mr-2">{route.icon}</span>
            {route.title}
          </IconLink>
        {/each}
      </nav>
    </div>

    <!-- Hero Section -->
    <div
      class="rounded-2xl p-8 dark:text-white shadow-xl mb-12 hero"
    >
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          Language Grammar Toolkit
        </h1>
        <p class="text-xl mb-6">
          Interactive tools and comprehensive references for
          mastering grammar, syntax, and linguistic analysis
        </p>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 bg-green-400 rounded-full animate-pulse"
            ></div>
            <span class="text-sm font-medium"
              >All tools are interactive</span
            >
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 bg-yellow-400 rounded-full"
            ></div>
            <span class="text-sm font-medium"
              >Color-coded analysis</span
            >
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-6xl mx-auto">
    <!-- Grammar Routes Grid -->
    <section class="mb-16" in:fade={{ delay: 100 }}>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Grammar Tools
          </h2>
          <p class="text-gray-600">
            Interactive tables and analysis tools for Arabic
            grammar
          </p>
        </div>
        <div class="hidden md:block">
          <span
            class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
          >
            {grammarRoutes.length} Tools Available
          </span>
        </div>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {#each grammarRoutes as route, i}
          <a
            href={route.href}
            class="group relative rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 overflow-hidden"
            in:fade={{ delay: 200 + i * 100 }}
          >
            <!-- Decorative accent -->
            <div
              class="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                >
                  {route.icon}
                </div>
              </div>

              <div class="flex-1">
                <div
                  class="flex items-center justify-between mb-2"
                >
                  <h3
                    class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    {route.title}
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>

                <p class="text-gray-600 mb-4">
                  {route.description}
                </p>

                <div
                  class="flex items-center justify-between"
                >
                  <span
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {route.category}
                  </span>
                  <span
                    class="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    Explore tool →
                  </span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Quick Access -->
    <section class="mb-12" in:fade={{ delay: 600 }}>
      <h3 class="text-2xl font-bold text-gray-900 mb-6">
        Quick Access
      </h3>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {#each grammarRoutes as route}
          <a
            href={route.href}
            class="group border border-black-700 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex items-center gap-3"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center text-lg"
            >
              {route.icon}
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600"
              >
                {route.title.split(" ").slice(-2).join(" ")}
              </div>
              <div class="text-xs text-gray-500 truncate">
                {route.category}
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- Footer Note -->
    <div
      class="text-center py-8 border-t border-gray-200"
      in:fade={{ delay: 800 }}
    >
      <p class="text-gray-500 text-sm">
        Need help with any of these tools?
        <a
          href="/"
          class="text-blue-600 hover:text-blue-800 font-medium ml-1"
        >
          Contact for support →
        </a>
      </p>
    </div>
  </main>
</div>

<style>
  .zaya {
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    letter-spacing: -0.025em;
  }

  .min-h-screen {
    margin-top: 6rem;
  }

  .group {
    border-radius: 30px;
    box-shadow: 0 4px 8px black;
  }

  /* Smooth transitions */
  * {
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }

  .hero {
    color: black;
  }
</style>
