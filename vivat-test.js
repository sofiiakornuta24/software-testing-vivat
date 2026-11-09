const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
const browser = await chromium.launch({ headless: false });

try {
const page = await browser.newPage();

// Перевірка 1: відкриття головної сторінки
await page.goto('https://vivat.com.ua/');
await page.waitForLoadState('domcontentloaded');

assert.ok((await page.title()).length > 0);
console.log('Перевірка 1 пройдена: головна сторінка відкрилася');

// Перевірка 2: наявність поля пошуку
const search = page.locator('input[type="search"], input[placeholder*="Пошук"]').first();
await search.waitFor({ state: 'visible', timeout: 15000 });
console.log('Перевірка 2 пройдена: поле пошуку відображається');

// Перевірка 3: пошук книги
await search.fill('Дракула');
await search.press('Enter');
await page.waitForLoadState('domcontentloaded');
console.log('Перевірка 3 пройдена: пошуковий запит виконано');

// Перевірка 4: відкриття головної сторінки після пошуку
await page.goto('https://vivat.com.ua/');
assert.ok(page.url().includes('vivat.com.ua'));
console.log('Перевірка 4 пройдена: сайт доступний');

console.log('Тестування завершено!');
} catch (error) {
console.error('Помилка під час тестування:', error);
process.exitCode = 1;
} finally {
await browser.close();
}
})();