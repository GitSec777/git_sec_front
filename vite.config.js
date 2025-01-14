import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  host: true, // Add this to allow connections from outside
  plugins: [react()],
  server: {
    port: 3000,
  },
});
