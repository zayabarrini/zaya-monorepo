// @ts-nocheck
import type { MarkdownPostMetadataAndSlug } from "../types";
import type { PageLoad } from "./$types";

export const load = async ({ fetch }: Parameters<PageLoad>[0]) => {
  // get posts from api with sveltekit special fetch
  const response = await fetch("/api/home");

  // get posts from response
  const posts: MarkdownPostMetadataAndSlug[] =
    await response.json();

  return {
    posts
  };
};
