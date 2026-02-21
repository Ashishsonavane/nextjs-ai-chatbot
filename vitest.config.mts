import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [codspeedPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    benchmark: {
      include: ["benchmarks/**/*.bench.ts"],
    },
  },
});
