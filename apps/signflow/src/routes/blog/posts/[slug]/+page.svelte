<script lang="ts">
  import "./prism-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import SocialMedia from "$lib/components/SocialMedia.svelte";

  export let data: PageData;
  let urlBase = "zayabarrini.vercel.app";

  const { metadata, post: Post, pathname } = data;
</script>

<div class="pt-24 max-w-5xl mx-auto mainpage">
  <article>
    <PostHeader {metadata} />

    <div class="py-4 px-4 max-w-none">
      <SocialMedia
        title={metadata.title}
        url={`${urlBase}${pathname}`}
        image={metadata.imgUrl}
      />
      <hr />
      <div class="markdown-content">
        <CopyCodeInjector>
          <Post />
        </CopyCodeInjector>
      </div>
    </div>
  </article>
</div>

<!-- # prose dark:prose-invert -->
