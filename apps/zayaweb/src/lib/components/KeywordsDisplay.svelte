<script lang="ts">
  import { KeywordGenerator } from "$lib/keywordGenerator";
  import type { PostForRecommendation } from "$types";
  import { onMount } from "svelte";

  export let post: PostForRecommendation;
  export let maxKeywords: number = 8;
  export let showThemes: boolean = true;
  export let size: "sm" | "md" | "lg" = "md";

  let keywords: string[] = [];
  let themes: string[] = [];
  let isLoading = true;
  let hasError = false;

  const keywordGenerator = new KeywordGenerator();

  onMount(() => {
    try {
      // Safety check
      if (!post || !post.title) {
        console.warn(
          "Invalid post provided to KeywordsDisplay:",
          post
        );
        hasError = true;
        isLoading = false;
        return;
      }

      // Extract keywords and themes
      keywords = keywordGenerator.generateDisplayKeywords(
        post,
        {
          maxKeywords: maxKeywords + 2, // Get a few extra to filter
          includeThemes: false // Don't include themes in keywords
        }
      );

      themes = showThemes
        ? keywordGenerator.extractThematicKeywords(post)
        : [];

      // Filter out keywords that are too similar to themes
      const themeWords = new Set(themes);
      keywords = keywords
        .filter((keyword) => {
          const lowerKeyword = keyword.toLowerCase();
          // Don't show keywords that are essentially the same as themes
          return (
            !themeWords.has(lowerKeyword) &&
            !isSimilarToTheme(lowerKeyword, themes)
          );
        })
        .slice(0, maxKeywords);

      isLoading = false;
    } catch (error) {
      console.error("Error extracting keywords:", error);
      hasError = true;
      isLoading = false;
    }
  });

  // Helper to check if a keyword is too similar to a theme
  function isSimilarToTheme(
    keyword: string,
    themes: string[]
  ): boolean {
    const themeWords = new Set([
      "psychoanalysis",
      "cinema",
      "art",
      "technology",
      "philosophy",
      "clinic",
      "topology",
      "gender",
      "dystopia",
      "international"
    ]);

    return (
      themeWords.has(keyword) ||
      themes.some(
        (theme) =>
          keyword.includes(theme) || theme.includes(keyword)
      )
    );
  }
</script>

<div class="keywords-display">
  {#if !isLoading && !hasError}
    <!-- Keywords -->
    {#if keywords.length > 0}
      <div class="keywords-section">
        <!-- <div
          class="keywords-label text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium"
        >
          Keywords:
        </div> -->
        <div
          class="flex flex-wrap gap-2 {size === 'sm'
            ? 'text-xs'
            : size === 'lg'
              ? 'text-sm'
              : 'text-xs'}"
        >
          {#each keywords as keyword}
            <span
              class="keyword-tag"
              title="Extracted keyword"
            >
              {keyword}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Themes -->
    {#if themes.length > 0}
      <div class="themes-section mt-2">
        <!-- <div
          class="themes-label text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium"
        >
          Themes:
        </div> -->
        <div
          class="flex flex-wrap gap-2 {size === 'sm'
            ? 'text-xs'
            : size === 'lg'
              ? 'text-sm'
              : 'text-xs'}"
        >
          {#each themes as theme}
            <span
              class="theme-tag bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full font-medium cursor-help"
              title="Detected theme"
            >
              {theme}
            </span>
          {/each}
        </div>
      </div>
    {/if}
  {:else if hasError}
    <div class="text-gray-400 text-xs">
      Unable to analyze content
    </div>
  {:else}
    <div class="text-gray-400 text-xs">
      Analyzing content...
    </div>
  {/if}
</div>

<style>
  .keyword-tag,
  .theme-tag {
    transition: all 0.2s ease;
  }

  .keyword-tag:hover {
    background-color: rgb(
      219 234 254
    ) !important; /* blue-200 */
    transform: translateY(-1px);
  }

  .theme-tag:hover {
    background-color: rgb(
      233 213 255
    ) !important; /* purple-200 */
    transform: translateY(-1px);
  }
</style>
