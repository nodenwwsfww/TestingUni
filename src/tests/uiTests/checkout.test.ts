import { test, expect } from '@playwright/test';
import { InventoryPage } from '../ui/pages/InventoryPage';
import { CartPage } from '../ui/pages/CartPage';

test.describe('Checkout Tests', () => {
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

    test('Verify Checkout Process', async ({ page }) => {
        await inventoryPage.navigateToInventory();
        await inventoryPage.addItemToCart('sauce-labs-backpack');
        await cartPage.navigateToCart();
        await page.click('[data-test="checkout"]');
        await page.fill('#first-name', 'John');
        await page.fill('#last-name', 'Doe');
        await page.fill('#postal-code', '12345');
        await page.click('#continue');
        const totalLabel = await page.locator('.summary_total_label').textContent();
        expect(totalLabel).toContain('Total: $32.39');
        await page.click('#finish');
        const completeMessage = await page.locator('.complete-header').textContent();
        expect(completeMessage).toBe('Thank you for your order!');
    });
});
