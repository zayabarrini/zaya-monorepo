<script lang="ts">
  import "./prism-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import SocialMedia from "$lib/components/SocialMedia.svelte";
  import MoreLikeThis from "$lib/components/MoreLikeThis.svelte";
  import { afterUpdate } from "svelte";

  export let data: PageData;
  let urlBase = "zayabarrini.vercel.app";

  const {
    metadata,
    post: Post,
    slug,
    pathname,
    allPosts = []
  } = data;

  console.log(
    "All posts in component:",
    allPosts.length,
    allPosts
  );

  // Current post for recommendations (already in the correct format from load function)
  $: currentPostForRecommendation = {
    slug,
    title: metadata.title,
    summary: metadata.summary,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt
  };

  // Function to initialize Bootstrap components
  function initializeBootstrap() {
    console.log("Initializing Bootstrap components");
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) =>
        new bootstrap.Tooltip(tooltipTriggerEl)
    );
    document.querySelectorAll("table").forEach((table) => {
      table.classList.add(
        "table",
        "table-striped",
        "table-bordered",
        "bg-white",
        "dark:bg-gray-800",
        "text-black",
        "dark:text-white"
      );
    });

    // Example: Initialize popovers
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) =>
        new bootstrap.Popover(popoverTriggerEl)
    );
  }

  // Reinitialize Bootstrap after the component updates
  afterUpdate(() => {
    console.log("Reinitializing Bootstrap components");
    initializeBootstrap();
  });
</script>

<div class="pt-24 max-w-5xl mx-auto mainpage">
  <article>
    <PostHeader {metadata} {slug} />

    <div class="py-4 px-4 max-w-none">
      <SocialMedia
        title={metadata.title}
        url={`${urlBase}${pathname}`}
        image={metadata.imgUrl}
      />
      <hr class="my-6" />
      <div
        class="markdown-content prose prose-sm sm:prose-base md:prose-lg dark:prose-invert"
      >
        <CopyCodeInjector>
          <Post />
        </CopyCodeInjector>
      </div>
    </div>
  </article>

  <!-- Add More Like This section -->
  {#if allPosts && allPosts.length > 0}
    <MoreLikeThis
      currentPost={currentPostForRecommendation}
      {allPosts}
      limit={4}
      title="Related Posts"
    />
  {:else}
    <div class="mt-12 pt-8 border-t dark:border-gray-700">
      <p
        class="text-gray-500 dark:text-gray-400 text-center"
      >
        Loading recommendations...
      </p>
    </div>
  {/if}
</div>
