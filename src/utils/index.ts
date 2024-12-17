import { Page } from '@playwright/test';

export const login = async (page: Page, username: string, password: string) => {
    await page.goto('/');
    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');
};

export const addItemToCart = async (page: Page, itemSelector: string) => {
    await page.locator(itemSelector).click();
};

