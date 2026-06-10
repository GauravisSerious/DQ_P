import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/DQ_P/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
