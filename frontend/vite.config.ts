import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Dev: '/', Build: '/Web_FE_Advanced/'
  base: command === "serve" ? "/" : "/Web_FE_Advanced/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  // tùy chọn: mở trên LAN nếu cần
  // server: { host: true, port: 5173 },
}));
