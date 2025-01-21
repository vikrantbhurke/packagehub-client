import { defineConfig } from "vite";
import "dotenv/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    VitePWA({
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon-180x180.png",
        "maskable-icon-512x512.png",
        "pwa-64x64.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],
      registerType: "prompt",
      manifest: {
        id: process.env.VITE_APP_NAME,
        name: process.env.VITE_APP_NAME,
        short_name: process.env.VITE_APP_NAME,
        description: "Read, Rate And Review Software Packages.",
        start_url: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#050505",
        theme_color: "#050505",
        icons: [
          {
            src: "/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "apple-touch-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.mjs",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
