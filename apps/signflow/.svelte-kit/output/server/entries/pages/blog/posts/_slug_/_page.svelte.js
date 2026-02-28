import { g as slot, e as attr, i as escape_html, b as bind_props } from "../../../../../chunks/vendor-svelte.js";
import { f as formatPublishedAt, S as SocialMedia } from "../../../../../chunks/SocialMedia.js";
function CopyCodeInjector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]-->`);
  });
}
function PostHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let metadata = $$props["metadata"];
    $$renderer2.push(`<header class="p-4"><div class="w-full sm:w-3/5 mb-6"><div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden"><img${attr("src", metadata.imgUrl)}${attr("alt", metadata.title)} class="object-cover"/></div></div> <div><h1 class="text-4xl font-bold mb-4">${escape_html(metadata.title)}</h1> <div class="py-2 border-t dark:border-gray-700 inline-block"><span>Published:</span> <time class="font-light"${attr("datetime", metadata.publishedAt)}>${escape_html(formatPublishedAt(metadata.publishedAt))}</time></div></div></header>`);
    bind_props($$props, { metadata });
  });
}
function _page($$renderer, $$props) {
  let data = $$props["data"];
  let urlBase = "zayabarrini.vercel.app";
  const { metadata, post: Post, pathname } = data;
  $$renderer.push(`<div class="pt-24 max-w-5xl mx-auto mainpage"><article>`);
  PostHeader($$renderer, { metadata });
  $$renderer.push(`<!----> <div class="py-4 px-4 max-w-none">`);
  SocialMedia($$renderer, {
    title: metadata.title,
    url: `${urlBase}${pathname}`,
    image: metadata.imgUrl
  });
  $$renderer.push(`<!----> <hr/> <div class="markdown-content">`);
  CopyCodeInjector($$renderer, {
    children: ($$renderer2) => {
      Post($$renderer2, {});
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></div></article></div>`);
  bind_props($$props, { data });
}
export {
  _page as default
};
