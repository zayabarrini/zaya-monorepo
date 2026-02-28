

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/grammar/chinese/chinese-character-stroke-search/_page.svelte.js')).default;
export const universal = {
  "prerender": false,
  "load": null,
  "ssr": false
};
export const universal_id = "src/routes/grammar/chinese/chinese-character-stroke-search/+page.ts";
export const imports = ["_app/immutable/nodes/25.sWEHa-K9.js","_app/immutable/chunks/-0HexQLS.js","_app/immutable/chunks/ChVxeZXD.js"];
export const stylesheets = ["_app/immutable/assets/vendor.DY7Szrf1.css","_app/immutable/assets/25.DwdKQDJH.css"];
export const fonts = [];
