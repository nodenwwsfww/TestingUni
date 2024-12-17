import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        exclude: ['tests/api.test.ts', 'tests/ui.test.ts'],
        coverage: {
            provider: 'istanbul',
            reportsDirectory: './coverage',
            reporter: ['text', 'html'],
            all: true,
            include: ['src/**/*.ts'],
            exclude: ['tests/**', 'node_modules/**'],
        },
    },
});
