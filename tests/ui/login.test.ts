import { test, expect, Page } from '@playwright/test';
import {login} from "../../src/utils";

const verifyLoginSuccess = async (page: Page) => {
    const appLogo = page.locator('.app_logo');
    await appLogo.waitFor({ state: 'visible' });
    await expect(appLogo).toHaveText('Swag Labs');
};

const verifyLoginFailure = async (page: Page, errorMessageText: string) => {
    const errorMessage = page.locator('h3[data-test="error"]');
    await errorMessage.waitFor({ state: 'visible' });
    await expect(errorMessage).toHaveText(errorMessageText);
};

test.describe('Login Tests', () => {
    test('Verify User Login', async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
        await verifyLoginSuccess(page);
    });

    test('Verify Non-Existing User Is not Able to Login', async ({ page }) => {
        await login(page, 'standard_user_123', 'secret_sauce_123');
        await verifyLoginFailure(page, 'Epic sadface: Username and password do not match any user in this service');
    });
});
