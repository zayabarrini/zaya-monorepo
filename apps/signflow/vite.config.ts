import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type PluginOption } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    sveltekit(),
    visualizer({
      filename: "bundle-analysis.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as unknown as PluginOption,
    VitePWA({
      registerType: "autoUpdate", // Ensures service workers update automatically
      workbox: {
        maximumFileSizeToCacheInBytes: 6000000 // 4 MB
      },
      manifest: {
        name: "Zaya Barrini", // Name of the PWA
        short_name: "Zaya", // Short name for home screen
        description:
          "Resources for Psychoanalysis in the context of cinema and art, exploring their interconnections through Lacanian theory.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "fullscreen",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/Topology18-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/Topology18-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide" // For desktop/laptop
          },
          {
            src: "/screenshots/desktop2.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide" // For desktop/laptop
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow" // For mobile
          },
          {
            src: "/screenshots/mobile2.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow" // For mobile
          }
        ],
        start_url: "/",
        protocol_handlers: [
          {
            protocol: "web+zaya",
            url: "/?url=%s"
          }
        ]
      },
      devOptions: {
        enabled: true, // Enables PWA in development mode
        type: "module",
        // selfDestroying: false, // Keeps the SW running in dev mode
        navigateFallback: "/"
      }
    })
  ],
  build: {
    cssCodeSplit: false,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks from node_modules
          if (id.includes("node_modules")) {
            // Group large libraries into separate chunks
            if (id.includes("swiper")) {
              return "vendor-swiper";
            }
            if (
              id.includes("three") ||
              id.includes("@types/three")
            ) {
              return "vendor-three";
            }
            if (
              id.includes("lucide") ||
              id.includes("@iconify")
            ) {
              return "vendor-icons";
            }
            if (
              id.includes("@sveltejs/kit") ||
              id.includes("svelte")
            ) {
              return "vendor-svelte";
            }
            if (
              id.includes("vite") ||
              id.includes("rollup")
            ) {
              return "vendor-build";
            }
            // Default vendor chunk for other node_modules
            return "vendor";
          }

          // Split your own large components/pages
          if (
            id.includes("src/routes") ||
            id.includes("src/lib")
          ) {
            // You can add specific route patterns here for more granular splitting
            if (
              id.includes("+page.svelte") ||
              id.includes("+layout.svelte")
            ) {
              const match = id.match(
                /\/([^\/]+)\+page\.svelte/
              );
              if (match && match[1]) {
                return `page-${match[1]}`;
              }
            }
          }
        }
      }
    },
    chunkSizeWarningLimit: 6000, // Increase warning limit to 1000KB
    target: "es2020" // Better for modern browsers
  },
  server: {
    port: 3000,
    hmr: {
      timeout: 120000
    }
  },
  optimizeDeps: {
    include: ["swiper/element/bundle"]
  }
});
