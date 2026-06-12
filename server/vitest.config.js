import path from "path";
import { defineConfig } from "vitest/config";
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        },
    },
    test: {
        globals: true,
        include: ["src/**/*.test.ts"],
        setupFiles: ["./src/test/setup.ts"],
        env: {
            NODE_ENV: "development",
            MONGO_URI: "mongodb://localhost:27017/test",
            ACCESS_TOKEN_SECRET: "test-access-token-secret-at-least-32-chars",
            REFRESH_TOKEN_SECRET: "test-refresh-token-secret-at-least-32-chars",
            FRONTEND_URI: "http://localhost:5173",
            ACCESS_TOKEN_EXPIRY: "15m",
            REFRESH_TOKEN_EXPIRY: "7d",
        },
    },
});
//# sourceMappingURL=vitest.config.js.map