import { test, expect } from '@playwright/test';
import { InventoryPage } from '../ui/pages/InventoryPage';
import { CartPage } from '../ui/pages/CartPage';

test.describe('Cart Tests', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await page.goto('/');
        await page.fill('[data-test="username"]', 'standard_user');
        await page.fill('[data-test="password"]', 'secret_sauce');
        await page.click('[data-test="login-button"]');
    });

    test('Verify Adding Item to Cart', async () => {
        await inventoryPage.navigateToInventory();
        await inventoryPage.addItemToCart('sauce-labs-backpack');
        const cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(1);
    });

    test('Verify Adding Multiple Items to Cart', async () => {
        await inventoryPage.navigateToInventory();
        await inventoryPage.addItemToCart('sauce-labs-backpack');
        await inventoryPage.addItemToCart('sauce-labs-bike-light');
        const cartItemsCount = await cartPage.getCartItemsCount();
        expect(cartItemsCount).toBe(2);
    });
});
