import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.EgXnl0y6.js","_app/immutable/chunks/-0HexQLS.js","_app/immutable/chunks/ChVxeZXD.js","_app/immutable/chunks/DOiDhcps.js"];
export const stylesheets = ["_app/immutable/assets/vendor.DY7Szrf1.css","_app/immutable/assets/0.DH8-s0cv.css","_app/immutable/assets/app.CToo3IAm.css","_app/immutable/assets/style.CGw2Wy5F.css"];
export const fonts = [];
