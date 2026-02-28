// @ts-nocheck
import type { LayoutLoad } from "./$types";

// add this to root layout
// to prerender all our pages
// during build time
export const prerender = true;

// get url path whenever visiting a new page
export const load = ({ url }: Parameters<LayoutLoad>[0]) => {
  return {
    pathname: url.pathname
  };
};
