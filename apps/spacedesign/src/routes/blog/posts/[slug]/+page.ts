import type {
  MarkdownPost,
  MarkdownPostMetadataAndSlug,
  PostForRecommendation
} from "$types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const slug = params.slug;

  try {
    const markdownPost: MarkdownPost = await import(
      `../../../../posts/${slug}.md`
    );

    // Fetch all posts from your existing API endpoint
    const response = await fetch("/api/posts");
    const allPosts: MarkdownPostMetadataAndSlug[] =
      await response.json();

    console.log("Posts loaded from API:", allPosts.length);

    // Transform to recommendation format
    const postsForRecommendations: PostForRecommendation[] =
      allPosts.map((post) => ({
        slug: post.slug,
        title: post.metadata.title,
        summary: post.metadata.summary,
        publishedAt: post.metadata.publishedAt,
        updatedAt: post.metadata.updatedAt
      }));

    return {
      metadata: markdownPost.metadata,
      post: markdownPost.default,
      slug,
      allPosts: postsForRecommendations
    };
  } catch (error) {
    console.error("Error loading post:", error);
    throw new Error(`Post not found: ${slug}`);
  }
};
