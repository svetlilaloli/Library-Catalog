const { test, expect } = require('@playwright/test');

const server = 'http://localhost:3000'
const loginUrl = `${server}/login`;
const email = 'john@abv.bg';
const password = '123456';

test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
});

test('Login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${server}/catalog`);
});

test('Login with blank input fields', async ({ page }) => {
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    page.locator('a[href="/login"]');
    expect(page.url()).toBe(loginUrl);
});

test('Login with blank email field', async ({ page }) => {
    await page.fill('input[name="password"]', password)
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    page.locator('a[href="/login"]');
    expect(page.url()).toBe(loginUrl);
});

test('Login with blank password field', async ({ page }) => {
    await page.fill('input[name="email"]', email)
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    page.locator('a[href="/login"]');
    expect(page.url()).toBe(loginUrl);
});
