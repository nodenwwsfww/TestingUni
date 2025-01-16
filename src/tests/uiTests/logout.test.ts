import { test, expect } from '@playwright/test';
import {LoginPage} from "../ui/pages/LoginPage";
import {MenuPage} from "../ui/pages/MenuPage";
import { UserFactory } from '../factories/UserFactory';

test('Verify User is Able to Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await loginPage.navigateTo();
    const user = UserFactory.createStandardUser();
    await loginPage.login(user.username, user.password);

    const loggedIn = await loginPage.isLoggedIn();
    expect(loggedIn).toBeTruthy();

    await menuPage.openMenu();
    const menuVisible = await menuPage.isMenuVisible();
    expect(menuVisible).toBeTruthy();
    await menuPage.logout();

    expect(await page.isVisible('[data-test="username"]')).toBeTruthy();
    expect(await page.isVisible('[data-test="password"]')).toBeTruthy();
    expect(await page.isVisible('[data-test="login-button"]')).toBeTruthy();
});
