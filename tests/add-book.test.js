import { test, expect } from '@playwright/test';

const server = 'http://localhost:3000';
const email = 'john@abv.bg';
const password = '123456';

test.beforeEach(async ({ page }) => {
    await page.goto(`${server}/login`);
});

test('Submit the form with correct data', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${server}/catalog`)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', `Murder on the Orient Express ${Date.now()}`);
    await page.fill('#description', 'When a murder occurs on the train on which he\'s travelling, celebrated detective Hercule Poirot is recruited to solve the case.');
    await page.fill('#image', '..\\images\\book4.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('#create-form input[type=submit]');
    await page.waitForURL(`${server}/catalog`);
    expect(page.url()).toBe(`${server}/catalog`);
});

test('Submit the form with blank title field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${server}/catalog`)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'When a murder occurs on the train on which he\'s travelling, celebrated detective Hercule Poirot is recruited to solve the case.');
    await page.fill('#image', '..\\images\\book4.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(`${server}/create`);
});

test('Submit the form with blank image URL field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(`${server}/catalog`)
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Murder on the Orient Express');
    await page.fill('#description', 'When a murder occurs on the train on which he\'s travelling, celebrated detective Hercule Poirot is recruited to solve the case.');
    await page.selectOption('#type', 'Mistery');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe(`${server}/create`);
});