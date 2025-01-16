import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToInventory() {
        await this.page.goto('/inventory.html');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async addItemToCart(itemName: string) {
        const itemLocator = `[data-test="add-to-cart-${itemName}"]`;
        await this.page.waitForSelector(itemLocator, { state: 'attached' });
        await this.page.click(itemLocator);
    }
}
