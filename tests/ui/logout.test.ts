import { test, expect, Page } from '@playwright/test';
import {login} from "../../src/utils";

const logout = async (page: Page) => {
    await page.click('#react-burger-menu-btn');
    const menu = page.locator('#inventory_sidebar_link');
    await expect(menu).toBeVisible();
    await page.click('#logout_sidebar_link');
};

const verifyLogoutSuccess = async (page: Page) => {
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
};

test.describe('Logout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
    });

    test('Verify User is Able to Logout', async ({ page }) => {
        await logout(page);
        await verifyLogoutSuccess(page);
    });
});
