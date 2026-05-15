import { defineConfig } from "vite";

const production = process.env.NODE_ENV === "production";

export default defineConfig({
  root: "src",
  base: production ? "/shows/" : "/development",
  publicDir: "../public",
  plugins: [],
  server: { port: 5173 },
  build: {
    outDir: "../dist",
  },
});
