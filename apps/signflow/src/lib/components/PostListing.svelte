<script lang="ts">
  import type { MarkdownPostMetadataAndSlug } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";
  import SocialMedia from "./SocialMedia.svelte";

  export let post: MarkdownPostMetadataAndSlug;

  // $: href = `/cards/posts/${post.slug}`;
  $: href = `/blog/posts/${post.slug}`;
  $: youtubeHref = post.metadata.youtubeId
    ? `https://youtu.be/${post.metadata.youtubeId}`
    : "";
  let urlBase = "zayabarrini.vercel.app";
</script>

<article class="p-4 sm:flex sm:space-x-4 post-listing">
  <a {href} class="block sm:w-80">
    <div
      class="aspect-w-10 aspect-h-9 rounded-lg overflow-hidden"
    >
      <img
        src={post.metadata.imgUrl}
        alt={post.metadata.title}
        class="object-cover"
      />
    </div>
  </a>

  <div class="flex-1 py-2 sm:py-0 post-listing-content">
    <a {href}>
      <h3 class="text-xl font-medium mb-1">
        {post.metadata.title}
      </h3>
      <p
        class="font-light text-gray-60 dark:text-gray-300 date"
      >
        <!-- <span>Published: </span> -->
        <time datetime={post.metadata.publishedAt}>
          {formatPublishedAt(post.metadata.publishedAt)}
        </time>
      </p>

      <p class="py-2 font-medium">
        {post.metadata.summary}
      </p>
    </a>

    <div
      class="flex space-x-4 text-gray-600 dark:text-gray-300 font-light
          underline"
    >
      <a {href} class="readmore">Read More</a>
      {#if post.metadata.youtubeId}
        <a href={youtubeHref} class="readmore"
          >Watch Video</a
        >
      {/if}
    </div>
    <SocialMedia
      title={post.metadata.title}
      url={`${urlBase}${href}`}
      image={post.metadata.imgUrl}
    />
  </div>
</article>
