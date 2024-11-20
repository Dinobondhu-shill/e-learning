import path from "path";
import { fileURLToPath } from "url"; // Needed to use __dirname equivalent in ESM
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// __dirname equivalent in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
