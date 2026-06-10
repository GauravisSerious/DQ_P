import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/web_v2/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
