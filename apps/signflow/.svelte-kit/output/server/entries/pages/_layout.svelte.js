import { w as writable, f as fallback, a as attr_class, c as clsx, b as bind_props, s as store_get, u as unsubscribe_stores, d as stringify, e as attr, h as head, g as slot } from "../../chunks/vendor-svelte.js";
import { I as IconLink } from "../../chunks/IconLink.js";
import "clsx";
import "../../chunks/vendor.js";
/* empty css               */
/* empty css                 */
const darkmode = writable(false);
function MoonIcon($$renderer, $$props) {
  let klass = fallback($$props["class"], "");
  $$renderer.push(`<svg${attr_class(clsx(klass))} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M3.722 3.193L3.226 4.528c-.12.323-.375.578-.698.698L1.193 5.722c-.257.096-.257.46 0 .555l1.335.496c.323.12.578.375.698.698l.496 1.335c.096.257.46.257.555 0l.496-1.335c.12-.323.375-.578.698-.698l1.335-.496c.257-.096.257-.46 0-.555L5.472 5.226c-.323-.12-.578-.375-.698-.698L4.278 3.193C4.182 2.936 3.818 2.936 3.722 3.193zM20.916 12.994c.603.006 1.091.516 1.008 1.113-.232 1.662-.986 3.267-2.263 4.553-3.13 3.12-8.19 3.12-11.32 0-3.12-3.13-3.12-8.19 0-11.32 1.285-1.277 2.891-2.032 4.553-2.263C13.49 4.993 14 5.481 14.006 6.084c.017 1.765.7 3.521 2.044 4.866C17.394 12.294 19.151 12.977 20.916 12.994z"></path></svg>`);
  bind_props($$props, { class: klass });
}
function SunIcon($$renderer, $$props) {
  let klass = fallback($$props["class"], "");
  $$renderer.push(`<svg${attr_class(clsx(klass))} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M 12 0 C 11.4 0 11 0.4 11 1 L 11 2 C 11 2.6 11.4 3 12 3 C 12.6 3 13 2.6 13 2 L 13 1 C 13 0.4 12.6 0 12 0 z M 4.1992188 3.1992188 C 3.9492188 3.1992187 3.7 3.3 3.5 3.5 C 3.1 3.9 3.1 4.5003906 3.5 4.9003906 L 4.1992188 5.5996094 C 4.5992187 5.9996094 5.1996094 5.9996094 5.5996094 5.5996094 C 5.9996094 5.1996094 5.9996094 4.5992188 5.5996094 4.1992188 L 4.9003906 3.5 C 4.7003906 3.3 4.4492188 3.1992188 4.1992188 3.1992188 z M 19.800781 3.1992188 C 19.550781 3.1992188 19.299609 3.3 19.099609 3.5 L 18.400391 4.1992188 C 18.000391 4.5992187 18.000391 5.1996094 18.400391 5.5996094 C 18.800391 5.9996094 19.400781 5.9996094 19.800781 5.5996094 L 20.5 4.9003906 C 20.9 4.5003906 20.9 3.9 20.5 3.5 C 20.3 3.3 20.050781 3.1992188 19.800781 3.1992188 z M 12 5 A 7 7 0 0 0 5 12 A 7 7 0 0 0 12 19 A 7 7 0 0 0 19 12 A 7 7 0 0 0 12 5 z M 1 11 C 0.4 11 0 11.4 0 12 C 0 12.6 0.4 13 1 13 L 2 13 C 2.6 13 3 12.6 3 12 C 3 11.4 2.6 11 2 11 L 1 11 z M 22 11 C 21.4 11 21 11.4 21 12 C 21 12.6 21.4 13 22 13 L 23 13 C 23.6 13 24 12.6 24 12 C 24 11.4 23.6 11 23 11 L 22 11 z M 4.9003906 18.099609 C 4.6503906 18.099609 4.3992188 18.200391 4.1992188 18.400391 L 3.5 19.099609 C 3.1 19.499609 3.1 20.1 3.5 20.5 C 3.9 20.9 4.5003906 20.9 4.9003906 20.5 L 5.5996094 19.800781 C 5.9996094 19.400781 5.9996094 18.800391 5.5996094 18.400391 C 5.3996094 18.200391 5.1503906 18.099609 4.9003906 18.099609 z M 19.099609 18.099609 C 18.849609 18.099609 18.600391 18.200391 18.400391 18.400391 C 18.000391 18.800391 18.000391 19.400781 18.400391 19.800781 L 19.099609 20.5 C 19.499609 20.9 20.1 20.9 20.5 20.5 C 20.9 20.1 20.9 19.499609 20.5 19.099609 L 19.800781 18.400391 C 19.600781 18.200391 19.349609 18.099609 19.099609 18.099609 z M 12 21 C 11.4 21 11 21.4 11 22 L 11 23 C 11 23.6 11.4 24 12 24 C 12.6 24 13 23.6 13 23 L 13 22 C 13 21.4 12.6 21 12 21 z"></path></svg>`);
  bind_props($$props, { class: klass });
}
function DarkmodeButton($$renderer) {
  var $$store_subs;
  $$renderer.push(`<button class="p-2 text-purple-800 dark:text-yellow-200">`);
  if (store_get($$store_subs ??= {}, "$darkmode", darkmode)) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div>`);
    SunIcon($$renderer, { class: "w-8 h-8 fill-current" });
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div>`);
    MoonIcon($$renderer, { class: "w-8 h-8 fill-current" });
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></button>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function GithubIcon($$renderer, $$props) {
  let klass = fallback($$props["class"], "");
  $$renderer.push(`<svg${attr_class(clsx(klass))} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z"></path></svg>`);
  bind_props($$props, { class: klass });
}
function ZayaIcon($$renderer, $$props) {
  let klass = fallback($$props["class"], "");
  $$renderer.push(`<div${attr_class(clsx(klass))}></div>`);
  bind_props($$props, { class: klass });
}
function YoutubeIcon($$renderer, $$props) {
  let klass = fallback($$props["class"], "");
  $$renderer.push(`<svg${attr_class(clsx(klass))} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,14.598V9.402c0-0.385,0.417-0.625,0.75-0.433l4.5,2.598c0.333,0.192,0.333,0.674,0,0.866l-4.5,2.598 C10.417,15.224,10,14.983,10,14.598z"></path></svg>`);
  bind_props($$props, { class: klass });
}
function SearchButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchQuery = "";
    $$renderer2.push(`<button class="search-icon svelte-1jlqbwg" aria-label="Open search modal"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="currentColor"></path><path d="M23.7071 22.2929L18.7071 17.2929C18.3166 16.9024 17.6834 16.9024 17.2929 17.2929C16.9024 17.6834 16.9024 18.3166 17.2929 18.7071L22.2929 23.7071C22.6834 24.0976 23.3166 24.0976 23.7071 23.7071C24.0976 23.3166 24.0976 22.6834 23.7071 22.2929Z" fill="currentColor"></path></svg></button> <div${attr_class(`modal ${stringify("")}`, "svelte-1jlqbwg")}${attr("aria-hidden", true)}><div class="modal-content svelte-1jlqbwg"><button class="close-modal svelte-1jlqbwg" aria-label="Close search modal">×</button> <form><input class="search-input svelte-1jlqbwg" type="text"${attr("value", searchQuery)} placeholder="Search..." aria-label="Search input"/></form></div></div>`);
  });
}
function MainHeader($$renderer) {
  $$renderer.push(`<header class="fixed inset-x-0 bg-white top-0 z-20 border-b bg-white dark:border-gray-800 dark:bg-dark-background"><nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4"><a href="/"><span class="zaya notranslate">Zaya Barrini</span></a> <div class="hidden sm:flex items-center space-x-4">`);
  IconLink($$renderer, {
    href: "/list?query=Psychoanalysis",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Psychoanalysis`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/posts",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Posts`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/list?query=Languages",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Languages`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/list?query=Practice",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Practice`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/grammar",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Grammar`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/list?query=CVs",
    children: ($$renderer2) => {
      $$renderer2.push(`<span class="zaya notranslate">Zaya</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  DarkmodeButton($$renderer);
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "https://www.youtube.com/@zayabarrini",
    target: "_blank",
    children: ($$renderer2) => {
      YoutubeIcon($$renderer2, { class: "h-8 w-8 fill-current" });
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "https://github.com/tallesbarrini",
    target: "_blank",
    children: ($$renderer2) => {
      GithubIcon($$renderer2, { class: "h-8 w-8 fill-current" });
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div> `);
  SearchButton($$renderer);
  $$renderer.push(`<!----> <button class="sm:hidden p-2">☰</button></nav> <aside${attr_class(`fixed inset-y-0 left-0 w-full bg-white dark:bg-dark-backgroud p-4 shadow-lg sidebar ${"closed"}`, "svelte-1rrec0")}><div class="flex justify-between items-center"><a href="/">`);
  ZayaIcon($$renderer, { class: "h-8 w-20" });
  $$renderer.push(`<!----></a> <button class="p-2 text-xl">✕</button></div> <nav class="mt-4 flex flex-col space-y-4">`);
  IconLink($$renderer, {
    href: "/list?query=Psychoanalysis",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Psychoanalysis`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!---->`);
  IconLink($$renderer, {
    href: "/posts",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Posts`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/courses",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Courses`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/list?query=Practice",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Practice`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/cinema",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Cinema`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "/list?query=CVs",
    children: ($$renderer2) => {
      $$renderer2.push(`<span class="zaya notranslate">Zaya</span>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  DarkmodeButton($$renderer);
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "https://www.youtube.com/@zayabarrini",
    target: "_blank",
    children: ($$renderer2) => {
      YoutubeIcon($$renderer2, { class: "h-8 w-8 fill-current" });
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  IconLink($$renderer, {
    href: "https://github.com/tallesbarrini",
    target: "_blank",
    children: ($$renderer2) => {
      GithubIcon($$renderer2, { class: "h-8 w-8 fill-current" });
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></nav></aside></header>`);
}
function ThemeInitializer($$renderer, $$props) {
  head("1w9jrm5", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>
    Zaya Barrini Psychoanalysis, Creation and Cinema Studio
  </title>`);
    });
    $$renderer2.push(`<script>
    window.prefersDarkmode = false;

    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)")
          .matches)
    ) {
      window.prefersDarkmode = true;
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  <\/script>`);
    $$renderer2.push(`<!---->`);
  });
  $$renderer.push(`<!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]-->`);
}
function Footer($$renderer) {
  $$renderer.push(`<footer class="bg-gray-900 text-white py-10 px-5 md:px-20"><div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"><div><h4 class="text-lg font-semibold mb-3">Main</h4> <ul class="space-y-2 text-gray-300"><li><a href="/list?query=CVs" class="hover:text-white">Zaya</a></li> <li><a href="/list?query=Cinema" class="hover:text-white">Cinema, Writing, Performance, Audiovisual</a></li> <li><a href="/list?query=School" class="hover:text-white">School of Cinema, Psychoanalysis and Art</a></li> <li><a href="/list?query=Psychoanalysis" class="hover:text-white">Psychoanalysis</a></li></ul></div> <div><h4 class="text-lg font-semibold mb-3">Resources</h4> <ul class="space-y-2 text-gray-300"><li><a href="/list?query=Study" class="hover:text-white">Study Groups</a></li> <li><a href="/list?query=Affiliates" class="hover:text-white">Affiliates</a></li> <li><a href="https://drive.google.com/drive/folders/1RVQs75Obb9ZXaLrUQwucCaye87eqvoHr?usp=drive_link" class="hover:text-white">Ebooks (Google Drive)</a></li> <li><a href="/list?query=Supervision" class="hover:text-white">Supervision</a></li> <li><a href="/courses" class="hover:text-white">Courses</a></li></ul></div> <div><h4 class="text-lg font-semibold mb-3">Community</h4> <ul class="space-y-2 text-gray-300"><li><a href="https://chat.whatsapp.com/JGlGyJQirVK2nshslvTsen" class="hover:text-white">WhatsApp Zaya Barrini</a></li> <li><a href="/list?query=Figures" class="hover:text-white">Figures in Analysis</a></li> <li><a href="/list?query=Dystopias" class="hover:text-white">Black Mirror</a></li> <li><a href="/list?query=Not-all" class="hover:text-white">Not-All, Transsexualities and Psychoanalysis</a></li> <li><a href="/list?query=Enlightenment" class="hover:text-white">Enlightenment</a></li> <li><a href="/list?query=Psychosis" class="hover:text-white">Psychoses</a></li> <li><a href="/list?query=Concepts" class="hover:text-white">Concepts</a></li> <li><a href="/list?query=Concepts" class="hover:text-white">Dev, Business, IA</a></li> <li><a href="/list?query=Language" class="hover:text-white">International Psychoanalysis, Languages</a></li> <li><a href="/list?query=Semiotics" class="hover:text-white">Semiotics</a></li> <li><a href="/list?query=Art" class="hover:text-white">Art</a></li> <li><a href="/list?query=Linktree" class="hover:text-white">Linktree</a></li></ul></div></div> <div class="border-t border-gray-700 mt-8 pt-2 text-center text-gray-400 text-sm"><p>© 2025 Zaya Barrini. All rights reserved.</p></div></footer>`);
}
function TranslateButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isVisible = false;
    $$renderer2.push(`<div id="translate-icon" aria-label="Translate" role="button" tabindex="0" class="svelte-10w8h3u"><img src="/icons/translate.svg" alt="Translate" class="svelte-10w8h3u"/></div> <div id="google_translate_element"${attr_class("svelte-10w8h3u", void 0, { "visible": isVisible })}></div>`);
  });
}
function InstallButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ReadAloudSmartLanguageDetection($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div${attr_class(`read-aloud-button ${stringify("")}`, "svelte-1c10vhx")}${attr("aria-label", "Turn on Read Aloud")} role="button" tabindex="0"${attr("title", "Click to activate")}><div class="translate-icon floating-share svelte-1c10vhx" id="translate-icon" aria-label="Read Aloud" role="button" tabindex="0"><img src="/icons/voice.png" alt="Read Aloud" class="svelte-1c10vhx"/></div></div>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    data.pathname;
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"><\/script>`);
      $$renderer3.push(` <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700%7CRoboto%7CJosefin+Sans:100,300,400,500" rel="stylesheet" type="text/css"/> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&amp;display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&amp;family=Satisfy&amp;display=swap" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css?family=Playball|Sedgwick+Ave+Display|Zilla+Slab+Highlight" rel="stylesheet"/> <link href="https://fonts.googleapis.com/css?family=Indie+Flower|Lora|Pacifico|Playfair+Display|Roboto|Roboto+Condensed|Slabo+27px" rel="stylesheet"/> `);
      $$renderer3.push(`<script src="https://code.jquery.com/jquery-3.6.0.min.js"><\/script>`);
      $$renderer3.push(` `);
      $$renderer3.push(`<script src="https://unpkg.com/scrollreveal/dist/scrollreveal.min.js"><\/script>`);
      $$renderer3.push(` `);
      $$renderer3.push(`<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"><\/script>`);
      $$renderer3.push(` `);
      $$renderer3.push(`<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"><\/script>`);
      $$renderer3.push(`  `);
      $$renderer3.push(`<script>
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        // ScrollReveal initialization
        if (typeof ScrollReveal !== "undefined") {
          window.sr = ScrollReveal();

          const revealConfigs = {
            ".navbar": { duration: 2000 },
            ".showcase-left": {
              duration: 2000,
              origin: "top",
              distance: "10em"
            },
            ".showcase-right": {
              duration: 2000,
              origin: "right",
              distance: "10em"
            },
            ".showcase-btn": {
              duration: 2000,
              delay: 2000,
              origin: "bottom"
            },
            "#testimonial div": {
              duration: 2000,
              origin: "bottom"
            },
            ".info-left": {
              duration: 2000,
              origin: "left",
              distance: "10em",
              viewFactor: 0.2
            },
            ".info-right": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".info-down": {
              duration: 2000,
              origin: "down",
              distance: "10em"
            },
            ".section": {
              duration: 2000,
              origin: "down",
              distance: "10em"
            },
            "#contact form": {
              duration: 2000,
              origin: "left",
              distance: "10em"
            },
            ".header-collection": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".left": {
              duration: 2000,
              origin: "left",
              distance: "10em",
              viewFactor: 0.2
            },
            ".center": {
              duration: 2000,
              origin: "bottom",
              distance: "10em",
              viewFactor: 0.2
            },
            ".right": {
              duration: 2000,
              origin: "right",
              distance: "10em",
              viewFactor: 0.2
            },
            ".footer": {
              duration: 2000,
              origin: "left",
              distance: "10em"
            }
          };

          Object.entries(revealConfigs).forEach(
            ([selector, config]) => {
              window.sr.reveal(selector, config);
            }
          );
        }

        // Smooth scrolling
        if (typeof $ !== "undefined") {
          $('a[href*="#"]:not([href="#"])').click(
            function (e) {
              if (
                location.pathname.replace(/^\\//, "") ===
                  this.pathname.replace(/^\\//, "") &&
                location.hostname === this.hostname
              ) {
                const target =
                  $(this.hash) ||
                  $(\`[name=\${this.hash.slice(1)}]\`);
                if (target.length) {
                  $("html, body").animate(
                    { scrollTop: target.offset().top },
                    1000
                  );
                  e.preventDefault();
                }
              }
            }
          );
        }
      }
    );
  <\/script>`);
    });
    ThemeInitializer($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        {
          $$renderer3.push(`<div><main>`);
          MainHeader($$renderer3);
          $$renderer3.push(`<!----> `);
          TranslateButton($$renderer3);
          $$renderer3.push(`<!----> `);
          InstallButton($$renderer3);
          $$renderer3.push(`<!----> `);
          ReadAloudSmartLanguageDetection($$renderer3);
          $$renderer3.push(`<!---->  <!--[-->`);
          slot($$renderer3, $$props, "default", {});
          $$renderer3.push(`<!--]--> `);
          Footer($$renderer3);
          $$renderer3.push(`<!----></main></div>`);
        }
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    bind_props($$props, { data });
  });
}
export {
  _layout as default
};
