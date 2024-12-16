import { test, expect } from '@playwright/test';

test('UI test google', async ({ page }) => {
    await page.goto('https://google.com');
    expect(await page.title()).toBe('Google');
});
