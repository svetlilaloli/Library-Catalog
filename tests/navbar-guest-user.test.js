const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Verify All Books link is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    const allBooksLink = page.locator('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify Login button is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    const loginButton = page.locator('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test('Verify Register button is visible', async ({page}) => {
    await page.waitForSelector('nav.navbar')
    const registerButton = page.locator('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});
