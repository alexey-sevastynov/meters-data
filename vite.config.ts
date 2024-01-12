import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()], // register the plugin

  define: {
    "import.meta.env": {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  },
});
