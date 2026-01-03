import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/',
  define: {
    '__BUILD_DATE__': JSON.stringify(new Date().toISOString().split('T')[0]),
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
});