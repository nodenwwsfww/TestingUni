import { test, expect, Page } from '@playwright/test';
import {addItemToCart, login} from "../../src/utils";

const verifyCartBadge = async (page: Page, expectedCount: number) => {
    const cartBadge = page.locator('.shopping_cart_badge');
    await cartBadge.waitFor({ state: 'visible' });
    await expect(cartBadge).toHaveText(expectedCount.toString());
};

const verifyCartItemCount = async (page: Page, expectedCount: number) => {
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(expectedCount);
};

test.describe('Cart Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
    });

    test('Verify Adding Item to Cart', async ({ page }) => {
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
        await verifyCartBadge(page, 1);
        await page.click('.shopping_cart_link');
        await verifyCartItemCount(page, 1);
        const cartItems = page.locator('.cart_item');
        await expect(cartItems.first()).toContainText('Sauce Labs Backpack');
    });

    test('Verify Adding Multiple Items to Cart', async ({ page }) => {
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-bike-light"]');
        await verifyCartBadge(page, 2);
        await page.click('.shopping_cart_link');
        await verifyCartItemCount(page, 2);

        const firstItem = page.locator('.cart_item').nth(0).locator('.inventory_item_name');
        const secondItem = page.locator('.cart_item').nth(1).locator('.inventory_item_name');
        await expect(firstItem).toHaveText('Sauce Labs Backpack');
        await expect(secondItem).toHaveText('Sauce Labs Bike Light');
    });

    test('Verify Removing Item from Cart', async ({ page }) => {
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        await removeButton.waitFor({ state: 'visible' });
        await removeButton.click();
        await verifyCartItemCount(page, 0);
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });
});
