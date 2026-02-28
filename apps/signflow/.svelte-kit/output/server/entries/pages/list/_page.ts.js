import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/vendor-svelte.js";
import "@sveltejs/kit/internal/server";
const prerender = false;
async function load({ fetch, url }) {
  const query = url.searchParams.get("query") || "";
  const response = await fetch(
    `/api/filter?query=${query}`
  );
  const posts = await response.json();
  return { posts };
}
export {
  load,
  prerender
};
