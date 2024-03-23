const { test, expect } = require('@playwright/test');

const email = 'john@abv.bg';
const password = '123456';

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('Submit the form with correct data', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('form[id="create-form"]');
    await page.fill('#title', 'Murder on the Orient Express');
    await page.fill('#description', 'When a murder occurs on the train on which he\'s travelling, celebrated detective Hercule Poirot is recruited to solve the case.');
    await page.fill('#image', '..\\images\\book4.jpg');
    await page.selectOption('#type', 'Mistery');
    await page.click('#create-form input[type=submit]');
    await page.waitForURL('/catalog');
    expect(page.url()).toContain('/catalog');
});

test('Delete the added book', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
    ]);
    await page.waitForSelector('.otherBooks');
    const count = await page.getByRole('listitem').count();
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    await Promise.all([
        page.click('div.actions a:nth-child(2)'),
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            expect(dialog.type()).toContain('confirm');
            expect(dialog.message()).toContain('Are you sure?');
            await dialog.accept();
        }),
        page.waitForURL('/catalog')
    ]);
    const newCount = await page.getByRole('listitem').count();
    expect(newCount).toBe(count - 1);
});

test('Submit the form with blank title field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
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
    expect(page.url()).toContain('/create');
});

test('Submit the form with blank image URL field', async ({ page }) => {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
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
    expect(page.url()).toContain('/create');
});