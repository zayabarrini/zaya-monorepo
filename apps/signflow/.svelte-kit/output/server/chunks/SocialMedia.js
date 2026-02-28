import { f as fallback, j as ensure_array_like, e as attr, b as bind_props } from "./vendor-svelte.js";
function formatPublishedAt(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
    // don't convert to client's local timezone
  });
}
function SocialMedia($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = $$props["title"];
    let url = $$props["url"];
    let image = $$props["image"];
    let floating = fallback(
      $$props["floating"],
      true
      // Enable floating button
    );
    let showIcons = fallback(
      $$props["showIcons"],
      true
      // Show icons in mini modal
    );
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const shareLinks = {
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
      // linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}&source=${encodedSource}`,
      // facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      // whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      // telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      // twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${encodedHashtags}&via=${encodedUsername}`
      // pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedDescription}`,
      // reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      // tumblr: `https://www.tumblr.com/share/link?url=${encodedUrl}&name=${encodedTitle}&description=${encodedDescription}`,
      // vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&comment=${encodedDescription}`,
      // email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%20${encodedUrl}`,
      // messenger: `https://www.facebook.com/dialog/send?app_id=${appId}&link=${encodedUrl}&redirect_uri=${encodedUrl}`,
      // instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Instagram doesn't have direct URL sharing
    };
    if (floating) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="floating-share svelte-d5sus5" aria-label="Share"><img src="/icons/share.svg" alt="Share" width="24" class="svelte-d5sus5"/></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!floating) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="social-icons svelte-d5sus5"><!--[-->`);
      const each_array_1 = ensure_array_like(Object.entries(shareLinks));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let [platform, link] = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", link)} target="_blank"${attr("title", "Share on " + platform)} class="svelte-d5sus5"><img${attr("src", "/icons/" + platform + ".svg")}${attr("alt", platform)} class="svelte-d5sus5"/></a>`);
      }
      $$renderer2.push(`<!--]--> <button class="copy-link svelte-d5sus5"><img src="/icons/copy.svg" alt="Copy Link" width="24" class="svelte-d5sus5"/></button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { title, url, image, floating, showIcons });
  });
}
export {
  SocialMedia as S,
  formatPublishedAt as f
};
