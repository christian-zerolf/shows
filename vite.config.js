import { defineConfig } from "vite";

export default defineConfig({
  root: "/",
  publicDir: "public",
  plugins: [],
  server: { port: 5173 },
  build: {
    outDir: "dist",
  },
});
