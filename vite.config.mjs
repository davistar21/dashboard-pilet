import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Explicitly target ESNext to help resolve ESM compatibility issues
      target: "esnext",
      loader: "jsx",
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // You can add this to force the output target to ESNext if needed
    target: "esnext",
  },
  server: {
    watch: {
      ignored: ["**/dist/**", "**/.vite/**", "**/emulator/**"],
    },
  },
});
