import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToCart() {
        await this.page.click('.shopping_cart_link');
        await this.page.waitForSelector('.cart_item', { state: 'attached' });
    }

    async getCartItemsCount() {
        const badge = this.page.locator('.shopping_cart_badge');
        const isVisible = await badge.isVisible();
        if (isVisible) {
            const textContent = await badge.textContent();
            return parseInt(textContent || '0', 10);
        }
        return 0;
    }

    async removeItemFromCart(itemLocator: string) {
        await this.page.click(itemLocator);
        await this.page.waitForSelector(itemLocator, { state: 'detached' });
    }
}
