import { f as fallback, i as escape_html, b as bind_props, j as ensure_array_like } from "../../chunks/vendor-svelte.js";
import { P as PostListing } from "../../chunks/PostListing.js";
import { C as CarouselBootstrap, M as Main, P as Phototable, a as CarouselData, b as PostsContent, p as photoTableContentHeader, c as photoTableContent, d as PostsContent2, e as post } from "../../chunks/postsData.js";
import { P as Paralax, a as Paralax1, b as Paralax2 } from "../../chunks/parallaxData.js";
import "clsx";
/* empty css               */
/* empty css                 */
function ParallaxAux($$renderer) {
  $$renderer.push(`<div id="page8-section"><article class="content"><h1><a href="/posts">L'écriture</a></h1> <hr/> <p>Là où l'écriture devient instrument, elle se plie à
      une fonction. Là où elle se destine, elle s’aligne sur
      un but. Là où elle s’organise logistiquement, elle
      perd sa contingence. Pourtant, c’est bien dans le
      hors-sens, dans l’équivoque, dans l’accident
      signifiant que l’Autre de l’écriture surgit. Une
      écriture Autre ne s’écrit pas d’avance, elle se
      découvre dans son propre acte, dans le trou qu’elle
      creuse dans le symbolique.</p> <hr/> <div id="page8"><div class="window-tint"><div class="promo-text">Jouissance<strong><span>and the</span> Other</strong><a href="/posts" class="window-cta">Rapport</a></div></div></div></article></div>`);
}
function Testimonial($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let post2 = fallback($$props["post"], () => ({}), true);
    $$renderer2.push(`<section id="testimonial" class="svelte-1ir1i5o"><div class="container"><p><a href="/posts">${escape_html(post2.text)}</a></p> <p class="customer svelte-1ir1i5o">${escape_html(post2.author)}</p></div></section>`);
    bind_props($$props, { post: post2 });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<div class="homepage">`);
    CarouselBootstrap($$renderer2, { CarouselData });
    $$renderer2.push(`<!----> `);
    Paralax($$renderer2, { pages: Paralax1 });
    $$renderer2.push(`<!----> `);
    Main($$renderer2, { PostsContent });
    $$renderer2.push(`<!----> `);
    Phototable($$renderer2, {
      photoTableContent,
      title: photoTableContentHeader.title,
      content: photoTableContentHeader.content
    });
    $$renderer2.push(`<!----> `);
    Paralax($$renderer2, { pages: Paralax2 });
    $$renderer2.push(`<!----> `);
    Main($$renderer2, { PostsContent: PostsContent2 });
    $$renderer2.push(`<!----> `);
    ParallaxAux($$renderer2);
    $$renderer2.push(`<!----> `);
    Testimonial($$renderer2, { post });
    $$renderer2.push(`<!----> <div class="pt-24 max-w-5xl mx-auto"><section class="pb-6"><header class="inline-block border-b dark:border-gray-700 py-2 mx-4 mb-4"><h2 class="text-3xl font-semibold">Cinema, Psychoanalysis and Art Creation</h2></header> <section class="divide-y dark:divide-gray-700"><!--[-->`);
    const each_array = ensure_array_like(data.posts);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post2 = each_array[$$index];
      PostListing($$renderer2, { post: post2 });
    }
    $$renderer2.push(`<!--]--></section></section></div></div>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
