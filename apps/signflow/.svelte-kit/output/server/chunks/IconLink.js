import { f as fallback, e as attr, g as slot, b as bind_props } from "./vendor-svelte.js";
function IconLink($$renderer, $$props) {
  let href = $$props["href"];
  let target = fallback($$props["target"], "_self");
  $$renderer.push(`<a class="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"${attr("href", href)}${attr("target", target)}><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></a>`);
  bind_props($$props, { href, target });
}
export {
  IconLink as I
};
