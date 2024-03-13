const {test, expect} = require('@playwright/test');

const server = 'http://localhost:3000';
const registerUrl = `${server}/register`;
const email = 'john@abv.bg';
const password = '123456';

test.beforeEach(async ({ page }) => {
    await page.goto(registerUrl);
});

test('Register with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', `john${Date.now()}@abv.bg`);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-pass"]', password);
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(`${server}/catalog`);
});

test('Register with blank input fields', async ({ page }) => {
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with blank email field', async ({ page }) => {
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-pass"]', password);
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with blank password field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with blank confirm-password field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});

test('Register with not matching passwords', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-pass"]', `${password}78`);
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerUrl);
});