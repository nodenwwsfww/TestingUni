import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/ui',
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on',
        screenshot: 'only-on-failure',
    },
    timeout: 60000,
});
