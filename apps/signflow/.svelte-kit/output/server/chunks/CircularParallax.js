import { f as fallback, l as attr_style, i as escape_html, e as attr, b as bind_props, d as stringify } from "./vendor-svelte.js";
function CircularParallax($$renderer, $$props) {
  let title = fallback($$props["title"], "");
  let text = fallback($$props["text"], "");
  let href = fallback($$props["href"], "#");
  let backgroundImage = fallback($$props["backgroundImage"], "");
  $$renderer.push(`<section class="relative h-[600px] mt-20 rounded-[60%] bg-cover bg-fixed bg-center opacity-90 shadow-xl"${attr_style(`background-image: url(${stringify(backgroundImage)});`)}><div class="absolute inset-0 bg-black/50 rounded-[60%]"></div> <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6"><h2 class="text-4xl md:text-5xl font-bold leading-tight">${escape_html(title)}</h2> <p class="text-lg md:text-xl mt-2">${escape_html(text)}</p> <a${attr("href", href)} target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gradient-to-r from-blue-950 to-blue-1000 text-white font-semibold rounded-lg shadow-lg hover:from-purple-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">📖 Access <span class="font-bold">${escape_html(title)}</span></a></div></section>`);
  bind_props($$props, { title, text, href, backgroundImage });
}
export {
  CircularParallax as C
};
