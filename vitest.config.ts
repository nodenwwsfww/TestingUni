import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        exclude: ['tests/api.test.ts', 'tests/ui.test.ts'],
    },
});
