import { test, expect, Page } from '@playwright/test';
import {addItemToCart, login} from "../../src/utils";


const fillCheckoutForm = async (page: Page, firstName: string, lastName: string, postalCode: string) => {
    await page.fill('#first-name', firstName);
    await page.fill('#last-name', lastName);
    await page.fill('#postal-code', postalCode);
    await page.click('#continue');
};

const verifyOrderCompletion = async (page: Page, expectedTotal: string) => {
    const summaryTotal = page.locator('.summary_total_label');
    await summaryTotal.waitFor({ state: 'visible' });
    await expect(summaryTotal).toHaveText(new RegExp(`Total:\\s+\\${expectedTotal}`));
    await page.click('#finish');
    const completeHeader = page.locator('.complete-header');
    await completeHeader.waitFor({ state: 'visible' });
    await expect(completeHeader).toHaveText('Thank you for your order!');
};

test.describe('Checkout Tests', () => {
    test.beforeEach(async ({ page }) => {
        await login(page, 'standard_user', 'secret_sauce');
    });

    test('Verify Checkout Process', async ({ page }) => {
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await fillCheckoutForm(page, 'John', 'Dou', '12345');
        await verifyOrderCompletion(page, '$32.39');
    });

    test('Verify Checkout Process for Multiple Items', async ({ page }) => {
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-backpack"]');
        await addItemToCart(page, '[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('.shopping_cart_link');
        await page.click('#checkout');
        await fillCheckoutForm(page, 'John', 'Dou', '12345');
        await verifyOrderCompletion(page, '$43.18');
    });
});
