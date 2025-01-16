import { Page } from '@playwright/test';

export class MenuPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openMenu() {
        await this.page.click('#react-burger-menu-btn');
    }

    async logout() {
        await this.page.click('#logout_sidebar_link');
    }

    async isMenuVisible() {
        return await this.page.isVisible('.bm-menu');
    }
}
