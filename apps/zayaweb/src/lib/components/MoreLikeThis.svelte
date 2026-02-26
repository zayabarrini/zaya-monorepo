<script lang="ts">
  import { onMount } from "svelte";
  import { RecommendationGenerator } from "$lib/recommendationGenerator";
  import type { PostForRecommendation } from "$types";

  export let currentPost: PostForRecommendation;
  export let allPosts: PostForRecommendation[] = [];
  export let limit: number = 4;
  export let title: string = "More like this";

  let similarPosts: PostForRecommendation[] = [];
  let isLoading: boolean = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      console.log(
        "MoreLikeThis - currentPost:",
        currentPost
      );
      console.log(
        "MoreLikeThis - allPosts count:",
        allPosts.length
      );
      console.log(
        "MoreLikeThis - first few allPosts:",
        allPosts.slice(0, 3)
      );

      if (allPosts.length > 0 && currentPost) {
        const recommender = new RecommendationGenerator(
          allPosts
        );
        console.log("MoreLikeThis - recommender created");

        const recommendations =
          recommender.getRecommendations(currentPost.slug, {
            limit
          });
        console.log(
          "MoreLikeThis - recommendations:",
          recommendations
        );

        similarPosts = recommendations.map(
          (rec) => rec.post
        );
        console.log(
          "MoreLikeThis - similarPosts:",
          similarPosts.length,
          similarPosts
        );
      } else {
        console.log("MoreLikeThis - missing data:", {
          hasAllPosts: allPosts.length > 0,
          hasCurrentPost: !!currentPost
        });
      }
    } catch (err) {
      console.error(
        "Error generating recommendations:",
        err
      );
      error = "Failed to load recommendations";
    } finally {
      isLoading = false;
      console.log("MoreLikeThis - isLoading set to false");
    }
  });
</script>

{#if !isLoading}
  {#if similarPosts.length > 0}
    <section
      class="more-like-this mt-12 pt-8 border-t dark:border-gray-700"
    >
      <h2 class="text-2xl font-bold mb-6 dark:text-white">
        {title}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each similarPosts as post}
          <article
            class="similar-post bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <a
              href="/blog/posts/{post.slug}"
              class="block hover:no-underline group"
            >
              <h3
                class="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-white line-clamp-2"
              >
                {post.title}
              </h3>

              {#if post.summary}
                <p
                  class="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2"
                >
                  {post.summary}
                </p>
              {/if}

              <div
                class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400"
              >
                <span>
                  {new Date(
                    post.publishedAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </span>
                {#if post.slug.includes("-")}
                  <span
                    class="category-tag bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded capitalize"
                  >
                    {post.slug.split("-")[0]}
                  </span>
                {/if}
              </div>
            </a>
          </article>
        {/each}
      </div>
    </section>
  {:else if error}
    <div class="mt-12 pt-8 border-t dark:border-gray-700">
      <p
        class="text-gray-500 dark:text-gray-400 text-center"
      >
        {error}
      </p>
    </div>
  {:else}
    <div class="mt-12 pt-8 border-t dark:border-gray-700">
      <p
        class="text-gray-500 dark:text-gray-400 text-center"
      >
        No similar posts found.
      </p>
    </div>
  {/if}
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .similar-post {
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .similar-post:hover {
    transform: translateY(-2px);
  }
</style>
