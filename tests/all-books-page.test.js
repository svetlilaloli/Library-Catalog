const { test, expect } = require('@playwright/test');

const email = 'john@abv.bg';
const password = '123456';

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('Verify that all books are displayed', async ({page}) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

// test('Verify that no books are displayed', async ({ page }) => {
//     await page.fill('input[name="email"]', email);
//     await page.fill('input[name="password"]', password);
//     await Promise.all([
//         page.click('input[type="submit"]'),
//         page.waitForURL('/catalog')
//     ]);
//     await page.waitForSelector('.dashboard');
//     const noBooksMessage = await page.textContent('.no-books');
//     expect(noBooksMessage).toBe('No books in database!');
// });