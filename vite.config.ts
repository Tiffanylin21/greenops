import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src/client",
  plugins: [react()],
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
  },
  server: {
    // Pins the HMR client to "localhost" explicitly — under WSL2 (with a VPN
    // or non-default networking mode) the dev server can resolve its own
    // address to something other than localhost, which breaks the WebSocket
    // upgrade HMR relies on even though plain HTTP still works.
    hmr: { host: "localhost" },
    proxy: {
      // Anchored to a trailing slash so this only matches real backend
      // routes (/api/readings, /api/daily-pattern) — a plain "/api" prefix
      // would also match the client's own "/api.ts" module and proxy it to
      // the Fastify server, which has no such route.
      "^/api/": "http://localhost:3000",
    },
  },
});
