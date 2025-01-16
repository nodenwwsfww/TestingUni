import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.fill('[data-test="username"]', username);
        await this.page.fill('[data-test="password"]', password);
        await this.page.click('[data-test="login-button"]');
    }

    async isLoggedIn() {
        return await this.page.isVisible('.app_logo');
    }
}
