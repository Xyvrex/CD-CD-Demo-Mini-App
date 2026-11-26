const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

const appUrl = pathToFileURL(path.join(__dirname, '..', 'app', 'index.html')).href;

async function calculate(page, subtotal) {
  await page.getByLabel('Subtotal ($)').fill(String(subtotal));
  await page.getByRole('button', { name: 'Calculate total' }).click();
}

test('Smoke_Test_001: Checkout page shows all expected labels and fields', async ({ page }) => {
  await expect(page).toHaveTitle('Checkout');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();

  const subtotal = page.getByLabel('Subtotal ($)');
  await expect(subtotal).toBeVisible();
  await expect(subtotal).toHaveAttribute('type', 'number');
  await expect(subtotal).toHaveValue('100');

  await expect(page.getByRole('button', { name: 'Calculate total' })).toBeVisible();
  await expect(page.getByTestId('total')).toHaveText('');
});

test.beforeEach(async ({ page }) => {
  await page.goto(appUrl);
});

test('CO_001: Shows no total before the button is clicked', async ({ page }) => {
  await expect(page.getByTestId('total')).toHaveText('');
});

test('CO_002: Adds 8% tax to a $100 subtotal', async ({ page }) => {
  await calculate(page, 100);
  await expect(page.getByTestId('total')).toHaveText('Total: $108.00');
});

test('CO_003: :Adds 8% tax to a $50 subtotal', async ({ page }) => {
  await calculate(page, 50);
  await expect(page.getByTestId('total')).toHaveText('Total: $54.00');
});

test('CO_004: :A $0 subtotal gives a $0 total', async ({ page }) => {
  await calculate(page, 0);
  await expect(page.getByTestId('total')).toHaveText('Total: $0.00');
});
