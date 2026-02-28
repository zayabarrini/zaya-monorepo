<script lang="ts">
  // import HomeHeader from "$lib/components/HomeHeader.svelte";
  import PostListing from "$lib/components/PostListing.svelte";
  import { writable } from "svelte/store";

  import "../style.css";

  import type { PageData } from "./$types";

  export let data: PageData;

  let searchQuery = writable("");
  // let filteredPosts = writable(data.posts);

  // Filtered posts as a writable store
  const filteredPosts = writable(data.posts);

  // Update filteredPosts when searchQuery changes
  searchQuery.subscribe(async (query) => {
    if (!query.trim()) {
      // If the search input is empty, reset to all posts
      filteredPosts.set(data.posts);
    } else {
      // Otherwise, filter based on the search query
      const newFilteredPosts = data.posts.filter((post) =>
        post.metadata.title
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      filteredPosts.set(newFilteredPosts);
    }
  });
</script>

<!-- <div class="pt-24 max-w-5xl mx-auto">
  <HomeHeader />
</div> -->

<div class="pt-24 max-w-5xl mx-auto mainpage">
  <section class="pb-6">
    <header
      class="inline-block border-b dark:border-gray-700
      py-2 mx-4 mb-4"
    >
      <h2 class="text-3xl font-semibold art">
        Cinema, Psychoanalysis and Art Creation
      </h2>
    </header>

    <!-- Search Input -->
    <div class="mb-4 mx-4">
      <input
        type="text"
        placeholder="Search..."
        class="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
        bind:value={$searchQuery}
      />
    </div>

    <!-- Filtered Posts -->
    <section class="divide-y dark:divide-gray-700">
      {#each $filteredPosts as post}
        <PostListing {post} />
      {/each}
      {#if $filteredPosts.length === 0}
        <div
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M12 3v2m0 14v2m8-10h2m-18 0H2m16.364 6.364l1.414-1.414M4.222 4.222l1.414 1.414"
            />
          </svg>

          <h2
            class="mt-4 text-2xl font-semibold text-gray-600"
          >
            No posts found
          </h2>

          <p class="mt-2 text-gray-500">
            Try searching with different keywords.
          </p>
        </div>
      {/if}
    </section>
  </section>
</div>
