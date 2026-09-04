import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/server/**/*.test.ts"],
    env: {
      GREENOPS_DB_PATH: ":memory:",
    },
  },
});
