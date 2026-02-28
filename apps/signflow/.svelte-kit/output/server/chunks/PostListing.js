import { e as attr, i as escape_html, b as bind_props } from "./vendor-svelte.js";
import { f as formatPublishedAt, S as SocialMedia } from "./SocialMedia.js";
function PostListing($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let href, youtubeHref;
    let post = $$props["post"];
    let urlBase = "zayabarrini.vercel.app";
    href = `/blog/posts/${post.slug}`;
    youtubeHref = post.metadata.youtubeId ? `https://youtu.be/${post.metadata.youtubeId}` : "";
    $$renderer2.push(`<article class="p-4 sm:flex sm:space-x-4 post-listing"><a${attr("href", href)} class="block sm:w-80"><div class="aspect-w-10 aspect-h-9 rounded-lg overflow-hidden"><img${attr("src", post.metadata.imgUrl)}${attr("alt", post.metadata.title)} class="object-cover"/></div></a> <div class="flex-1 py-2 sm:py-0 post-listing-content"><a${attr("href", href)}><h3 class="text-xl font-medium mb-1">${escape_html(post.metadata.title)}</h3> <p class="font-light text-gray-60 dark:text-gray-300 date"><time${attr("datetime", post.metadata.publishedAt)}>${escape_html(formatPublishedAt(post.metadata.publishedAt))}</time></p> <p class="py-2 font-medium">${escape_html(post.metadata.summary)}</p></a> <div class="flex space-x-4 text-gray-600 dark:text-gray-300 font-light underline"><a${attr("href", href)} class="readmore">Read More</a> `);
    if (post.metadata.youtubeId) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", youtubeHref)} class="readmore">Watch Video</a>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    SocialMedia($$renderer2, {
      title: post.metadata.title,
      url: `${urlBase}${href}`,
      image: post.metadata.imgUrl
    });
    $$renderer2.push(`<!----></div></article>`);
    bind_props($$props, { post });
  });
}
export {
  PostListing as P
};
