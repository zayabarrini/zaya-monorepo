import type {
  MarkdownPost,
  MarkdownPostMetadataAndSlug
} from "../../../types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  // use vite glob import to get all markdown posts
  const markdownPostModules = import.meta.glob(
    "/src/posts/*.md"
  ) as Record<string, () => Promise<MarkdownPost>>;

  const postPromises: Promise<MarkdownPostMetadataAndSlug>[] =
    [];

  for (const path in markdownPostModules) {
    // console.log("Loading post from path:", path); // Debug log

    const loadMarkdownPostModule =
      markdownPostModules[path];

    const loadPostSlugAndMetadata = async function () {
      // dynamically import markdown post
      const markdownPostModule =
        await loadMarkdownPostModule();

      // slug is everything after last / without the file extension
      const slug = path
        .slice(path.lastIndexOf("/") + 1)
        .replace(".md", "");

      return {
        slug,
        metadata: markdownPostModule.metadata
      };
    };

    postPromises.push(loadPostSlugAndMetadata());
  }

  // load all posts concurrently
  const posts = await Promise.all(postPromises);

  // // sort by publication/update date (descending/most recent first)
  // const sortedPosts = posts.sort((post1, post2) => {
  //   // Get date for post1 - use updatedAt if available, otherwise publishedAt
  //   const date1 =
  //     post2.metadata.updatedAt ||
  //     post2.metadata.publishedAt;
  //   // Get date for post2 - use updatedAt if available, otherwise publishedAt
  //   const date2 =
  //     post1.metadata.updatedAt ||
  //     post1.metadata.publishedAt;

  //   return (
  //     new Date(date1).getTime() - new Date(date2).getTime()
  //   );
  // });

  // console.log("Server POSTSSS:");
  // for (const post of sortedPosts) {
  //   console.log(
  //     post.metadata.publishedAt || post.metadata.updatedAt
  //   );
  // }

  const randomPosts = posts.sort(() => Math.random() - 0.5);

  return json(posts);
};
