import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.BVb_XcmR.js","_app/immutable/chunks/-0HexQLS.js","_app/immutable/chunks/ChVxeZXD.js","_app/immutable/chunks/Bhym2ohr.js","_app/immutable/chunks/B_XlkYFP.js","_app/immutable/chunks/DdUw2Phi.js","_app/immutable/chunks/CsSW8tJi.js"];
export const stylesheets = ["_app/immutable/assets/vendor.DY7Szrf1.css","_app/immutable/assets/SocialMedia.Bb8TiI_P.css","_app/immutable/assets/postsData.DCF-KTye.css","_app/immutable/assets/app.CToo3IAm.css","_app/immutable/assets/style.CGw2Wy5F.css"];
export const fonts = [];
