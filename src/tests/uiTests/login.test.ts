import { test, expect } from '@playwright/test';
import { LoginPage } from '../ui/pages/LoginPage';
import { UserFactory } from '../factories/UserFactory';

test('Verify User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    const user = UserFactory.createStandardUser();
    await loginPage.login(user.username, user.password);
    const loggedIn = await loginPage.isLoggedIn();
    expect(loggedIn).toBeTruthy();
});

test('Verify Non-Existing User Is not Able to Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    const user = UserFactory.createInvalidUser();
    await loginPage.login(user.username, user.password);
    const errorMessage = await page.locator('[data-test="error"]');
    expect(await errorMessage.textContent()).toContain(
        'Epic sadface: Username and password do not match any user in this service'
    );
});
