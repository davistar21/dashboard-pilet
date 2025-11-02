import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Piral always outputs here
    emptyOutDir: true,
  },
  server: {
    watch: {
      ignored: [
        "**/dist/**",
        "**/.vite/**",
        "**/emulator/**", // Piral places tgz files here
      ],
    },
  },
});
