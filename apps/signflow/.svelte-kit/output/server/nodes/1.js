

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DSXFFMnv.js","_app/immutable/chunks/-0HexQLS.js","_app/immutable/chunks/ChVxeZXD.js"];
export const stylesheets = ["_app/immutable/assets/vendor.DY7Szrf1.css"];
export const fonts = [];
