import type {
  MarkdownPostMetadataAndSlug,
  PostForRecommendation
} from "$types";

export function transformMarkdownPostToRecommendationPost(
  post: MarkdownPostMetadataAndSlug
): PostForRecommendation {
  return {
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    publishedAt: post.metadata.publishedAt,
    updatedAt: post.metadata.updatedAt
  };
}

// This function is no longer needed since we're using the API
export async function loadAllPostsForRecommendations(): Promise<
  PostForRecommendation[]
> {
  try {
    const response = await fetch("/api/posts");
    const posts: MarkdownPostMetadataAndSlug[] =
      await response.json();

    return posts.map((post) => ({
      slug: post.slug,
      title: post.metadata.title,
      summary: post.metadata.summary,
      publishedAt: post.metadata.publishedAt,
      updatedAt: post.metadata.updatedAt
    }));
  } catch (error) {
    console.error("Error loading posts from API:", error);
    return [];
  }
}
