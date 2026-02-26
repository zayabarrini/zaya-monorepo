import { page } from "$app/stores";
import { translateToEnglish } from "$lib/utils/translate";

// If you want to use load() and handle filtering server-side
export const prerender = false; // Disable prerendering

export async function load({ fetch, url }) {
  const query = url.searchParams.get("query") || "";
  // console.log("query", query);
  // const translatedQuery = await translateToEnglish(query);
  // console.log("translatedQuery", translatedQuery);
  const response = await fetch(
    `/api/filter?query=${query}`
  );
  const posts = await response.json();

  return { posts };
}
