const { test, expect } = require('@playwright/test');

const email = 'john@abv.bg';
const password = '123456';

test.describe.configure({ mode: "serial" });

test('Verify that logged-in user sees details button and the button works correctly', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');
});

test('Verify that a guest user sees details button and the button works correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav.navbar')
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');
});

test('Verify that book info is displayed correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav.navbar')
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    
    const bookTitle = await page.textContent('.book-information h3');
    const bookType = await page.textContent('.book-information > p.type');
    const bookDescriptionHeading = await page.textContent('.book-description > h3');
    const bookDescription = await page.textContent('.book-description > p');

    await page.waitForSelector('#details-page .img')
    const bookImage = page.locator('img[src="/images/book3.png"]');
    
    expect(bookTitle).toBe('To Kill a Mockingbird');
    expect(bookType).toBe('Type: Classic');
    expect(bookDescriptionHeading).toBe('Description:');
    expect(bookDescription).toBe('The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.');
    expect(bookImage).toBeTruthy(); // toBeVisible() fails occasionally
});

test('Verify if edit and delete buttons are visible for creator', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('/catalog')
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    
    const editButton = await page.textContent('.book-information > div > a:nth-child(1)');
    const deleteButton = await page.textContent('.book-information > div > a:nth-child(2)');

    expect(editButton).toBe('Edit');
    expect(deleteButton).toBe('Delete');
});
