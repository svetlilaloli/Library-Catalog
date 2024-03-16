const { test, expect } = require('@playwright/test');

const server = 'http://localhost:3000';
const email = 'john@abv.bg';
const password = '123456';

test.beforeEach(async ({ page }) => {
    await page.goto(`${server}/login`);
});

test('Verify that the Logout button is visible', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${server}/catalog`)
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});