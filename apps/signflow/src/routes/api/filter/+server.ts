import type {
  MarkdownPost,
  MarkdownPostMetadataAndSlug
} from "../../../types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  const query =
    url.searchParams.get("query")?.toLowerCase() || ""; // Get query param

  // console.log("Filtering posts by:", query);

  const markdownPostModules = import.meta.glob(
    "/src/posts/*.md"
  ) as Record<string, () => Promise<MarkdownPost>>;

  const postPromises: Promise<MarkdownPostMetadataAndSlug>[] =
    [];

  for (const path in markdownPostModules) {
    const transformedPath = path
      .replace("/src/posts/", "")
      .replace(".md", "")
      .toLowerCase();

    if (transformedPath.includes(query)) {
      const loadMarkdownPostModule =
        markdownPostModules[path];

      const loadPostSlugAndMetadata = async () => {
        const markdownPostModule =
          await loadMarkdownPostModule();
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
  }

  const filteredPosts = await Promise.all(postPromises);

  const randomPosts = filteredPosts.sort(
    () => Math.random() - 0.5
  );

  return json(randomPosts);
};
