// src/routes/grammar/chinese/chinese-character-stroke-search/+page.ts
// import type { PageLoad } from "../../../$types";
export const prerender = false;
export const ssr = false; // Disable server-side rendering for this page

// interface CharacterData {
//   character: string;
//   data: any;
//   strokeCount: number;
// }

// export const load: PageLoad = async ({ fetch }) => {
//   // Common characters to preload
//   const demoCharacters = ["你", "好", "中", "国", "爱"];
//   const characterData: Record<string, CharacterData> = {};

//   // Preload all demo characters
//   for (const char of demoCharacters) {
//     try {
//       const encodedChar = encodeURIComponent(char);
//       const response = await fetch(
//         `/hanzi-writer-data-master/data/${encodedChar}.json`
//       );

//       if (response.ok) {
//         const data = await response.json();
//         characterData[char] = {
//           character: char,
//           data: data,
//           strokeCount: data.strokes?.length || 0
//         };
//       }
//     } catch (e) {
//       console.error(`Failed to preload ${char}:`, e);
//     }
//   }

//   return {
//     preloadedCharacters: characterData
//   };
// };
