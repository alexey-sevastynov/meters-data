import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    base: `/meters-data/`,
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        chunkSizeWarningLimit: 1500,
    },
});
