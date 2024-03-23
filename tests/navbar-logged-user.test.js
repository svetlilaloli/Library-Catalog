const { test, expect } = require('@playwright/test');

const email = 'john@abv.bg';
const password = '123456';

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('Verify All Books link is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    const allBooksLink = page.locator('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify My Books button is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    const myBooksButton = page.locator('a[href="/profile"]');
    const isButtonVisible = await myBooksButton.isVisible();
    expect(isButtonVisible).toBe(true);
});

test('Verify Add Book button is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    const addBookButton = page.locator('a[href="/create"]');
    const isButtonVisible = await addBookButton.isVisible();
    expect(isButtonVisible).toBe(true);
});

test('Verify user email address is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    const userEmail = page.locator('#user > span');
    const isUserEmailVisible = await userEmail.isVisible();
    expect(isUserEmailVisible).toBe(true);
});
