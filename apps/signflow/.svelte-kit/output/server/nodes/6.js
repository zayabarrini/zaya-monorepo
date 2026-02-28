

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/debug/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.3eXU1dfQ.js","_app/immutable/chunks/-0HexQLS.js","_app/immutable/chunks/ChVxeZXD.js"];
export const stylesheets = [];
export const fonts = [];
