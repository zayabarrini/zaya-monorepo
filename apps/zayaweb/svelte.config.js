// import adapter from "@sveltejs/adapter-auto";
import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from "mdsvex";
import rehypeMathjax from 'rehype-mathjax';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import { visit } from "unist-util-visit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** Custom rehype plugin to add missing alt attributes */

// import rehypeKatex from "rehype-katex";
// import rehypeKatexSvelte from "rehype-katex-svelte";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeKatex from "rehype-katex";
// import rehypeStringify from "rehype-stringify";

function rehypeAddAltText() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "img" && !node.properties.alt) {
        node.properties.alt = "Untitled content"; // Neutral alt text
      } 
    });
  };
}


/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", '.svx', ".md"],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx', '.md'],
      // remarkPlugins: [remarkParse, remarkMath, remarkRehype],
      // rehypePlugins: [rehypeKatex, rehypeStringify, rehypeKatexSvelte]
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeAddAltText,
        rehypeHighlight,
        [
          rehypeMathjax,
          {
            // Optional: Configure MathJax settings here
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
              processEscapes: true,
            },
          },
        ],
      ],
      smartypants: true,
    })
  ],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
			'$lib': 'src/lib',
			'$types': 'src/types'
		},
    prerender: {
      handleHttpError: ({ status, path, message }) => {
        if (status === 500) {
          console.warn(`Prerendering error at ${path}: ${message}`);
          return 'continue'; // Prevents the build from failing
        }
        if (path.includes('.md')) {
          console.warn(`Markdown file error at ${path}: ${message}`);
          return 'continue';
        }
      }
    }
  },
  compilerOptions: {
    enableSourcemap: false // Disable sourcemaps in production
  }
};

export default config;
