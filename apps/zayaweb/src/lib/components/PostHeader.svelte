<script lang="ts">
  import type { MarkdownPost } from "../../types";
  import { formatPublishedAt } from "$lib/utils/dates";
  import KeywordsDisplay from "./KeywordsDisplay.svelte";

  export let metadata: MarkdownPost["metadata"];
  export let slug: string = "";

  // Create a post object for keyword analysis
  $: postForKeywords = {
    slug,
    title: metadata.title,
    summary: metadata.summary,
    publishedAt: metadata.publishedAt,
    updatedAt: metadata.updatedAt
  };
</script>

<header class="p-4">
  <div class="w-full sm:w-3/5 mb-6">
    <div
      class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"
    >
      <!-- {#if metadata.youtubeId}
        <iframe
          title={metadata.title}
          src={`https://www.youtube.com/embed/${metadata.youtubeId}?origin=http://example.com`}
          allow="fullscreen"
        />
      {:else} -->
      <img
        src={metadata.imgUrl}
        alt={metadata.title}
        class="object-cover"
      />
      <!-- {/if} -->
    </div>
  </div>
  <div>
    <h1 class="text-4xl font-bold mb-4">
      {metadata.title}
    </h1>

    <!-- Keywords Display - Added here -->
    <div class="mb-4">
      <KeywordsDisplay
        post={postForKeywords}
        size="md"
        showThemes={true}
        maxKeywords={8}
      />
    </div>

    <div
      class="py-2 border-t dark:border-gray-700 inline-block"
    >
      <span>Published: </span>
      <time
        class="font-light"
        datetime={metadata.publishedAt}
      >
        {formatPublishedAt(metadata.publishedAt)}
      </time>
    </div>
  </div>
</header>
